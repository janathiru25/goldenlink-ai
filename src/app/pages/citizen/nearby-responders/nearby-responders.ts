import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoadingSpinner } from '../../../shared/components/loading-spinner/loading-spinner';

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
  imports: [CommonModule, 
  LoadingSpinner ],
  templateUrl: './nearby-responders.html',
  styleUrl: './nearby-responders.scss',
})
export class NearbyResponders {

  searchRadius = '2 km';

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
      skills: ['First Aid', 'Traffic Support'],
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
      skills: ['Community Support', 'Location Guidance'],
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
      skills: ['First Aid', 'Emergency Communication'],
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
      skills: ['Location Guidance', 'Communication'],
      icon: 'bi-person-check'
    }
  ];

  get availableResponders(): Responder[] {
    return this.responders.filter(responder => responder.available);
  }

  get availableCount(): number {
    return this.availableResponders.length;
  }

  requestHelp(responder: Responder): void {
    if (!responder.available) {
      return;
    }

    alert(
      `Help request sent to ${responder.name}.\n\n` +
      `Role: ${responder.role}\n` +
      `Distance: ${responder.distance}\n` +
      `Estimated arrival: ${responder.eta}`
    );
  }

  changeRadius(radius: string): void {
    this.searchRadius = radius;
  }

}