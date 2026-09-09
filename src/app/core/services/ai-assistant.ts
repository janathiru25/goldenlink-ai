import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, of } from 'rxjs';

import { Incident } from '../models/incident';
import { IncidentService } from './incident';
import { environment } from '../../../environments/environment';

export interface BackendAIAssessResponse {
  severity: string;
  confidence: number;
  summary: string;
  recommendedAction: string;
  emergencyLevel: string;
  detectedConditions: string[];
  requiredResources: string[];
}

export interface BackendAIStatusResponse {
  provider: string;
  mode: string;
  model_loaded: boolean;
  model_name?: string;
  fallback_active: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class AiAssistant {
  private readonly http = inject(HttpClient);
  private readonly incidentService = inject(IncidentService);
  private readonly apiUrl = environment.apiUrl;

  /**
   * The currently active GoldenLink incident.
   */
  activeIncident$: Observable<Incident | null> = this.incidentService.activeIncident$;

  /**
   * Get the currently active incident immediately.
   */
  getActiveIncident(): Incident | null {
    return this.incidentService.getActiveIncident();
  }

  /**
   * Run real backend AI assessment via FastAPI
   */
  assessIncidentWithBackend(incident: Incident): Observable<BackendAIAssessResponse | null> {
    return this.http.post<BackendAIAssessResponse>(`${this.apiUrl}/ai/assess`, {
      accidentType: incident.accidentType,
      victims: incident.victims,
      unconscious: incident.unconscious,
      bleeding: incident.bleeding,
      breathingDifficulty: incident.breathingDifficulty,
      trapped: incident.trapped,
      description: incident.description,
      latitude: incident.location?.latitude || 0,
      longitude: incident.location?.longitude || 0,
      address: incident.location?.address || ''
    }).pipe(
      catchError(err => {
        console.warn('GoldenLink: Backend AI assessment call failed, using local model:', err);
        return of(null);
      })
    );
  }

  /**
   * Get active AI Provider status from backend
   */
  getAIStatus(): Observable<BackendAIStatusResponse | null> {
    return this.http.get<BackendAIStatusResponse>(`${this.apiUrl}/ai/status`).pipe(
      catchError(() => of(null))
    );
  }

  /**
   * Generate an AI-style response based on
   * the incident information (with local fallback).
   */
  generateResponse(incident: Incident): string {
    if (incident.aiAssessment?.summary) {
      return incident.aiAssessment.summary;
    }

    if (incident.severity === 'critical') {
      return `Critical incident detected. ${incident.victims} people may be affected. Emergency assistance prioritized. Location: ${incident.location.latitude.toFixed(5)}, ${incident.location.longitude.toFixed(5)}. Immediate responder coordination recommended.`.trim();
    }

    if (incident.severity === 'serious') {
      return `Serious incident detected. ${incident.victims} people reported affected. Prompt community and responder assistance recommended.`.trim();
    }

    if (incident.severity === 'moderate') {
      return `Moderate incident detected. Community assistance may be required. GoldenLink monitoring situation.`.trim();
    }

    return `Incident received successfully. No immediate critical danger reported. Monitoring situation.`.trim();
  }

  /**
   * Get a simple severity label for the UI.
   */
  getSeverityLabel(severity: Incident['severity']): string {
    switch (severity) {
      case 'critical':
        return 'Critical';
      case 'serious':
        return 'Serious';
      case 'moderate':
        return 'Moderate';
      case 'normal':
        return 'Normal';
      default:
        return 'Unknown';
    }
  }

  /**
   * Get a CSS class for severity display.
   */
  getSeverityClass(severity: Incident['severity']): string {
    return `severity-${severity}`;
  }
}