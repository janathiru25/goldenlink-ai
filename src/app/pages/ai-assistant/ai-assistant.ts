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

  questions = [
    'Are you currently at the accident location?',
    'How many people are injured?',
    'Is anyone unconscious?',
    'Is anyone bleeding heavily?',
    'Is anyone having difficulty breathing?',
    'Is anyone trapped inside a vehicle or unable to move?'
  ];


  // ---------------------------------------------------------
  // CONSTRUCTOR
  // ---------------------------------------------------------

  constructor() {

    this.loadActiveIncident();

  }


  // ---------------------------------------------------------
  // EMPTY INCIDENT
  // ---------------------------------------------------------

  private createEmptyIncident(): Incident {

    return {

      incidentId: 'UNKNOWN',

      reportedAt:
        new Date().toISOString(),

      status:
        'reported',

      accidentType:
        'Road Accident',

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
          'Location unavailable'

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
        'Not requested',

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
        'Hello. I’m GoldenLink AI, your emergency-response assistant.'
      );

      setTimeout(() => {

        this.addAiMessage(
          'There is currently no active incident. You can report an accident first, or ask me for general emergency-response guidance.'
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
      'Hello. I’m GoldenLink AI, your emergency-response assistant.'
    );

    setTimeout(() => {

      this.addAiMessage(
        `I’m connected to incident #${this.incident.incidentId}. I can help you understand the current emergency and provide response-coordination guidance.`
      );

    }, 700);


    if (this.assessmentComplete) {

      setTimeout(() => {

        this.addAiMessage(
          `The current incident is assessed as ${this.getSeverityLabel().toUpperCase()} with ${this.confidence}% assessment confidence.`
        );

      }, 1400);

      return;

    }


    setTimeout(() => {

      this.addAiMessage(
        'I’ll ask a few quick questions to help assess the incident.'
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
      'I can help with emergency-response coordination. Stay in a safe location, avoid unnecessary movement of injured people, and follow instructions from emergency services.';


    if (
      normalized.includes('bleeding')
    ) {

      response =
        'If someone is bleeding heavily, seek emergency medical help immediately. If it is safe to do so, apply firm pressure to the wound with clean cloth or gauze until professional help arrives.';

    }


    else if (
      normalized.includes('unconscious') ||
      normalized.includes('not responding')
    ) {

      response =
        'If someone is unconscious or not responding, contact emergency services immediately. Check whether they are breathing and follow instructions from the emergency dispatcher.';

    }


    else if (
      normalized.includes('breathing')
    ) {

      response =
        'Difficulty breathing is an emergency warning sign. Contact emergency services immediately and keep the person in a safe position while waiting for professional assistance.';

    }


    else if (
      normalized.includes('trapped')
    ) {

      response =
        'Do not attempt to forcibly remove a trapped person unless there is immediate danger such as fire. Contact emergency services and wait for trained responders.';

    }


    else if (
      normalized.includes('responder')
    ) {

      response =
        'The responder assigned to this incident can be viewed from the Responder Dashboard. Keep the accident location accessible and follow responder instructions when they arrive.';

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

      answer.includes('true')

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
        'The reported conditions indicate a critical emergency requiring immediate response coordination.';

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
        'Multiple victims have been reported. Prompt community and emergency assistance is recommended.';

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
        'The reported incident requires assistance and monitoring. Community response can be coordinated.';

    }


    // -------------------------------------------------------
    // SAVE ASSESSMENT
    // -------------------------------------------------------

    if (this.hasActiveIncident) {

      const updatedIncident =
        this.incidentService.updateIncident(

          this.incident.incidentId,

          {

            // IMPORTANT:
            // Do NOT change the response status here.

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
        'Thank you. I have completed the initial incident assessment.'
      );

      setTimeout(() => {

        this.addAiMessage(
          `The incident has been assessed as ${this.severity.toUpperCase()}. Help coordination can continue based on the current response status.`
        );

      }, 700);

    }, 500);

  }


  // ---------------------------------------------------------
  // SEVERITY LABEL
  // ---------------------------------------------------------

  getSeverityLabel(): string {

    return (

      this.severity
        .charAt(0)
        .toUpperCase() +

      this.severity.slice(1)

    );

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