import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TranslationService } from '../../../core/services/translation';

interface Incident {
  id: string;
  type: 'ROAD_ACCIDENT' | 'TWO_WHEELER_ACCIDENT' | 'PEDESTRIAN_INCIDENT';
  location: string;
  distanceKm: number;
  reportedMinutesAgo: number;
  status: 'ACTIVE' | 'RESPONDING' | 'HANDED_OVER';
  people: number;
  descriptionKey:
    | 'incidentRoadAccidentDescription'
    | 'incidentTwoWheelerDescription'
    | 'incidentPedestrianDescription';
}

@Component({
  selector: 'app-incident-response',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './incident-response.html',
  styleUrl: './incident-response.scss',
})
export class IncidentResponse {

  readonly translation =
    inject(TranslationService);

  activeTab =
    'ACTIVE';

  incidents: Incident[] = [

    {
      id: 'GL-2026-001',
      type: 'ROAD_ACCIDENT',
      location: 'Anna Salai, Chennai',
      distanceKm: 1.2,
      reportedMinutesAgo: 4,
      status: 'ACTIVE',
      people: 3,
      descriptionKey:
        'incidentRoadAccidentDescription'
    },

    {
      id: 'GL-2026-002',
      type: 'TWO_WHEELER_ACCIDENT',
      location: 'RS Puram, Coimbatore',
      distanceKm: 2.4,
      reportedMinutesAgo: 12,
      status: 'RESPONDING',
      people: 2,
      descriptionKey:
        'incidentTwoWheelerDescription'
    },

    {
      id: 'GL-2026-003',
      type: 'PEDESTRIAN_INCIDENT',
      location: 'Trichy Road, Coimbatore',
      distanceKm: 3.1,
      reportedMinutesAgo: 28,
      status: 'HANDED_OVER',
      people: 4,
      descriptionKey:
        'incidentPedestrianDescription'
    }

  ];


  // --------------------------------------------------
  // Translation
  // --------------------------------------------------

  t(key: string): string {
    return this.translation.translate(key);
  }


  // --------------------------------------------------
  // Filtered incidents
  // --------------------------------------------------

  get filteredIncidents(): Incident[] {

    if (this.activeTab === 'ALL') {
      return this.incidents;
    }

    return this.incidents.filter(
      incident =>
        incident.status === this.activeTab
    );

  }


  // --------------------------------------------------
  // Summary
  // --------------------------------------------------

  get totalPeople(): number {

    return this.incidents.reduce(
      (total, incident) =>
        total + incident.people,
      0
    );

  }


  get nearestDistance(): number {

    if (!this.incidents.length) {
      return 0;
    }

    return Math.min(
      ...this.incidents.map(
        incident => incident.distanceKm
      )
    );

  }


  // --------------------------------------------------
  // Tabs
  // --------------------------------------------------

  setTab(tab: string): void {

    this.activeTab =
      tab;

  }


  // --------------------------------------------------
  // Incident type
  // --------------------------------------------------

  getIncidentTypeLabel(
    type: Incident['type']
  ): string {

    switch (type) {

      case 'ROAD_ACCIDENT':

        return this.t('roadAccident');

      case 'TWO_WHEELER_ACCIDENT':

        return this.t('twoWheelerAccident');

      case 'PEDESTRIAN_INCIDENT':

        return this.t('pedestrianIncident');

      default:

        return this.t('notSure');

    }

  }


  // --------------------------------------------------
  // Description
  // --------------------------------------------------

  getIncidentDescription(
    incident: Incident
  ): string {

    return this.t(
      incident.descriptionKey
    );

  }


  // --------------------------------------------------
  // Distance
  // --------------------------------------------------

  getDistanceText(
    distanceKm: number
  ): string {

    return `${distanceKm.toFixed(1)} ${this.t('kmAway')}`;

  }


  // --------------------------------------------------
  // Reported time
  // --------------------------------------------------

  getReportedTime(
    minutes: number
  ): string {

    if (minutes === 1) {

      return this.t(
        'oneMinuteAgo'
      );

    }

    return `${minutes} ${this.t('minutesAgo')}`;

  }


  // --------------------------------------------------
  // People
  // --------------------------------------------------

  getPeopleNeeded(
    people: number
  ): string {

    if (people === 1) {

      return `1 ${this.t('responderNeeded')}`;

    }

    return `${people} ${this.t('respondersNeeded')}`;

  }


  // --------------------------------------------------
  // Accept incident
  // --------------------------------------------------

  acceptIncident(
    incident: Incident
  ): void {

    incident.status =
      'RESPONDING';

    alert(
      `${this.t('incidentAccepted')}\n\n` +
      `${incident.id}\n` +
      `${this.getIncidentTypeLabel(incident.type)}\n` +
      `${incident.location}`
    );

  }


  // --------------------------------------------------
  // View incident
  // --------------------------------------------------

  viewIncident(
    incident: Incident
  ): void {

    alert(
      `${this.getIncidentTypeLabel(incident.type)}\n\n` +
      `${this.t('location')}: ${incident.location}\n` +
      `${this.t('distance')}: ${this.getDistanceText(incident.distanceKm)}\n` +
      `${this.t('reported')}: ${this.getReportedTime(incident.reportedMinutesAgo)}\n\n` +
      `${this.getIncidentDescription(incident)}`
    );

  }


  // --------------------------------------------------
  // Status label
  // --------------------------------------------------

  getStatusLabel(
    status: Incident['status']
  ): string {

    switch (status) {

      case 'ACTIVE':

        return this.t(
          'incidentNeedsResponder'
        );

      case 'RESPONDING':

        return this.t(
          'incidentResponderOnTheWay'
        );

      case 'HANDED_OVER':

        return this.t(
          'incidentProfessionalHandover'
        );

      default:

        return this.t(
          'unknown'
        );

    }

  }


  // --------------------------------------------------
  // Status class
  // --------------------------------------------------

  getStatusClass(
    status: Incident['status']
  ): string {

    switch (status) {

      case 'ACTIVE':

        return 'status-active';

      case 'RESPONDING':

        return 'status-responding';

      case 'HANDED_OVER':

        return 'status-handed';

      default:

        return '';

    }

  }

}