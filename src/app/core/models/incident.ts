import { Hospital } from './hospital';
import { Responder } from './responder';

export type IncidentSeverity =
  | 'normal'
  | 'moderate'
  | 'serious'
  | 'critical'
  | string;

export type IncidentStatus =
  | 'reported'
  | 'under-review'
  | 'confirmed'
  | 'responder-dispatched'
  | 'responder-on-scene'
  | 'transporting'
  | 'hospital-arrived'
  | 'resolved'
  | 'cancelled'
  | 'responder_search'
  | 'responder_assigned'
  | string;

export type AccidentType = string;

/**
 * Verification status of an accident report.
 */
export type IncidentVerificationStatus =
  | 'pending'
  | 'under-review'
  | 'verified'
  | 'rejected'
  | string;

/**
 * Reward status for the bystander who reported the accident.
 */
export type IncidentRewardStatus =
  | 'not-eligible'
  | 'pending'
  | 'awarded'
  | 'redeemed'
  | string;

export interface IncidentLocation {
  latitude: number;
  longitude: number;
  address: string;
}

export interface IncidentAI {
  severity: IncidentSeverity;
  confidence: number;
  summary: string;
  recommendedAction?: string;
  emergencyLevel?: string;
  detectedConditions?: string[];
  requiredResources?: string[];
}

export interface Incident {
  /**
   * Unique GoldenLink accident identifier.
   * Example: GL-2026-0909-0001
   */
  incidentId: string;

  /**
   * Exact date/time when the accident was reported.
   */
  reportedAt: string;

  /**
   * Current incident lifecycle status.
   */
  status: IncidentStatus;

  /**
   * Bystander mobile number used when reporting.
   * This should not be displayed to volunteers unnecessarily.
   */
  reporterMobile?: string;

  /**
   * Accident information.
   */
  accidentType: AccidentType;
  severity: IncidentSeverity;
  victims: number;
  unconscious: boolean;
  bleeding: boolean;
  breathingDifficulty: boolean;
  trapped: boolean;
  description: string;

  /**
   * GPS location of the accident.
   */
  location: IncidentLocation;

  /**
   * AI-generated assessment.
   */
  aiAssessment: IncidentAI;

  /**
   * Responder information.
   */
  responder?: Responder | null;

  /**
   * ID of the responder assigned to this incident.
   * Useful for volunteer dashboards and case statistics.
   */
  assignedResponderId?: string | null;

  /**
   * Ambulance information.
   */
  ambulanceStatus?: string;

  /**
   * Hospital information.
   */
  hospital?: Hospital | null;

  /**
   * Emergency contact information.
   */
  emergencyContact?: string;

  /**
   * Report verification.
   */
  verificationStatus?: IncidentVerificationStatus;
  verifiedAt?: string | null;

  /**
   * Public verification identifier used for QR verification.
   *
   * This should NOT contain private information.
   */
  verificationCode?: string;

  /**
   * QR verification URL/token.
   */
  qrVerificationToken?: string;

  /**
   * Bystander reward information.
   */
  rewardPoints?: number;
  rewardStatus?: IncidentRewardStatus;

  /**
   * Optional voucher information after reward redemption.
   */
  voucherId?: string | null;
  voucherValue?: number | null;
  voucherStatus?: 'available' | 'redeemed' | 'expired' | string;

  /**
   * General incident tracking.
   */
  lastUpdated?: string;

  /**
   * Notification history.
   */
  notifications?: any[];

  /**
   * AI/recommendation results.
   */
  recommendedResponders?: Responder[];
}