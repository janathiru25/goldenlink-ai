import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

interface Incident {
  id: string;
  type: string;
  location: string;
  distance: string;
  priority: 'HIGH' | 'MEDIUM' | 'LOW';
  reportedAt: string;
  responders: number;
  status: 'NEW' | 'RESPONDING' | 'ACTIVE';
  icon: string;
}

@Component({
  selector: 'app-responder-dashboard',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './responder-dashboard.html',
  styleUrl: './responder-dashboard.scss',
})
export class ResponderDashboard {
  isAvailable = true;

  incidents: Incident[] = [
    {
      id: 'GL-2026-001',
      type: 'Road Accident',
      location: 'Anna Salai, Chennai',
      distance: '0.8 km',
      priority: 'HIGH',
      reportedAt: '4 minutes ago',
      responders: 3,
      status: 'ACTIVE',
      icon: 'bi-car-front-fill',
    },
    {
      id: 'GL-2026-002',
      type: 'Two-Wheeler Accident',
      location: 'T. Nagar, Chennai',
      distance: '1.4 km',
      priority: 'MEDIUM',
      reportedAt: '12 minutes ago',
      responders: 2,
      status: 'RESPONDING',
      icon: 'bi-bicycle',
    },
    {
      id: 'GL-2026-005',
      type: 'Pedestrian Incident',
      location: 'Guindy, Chennai',
      distance: '2.1 km',
      priority: 'LOW',
      reportedAt: '25 minutes ago',
      responders: 1,
      status: 'NEW',
      icon: 'bi-person-walking',
    },
  ];

  get activeIncidents(): number {
    return this.incidents.filter(
      incident => incident.status === 'ACTIVE' || incident.status === 'RESPONDING'
    ).length;
  }

  get highPriorityIncidents(): number {
    return this.incidents.filter(
      incident => incident.priority === 'HIGH'
    ).length;
  }

  toggleAvailability(): void {
    this.isAvailable = !this.isAvailable;
  }

  acceptIncident(incident: Incident): void {
    incident.status = 'RESPONDING';
    alert(`You are now responding to ${incident.id}`);
  }

  getPriorityClass(priority: Incident['priority']): string {
    switch (priority) {
      case 'HIGH':
        return 'priority-high';

      case 'MEDIUM':
        return 'priority-medium';

      case 'LOW':
        return 'priority-low';

      default:
        return '';
    }
  }

  getStatusClass(status: Incident['status']): string {
    switch (status) {
      case 'NEW':
        return 'status-new';

      case 'RESPONDING':
        return 'status-responding';

      case 'ACTIVE':
        return 'status-active';

      default:
        return '';
    }
  }
}