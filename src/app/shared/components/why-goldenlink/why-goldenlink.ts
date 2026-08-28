import { Component } from '@angular/core';

@Component({
  selector: 'app-why-goldenlink',
  standalone: true,
  imports: [],
  templateUrl: './why-goldenlink.html',
  styleUrl: './why-goldenlink.scss',
})
export class WhyGoldenlink {

  features = [
    {
      icon: 'bi-people-fill',
      title: 'Community Coordination',
      description:
        'Nearby people can be organised into simple roles instead of everyone trying to do the same thing.',
    },
    {
      icon: 'bi-geo-alt-fill',
      title: 'Location-Aware Response',
      description:
        'The system uses incident and responder location to help connect an accident with nearby suitable responders.',
    },
    {
      icon: 'bi-person-check-fill',
      title: 'Suitable Responders',
      description:
        'Responder matching can consider availability, distance, skills and registered training.',
    },
    {
      icon: 'bi-translate',
      title: 'Multilingual Guidance',
      description:
        'The interface can support English, Tamil and accessible regional communication.',
    },
    {
      icon: 'bi-list-check',
      title: 'Simple Roles',
      description:
        'Each participant receives a clear task so the response is easier to understand and coordinate.',
    },
    {
      icon: 'bi-shield-check',
      title: 'Professional Handover',
      description:
        'GoldenLink supports the community response until appropriate professional responders take over.',
    },
  ];

}