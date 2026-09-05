import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

import { LoadingSpinner } from '../../../shared/components/loading-spinner/loading-spinner';
import { IncidentService } from '../../../core/services/incident';
import { Incident } from '../../../core/models/incident';

interface Responder {
  id: number;
  name: string;
  initials: string;
  role: string;
  distance: string;
  eta: string;
  rating: number;
  verified: boolean;
  available: boolean;
  skills: string[];
  icon: string;
}

@Component({
  selector: 'app-nearby-responders',
  standalone: true,
  imports: [
    CommonModule,
    LoadingSpinner
  ],
  templateUrl: './nearby-responders.html',
  styleUrl: './nearby-responders.scss',
})
export class NearbyResponders {

  private readonly router = inject(Router);
  private readonly incidentService = inject(IncidentService);

  searchRadius = '2 km';

  activeIncident: Incident | null | undefined = null;

  selectedResponder: Responder | null = null;

  acceptingIncident = false;

  incidentAccepted = false;

  responders: Responder[] = [
    {
      id: 1,
      name: 'Arun Kumar',
      initials: 'AK',
      role: 'First-Aid Trained',
      distance: '0.4 km',
      eta: '3 min',
      rating: 4.9,
      verified: true,
      available: true,
      skills: [
        'First Aid',
        'Traffic Support'
      ],
      icon: 'bi-person-check-fill'
    },

    {
      id: 2,
      name: 'Priya S',
      initials: 'PS',
      role: 'Community Volunteer',
      distance: '0.8 km',
      eta: '5 min',
      rating: 4.8,
      verified: true,
      available: true,
      skills: [
        'Community Support',
        'Location Guidance'
      ],
      icon: 'bi-person-heart'
    },

    {
      id: 3,
      name: 'Vignesh R',
      initials: 'VR',
      role: 'First Response Volunteer',
      distance: '1.1 km',
      eta: '7 min',
      rating: 4.7,
      verified: true,
      available: true,
      skills: [
        'First Aid',
        'Emergency Communication'
      ],
      icon: 'bi-shield-check'
    },

    {
      id: 4,
      name: 'Kavya M',
      initials: 'KM',
      role: 'Community Volunteer',
      distance: '1.6 km',
      eta: '9 min',
      rating: 4.6,
      verified: true,
      available: false,
      skills: [
        'Location Guidance',
        'Communication'
      ],
      icon: 'bi-person-check'
    }
  ];

  constructor() {
    this.loadActiveIncident();
  }

  private loadActiveIncident(): void {
   this.activeIncident =
  this.incidentService.getActiveIncident() ?? null;
  
    if (this.activeIncident) {

      console.log(
        'GoldenLink ACTIVE INCIDENT:',
        this.activeIncident
      );

      // Move incident into responder search state
      if (
        this.activeIncident.status === 'reported'
      ) {
        this.activeIncident =
          this.incidentService.updateIncident(
            this.activeIncident.incidentId,
            {
              status: 'responder_search'
            }
          );
      }
    }
  }

  get availableResponders(): Responder[] {
    return this.responders.filter(
      responder => responder.available
    );
  }

  get availableCount(): number {
    return this.availableResponders.length;
  }

  changeRadius(radius: string): void {
    this.searchRadius = radius;
  }

  requestHelp(responder: Responder): void {

    if (!responder.available) {
      return;
    }

    if (!this.activeIncident) {
      alert(
        'No active GoldenLink incident was found.'
      );
      return;
    }

    this.selectedResponder = responder;

    this.acceptIncident(responder);
  }

  private acceptIncident(
    responder: Responder
  ): void {

    if (!this.activeIncident) {
      return;
    }

    this.acceptingIncident = true;

    console.log(
      'GoldenLink: Responder accepting incident',
      responder
    );

    /*
     * Update the local incident.
     *
     * Later this same operation will be
     * connected to the backend API.
     */

    setTimeout(() => {

      if (!this.activeIncident) {
        return;
      }

      const updatedIncident =
        this.incidentService.updateIncident(
          this.activeIncident.incidentId,
          {
            status: 'responder_assigned',
            responder: {
              id: responder.id,
              name: responder.name,
              role: responder.role,
              distance: responder.distance,
              eta: responder.eta,
              rating: responder.rating
            }
          }
        );

      this.activeIncident =
        updatedIncident;

      this.incidentAccepted = true;

      this.acceptingIncident = false;

      console.log(
        'GoldenLink: Incident accepted',
        updatedIncident
      );

      /*
       * Give the user a moment to see
       * the successful assignment message.
       */

      setTimeout(() => {
        this.router.navigate([
          '/responder-dashboard'
        ]);
      }, 1800);

    }, 700);
  }

  viewIncident(): void {

    if (!this.activeIncident) {
      return;
    }

    console.log(
      'GoldenLink Incident:',
      this.activeIncident
    );
  }

  getIncidentSeverityLabel(): string {

    if (!this.activeIncident) {
      return 'Unknown';
    }

    return (
      this.activeIncident.severity
        .charAt(0)
        .toUpperCase() +
      this.activeIncident.severity.slice(1)
    );
  }

  getIncidentLocation(): string {

    if (!this.activeIncident) {
      return 'Location unavailable';
    }

    return (
      this.activeIncident.location.address ||
      `${this.activeIncident.location.latitude.toFixed(5)}, ` +
      `${this.activeIncident.location.longitude.toFixed(5)}`
    );
  }
}