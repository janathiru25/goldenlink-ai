import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Incident {
  id: string;
  type: string;
  location: string;
  distance: string;
  reportedAt: string;
  status: 'ACTIVE' | 'RESPONDING' | 'HANDED_OVER';
  people: number;
  description: string;
}

@Component({
  selector: 'app-incident-response',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './incident-response.html',
  styleUrl: './incident-response.scss',
})
export class IncidentResponse {

  activeTab = 'ACTIVE';

  incidents: Incident[] = [
    {
      id: 'GL-2026-001',
      type: 'Road Accident',
      location: 'Anna Salai, Chennai',
      distance: '1.2 km away',
      reportedAt: '4 minutes ago',
      status: 'ACTIVE',
      people: 3,
      description: 'Road accident reported. Community assistance is required.'
    },
    {
      id: 'GL-2026-002',
      type: 'Two-Wheeler Accident',
      location: 'RS Puram, Coimbatore',
      distance: '2.4 km away',
      reportedAt: '12 minutes ago',
      status: 'RESPONDING',
      people: 2,
      description: 'Responders are currently moving toward the incident.'
    },
    {
      id: 'GL-2026-003',
      type: 'Pedestrian Incident',
      location: 'Trichy Road, Coimbatore',
      distance: '3.1 km away',
      reportedAt: '28 minutes ago',
      status: 'HANDED_OVER',
      people: 4,
      description: 'Professional emergency responders have taken over.'
    }
  ];

  get filteredIncidents(): Incident[] {
    if (this.activeTab === 'ALL') {
      return this.incidents;
    }

    return this.incidents.filter(
      incident => incident.status === this.activeTab
    );
  }

  setTab(tab: string): void {
    this.activeTab = tab;
  }

  acceptIncident(incident: Incident): void {
    incident.status = 'RESPONDING';

    alert(
      `Incident accepted\n\n` +
      `${incident.id}\n` +
      `${incident.type}\n` +
      `${incident.location}`
    );
  }

  viewIncident(incident: Incident): void {
    alert(
      `${incident.type}\n\n` +
      `Location: ${incident.location}\n` +
      `Distance: ${incident.distance}\n` +
      `Reported: ${incident.reportedAt}\n\n` +
      `${incident.description}`
    );
  }

  getStatusLabel(status: Incident['status']): string {
    switch (status) {
      case 'ACTIVE':
        return 'Needs responder';

      case 'RESPONDING':
        return 'Responder on the way';

      case 'HANDED_OVER':
        return 'Professional handover';

      default:
        return 'Unknown';
    }
  }

  getStatusClass(status: Incident['status']): string {
    switch (status) {
      case 'ACTIVE':
        return 'status-active';

      case 'RESPONDING':
        return 'status-responding';

      case 'HANDED_OVER':
        return 'status-handed';

      default:
        return '';
    }
  }
}