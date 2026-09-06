import { Component, inject } from '@angular/core';
import { TranslationService } from '../../../core/services/translation';

@Component({
  selector: 'app-workflow-section',
  standalone: true,
  imports: [],
  templateUrl: './workflow-section.html',
  styleUrl: './workflow-section.scss',
})
export class WorkflowSection {

  translation = inject(TranslationService);

  t(key: string): string {
    return this.translation.translate(key);
  }

  workflowStages = [
    {
      number: '01',
      icon: 'bi-megaphone-fill',
      titleKey: 'workflowReport',
      descriptionKey: 'workflowReportDescription',
    },
    {
      number: '02',
      icon: 'bi-clipboard2-pulse-fill',
      titleKey: 'workflowTriage',
      descriptionKey: 'workflowTriageDescription',
    },
    {
      number: '03',
      icon: 'bi-people-fill',
      titleKey: 'workflowMatch',
      descriptionKey: 'workflowMatchDescription',
    },
    {
      number: '04',
      icon: 'bi-chat-square-text-fill',
      titleKey: 'workflowGuide',
      descriptionKey: 'workflowGuideDescription',
    },
    {
      number: '05',
      icon: 'bi-diagram-3-fill',
      titleKey: 'workflowCoordinate',
      descriptionKey: 'workflowCoordinateDescription',
    },
    {
      number: '06',
      icon: 'bi-hospital-fill',
      titleKey: 'workflowHandover',
      descriptionKey: 'workflowHandoverDescription',
    },
    {
      number: '07',
      icon: 'bi-graph-up-arrow',
      titleKey: 'workflowLearn',
      descriptionKey: 'workflowLearnDescription',
    },
  ];
}