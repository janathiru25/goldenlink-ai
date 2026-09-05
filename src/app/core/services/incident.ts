import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Incident } from '../models/incident';

@Injectable({
  providedIn: 'root'
})
export class IncidentService {

  private readonly STORAGE_KEY = 'goldenlink_incidents';
  private readonly ACTIVE_INCIDENT_KEY = 'goldenlink_active_incident';

  private incidents: Incident[] = [];

  private activeIncidentSubject =
    new BehaviorSubject<Incident | null>(null);

  activeIncident$: Observable<Incident | null> =
    this.activeIncidentSubject.asObservable();

  constructor() {
    this.loadIncidents();
    this.loadActiveIncident();
  }

  createIncident(
    incidentData: Omit<
      Incident,
      'incidentId' | 'reportedAt' | 'status'
    >
  ): Incident {

    const incident: Incident = {
      ...incidentData,

      incidentId: this.generateIncidentId(),

      reportedAt: new Date().toISOString(),

      status: 'reported'
    };

    this.incidents.unshift(incident);

    this.saveIncidents();

    this.setActiveIncident(incident);

    console.log(
      'GoldenLink: Incident saved:',
      incident
    );

    return incident;
  }

  getActiveIncident(): Incident | null {
    return this.activeIncidentSubject.value;
  }

  getIncidents(): Incident[] {
    return [...this.incidents];
  }

  getIncidentById(
    id: string
  ): Incident | undefined {

    return this.incidents.find(
      incident =>
        incident.incidentId === id
    );
  }

  updateIncident(
    id: string,
    updates: Partial<Incident>
  ): Incident | undefined {

    const index =
      this.incidents.findIndex(
        incident =>
          incident.incidentId === id
      );

    if (index === -1) {
      return undefined;
    }

    this.incidents[index] = {
      ...this.incidents[index],
      ...updates
    };

    const updatedIncident =
      this.incidents[index];

    this.saveIncidents();

    if (
      this.activeIncidentSubject.value
        ?.incidentId === id
    ) {

      this.setActiveIncident(
        updatedIncident
      );
    }

    return updatedIncident;
  }

  setActiveIncident(
    incident: Incident
  ): void {

    this.activeIncidentSubject.next(
      incident
    );

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

  private loadIncidents(): void {

    try {

      const storedIncidents =
        localStorage.getItem(
          this.STORAGE_KEY
        );

      if (!storedIncidents) {

        this.incidents = [];

        return;
      }

      const parsedIncidents =
        JSON.parse(storedIncidents);

      if (Array.isArray(parsedIncidents)) {

        this.incidents =
          parsedIncidents;

      } else {

        this.incidents = [];
      }

    } catch (error) {

      console.error(
        'GoldenLink: Unable to load incidents:',
        error
      );

      this.incidents = [];
    }
  }

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
        JSON.parse(
          storedActiveIncident
        );

      if (parsedIncident) {

        const existingIncident =
          this.getIncidentById(
            parsedIncident.incidentId
          );

        if (existingIncident) {

          this.activeIncidentSubject.next(
            existingIncident
          );

        } else {

          this.activeIncidentSubject.next(
            null
          );
        }
      }

    } catch (error) {

      console.error(
        'GoldenLink: Unable to load active incident:',
        error
      );

      this.activeIncidentSubject.next(null);
    }
  }

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

  private generateIncidentId(): string {

    const timestamp =
      Date.now()
        .toString()
        .slice(-6);

    const random =
      Math.floor(
        10 + Math.random() * 90
      );

    return `GL${timestamp}${random}`;
  }
}