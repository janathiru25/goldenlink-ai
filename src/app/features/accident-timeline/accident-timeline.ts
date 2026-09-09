import { CommonModule } from '@angular/common';
import { Component, Input, inject } from '@angular/core';

import { Incident } from '../../core/models/incident';
import { TranslationService } from '../../core/services/translation';

interface TimelineStep {
  key: string;
  labelKey: string;
  descriptionKey: string;
  icon: string;
}

@Component({
  selector: 'app-accident-timeline',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './accident-timeline.html',
  styleUrl: './accident-timeline.scss',
})
export class AccidentTimeline {

  private readonly translationService = inject(TranslationService);

  @Input() incident: Incident | null = null;

  readonly timelineSteps: TimelineStep[] = [
    {
      key: 'reported',
      labelKey: 'accidentTimelineReportCreated',
      descriptionKey: 'accidentTimelineReportCreatedDescription',
      icon: 'bi-file-earmark-plus',
    },
    {
      key: 'assessment',
      labelKey: 'accidentTimelineAiAssessment',
      descriptionKey: 'accidentTimelineAiAssessmentDescription',
      icon: 'bi-robot',
    },
    {
      key: 'review',
      labelKey: 'accidentTimelineUnderReview',
      descriptionKey: 'accidentTimelineUnderReviewDescription',
      icon: 'bi-search',
    },
    {
      key: 'verified',
      labelKey: 'accidentTimelineVerified',
      descriptionKey: 'accidentTimelineVerifiedDescription',
      icon: 'bi-patch-check',
    },
    {
      key: 'assigned',
      labelKey: 'accidentTimelineResponderAssigned',
      descriptionKey: 'accidentTimelineResponderAssignedDescription',
      icon: 'bi-person-check',
    },
    {
      key: 'on-scene',
      labelKey: 'accidentTimelineResponderOnScene',
      descriptionKey: 'accidentTimelineResponderOnSceneDescription',
      icon: 'bi-geo-alt',
    },
    {
      key: 'hospital',
      labelKey: 'accidentTimelineHospitalArrival',
      descriptionKey: 'accidentTimelineHospitalArrivalDescription',
      icon: 'bi-hospital',
    },
    {
      key: 'resolved',
      labelKey: 'accidentTimelineResolved',
      descriptionKey: 'accidentTimelineResolvedDescription',
      icon: 'bi-check-circle',
    },
  ];

  get currentStepIndex(): number {
    const status = this.normalizeStatus(this.incident?.status);

    switch (status) {
      case 'reported':
      case 'created':
      case 'pending':
        return 0;

      case 'assessing':
      case 'ai_assessment':
      case 'ai-assessment':
        return 1;

      case 'review':
      case 'under_review':
      case 'under-review':
        return 2;

      case 'verified':
        return 3;

      case 'assigned':
      case 'responder_assigned':
      case 'responder-assigned':
        return 4;

      case 'on_scene':
      case 'on-scene':
      case 'responding':
        return 5;

      case 'hospital':
      case 'hospital_arrival':
      case 'hospital-arrival':
        return 6;

      case 'resolved':
      case 'completed':
      case 'closed':
        return 7;

      default:
        return this.inferStepFromIncident();
    }
  }

  isCompleted(index: number): boolean {
    return index < this.currentStepIndex;
  }

  isCurrent(index: number): boolean {
    return index === this.currentStepIndex;
  }

  isPending(index: number): boolean {
    return index > this.currentStepIndex;
  }

  /**
   * Translates general timeline text.
   */
  getText(key: string): string {
    const translationKeys: Record<string, string> = {
      title: 'accidentTimelineTitle',
      subtitle: 'accidentTimelineSubtitle',
      current: 'accidentTimelineCurrent',
      completed: 'accidentTimelineCompleted',
      statusUpdated: 'accidentTimelineStatusUpdated',
      footer: 'accidentTimelineFooter',
      noIncident: 'accidentTimelineNoIncident',
    };

    return this.translationService.translate(
      translationKeys[key] ?? key
    );
  }

  /**
   * Translates timeline step labels and descriptions.
   */
  getStepText(
    stepKey: string,
    type: 'label' | 'description'
  ): string {

    const step = this.timelineSteps.find(
      item => item.key === stepKey
    );

    if (!step) {
      return '';
    }

    const translationKey =
      type === 'label'
        ? step.labelKey
        : step.descriptionKey;

    return this.translationService.translate(
      translationKey
    );
  }

  private inferStepFromIncident(): number {
    if (!this.incident) {
      return 0;
    }

    if (this.incident.hospital) {
      return 6;
    }

    if (this.incident.responder) {
      return 4;
    }

    if (this.incident.aiAssessment) {
      return 1;
    }

    return 0;
  }

  private normalizeStatus(status: unknown): string {
    if (status === null || status === undefined) {
      return '';
    }

    return String(status)
      .trim()
      .toLowerCase()
      .replace(/\s+/g, '_');
  }
}