import { CommonModule } from '@angular/common';
import {
  Component,
  OnDestroy,
  inject
} from '@angular/core';
import { Router } from '@angular/router';

import { Incident } from '../../../core/models/incident';
import { IncidentService } from '../../../core/services/incident';

@Component({
  selector: 'app-responder-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './responder-dashboard.html',
  styleUrl: './responder-dashboard.scss'
})
export class ResponderDashboard implements OnDestroy {

  // --------------------------------------------------
  // Angular services
  // --------------------------------------------------

  private readonly incidentService =
    inject(IncidentService);

  private readonly router =
    inject(Router);


  // --------------------------------------------------
  // Incident state
  // --------------------------------------------------

  incident: Incident | null = null;

  currentStatus = 'responder_assigned';

  statusMessage =
    'You have been assigned to this incident.';

  actionLoading = false;

  showSuccess = false;

  successMessage = '';


  // --------------------------------------------------
  // Refresh timer
  // --------------------------------------------------

  private refreshTimer?: ReturnType<typeof setInterval>;


  // --------------------------------------------------
  // Constructor
  // --------------------------------------------------

  constructor() {

    this.loadIncident();

    this.refreshTimer = setInterval(() => {
      this.loadIncident();
    }, 1000);

  }


  // --------------------------------------------------
  // Destroy
  // --------------------------------------------------

  ngOnDestroy(): void {

    if (this.refreshTimer) {
      clearInterval(this.refreshTimer);
    }

  }


  // --------------------------------------------------
  // Load active incident
  // --------------------------------------------------

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


  // --------------------------------------------------
  // Status message
  // --------------------------------------------------

  private updateStatusMessage(
    status: string
  ): void {

    switch (status) {

      case 'responder_assigned':

        this.statusMessage =
          'You have been assigned to this incident.';

        break;


      case 'responder_en_route':

        this.statusMessage =
          'You are on the way to the accident location.';

        break;


      case 'on_scene':

        this.statusMessage =
          'You have arrived at the accident location.';

        break;


      case 'handed_over':

        this.statusMessage =
          'The incident has been handed over to emergency services.';

        break;


      case 'completed':

        this.statusMessage =
          'This incident has been successfully completed.';

        break;


      default:

        this.statusMessage =
          'Incident response is active.';

    }

  }


  // --------------------------------------------------
  // Severity
  // --------------------------------------------------

  get severityLabel(): string {

    if (!this.incident) {
      return 'Unknown';
    }

    return this.incident.severity.charAt(0).toUpperCase()
      + this.incident.severity.slice(1);

  }


  get severityClass(): string {

    if (!this.incident) {
      return '';
    }

    return `severity-${this.incident.severity}`;

  }


  // --------------------------------------------------
  // Status label
  // --------------------------------------------------

  get statusLabel(): string {

    switch (this.currentStatus) {

      case 'responder_assigned':

        return 'Responder Assigned';


      case 'responder_en_route':

        return 'On the Way';


      case 'on_scene':

        return 'On Scene';


      case 'handed_over':

        return 'Handed Over';


      case 'completed':

        return 'Completed';


      default:

        return 'Active Response';

    }

  }


  // --------------------------------------------------
  // Responder information
  // --------------------------------------------------

  get hasResponder(): boolean {

    return !!this.incident?.responder;

  }


  get responderName(): string {

    const responder =
      this.incident?.responder as {
        name?: string;
      } | null;

    return responder?.name
      ?? 'Assigned Responder';

  }


  get responderRole(): string {

    const responder =
      this.incident?.responder as {
        role?: string;
      } | null;

    return responder?.role
      ?? 'Community Responder';

  }


  get responderEta(): string {

    const responder =
      this.incident?.responder as {
        eta?: string;
      } | null;

    return responder?.eta
      ?? 'Available';

  }


  // --------------------------------------------------
  // Victim information
  // --------------------------------------------------

  get victimLabel(): string {

    const count =
      this.incident?.victims ?? 0;

    return count === 1
      ? '1 person'
      : `${count} people`;

  }


  // --------------------------------------------------
  // Response actions
  // --------------------------------------------------

  startResponse(): void {

    if (
      !this.incident ||
      this.actionLoading
    ) {
      return;
    }

    this.updateIncidentStatus(
      'responder_en_route',
      'You are now marked as on the way.'
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
      'Arrival has been recorded successfully.'
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
      'Incident handed over successfully.'
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
      'Response completed successfully.'
    );

  }


  // --------------------------------------------------
  // Update incident status
  // --------------------------------------------------

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


  // --------------------------------------------------
  // Navigation
  // --------------------------------------------------

  openNearbyResponders(): void {

    this.router.navigate([
      '/nearby-responders'
    ]);

  }


  goToAccidentRecords(): void {

    this.router.navigate([
      '/accident-records'
    ]);

  }


  openAI(): void {

    this.router.navigate([
      '/ai-assistant'
    ]);

  }


  // --------------------------------------------------
  // Location
  // --------------------------------------------------

  getLocationText(): string {

    return this.incident?.location?.address
      || 'Current accident location';

  }


  getCoordinates(): string {

    if (!this.incident?.location) {
      return 'Location unavailable';
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


  // --------------------------------------------------
  // Severity icon
  // --------------------------------------------------

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