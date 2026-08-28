import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface CommunityArea {
  name: string;
  responders: number;
  available: number;
  activeIncidents: number;
  coverage: number;
  icon: string;
}

@Component({
  selector: 'app-community',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './community.html',
  styleUrl: './community.scss',
})
export class Community {

  communityAreas: CommunityArea[] = [
    {
      name: 'Chennai',
      responders: 128,
      available: 34,
      activeIncidents: 5,
      coverage: 86,
      icon: 'bi-buildings'
    },
    {
      name: 'Coimbatore',
      responders: 92,
      available: 28,
      activeIncidents: 3,
      coverage: 78,
      icon: 'bi-building'
    },
    {
      name: 'Madurai',
      responders: 67,
      available: 19,
      activeIncidents: 2,
      coverage: 64,
      icon: 'bi-geo-alt'
    },
    {
      name: 'Trichy',
      responders: 54,
      available: 16,
      activeIncidents: 1,
      coverage: 58,
      icon: 'bi-geo'
    }
  ];

  get totalResponders(): number {
    return this.communityAreas.reduce(
      (total, area) => total + area.responders,
      0
    );
  }

  get totalAvailable(): number {
    return this.communityAreas.reduce(
      (total, area) => total + area.available,
      0
    );
  }

  get totalIncidents(): number {
    return this.communityAreas.reduce(
      (total, area) => total + area.activeIncidents,
      0
    );
  }

  get averageCoverage(): number {
    const total = this.communityAreas.reduce(
      (sum, area) => sum + area.coverage,
      0
    );

    return Math.round(total / this.communityAreas.length);
  }

  joinCommunity(): void {
    alert(
      'Welcome to GoldenLink Community!\n\n' +
      'Volunteer registration will be connected later.'
    );
  }

  viewArea(area: CommunityArea): void {
    alert(
      `${area.name} Community\n\n` +
      `Responders: ${area.responders}\n` +
      `Available: ${area.available}\n` +
      `Active incidents: ${area.activeIncidents}\n` +
      `Coverage: ${area.coverage}%`
    );
  }

}