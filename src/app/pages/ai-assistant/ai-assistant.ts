import {
  Component,
  inject
} from '@angular/core';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import {
  Incident,
  IncidentSeverity
} from '../../core/models/incident';

import { IncidentService } from '../../core/services/incident';
import { TranslationService } from '../../core/services/translation';

interface ChatMessage {
  sender: 'ai' | 'user';
  text: string;
}

@Component({
  selector: 'app-ai-assistant',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './ai-assistant.html',
  styleUrl: './ai-assistant.scss'
})
export class AiAssistant {

  // ---------------------------------------------------------
  // SERVICES
  // ---------------------------------------------------------

  private readonly router =
    inject(Router);

  private readonly incidentService =
    inject(IncidentService);

  readonly translation =
    inject(TranslationService);

  t(key: string): string {
    return this.translation.translate(key);
  }


  // ---------------------------------------------------------
  // CHAT STATE
  // ---------------------------------------------------------

  messages: ChatMessage[] = [];

  userMessage = '';

  currentQuestion = 0;

  isTyping = false;

  assessmentComplete = false;


  // ---------------------------------------------------------
  // INCIDENT
  // ---------------------------------------------------------

  incident: Incident =
    this.createEmptyIncident();

  hasActiveIncident = false;


  // ---------------------------------------------------------
  // AI ASSESSMENT
  // ---------------------------------------------------------

  severity: IncidentSeverity =
    'moderate';

  confidence = 0;

  assessmentSummary = '';


  // ---------------------------------------------------------
  // QUESTIONS
  // ---------------------------------------------------------

  questions: string[] = [];


  // ---------------------------------------------------------
  // CONSTRUCTOR
  // ---------------------------------------------------------

  constructor() {

    this.setQuestions();

    this.loadActiveIncident();

  }


  // ---------------------------------------------------------
  // QUESTIONS TRANSLATION
  // ---------------------------------------------------------

  private setQuestions(): void {

    this.questions = [
      this.t('aiQuestionAtLocation'),
      this.t('aiQuestionInjuredPeople'),
      this.t('aiQuestionUnconscious'),
      this.t('aiQuestionHeavyBleeding'),
      this.t('aiQuestionBreathingDifficulty'),
      this.t('aiQuestionTrapped')
    ];

  }


  // ---------------------------------------------------------
  // EMPTY INCIDENT
  // ---------------------------------------------------------

  private createEmptyIncident(): Incident {

    return {

      incidentId:
        'UNKNOWN',

      reportedAt:
        new Date().toISOString(),

      status:
        'reported',

      accidentType:
        this.t('roadAccident'),

      severity:
        'moderate',

      victims:
        0,

      unconscious:
        false,

      bleeding:
        false,

      breathingDifficulty:
        false,

      trapped:
        false,

      description:
        '',

      location: {

        latitude:
          0,

        longitude:
          0,

        address:
          this.t('locationUnavailable')

      },

      aiAssessment: {

        severity:
          'moderate',

        confidence:
          0,

        summary:
          ''

      },

      responder:
        null,

      ambulanceStatus:
        this.t('aiNotRequested'),

      hospital:
        null

    };

  }


  // ---------------------------------------------------------
  // LOAD ACTIVE INCIDENT
  // ---------------------------------------------------------

  private loadActiveIncident(): void {

    const activeIncident =
      this.incidentService.getActiveIncident();


    // -------------------------------------------------------
    // NO ACTIVE INCIDENT
    // -------------------------------------------------------

    if (!activeIncident) {

      this.hasActiveIncident =
        false;

      console.warn(
        'GoldenLink: No active incident found.'
      );

      this.addAiMessage(
        this.t('aiWelcome')
      );

      setTimeout(() => {

        this.addAiMessage(
          this.t('aiNoActiveIncident')
        );

      }, 700);

      return;

    }


    // -------------------------------------------------------
    // ACTIVE INCIDENT FOUND
    // -------------------------------------------------------

    this.hasActiveIncident =
      true;

    this.incident = {
      ...activeIncident
    };


    // -------------------------------------------------------
    // USE EXISTING AI ASSESSMENT
    // -------------------------------------------------------

    if (
      activeIncident.aiAssessment &&
      activeIncident.aiAssessment.confidence > 0 &&
      activeIncident.aiAssessment.summary
    ) {

      this.severity =
        activeIncident.aiAssessment.severity;

      this.confidence =
        activeIncident.aiAssessment.confidence;

      this.assessmentSummary =
        activeIncident.aiAssessment.summary;

      this.assessmentComplete =
        true;

    }


    // -------------------------------------------------------
    // START AI CHAT
    // -------------------------------------------------------

    this.startContextualConversation();

  }


  // ---------------------------------------------------------
  // CONTEXTUAL AI CONVERSATION
  // ---------------------------------------------------------

  private startContextualConversation(): void {

    this.addAiMessage(
      this.t('aiWelcome')
    );

    setTimeout(() => {

      this.addAiMessage(
        this.t('aiConnectedToIncident')
          .replace(
            '{incidentId}',
            this.incident.incidentId
          )
      );

    }, 700);


    if (this.assessmentComplete) {

      setTimeout(() => {

        this.addAiMessage(
          this.t('aiExistingAssessment')
            .replace(
              '{severity}',
              this.getSeverityLabel().toUpperCase()
            )
            .replace(
              '{confidence}',
              this.confidence.toString()
            )
        );

      }, 1400);

      return;

    }


    setTimeout(() => {

      this.addAiMessage(
        this.t('aiQuickAssessmentIntro')
      );

      setTimeout(() => {

        this.askNextQuestion();

      }, 700);

    }, 1400);

  }


  // ---------------------------------------------------------
  // START CONVERSATION
  // ---------------------------------------------------------

  startConversation(): void {

    this.startContextualConversation();

  }


  // ---------------------------------------------------------
  // ADD AI MESSAGE
  // ---------------------------------------------------------

  addAiMessage(
    text: string
  ): void {

    this.messages.push({

      sender:
        'ai',

      text

    });

  }


  // ---------------------------------------------------------
  // ADD USER MESSAGE
  // ---------------------------------------------------------

  addUserMessage(
    text: string
  ): void {

    this.messages.push({

      sender:
        'user',

      text

    });

  }


  // ---------------------------------------------------------
  // ASK NEXT QUESTION
  // ---------------------------------------------------------

  askNextQuestion(): void {

    if (
      this.currentQuestion >=
      this.questions.length
    ) {

      this.generateAssessment();

      return;

    }

    this.isTyping =
      true;

    setTimeout(() => {

      this.isTyping =
        false;

      this.addAiMessage(
        this.questions[
          this.currentQuestion
        ]
      );

    }, 700);

  }


  // ---------------------------------------------------------
  // SEND MESSAGE
  // ---------------------------------------------------------

  sendMessage(): void {

    const message =
      this.userMessage.trim();

    if (!message) {
      return;
    }

    this.addUserMessage(
      message
    );

    this.userMessage =
      '';


    // -------------------------------------------------------
    // ASSESSMENT QUESTIONS
    // -------------------------------------------------------

    if (
      !this.assessmentComplete &&
      this.currentQuestion <
      this.questions.length
    ) {

      this.processAnswer(
        message
      );

      return;

    }


    // -------------------------------------------------------
    // GENERAL AI RESPONSE
    // -------------------------------------------------------

    this.handleGeneralQuestion(
      message
    );

  }


  // ---------------------------------------------------------
  // PROCESS ASSESSMENT ANSWER
  // ---------------------------------------------------------

  processAnswer(
    answer: string
  ): void {

    const normalized =
      answer.toLowerCase();


    switch (
      this.currentQuestion
    ) {

      // LOCATION

      case 0:

        break;


      // VICTIMS

      case 1: {

        const number =
          parseInt(
            answer,
            10
          );

        this.incident.victims =
          Number.isNaN(number)
            ? 1
            : Math.max(
                number,
                1
              );

        break;

      }


      // UNCONSCIOUS

      case 2:

        this.incident.unconscious =
          this.isPositiveAnswer(
            normalized
          );

        break;


      // BLEEDING

      case 3:

        this.incident.bleeding =
          this.isPositiveAnswer(
            normalized
          );

        break;


      // BREATHING

      case 4:

        this.incident.breathingDifficulty =
          this.isPositiveAnswer(
            normalized
          );

        break;


      // TRAPPED

      case 5:

        this.incident.trapped =
          this.isPositiveAnswer(
            normalized
          );

        break;

    }


    this.currentQuestion++;

    this.askNextQuestion();

  }


  // ---------------------------------------------------------
  // GENERAL AI RESPONSE
  // ---------------------------------------------------------

  private handleGeneralQuestion(
    message: string
  ): void {

    const normalized =
      message.toLowerCase();


    let response =
      this.t('aiGeneralResponse');


    if (
      normalized.includes('bleeding')
    ) {

      response =
        this.t('aiBleedingResponse');

    }


    else if (
      normalized.includes('unconscious') ||
      normalized.includes('not responding')
    ) {

      response =
        this.t('aiUnconsciousResponse');

    }


    else if (
      normalized.includes('breathing')
    ) {

      response =
        this.t('aiBreathingResponse');

    }


    else if (
      normalized.includes('trapped')
    ) {

      response =
        this.t('aiTrappedResponse');

    }


    else if (
      normalized.includes('responder')
    ) {

      response =
        this.t('aiResponderResponse');

    }


    this.addAiMessage(
      response
    );

  }


  // ---------------------------------------------------------
  // POSITIVE ANSWER
  // ---------------------------------------------------------

  private isPositiveAnswer(
    answer: string
  ): boolean {

    return (

      answer.includes('yes') ||

      answer.includes('yeah') ||

      answer.includes('yep') ||

      answer.includes('true') ||

      answer.includes('ஆம்') ||

      answer.includes('ஆமாம்') ||

      answer.includes('ஆம்') ||

      answer.includes('हाँ') ||

      answer.includes('అవును') ||

      answer.includes('അതെ')

    );

  }


  // ---------------------------------------------------------
  // GENERATE AI ASSESSMENT
  // ---------------------------------------------------------

  generateAssessment(): void {

    this.assessmentComplete =
      true;


    // -------------------------------------------------------
    // CRITICAL
    // -------------------------------------------------------

    if (

      this.incident.unconscious ||

      this.incident.bleeding ||

      this.incident.breathingDifficulty ||

      this.incident.trapped

    ) {

      this.severity =
        'critical';

      this.confidence =
        94;

      this.assessmentSummary =
        this.t(
          'aiCriticalAssessment'
        );

    }


    // -------------------------------------------------------
    // SERIOUS
    // -------------------------------------------------------

    else if (
      this.incident.victims >= 3
    ) {

      this.severity =
        'serious';

      this.confidence =
        90;

      this.assessmentSummary =
        this.t(
          'aiSeriousAssessment'
        );

    }


    // -------------------------------------------------------
    // MODERATE
    // -------------------------------------------------------

    else {

      this.severity =
        'moderate';

      this.confidence =
        86;

      this.assessmentSummary =
        this.t(
          'aiModerateAssessment'
        );

    }


    // -------------------------------------------------------
    // SAVE ASSESSMENT
    // -------------------------------------------------------

    if (this.hasActiveIncident) {

      const updatedIncident =
        this.incidentService.updateIncident(

          this.incident.incidentId,

          {

            severity:
              this.severity,

            victims:
              this.incident.victims,

            unconscious:
              this.incident.unconscious,

            bleeding:
              this.incident.bleeding,

            breathingDifficulty:
              this.incident.breathingDifficulty,

            trapped:
              this.incident.trapped,

            aiAssessment: {

              severity:
                this.severity,

              confidence:
                this.confidence,

              summary:
                this.assessmentSummary

            }

          }

        );


      if (updatedIncident) {

        this.incident =
          updatedIncident;

      }

    }


    // -------------------------------------------------------
    // AI RESPONSE
    // -------------------------------------------------------

    setTimeout(() => {

      this.addAiMessage(
        this.t('aiAssessmentCompleted')
      );

      setTimeout(() => {

        this.addAiMessage(
          this.t('aiAssessmentResult')
            .replace(
              '{severity}',
              this.severity.toUpperCase()
            )
        );

      }, 700);

    }, 500);

  }


  // ---------------------------------------------------------
  // SEVERITY LABEL
  // ---------------------------------------------------------

  getSeverityLabel(): string {

    switch (
      this.severity
    ) {

      case 'critical':
        return this.t(
          'severityCritical'
        );

      case 'serious':
        return this.t(
          'severitySerious'
        );

      case 'moderate':
        return this.t(
          'severityModerate'
        );

      case 'normal':
        return this.t(
          'severityNormal'
        );

      default:
        return this.severity;

    }

  }


  // ---------------------------------------------------------
  // SEVERITY CLASS
  // ---------------------------------------------------------

  getSeverityClass(): string {

    return `severity-${this.severity}`;

  }


  // ---------------------------------------------------------
  // QUICK ANSWER
  // ---------------------------------------------------------

  quickAnswer(
    answer: string
  ): void {

    this.userMessage =
      answer;

    this.sendMessage();

  }


  // ---------------------------------------------------------
  // ACTIVATE RESPONSE
  // ---------------------------------------------------------

  activateResponse(): void {

    if (!this.hasActiveIncident) {

      this.router.navigate([
        '/report-accident'
      ]);

      return;

    }


    const updatedIncident =
      this.incidentService.updateIncident(

        this.incident.incidentId,

        {

          status:
            'responder_search'

        }

      );


    if (updatedIncident) {

      this.incident =
        updatedIncident;

    }


    console.log(
      'GoldenLink: Community response activated',
      this.incident
    );


    this.router.navigate([
      '/nearby-responders'
    ]);

  }


  // ---------------------------------------------------------
  // OPEN RESPONDER DASHBOARD
  // ---------------------------------------------------------

  openResponderDashboard(): void {

    this.router.navigate([
      '/responder-dashboard'
    ]);

  }


  // ---------------------------------------------------------
  // BACK TO REPORT
  // ---------------------------------------------------------

  backToReport(): void {

    this.router.navigate([
      '/report-accident'
    ]);

  }

}