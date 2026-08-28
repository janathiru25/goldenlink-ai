import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

interface Volunteer {
  id: string;
  name: string;
  role: string;
  distance: string;
  responseTime: string;
  status: 'AVAILABLE' | 'RESPONDING' | 'OFFLINE';
  skills: string[];
  rating: number;
  incidents: number;
  initials: string;
}

@Component({
  selector: 'app-volunteer-search',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './volunteer-search.html',
  styleUrl: './volunteer-search.scss',
})
export class VolunteerSearch {

  activeFilter = 'ALL';

  volunteers: Volunteer[] = [
    {
      id: 'VOL-001',
      name: 'Arun Kumar',
      role: 'Community Responder',
      distance: '0.8 km',
      responseTime: '3 min',
      status: 'AVAILABLE',
      skills: ['First Response', 'Traffic Support'],
      rating: 4.9,
      incidents: 28,
      initials: 'AK'
    },
    {
      id: 'VOL-002',
      name: 'Priya S',
      role: 'Community Volunteer',
      distance: '1.2 km',
      responseTime: '5 min',
      status: 'AVAILABLE',
      skills: ['Crowd Support', 'Communication'],
      rating: 4.8,
      incidents: 19,
      initials: 'PS'
    },
    {
      id: 'VOL-003',
      name: 'Karthik R',
      role: 'Responder',
      distance: '1.7 km',
      responseTime: '7 min',
      status: 'RESPONDING',
      skills: ['Traffic Support', 'Coordination'],
      rating: 4.7,
      incidents: 34,
      initials: 'KR'
    },
    {
      id: 'VOL-004',
      name: 'Meena Devi',
      role: 'Community Volunteer',
      distance: '2.1 km',
      responseTime: '9 min',
      status: 'AVAILABLE',
      skills: ['Communication', 'Community Support'],
      rating: 4.9,
      incidents: 22,
      initials: 'MD'
    }
  ];

  get filteredVolunteers(): Volunteer[] {
    if (this.activeFilter === 'ALL') {
      return this.volunteers;
    }

    return this.volunteers.filter(
      volunteer => volunteer.status === this.activeFilter
    );
  }

  setFilter(filter: string): void {
    this.activeFilter = filter;
  }

  getStatusLabel(status: Volunteer['status']): string {
    switch (status) {
      case 'AVAILABLE':
        return 'Available now';

      case 'RESPONDING':
        return 'Currently responding';

      case 'OFFLINE':
        return 'Currently offline';

      default:
        return 'Unknown';
    }
  }

  getStatusClass(status: Volunteer['status']): string {
    switch (status) {
      case 'AVAILABLE':
        return 'status-available';

      case 'RESPONDING':
        return 'status-responding';

      case 'OFFLINE':
        return 'status-offline';

      default:
        return '';
    }
  }

  requestHelp(volunteer: Volunteer): void {
    alert(
      `Help request\n\n` +
      `${volunteer.name}\n` +
      `${volunteer.role}\n` +
      `Distance: ${volunteer.distance}\n\n` +
      `This is currently a frontend demonstration.`
    );
  }

  viewVolunteer(volunteer: Volunteer): void {
    alert(
      `${volunteer.name}\n\n` +
      `${volunteer.role}\n` +
      `Rating: ${volunteer.rating}\n` +
      `Incidents supported: ${volunteer.incidents}`
    );
  }
}