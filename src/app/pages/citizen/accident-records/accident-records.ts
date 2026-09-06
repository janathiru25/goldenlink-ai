import {
  Component,
  OnInit,
  inject
} from '@angular/core';

import { CommonModule } from '@angular/common';

import { Incident } from '../../../core/models/incident';
import { IncidentService } from '../../../core/services/incident';
import { TranslationService } from '../../../core/services/translation';

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
export class AccidentRecords implements OnInit {

  private readonly incidentService =
    inject(IncidentService);

  readonly translation =
    inject(TranslationService);

  activeFilter = 'ALL';

  records: AccidentRecord[] = [];

  selectedIncident: AccidentRecord | null = null;

  t(key: string): string {
    return this.translation.translate(key);
  }

  ngOnInit(): void {
    this.loadRecords();
  }

  loadRecords(): void {
    const incidents =
      this.incidentService.getIncidents();

    this.records =
      incidents.map(
        incident =>
          this.convertIncidentToRecord(incident)
      );
  }

  private convertIncidentToRecord(
    incident: Incident
  ): AccidentRecord {

    return {
      id: incident.incidentId,

      type: incident.accidentType,

      location:
        incident.location?.address ||
        `${incident.location?.latitude ?? 0}, ${incident.location?.longitude ?? 0}`,

      reportedAt:
        this.formatReportedTime(
          incident.reportedAt
        ),

      severity: incident.severity,

      victims: incident.victims,

      status:
        this.convertStatus(
          incident.status
        ),

      responders:
        this.getResponderCount(incident),

      description:
        incident.description ||
        this.t('accidentRecordsDefaultDescription'),

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

    switch (status.toLowerCase()) {

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

  get filteredRecords(): AccidentRecord[] {

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
        return this.t(
          'accidentRecordsCommunityResponseActive'
        );

      case 'RESPONDING':
        return this.t(
          'accidentRecordsRespondersOnTheWay'
        );

      case 'HANDED_OVER':
        return this.t(
          'accidentRecordsProfessionalHandoverCompleted'
        );

      case 'COMPLETED':
        return this.t(
          'accidentRecordsResponseCompleted'
        );

      default:
        return this.t(
          'accidentRecordsUnknownStatus'
        );
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

  getStatusDisplay(
    status: string
  ): string {

    switch (status) {

      case 'ACTIVE':
        return this.t(
          'accidentRecordsActive'
        );

      case 'RESPONDING':
        return this.t(
          'accidentRecordsResponding'
        );

      case 'HANDED_OVER':
        return this.t(
          'accidentRecordsHandedOver'
        );

      case 'COMPLETED':
        return this.t(
          'accidentRecordsCompleted'
        );

      default:
        return this.t(
          'accidentRecordsUnknownStatus'
        );
    }
  }

  getSeverityLabel(
    severity: string
  ): string {

    if (!severity) {
      return this.t(
        'accidentRecordsUnknown'
      );
    }

    switch (severity.toLowerCase()) {

      case 'critical':
        return this.t(
          'severityCritical'
        );

      case 'serious':
        return this.t(
          'severitySerious'
        );

      case 'moderate':
        return this.t(
          'severityModerate'
        );

      case 'normal':
        return this.t(
          'severityNormal'
        );

      default:
        return severity
          .charAt(0)
          .toUpperCase() +
          severity.slice(1);
    }
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
      return this.t(
        'accidentRecordsUnknownTime'
      );
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
      return this.t(
        'accidentRecordsJustNow'
      );
    }

    if (minutes < 60) {
      return this.t(
        'accidentRecordsMinutesAgo'
      ).replace(
        '{count}',
        minutes.toString()
      );
    }

    const hours =
      Math.floor(
        minutes / 60
      );

    if (hours < 24) {
      return this.t(
        'accidentRecordsHoursAgo'
      ).replace(
        '{count}',
        hours.toString()
      );
    }

    const days =
      Math.floor(
        hours / 24
      );

    if (days === 1) {
      return this.t(
        'accidentRecordsYesterday'
      );
    }

    if (days < 7) {
      return this.t(
        'accidentRecordsDaysAgo'
      ).replace(
        '{count}',
        days.toString()
      );
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

    return responder?.name ??
      this.t(
        'accidentRecordsNoResponderAssigned'
      );
  }

  getResponderRole(
    incident: Incident
  ): string {

    const responder =
      incident.responder as {
        role?: string;
      } | null;

    return responder?.role ??
      this.t(
        'communityResponder'
      );
  }

  getResponderEta(
    incident: Incident
  ): string {

    const responder =
      incident.responder as {
        eta?: string;
      } | null;

    return responder?.eta ??
      this.t(
        'unavailable'
      );
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