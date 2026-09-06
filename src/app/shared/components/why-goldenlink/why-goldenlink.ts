import { Component, inject } from '@angular/core';

import { TranslationService } from '../../../core/services/translation';

@Component({
  selector: 'app-why-goldenlink',
  standalone: true,
  imports: [],
  templateUrl: './why-goldenlink.html',
  styleUrl: './why-goldenlink.scss',
})
export class WhyGoldenlink {

  translation = inject(TranslationService);

  t(key: string): string {
    return this.translation.translate(key);
  }

  features = [
    {
      icon: 'bi-people-fill',
      titleKey: 'communityCoordination',
      descriptionKey: 'communityCoordinationDescription',
    },
    {
      icon: 'bi-geo-alt-fill',
      titleKey: 'locationAwareResponse',
      descriptionKey: 'locationAwareResponseDescription',
    },
    {
      icon: 'bi-person-check-fill',
      titleKey: 'suitableResponders',
      descriptionKey: 'suitableRespondersDescription',
    },
    {
      icon: 'bi-translate',
      titleKey: 'multilingualGuidance',
      descriptionKey: 'multilingualGuidanceDescription',
    },
    {
      icon: 'bi-list-check',
      titleKey: 'simpleRoles',
      descriptionKey: 'simpleRolesDescription',
    },
    {
      icon: 'bi-shield-check',
      titleKey: 'professionalHandover',
      descriptionKey: 'professionalHandoverDescription',
    },
  ];
}