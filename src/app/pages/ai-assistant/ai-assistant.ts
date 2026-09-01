import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

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

  private readonly router = inject(Router);

  // ---------------------------------------------------------
  // CHAT STATE
  // ---------------------------------------------------------

  messages: ChatMessage[] = [];

  userMessage = '';

  currentQuestion = 0;

  isTyping = false;

  assessmentComplete = false;

  // ---------------------------------------------------------
  // INCIDENT INFORMATION
  // ---------------------------------------------------------

  incident = {
    incidentId: 'GL1021',
    accidentType: 'Road Accident',
    victims: 0,
    unconscious: false,
    bleeding: false,
    breathingDifficulty: false,
    trapped: false
  };

  // ---------------------------------------------------------
  // AI ASSESSMENT
  // ---------------------------------------------------------

  severity: 'critical' | 'serious' | 'moderate' = 'moderate';

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

  constructor() {
    this.startConversation();
  }

  // ---------------------------------------------------------
  // START CONVERSATION
  // ---------------------------------------------------------

  startConversation(): void {

    this.addAiMessage(
      'Hello. I’m GoldenLink AI, your emergency-response assistant.'
    );

    setTimeout(() => {

      this.addAiMessage(
        'I’ll ask a few quick questions to help assess the incident and coordinate the right response.'
      );

      setTimeout(() => {
        this.askNextQuestion();
      }, 700);

    }, 700);
  }

  // ---------------------------------------------------------
  // ADD AI MESSAGE
  // ---------------------------------------------------------

  addAiMessage(text: string): void {

    this.messages.push({
      sender: 'ai',
      text
    });
  }

  // ---------------------------------------------------------
  // ADD USER MESSAGE
  // ---------------------------------------------------------

  addUserMessage(text: string): void {

    this.messages.push({
      sender: 'user',
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

    this.isTyping = true;

    setTimeout(() => {

      this.isTyping = false;

      this.addAiMessage(
        this.questions[this.currentQuestion]
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

    this.addUserMessage(message);

    this.userMessage = '';

    this.processAnswer(message);
  }

  // ---------------------------------------------------------
  // PROCESS ANSWER
  // ---------------------------------------------------------

  processAnswer(answer: string): void {

    const normalized =
      answer.toLowerCase();

    switch (this.currentQuestion) {

      case 0:

        break;

      case 1:

        const number =
          parseInt(answer, 10);

        this.incident.victims =
          isNaN(number)
            ? 1
            : Math.max(number, 1);

        break;

      case 2:

        this.incident.unconscious =
          this.isPositiveAnswer(normalized);

        break;

      case 3:

        this.incident.bleeding =
          this.isPositiveAnswer(normalized);

        break;

      case 4:

        this.incident.breathingDifficulty =
          this.isPositiveAnswer(normalized);

        break;

      case 5:

        this.incident.trapped =
          this.isPositiveAnswer(normalized);

        break;
    }

    this.currentQuestion++;

    this.askNextQuestion();
  }

  // ---------------------------------------------------------
  // POSITIVE ANSWER DETECTION
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
  // AI ASSESSMENT
  // ---------------------------------------------------------

  generateAssessment(): void {

    this.assessmentComplete = true;

    if (
      this.incident.unconscious ||
      this.incident.bleeding ||
      this.incident.breathingDifficulty ||
      this.incident.trapped
    ) {

      this.severity = 'critical';

      this.confidence = 94;

      this.assessmentSummary =
        'The reported conditions indicate a critical emergency requiring immediate response coordination.';

    } else if (
      this.incident.victims >= 3
    ) {

      this.severity = 'serious';

      this.confidence = 90;

      this.assessmentSummary =
        'Multiple victims have been reported. Prompt community and emergency assistance is recommended.';

    } else {

      this.severity = 'moderate';

      this.confidence = 86;

      this.assessmentSummary =
        'The reported incident requires assistance and monitoring. Community response can be coordinated.';
    }

    setTimeout(() => {

      this.addAiMessage(
        'Thank you. I have completed the initial incident assessment.'
      );

      setTimeout(() => {

        this.addAiMessage(
          `The incident has been assessed as ${this.severity.toUpperCase()}. Help coordination can now begin.`
        );

      }, 700);

    }, 500);
  }

  // ---------------------------------------------------------
  // SEVERITY HELPERS
  // ---------------------------------------------------------

  getSeverityLabel(): string {

    return (
      this.severity.charAt(0).toUpperCase() +
      this.severity.slice(1)
    );
  }

  getSeverityClass(): string {

    return `severity-${this.severity}`;
  }

  // ---------------------------------------------------------
  // QUICK RESPONSE BUTTONS
  // ---------------------------------------------------------

  quickAnswer(answer: string): void {

    this.userMessage = answer;

    this.sendMessage();
  }

  // ---------------------------------------------------------
  // CONTINUE TO RESPONDERS
  // ---------------------------------------------------------

  activateResponse(): void {

    this.router.navigate([
      '/nearby-responders'
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