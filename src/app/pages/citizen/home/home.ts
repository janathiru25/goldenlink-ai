import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';

import { WorkflowSection } from '../../../shared/components/workflow-section/workflow-section';
import { WhyGoldenlink } from '../../../shared/components/why-goldenlink/why-goldenlink';
import { CommunityPreview } from '../../../shared/components/community-preview/community-preview';
import { EmergencyCta } from '../../../shared/components/emergency-cta/emergency-cta';
import { EmergencyButton } from '../../../shared/components/emergency-button/emergency-button';
import { Footer } from '../../../shared/components/footer/footer';

import { TranslationService } from '../../../core/services/translation';

@Component({
  selector: 'app-home',
  standalone: true,

  imports: [
    RouterLink,
    WorkflowSection,
    WhyGoldenlink,
    CommunityPreview,
    EmergencyCta,
    EmergencyButton,
    Footer
  ],

  templateUrl: './home.html',
  styleUrl: './home.scss'
})
export class Home {

  translation = inject(TranslationService);

  t(key: string): string {
    return this.translation.translate(key);
  }

}