import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, catchError, of, tap } from 'rxjs';
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
  activeIncident$: Observable<Incident | null> = this.activeIncidentSubject.asObservable();

  constructor() {
    this.loadIncidents();
    this.loadActiveIncident();
    this.syncWithBackend();
  }

  /**
   * Fetch latest state from FastAPI backend to ensure live sync with MongoDB
   */
  syncWithBackend(): void {
    this.http.get<Incident[]>(`${this.apiUrl}/incidents`).pipe(
      catchError(err => {
        console.warn('GoldenLink: Backend sync unavailable, using local cache:', err);
        return of(null);
      })
    ).subscribe(backendIncidents => {
      if (backendIncidents && Array.isArray(backendIncidents) && backendIncidents.length > 0) {
        this.incidents = backendIncidents;
        this.saveIncidents();

        // Also check active incident
        this.http.get<Incident>(`${this.apiUrl}/incidents/active`).pipe(
          catchError(() => of(null))
        ).subscribe(active => {
          if (active) {
            this.setActiveIncident(active);
          }
        });
      }
    });
  }

  /**
   * Synchronous creation method ensuring 100% backward-compatibility with existing Angular components,
   * while asynchronously sending the incident to FastAPI /api/incidents.
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
      status: 'reported'
    };

    // Store in local cache first for zero-latency UI transition
    this.incidents.unshift(incident);
    this.saveIncidents();
    this.setActiveIncident(incident);

    console.log('GoldenLink: Local incident created, sending to FastAPI backend:', incident);

    // Asynchronously send to FastAPI backend for AI triage, hospital recommendation & simulated dispatch
    this.http.post<Incident>(`${this.apiUrl}/incidents`, {
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
      emergencyContact: incident.emergencyContact
    }).pipe(
      catchError(err => {
        console.warn('GoldenLink: FastAPI backend unreachable on creation, keeping local record:', err);
        return of(incident);
      })
    ).subscribe(serverIncident => {
      if (serverIncident && serverIncident.incidentId) {
        console.log('GoldenLink: Server confirmed incident with AI & Hospital recommendations:', serverIncident);
        // Replace temporary local incident with enriched server incident
        const idx = this.incidents.findIndex(i => i.incidentId === incidentId);
        if (idx !== -1) {
          this.incidents[idx] = serverIncident;
        } else {
          this.incidents.unshift(serverIncident);
        }
        this.saveIncidents();
        this.setActiveIncident(serverIncident);
      }
    });

    return incident;
  }

  getActiveIncident(): Incident | null {
    return this.activeIncidentSubject.value;
  }

  getIncidents(): Incident[] {
    return [...this.incidents];
  }

  getIncidentById(id: string): Incident | undefined {
    return this.incidents.find(incident => incident.incidentId === id);
  }

  updateIncident(
    id: string,
    updates: Partial<Incident>
  ): Incident | undefined {
    const index = this.incidents.findIndex(incident => incident.incidentId === id);

    if (index === -1) {
      return undefined;
    }

    this.incidents[index] = {
      ...this.incidents[index],
      ...updates
    };

    const updatedIncident = this.incidents[index];
    this.saveIncidents();

    if (this.activeIncidentSubject.value?.incidentId === id) {
      this.setActiveIncident(updatedIncident);
    }

    // Call FastAPI backend to update status or fields
    if (updates.status) {
      this.http.patch<Incident>(`${this.apiUrl}/incidents/${id}/status`, {
        status: updates.status
      }).pipe(
        catchError(err => {
          console.warn('GoldenLink: Status update backend call failed, updated locally:', err);
          return of(null);
        })
      ).subscribe(res => {
        if (res) {
          this.incidents[index] = res;
          this.saveIncidents();
          if (this.activeIncidentSubject.value?.incidentId === id) {
            this.setActiveIncident(res);
          }
        }
      });
    } else {
      this.http.put<Incident>(`${this.apiUrl}/incidents/${id}`, updates).pipe(
        catchError(err => {
          console.warn('GoldenLink: Incident PUT update failed, updated locally:', err);
          return of(null);
        })
      ).subscribe();
    }

    return updatedIncident;
  }

  setActiveIncident(incident: Incident): void {
    this.activeIncidentSubject.next(incident);
    try {
      localStorage.setItem(this.ACTIVE_INCIDENT_KEY, JSON.stringify(incident));
    } catch (error) {
      console.error('GoldenLink: Unable to save active incident:', error);
    }
  }

  clearActiveIncident(): void {
    this.activeIncidentSubject.next(null);
    try {
      localStorage.removeItem(this.ACTIVE_INCIDENT_KEY);
    } catch (error) {
      console.error('GoldenLink: Unable to clear active incident:', error);
    }
  }

  private loadIncidents(): void {
    try {
      const storedIncidents = localStorage.getItem(this.STORAGE_KEY);
      if (!storedIncidents) {
        this.incidents = [];
        return;
      }
      const parsedIncidents = JSON.parse(storedIncidents);
      this.incidents = Array.isArray(parsedIncidents) ? parsedIncidents : [];
    } catch (error) {
      console.error('GoldenLink: Unable to load incidents:', error);
      this.incidents = [];
    }
  }

  private loadActiveIncident(): void {
    try {
      const storedActiveIncident = localStorage.getItem(this.ACTIVE_INCIDENT_KEY);
      if (!storedActiveIncident) {
        this.activeIncidentSubject.next(this.incidents.length > 0 ? this.incidents[0] : null);
        return;
      }
      const parsedIncident = JSON.parse(storedActiveIncident);
      if (parsedIncident) {
        const existingIncident = this.getIncidentById(parsedIncident.incidentId);
        this.activeIncidentSubject.next(existingIncident || parsedIncident);
      }
    } catch (error) {
      console.error('GoldenLink: Unable to load active incident:', error);
      this.activeIncidentSubject.next(null);
    }
  }

  private saveIncidents(): void {
    try {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.incidents));
    } catch (error) {
      console.error('GoldenLink: Unable to save incidents:', error);
    }
  }

  private generateIncidentId(): string {
    const timestamp = Date.now().toString().slice(-6);
    const random = Math.floor(10 + Math.random() * 90);
    return `GL${timestamp}${random}`;
  }
}