import {
  Component,
  OnInit,
  inject
} from '@angular/core';

import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import QRCode from 'qrcode';

import { Incident } from '../../core/models/incident';

import { IncidentService } from '../../core/services/incident';
import { TranslationService } from '../../core/services/translation';

import { AccidentTimeline } from '../accident-timeline/accident-timeline';

@Component({
  selector: 'app-accident-details',
  standalone: true,
  imports: [
    CommonModule,
    AccidentTimeline
  ],
  templateUrl: './accident-details.html',
  styleUrl: './accident-details.scss'
})
export class AccidentDetails implements OnInit {

  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);

  private readonly incidentService =
    inject(IncidentService);

  readonly translation =
    inject(TranslationService);

  incident: Incident | null = null;

  loading = true;

  errorMessage = '';

  qrCodeDataUrl = '';

  qrLoading = false;

  t(key: string): string {
    return this.translation.translate(key);
  }

  ngOnInit(): void {
    console.log(
      'GoldenLink: AccidentDetails component initialized.'
    );

    this.loadIncident();
  }

  // ============================================================
  // LOAD INCIDENT
  // ============================================================

  private loadIncident(): void {

    this.loading = true;
    this.errorMessage = '';

    console.log(
      'GoldenLink: Reading accident ID from route...'
    );

    /*
     * Use snapshot instead of waiting for an observable.
     * This guarantees that the page immediately receives
     * the ID from /accident-details/:id.
     */
    const rawIncidentId =
      this.route.snapshot.paramMap.get('id');

    console.log(
      'GoldenLink: Raw route ID:',
      rawIncidentId
    );

    if (!rawIncidentId) {

      console.error(
        'GoldenLink: No accident ID was supplied in the route.'
      );

      this.loading = false;

      this.errorMessage =
        this.t('accidentDetailsNotFound');

      return;
    }

    let incidentId = rawIncidentId;

    try {

      incidentId =
        decodeURIComponent(rawIncidentId);

    } catch (error) {

      console.warn(
        'GoldenLink: Could not decode route ID:',
        error
      );

      incidentId =
        rawIncidentId;
    }

    incidentId =
      incidentId.trim();

    console.log(
      'GoldenLink: Searching for accident:',
      incidentId
    );

    // ==========================================================
    // STEP 1 — LOCAL CACHE
    // ==========================================================

    try {

      const localIncident =
        this.incidentService.getIncidentById(
          incidentId
        );

      console.log(
        'GoldenLink: Local incident result:',
        localIncident
      );

      if (localIncident) {

        console.log(
          'GoldenLink: Accident found in local cache.'
        );

        this.setIncident(
          localIncident
        );

        this.loading = false;

        /*
         * Refresh silently in the background.
         * This must never block the page.
         */
        this.refreshInBackground(
          incidentId
        );

        return;
      }

    } catch (error) {

      console.error(
        'GoldenLink: Local incident lookup failed:',
        error
      );
    }

    // ==========================================================
    // STEP 2 — ACTIVE INCIDENT
    // ==========================================================

    try {

      const activeIncident =
        this.incidentService.getActiveIncident();

      console.log(
        'GoldenLink: Active incident:',
        activeIncident
      );

      if (
        activeIncident &&
        activeIncident.incidentId === incidentId
      ) {

        console.log(
          'GoldenLink: Accident found as active incident.'
        );

        this.setIncident(
          activeIncident
        );

        this.loading = false;

        return;
      }

    } catch (error) {

      console.error(
        'GoldenLink: Active incident lookup failed:',
        error
      );
    }

    // ==========================================================
    // STEP 3 — BACKEND SYNCHRONIZATION
    // ==========================================================

    console.log(
      'GoldenLink: Accident not found locally.'
    );

    console.log(
      'GoldenLink: Starting backend synchronization...'
    );

    try {

      this.incidentService.syncWithBackend();

    } catch (error) {

      console.error(
        'GoldenLink: Backend synchronization could not start:',
        error
      );
    }

    /*
     * IncidentService.syncWithBackend() is asynchronous.
     *
     * Wait briefly for its HTTP request to populate the
     * service cache, then check again.
     */
    setTimeout(() => {

      this.finishIncidentLookup(
        incidentId
      );

    }, 1000);

    /*
     * Absolute safety timeout.
     *
     * Even if the backend/network never responds,
     * the page will NOT remain on "Loading..." forever.
     */
    setTimeout(() => {

      if (this.loading) {

        console.warn(
          'GoldenLink: Accident lookup safety timeout reached.'
        );

        this.finishIncidentLookup(
          incidentId
        );
      }

    }, 3000);
  }

  // ============================================================
  // FINISH INCIDENT LOOKUP
  // ============================================================

  private finishIncidentLookup(
    incidentId: string
  ): void {

    if (!this.loading) {
      return;
    }

    console.log(
      'GoldenLink: Checking incident after synchronization:',
      incidentId
    );

    // ----------------------------------------------------------
    // Check local cache again
    // ----------------------------------------------------------

    try {

      const refreshedIncident =
        this.incidentService.getIncidentById(
          incidentId
        );

      console.log(
        'GoldenLink: Refreshed incident:',
        refreshedIncident
      );

      if (refreshedIncident) {

        console.log(
          'GoldenLink: Accident found after synchronization.'
        );

        this.setIncident(
          refreshedIncident
        );

        this.loading = false;

        return;
      }

    } catch (error) {

      console.error(
        'GoldenLink: Refreshed incident lookup failed:',
        error
      );
    }

    // ----------------------------------------------------------
    // Check active incident again
    // ----------------------------------------------------------

    try {

      const activeIncident =
        this.incidentService.getActiveIncident();

      if (
        activeIncident &&
        activeIncident.incidentId === incidentId
      ) {

        console.log(
          'GoldenLink: Using active incident after synchronization.'
        );

        this.setIncident(
          activeIncident
        );

        this.loading = false;

        return;
      }

    } catch (error) {

      console.error(
        'GoldenLink: Active incident fallback failed:',
        error
      );
    }

    // ----------------------------------------------------------
    // Final state
    // ----------------------------------------------------------

    console.warn(
      'GoldenLink: Accident could not be found:',
      incidentId
    );

    this.errorMessage =
      this.t('accidentDetailsNotFound');

    this.loading = false;
  }

  // ============================================================
  // BACKGROUND REFRESH
  // ============================================================

  private refreshInBackground(
    incidentId: string
  ): void {

    try {

      this.incidentService.syncWithBackend();

    } catch (error) {

      console.warn(
        'GoldenLink: Background synchronization failed:',
        error
      );

      return;
    }

    setTimeout(() => {

      try {

        const refreshedIncident =
          this.incidentService.getIncidentById(
            incidentId
          );

        if (refreshedIncident) {

          console.log(
            'GoldenLink: Background incident refresh completed.'
          );

          this.setIncident(
            refreshedIncident
          );
        }

      } catch (error) {

        console.warn(
          'GoldenLink: Background refresh lookup failed:',
          error
        );
      }

    }, 1000);
  }

  // ============================================================
  // SET INCIDENT
  // ============================================================

  private setIncident(
    incident: Incident
  ): void {

    this.incident =
      incident;

    console.log(
      'GoldenLink: Accident Details loaded:',
      incident.incidentId
    );

    this.generateQrCode();
  }

  // ============================================================
  // QR CODE
  // ============================================================

  private async generateQrCode(): Promise<void> {

    if (!this.incident) {

      this.qrCodeDataUrl = '';

      return;
    }

    const accidentId =
      this.incident.incidentId;

    const verificationToken =
      this.incident.qrVerificationToken ||
      this.incident.verificationCode ||
      '';

    const qrPayload = JSON.stringify({

      type:
        'GoldenLink Accident Verification',

      accidentId,

      verificationCode:
        this.incident.verificationCode || '',

      verificationToken

    });

    this.qrLoading = true;

    try {

      this.qrCodeDataUrl =
        await QRCode.toDataURL(
          qrPayload,
          {
            width: 220,
            margin: 2,
            errorCorrectionLevel: 'M'
          }
        );

      console.log(
        'GoldenLink: Verification QR generated successfully.'
      );

    } catch (error) {

      console.error(
        'GoldenLink: Failed to generate verification QR:',
        error
      );

      this.qrCodeDataUrl = '';

    } finally {

      this.qrLoading = false;
    }
  }

  // ============================================================
  // DOWNLOAD QR
  // ============================================================

  downloadQrCode(): void {

    if (
      !this.qrCodeDataUrl ||
      !this.incident
    ) {
      return;
    }

    const link =
      document.createElement('a');

    link.href =
      this.qrCodeDataUrl;

    link.download =
      `${this.incident.incidentId}-verification-qr.png`;

    document.body.appendChild(link);

    link.click();

    document.body.removeChild(link);
  }

  // ============================================================
  // PRINT PROOF
  // ============================================================

  printVerificationProof(): void {

    window.print();
  }

  // ============================================================
  // BACK
  // ============================================================

  goBack(): void {

    this.router.navigate([
      '/accident-records'
    ]);
  }

  // ============================================================
  // GOOGLE MAPS
  // ============================================================

  openMap(): void {

    if (!this.incident?.location) {
      return;
    }

    const latitude =
      this.incident.location.latitude;

    const longitude =
      this.incident.location.longitude;

    const mapUrl =
      `https://www.google.com/maps?q=${latitude},${longitude}`;

    window.open(
      mapUrl,
      '_blank',
      'noopener,noreferrer'
    );
  }

  // ============================================================
  // COORDINATES
  // ============================================================

  getCoordinates(): string {

    if (!this.incident?.location) {

      return this.t(
        'accidentDetailsLocationUnavailable'
      );
    }

    return `${this.incident.location.latitude}, ${this.incident.location.longitude}`;
  }

  // ============================================================
  // REPORT TIME
  // ============================================================

  getReportedTime(): string {

    if (!this.incident?.reportedAt) {

      return this.t(
        'accidentDetailsTimeUnavailable'
      );
    }

    const date =
      new Date(
        this.incident.reportedAt
      );

    if (
      Number.isNaN(
        date.getTime()
      )
    ) {

      return this.incident.reportedAt;
    }

    return date.toLocaleString();
  }

  // ============================================================
  // SEVERITY LABEL
  // ============================================================

  getSeverityLabel(): string {

    if (!this.incident?.severity) {

      return this.t(
        'accidentDetailsUnknown'
      );
    }

    switch (
      this.incident.severity.toLowerCase()
    ) {

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
        return this.incident.severity;
    }
  }

  // ============================================================
  // SEVERITY CLASS
  // ============================================================

  getSeverityClass(): string {

    if (!this.incident?.severity) {
      return '';
    }

    switch (
      this.incident.severity.toLowerCase()
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

  // ============================================================
  // STATUS LABEL
  // ============================================================

  getStatusLabel(): string {

    if (!this.incident?.status) {

      return this.t(
        'accidentDetailsUnknown'
      );
    }

    switch (
      this.incident.status.toLowerCase()
    ) {

      case 'reported':
        return this.t(
          'accidentDetailsStatusReported'
        );

      case 'under-review':
      case 'ai_assessing':
        return this.t(
          'accidentDetailsStatusReview'
        );

      case 'confirmed':
        return this.t(
          'accidentDetailsStatusConfirmed'
        );

      case 'responder-dispatched':
      case 'responder_assigned':
        return this.t(
          'accidentDetailsStatusDispatched'
        );

      case 'responder-on-scene':
      case 'on_scene':
        return this.t(
          'accidentDetailsStatusOnScene'
        );

      case 'transporting':
        return this.t(
          'accidentDetailsStatusTransporting'
        );

      case 'hospital-arrived':
        return this.t(
          'accidentDetailsStatusHospital'
        );

      case 'resolved':
      case 'completed':
        return this.t(
          'accidentDetailsStatusResolved'
        );

      case 'cancelled':
        return this.t(
          'accidentDetailsStatusCancelled'
        );

      default:
        return this.incident.status;
    }
  }

  // ============================================================
  // STATUS CLASS
  // ============================================================

  getStatusClass(): string {

    if (!this.incident?.status) {
      return '';
    }

    const status =
      this.incident.status.toLowerCase();

    if (
      status === 'resolved' ||
      status === 'completed'
    ) {

      return 'status-completed';
    }

    if (
      status === 'cancelled'
    ) {

      return 'status-cancelled';
    }

    if (
      status === 'responder-on-scene' ||
      status === 'on_scene' ||
      status === 'responder-assigned' ||
      status === 'responder_assigned' ||
      status === 'responder-dispatched'
    ) {

      return 'status-responding';
    }

    return 'status-active';
  }

  // ============================================================
  // VERIFICATION LABEL
  // ============================================================

  getVerificationLabel(): string {

    const verification =
      this.incident?.verificationStatus;

    if (!verification) {

      return this.t(
        'accidentDetailsVerificationPending'
      );
    }

    switch (verification) {

      case 'verified':
        return this.t(
          'accidentDetailsVerified'
        );

      case 'rejected':
        return this.t(
          'accidentDetailsVerificationRejected'
        );

      case 'under-review':
        return this.t(
          'accidentDetailsVerificationReview'
        );

      default:
        return this.t(
          'accidentDetailsVerificationPending'
        );
    }
  }

  // ============================================================
  // VERIFICATION CLASS
  // ============================================================

  getVerificationClass(): string {

    switch (
      this.incident?.verificationStatus
    ) {

      case 'verified':
        return 'verification-verified';

      case 'rejected':
        return 'verification-rejected';

      case 'under-review':
        return 'verification-review';

      default:
        return 'verification-pending';
    }
  }

  // ============================================================
  // REWARD POINTS
  // ============================================================

  getRewardPoints(): number {

    return this.incident?.rewardPoints ?? 0;
  }

  // ============================================================
  // REWARD STATUS
  // ============================================================

  getRewardStatusLabel(): string {

    switch (
      this.incident?.rewardStatus
    ) {

      case 'earned':
        return this.t(
          'accidentDetailsRewardEarned'
        );

      case 'pending':
        return this.t(
          'accidentDetailsRewardPending'
        );

      case 'not-eligible':
        return this.t(
          'accidentDetailsRewardNotEligible'
        );

      case 'claimed':
        return this.t(
          'accidentDetailsRewardClaimed'
        );

      default:
        return this.t(
          'accidentDetailsRewardPending'
        );
    }
  }

  // ============================================================
  // RESPONDER
  // ============================================================

  getResponderName(): string {

    if (!this.incident?.responder) {

      return this.t(
        'accidentDetailsNoResponder'
      );
    }

    const responder =
      this.incident.responder as {
        name?: string;
      };

    return responder.name ||
      this.t(
        'accidentDetailsNoResponder'
      );
  }

  getResponderRole(): string {

    if (!this.incident?.responder) {
      return '';
    }

    const responder =
      this.incident.responder as {
        role?: string;
      };

    return responder.role || '';
  }

  getResponderEta(): string {

    if (!this.incident?.responder) {

      return this.t(
        'accidentDetailsEtaUnavailable'
      );
    }

    const responder =
      this.incident.responder as {
        eta?: string;
      };

    return responder.eta ||
      this.t(
        'accidentDetailsEtaUnavailable'
      );
  }

  // ============================================================
  // HOSPITAL
  // ============================================================

  getHospitalName(): string {

    if (!this.incident?.hospital) {

      return this.t(
        'accidentDetailsNoHospital'
      );
    }

    return this.incident.hospital.name ||
      this.t(
        'accidentDetailsNoHospital'
      );
  }

  getHospitalAddress(): string {

    if (!this.incident?.hospital) {
      return '';
    }

    return this.incident.hospital.address || '';
  }

  // ============================================================
  // AI ASSESSMENT
  // ============================================================

  hasAiAssessment(): boolean {

    return !!this.incident?.aiAssessment;
  }

  getAiSummary(): string {

    return this.incident?.aiAssessment?.summary ||
      this.t(
        'accidentDetailsNoAiSummary'
      );
  }

  getAiConfidence(): string {

    const confidence =
      this.incident?.aiAssessment?.confidence;

    if (
      confidence === undefined ||
      confidence === null
    ) {

      return this.t(
        'accidentDetailsUnavailable'
      );
    }

    const percentage =
      confidence <= 1
        ? confidence * 100
        : confidence;

    return `${Math.round(percentage)}%`;
  }

  getEmergencyLevel(): string {

    return this.incident?.aiAssessment
      ?.emergencyLevel ||
      this.t(
        'accidentDetailsUnavailable'
      );
  }

  getDetectedConditions(): string[] {

    return this.incident?.aiAssessment
      ?.detectedConditions || [];
  }

  getRequiredResources(): string[] {

    return this.incident?.aiAssessment
      ?.requiredResources || [];
  }

  // ============================================================
  // REWARD / VOUCHER
  // ============================================================

  hasReward(): boolean {

    return (
      (this.incident?.rewardPoints ?? 0) > 0
    );
  }

  hasVoucher(): boolean {

    return (
      (this.incident?.voucherValue ?? 0) > 0
    );
  }

  getVoucherText(): string {

    const value =
      this.incident?.voucherValue;

    if (!value) {

      return this.t(
        'accidentDetailsNoVoucher'
      );
    }

    return `₹${value}`;
  }
}