import {
  Component,
  ChangeDetectorRef,
  NgZone,
  inject
} from '@angular/core';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

import {
  Incident,
  IncidentSeverity
} from '../../../core/models/incident';

import { IncidentService } from '../../../core/services/incident';

@Component({
  selector: 'app-report-accident',
  standalone: true,

  imports: [
    CommonModule,
    FormsModule,
    RouterLink
  ],

  templateUrl: './report-accident.html',
  styleUrl: './report-accident.scss'
})
export class ReportAccident {

  private readonly router = inject(Router);
  private readonly incidentService = inject(IncidentService);
  private readonly ngZone = inject(NgZone);
  private readonly changeDetector = inject(ChangeDetectorRef);

  // ============================================================
  // STEPS
  // ============================================================

  currentStep = 1;
  totalSteps = 4;

  submitted = false;

  // ============================================================
  // BASIC FORM VALUES
  // ============================================================

  incidentType = '';

  peopleInvolved = 'YES';

  locationAccessible = 'YES';

  description = '';

  // ============================================================
  // LOCATION
  // ============================================================

  latitude: number | null = null;

  longitude: number | null = null;

  locationStatus =
    'Click the button to detect your current location.';

  locationLoading = false;

  locationCaptured = false;

  locationError = false;

  // ============================================================
  // FILE UPLOAD
  // ============================================================

  selectedFiles: File[] = [];

  // ============================================================
  // ACCIDENT INFORMATION
  // ============================================================

  accident = {
    accidentType: '',
    victims: 1,
    unconscious: false,
    bleeding: false,
    breathingDifficulty: false,
    trapped: false,
    description: ''
  };

  // ============================================================
  // LOCATION OBJECT
  // ============================================================

  location = {
    latitude: 0,
    longitude: 0,
    address: ''
  };

  // ============================================================
  // VICTIM OPTIONS
  // ============================================================

  victimOptions = [
    {
      value: 1,
      label: '1 Person',
      icon: 'bi-person'
    },
    {
      value: 2,
      label: '2 People',
      icon: 'bi-people'
    },
    {
      value: 3,
      label: '3 People',
      icon: 'bi-people'
    },
    {
      value: 4,
      label: '4 People',
      icon: 'bi-people'
    },
    {
      value: 5,
      label: '5 People',
      icon: 'bi-people-fill'
    },
    {
      value: 6,
      label: '5+ People',
      icon: 'bi-people-fill'
    }
  ];

  // ============================================================
  // SEVERITY OPTIONS
  // ============================================================

  severityOptions: {
    value: IncidentSeverity;
    label: string;
    description: string;
    icon: string;
  }[] = [

    {
      value: 'normal',
      label: 'Normal',
      description: 'No immediate danger is visible.',
      icon: 'bi-check-circle'
    },

    {
      value: 'moderate',
      label: 'Moderate',
      description: 'Medical or community assistance may be required.',
      icon: 'bi-exclamation-circle'
    },

    {
      value: 'critical',
      label: 'Critical',
      description: 'Immediate emergency response is required.',
      icon: 'bi-exclamation-triangle-fill'
    }

  ];

  selectedSeverity: IncidentSeverity | '' = '';

  // ============================================================
  // PROGRESS
  // ============================================================

  get progressPercentage(): number {
    return (this.currentStep / this.totalSteps) * 100;
  }

  // ============================================================
  // STEP NAVIGATION
  // ============================================================

  nextStep(): void {

    if (
      this.currentStep === 1 &&
      !this.locationCaptured
    ) {

      this.locationError = true;

      this.locationStatus =
        'Please detect your location before continuing.';

      return;
    }

    if (
      this.currentStep === 2 &&
      !this.incidentType
    ) {

      return;
    }

    if (
      this.currentStep === 3 &&
      !this.accident.victims
    ) {

      return;
    }

    if (
      this.currentStep < this.totalSteps
    ) {

      this.currentStep++;

      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });

    }

  }

  previousStep(): void {

    if (
      this.currentStep > 1
    ) {

      this.currentStep--;

      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });

    }

  }

  goToStep(
    step: number
  ): void {

    if (
      step >= 1 &&
      step <= this.totalSteps
    ) {

      this.currentStep =
        step;

    }

  }

  // ============================================================
  // LOCATION DETECTION
  // ============================================================

  getLocation(): void {

    console.log(
      'GoldenLink: Starting location detection...'
    );

    if (this.locationLoading) {
      return;
    }

    if (this.locationCaptured) {
      return;
    }

    if (!navigator.geolocation) {

      this.ngZone.run(() => {

        this.locationLoading = false;

        this.locationCaptured = false;

        this.locationError = true;

        this.locationStatus =
          'Geolocation is not supported by this browser.';

      });

      return;
    }

    // ==========================================================
    // START LOADING
    // ==========================================================

    this.locationLoading = true;

    this.locationCaptured = false;

    this.locationError = false;

    this.locationStatus =
      'Detecting your current location...';

    // ==========================================================
    // GPS
    // ==========================================================

    navigator.geolocation.getCurrentPosition(

      (position: GeolocationPosition) => {

        const lat =
          position.coords.latitude;

        const lng =
          position.coords.longitude;

        console.log(
          'GoldenLink GPS SUCCESS:',
          lat,
          lng
        );

        this.ngZone.run(() => {

          this.latitude = lat;

          this.longitude = lng;

          this.location.latitude =
            lat;

          this.location.longitude =
            lng;

          this.location.address =
            `${lat.toFixed(6)}, ${lng.toFixed(6)}`;

          this.locationLoading =
            false;

          this.locationCaptured =
            true;

          this.locationError =
            false;

          this.locationStatus =
            `Location captured successfully: ${lat.toFixed(6)}, ${lng.toFixed(6)}`;

          console.log(
            'GoldenLink location captured:',
            lat,
            lng
          );

          this.changeDetector.detectChanges();

        });

      },

      (error: GeolocationPositionError) => {

        console.error(
          'GoldenLink GPS ERROR:',
          error
        );

        this.ngZone.run(() => {

          this.locationLoading =
            false;

          this.locationCaptured =
            false;

          this.locationError =
            true;

          let message =
            'Unable to detect your location.';

          if (
            error.code ===
            error.PERMISSION_DENIED
          ) {

            message =
              'Location permission was denied. Please allow location access and try again.';

          } else if (
            error.code ===
            error.POSITION_UNAVAILABLE
          ) {

            message =
              'Your device could not determine your location.';

          } else if (
            error.code ===
            error.TIMEOUT
          ) {

            message =
              'Location detection timed out. Please try again.';

          }

          this.locationStatus =
            message;

        });

      },

      {
        enableHighAccuracy: true,
        timeout: 15000,
        maximumAge: 0
      }

    );

  }

  // ============================================================
  // RETRY LOCATION
  // ============================================================

  retryLocation(): void {

    this.latitude = null;

    this.longitude = null;

    this.location = {

      latitude: 0,

      longitude: 0,

      address: ''

    };

    this.locationCaptured =
      false;

    this.locationError =
      false;

    this.locationLoading =
      false;

    this.locationStatus =
      'Click the button to detect your current location.';

    this.getLocation();

  }

  // ============================================================
  // FILE UPLOAD
  // ============================================================

  onFilesSelected(
    event: Event
  ): void {

    const input =
      event.target as HTMLInputElement;

    if (!input.files) {
      return;
    }

    this.selectedFiles =
      Array.from(input.files);

  }

  // ============================================================
  // VICTIMS
  // ============================================================

  selectVictims(
    value: number
  ): void {

    this.accident.victims =
      value;

  }

  getVictimLabel(): string {

    if (
      this.accident.victims === 1
    ) {

      return '1 Person';

    }

    if (
      this.accident.victims >= 6
    ) {

      return '5+ People';

    }

    return `${this.accident.victims} People`;

  }

  // ============================================================
  // SEVERITY
  // ============================================================

  selectSeverity(
    severity: IncidentSeverity
  ): void {

    this.selectedSeverity =
      severity;

  }

  // ============================================================
  // FORM SYNCHRONIZATION
  // ============================================================

  private syncFormValues(): void {

    this.accident.accidentType =
      this.incidentType;

    this.accident.description =
      this.description;

  }

  // ============================================================
  // SUBMIT REPORT
  // ============================================================

  submitReport(): void {

    if (!this.selectedSeverity) {
      return;
    }

    if (!this.locationCaptured) {

      this.currentStep = 1;

      this.locationError = true;

      this.locationStatus =
        'Please detect your location before activating GoldenLink.';

      return;
    }

    this.syncFormValues();

    this.submitIncident();

  }

  // ============================================================
  // CREATE INCIDENT
  // ============================================================

  submitIncident(): void {

    this.syncFormValues();

    const severity =
      this.selectedSeverity as IncidentSeverity;

    const incidentData:
      Omit<
        Incident,
        'incidentId' |
        'reportedAt' |
        'status'
      > = {

      accidentType:
        this.accident.accidentType ||
        'Road Accident',

      severity,

      victims:
        Number(
          this.accident.victims
        ),

      unconscious:
        this.accident.unconscious,

      bleeding:
        this.accident.bleeding,

      breathingDifficulty:
        this.accident.breathingDifficulty,

      trapped:
        this.accident.trapped,

      description:
        this.accident.description,

      location: {

        latitude:
          this.latitude ?? 0,

        longitude:
          this.longitude ?? 0,

        address:
          this.location.address ||
          'GPS Location'

      },

      aiAssessment: {

        severity,

        confidence:
          1,

        summary:
          this.getSeveritySummary(
            severity
          )

      },

      responder:
        null,

      ambulanceStatus:
        severity === 'critical'
          ? 'requested'
          : 'not_requested',

      hospital:
        null

    };

    // ==========================================================
    // CREATE INCIDENT IN INCIDENT SERVICE
    // ==========================================================

    const incident =
      this.incidentService.createIncident(
        incidentData
      );

    console.log(
      'GoldenLink INCIDENT CREATED:',
      incident
    );

    console.log(
      'GoldenLink ACTIVE INCIDENT:',
      this.incidentService.getActiveIncident()
    );

    this.submitted = true;

// Show "Community Response Activated Successfully"
// before moving to Nearby Responders
setTimeout(() => {
  this.router.navigate([
    '/nearby-responders'
  ]);
}, 2500);

  }

  // ============================================================
  // SEVERITY SUMMARY
  // ============================================================

  private getSeveritySummary(
    severity: IncidentSeverity
  ): string {

    switch (severity) {

      case 'critical':

        return 'Critical incident requiring immediate emergency response.';

      case 'moderate':

        return 'Moderate incident requiring prompt community assistance.';

      case 'normal':

        return 'Normal incident with no immediate critical danger reported.';

      default:

        return 'Incident reported through GoldenLink.';

    }

  }

  // ============================================================
  // HELPERS
  // ============================================================

  getSeverityLabel(): string {

    if (!this.selectedSeverity) {

      return 'Not selected';

    }

    return (

      this.selectedSeverity
        .charAt(0)
        .toUpperCase() +

      this.selectedSeverity.slice(1)

    );

  }

  getSeverityClass(): string {

    if (!this.selectedSeverity) {

      return '';

    }

    return `severity-${this.selectedSeverity}`;

  }

}