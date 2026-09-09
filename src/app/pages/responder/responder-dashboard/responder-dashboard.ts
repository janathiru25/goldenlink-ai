import { CommonModule } from '@angular/common';
import {
  Component,
  OnDestroy,
  inject
} from '@angular/core';
import { Router } from '@angular/router';

import { Incident } from '../../../core/models/incident';
import { IncidentService } from '../../../core/services/incident';
import { TranslationService } from '../../../core/services/translation';

@Component({
  selector: 'app-responder-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './responder-dashboard.html',
  styleUrl: './responder-dashboard.scss'
})
export class ResponderDashboard implements OnDestroy {

  private readonly incidentService =
    inject(IncidentService);

  private readonly router =
    inject(Router);

  readonly translation =
    inject(TranslationService);

  t(key: string): string {
    return this.translation.translate(key);
  }

  incident: Incident | null = null;

  currentStatus = 'responder_assigned';

  statusMessage =
    this.t('responderAssignedMessage');

  actionLoading = false;

  showSuccess = false;

  successMessage = '';

  private refreshTimer?: ReturnType<typeof setInterval>;

  constructor() {

    this.loadIncident();

    this.refreshTimer = setInterval(() => {
      this.loadIncident();
    }, 1000);

  }

  ngOnDestroy(): void {

    if (this.refreshTimer) {
      clearInterval(this.refreshTimer);
    }

  }

  private loadIncident(): void {

    const activeIncident =
      this.incidentService.getActiveIncident();

    this.incident = activeIncident;

    if (activeIncident) {

      this.currentStatus =
        activeIncident.status;

      this.updateStatusMessage(
        activeIncident.status
      );

    }

  }

  private updateStatusMessage(
    status: string
  ): void {

    switch (status) {

      case 'responder_assigned':

        this.statusMessage =
          this.t('responderAssignedMessage');

        break;

      case 'responder_en_route':

        this.statusMessage =
          this.t('responderEnRouteMessage');

        break;

      case 'on_scene':

        this.statusMessage =
          this.t('responderOnSceneMessage');

        break;

      case 'handed_over':

        this.statusMessage =
          this.t('responderHandedOverMessage');

        break;

      case 'completed':

        this.statusMessage =
          this.t('responderCompletedMessage');

        break;

      default:

        this.statusMessage =
          this.t('responderActiveMessage');

    }

  }

  get severityLabel(): string {

    if (!this.incident) {
      return this.t('unknown');
    }

    const severity =
      this.incident.severity;

    const severityKey =
      `responderSeverity${severity.charAt(0).toUpperCase()}${severity.slice(1)}`;

    const translated =
      this.t(severityKey);

    return translated === severityKey
      ? severity.charAt(0).toUpperCase() + severity.slice(1)
      : translated;

  }

  get severityClass(): string {

    if (!this.incident) {
      return '';
    }

    return `severity-${this.incident.severity}`;

  }

  get statusLabel(): string {

    switch (this.currentStatus) {

      case 'responder_assigned':

        return this.t('responderAssigned');

      case 'responder_en_route':

        return this.t('responderOnTheWay');

      case 'on_scene':

        return this.t('responderOnScene');

      case 'handed_over':

        return this.t('responderHandedOver');

      case 'completed':

        return this.t('responderComplete');

      default:

        return this.t('responderActiveResponse');

    }

  }

  get hasResponder(): boolean {

    return !!this.incident?.responder;

  }

  get responderName(): string {

    const responder =
      this.incident?.responder as {
        name?: string;
      } | null;

    return responder?.name
      ?? this.t('responderAssignedResponder');

  }

  get responderRole(): string {

    const responder =
      this.incident?.responder as {
        role?: string;
      } | null;

    return responder?.role
      ?? this.t('responderCommunityResponder');

  }

  get responderEta(): string {

    const responder =
      this.incident?.responder as {
        eta?: string;
      } | null;

    return responder?.eta
      ?? this.t('available');

  }

  get victimLabel(): string {

    const count =
      this.incident?.victims ?? 0;

    switch (count) {

      case 1:
        return this.t('onePerson');

      case 2:
        return this.t('twoPeople');

      case 3:
        return this.t('threePeople');

      case 4:
        return this.t('fourPeople');

      case 5:
        return this.t('fivePeople');

      default:

        if (count > 5) {
          return this.t('fivePlusPeople');
        }

        return `0 ${this.t('people')}`;

    }

  }

  get accidentTypeLabel(): string {

    if (!this.incident?.accidentType) {
      return this.t('responderNotSpecified');
    }

    const type =
      String(this.incident.accidentType)
        .trim()
        .toUpperCase()
        .replace(/[\s-]+/g, '_');

    switch (type) {

      case 'ROAD':
      case 'ROAD_ACCIDENT':
      case 'CAR':
      case 'CAR_ACCIDENT':

        return this.t('roadAccident');

      case 'TWO_WHEELER':
      case 'TWO_WHEELER_ACCIDENT':
      case 'TWO_WHEELER_INCIDENT':
      case 'BIKE':
      case 'MOTORCYCLE':

        return this.t('twoWheelerAccident');

      case 'PEDESTRIAN':
      case 'PEDESTRIAN_INCIDENT':

        return this.t('pedestrianIncident');

      case 'NOT_SURE':
      case 'UNKNOWN':

        return this.t('notSure');

      default:

        return this.incident.accidentType;

    }

  }

  yesNo(value: boolean | null | undefined): string {

    return value
      ? this.t('yes')
      : this.t('no');

  }

  startResponse(): void {

    if (
      !this.incident ||
      this.actionLoading
    ) {
      return;
    }

    this.updateIncidentStatus(
      'responder_en_route',
      this.t('responderMarkedOnTheWay')
    );

  }

  markArrived(): void {

    if (
      !this.incident ||
      this.actionLoading
    ) {
      return;
    }

    this.updateIncidentStatus(
      'on_scene',
      this.t('responderArrivalRecorded')
    );

  }

  handOverIncident(): void {

    if (
      !this.incident ||
      this.actionLoading
    ) {
      return;
    }

    this.updateIncidentStatus(
      'handed_over',
      this.t('responderIncidentHandedOver')
    );

  }

  completeIncident(): void {

    if (
      !this.incident ||
      this.actionLoading
    ) {
      return;
    }

    this.updateIncidentStatus(
      'completed',
      this.t('responderResponseCompletedSuccessfully')
    );

  }

  private updateIncidentStatus(
    status: string,
    message: string
  ): void {

    if (!this.incident) {
      return;
    }

    this.actionLoading = true;

    const updatedIncident =
      this.incidentService.updateIncident(
        this.incident.incidentId,
        {
          status
        }
      );

    if (updatedIncident) {

      this.incident =
        updatedIncident;

    }

    this.currentStatus =
      status;

    this.updateStatusMessage(
      status
    );

    this.successMessage =
      message;

    this.showSuccess =
      true;

    this.actionLoading =
      false;

    setTimeout(() => {

      this.showSuccess =
        false;

    }, 2200);

  }

  openNearbyResponders(): void {

    this.router.navigate([
      '/nearby-responders'
    ]);

  }

  goToAccidentRecords(): void {

    // Navigate to responder emergency incident list rather than citizen general records
    this.router.navigate([
      '/incident-response'
    ]);

  }

  get hospital(): any {
    return this.incident?.hospital;
  }

  get aiAssessment(): any {
    return this.incident?.aiAssessment;
  }

  get notifications(): any[] {
    return this.incident?.notifications || [];
  }

  openAI(): void {

    this.router.navigate([
      '/ai-assistant'
    ]);

  }

  getLocationText(): string {

    return this.incident?.location?.address
      || this.t('responderCurrentAccidentLocation');

  }

  getCoordinates(): string {

    if (!this.incident?.location) {
      return this.t('responderLocationUnavailable');
    }

    return `${this.incident.location.latitude.toFixed(6)}, ${this.incident.location.longitude.toFixed(6)}`;

  }

  getMapUrl(): string {

    if (!this.incident?.location) {
      return '#';
    }

    const latitude =
      this.incident.location.latitude;

    const longitude =
      this.incident.location.longitude;

    return `https://www.google.com/maps?q=${latitude},${longitude}`;

  }

  getSeverityIcon(): string {

    switch (this.incident?.severity) {

      case 'critical':

        return 'bi-exclamation-octagon-fill';

      case 'serious':

        return 'bi-exclamation-triangle-fill';

      case 'moderate':

        return 'bi-exclamation-circle-fill';

      default:

        return 'bi-info-circle-fill';

    }

  }

}