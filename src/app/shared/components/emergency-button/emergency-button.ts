import { Component } from '@angular/core';

@Component({
  selector: 'app-emergency-button',
  standalone: true,
  templateUrl: './emergency-button.html',
  styleUrl: './emergency-button.scss'
})
export class EmergencyButton {

  isEmergencyOpen = false;

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