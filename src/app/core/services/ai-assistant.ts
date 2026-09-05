import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';

import { Incident } from '../models/incident';
import { IncidentService } from './incident';

@Injectable({
  providedIn: 'root'
})
export class AiAssistant {

  private readonly incidentService = inject(IncidentService);

  /**
   * The currently active GoldenLink incident.
   *
   * When ReportAccident creates an incident,
   * IncidentService updates this observable.
   */
  activeIncident$: Observable<Incident | null> =
    this.incidentService.activeIncident$;

  /**
   * Get the currently active incident immediately.
   */
  getActiveIncident(): Incident | null {
    return this.incidentService.getActiveIncident();
  }

  /**
   * Generate an AI-style response based on
   * the incident information.
   *
   * This is frontend/mock logic for now.
   * Later your teammate can connect the real AI backend here.
   */
  generateResponse(incident: Incident): string {

    if (incident.severity === 'critical') {

      return `
Critical incident detected.

${incident.victims} people may be affected.
Emergency assistance should be prioritized.

Location:
${incident.location.latitude.toFixed(5)},
${incident.location.longitude.toFixed(5)}

GoldenLink recommends immediate responder coordination.
      `.trim();

    }

    if (incident.severity === 'serious') {

      return `
Serious incident detected.

${incident.victims} people are reported to be affected.

GoldenLink recommends prompt community and responder assistance.
      `.trim();

    }

    if (incident.severity === 'moderate') {

      return `
Moderate incident detected.

Community assistance may be required.
GoldenLink will monitor the reported situation.
      `.trim();

    }

    return `
Incident received successfully.

No immediate critical danger has been reported.
GoldenLink will continue monitoring the situation.
    `.trim();
  }

  /**
   * Get a simple severity label for the UI.
   */
  getSeverityLabel(
    severity: Incident['severity']
  ): string {

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
  getSeverityClass(
    severity: Incident['severity']
  ): string {

    return `severity-${severity}`;

  }

}