import { Component, inject } from '@angular/core';

import { TranslationService } from '../../../core/services/translation';

@Component({
  selector: 'app-emergency-button',
  standalone: true,
  templateUrl: './emergency-button.html',
  styleUrl: './emergency-button.scss'
})
export class EmergencyButton {

  translation = inject(TranslationService);

  isEmergencyOpen = false;

  t(key: string): string {
    return this.translation.translate(key);
  }

  openEmergency(): void {
    this.isEmergencyOpen = true;
  }

  closeEmergency(): void {
    this.isEmergencyOpen = false;
  }

  reportAccident(): void {
    this.isEmergencyOpen = false;
    window.location.href = '/report-accident';
  }

  callEmergency(): void {
    window.location.href = 'tel:112';
  }

}