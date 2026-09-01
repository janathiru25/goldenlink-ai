import { Component, inject } from '@angular/core';
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

  private readonly incidentService =
    inject(IncidentService);


  // =====================================================
  // STEPS
  // =====================================================

  currentStep = 1;

  totalSteps = 4;

  submitted = false;


  // =====================================================
  // BASIC FORM VALUES
  // =====================================================

  incidentType = '';

  peopleInvolved = 'YES';

  locationAccessible = 'YES';

  description = '';


  // =====================================================
  // LOCATION
  // =====================================================

  latitude: number | null = null;

  longitude: number | null = null;

  locationStatus = 'Location not detected';

  locationLoading = false;

  locationCaptured = false;

  locationError = false;


  // =====================================================
  // LOCATION OBJECT
  // =====================================================

  location = {

    latitude: 0,

    longitude: 0,

    address: ''

  };


  // =====================================================
  // FILE UPLOAD
  // =====================================================

  selectedFiles: File[] = [];


  // =====================================================
  // ACCIDENT INFORMATION
  // =====================================================

  accident = {

    accidentType: '',

    victims: 1,

    unconscious: false,

    bleeding: false,

    breathingDifficulty: false,

    trapped: false,

    description: ''

  };


  // =====================================================
  // VICTIM OPTIONS
  // =====================================================

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


  // =====================================================
  // SEVERITY OPTIONS
  // =====================================================

  severityOptions: {
    value: IncidentSeverity;
    label: string;
    description: string;
    icon: string;
  }[] = [

    {
      value: 'normal',
      label: 'Normal',
      description:
        'No immediate danger is visible.',
      icon: 'bi-check-circle'
    },

    {
      value: 'moderate',
      label: 'Moderate',
      description:
        'Medical or community assistance may be required.',
      icon: 'bi-exclamation-circle'
    },

    {
      value: 'critical',
      label: 'Critical',
      description:
        'Immediate emergency response is required.',
      icon: 'bi-exclamation-triangle-fill'
    }

  ];


  selectedSeverity: IncidentSeverity | '' = '';


  // =====================================================
  // PROGRESS
  // =====================================================

  get progressPercentage(): number {

    return (this.currentStep / this.totalSteps) * 100;

  }


  // =====================================================
  // STEP NAVIGATION
  // =====================================================

  nextStep(): void {

    // STEP 1
    // Location must be captured.

    if (
      this.currentStep === 1 &&
      !this.locationCaptured
    ) {

      this.locationStatus =
        'Please detect your location before continuing.';

      this.locationError = true;

      return;

    }


    // STEP 2
    // Accident type required.

    if (
      this.currentStep === 2 &&
      !this.incidentType
    ) {

      return;

    }


    // STEP 3
    // Victim count required.

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

    }

  }


  previousStep(): void {

    if (this.currentStep > 1) {

      this.currentStep--;

    }

  }


  goToStep(step: number): void {

    if (
      step >= 1 &&
      step <= this.totalSteps
    ) {

      // Do not allow jumping ahead
      // before location is captured.

      if (
        step > 1 &&
        !this.locationCaptured
      ) {

        this.currentStep = 1;

        return;

      }

      this.currentStep = step;

    }

  }


  // =====================================================
  // LOCATION DETECTION
  // =====================================================

  getLocation(): void {

    console.log(
      'GoldenLink: requesting browser location...'
    );


    this.locationLoading = true;

    this.locationError = false;

    this.locationCaptured = false;

    this.locationStatus =
      'Detecting your current location...';


    // Check browser support

    if (!navigator.geolocation) {

      this.locationLoading = false;

      this.locationError = true;

      this.locationStatus =
        'Location is not supported by this browser.';

      return;

    }


    /*
     * IMPORTANT
     *
     * We intentionally use the simple
     * browser geolocation call here.
     *
     * This is the same approach used
     * by your previously working project.
     */

    navigator.geolocation.getCurrentPosition(

      (position) => {

        console.log(
          'GoldenLink location received:',
          position
        );


        // ---------------------------------------------
        // GET COORDINATES
        // ---------------------------------------------

        this.latitude =
          position.coords.latitude;

        this.longitude =
          position.coords.longitude;


        // ---------------------------------------------
        // SAVE LOCATION
        // ---------------------------------------------

        this.location.latitude =
          position.coords.latitude;

        this.location.longitude =
          position.coords.longitude;


        this.location.address =
          `${position.coords.latitude.toFixed(6)}, ${position.coords.longitude.toFixed(6)}`;


        // ---------------------------------------------
        // UPDATE UI
        // ---------------------------------------------

        this.locationLoading = false;

        this.locationCaptured = true;

        this.locationError = false;

        this.locationStatus =
          'Location detected successfully';


        console.log(
          'GoldenLink coordinates:',
          this.latitude,
          this.longitude
        );

      },


      (error) => {

        console.error(
          'GoldenLink location error:',
          error
        );


        this.locationLoading = false;

        this.locationCaptured = false;

        this.locationError = true;


        // ---------------------------------------------
        // ERROR HANDLING
        // ---------------------------------------------

        switch (error.code) {

          case error.PERMISSION_DENIED:

            this.locationStatus =
              'Location permission was denied. Please allow location access for localhost.';

            break;


          case error.POSITION_UNAVAILABLE:

            this.locationStatus =
              'Your device could not determine your location. Please check Windows Location Services.';

            break;


          case error.TIMEOUT:

            this.locationStatus =
              'Location request timed out. Please try again.';

            break;


          default:

            this.locationStatus =
              'Unable to detect your location. Please try again.';

        }

      }

    );

  }


  // =====================================================
  // RETRY LOCATION
  // =====================================================

  retryLocation(): void {

    this.latitude = null;

    this.longitude = null;

    this.locationCaptured = false;

    this.locationError = false;

    this.locationLoading = false;

    this.location.address = '';

    this.locationStatus =
      'Location not detected';

    this.getLocation();

  }


  // =====================================================
  // FILE UPLOAD
  // =====================================================

  onFilesSelected(event: Event): void {

    const input =
      event.target as HTMLInputElement;


    if (!input.files) {

      return;

    }


    this.selectedFiles =
      Array.from(input.files);

  }


  // =====================================================
  // VICTIM COUNT
  // =====================================================

  selectVictims(value: number): void {

    this.accident.victims = value;

  }


  getVictimLabel(): string {

    if (this.accident.victims === 1) {

      return '1 Person';

    }


    if (this.accident.victims >= 6) {

      return '5+ People';

    }


    return `${this.accident.victims} People`;

  }


  // =====================================================
  // SEVERITY
  // =====================================================

  selectSeverity(
    severity: IncidentSeverity
  ): void {

    this.selectedSeverity = severity;

  }


  // =====================================================
  // FORM SYNCHRONIZATION
  // =====================================================

  private syncFormValues(): void {

    this.accident.accidentType =
      this.incidentType;

    this.accident.description =
      this.description;

  }


  // =====================================================
  // SUBMIT REPORT
  // =====================================================

  submitReport(): void {

    // Severity required

    if (!this.selectedSeverity) {

      return;

    }


    // Location required

    if (!this.locationCaptured) {

      this.locationStatus =
        'Please capture your location before activating GoldenLink.';

      this.currentStep = 1;

      this.locationError = true;

      return;

    }


    this.syncFormValues();

    this.submitIncident();

  }


  // =====================================================
  // CREATE INCIDENT
  // =====================================================

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


      severity:


        severity,


      victims:
        Number(this.accident.victims),


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
          this.latitude ??
          this.location.latitude,

        longitude:
          this.longitude ??
          this.location.longitude,

        address:
          this.location.address ||
          'Location captured'

      },


      aiAssessment: {

        severity:

          severity,

        confidence:

          1,

        summary:

          this.getSeveritySummary(
            severity
          )

      },


      responder: null,


      ambulanceStatus:

        severity === 'critical'
          ? 'requested'
          : 'not_requested',


      hospital: null

    };


    const incident =
      this.incidentService.createIncident(
        incidentData
      );


    this.submitted = true;


    console.log(
      'GoldenLink incident created:',
      incident
    );


    /*
     * Give the UI a moment to show
     * the activation state.
     */

    setTimeout(() => {

      this.router.navigate([
        '/ai-assistant'
      ]);

    }, 800);

  }


  // =====================================================
  // SEVERITY SUMMARY
  // =====================================================

  private getSeveritySummary(
    severity: IncidentSeverity
  ): string {

    switch (severity) {

      case 'critical':

        return (
          'Critical incident requiring immediate emergency response.'
        );


      case 'moderate':

        return (
          'Moderate incident requiring prompt community assistance.'
        );


      case 'normal':

        return (
          'Normal incident with no immediate critical danger reported.'
        );


      default:

        return (
          'Incident reported through GoldenLink.'
        );

    }

  }


  // =====================================================
  // HELPERS
  // =====================================================

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