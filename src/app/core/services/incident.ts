import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, catchError, of } from 'rxjs';
import { Incident } from '../models/incident';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class IncidentService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = environment.apiUrl;

  private readonly STORAGE_KEY = 'goldenlink_incidents';
  private readonly ACTIVE_INCIDENT_KEY = 'goldenlink_active_incident';

  private incidents: Incident[] = [];

  private activeIncidentSubject = new BehaviorSubject<Incident | null>(null);
  activeIncident$: Observable<Incident | null> =
    this.activeIncidentSubject.asObservable();

  constructor() {
    this.loadIncidents();
    this.loadActiveIncident();
    this.syncWithBackend();
  }

  /**
   * Fetch latest state from FastAPI backend.
   * If backend is unavailable, GoldenLink continues using local storage.
   */
  syncWithBackend(): void {
    this.http
      .get<Incident[]>(`${this.apiUrl}/incidents`)
      .pipe(
        catchError(err => {
          console.warn(
            'GoldenLink: Backend sync unavailable, using local cache:',
            err
          );
          return of(null);
        })
      )
      .subscribe(backendIncidents => {
        if (
          backendIncidents &&
          Array.isArray(backendIncidents) &&
          backendIncidents.length > 0
        ) {
          this.incidents = backendIncidents;
          this.saveIncidents();

          this.http
            .get<Incident>(`${this.apiUrl}/incidents/active`)
            .pipe(
              catchError(() => of(null))
            )
            .subscribe(active => {
              if (active) {
                this.setActiveIncident(active);
              }
            });
        }
      });
  }

  /**
   * Create a new accident incident.
   *
   * The method remains synchronous so existing Angular pages
   * continue to work without modification.
   */
  createIncident(
    incidentData: Omit<Incident, 'incidentId' | 'reportedAt' | 'status'>
  ): Incident {
    const incidentId = this.generateIncidentId();
    const reportedAt = new Date().toISOString();

    const incident: Incident = {
      ...incidentData,

      incidentId,
      reportedAt,
      status: 'reported',

      // New verification fields
      verificationStatus:
        incidentData.verificationStatus ?? 'pending',

      verifiedAt:
        incidentData.verifiedAt ?? null,

      verificationCode:
        incidentData.verificationCode ?? this.generateVerificationCode(),

      qrVerificationToken:
        incidentData.qrVerificationToken ??
        this.generateQRVerificationToken(),

      // New reward fields
      rewardPoints:
        incidentData.rewardPoints ?? 0,

      rewardStatus:
        incidentData.rewardStatus ?? 'pending',

      // General tracking
      lastUpdated:
        incidentData.lastUpdated ?? reportedAt
    };

    /**
     * Store locally first.
     * This keeps the existing frontend fast even if the backend
     * is temporarily unavailable.
     */
    this.incidents.unshift(incident);
    this.saveIncidents();
    this.setActiveIncident(incident);

    console.log(
      'GoldenLink: Local incident created:',
      incident
    );

    /**
     * Send complete incident information to FastAPI.
     */
    const backendPayload = {
      incidentId: incident.incidentId,
      reportedAt: incident.reportedAt,

      accidentType: incident.accidentType,
      severity: incident.severity,

      victims: incident.victims,
      unconscious: incident.unconscious,
      bleeding: incident.bleeding,
      breathingDifficulty: incident.breathingDifficulty,
      trapped: incident.trapped,

      description: incident.description,
      location: incident.location,

      aiAssessment: incident.aiAssessment,

      emergencyContact: incident.emergencyContact,

      // New bystander/report information
      reporterMobile: incident.reporterMobile,

      // Verification
      verificationStatus: incident.verificationStatus,
      verifiedAt: incident.verifiedAt,
      verificationCode: incident.verificationCode,
      qrVerificationToken: incident.qrVerificationToken,

      // Rewards
      rewardPoints: incident.rewardPoints,
      rewardStatus: incident.rewardStatus,

      // Responder
      assignedResponderId: incident.assignedResponderId
    };

    this.http
      .post<Incident>(
        `${this.apiUrl}/incidents`,
        backendPayload
      )
      .pipe(
        catchError(err => {
          console.warn(
            'GoldenLink: FastAPI backend unreachable on creation, keeping local record:',
            err
          );

          return of(incident);
        })
      )
      .subscribe(serverIncident => {
        if (serverIncident && serverIncident.incidentId) {
          console.log(
            'GoldenLink: Server confirmed incident:',
            serverIncident
          );

          const idx = this.incidents.findIndex(
            i => i.incidentId === incidentId
          );

          if (idx !== -1) {
            /**
             * Merge server response with local fields.
             *
             * This protects newly added frontend information if
             * an older backend does not return every field yet.
             */
            this.incidents[idx] = {
              ...incident,
              ...serverIncident,

              incidentId:
                serverIncident.incidentId || incident.incidentId,

              reportedAt:
                serverIncident.reportedAt || incident.reportedAt,

              reporterMobile:
                serverIncident.reporterMobile ??
                incident.reporterMobile,

              verificationStatus:
                serverIncident.verificationStatus ??
                incident.verificationStatus,

              verificationCode:
                serverIncident.verificationCode ??
                incident.verificationCode,

              qrVerificationToken:
                serverIncident.qrVerificationToken ??
                incident.qrVerificationToken,

              rewardPoints:
                serverIncident.rewardPoints ??
                incident.rewardPoints,

              rewardStatus:
                serverIncident.rewardStatus ??
                incident.rewardStatus
            };
          } else {
            this.incidents.unshift(serverIncident);
          }

          this.saveIncidents();

          const finalIncident =
            this.incidents.find(
              i => i.incidentId === incidentId
            ) || serverIncident;

          this.setActiveIncident(finalIncident);
        }
      });

    return incident;
  }

  /**
   * Return the currently active incident.
   */
  getActiveIncident(): Incident | null {
    return this.activeIncidentSubject.value;
  }

  /**
   * Return all stored incidents.
   */
  getIncidents(): Incident[] {
    return [...this.incidents];
  }

  /**
   * Find an incident by Accident ID.
   */
  getIncidentById(id: string): Incident | undefined {
    return this.incidents.find(
      incident => incident.incidentId === id
    );
  }

  /**
   * Update an existing incident.
   */
  updateIncident(
    id: string,
    updates: Partial<Incident>
  ): Incident | undefined {
    const index = this.incidents.findIndex(
      incident => incident.incidentId === id
    );

    if (index === -1) {
      return undefined;
    }

    const updatedIncident: Incident = {
      ...this.incidents[index],
      ...updates,
      lastUpdated: new Date().toISOString()
    };

    this.incidents[index] = updatedIncident;
    this.saveIncidents();

    if (
      this.activeIncidentSubject.value?.incidentId === id
    ) {
      this.setActiveIncident(updatedIncident);
    }

    /**
     * If only status changed, use the dedicated backend endpoint.
     */
    if (updates.status) {
      this.http
        .patch<Incident>(
          `${this.apiUrl}/incidents/${id}/status`,
          {
            status: updates.status
          }
        )
        .pipe(
          catchError(err => {
            console.warn(
              'GoldenLink: Status update backend call failed, updated locally:',
              err
            );

            return of(null);
          })
        )
        .subscribe(res => {
          if (res) {
            this.incidents[index] = {
              ...updatedIncident,
              ...res
            };

            this.saveIncidents();

            if (
              this.activeIncidentSubject.value?.incidentId === id
            ) {
              this.setActiveIncident(this.incidents[index]);
            }
          }
        });
    } else {
      /**
       * Send all other incident changes to backend.
       */
      this.http
        .put<Incident>(
          `${this.apiUrl}/incidents/${id}`,
          updates
        )
        .pipe(
          catchError(err => {
            console.warn(
              'GoldenLink: Incident PUT update failed, updated locally:',
              err
            );

            return of(null);
          })
        )
        .subscribe();
    }

    return updatedIncident;
  }

  /**
   * Set active incident.
   */
  setActiveIncident(incident: Incident): void {
    this.activeIncidentSubject.next(incident);

    try {
      localStorage.setItem(
        this.ACTIVE_INCIDENT_KEY,
        JSON.stringify(incident)
      );
    } catch (error) {
      console.error(
        'GoldenLink: Unable to save active incident:',
        error
      );
    }
  }

  /**
   * Clear active incident.
   */
  clearActiveIncident(): void {
    this.activeIncidentSubject.next(null);

    try {
      localStorage.removeItem(
        this.ACTIVE_INCIDENT_KEY
      );
    } catch (error) {
      console.error(
        'GoldenLink: Unable to clear active incident:',
        error
      );
    }
  }

  /**
   * Load incidents from browser storage.
   */
  private loadIncidents(): void {
    try {
      const storedIncidents =
        localStorage.getItem(this.STORAGE_KEY);

      if (!storedIncidents) {
        this.incidents = [];
        return;
      }

      const parsedIncidents = JSON.parse(storedIncidents);

      this.incidents =
        Array.isArray(parsedIncidents)
          ? parsedIncidents
          : [];
    } catch (error) {
      console.error(
        'GoldenLink: Unable to load incidents:',
        error
      );

      this.incidents = [];
    }
  }

  /**
   * Load active incident from browser storage.
   */
  private loadActiveIncident(): void {
    try {
      const storedActiveIncident =
        localStorage.getItem(
          this.ACTIVE_INCIDENT_KEY
        );

      if (!storedActiveIncident) {
        this.activeIncidentSubject.next(
          this.incidents.length > 0
            ? this.incidents[0]
            : null
        );

        return;
      }

      const parsedIncident =
        JSON.parse(storedActiveIncident);

      if (parsedIncident) {
        const existingIncident =
          this.getIncidentById(
            parsedIncident.incidentId
          );

        this.activeIncidentSubject.next(
          existingIncident || parsedIncident
        );
      }
    } catch (error) {
      console.error(
        'GoldenLink: Unable to load active incident:',
        error
      );

      this.activeIncidentSubject.next(null);
    }
  }

  /**
   * Save incidents to browser storage.
   */
  private saveIncidents(): void {
    try {
      localStorage.setItem(
        this.STORAGE_KEY,
        JSON.stringify(this.incidents)
      );
    } catch (error) {
      console.error(
        'GoldenLink: Unable to save incidents:',
        error
      );
    }
  }

  /**
   * Generate a human-readable GoldenLink Accident ID.
   *
   * Example:
   * GL-2026-0909-0001
   */
  private generateIncidentId(): string {
    const now = new Date();

    const year = now.getFullYear();

    const month = String(
      now.getMonth() + 1
    ).padStart(2, '0');

    const day = String(
      now.getDate()
    ).padStart(2, '0');

    const sequence =
      this.getNextDailySequence();

    return `GL-${year}-${month}${day}-${String(sequence).padStart(4, '0')}`;
  }

  /**
   * Generate a daily sequence number for Accident IDs.
   */
  private getNextDailySequence(): number {
    const today = new Date();

    const prefix =
      `GL-${today.getFullYear()}-${String(
        today.getMonth() + 1
      ).padStart(2, '0')}${String(
        today.getDate()
      ).padStart(2, '0')}-`;

    const todaysIncidents =
      this.incidents.filter(
        incident =>
          incident.incidentId.startsWith(prefix)
      );

    return todaysIncidents.length + 1;
  }

  /**
   * Generate a public verification code.
   *
   * This code does not contain private information.
   */
  private generateVerificationCode(): string {
    const randomPart =
      Math.random()
        .toString(36)
        .substring(2, 8)
        .toUpperCase();

    return `GLV-${randomPart}`;
  }

  /**
   * Generate a QR verification token.
   */
  private generateQRVerificationToken(): string {
    const timestamp =
      Date.now().toString(36).toUpperCase();

    const random =
      Math.random()
        .toString(36)
        .substring(2, 8)
        .toUpperCase();

    return `GLQR-${timestamp}-${random}`;
  }
}