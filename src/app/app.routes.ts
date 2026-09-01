import { Routes } from '@angular/router';

export const routes: Routes = [

  // =====================================================
  // HOME
  // =====================================================

  {
    path: '',
    loadComponent: () =>
      import('./pages/citizen/home/home')
        .then(m => m.Home),
  },


  // =====================================================
  // CITIZEN PAGES
  // =====================================================

  {
    path: 'report-accident',
    loadComponent: () =>
      import('./pages/citizen/report-accident/report-accident')
        .then(m => m.ReportAccident),
  },

  {
    path: 'ai-assistant',
    loadComponent: () =>
      import('./pages/ai-assistant/ai-assistant')
        .then(m => m.AiAssistant),
  },

  {
    path: 'accident-records',
    loadComponent: () =>
      import('./pages/citizen/accident-records/accident-records')
        .then(m => m.AccidentRecords),
  },

  {
    path: 'community',
    loadComponent: () =>
      import('./pages/citizen/community/community')
        .then(m => m.Community),
  },

  {
    path: 'nearby-responders',
    loadComponent: () =>
      import('./pages/citizen/nearby-responders/nearby-responders')
        .then(m => m.NearbyResponders),
  },

  {
    path: 'volunteer-search',
    loadComponent: () =>
      import('./pages/citizen/volunteer-search/volunteer-search')
        .then(m => m.VolunteerSearch),
  },


  // =====================================================
  // COMMUNITY PAGES
  // =====================================================

  {
    path: 'nearby-community',
    loadComponent: () =>
      import('./pages/community/nearby-community/nearby-community')
        .then(m => m.NearbyCommunity),
  },


  // =====================================================
  // RESPONDER PAGES
  // =====================================================

  // Responder Dashboard
  {
    path: 'responder-dashboard',
    loadComponent: () =>
      import('./pages/responder/responder-dashboard/responder-dashboard')
        .then(m => m.ResponderDashboard),
  },

  // Incident Response
  {
    path: 'incident-response',
    loadComponent: () =>
      import('./pages/responder/incident-response/incident-response')
        .then(m => m.IncidentResponse),
  },

  // Responder Profile
  {
    path: 'responder-profile',
    loadComponent: () =>
      import('./pages/responder/responder-profile/responder-profile')
        .then(m => m.ResponderProfile),
  },


  // =====================================================
  // FALLBACK
  // =====================================================

  {
    path: '**',
    redirectTo: '',
  }

];
