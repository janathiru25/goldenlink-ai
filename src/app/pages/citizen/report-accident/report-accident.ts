import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-report-accident',
  standalone: true,
  imports: [RouterLink, FormsModule],
  templateUrl: './report-accident.html',
  styleUrl: './report-accident.scss',
})
export class ReportAccident {

  currentStep = 1;

  totalSteps = 4;

  incidentType = '';

  peopleInvolved = '';

  locationAccessible = '';

  description = '';

  latitude: number | null = null;

  longitude: number | null = null;

  locationStatus = 'Location not detected';


  nextStep(): void {
    if (this.currentStep < this.totalSteps) {
      this.currentStep++;
    }
  }


  previousStep(): void {
    if (this.currentStep > 1) {
      this.currentStep--;
    }
  }


  getLocation(): void {

    this.locationStatus = 'Detecting your location...';

    if (!navigator.geolocation) {
      this.locationStatus = 'Location is not supported by this browser.';
      return;
    }

    navigator.geolocation.getCurrentPosition(

      (position) => {

        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;

        this.locationStatus = 'Location detected successfully';

      },

      () => {

        this.locationStatus =
          'Unable to detect location. Please check location permission.';

      }

    );

  }


  submitReport(): void {

    const report = {
      incidentType: this.incidentType,
      peopleInvolved: this.peopleInvolved,
      locationAccessible: this.locationAccessible,
      description: this.description,
      latitude: this.latitude,
      longitude: this.longitude,
    };

    console.log('GoldenLink Incident:', report);

  }

}