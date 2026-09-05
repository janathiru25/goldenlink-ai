import {
  Component,
  OnInit,
  inject
} from '@angular/core';

import { CommonModule } from '@angular/common';

import { Incident } from '../../../core/models/incident';

import { IncidentService } from '../../../core/services/incident';

interface AccidentRecord {

  id: string;

  type: string;

  location: string;

  reportedAt: string;

  severity: string;

  victims: number;

  status: string;

  responders: number;

  description: string;

  icon: string;

  incident: Incident;

}

@Component({

  selector: 'app-accident-records',

  standalone: true,

  imports: [
    CommonModule
  ],

  templateUrl: './accident-records.html',

  styleUrl: './accident-records.scss'

})

export class AccidentRecords
  implements OnInit {

  private readonly incidentService =
    inject(IncidentService);

  activeFilter = 'ALL';

  records: AccidentRecord[] = [];

  selectedIncident: AccidentRecord | null = null;

  ngOnInit(): void {

    this.loadRecords();

  }

  loadRecords(): void {

    const incidents =
      this.incidentService.getIncidents();

    this.records =
      incidents.map(
        incident =>
          this.convertIncidentToRecord(
            incident
          )
      );

  }

  private convertIncidentToRecord(
    incident: Incident
  ): AccidentRecord {

    return {

      id:
        incident.incidentId,

      type:
        incident.accidentType,

      location:
        incident.location?.address ||
        `${incident.location?.latitude ?? 0}, ${incident.location?.longitude ?? 0}`,

      reportedAt:
        this.formatReportedTime(
          incident.reportedAt
        ),

      severity:
        incident.severity,

      victims:
        incident.victims,

      status:
        this.convertStatus(
          incident.status
        ),

      responders:
        this.getResponderCount(
          incident
        ),

      description:
        incident.description ||
        'Accident reported through GoldenLink.',

      icon:
        this.getIncidentIcon(
          incident.accidentType
        ),

      incident

    };

  }

  private convertStatus(
    status: string
  ): string {

    switch (
      status.toLowerCase()
    ) {

      case 'reported':
      case 'ai_assessing':
      case 'responder_search':

        return 'ACTIVE';

      case 'responder_assigned':
      case 'responder_en_route':
      case 'on_scene':

        return 'RESPONDING';

      case 'handed_over':

        return 'HANDED_OVER';

      case 'completed':

        return 'COMPLETED';

      default:

        return 'ACTIVE';

    }

  }

  private getResponderCount(
    incident: Incident
  ): number {

    if (!incident.responder) {

      return 0;

    }

    return 1;

  }

  private getIncidentIcon(
    accidentType: string
  ): string {

    const type =
      accidentType.toLowerCase();

    if (
      type.includes('bike') ||
      type.includes('two')
    ) {

      return 'bi-bicycle';

    }

    if (
      type.includes('pedestrian') ||
      type.includes('person')
    ) {

      return 'bi-person-walking';

    }

    if (
      type.includes('fire')
    ) {

      return 'bi-fire';

    }

    if (
      type.includes('medical')
    ) {

      return 'bi-heart-pulse-fill';

    }

    return 'bi-car-front-fill';

  }

  get activeCount(): number {

    return this.records.filter(
      record =>
        record.status === 'ACTIVE' ||
        record.status === 'RESPONDING'
    ).length;

  }

  get totalResponders(): number {

    return this.records.reduce(
      (
        total,
        record
      ) =>
        total + record.responders,
      0
    );

  }

  get filteredRecords():
    AccidentRecord[] {

    if (
      this.activeFilter === 'ALL'
    ) {

      return this.records;

    }

    return this.records.filter(
      record =>
        record.status ===
        this.activeFilter
    );

  }

  setFilter(
    filter: string
  ): void {

    this.activeFilter = filter;

  }

  getStatusLabel(
    status: string
  ): string {

    switch (status) {

      case 'ACTIVE':

        return 'Community response active';

      case 'RESPONDING':

        return 'Responders are on the way';

      case 'HANDED_OVER':

        return 'Professional handover completed';

      case 'COMPLETED':

        return 'Response completed';

      default:

        return 'Unknown status';

    }

  }

  getStatusClass(
    status: string
  ): string {

    switch (status) {

      case 'ACTIVE':

        return 'status-active';

      case 'RESPONDING':

        return 'status-responding';

      case 'HANDED_OVER':

        return 'status-handed';

      case 'COMPLETED':

        return 'status-completed';

      default:

        return '';

    }

  }

  getSeverityLabel(
    severity: string
  ): string {

    if (!severity) {

      return 'Unknown';

    }

    return severity
      .charAt(0)
      .toUpperCase() +
      severity.slice(1);

  }

  getSeverityClass(
    severity: string
  ): string {

    switch (
      severity.toLowerCase()
    ) {

      case 'critical':

        return 'severity-critical';

      case 'serious':

        return 'severity-serious';

      case 'moderate':

        return 'severity-moderate';

      case 'normal':

        return 'severity-normal';

      default:

        return '';

    }

  }

  private formatReportedTime(
    reportedAt: string
  ): string {

    if (!reportedAt) {

      return 'Unknown time';

    }

    const date =
      new Date(reportedAt);

    if (
      Number.isNaN(
        date.getTime()
      )
    ) {

      return reportedAt;

    }

    const now =
      new Date();

    const difference =
      now.getTime() -
      date.getTime();

    const minutes =
      Math.floor(
        difference / 60000
      );

    if (minutes < 1) {

      return 'Just now';

    }

    if (minutes < 60) {

      return `${minutes} minute${minutes === 1 ? '' : 's'} ago`;

    }

    const hours =
      Math.floor(
        minutes / 60
      );

    if (hours < 24) {

      return `${hours} hour${hours === 1 ? '' : 's'} ago`;

    }

    const days =
      Math.floor(
        hours / 24
      );

    if (days === 1) {

      return 'Yesterday';

    }

    if (days < 7) {

      return `${days} days ago`;

    }

    return date.toLocaleDateString();

  }

  viewIncident(
    record: AccidentRecord
  ): void {

    this.selectedIncident =
      record;

  }

  closeIncidentDetails(): void {

    this.selectedIncident =
      null;

  }

  getIncidentStatusText(
    incident: Incident
  ): string {

    return this.getStatusLabel(
      this.convertStatus(
        incident.status
      )
    );

  }

  getIncidentStatusClass(
    incident: Incident
  ): string {

    return this.getStatusClass(
      this.convertStatus(
        incident.status
      )
    );

  }

  getResponderName(
    incident: Incident
  ): string {

    const responder =
      incident.responder as {
        name?: string;
      } | null;

    return responder?.name
      ?? 'No responder assigned';

  }

  getResponderRole(
    incident: Incident
  ): string {

    const responder =
      incident.responder as {
        role?: string;
      } | null;

    return responder?.role
      ?? 'Community Responder';

  }

  getResponderEta(
    incident: Incident
  ): string {

    const responder =
      incident.responder as {
        eta?: string;
      } | null;

    return responder?.eta
      ?? 'Not available';

  }

  getMapUrl(
    incident: Incident
  ): string {

    if (!incident.location) {

      return '#';

    }

    return `https://www.google.com/maps?q=${incident.location.latitude},${incident.location.longitude}`;

  }

}