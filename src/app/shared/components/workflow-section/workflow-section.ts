import { Component } from '@angular/core';

@Component({
  selector: 'app-workflow-section',
  standalone: true,
  imports: [],
  templateUrl: './workflow-section.html',
  styleUrl: './workflow-section.scss',
})
export class WorkflowSection {

  workflowStages = [
    {
      number: '01',
      icon: 'bi-megaphone-fill',
      title: 'Report',
      description: 'An accident is reported with the essential location and situation details.',
    },
    {
      number: '02',
      icon: 'bi-clipboard2-pulse-fill',
      title: 'Triage',
      description: 'Simple questions help identify the appropriate response pathway.',
    },
    {
      number: '03',
      icon: 'bi-people-fill',
      title: 'Match',
      description: 'Nearby suitable responders are identified based on availability and skills.',
    },
    {
      number: '04',
      icon: 'bi-chat-square-text-fill',
      title: 'Guide',
      description: 'Responders receive simple, approved step-by-step guidance.',
    },
    {
      number: '05',
      icon: 'bi-diagram-3-fill',
      title: 'Coordinate',
      description: 'Different responders receive different tasks so the community works together.',
    },
    {
      number: '06',
      icon: 'bi-hospital-fill',
      title: 'Handover',
      description: 'Professional emergency responders take over when they arrive.',
    },
    {
      number: '07',
      icon: 'bi-graph-up-arrow',
      title: 'Learn',
      description: 'Aggregate response data helps identify gaps and improve future readiness.',
    },
  ];

}