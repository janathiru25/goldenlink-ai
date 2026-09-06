import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TranslationService } from '../../../core/services/translation';

@Component({
  selector: 'app-responder-profile',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './responder-profile.html',
  styleUrl: './responder-profile.scss',
})
export class ResponderProfile {
  translation = inject(TranslationService);

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

  t(key: string): string {
    return this.translation.translate(key);
  }

  toggleAvailability(): void {
    this.isAvailable = !this.isAvailable;
  }

  editProfile(): void {
    alert(this.t('profileEditingSoon'));
  }
}