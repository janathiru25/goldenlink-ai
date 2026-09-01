export type IncidentSeverity =
  | 'normal'
  | 'moderate'
  | 'serious'
  | 'critical';

export interface IncidentLocation {
  latitude: number;
  longitude: number;
  address: string;
}

export interface IncidentAI {
  severity: IncidentSeverity;
  confidence: number;
  summary: string;
}

export interface Incident {
  incidentId: string;
  reportedAt: string;
  status: string;

  accidentType: string;
  severity: IncidentSeverity;

  victims: number;

  unconscious: boolean;
  bleeding: boolean;
  breathingDifficulty: boolean;
  trapped: boolean;

  description: string;

  location: IncidentLocation;

  aiAssessment: IncidentAI;

  responder: unknown;
  ambulanceStatus: string;
  hospital: unknown;
}