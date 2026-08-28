import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-responder-profile',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './responder-profile.html',
  styleUrl: './responder-profile.scss',
})
export class ResponderProfile {

  isAvailable = true;

  responder = {
    name: 'Arun Kumar',
    role: 'Community Responder',
    responderId: 'GL-R-2026-0142',
    location: 'Coimbatore, Tamil Nadu',
    joined: 'January 2026',
    rating: 4.9,
    responses: 27,
    successfulResponses: 25,
    distance: '3.2 km'
  };

  toggleAvailability(): void {
    this.isAvailable = !this.isAvailable;
  }

  editProfile(): void {
    alert('Profile editing will be available soon.');
  }
}