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
}

export interface Incident {
  incidentId: string;
  reportedAt: string;
  status: IncidentStatus;

  accidentType: AccidentType;
  severity: IncidentSeverity;

  victims: number;

  unconscious: boolean;
  bleeding: boolean;
  breathingDifficulty: boolean;
  trapped: boolean;

  description: string;

  location: IncidentLocation;

  aiAssessment: IncidentAI;

  responder?: Responder | null;

  ambulanceStatus?: string;

  hospital?: Hospital | null;

  emergencyContact?: string;

  lastUpdated?: string;
}