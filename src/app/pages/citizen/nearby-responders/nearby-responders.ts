import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

import { LoadingSpinner } from '../../../shared/components/loading-spinner/loading-spinner';
import { IncidentService } from '../../../core/services/incident';
import { ResponderService } from '../../../core/services/responder';
import { Incident } from '../../../core/models/incident';
import { TranslationService } from '../../../core/services/translation';

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
export class NearbyResponders implements OnInit {

  private readonly router = inject(Router);

  private readonly incidentService =
    inject(IncidentService);

  private readonly responderService =
    inject(ResponderService);

  readonly translation =
    inject(TranslationService);

  t(key: string): string {
    return this.translation.translate(key);
  }

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

  ngOnInit(): void {
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

      // Load recommended or nearby responders from backend
      this.responderService.getRecommendedResponders(this.activeIncident.incidentId).subscribe(resList => {
        if (resList && resList.length > 0) {
          this.responders = resList.map((r, i) => ({
            id: Number(r.id || i + 1),
            name: r.name || 'Responder',
            initials: r.initials || (r.name ? r.name.slice(0, 2).toUpperCase() : 'CR'),
            role: r.role || 'Community Responder',
            distance: r.distance || `${r.distanceKm || 0.5} km`,
            eta: r.eta || `${r.estimatedArrivalMinutes || 4} min`,
            rating: r.rating || 4.8,
            verified: r.verified !== false,
            available: r.available !== false,
            skills: r.skills || ['First Aid'],
            icon: r.icon || 'bi-person-check-fill'
          }));
        }
      });

      // Keep existing incident workflow unchanged.
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
        this.t('nearbyNoActiveIncident')
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

    // Call backend accept endpoint
    this.responderService.acceptIncident(responder.id, this.activeIncident.incidentId).subscribe({
      next: (res) => console.log('GoldenLink: Backend responder accept success:', res),
      error: (err) => console.warn('GoldenLink: Backend responder accept fallback:', err)
    });

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
      return this.t('nearbyUnknown');
    }

    switch (this.activeIncident.severity) {

      case 'critical':
        return this.t('critical');

      case 'serious':
        return this.t('nearbySerious');

      case 'moderate':
        return this.t('moderate');

      default:
        return this.t('nearbyUnknown');
    }
  }

  getAccidentTypeLabel(): string {

    if (!this.activeIncident) {
      return this.t('notSure');
    }

    const type =
      String(
        this.activeIncident.accidentType ?? ''
      )
        .trim()
        .toUpperCase();

    switch (type) {

      case 'ROAD_ACCIDENT':
      case 'ROAD':
      case 'CAR_ACCIDENT':
      case 'CAR':
        return this.t('roadAccident');

      case 'TWO_WHEELER':
      case 'TWO_WHEELER_ACCIDENT':
      case 'TWO_WHEELER_INCIDENT':
      case 'BIKE':
      case 'MOTORCYCLE':
        return this.t('twoWheelerAccident');

      case 'PEDESTRIAN':
      case 'PEDESTRIAN_INCIDENT':
        return this.t('pedestrianIncident');

      case 'NOT_SURE':
      case 'UNKNOWN':
        return this.t('notSure');

      default:
        return this.activeIncident.accidentType || this.t('notSure');
    }
  }

  getIncidentLocation(): string {

    if (!this.activeIncident) {
      return this.t('nearbyLocationUnavailable');
    }

    return (
      this.activeIncident.location.address ||
      `${this.activeIncident.location.latitude.toFixed(5)}, ` +
      `${this.activeIncident.location.longitude.toFixed(5)}`
    );
  }

  getResponderRole(role: string): string {

    switch (role) {

      case 'First-Aid Trained':
        return this.t('nearbyFirstAidTrained');

      case 'Community Volunteer':
        return this.t('nearbyCommunityVolunteer');

      case 'First Response Volunteer':
        return this.t('nearbyFirstResponseVolunteer');

      default:
        return role;
    }
  }

  getSkillLabel(skill: string): string {

    switch (skill) {

      case 'First Aid':
        return this.t('nearbyFirstAid');

      case 'Traffic Support':
        return this.t('nearbyTrafficSupport');

      case 'Community Support':
        return this.t('nearbyCommunitySupport');

      case 'Location Guidance':
        return this.t('nearbyLocationGuidance');

      case 'Emergency Communication':
        return this.t('nearbyEmergencyCommunication');

      case 'Communication':
        return this.t('nearbyCommunication');

      default:
        return skill;
    }
  }
}