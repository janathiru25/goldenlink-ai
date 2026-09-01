import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Incident } from '../models/incident';

@Injectable({
  providedIn: 'root'
})
export class IncidentService {

  private incidents: Incident[] = [];

  private activeIncidentSubject =
    new BehaviorSubject<Incident | null>(null);

  activeIncident$: Observable<Incident | null> =
    this.activeIncidentSubject.asObservable();

  constructor() {
    this.loadMockIncidents();
  }

  createIncident(
    incidentData: Omit<Incident, 'incidentId' | 'reportedAt' | 'status'>
  ): Incident {

    const incident: Incident = {
      ...incidentData,

      incidentId: this.generateIncidentId(),

      reportedAt: new Date().toISOString(),

      status: 'reported'
    };

    this.incidents.unshift(incident);

    this.activeIncidentSubject.next(incident);

    return incident;
  }

  getActiveIncident(): Incident | null {
    return this.activeIncidentSubject.value;
  }

  getIncidents(): Incident[] {
    return [...this.incidents];
  }

  getIncidentById(id: string): Incident | undefined {
    return this.incidents.find(
      incident => incident.incidentId === id
    );
  }

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

    this.incidents[index] = {
      ...this.incidents[index],
      ...updates
    };

    const updatedIncident = this.incidents[index];

    if (
      this.activeIncidentSubject.value?.incidentId === id
    ) {
      this.activeIncidentSubject.next(updatedIncident);
    }

    return updatedIncident;
  }

  setActiveIncident(incident: Incident): void {
    this.activeIncidentSubject.next(incident);
  }

  clearActiveIncident(): void {
    this.activeIncidentSubject.next(null);
  }

  private generateIncidentId(): string {
    const number = Math.floor(
      1000 + Math.random() * 9000
    );

    return `GL${number}`;
  }

  private loadMockIncidents(): void {

    this.incidents = [
      {
        incidentId: 'GL1021',

        accidentType: 'Road Accident',

        severity: 'critical',

        victims: 2,

        unconscious: true,

        bleeding: true,

        breathingDifficulty: false,

        trapped: false,

        description:
          'Two-wheeler collision reported near the main road.',

        location: {
          latitude: 11.0168,
          longitude: 76.9558,
          address: 'Main Road'
        },

        reportedAt: new Date().toISOString(),

        aiAssessment: {
          severity: 'critical',
          confidence: 0.94,
          summary:
            'Critical incident based on unconsciousness and visible bleeding.'
        },

        responder: null,

        ambulanceStatus: 'requested',

        hospital: null,

        status: 'responder_search'
      }
    ];
  }
}