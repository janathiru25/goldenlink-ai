  import { Injectable, signal } from '@angular/core';

  export type LanguageCode = 'en' | 'ta' | 'hi' | 'te' | 'ml' | 'tl';

  @Injectable({
    providedIn: 'root'
  })
  export class TranslationService {

    private readonly STORAGE_KEY = 'goldenlink-language';

    currentLanguage = signal<LanguageCode>(this.getSavedLanguage());

    private translations: Record<LanguageCode, Record<string, string>> = {

      // ============================================================
      // ENGLISH
      // ============================================================
      en: {

        // Navigation
        home: 'Home',
        reportAccident: 'Report Accident',
        community: 'Community',
        nearbyResponders: 'Nearby Responders',
        volunteers: 'Volunteers',
        aiAssistant: 'GoldenLink AI',
        profile: 'Profile',
        selectLanguage: 'Select Language',

        // Home
        activateCommunity: 'Activate Community',
        CommunityResponse: 'Community Response',
        duringGoldenHour: 'during the Golden Hour',
        DontJustReport: 'Don’t just report an accident.',
        responderDashboard: 'Responder Dashboard',
        emergencyResponse: 'Emergency Response',
        witnessedAccident: 'Witnessed an accident?',
        reportIncidentQuickly:
          'Report the incident quickly and activate nearby community responders during the critical Golden Hour.',
        ActivateCommunity: 'Activate Community',

        HelpCanStart: 'Help Can Start',
        WithPeopleNearby: 'With People Nearby',
        GoldenlinkConnects:
          'GoldenLink connects people in need with trained community responders nearby.',

        NearbyResponders: 'Nearby Responders',
        IdentifyResponders:
          'Identify trained responders who are available near the incident.',

        VerifiedSkills: 'Verified Skills',
        ResponderProfiles:
          'View verified responder profiles and their emergency skills.',

        RoleBasedSupport: 'Role-Based Support',
        DifferentPeople:
          'Different people can provide different types of emergency support.',

        localLanguages: 'Local Languages',
        simpleGuidance:
          'Get simple emergency guidance in familiar local languages.',

        // Why GoldenLink
        whyGoldenLink: 'Why GoldenLink?',
        dontJustReport: "Don't just report.",
        coordinate: 'Coordinate.',
        whyGoldenLinkDescription:
          'GoldenLink is designed to close the coordination gap between an accident happening and effective help reaching the victim.',

        communityCoordination: 'Community Coordination',
        communityCoordinationDescription:
          'Nearby people can be organised into simple roles instead of everyone trying to do the same thing.',

        locationAwareResponse: 'Location-Aware Response',
        locationAwareResponseDescription:
          'The system uses incident and responder location to help connect an accident with nearby suitable responders.',

        suitableResponders: 'Suitable Responders',
        suitableRespondersDescription:
          'Responder matching can consider availability, distance, skills and registered training.',

        multilingualGuidance: 'Multilingual Guidance',
        multilingualGuidanceDescription:
          'The interface can support English, Tamil and accessible regional communication.',

        simpleRoles: 'Simple Roles',
        simpleRolesDescription:
          'Each participant receives a clear task so the response is easier to understand and coordinate.',

        professionalHandover: 'Professional Handover',
        professionalHandoverDescription:
          'GoldenLink supports the community response until appropriate professional responders take over.',

        ourCoreInnovation: 'OUR CORE INNOVATION',
        coordinationLayerGoldenHour:
          'A coordination layer for the Golden Hour.',
        existingSystemsCanCall:
          'Existing systems can call, inform or guide. GoldenLink focuses on coordinating nearby people into specific, safe actions.',

        // Community responder
        communityResponder: 'Community Responder',
        readyToHelp: 'Ready to help during the Golden Hour?',
        joinResponderNetwork:
          'Join the GoldenLink responder network. View nearby incidents, accept response requests and coordinate community support.',

        // Common buttons
        emergency: 'Emergency',
        helpNow: 'Get Help Now',
        back: 'Back',
        next: 'Next',
        previous: 'Previous',
        cancel: 'Cancel',
        submit: 'Submit',
        save: 'Save',
        close: 'Close',
        search: 'Search',
        view: 'View',
        continue: 'Continue',
        confirm: 'Confirm',
        edit: 'Edit',
        delete: 'Delete',
        retry: 'Retry',
        refresh: 'Refresh',
        loading: 'Loading...',
        yes: 'Yes',
        no: 'No',

        // Location
        detectMyLocation: 'Detect My Location',
        locationCaptured: 'Location Captured',
        whereAccidentHappened: 'Where did the accident happen?',
        detectingLocation: 'Detecting your location...',
        locationDetected: 'Location detected successfully.',
        locationNotAvailable: 'Location is not available.',
        locationPermissionDenied:
          'Location permission was denied. Please enable location access in your browser.',
        locationError:
          'Unable to detect your location. Please try again.',
        latitude: 'Latitude',
        longitude: 'Longitude',
        currentLocation: 'Current Location',

        // Accident
        whatHappened: 'What happened?',
        roadAccident: 'Road Accident',
        twoWheelerAccident: 'Two-Wheeler Accident',
        pedestrianIncident: 'Pedestrian Incident',
        notSure: 'Not Sure',

        peopleAffected: 'How many people are affected?',
        onePerson: '1 Person',
        twoPeople: '2 People',
        threePeople: '3 People',
        fourPeople: '4 People',
        fivePeople: '5 People',
        fivePlusPeople: '5+ People',

        additionalInformation: 'Additional information',
        describeWhatYouSee: 'Describe what you can see...',

        howUrgent: 'How urgent is the situation?',
        normal: 'Normal',
        moderate: 'Moderate',
        critical: 'Critical',

        activateGoldenLink: 'Activate GoldenLink',

        // Messages
        success: 'Success',
        accidentReportedSuccessfully:
          'Accident reported successfully.',
        nearbyRespondersNotified:
          'Nearby responders have been notified.',
        somethingWentWrong:
          'Something went wrong. Please try again.',
        requiredField:
          'This field is required.',
        invalidInput:
          'Please enter a valid value.',

        // AI Assistant
        askGoldenLinkAI: 'Ask GoldenLink AI anything...',
        accidentLocationQuestion:
          'Are you currently at the accident location?',
        injuredPeopleQuestion:
          'How many people are injured?',
        unconsciousQuestion:
          'Is anyone unconscious?',
        heavyBleedingQuestion:
          'Is anyone bleeding heavily?',
        breathingDifficultyQuestion:
          'Is anyone having difficulty breathing?',
        trappedQuestion:
          'Is anyone trapped inside a vehicle or unable to move?',
        yesAnswer: 'Yes',
        noAnswer: 'No',
        thinking: 'GoldenLink AI is thinking...',
        aiEmergencyGuidance: 'Emergency Guidance',
        aiResponse: 'AI Response',

        // Status
        active: 'Active',
        inactive: 'Inactive',
        available: 'Available',
        unavailable: 'Unavailable',
        pending: 'Pending',
        accepted: 'Accepted',
        rejected: 'Rejected',
        completed: 'Completed',
        cancelled: 'Cancelled',
        responding: 'Responding',
        resolved: 'Resolved',

        // Responder
        incidentResponse: 'Incident Response',
        responderProfile: 'Responder Profile',
        responderStatus: 'Responder Status',
        availableResponders: 'Available Responders',
        acceptRequest: 'Accept Request',
        declineRequest: 'Decline Request',
        responseStarted: 'Response started.',
        responseCompleted: 'Response completed.',

        // Community
        joinCommunity: 'Join Community',
        volunteerSearch: 'Volunteer Search',
        nearbyCommunity: 'Nearby Community',

        // Registration
        name: 'Name',
        dateOfBirth: 'Date of Birth',
        mobileNumber: 'Mobile Number',
        emailAddress: 'Email Address',
        applicantPhoto: 'Applicant Photo',
        verifiedCertificate: 'Verified Certificate',
        captcha: 'CAPTCHA',
        otpVerification: 'OTP Verification',
        enterOtp: 'Enter OTP',
        sendOtp: 'Send OTP',
        verifyOtp: 'Verify OTP',

        // Records
        accidentRecords: 'Accident Records',
        incidentRecords: 'Incident Records',
        noRecordsFound: 'No records found.',
        incidentDetails: 'Incident Details',
        reportedAt: 'Reported At',
        status: 'Status',
        severity: 'Severity',
        location: 'Location',

        // Footer
        quickLinks: 'Quick Links',
        emergencySupport: 'Emergency Support',
        communitySupport: 'Community Support',
        allRightsReserved: 'All rights reserved.',

        // ============================================================
        // WORKFLOW
        // ============================================================
        goldenLinkResponseNetwork: 'GoldenLink Response Network',
        fromAccident: 'From accident',
        toCoordinatedResponse: 'to coordinated response.',
        workflowIntroduction:
          'GoldenLink connects people around an accident and gives each responder a simple, meaningful role during the Golden Hour.',

        workflowReport: 'Report',
        workflowReportDescription:
          'An accident is reported with the essential location and situation details.',

        workflowTriage: 'Triage',
        workflowTriageDescription:
          'Simple questions help identify the appropriate response pathway.',

        workflowMatch: 'Match',
        workflowMatchDescription:
          'Nearby suitable responders are identified based on availability and skills.',

        workflowGuide: 'Guide',
        workflowGuideDescription:
          'Responders receive simple, approved step-by-step guidance.',

        workflowCoordinate: 'Coordinate',
        workflowCoordinateDescription:
          'Different responders receive different tasks so the community works together.',

        workflowHandover: 'Handover',
        workflowHandoverDescription:
          'Professional emergency responders take over when they arrive.',

        workflowLearn: 'Learn',
        workflowLearnDescription:
          'Aggregate response data helps identify gaps and improve future readiness.',

          //community-preview//

          communityResponse: 'Community Response',
          rightPeople: 'The right people',
          canMakeDifference: 'can make a difference.',
          communityPreviewDescription:
          'GoldenLink helps connect people near an incident with useful community support during the Golden Hour.',
          exploreCommunity: 'Explore Community',
          becomeResponder: 'Become a Responder',
          nearbyHelp: 'Nearby Help',
          nearbyHelpDescription:
            'Discover registered community responders who may be close to an incident.',
          trustedResponders: 'Trusted Responders',
          trustedRespondersDescription:
            'Responders can have profiles showing their skills, availability and experience.',
          localSupport: 'Local Support',
          localSupportDescription:
            'Guidance can be made easier to understand through local languages and clear instructions.',
          clearRoles: 'Clear Roles',
          clearRolesDescription:
          'Different responders can receive appropriate tasks instead of everyone doing the same thing.',

          //emergency-cta//

          goldenHourResponse: 'Golden Hour Response',
  whenEverySecondMatters: 'When every second matters,',
  knowWhatToDo: 'know what to do.',
  emergencyCtaDescription:
    'Report an accident and help activate suitable people around the incident while professional emergency services take over.',
  goldenLinkEmergencyDisclaimer:
    'GoldenLink AI supports community coordination. It does not replace ambulances, doctors, police or professional emergency services.',

    //footer//
    footerDescription:
    'An AI-assisted community response network for the Golden Hour.',
  footerTagline:
    "Don't just report the accident. Activate the community.",
  goldenLink: 'GoldenLink',
  howItWorks: 'How It Works',
  footerCommunity: 'Community',
  responders: 'Responders',
  support: 'Support',
  help: 'Help',
  safety: 'Safety',
  privacy: 'Privacy',
  copyright: '© 2026 GoldenLink AI',
  builtForYuva: 'Built for YUVA Future 6.0',

  //emergency-button//

  
  emergencyAssistance: 'Emergency Assistance',
  emergencyQuestion: 'Are you witnessing an accident or facing an emergency?',
  call112: 'Call 112',

  // ============================================================
  // RESPONDER DASHBOARD
  // ============================================================

  responderIncidentInformationUpdated:
    'Incident information has been updated.',
  responderNoActiveIncident:
    'No Active Incident',
  responderNoActiveIncidentDescription:
    'There is currently no active incident assigned to you.',
  responderViewNearbyResponders:
    'View Nearby Responders',

  responderDashboardTitle:
    'Responder Dashboard',
  responderEmergencyResponse:
    'Emergency Response',
  responderDashboardDescription:
    'Manage your assigned incident and coordinate emergency response during the Golden Hour.',

  responderActiveIncident:
    'Active Incident',
  responderResponseProgress:
    'RESPONSE PROGRESS',
  responderLive:
    'Live',
  responderAssigned:
    'Assigned',
  responderOnTheWay:
    'On the way',
  responderOnScene:
    'On scene',
  responderComplete:
    'Complete',

  responderIncidentInformation:
    'INCIDENT INFORMATION',
  responderAccidentDetails:
    'Accident Details',
  responderAccidentType:
    'Accident type',
  responderNotSpecified:
    'Not specified',
  responderPeopleAffected:
    'People affected',
  responderUnconscious:
    'Unconscious',
  responderBleeding:
    'Bleeding',
  responderBreathingDifficulty:
    'Breathing difficulty',
  responderTrapped:
    'Trapped',
  responderReporterDescription:
    'Reporter description',

  responderAccidentLocation:
    'ACCIDENT LOCATION',
  responderRespondHere:
    'Respond Here',
  responderReportedLocation:
    'Reported location',
  responderOpenLocationInMaps:
    'Open Location in Maps',

  responderAssignment:
    'ASSIGNMENT',
  responderEta:
    'ETA',
  responderVerified:
    'Verified',

  responderOptionalAiSupport:
    'OPTIONAL AI SUPPORT',
  responderGoldenLinkAiAssistant:
    'GoldenLink AI Assistant',
  responderAiSupportDescription:
    'Get additional AI-assisted guidance while responding to the incident.',
  responderOpenAiAssistant:
    'Open AI Assistant',

  responderResponseControl:
    'RESPONSE CONTROL',
  responderUpdateResponse:
    'Update Response',
  responderUpdateResponseDescription:
    'Update your current response status.',
  responderImOnTheWay:
    "I'm On the Way",
  responderIveArrived:
    "I've Arrived",
  responderHandOverEmergencyServices:
    'Hand Over to Emergency Services',
  responderCompleteResponse:
    'Complete Response',

  responderResponseCompleted:
    'Response Completed',
  responderIncidentSuccessfullyClosed:
    'This incident has been successfully closed.',

  responderSafetyPrinciple:
    'GoldenLink responder principle',
  responderSafetyNote:
    'Follow safe response practices. Do not put yourself or others at unnecessary risk.',

  responderAccidentRecords:
    'Accident Records',

  // Status messages
  responderAssignedMessage:
    'You have been assigned to this incident.',
  responderEnRouteMessage:
    'You are on the way to the incident.',
  responderOnSceneMessage:
    'You have arrived at the incident location.',
  responderHandedOverMessage:
    'The incident has been handed over to emergency services.',
  responderCompletedMessage:
    'The response has been completed.',
  responderActiveMessage:
    'You are actively responding to this incident.',

  // Severity
  responderSeverityCritical:
    'Critical',
  responderSeveritySerious:
    'Serious',
  responderSeverityModerate:
    'Moderate',

  // Response success messages
  responderMarkedOnTheWay:
    'Response status marked as On the Way.',
  responderArrivalRecorded:
    'Your arrival has been recorded.',
  responderIncidentHandedOver:
    'Incident handed over to emergency services.',
  responderResponseCompletedSuccessfully:
    'Response completed successfully.',

  // Location
  responderCurrentAccidentLocation:
    'Current accident location',
  responderLocationUnavailable:
    'Location unavailable',

  // Responder labels
  responderAssignedResponder:
    'Assigned Responder',
  responderCommunityResponder:
    'Community Responder',
  responderPerson:
    'person',
  responderPeople:
    'people',

    //responder-profile//

    responderAccount: 'RESPONDER ACCOUNT',
  myProfile: 'My Profile',
  responderProfileDescription: 'Manage your responder information and availability.',
  editProfile: 'Edit Profile',
  profileEditingSoon: 'Profile editing will be available soon.',
  availableToRespond: 'Available to respond',
  currentlyUnavailable: 'Currently unavailable',
  responderId: 'Responder ID',
  responderAvailability: 'Responder availability',
  youAreAvailable: 'You are available',
  youAreUnavailable: 'You are unavailable',
  availableDescription: 'You can receive nearby emergency response requests.',
  unavailableDescription: 'You will not receive new response requests.',
  responses: 'Responses',
  successful: 'Successful',
  rating: 'Rating',
  responderInformation: 'Responder Information',
  currentArea: 'Current area',
  joinedGoldenLink: 'Joined GoldenLink AI',
  responseRadius: 'Response radius',
  respondSafely: 'Respond safely',
  respondSafelyDescription: 'Only respond when it is safe to do so. Follow emergency instructions and never put yourself at risk.',

  //incident-responce//

  incidentResponderCenter: 'RESPONDER CENTER',
  incidentResponseDescription: 'Find nearby incidents and help your community during the golden hour.',
  activeIncidents: 'Active incidents',
  peopleNeedingHelp: 'People needing help',
  nearestIncident: 'Nearest incident',
  nearbyIncidents: 'Nearby incidents',
  chooseIncidentSafely: 'Choose an incident you can safely respond to.',
  handedOver: 'Handed Over',
  all: 'All',
  kmAway: 'km away',
  oneMinuteAgo: '1 minute ago',
  minutesAgo: 'minutes ago',
  responderNeeded: 'responder needed',
  respondersNeeded: 'responders needed',
  incidentAccepted: 'Incident accepted',
  distance: 'Distance',
  reported: 'Reported',
  incidentNeedsResponder: 'Needs responder',
  incidentResponderOnTheWay: 'Responder on the way',
  incidentProfessionalHandover: 'Professional handover',
  viewDetails: 'View Details',
  acceptResponse: 'Accept Response',
  viewResponse: 'View Response',
  noIncidentsHere: 'No incidents here',
  noIncidentsMatchingFilter: 'There are no incidents matching this filter right now.',
  incidentRoadAccidentDescription: 'Road accident reported. Community assistance is required.',
  incidentTwoWheelerDescription: 'Responders are currently moving toward the incident.',
  incidentPedestrianDescription: 'Professional emergency responders have taken over.' ,

    // nearbycommunity//

    nearbyCommunityGoldenLinkCommunity: 'GOLDENLINK COMMUNITY',
  nearbyCommunityTitle: 'Communities Near You',
  nearbyCommunityDescription: 'Find nearby GoldenLink communities and connect with people who can coordinate support when it matters.',
  nearbyCommunityMembersNearby: 'community members nearby',
  nearbyCommunityNetwork: 'Your nearby community network',
  nearbyCommunityLocationDescription: 'Communities are shown based on your selected location.',
  nearbyCommunityUseMyLocation: 'Use My Location',
  nearbyCommunityAll: 'All communities',
  nearbyCommunityActiveNowFilter: 'Active now',
  nearbyCommunityQuietFilter: 'Quiet',
  nearbyCommunityNearbyCommunities: 'Nearby communities',
  nearbyCommunityCommunitiesAvailable: 'communities available',
  nearbyCommunityActive: 'Active community',
  nearbyCommunityQuiet: 'Currently quiet',
  nearbyCommunityKm: 'km',
  nearbyCommunityDistance: 'Distance',
  nearbyCommunityMembers: 'Members',
  nearbyCommunityActiveNow: 'Active now',
  nearbyCommunityViewCommunity: 'View Community',
  nearbyCommunityJoin: 'Join',
  nearbyCommunityNoCommunities: 'No communities found',
  nearbyCommunityChangeFilter: 'Try changing the community filter.',
  nearbyCommunityFrontendDemo: 'This is currently a frontend demonstration.',
  nearbyCommunitySafety: 'Community Safety',
  nearbyCommunityEmergencySupport: 'Emergency Support',
  nearbyCommunityNeighbourhood: 'Neighbourhood',
  nearbyCommunityAnnaDescription: 'Local volunteers coordinating community safety and support.',
  nearbyCommunityTnDescription: 'A neighbourhood group supporting local emergency response.',
  nearbyCommunityGuindyDescription: 'Community volunteers sharing local information and support.',
  nearbyCommunityVelacheryDescription: 'Active community network helping residents coordinate safely.',

  //volunteer-search//

  volunteerGoldenLinkCommunity: 'GOLDENLINK COMMUNITY',
  volunteerSearchTitle: 'Find Nearby Volunteers',
  volunteerSearchDescription: 'Connect with trusted community responders who are nearby and available to help.',
  volunteerYourLocation: 'Your location',
  volunteerChange: 'Change',
  volunteerSearchPlaceholder: 'Search volunteers, skills or area...',
  volunteerSearchAriaLabel: 'Search volunteers',
  volunteerSearchButton: 'Search',
  volunteerAll: 'All',
  volunteerAvailable: 'Available',
  volunteerResponding: 'Responding',
  volunteerNearbyResponders: 'Nearby responders',
  volunteerMembersFound: 'community members found',
  volunteerCommunityVerified: 'Community verified',
  volunteerAvailableNow: 'Available now',
  volunteerCurrentlyResponding: 'Currently responding',
  volunteerCurrentlyOffline: 'Currently offline',
  volunteerUnknown: 'Unknown',
  volunteerDistance: 'Distance',
  volunteerResponse: 'Response',
  volunteerRating: 'Rating',
  volunteerResponses: 'responses',
  volunteerView: 'View',
  volunteerRequestHelp: 'Request Help',
  volunteerNoVolunteers: 'No volunteers found',
  volunteerTryAnotherFilter: 'Try another filter or search area.',
  volunteerHelpRequest: 'Help request',
  volunteerIncidentsSupported: 'Incidents supported',
  volunteerFrontendDemo: 'This is currently a frontend demonstration.',


  //nearby-responder//

  nearbyFindingResponders: 'Finding nearby responders...',
  nearbyResponderAssignedSuccessfully: 'Responder Assigned Successfully!',
  nearbyAcceptedIncidentPreparing: 'has accepted the incident and is preparing to respond.',
  nearbyEta: 'ETA',
  nearbyOpeningDashboard: 'Opening responder dashboard...',
  nearbyNoActiveIncident: 'No active GoldenLink incident was found.',
  nearbyUnknown: 'Unknown',
  nearbySerious: 'Serious',
  nearbyLocationUnavailable: 'Location unavailable',
  nearbyFirstAidTrained: 'First-Aid Trained',
  nearbyCommunityVolunteer: 'Community Volunteer',
  nearbyFirstResponseVolunteer: 'First Response Volunteer',
  nearbyFirstAid: 'First Aid',
  nearbyTrafficSupport: 'Traffic Support',
  nearbyCommunitySupport: 'Community Support',
  nearbyLocationGuidance: 'Location Guidance',
  nearbyEmergencyCommunication: 'Emergency Communication',
  nearbyCommunication: 'Communication',
  nearbyCommunityResponse: 'Community Response',
  nearbyRespondersTitle: 'Nearby Responders',
  nearbyRespondersDescription: 'Find verified community responders who are available to help nearby.',
  nearbyActiveIncident: 'Active GoldenLink Incident',
  nearbyIncidentId: 'Incident ID',
  nearbyPeopleAffected: 'People affected',
  nearbySearchingLocation: 'Searching near your location',
  nearbyCurrentAccidentArea: 'Current accident area',
  nearbyRadius: 'Radius',
  nearbyAvailableNow: 'available now',
  nearbyLiveAvailability: 'Live availability',
  nearbyVerifiedRespondersArea: 'Verified responders in your selected area.',
  nearbyPeopleNearby: 'People nearby',
  nearbyChooseResponder: 'Choose a suitable responder for assistance.',
  nearbyFound: 'found',
  nearbyVerified: 'Verified',
  nearbyDistance: 'Distance',
  nearbyEstimatedArrival: 'Estimated arrival',
  nearbyCommunityRating: 'Community rating',
  nearbyAcceptingIncident: 'Accepting Incident...',
  nearbyIncidentAccepted: 'Incident Accepted',
  nearbyAcceptIncident: 'Accept Incident',
  nearbyCurrentlyUnavailable: 'Currently Unavailable',
  nearbySafetyPrinciple: 'GoldenLink safety principle',
  nearbySafetyDescription: 'GoldenLink connects you with registered community responders. Professional emergency services remain the primary response for serious incidents.',

//report-accident//

// ================================
// REPORT ACCIDENT - ENGLISH
// ================================

reportAccidentDescription:
  'Report an accident and help coordinate a faster community response.',
backToHome: 'Back to Home',

step: 'Step',
of: 'of',

gpsLocationDescription:
  'Use your current GPS location to help responders find the incident.',

detectingYourLocation: 'Detecting your location',
locationDetectedSuccessfully: 'Location detected successfully',
locationDetectionFailed: 'Location detection failed',

detectingLocationButton: 'Detecting Location...',
gpsCoordinatesCaptured: 'GPS coordinates captured',

tryAgain: 'Try Again',

locationHelpBefore: 'Your',
locationHelpAfter:
  'GPS location helps GoldenLink connect the right responders to the incident.',


accidentTypeDescription:
  'Tell us what type of incident you are reporting.',



describeWhatYouCanSee: 'Describe what you can see...',

howManyPeopleAffected: 'How many people are affected?',
peopleAffectedDescription:
  'Select the approximate number of people involved.',

unconscious: 'Unconscious',
bleeding: 'Bleeding',
breathingDifficulty: 'Breathing Difficulty',
trapped: 'Trapped',


urgencyDescription:
  'Select the emergency level based on what you can observe.',

severityNormal: 'Normal',
severityModerate: 'Moderate',
severityCritical: 'Critical',

severityNormalDescription:
  'No immediate danger is visible.',
severityModerateDescription:
  'Medical or community assistance may be required.',
severityCriticalDescription:
  'Immediate emergency response is required.',

incident: 'Incident',

gpsLocation: 'GPS Location',
captured: 'Captured',

selectedUrgency: 'Selected urgency',
selectEmergencyLevel: 'Select the emergency level',

activationNote:
  'GoldenLink will coordinate nearby responders based on the incident details and location you provided.',


communityResponseActivatedSuccessfully:
  'Community response activated successfully!',

helpCoordinatedForIncident:
  'Help is being coordinated for this incident.',

locationRequired:
  'Location is required before continuing.',

geolocationNotSupported:
  'Geolocation is not supported by this browser.',



locationUnavailableDevice:
  'Your location could not be determined.',

locationDetectionTimeout:
  'Location detection timed out. Please try again.',

  // ============================================================
// COMMUNITY - ENGLISH
// ============================================================

communityGoldenLinkNetwork: 'GoldenLink Network',
communityOurCommunity: 'Our Community',
communityHeaderDescription:
  'Together, ordinary people can become a stronger first-response network.',

communityPoweredResponse: 'Community-powered response',
communityDontJustReport: "Don't just report the accident.",
communityActivateTheCommunity: 'Activate the community.',
communityHeroDescription:
  'GoldenLink connects people who are ready to help with incidents happening around them.',



communityTotalResponders: 'Total responders',
communityAvailableNow: 'Available now',
communityActiveIncidents: 'Active incidents',
communityAverageCoverage: 'Average coverage',

communityNetworkCoverage: 'NETWORK COVERAGE',
communityResponseAreas: 'Community Response Areas',
communityAreasDescription:
  'See how GoldenLink responders are distributed across different areas.',

communityGoldenLinkCommunity: 'GoldenLink Community',
communityResponders: 'Responders',
communityAvailable: 'Available',
communityIncidents: 'Incidents',
communityCoverage: 'Coverage',
communityViewCommunity: 'View Community',
communityWord: 'Community',

communityHowItWorks: 'HOW IT WORKS',
communityOneCommunityFasterHelp: 'One community. Faster help.',
communityHowItWorksDescription:
  'GoldenLink brings nearby people together when every second matters.',

communityJoin: 'Join',
communityJoinDescription:
  'Register yourself with your basic information and verification certificate.',

communityStayConnected: 'Stay Connected',
communityStayConnectedDescription:
  'GoldenLink can identify nearby community responders when an emergency is reported.',

communityRespond: 'Respond',
communityRespondDescription:
  'Nearby volunteers can accept the request and provide immediate assistance.',

communitySaveLives: 'Save Lives',
communitySaveLivesDescription:
  'Faster community response helps bridge the critical gap before professional emergency services arrive.',

communityBePartOfNetwork:
  'Be part of the GoldenLink network',
communityNetworkNote:
  'Your small action can make a big difference during an emergency. Together we can build a faster and safer community response system.',

communityRegistrationDescription:
  'Register as a community responder and help people around you during emergencies.',

communityApplicationReceived: 'APPLICATION RECEIVED',
communityApplicationSubmitted:
  'Application Submitted Successfully!',
communityThankYou: 'Thank you,',
communityRegistrationSubmitted:
  'Your registration, photo and volunteer certificate have been submitted successfully.',

communityMobileVerified: 'Mobile Verified',
communityCertificatePending:
  'Certificate Verification Pending',
communityCertificatePendingDescription:
  'Your certificate will be reviewed before your community membership is activated.',
communityDone: 'Done',

communityVolunteerVerificationRequired:
  'Volunteer verification required',
communityVerificationDescription:
  'Please provide your photo and valid volunteer verification certificate. Your details will be reviewed before community access is activated.',

communityFullName: 'Full Name',
communityFullNamePlaceholder:
  'Enter your full name',



communityGender: 'Gender',
communitySelectGender: 'Select gender',
communityMale: 'Male',
communityFemale: 'Female',
communityOther: 'Other',
communityPreferNotToSay: 'Prefer not to say',

communityPlace: 'Place',
communityPlacePlaceholder:
  'City / Town / Area',


communityMobilePlaceholder:
  '10-digit mobile number',
communityOtpWillBeSent:
  'OTP will be sent to this mobile number.',

communityGmailAddress: 'Gmail Address',
communityGmailPlaceholder:
  'example@gmail.com',
communityOnlyGmail:
  'Only Gmail addresses are accepted.',

communityDesignation: 'Designation',
communityDesignationPlaceholder:
  'Student / Engineer / Driver...',

communityVehicleType: 'Vehicle Type',
communitySelectVehicle: 'Select vehicle',
communityNoVehicle: 'No Vehicle',
communityTwoWheeler: 'Two Wheeler',
communityCar: 'Car',
communityAutoTaxi: 'Auto / Taxi',
communityVan: 'Van',
communityTruck: 'Truck',

communityMaritalStatus: 'Marital Status',
communitySelectStatus: 'Select status',
communityMarried: 'Married',
communityUnmarried: 'Unmarried',

communityPersonPhoto: 'Person Photo',
communityPhotoSelected:
  'Photo selected successfully',
communityUploadPhoto:
  'Upload your photo',
communityPhotoFormats:
  'JPG, JPEG or PNG',

communityVerifiedVolunteerCertificate:
  'Volunteer Verified Certificate',
communityCertificateSelected:
  'Certificate selected successfully',
communityUploadCertificate:
  'Upload verified volunteer certificate',
communityCertificateFormats:
  'PDF, JPG, JPEG or PNG',

communitySecurityVerification:
  'Security Verification',
communityCaptchaAnswer: 'Answer',
communityRefreshCaptcha:
  'Refresh CAPTCHA',

communityVerifyAndSendOtp:
  'Verify & Send OTP',

communityMobileVerification:
  'MOBILE VERIFICATION',
communityVerifyMobileNumber:
  'Verify Your Mobile Number',
communityEnterOtpSent:
  'Enter the 6-digit OTP sent to',

communityFrontendDemoMode:
  'Frontend demo mode:',
communityDemoOtpSentTo:
  'Demo OTP sent to',
communityDemoOtp:
  'Demo OTP',
communityNewDemoOtpSentTo:
  'New demo OTP sent to',



communityOtpExpiresIn:
  'OTP expires in',
communityOtpExpired:
  'OTP has expired.',

communityChangeNumber:
  'Change Number',
communityCompleteRegistration:
  'Complete Registration',

communityDidntReceiveOtp:
  "Didn't receive the OTP?",
communityResendOtp:
  'Resend OTP',

communityPhotoFormatError:
  'Please upload a JPG, JPEG or PNG image.',
communityCertificateFormatError:
  'Please upload a PDF, JPG, JPEG or PNG certificate.',

communityIncorrectCaptcha:
  'Incorrect CAPTCHA. Please try again.',

communityOtpExpiredRequest:
  'OTP expired. Please request a new OTP.',

communityEnterSixDigitOtp:
  'Please enter the 6-digit OTP.',

communityIncorrectOtp:
  'Incorrect OTP. Please check the OTP and try again.',

communityEnterName:
  'Please enter your name.',

communitySelectDob:
  'Please select your date of birth.',


communityEnterPlace:
  'Please enter your place.',

communityEnterMobile:
  'Please enter your mobile number.',

communityMobileTenDigits:
  'Mobile number must contain exactly 10 digits.',

communityEnterGmail:
  'Please enter your Gmail address.',

communityValidGmail:
  'Please enter a valid Gmail address ending with @gmail.com.',


communitySelectMaritalStatus:
  'Please select your marital status.',

communityEnterDesignation:
  'Please enter your designation.',


communityVerifyMobileBeforeSubmit:
  'Please verify your mobile number before submitting.',

  // ACCIDENT RECORDS
accidentRecordsGoldenLinkHistory: 'GoldenLink History',
accidentRecordsTitle: 'Accident Records',
accidentRecordsDescription: 'Track the incidents you have reported and their response status.',

accidentRecordsTotalReports: 'Total Reports',
accidentRecordsActive: 'Active',
accidentRecordsResponding: 'Responding',
accidentRecordsHandedOver: 'Handed Over',
accidentRecordsCompleted: 'Completed',

accidentRecordsFilterIncidents: 'Filter incidents',

accidentRecordsCommunityResponseActive: 'Community response active',
accidentRecordsRespondersOnTheWay: 'Responders are on the way',
accidentRecordsProfessionalHandoverCompleted: 'Professional handover completed',
accidentRecordsResponseCompleted: 'Response completed',
accidentRecordsUnknownStatus: 'Unknown status',

accidentRecordsViewIncident: 'View Incident',

accidentRecordsNoIncidentsFound: 'No incidents found',
accidentRecordsNoRecordsCategory: 'There are no accident records in this category.',

accidentRecordsGoldenLinkIncident: 'GoldenLink Incident',
accidentRecordsIncidentDetails: 'Incident Details',
accidentRecordsCloseIncidentDetails: 'Close incident details',

accidentRecordsIncidentId: 'Incident ID',
accidentRecordsAccidentType: 'Accident Type',
accidentRecordsSeverity: 'Severity',
accidentRecordsVictims: 'Victims',

accidentRecordsVictimInformation: 'Victim Information',
accidentRecordsSomeoneUnconscious: 'Someone is unconscious',
accidentRecordsHeavyBleeding: 'Heavy bleeding reported',
accidentRecordsPersonTrapped: 'Person trapped or unable to move',

accidentRecordsIncidentLocation: 'Incident Location',
accidentRecordsOpenInMaps: 'Open in Maps',

accidentRecordsReportDescription: 'Report Description',

accidentRecordsAiAssessment: 'AI Assessment',
accidentRecordsGoldenLinkAiAnalysis: 'GoldenLink AI analysis',
accidentRecordsConfidence: 'Confidence',
accidentRecordsCloseDetails: 'Close Details',

accidentRecordsDefaultDescription: 'Accident reported through GoldenLink.',

accidentRecordsUnknown: 'Unknown',
accidentRecordsUnknownTime: 'Unknown time',
accidentRecordsJustNow: 'Just now',
accidentRecordsMinutesAgo: '{count} minutes ago',
accidentRecordsHoursAgo: '{count} hours ago',
accidentRecordsYesterday: 'Yesterday',
accidentRecordsDaysAgo: '{count} days ago',

accidentRecordsNoResponderAssigned: 'No responder assigned',

// AI ASSISTANT
aiGoldenLinkAi: 'GOLDENLINK AI',
aiEmergencyAssistant: 'Emergency Assistant',
aiAssistantDescription: 'AI-assisted incident assessment and response coordination',
aiEmergencyResponseAssistant: 'Emergency-response assistant',

aiWelcome: 'Hello. I’m GoldenLink AI, your emergency-response assistant.',
aiNoActiveIncident: 'There is currently no active incident. You can report an accident first, or ask me for general emergency-response guidance.',

aiConnectedToIncident: 'I’m connected to incident #{incidentId}. I can help you understand the current emergency and provide response-coordination guidance.',
aiExistingAssessment: 'The current incident is assessed as {severity} with {confidence}% assessment confidence.',
aiQuickAssessmentIntro: 'I’ll ask a few quick questions to help assess the incident.',

aiQuestionAtLocation: 'Are you currently at the accident location?',
aiQuestionInjuredPeople: 'How many people are injured?',
aiQuestionUnconscious: 'Is anyone unconscious?',
aiQuestionHeavyBleeding: 'Is anyone bleeding heavily?',
aiQuestionBreathingDifficulty: 'Is anyone having difficulty breathing?',
aiQuestionTrapped: 'Is anyone trapped inside a vehicle or unable to move?',

aiGeneralResponse: 'I can help with emergency-response coordination. Stay in a safe location, avoid unnecessary movement of injured people, and follow instructions from emergency services.',

aiBleedingResponse: 'If someone is bleeding heavily, seek emergency medical help immediately. If it is safe to do so, apply firm pressure to the wound with clean cloth or gauze until professional help arrives.',

aiUnconsciousResponse: 'If someone is unconscious or not responding, contact emergency services immediately. Check whether they are breathing and follow instructions from the emergency dispatcher.',

aiBreathingResponse: 'Difficulty breathing is an emergency warning sign. Contact emergency services immediately and keep the person in a safe position while waiting for professional assistance.',

aiTrappedResponse: 'Do not attempt to forcibly remove a trapped person unless there is immediate danger such as fire. Contact emergency services and wait for trained responders.',

aiResponderResponse: 'The responder assigned to this incident can be viewed from the Responder Dashboard. Keep the accident location accessible and follow responder instructions when they arrive.',

aiCriticalAssessment: 'The reported conditions indicate a critical emergency requiring immediate response coordination.',
aiSeriousAssessment: 'Multiple victims have been reported. Prompt community and emergency assistance is recommended.',
aiModerateAssessment: 'The reported incident requires assistance and monitoring. Community response can be coordinated.',

aiAssessmentCompleted: 'Thank you. I have completed the initial incident assessment.',
aiAssessmentResult: 'The incident has been assessed as {severity}. Help coordination can continue based on the current response status.',

aiAskAnythingPlaceholder: 'Ask GoldenLink AI anything...',
aiSendMessage: 'Send message',
aiInputHelp: 'Ask about this incident, emergency response, bleeding, breathing difficulty, responders, or what to do while waiting for help.',
aiDisclaimer: 'GoldenLink AI provides response coordination assistance, not medical diagnosis.',

aiAssessment: 'AI Assessment',
aiAssessmentInProgress: 'Assessment in progress',
aiAssessmentWaitingDescription: 'Answer the questions to help GoldenLink understand the emergency.',
aiIncidentAssessment: 'AI INCIDENT ASSESSMENT',
aiReportedConditions: 'Reported conditions',
aiActivateCommunityResponse: 'Activate Community Response',
aiSafetyNote: 'Stay in a safe location and follow instructions from emergency services.',

aiNotRequested: 'Not requested',
confidence: 'Confidence',

      },


      // ============================================================
      // TAMIL
      // ============================================================
      ta: {

        // Navigation
        home: 'முகப்பு',
        reportAccident: 'விபத்தைப் புகாரளிக்கவும்',
        community: 'சமூகம்',
        nearbyResponders: 'அருகிலுள்ள உதவியாளர்கள்',
        volunteers: 'தன்னார்வலர்கள்',
        aiAssistant: 'GoldenLink AI',
        profile: 'சுயவிவரம்',
        selectLanguage: 'மொழியைத் தேர்ந்தெடுக்கவும்',

        // Home
        activateCommunity: 'சமூக உதவியை செயல்படுத்தவும்',
        CommunityResponse: 'சமூக உதவி',
        duringGoldenHour: 'Golden Hour நேரத்தில்',
        DontJustReport: 'விபத்தைப் புகாரளிப்பதுடன் மட்டும் நிறுத்த வேண்டாம்.',
        responderDashboard: 'உதவியாளர் டாஷ்போர்டு',
        emergencyResponse: 'அவசர உதவி',
        witnessedAccident: 'விபத்தை நேரில் பார்த்தீர்களா?',
        reportIncidentQuickly:
          'விபத்தை விரைவாகப் புகாரளித்து, முக்கியமான Golden Hour நேரத்தில் அருகிலுள்ள சமூக உதவியாளர்களை செயல்படுத்துங்கள்.',
        ActivateCommunity: 'சமூக உதவியை செயல்படுத்தவும்',

        HelpCanStart: 'உதவி தொடங்கலாம்',
        WithPeopleNearby: 'அருகிலுள்ள மக்களுடன்',
        GoldenlinkConnects:
          'GoldenLink உதவி தேவைப்படும் மக்களை அருகிலுள்ள பயிற்சி பெற்ற சமூக உதவியாளர்களுடன் இணைக்கிறது.',

        NearbyResponders: 'அருகிலுள்ள உதவியாளர்கள்',
        IdentifyResponders:
          'சம்பவ இடத்திற்கு அருகில் கிடைக்கக்கூடிய பயிற்சி பெற்ற உதவியாளர்களை கண்டறியுங்கள்.',

        VerifiedSkills: 'சரிபார்க்கப்பட்ட திறன்கள்',
        ResponderProfiles:
          'சரிபார்க்கப்பட்ட உதவியாளர் சுயவிவரங்களையும் அவர்களின் அவசர உதவி திறன்களையும் பார்க்கவும்.',

        RoleBasedSupport: 'பங்கு அடிப்படையிலான உதவி',
        DifferentPeople:
          'வெவ்வேறு நபர்கள் வெவ்வேறு வகையான அவசர உதவிகளை வழங்க முடியும்.',

        localLanguages: 'உள்ளூர் மொழிகள்',
        simpleGuidance:
          'பழக்கமான உள்ளூர் மொழிகளில் எளிய அவசர வழிகாட்டுதலைப் பெறுங்கள்.',

        // Why GoldenLink
        whyGoldenLink: 'GoldenLink ஏன்?',
        dontJustReport: 'புகாரளிப்பதுடன் மட்டும் நிறுத்த வேண்டாம்.',
        coordinate: 'ஒருங்கிணையுங்கள்.',
        whyGoldenLinkDescription:
          'விபத்து நிகழும் நேரத்திற்கும் பாதிக்கப்பட்டவருக்கு பயனுள்ள உதவி கிடைக்கும் நேரத்திற்கும் இடையிலான ஒருங்கிணைப்பு இடைவெளியை குறைக்க GoldenLink வடிவமைக்கப்பட்டுள்ளது.',

        communityCoordination: 'சமூக ஒருங்கிணைப்பு',
        communityCoordinationDescription:
          'அருகிலுள்ள மக்கள் அனைவரும் ஒரே வேலையைச் செய்வதற்குப் பதிலாக எளிய பணிகளாகப் பிரிக்கப்பட்டு செயல்பட முடியும்.',

        locationAwareResponse: 'இருப்பிட அடிப்படையிலான உதவி',
        locationAwareResponseDescription:
          'சம்பவம் மற்றும் உதவியாளர்களின் இருப்பிடத்தைப் பயன்படுத்தி விபத்தை அருகிலுள்ள பொருத்தமான உதவியாளர்களுடன் இணைக்க இந்த அமைப்பு உதவுகிறது.',

        suitableResponders: 'பொருத்தமான உதவியாளர்கள்',
        suitableRespondersDescription:
          'உதவியாளர்களைத் தேர்வு செய்யும்போது அவர்களின் கிடைக்கும் நிலை, தூரம், திறன்கள் மற்றும் பதிவு செய்யப்பட்ட பயிற்சி ஆகியவற்றைக் கருத்தில் கொள்ளலாம்.',

        multilingualGuidance: 'பலமொழி வழிகாட்டுதல்',
        multilingualGuidanceDescription:
          'இந்த இடைமுகம் ஆங்கிலம், தமிழ் மற்றும் அணுகக்கூடிய பிராந்திய மொழிகளில் தொடர்பு கொள்ள உதவுகிறது.',

        simpleRoles: 'எளிய பணிகள்',
        simpleRolesDescription:
          'ஒவ்வொரு பங்கேற்பாளருக்கும் தெளிவான பணி வழங்கப்படுவதால் உதவியைப் புரிந்துகொண்டு ஒருங்கிணைப்பது எளிதாகிறது.',

        professionalHandover: 'தொழில்முறை ஒப்படைப்பு',
        professionalHandoverDescription:
          'பொருத்தமான தொழில்முறை அவசர உதவியாளர்கள் பொறுப்பேற்கும் வரை GoldenLink சமூக உதவியை ஆதரிக்கிறது.',

        ourCoreInnovation: 'எங்கள் முக்கிய புதுமை',
        coordinationLayerGoldenHour:
          'Golden Hour-க்கான ஒருங்கிணைப்பு அடுக்கு.',
        existingSystemsCanCall:
          'தற்போதுள்ள அமைப்புகள் அழைக்கவும், தகவல் தெரிவிக்கவும் அல்லது வழிகாட்டவும் முடியும். GoldenLink அருகிலுள்ள மக்களை குறிப்பிட்ட மற்றும் பாதுகாப்பான செயல்களில் ஒருங்கிணைப்பதில் கவனம் செலுத்துகிறது.',

        // Community responder
        communityResponder: 'சமூக உதவியாளர்',
        readyToHelp: 'Golden Hour நேரத்தில் உதவ தயாரா?',
        joinResponderNetwork:
          'GoldenLink உதவியாளர் வலையமைப்பில் இணையுங்கள். அருகிலுள்ள சம்பவங்களைப் பார்த்து, உதவி கோரிக்கைகளை ஏற்று, சமூக உதவியை ஒருங்கிணைக்கவும்.',

        // Common buttons
        emergency: 'அவசரம்',
        helpNow: 'இப்போது உதவி பெறுங்கள்',
        back: 'பின்',
        next: 'அடுத்து',
        previous: 'முந்தையது',
        cancel: 'ரத்து செய்',
        submit: 'சமர்ப்பிக்கவும்',
        save: 'சேமிக்கவும்',
        close: 'மூடவும்',
        search: 'தேடல்',
        view: 'பார்க்கவும்',
        continue: 'தொடரவும்',
        confirm: 'உறுதிப்படுத்தவும்',
        edit: 'திருத்தவும்',
        delete: 'நீக்கவும்',
        retry: 'மீண்டும் முயற்சிக்கவும்',
        refresh: 'புதுப்பிக்கவும்',
        loading: 'ஏற்றப்படுகிறது...',
        yes: 'ஆம்',
        no: 'இல்லை',

        // Location
        detectMyLocation: 'எனது இருப்பிடத்தைக் கண்டறியவும்',
        locationCaptured: 'இருப்பிடம் பெறப்பட்டது',
        whereAccidentHappened: 'விபத்து எங்கு நடந்தது?',
        detectingLocation: 'உங்கள் இருப்பிடம் கண்டறியப்படுகிறது...',
        locationDetected: 'இருப்பிடம் வெற்றிகரமாக கண்டறியப்பட்டது.',
        locationNotAvailable: 'இருப்பிடம் கிடைக்கவில்லை.',
        locationPermissionDenied:
          'இருப்பிட அனுமதி மறுக்கப்பட்டது. உங்கள் உலாவியில் இருப்பிட அணுகலை இயக்கவும்.',
        locationError:
          'உங்கள் இருப்பிடத்தைக் கண்டறிய முடியவில்லை. மீண்டும் முயற்சிக்கவும்.',
        latitude: 'அட்சரேகை',
        longitude: 'தீர்க்கரேகை',
        currentLocation: 'தற்போதைய இருப்பிடம்',

        // Accident
        whatHappened: 'என்ன நடந்தது?',
        roadAccident: 'சாலை விபத்து',
        twoWheelerAccident: 'இருசக்கர வாகன விபத்து',
        pedestrianIncident: 'நடைபயணி சம்பவம்',
        notSure: 'தெரியவில்லை',

        peopleAffected: 'எத்தனை பேர் பாதிக்கப்பட்டுள்ளனர்?',
        onePerson: '1 நபர்',
        twoPeople: '2 பேர்',
        threePeople: '3 பேர்',
        fourPeople: '4 பேர்',
        fivePeople: '5 பேர்',
        fivePlusPeople: '5+ பேர்',

        additionalInformation: 'கூடுதல் தகவல்',
        describeWhatYouSee: 'நீங்கள் காண்பதை விவரிக்கவும்...',

        howUrgent: 'நிலைமை எவ்வளவு அவசரமானது?',
        normal: 'சாதாரணம்',
        moderate: 'மிதமானது',
        critical: 'மிகவும் ஆபத்தானது',

        activateGoldenLink: 'GoldenLink-ஐ செயல்படுத்தவும்',

        // Messages
        success: 'வெற்றி',
        accidentReportedSuccessfully:
          'விபத்து வெற்றிகரமாகப் புகாரளிக்கப்பட்டது.',
        nearbyRespondersNotified:
          'அருகிலுள்ள உதவியாளர்களுக்கு அறிவிக்கப்பட்டுள்ளது.',
        somethingWentWrong:
          'ஏதோ தவறு ஏற்பட்டுள்ளது. மீண்டும் முயற்சிக்கவும்.',
        requiredField:
          'இந்த புலம் கட்டாயமானது.',
        invalidInput:
          'சரியான மதிப்பை உள்ளிடவும்.',

        // AI Assistant
        askGoldenLinkAI: 'GoldenLink AI-யிடம் எதையும் கேளுங்கள்...',
        accidentLocationQuestion:
          'நீங்கள் தற்போது விபத்து நடந்த இடத்தில் இருக்கிறீர்களா?',
        injuredPeopleQuestion:
          'எத்தனை பேர் காயமடைந்துள்ளனர்?',
        unconsciousQuestion:
          'யாராவது சுயநினைவின்றி இருக்கிறார்களா?',
        heavyBleedingQuestion:
          'யாருக்காவது அதிக இரத்தப்போக்கு உள்ளதா?',
        breathingDifficultyQuestion:
          'யாருக்காவது சுவாசிப்பதில் சிரமம் உள்ளதா?',
        trappedQuestion:
          'யாராவது வாகனத்திற்குள் சிக்கியுள்ளார்களா அல்லது நகர முடியவில்லையா?',
        yesAnswer: 'ஆம்',
        noAnswer: 'இல்லை',
        thinking: 'GoldenLink AI சிந்திக்கிறது...',
        aiEmergencyGuidance: 'அவசர வழிகாட்டுதல்',
        aiResponse: 'AI பதில்',

        // Status
        active: 'செயலில்',
        inactive: 'செயலற்றது',
        available: 'கிடைக்கிறது',
        unavailable: 'கிடைக்கவில்லை',
        pending: 'நிலுவையில்',
        accepted: 'ஏற்கப்பட்டது',
        rejected: 'நிராகரிக்கப்பட்டது',
        completed: 'முடிந்தது',
        cancelled: 'ரத்து செய்யப்பட்டது',
        responding: 'பதில் அளிக்கிறது',
        resolved: 'தீர்க்கப்பட்டது',

        // Responder
        incidentResponse: 'சம்பவ உதவி',
        responderProfile: 'உதவியாளர் சுயவிவரம்',
        responderStatus: 'உதவியாளர் நிலை',
        availableResponders: 'கிடைக்கக்கூடிய உதவியாளர்கள்',
        acceptRequest: 'கோரிக்கையை ஏற்கவும்',
        declineRequest: 'கோரிக்கையை நிராகரிக்கவும்',
        responseStarted: 'உதவி தொடங்கப்பட்டது.',
        responseCompleted: 'உதவி முடிக்கப்பட்டது.',

        // Community
        joinCommunity: 'சமூகத்தில் இணையுங்கள்',
        volunteerSearch: 'தன்னார்வலர் தேடல்',
        nearbyCommunity: 'அருகிலுள்ள சமூகம்',

        // Registration
        name: 'பெயர்',
        dateOfBirth: 'பிறந்த தேதி',
        mobileNumber: 'மொபைல் எண்',
        emailAddress: 'மின்னஞ்சல் முகவரி',
        applicantPhoto: 'விண்ணப்பதாரர் புகைப்படம்',
        verifiedCertificate: 'சரிபார்க்கப்பட்ட சான்றிதழ்',
        captcha: 'CAPTCHA',
        otpVerification: 'OTP சரிபார்ப்பு',
        enterOtp: 'OTP-ஐ உள்ளிடவும்',
        sendOtp: 'OTP அனுப்பவும்',
        verifyOtp: 'OTP சரிபார்க்கவும்',

        // Records
        accidentRecords: 'விபத்து பதிவுகள்',
        incidentRecords: 'சம்பவ பதிவுகள்',
        noRecordsFound: 'பதிவுகள் எதுவும் இல்லை.',
        incidentDetails: 'சம்பவ விவரங்கள்',
        reportedAt: 'புகாரளிக்கப்பட்ட நேரம்',
        status: 'நிலை',
        severity: 'தீவிரம்',
        location: 'இருப்பிடம்',

        // Footer
        quickLinks: 'விரைவு இணைப்புகள்',
        emergencySupport: 'அவசர உதவி',
        communitySupport: 'சமூக உதவி',
        allRightsReserved: 'அனைத்து உரிமைகளும் பாதுகாக்கப்பட்டவை.',

        // Workflow
        goldenLinkResponseNetwork: 'GoldenLink உதவி வலையமைப்பு',
        fromAccident: 'விபத்திலிருந்து',
        toCoordinatedResponse: 'ஒருங்கிணைந்த உதவி வரை.',
        workflowIntroduction:
          'GoldenLink விபத்தைச் சுற்றியுள்ள மக்களை இணைத்து, Golden Hour நேரத்தில் ஒவ்வொரு உதவியாளருக்கும் எளிய மற்றும் முக்கியமான பங்கை வழங்குகிறது.',

        workflowReport: 'புகாரளி',
        workflowReportDescription:
          'தேவையான இருப்பிடம் மற்றும் சூழ்நிலை விவரங்களுடன் விபத்து புகாரளிக்கப்படுகிறது.',

        workflowTriage: 'மதிப்பீடு',
        workflowTriageDescription:
          'எளிய கேள்விகள் சரியான உதவி நடவடிக்கையை கண்டறிய உதவுகின்றன.',

        workflowMatch: 'இணைப்பு',
        workflowMatchDescription:
          'கிடைக்கும் நிலை மற்றும் திறன்களின் அடிப்படையில் அருகிலுள்ள பொருத்தமான உதவியாளர்கள் கண்டறியப்படுகிறார்கள்.',

        workflowGuide: 'வழிகாட்டு',
        workflowGuideDescription:
          'உதவியாளர்களுக்கு எளிய மற்றும் அங்கீகரிக்கப்பட்ட படிப்படியான வழிகாட்டுதல் வழங்கப்படுகிறது.',

        workflowCoordinate: 'ஒருங்கிணை',
        workflowCoordinateDescription:
          'வெவ்வேறு உதவியாளர்களுக்கு வெவ்வேறு பணிகள் வழங்கப்பட்டு, சமூகம் ஒன்றாக செயல்படுகிறது.',

        workflowHandover: 'ஒப்படைப்பு',
        workflowHandoverDescription:
          'தொழில்முறை அவசர உதவியாளர்கள் வந்ததும் அவர்கள் உதவியை பொறுப்பேற்கிறார்கள்.',

        workflowLearn: 'கற்றுக்கொள்',
        workflowLearnDescription:
          'சேகரிக்கப்பட்ட உதவி தரவுகள் குறைபாடுகளை கண்டறிந்து எதிர்கால தயார்நிலையை மேம்படுத்த உதவுகின்றன.',
      
      //community-preview//

      communityResponse: 'சமூக உதவி',
  rightPeople: 'சரியான நபர்கள்',
  canMakeDifference: 'மாற்றத்தை ஏற்படுத்த முடியும்.',
  communityPreviewDescription:
    'GoldenLink விபத்து நடந்த இடத்திற்கு அருகிலுள்ள மக்களை Golden Hour நேரத்தில் பயனுள்ள சமூக உதவியுடன் இணைக்க உதவுகிறது.',
  exploreCommunity: 'சமூகத்தைப் பார்வையிடுங்கள்',
  becomeResponder: 'பதிலளிப்பவராக சேருங்கள்',
  nearbyHelp: 'அருகிலுள்ள உதவி',
  nearbyHelpDescription:
    'விபத்து நடந்த இடத்திற்கு அருகில் இருக்கும் பதிவு செய்யப்பட்ட சமூக பதிலளிப்பவர்களை கண்டறியுங்கள்.',
  trustedResponders: 'நம்பகமான பதிலளிப்பவர்கள்',
  trustedRespondersDescription:
    'பதிலளிப்பவர்களின் திறன்கள், கிடைக்கும் நேரம் மற்றும் அனுபவம் போன்ற விவரங்களைக் கொண்ட சுயவிவரங்கள் இருக்கலாம்.',
  localSupport: 'உள்ளூர் உதவி',
  localSupportDescription:
    'உள்ளூர் மொழிகள் மற்றும் தெளிவான வழிமுறைகள் மூலம் உதவியை எளிதாகப் புரிந்துகொள்ள முடியும்.',
  clearRoles: 'தெளிவான பொறுப்புகள்',
  clearRolesDescription:
    'அனைவரும் ஒரே செயலைச் செய்வதற்குப் பதிலாக, ஒவ்வொரு பதிலளிப்பவருக்கும் பொருத்தமான பணிகள் வழங்கப்படலாம்.',

    //emergency-cta//
    goldenHourResponse: 'Golden Hour உதவி',
  whenEverySecondMatters: 'ஒவ்வொரு நொடியும் முக்கியமான போது,',
  knowWhatToDo: 'என்ன செய்ய வேண்டும் என்பதை அறிந்து கொள்ளுங்கள்.',
  emergencyCtaDescription:
    'விபத்தைப் பதிவு செய்து, தொழில்முறை அவசர சேவைகள் பொறுப்பேற்கும் வரை, விபத்து நடந்த இடத்தைச் சுற்றியுள்ள பொருத்தமான நபர்களின் உதவியை செயல்படுத்துங்கள்.',
  goldenLinkEmergencyDisclaimer:
    'GoldenLink AI சமூக ஒருங்கிணைப்புக்கு உதவுகிறது. இது ஆம்புலன்ஸ், மருத்துவர்கள், காவல்துறை அல்லது தொழில்முறை அவசர சேவைகளுக்கு மாற்றாகாது.',

    //footer//
    footerDescription:
    'Golden Hour நேரத்திற்கான AI உதவியுடன் செயல்படும் சமூக பதில் வலையமைப்பு.',
  footerTagline:
    'விபத்தைப் பதிவு செய்வதோடு மட்டும் நிற்காதீர்கள். சமூகத்தைச் செயல்படுத்துங்கள்.',
  goldenLink: 'GoldenLink',
  howItWorks: 'இது எப்படி செயல்படுகிறது',
  footercommunity: 'சமூகம்',
  responders: 'பதிலளிப்பவர்கள்',
  support: 'ஆதரவு',
  help: 'உதவி',
  safety: 'பாதுகாப்பு',
  privacy: 'தனியுரிமை',
  copyright: '© 2026 GoldenLink AI',
  builtForYuva: 'YUVA Future 6.0 க்காக உருவாக்கப்பட்டது',

  //emergency-button//

  emergencyAssistance: 'அவசர உதவி',
  emergencyQuestion: 'நீங்கள் விபத்தைப் பார்க்கிறீர்களா அல்லது அவசரநிலையை எதிர்கொள்கிறீர்களா?',
  call112: '112 அழைக்கவும்',

  // ============================================================
  // RESPONDER DASHBOARD
  // ============================================================

  responderIncidentInformationUpdated:
    'சம்பவ தகவல்கள் புதுப்பிக்கப்பட்டுள்ளன.',
  responderNoActiveIncident:
    'செயலில் உள்ள சம்பவம் இல்லை',
  responderNoActiveIncidentDescription:
    'தற்போது உங்களுக்கு எந்த செயலில் உள்ள சம்பவமும் ஒதுக்கப்படவில்லை.',
  responderViewNearbyResponders:
    'அருகிலுள்ள உதவியாளர்களைப் பார்க்கவும்',

  responderDashboardTitle:
    'உதவியாளர் டாஷ்போர்டு',
  responderEmergencyResponse:
    'அவசர உதவி',
  responderDashboardDescription:
    'உங்களுக்கு ஒதுக்கப்பட்ட சம்பவத்தை நிர்வகித்து, Golden Hour நேரத்தில் அவசர உதவியை ஒருங்கிணைக்கவும்.',

  responderActiveIncident:
    'செயலில் உள்ள சம்பவம்',
  responderResponseProgress:
    'உதவி முன்னேற்றம்',
  responderLive:
    'நேரலை',
  responderAssigned:
    'ஒதுக்கப்பட்டது',
  responderOnTheWay:
    'வழியில்',
  responderOnScene:
    'சம்பவ இடத்தில்',
  responderComplete:
    'முடிந்தது',

  responderIncidentInformation:
    'சம்பவ தகவல்கள்',
  responderAccidentDetails:
    'விபத்து விவரங்கள்',
  responderAccidentType:
    'விபத்து வகை',
  responderNotSpecified:
    'குறிப்பிடப்படவில்லை',
  responderPeopleAffected:
    'பாதிக்கப்பட்டவர்கள்',
  responderUnconscious:
    'சுயநினைவற்ற நிலை',
  responderBleeding:
    'இரத்தப்போக்கு',
  responderBreathingDifficulty:
    'சுவாசிப்பதில் சிரமம்',
  responderTrapped:
    'சிக்கியுள்ளார்',
  responderReporterDescription:
    'புகாரளித்தவரின் விளக்கம்',

  responderAccidentLocation:
    'விபத்து நடந்த இடம்',
  responderRespondHere:
    'இங்கு உதவ செல்லவும்',
  responderReportedLocation:
    'புகாரளிக்கப்பட்ட இடம்',
  responderOpenLocationInMaps:
    'வரைபடத்தில் இருப்பிடத்தைத் திறக்கவும்',

  responderAssignment:
    'ஒதுக்கீடு',
  responderEta:
    'வருகை மதிப்பிடப்பட்ட நேரம்',
  responderVerified:
    'சரிபார்க்கப்பட்டது',

  responderOptionalAiSupport:
    'விருப்ப AI உதவி',
  responderGoldenLinkAiAssistant:
    'GoldenLink AI உதவியாளர்',
  responderAiSupportDescription:
    'சம்பவத்திற்கு பதிலளிக்கும் போது கூடுதல் AI வழிகாட்டுதலைப் பெறுங்கள்.',
  responderOpenAiAssistant:
    'AI உதவியாளரைத் திறக்கவும்',

  responderResponseControl:
    'உதவி கட்டுப்பாடு',
  responderUpdateResponse:
    'உதவி நிலையைப் புதுப்பிக்கவும்',
  responderUpdateResponseDescription:
    'உங்கள் தற்போதைய உதவி நிலையைப் புதுப்பிக்கவும்.',
  responderImOnTheWay:
    'நான் வழியில் இருக்கிறேன்',
  responderIveArrived:
    'நான் வந்துவிட்டேன்',
  responderHandOverEmergencyServices:
    'அவசர சேவைகளிடம் ஒப்படைக்கவும்',
  responderCompleteResponse:
    'உதவியை முடிக்கவும்',

  responderResponseCompleted:
    'உதவி முடிக்கப்பட்டது',
  responderIncidentSuccessfullyClosed:
    'இந்த சம்பவம் வெற்றிகரமாக முடிக்கப்பட்டுள்ளது.',

  responderSafetyPrinciple:
    'GoldenLink உதவியாளர் பாதுகாப்பு கொள்கை',
  responderSafetyNote:
    'பாதுகாப்பான உதவி நடைமுறைகளைப் பின்பற்றுங்கள். உங்களுக்கோ மற்றவர்களுக்கோ தேவையற்ற ஆபத்தை ஏற்படுத்த வேண்டாம்.',

  responderAccidentRecords:
    'விபத்து பதிவுகள்',

  responderAssignedMessage:
    'இந்த சம்பவத்திற்கு நீங்கள் ஒதுக்கப்பட்டுள்ளீர்கள்.',
  responderEnRouteMessage:
    'நீங்கள் சம்பவ இடத்திற்கு செல்லும் வழியில் இருக்கிறீர்கள்.',
  responderOnSceneMessage:
    'நீங்கள் சம்பவ இடத்திற்கு வந்துவிட்டீர்கள்.',
  responderHandedOverMessage:
    'சம்பவம் அவசர சேவைகளிடம் ஒப்படைக்கப்பட்டுள்ளது.',
  responderCompletedMessage:
    'உதவி முடிக்கப்பட்டுள்ளது.',
  responderActiveMessage:
    'இந்த சம்பவத்திற்கு நீங்கள் தற்போது உதவி செய்து கொண்டிருக்கிறீர்கள்.',

  responderSeverityCritical:
    'மிகவும் ஆபத்தானது',
  responderSeveritySerious:
    'கடுமையானது',
  responderSeverityModerate:
    'மிதமானது',

  responderMarkedOnTheWay:
    'உதவி நிலை "வழியில்" என மாற்றப்பட்டது.',
  responderArrivalRecorded:
    'உங்கள் வருகை பதிவு செய்யப்பட்டுள்ளது.',
  responderIncidentHandedOver:
    'சம்பவம் அவசர சேவைகளிடம் ஒப்படைக்கப்பட்டுள்ளது.',
  responderResponseCompletedSuccessfully:
    'உதவி வெற்றிகரமாக முடிக்கப்பட்டது.',

  responderCurrentAccidentLocation:
    'தற்போதைய விபத்து இடம்',
  responderLocationUnavailable:
    'இருப்பிடம் கிடைக்கவில்லை',

  responderAssignedResponder:
    'ஒதுக்கப்பட்ட உதவியாளர்',
  responderCommunityResponder:
    'சமூக உதவியாளர்',
  responderPerson:
    'நபர்',
  responderPeople:
    'நபர்கள்',

    //responder-profile//

    responderAccount: 'மீட்பாளர் கணக்கு',
  myProfile: 'என் சுயவிவரம்',
  responderProfileDescription: 'உங்கள் மீட்பாளர் தகவல் மற்றும் கிடைக்கும் நிலையை நிர்வகிக்கவும்.',
  editProfile: 'சுயவிவரத்தைத் திருத்து',
  profileEditingSoon: 'சுயவிவரத் திருத்தம் விரைவில் கிடைக்கும்.',
  availableToRespond: 'பதிலளிக்க தயாராக உள்ளார்',
  currentlyUnavailable: 'தற்போது கிடைக்கவில்லை',
  responderId: 'மீட்பாளர் அடையாள எண்',
  responderAvailability: 'மீட்பாளர் கிடைக்கும் நிலை',
  youAreAvailable: 'நீங்கள் கிடைக்கிறீர்கள்',
  youAreUnavailable: 'நீங்கள் கிடைக்கவில்லை',
  availableDescription: 'அருகிலுள்ள அவசரநிலை பதிலளிப்பு கோரிக்கைகளைப் பெறலாம்.',
  unavailableDescription: 'புதிய பதிலளிப்பு கோரிக்கைகளைப் பெறமாட்டீர்கள்.',
  responses: 'பதிலளிப்புகள்',
  successful: 'வெற்றிகரமானவை',
  rating: 'மதிப்பீடு',
  responderInformation: 'மீட்பாளர் தகவல்',
  currentArea: 'தற்போதைய பகுதி',
  joinedGoldenLink: 'GoldenLink AI-யில் இணைந்தது',
  responseRadius: 'பதிலளிப்பு வரம்பு',
  respondSafely: 'பாதுகாப்பாக பதிலளிக்கவும்',
  respondSafelyDescription: 'பாதுகாப்பாக இருக்கும் போது மட்டுமே பதிலளிக்கவும். அவசரநிலை வழிமுறைகளைப் பின்பற்றுங்கள் மற்றும் உங்களை ஆபத்தில் வைக்காதீர்கள்.',
  
  //incident-responce//

  incidentResponderCenter: 'மீட்பாளர் மையம்',
  incidentResponseDescription: 'அருகிலுள்ள சம்பவங்களைக் கண்டறிந்து, Golden Hour நேரத்தில் உங்கள் சமூகத்திற்கு உதவுங்கள்.',
  activeIncidents: 'செயலில் உள்ள சம்பவங்கள்',
  peopleNeedingHelp: 'உதவி தேவைப்படும் நபர்கள்',
  nearestIncident: 'அருகிலுள்ள சம்பவம்',
  nearbyIncidents: 'அருகிலுள்ள சம்பவங்கள்',
  chooseIncidentSafely: 'நீங்கள் பாதுகாப்பாக பதிலளிக்கக்கூடிய சம்பவத்தைத் தேர்ந்தெடுக்கவும்.',
  handedOver: 'ஒப்படைக்கப்பட்டது',
  all: 'அனைத்தும்',
  kmAway: 'கிமீ தொலைவில்',
  oneMinuteAgo: '1 நிமிடத்திற்கு முன்',
  minutesAgo: 'நிமிடங்களுக்கு முன்',
  responderNeeded: 'மீட்பாளர் தேவை',
  respondersNeeded: 'மீட்பாளர்கள் தேவை',
  incidentAccepted: 'சம்பவம் ஏற்றுக்கொள்ளப்பட்டது',
  distance: 'தூரம்',
  reported: 'புகாரளிக்கப்பட்டது',
  incidentNeedsResponder: 'மீட்பாளர் தேவை',
  incidentResponderOnTheWay: 'மீட்பாளர் வழியில் உள்ளார்',
  incidentProfessionalHandover: 'தொழில்முறை ஒப்படைப்பு',
  viewDetails: 'விவரங்களைப் பார்க்கவும்',
  acceptResponse: 'பதிலளிப்பை ஏற்கவும்',
  viewResponse: 'பதிலளிப்பைப் பார்க்கவும்',
  noIncidentsHere: 'இங்கு சம்பவங்கள் இல்லை',
  noIncidentsMatchingFilter: 'இந்த வடிகட்டிக்கு பொருந்தும் சம்பவங்கள் தற்போது இல்லை.',
  incidentRoadAccidentDescription: 'சாலை விபத்து பதிவாகியுள்ளது. சமூக உதவி தேவைப்படுகிறது.',
  incidentTwoWheelerDescription: 'மீட்பாளர்கள் தற்போது சம்பவ இடத்தை நோக்கிச் செல்கின்றனர்.',
  incidentPedestrianDescription: 'தொழில்முறை அவசரநிலை மீட்பாளர்கள் பொறுப்பேற்றுள்ளனர்.',
  

  //nearby community//

  nearbyCommunityGoldenLinkCommunity: 'GOLDENLINK சமூகம்',
  nearbyCommunityTitle: 'உங்களுக்கு அருகிலுள்ள சமூகங்கள்',
  nearbyCommunityDescription: 'அருகிலுள்ள GoldenLink சமூகங்களைக் கண்டறிந்து, தேவைப்படும் நேரத்தில் ஆதரவை ஒருங்கிணைக்கக்கூடிய மக்களுடன் இணையுங்கள்.',
  nearbyCommunityMembersNearby: 'அருகிலுள்ள சமூக உறுப்பினர்கள்',
  nearbyCommunityNetwork: 'உங்களுக்கு அருகிலுள்ள சமூக வலையமைப்பு',
  nearbyCommunityLocationDescription: 'நீங்கள் தேர்ந்தெடுத்த இருப்பிடத்தின் அடிப்படையில் சமூகங்கள் காட்டப்படுகின்றன.',
  nearbyCommunityUseMyLocation: 'எனது இருப்பிடத்தைப் பயன்படுத்தவும்',
  nearbyCommunityAll: 'அனைத்து சமூகங்களும்',
  nearbyCommunityActiveNowFilter: 'தற்போது செயலில்',
  nearbyCommunityQuietFilter: 'அமைதியாக',
  nearbyCommunityNearbyCommunities: 'அருகிலுள்ள சமூகங்கள்',
  nearbyCommunityCommunitiesAvailable: 'சமூகங்கள் உள்ளன',
  nearbyCommunityActive: 'செயலில் உள்ள சமூகம்',
  nearbyCommunityQuiet: 'தற்போது அமைதியாக உள்ளது',
  nearbyCommunityKm: 'கிமீ',
  nearbyCommunityDistance: 'தூரம்',
  nearbyCommunityMembers: 'உறுப்பினர்கள்',
  nearbyCommunityActiveNow: 'தற்போது செயலில்',
  nearbyCommunityViewCommunity: 'சமூகத்தைப் பார்க்கவும்',
  nearbyCommunityJoin: 'இணையவும்',
  nearbyCommunityNoCommunities: 'சமூகங்கள் எதுவும் கிடைக்கவில்லை',
  nearbyCommunityChangeFilter: 'சமூக வடிகட்டியை மாற்றிப் பார்க்கவும்.',
  nearbyCommunityFrontendDemo: 'இது தற்போது frontend demonstration ஆகும்.',
  nearbyCommunitySafety: 'சமூக பாதுகாப்பு',
  nearbyCommunityEmergencySupport: 'அவசரநிலை ஆதரவு',
  nearbyCommunityNeighbourhood: 'அக்கம்பக்கம்',
  nearbyCommunityAnnaDescription: 'உள்ளூர் தன்னார்வலர்கள் சமூக பாதுகாப்பு மற்றும் ஆதரவை ஒருங்கிணைக்கின்றனர்.',
  nearbyCommunityTnDescription: 'உள்ளூர் அவசரநிலை பதிலளிப்புக்கு ஆதரவளிக்கும் அக்கம்பக்கக் குழு.',
  nearbyCommunityGuindyDescription: 'உள்ளூர் தகவல் மற்றும் ஆதரவைப் பகிரும் சமூக தன்னார்வலர்கள்.',
  nearbyCommunityVelacheryDescription: 'குடியிருப்பாளர்கள் பாதுகாப்பாக ஒருங்கிணைய உதவும் செயலில் உள்ள சமூக வலையமைப்பு.',

  //volunteer-search//

  volunteerGoldenLinkCommunity: 'GOLDENLINK சமூகம்',
  volunteerSearchTitle: 'அருகிலுள்ள தன்னார்வலர்களைக் கண்டறியவும்',
  volunteerSearchDescription: 'அருகில் உள்ள மற்றும் உதவ தயாராக இருக்கும் நம்பகமான சமூக மீட்பாளர்களுடன் இணையுங்கள்.',
  volunteerYourLocation: 'உங்கள் இருப்பிடம்',
  volunteerChange: 'மாற்று',
  volunteerSearchPlaceholder: 'தன்னார்வலர்கள், திறன்கள் அல்லது பகுதியைத் தேடுங்கள்...',
  volunteerSearchAriaLabel: 'தன்னார்வலர்களைத் தேடுங்கள்',
  volunteerSearchButton: 'தேடுக',
  volunteerAll: 'அனைத்தும்',
  volunteerAvailable: 'கிடைக்கிறது',
  volunteerResponding: 'பதிலளிக்கிறார்',
  volunteerNearbyResponders: 'அருகிலுள்ள மீட்பாளர்கள்',
  volunteerMembersFound: 'சமூக உறுப்பினர்கள் கண்டறியப்பட்டனர்',
  volunteerCommunityVerified: 'சமூகத்தால் சரிபார்க்கப்பட்டது',
  volunteerAvailableNow: 'தற்போது கிடைக்கிறது',
  volunteerCurrentlyResponding: 'தற்போது பதிலளிக்கிறார்',
  volunteerCurrentlyOffline: 'தற்போது ஆஃப்லைனில் உள்ளார்',
  volunteerUnknown: 'தெரியவில்லை',
  volunteerDistance: 'தூரம்',
  volunteerResponse: 'பதில் நேரம்',
  volunteerRating: 'மதிப்பீடு',
  volunteerResponses: 'பதில்கள்',
  volunteerView: 'பார்க்கவும்',
  volunteerRequestHelp: 'உதவி கோரவும்',
  volunteerNoVolunteers: 'தன்னார்வலர்கள் எவரும் கிடைக்கவில்லை',
  volunteerTryAnotherFilter: 'மற்றொரு வடிகட்டியை அல்லது பகுதியைத் தேடிப் பார்க்கவும்.',
  volunteerHelpRequest: 'உதவி கோரிக்கை',
  volunteerIncidentsSupported: 'ஆதரிக்கப்பட்ட சம்பவங்கள்',
  volunteerFrontendDemo: 'இது தற்போது frontend demonstration ஆகும்.',

  //nearby-responders//

  nearbyFindingResponders: 'அருகிலுள்ள உதவியாளர்களைத் தேடுகிறது...',
  nearbyResponderAssignedSuccessfully: 'உதவியாளர் வெற்றிகரமாக நியமிக்கப்பட்டார்!',
  nearbyAcceptedIncidentPreparing: 'சம்பவத்தை ஏற்றுக்கொண்டு பதிலளிக்கத் தயாராகிறார்.',
  nearbyEta: 'வருகை நேரம்',
  nearbyOpeningDashboard: 'உதவியாளர் டாஷ்போர்டைத் திறக்கிறது...',
  nearbyNoActiveIncident: 'செயலில் உள்ள GoldenLink சம்பவம் எதுவும் கிடைக்கவில்லை.',
  nearbyUnknown: 'தெரியவில்லை',
  nearbySerious: 'தீவிரமானது',
  nearbyLocationUnavailable: 'இருப்பிடம் கிடைக்கவில்லை',
  nearbyFirstAidTrained: 'முதலுதவி பயிற்சி பெற்றவர்',
  nearbyCommunityVolunteer: 'சமூக தன்னார்வலர்',
  nearbyFirstResponseVolunteer: 'முதல் பதில் தன்னார்வலர்',
  nearbyFirstAid: 'முதலுதவி',
  nearbyTrafficSupport: 'போக்குவரத்து உதவி',
  nearbyCommunitySupport: 'சமூக உதவி',
  nearbyLocationGuidance: 'இருப்பிட வழிகாட்டுதல்',
  nearbyEmergencyCommunication: 'அவசர தகவல் தொடர்பு',
  nearbyCommunication: 'தகவல் தொடர்பு',
  nearbyCommunityResponse: 'சமூக உதவி',
  nearbyRespondersTitle: 'அருகிலுள்ள உதவியாளர்கள்',
  nearbyRespondersDescription: 'அருகில் உதவத் தயாராக இருக்கும் சரிபார்க்கப்பட்ட சமூக உதவியாளர்களைக் கண்டறியவும்.',
  nearbyActiveIncident: 'செயலில் உள்ள GoldenLink சம்பவம்',
  nearbyIncidentId: 'சம்பவ அடையாள எண்',
  nearbyPeopleAffected: 'பாதிக்கப்பட்டவர்கள்',
  nearbySearchingLocation: 'உங்கள் இருப்பிடத்திற்கு அருகில் தேடுகிறது',
  nearbyCurrentAccidentArea: 'தற்போதைய விபத்து பகுதி',
  nearbyRadius: 'வரம்பு',
  nearbyAvailableNow: 'தற்போது கிடைக்கின்றனர்',
  nearbyLiveAvailability: 'நேரடி கிடைக்கும் நிலை',
  nearbyVerifiedRespondersArea: 'நீங்கள் தேர்ந்தெடுத்த பகுதியில் சரிபார்க்கப்பட்ட உதவியாளர்கள்.',
  nearbyPeopleNearby: 'அருகிலுள்ளவர்கள்',
  nearbyChooseResponder: 'உதவிக்கு பொருத்தமான உதவியாளரைத் தேர்ந்தெடுக்கவும்.',
  nearbyFound: 'கண்டறியப்பட்டனர்',
  nearbyVerified: 'சரிபார்க்கப்பட்டது',
  nearbyDistance: 'தூரம்',
  nearbyEstimatedArrival: 'மதிப்பிடப்பட்ட வருகை நேரம்',
  nearbyCommunityRating: 'சமூக மதிப்பீடு',
  nearbyAcceptingIncident: 'சம்பவத்தை ஏற்கிறது...',
  nearbyIncidentAccepted: 'சம்பவம் ஏற்கப்பட்டது',
  nearbyAcceptIncident: 'சம்பவத்தை ஏற்கவும்',
  nearbyCurrentlyUnavailable: 'தற்போது கிடைக்கவில்லை',
  nearbySafetyPrinciple: 'GoldenLink பாதுகாப்பு கொள்கை',
  nearbySafetyDescription: 'GoldenLink பதிவு செய்யப்பட்ட சமூக உதவியாளர்களுடன் உங்களை இணைக்கிறது. தீவிரமான சம்பவங்களுக்கு தொழில்முறை அவசர சேவைகளே முதன்மையான பதிலளிப்பாக இருக்கும்.',

// ================================
// REPORT ACCIDENT - TAMIL
// ================================


reportAccidentDescription:
  'விபத்தைப் புகாரளித்து விரைவான சமூக உதவியை ஒருங்கிணைக்க உதவுங்கள்.',
backToHome: 'முகப்புக்குத் திரும்பு',

step: 'படி',
of: '/',


gpsLocationDescription:
  'மீட்பாளர்கள் சம்பவ இடத்தைக் கண்டறிய உங்கள் தற்போதைய GPS இருப்பிடத்தைப் பயன்படுத்தவும்.',

detectingYourLocation: 'உங்கள் இருப்பிடம் கண்டறியப்படுகிறது',
locationDetectedSuccessfully: 'இருப்பிடம் வெற்றிகரமாக கண்டறியப்பட்டது',
locationDetectionFailed: 'இருப்பிடத்தைக் கண்டறிய முடியவில்லை',

detectingLocationButton: 'இருப்பிடம் கண்டறியப்படுகிறது...',
gpsCoordinatesCaptured: 'GPS ஆயத்தொலைவுகள் பதிவு செய்யப்பட்டன',


tryAgain: 'மீண்டும் முயற்சிக்கவும்',

locationHelpBefore: 'உங்கள்',
locationHelpAfter:
  'GPS இருப்பிடம் சரியான மீட்பாளர்களை சம்பவத்துடன் இணைக்க GoldenLink-க்கு உதவுகிறது.',


accidentTypeDescription:
  'நீங்கள் புகாரளிக்கும் சம்பவத்தின் வகையைத் தெரிவிக்கவும்.',


describeWhatYouCanSee: 'நீங்கள் பார்க்கக்கூடியதை விவரிக்கவும்...',

howManyPeopleAffected: 'எத்தனை பேர் பாதிக்கப்பட்டுள்ளனர்?',
peopleAffectedDescription:
  'சம்பவத்தில் ஈடுபட்டவர்களின் தோராயமான எண்ணிக்கையைத் தேர்ந்தெடுக்கவும்.',

unconscious: 'நினைவிழந்தவர்',
bleeding: 'இரத்தப்போக்கு',
breathingDifficulty: 'சுவாசிப்பதில் சிரமம்',
trapped: 'சிக்கியுள்ளார்',


urgencyDescription:
  'நீங்கள் கவனிக்கக்கூடிய நிலையை அடிப்படையாகக் கொண்டு அவசர நிலையைத் தேர்ந்தெடுக்கவும்.',

severityNormal: 'சாதாரணம்',
severityModerate: 'மிதமானது',
severityCritical: 'மிகவும் ஆபத்தானது',

severityNormalDescription:
  'உடனடி ஆபத்து எதுவும் தெரியவில்லை.',
severityModerateDescription:
  'மருத்துவ அல்லது சமூக உதவி தேவைப்படலாம்.',
severityCriticalDescription:
  'உடனடி அவசர உதவி தேவைப்படுகிறது.',

incident: 'சம்பவம்',
notSelected: 'தேர்ந்தெடுக்கப்படவில்லை',

gpsLocation: 'GPS இருப்பிடம்',
captured: 'பதிவு செய்யப்பட்டது',

selectedUrgency: 'தேர்ந்தெடுக்கப்பட்ட அவசர நிலை',
selectEmergencyLevel: 'அவசர நிலையைத் தேர்ந்தெடுக்கவும்',

activationNote:
  'நீங்கள் வழங்கிய சம்பவ விவரங்கள் மற்றும் இருப்பிடத்தின் அடிப்படையில் GoldenLink அருகிலுள்ள மீட்பாளர்களை ஒருங்கிணைக்கும்.',



communityResponseActivatedSuccessfully:
  'சமூக உதவி வெற்றிகரமாக செயல்படுத்தப்பட்டது!',

helpCoordinatedForIncident:
  'இந்த சம்பவத்திற்கான உதவி ஒருங்கிணைக்கப்படுகிறது.',

locationRequired:
  'தொடர்வதற்கு முன் இருப்பிடம் தேவை.',

geolocationNotSupported:
  'இந்த உலாவியில் இருப்பிடக் கண்டறிதல் ஆதரிக்கப்படவில்லை.',



locationUnavailableDevice:
  'உங்கள் இருப்பிடத்தைக் கண்டறிய முடியவில்லை.',

locationDetectionTimeout:
  'இருப்பிடத்தைக் கண்டறியும் நேரம் முடிந்தது. மீண்டும் முயற்சிக்கவும்.',

// ============================================================
// COMMUNITY - TAMIL
// ============================================================

communityGoldenLinkNetwork: 'GoldenLink நெட்வொர்க்',
communityOurCommunity: 'எங்கள் சமூகம்',
communityHeaderDescription:
  'ஒன்றிணைந்து, சாதாரண மக்களும் வலுவான முதல் பதிலளிப்பு வலையமைப்பாக மாறலாம்.',

communityPoweredResponse:
  'சமூகத்தின் மூலம் விரைவான உதவி',
communityDontJustReport:
  'விபத்தை மட்டும் தெரிவிக்காதீர்கள்.',
communityActivateTheCommunity:
  'சமூகத்தை செயல்படுத்துங்கள்.',
communityHeroDescription:
  'உங்களைச் சுற்றி நடக்கும் சம்பவங்களில் உதவ தயாராக இருக்கும் மக்களுடன் GoldenLink இணைக்கிறது.',

communityTotalResponders:
  'மொத்த பதிலளிப்பாளர்கள்',
communityAvailableNow:
  'தற்போது கிடைப்பவர்கள்',
communityActiveIncidents:
  'செயலில் உள்ள சம்பவங்கள்',
communityAverageCoverage:
  'சராசரி பரப்பு',

communityNetworkCoverage:
  'வலையமைப்பு பரப்பு',
communityResponseAreas:
  'சமூக பதிலளிப்பு பகுதிகள்',
communityAreasDescription:
  'பல்வேறு பகுதிகளில் GoldenLink பதிலளிப்பாளர்கள் எவ்வாறு உள்ளனர் என்பதைப் பாருங்கள்.',

communityGoldenLinkCommunity:
  'GoldenLink சமூகம்',
communityResponders:
  'பதிலளிப்பாளர்கள்',
communityAvailable:
  'கிடைக்கும்',
communityIncidents:
  'சம்பவங்கள்',
communityCoverage:
  'பரப்பு',
communityViewCommunity:
  'சமூகத்தைப் பார்க்கவும்',
communityWord:
  'சமூகம்',

communityHowItWorks:
  'இது எப்படி செயல்படுகிறது',
communityOneCommunityFasterHelp:
  'ஒரு சமூகம். விரைவான உதவி.',
communityHowItWorksDescription:
  'ஒவ்வொரு நொடியும் முக்கியமான போது GoldenLink அருகிலுள்ள மக்களை ஒன்றிணைக்கிறது.',

communityJoin:
  'இணையுங்கள்',
communityJoinDescription:
  'உங்கள் அடிப்படை தகவல்கள் மற்றும் சரிபார்ப்பு சான்றிதழுடன் பதிவு செய்யுங்கள்.',

communityStayConnected:
  'இணைந்திருங்கள்',
communityStayConnectedDescription:
  'அவசரநிலை தெரிவிக்கப்படும் போது அருகிலுள்ள சமூக பதிலளிப்பாளர்களை GoldenLink அடையாளம் காணும்.',

communityRespond:
  'பதிலளியுங்கள்',
communityRespondDescription:
  'அருகிலுள்ள தன்னார்வலர்கள் கோரிக்கையை ஏற்று உடனடி உதவி வழங்கலாம்.',

communitySaveLives:
  'உயிர்களைக் காப்பாற்றுங்கள்',
communitySaveLivesDescription:
  'விரைவான சமூக பதிலளிப்பு, தொழில்முறை அவசர சேவைகள் வரும் முன் ஏற்படும் முக்கிய இடைவெளியை குறைக்க உதவுகிறது.',

communityBePartOfNetwork:
  'GoldenLink வலையமைப்பின் ஒரு பகுதியாக இருங்கள்',
communityNetworkNote:
  'அவசரநேரத்தில் உங்கள் சிறிய செயலும் பெரிய மாற்றத்தை ஏற்படுத்தும். ஒன்றிணைந்து வேகமான மற்றும் பாதுகாப்பான சமூக பதிலளிப்பு அமைப்பை உருவாக்கலாம்.',

communityRegistrationDescription:
  'சமூக பதிலளிப்பாளராக பதிவு செய்து, அவசரநிலைகளில் உங்களைச் சுற்றியுள்ளவர்களுக்கு உதவுங்கள்.',

communityApplicationReceived:
  'விண்ணப்பம் பெறப்பட்டது',
communityApplicationSubmitted:
  'விண்ணப்பம் வெற்றிகரமாக சமர்ப்பிக்கப்பட்டது!',
communityThankYou:
  'நன்றி,',
communityRegistrationSubmitted:
  'உங்கள் பதிவு, புகைப்படம் மற்றும் தன்னார்வ சான்றிதழ் வெற்றிகரமாக சமர்ப்பிக்கப்பட்டது.',

communityMobileVerified:
  'மொபைல் சரிபார்க்கப்பட்டது',
communityCertificatePending:
  'சான்றிதழ் சரிபார்ப்பு நிலுவையில் உள்ளது',
communityCertificatePendingDescription:
  'உங்கள் சமூக உறுப்பினர் செயல்படுத்தப்படுவதற்கு முன் உங்கள் சான்றிதழ் பரிசீலிக்கப்படும்.',
communityDone:
  'முடிந்தது',

communityVolunteerVerificationRequired:
  'தன்னார்வலர் சரிபார்ப்பு அவசியம்',
communityVerificationDescription:
  'உங்கள் புகைப்படம் மற்றும் செல்லுபடியாகும் தன்னார்வலர் சரிபார்ப்பு சான்றிதழை வழங்கவும். சமூக அணுகல் செயல்படுத்தப்படுவதற்கு முன் உங்கள் விவரங்கள் பரிசீலிக்கப்படும்.',

communityFullName:
  'முழு பெயர்',
communityFullNamePlaceholder:
  'உங்கள் முழு பெயரை உள்ளிடவும்',


communityGender:
  'பாலினம்',
communitySelectGender:
  'பாலினத்தைத் தேர்ந்தெடுக்கவும்',
communityMale:
  'ஆண்',
communityFemale:
  'பெண்',
communityOther:
  'மற்றவை',
communityPreferNotToSay:
  'குறிப்பிட விரும்பவில்லை',

communityPlace:
  'இடம்',
communityPlacePlaceholder:
  'நகரம் / ஊர் / பகுதி',


communityMobilePlaceholder:
  '10 இலக்க மொபைல் எண்',
communityOtpWillBeSent:
  'இந்த மொபைல் எண்ணிற்கு OTP அனுப்பப்படும்.',

communityGmailAddress:
  'Gmail முகவரி',
communityGmailPlaceholder:
  'example@gmail.com',
communityOnlyGmail:
  'Gmail முகவரிகள் மட்டுமே ஏற்றுக்கொள்ளப்படும்.',

communityDesignation:
  'பதவி',
communityDesignationPlaceholder:
  'மாணவர் / பொறியாளர் / ஓட்டுநர்...',

communityVehicleType:
  'வாகன வகை',
communitySelectVehicle:
  'வாகனத்தைத் தேர்ந்தெடுக்கவும்',
communityNoVehicle:
  'வாகனம் இல்லை',
communityTwoWheeler:
  'இருசக்கர வாகனம்',
communityCar:
  'கார்',
communityAutoTaxi:
  'ஆட்டோ / டாக்ஸி',
communityVan:
  'வேன்',
communityTruck:
  'லாரி',

communityMaritalStatus:
  'திருமண நிலை',
communitySelectStatus:
  'நிலையைத் தேர்ந்தெடுக்கவும்',
communityMarried:
  'திருமணமானவர்',
communityUnmarried:
  'திருமணமாகாதவர்',

communityPersonPhoto:
  'நபரின் புகைப்படம்',
communityPhotoSelected:
  'புகைப்படம் வெற்றிகரமாக தேர்ந்தெடுக்கப்பட்டது',
communityUploadPhoto:
  'உங்கள் புகைப்படத்தைப் பதிவேற்றவும்',
communityPhotoFormats:
  'JPG, JPEG அல்லது PNG',

communityVerifiedVolunteerCertificate:
  'சரிபார்க்கப்பட்ட தன்னார்வலர் சான்றிதழ்',
communityCertificateSelected:
  'சான்றிதழ் வெற்றிகரமாக தேர்ந்தெடுக்கப்பட்டது',
communityUploadCertificate:
  'சரிபார்க்கப்பட்ட தன்னார்வலர் சான்றிதழைப் பதிவேற்றவும்',
communityCertificateFormats:
  'PDF, JPG, JPEG அல்லது PNG',

communitySecurityVerification:
  'பாதுகாப்பு சரிபார்ப்பு',

communityCaptchaAnswer:
  'பதில்',
communityRefreshCaptcha:
  'CAPTCHA-வை புதுப்பிக்கவும்',

communityVerifyAndSendOtp:
  'சரிபார்த்து OTP அனுப்பவும்',

communityMobileVerification:
  'மொபைல் சரிபார்ப்பு',
communityVerifyMobileNumber:
  'உங்கள் மொபைல் எண்ணை சரிபார்க்கவும்',
communityEnterOtpSent:
  'அனுப்பப்பட்ட 6 இலக்க OTP-ஐ உள்ளிடவும்',

communityFrontendDemoMode:
  'Frontend demo mode:',
communityDemoOtpSentTo:
  'Demo OTP அனுப்பப்பட்டது',
communityDemoOtp:
  'Demo OTP',
communityNewDemoOtpSentTo:
  'புதிய Demo OTP அனுப்பப்பட்டது',


communityOtpExpiresIn:
  'OTP காலாவதியாகும் நேரம்',
communityOtpExpired:
  'OTP காலாவதியாகிவிட்டது.',

communityChangeNumber:
  'எண்ணை மாற்றவும்',
communityCompleteRegistration:
  'பதிவை நிறைவு செய்யவும்',

communityDidntReceiveOtp:
  'OTP கிடைக்கவில்லையா?',
communityResendOtp:
  'OTP-ஐ மீண்டும் அனுப்பவும்',

communityPhotoFormatError:
  'JPG, JPEG அல்லது PNG படத்தைப் பதிவேற்றவும்.',
communityCertificateFormatError:
  'PDF, JPG, JPEG அல்லது PNG சான்றிதழைப் பதிவேற்றவும்.',

communityIncorrectCaptcha:
  'தவறான CAPTCHA. மீண்டும் முயற்சிக்கவும்.',

communityOtpExpiredRequest:
  'OTP காலாவதியாகிவிட்டது. புதிய OTP-ஐ கோரவும்.',

communityEnterSixDigitOtp:
  '6 இலக்க OTP-ஐ உள்ளிடவும்.',

communityIncorrectOtp:
  'தவறான OTP. OTP-ஐ சரிபார்த்து மீண்டும் முயற்சிக்கவும்.',

communityEnterName:
  'உங்கள் பெயரை உள்ளிடவும்.',
communitySelectDob:
  'உங்கள் பிறந்த தேதியைத் தேர்ந்தெடுக்கவும்.',
communityEnterPlace:
  'உங்கள் இடத்தை உள்ளிடவும்.',
communityEnterMobile:
  'உங்கள் மொபைல் எண்ணை உள்ளிடவும்.',
communityMobileTenDigits:
  'மொபைல் எண் சரியாக 10 இலக்கங்களைக் கொண்டிருக்க வேண்டும்.',
communityEnterGmail:
  'உங்கள் Gmail முகவரியை உள்ளிடவும்.',
communityValidGmail:
  '@gmail.com என முடியும் சரியான Gmail முகவரியை உள்ளிடவும்.',
communitySelectMaritalStatus:
  'உங்கள் திருமண நிலையைத் தேர்ந்தெடுக்கவும்.',
communityEnterDesignation:
  'உங்கள் பதவியை உள்ளிடவும்.',

communityVerifyMobileBeforeSubmit:
  'சமர்ப்பிக்கும் முன் உங்கள் மொபைல் எண்ணை சரிபார்க்கவும்.',

  // ACCIDENT RECORDS
accidentRecordsGoldenLinkHistory: 'GoldenLink வரலாறு',
accidentRecordsTitle: 'விபத்து பதிவுகள்',
accidentRecordsDescription: 'நீங்கள் புகாரளித்த சம்பவங்களையும் அவற்றின் பதில் நிலையும் கண்காணிக்கவும்.',

accidentRecordsTotalReports: 'மொத்த புகார்கள்',
accidentRecordsActive: 'செயலில்',
accidentRecordsResponding: 'பதிலளிக்கப்படுகிறது',
accidentRecordsHandedOver: 'ஒப்படைக்கப்பட்டது',
accidentRecordsCompleted: 'நிறைவடைந்தது',

accidentRecordsFilterIncidents: 'சம்பவங்களை வடிகட்டவும்',

accidentRecordsCommunityResponseActive: 'சமூக பதில் செயலில் உள்ளது',
accidentRecordsRespondersOnTheWay: 'பதிலளிப்பவர்கள் வந்து கொண்டிருக்கின்றனர்',
accidentRecordsProfessionalHandoverCompleted: 'தொழில்முறை ஒப்படைப்பு நிறைவடைந்தது',
accidentRecordsResponseCompleted: 'பதில் நடவடிக்கை நிறைவடைந்தது',
accidentRecordsUnknownStatus: 'நிலை தெரியவில்லை',

accidentRecordsViewIncident: 'சம்பவத்தைப் பார்க்கவும்',

accidentRecordsNoIncidentsFound: 'சம்பவங்கள் எதுவும் இல்லை',
accidentRecordsNoRecordsCategory: 'இந்த வகையில் விபத்து பதிவுகள் எதுவும் இல்லை.',

accidentRecordsGoldenLinkIncident: 'GoldenLink சம்பவம்',
accidentRecordsIncidentDetails: 'சம்பவ விவரங்கள்',
accidentRecordsCloseIncidentDetails: 'சம்பவ விவரங்களை மூடவும்',

accidentRecordsIncidentId: 'சம்பவ ID',
accidentRecordsAccidentType: 'விபத்து வகை',
accidentRecordsSeverity: 'தீவிரம்',
accidentRecordsVictims: 'பாதிக்கப்பட்டவர்கள்',

accidentRecordsVictimInformation: 'பாதிக்கப்பட்டவர் தகவல்',
accidentRecordsSomeoneUnconscious: 'ஒருவர் மயக்க நிலையில் உள்ளார்',
accidentRecordsHeavyBleeding: 'அதிக இரத்தப்போக்கு பதிவாகியுள்ளது',
accidentRecordsPersonTrapped: 'ஒருவர் சிக்கியுள்ளார் அல்லது நகர முடியவில்லை',

accidentRecordsIncidentLocation: 'சம்பவ இடம்',
accidentRecordsOpenInMaps: 'வரைபடத்தில் திறக்கவும்',

accidentRecordsReportDescription: 'புகார் விளக்கம்',

accidentRecordsAiAssessment: 'AI மதிப்பீடு',
accidentRecordsGoldenLinkAiAnalysis: 'GoldenLink AI பகுப்பாய்வு',
accidentRecordsConfidence: 'நம்பகத்தன்மை',
accidentRecordsCloseDetails: 'விவரங்களை மூடவும்',

accidentRecordsDefaultDescription: 'GoldenLink மூலம் விபத்து புகாரளிக்கப்பட்டது.',

accidentRecordsUnknown: 'தெரியவில்லை',
accidentRecordsUnknownTime: 'நேரம் தெரியவில்லை',
accidentRecordsJustNow: 'இப்போதுதான்',
accidentRecordsMinutesAgo: '{count} நிமிடங்களுக்கு முன்பு',
accidentRecordsHoursAgo: '{count} மணி நேரத்திற்கு முன்பு',
accidentRecordsYesterday: 'நேற்று',
accidentRecordsDaysAgo: '{count} நாட்களுக்கு முன்பு',

accidentRecordsNoResponderAssigned: 'பதிலளிப்பவர் நியமிக்கப்படவில்லை',

// AI ASSISTANT
aiGoldenLinkAi: 'GOLDENLINK AI',
aiEmergencyAssistant: 'அவசர உதவியாளர்',
aiAssistantDescription: 'AI உதவியுடன் சம்பவ மதிப்பீடு மற்றும் பதில் ஒருங்கிணைப்பு',
aiEmergencyResponseAssistant: 'அவசர பதில் உதவியாளர்',

aiWelcome: 'வணக்கம். நான் GoldenLink AI, உங்கள் அவசர பதில் உதவியாளர்.',
aiNoActiveIncident: 'தற்போது செயலில் உள்ள சம்பவம் எதுவும் இல்லை. முதலில் விபத்தைப் புகாரளிக்கலாம் அல்லது பொதுவான அவசர பதில் வழிகாட்டுதலை என்னிடம் கேட்கலாம்.',

aiConnectedToIncident: 'நான் சம்பவம் #{incidentId}-உடன் இணைக்கப்பட்டுள்ளேன். தற்போதைய அவசர நிலையைப் புரிந்துகொள்ளவும் பதில் ஒருங்கிணைப்பு வழிகாட்டுதலை வழங்கவும் உதவ முடியும்.',
aiExistingAssessment: 'தற்போதைய சம்பவம் {severity} என மதிப்பிடப்பட்டுள்ளது. மதிப்பீட்டு நம்பகத்தன்மை {confidence}%.',
aiQuickAssessmentIntro: 'சம்பவத்தை மதிப்பிட உதவும் சில விரைவான கேள்விகளை கேட்கிறேன்.',

aiQuestionAtLocation: 'நீங்கள் தற்போது விபத்து நடந்த இடத்தில் இருக்கிறீர்களா?',
aiQuestionInjuredPeople: 'எத்தனை பேர் காயமடைந்துள்ளனர்?',
aiQuestionUnconscious: 'யாராவது மயக்க நிலையில் உள்ளார்களா?',
aiQuestionHeavyBleeding: 'யாருக்காவது அதிக இரத்தப்போக்கு உள்ளதா?',
aiQuestionBreathingDifficulty: 'யாருக்காவது சுவாசிப்பதில் சிரமம் உள்ளதா?',
aiQuestionTrapped: 'யாராவது வாகனத்திற்குள் சிக்கியுள்ளார்களா அல்லது நகர முடியவில்லையா?',

aiGeneralResponse: 'அவசர பதில் ஒருங்கிணைப்பில் நான் உதவ முடியும். பாதுகாப்பான இடத்தில் இருங்கள், காயமடைந்தவர்களை தேவையில்லாமல் நகர்த்துவதைத் தவிர்க்கவும், அவசர சேவைகளின் வழிமுறைகளைப் பின்பற்றவும்.',

aiBleedingResponse: 'யாருக்காவது அதிக இரத்தப்போக்கு இருந்தால் உடனடியாக அவசர மருத்துவ உதவியை நாடுங்கள். பாதுகாப்பாக இருந்தால், சுத்தமான துணி அல்லது காஸைப் பயன்படுத்தி காயத்தின் மீது அழுத்தம் கொடுக்கவும்.',

aiUnconsciousResponse: 'யாராவது மயக்க நிலையில் இருந்தால் அல்லது பதிலளிக்கவில்லை என்றால் உடனடியாக அவசர சேவைகளைத் தொடர்பு கொள்ளுங்கள். அவர்கள் சுவாசிக்கிறார்களா என்பதைச் சரிபார்த்து, அவசர சேவை வழிகாட்டுதலைப் பின்பற்றுங்கள்.',

aiBreathingResponse: 'சுவாசிப்பதில் சிரமம் என்பது அவசர எச்சரிக்கை அறிகுறியாகும். உடனடியாக அவசர சேவைகளைத் தொடர்பு கொண்டு, தொழில்முறை உதவி வரும் வரை அந்த நபரை பாதுகாப்பான நிலையில் வைத்திருங்கள்.',

aiTrappedResponse: 'தீ போன்ற உடனடி ஆபத்து இல்லையெனில் சிக்கிய நபரை வலுக்கட்டாயமாக வெளியே எடுக்க முயற்சிக்க வேண்டாம். அவசர சேவைகளைத் தொடர்பு கொண்டு பயிற்சி பெற்ற பதிலளிப்பவர்கள் வரும் வரை காத்திருக்கவும்.',

aiResponderResponse: 'இந்த சம்பவத்திற்கு நியமிக்கப்பட்ட பதிலளிப்பவரை Responder Dashboard-ல் பார்க்கலாம். விபத்து இடத்தை அணுகக்கூடியதாக வைத்திருந்து, பதிலளிப்பவர்கள் வந்ததும் அவர்களின் வழிமுறைகளைப் பின்பற்றுங்கள்.',

aiCriticalAssessment: 'பதிவுசெய்யப்பட்ட நிலைமைகள் உடனடி பதில் ஒருங்கிணைப்பு தேவைப்படும் முக்கியமான அவசரநிலையைக் காட்டுகின்றன.',
aiSeriousAssessment: 'பலர் பாதிக்கப்பட்டுள்ளதாக தெரிவிக்கப்பட்டுள்ளது. விரைவான சமூக மற்றும் அவசர உதவி பரிந்துரைக்கப்படுகிறது.',
aiModerateAssessment: 'பதிவுசெய்யப்பட்ட சம்பவத்திற்கு உதவியும் கண்காணிப்பும் தேவை. சமூக பதிலை ஒருங்கிணைக்கலாம்.',

aiAssessmentCompleted: 'நன்றி. ஆரம்ப சம்பவ மதிப்பீட்டை முடித்துவிட்டேன்.',
aiAssessmentResult: 'சம்பவம் {severity} என மதிப்பிடப்பட்டுள்ளது. தற்போதைய பதில் நிலையின் அடிப்படையில் உதவி ஒருங்கிணைப்பைத் தொடரலாம்.',

aiAskAnythingPlaceholder: 'GoldenLink AI-யிடம் எதையும் கேளுங்கள்...',
aiSendMessage: 'செய்தியை அனுப்பவும்',
aiInputHelp: 'இந்த சம்பவம், அவசர பதில், இரத்தப்போக்கு, சுவாச சிரமம், பதிலளிப்பவர்கள் அல்லது உதவி வரும் வரை என்ன செய்ய வேண்டும் என்பதைப் பற்றி கேளுங்கள்.',
aiDisclaimer: 'GoldenLink AI பதில் ஒருங்கிணைப்பு உதவியை வழங்குகிறது; மருத்துவ நோயறிதலை வழங்காது.',

aiAssessment: 'AI மதிப்பீடு',
aiAssessmentInProgress: 'மதிப்பீடு நடைபெறுகிறது',
aiAssessmentWaitingDescription: 'அவசரநிலையை GoldenLink புரிந்துகொள்ள கேள்விகளுக்கு பதிலளிக்கவும்.',
aiIncidentAssessment: 'AI சம்பவ மதிப்பீடு',
aiReportedConditions: 'தெரிவிக்கப்பட்ட நிலைமைகள்',
aiActivateCommunityResponse: 'சமூக பதிலை செயல்படுத்தவும்',
aiSafetyNote: 'பாதுகாப்பான இடத்தில் இருந்து அவசர சேவைகளின் வழிமுறைகளைப் பின்பற்றவும்',

aiNotRequested: 'கோரப்படவில்லை',
confidence: 'நம்பகத்தன்மை',

      },


      // ============================================================
      // HINDI
      // ============================================================
      hi: {

        // Navigation
        home: 'होम',
        reportAccident: 'दुर्घटना रिपोर्ट करें',
        community: 'समुदाय',
        nearbyResponders: 'पास के सहायता दल',
        volunteers: 'स्वयंसेवक',
        aiAssistant: 'GoldenLink AI',
        profile: 'प्रोफ़ाइल',
        selectLanguage: 'भाषा चुनें',

        // Home
        activateCommunity: 'समुदाय सहायता सक्रिय करें',
        CommunityResponse: 'समुदाय सहायता',
        duringGoldenHour: 'गोल्डन ऑवर के दौरान',
        DontJustReport: 'सिर्फ दुर्घटना की रिपोर्ट न करें।',
        responderDashboard: 'सहायता दल डैशबोर्ड',
        emergencyResponse: 'आपातकालीन सहायता',
        witnessedAccident: 'क्या आपने दुर्घटना देखी है?',
        reportIncidentQuickly:
          'दुर्घटना की तुरंत रिपोर्ट करें और महत्वपूर्ण गोल्डन ऑवर के दौरान पास के समुदाय सहायता दल को सक्रिय करें।',
        ActivateCommunity: 'समुदाय सहायता सक्रिय करें',

        HelpCanStart: 'मदद शुरू हो सकती है',
        WithPeopleNearby: 'पास के लोगों के साथ',
        GoldenlinkConnects:
          'GoldenLink जरूरतमंद लोगों को पास के प्रशिक्षित समुदाय सहायता दल से जोड़ता है।',

        NearbyResponders: 'पास के सहायता दल',
        IdentifyResponders:
          'घटना के पास उपलब्ध प्रशिक्षित सहायता दल की पहचान करें।',

        VerifiedSkills: 'सत्यापित कौशल',
        ResponderProfiles:
          'सत्यापित सहायता दल की प्रोफ़ाइल और उनके आपातकालीन कौशल देखें।',

        RoleBasedSupport: 'भूमिका आधारित सहायता',
        DifferentPeople:
          'अलग-अलग लोग अलग-अलग प्रकार की आपातकालीन सहायता प्रदान कर सकते हैं।',

        localLanguages: 'स्थानीय भाषाएँ',
        simpleGuidance:
          'परिचित स्थानीय भाषाओं में सरल आपातकालीन मार्गदर्शन प्राप्त करें।',

        // Why GoldenLink
        whyGoldenLink: 'GoldenLink क्यों?',
        dontJustReport: 'सिर्फ रिपोर्ट न करें।',
        coordinate: 'समन्वय करें।',
        whyGoldenLinkDescription:
          'GoldenLink को दुर्घटना होने और पीड़ित तक प्रभावी सहायता पहुँचने के बीच के समन्वय अंतर को कम करने के लिए बनाया गया है।',

        communityCoordination: 'समुदाय समन्वय',
        communityCoordinationDescription:
          'पास के लोगों को सरल भूमिकाओं में संगठित किया जा सकता है ताकि हर कोई एक ही काम करने की कोशिश न करे।',

        locationAwareResponse: 'स्थान-आधारित सहायता',
        locationAwareResponseDescription:
          'यह प्रणाली घटना और सहायता दल के स्थान का उपयोग करके दुर्घटना को पास के उपयुक्त सहायता दल से जोड़ने में मदद करती है।',

        suitableResponders: 'उपयुक्त सहायता दल',
        suitableRespondersDescription:
          'सहायता दल का मिलान उपलब्धता, दूरी, कौशल और पंजीकृत प्रशिक्षण के आधार पर किया जा सकता है।',

        multilingualGuidance: 'बहुभाषी मार्गदर्शन',
        multilingualGuidanceDescription:
          'इंटरफ़ेस अंग्रेज़ी, तमिल और सुलभ क्षेत्रीय भाषाओं में संचार का समर्थन कर सकता है।',

        simpleRoles: 'सरल भूमिकाएँ',
        simpleRolesDescription:
          'प्रत्येक प्रतिभागी को एक स्पष्ट कार्य दिया जाता है ताकि सहायता को समझना और समन्वय करना आसान हो।',

        professionalHandover: 'पेशेवर हस्तांतरण',
        professionalHandoverDescription:
          'उपयुक्त पेशेवर सहायता दल के जिम्मेदारी संभालने तक GoldenLink समुदाय सहायता का समर्थन करता है।',

        ourCoreInnovation: 'हमारा मुख्य नवाचार',
        coordinationLayerGoldenHour:
          'गोल्डन ऑवर के लिए एक समन्वय परत।',
        existingSystemsCanCall:
          'मौजूदा प्रणालियाँ कॉल, सूचना या मार्गदर्शन दे सकती हैं। GoldenLink पास के लोगों को विशिष्ट और सुरक्षित कार्यों में समन्वित करने पर ध्यान देता है।',

        // Community responder
        communityResponder: 'समुदाय सहायता दल',
        readyToHelp: 'क्या आप गोल्डन ऑवर के दौरान मदद करने के लिए तैयार हैं?',
        joinResponderNetwork:
          'GoldenLink सहायता नेटवर्क से जुड़ें। पास की घटनाएँ देखें, सहायता अनुरोध स्वीकार करें और समुदाय सहायता का समन्वय करें।',

        // Common buttons
        emergency: 'आपातकाल',
        helpNow: 'अभी सहायता प्राप्त करें',
        back: 'पीछे',
        next: 'अगला',
        previous: 'पिछला',
        cancel: 'रद्द करें',
        submit: 'जमा करें',
        save: 'सहेजें',
        close: 'बंद करें',
        search: 'खोजें',
        view: 'देखें',
        continue: 'जारी रखें',
        confirm: 'पुष्टि करें',
        edit: 'संपादित करें',
        delete: 'हटाएँ',
        retry: 'पुनः प्रयास करें',
        refresh: 'रीफ्रेश करें',
        loading: 'लोड हो रहा है...',
        yes: 'हाँ',
        no: 'नहीं',

        // Location
        detectMyLocation: 'मेरा स्थान पता करें',
        locationCaptured: 'स्थान प्राप्त हुआ',
        whereAccidentHappened: 'दुर्घटना कहाँ हुई?',
        detectingLocation: 'आपका स्थान पता किया जा रहा है...',
        locationDetected: 'स्थान सफलतापूर्वक पता चला।',
        locationNotAvailable: 'स्थान उपलब्ध नहीं है।',
        locationPermissionDenied:
          'स्थान की अनुमति अस्वीकार कर दी गई है। कृपया अपने ब्राउज़र में स्थान की अनुमति सक्षम करें।',
        locationError:
          'आपका स्थान पता नहीं लगाया जा सका। कृपया पुनः प्रयास करें।',
        latitude: 'अक्षांश',
        longitude: 'देशांतर',
        currentLocation: 'वर्तमान स्थान',

        // Accident
        whatHappened: 'क्या हुआ?',
        roadAccident: 'सड़क दुर्घटना',
        twoWheelerAccident: 'दो-पहिया वाहन दुर्घटना',
        pedestrianIncident: 'पैदल यात्री घटना',
        notSure: 'पता नहीं',

        peopleAffected: 'कितने लोग प्रभावित हैं?',
        onePerson: '1 व्यक्ति',
        twoPeople: '2 लोग',
        threePeople: '3 लोग',
        fourPeople: '4 लोग',
        fivePeople: '5 लोग',
        fivePlusPeople: '5+ लोग',

        additionalInformation: 'अतिरिक्त जानकारी',
        describeWhatYouSee: 'आप जो देख रहे हैं उसका वर्णन करें...',

        howUrgent: 'स्थिति कितनी गंभीर है?',
        normal: 'सामान्य',
        moderate: 'मध्यम',
        critical: 'गंभीर',

        activateGoldenLink: 'GoldenLink सक्रिय करें',

        // Messages
        success: 'सफलता',
        accidentReportedSuccessfully:
          'दुर्घटना सफलतापूर्वक रिपोर्ट की गई।',
        nearbyRespondersNotified:
          'पास के सहायता दल को सूचित कर दिया गया है।',
        somethingWentWrong:
          'कुछ गलत हो गया। कृपया पुनः प्रयास करें।',
        requiredField:
          'यह फ़ील्ड आवश्यक है।',
        invalidInput:
          'कृपया मान्य जानकारी दर्ज करें।',

        // AI Assistant
        askGoldenLinkAI: 'GoldenLink AI से कुछ भी पूछें...',
        accidentLocationQuestion:
          'क्या आप अभी दुर्घटना स्थल पर हैं?',
        injuredPeopleQuestion:
          'कितने लोग घायल हैं?',
        unconsciousQuestion:
          'क्या कोई बेहोश है?',
        heavyBleedingQuestion:
          'क्या किसी को बहुत अधिक रक्तस्राव हो रहा है?',
        breathingDifficultyQuestion:
          'क्या किसी को सांस लेने में कठिनाई हो रही है?',
        trappedQuestion:
          'क्या कोई वाहन के अंदर फंसा है या हिल नहीं सकता?',
        yesAnswer: 'हाँ',
        noAnswer: 'नहीं',
        thinking: 'GoldenLink AI सोच रहा है...',
        aiEmergencyGuidance: 'आपातकालीन मार्गदर्शन',
        aiResponse: 'AI उत्तर',

        // Status
        active: 'सक्रिय',
        inactive: 'निष्क्रिय',
        available: 'उपलब्ध',
        unavailable: 'अनुपलब्ध',
        pending: 'लंबित',
        accepted: 'स्वीकार किया गया',
        rejected: 'अस्वीकार किया गया',
        completed: 'पूर्ण',
        cancelled: 'रद्द',
        responding: 'प्रतिक्रिया दे रहा है',
        resolved: 'समाधान किया गया',

        // Responder
        incidentResponse: 'घटना सहायता',
        responderProfile: 'सहायता दल प्रोफ़ाइल',
        responderStatus: 'सहायता दल स्थिति',
        availableResponders: 'उपलब्ध सहायता दल',
        acceptRequest: 'अनुरोध स्वीकार करें',
        declineRequest: 'अनुरोध अस्वीकार करें',
        responseStarted: 'सहायता शुरू हुई।',
        responseCompleted: 'सहायता पूरी हुई।',

        // Community
        joinCommunity: 'समुदाय से जुड़ें',
        volunteerSearch: 'स्वयंसेवक खोज',
        nearbyCommunity: 'पास का समुदाय',

        // Registration
        name: 'नाम',
        dateOfBirth: 'जन्म तिथि',
        mobileNumber: 'मोबाइल नंबर',
        emailAddress: 'ईमेल पता',
        applicantPhoto: 'आवेदक का फोटो',
        verifiedCertificate: 'सत्यापित प्रमाणपत्र',
        captcha: 'CAPTCHA',
        otpVerification: 'OTP सत्यापन',
        enterOtp: 'OTP दर्ज करें',
        sendOtp: 'OTP भेजें',
        verifyOtp: 'OTP सत्यापित करें',

        // Records
        accidentRecords: 'दुर्घटना रिकॉर्ड',
        incidentRecords: 'घटना रिकॉर्ड',
        noRecordsFound: 'कोई रिकॉर्ड नहीं मिला।',
        incidentDetails: 'घटना विवरण',
        reportedAt: 'रिपोर्ट का समय',
        status: 'स्थिति',
        severity: 'गंभीरता',
        location: 'स्थान',

        // Footer
        quickLinks: 'त्वरित लिंक',
        emergencySupport: 'आपातकालीन सहायता',
        communitySupport: 'समुदाय सहायता',
        allRightsReserved: 'सर्वाधिकार सुरक्षित।',

        // Workflow
        goldenLinkResponseNetwork: 'GoldenLink सहायता नेटवर्क',
        fromAccident: 'दुर्घटना से',
        toCoordinatedResponse: 'समन्वित सहायता तक।',
        workflowIntroduction:
          'GoldenLink दुर्घटना के आसपास के लोगों को जोड़ता है और गोल्डन ऑवर के दौरान प्रत्येक सहायता दल को एक सरल और महत्वपूर्ण भूमिका देता है।',

        workflowReport: 'रिपोर्ट',
        workflowReportDescription:
          'आवश्यक स्थान और स्थिति की जानकारी के साथ दुर्घटना की रिपोर्ट की जाती है।',

        workflowTriage: 'प्राथमिक मूल्यांकन',
        workflowTriageDescription:
          'सरल प्रश्न सही सहायता प्रक्रिया की पहचान करने में मदद करते हैं।',

        workflowMatch: 'मिलान',
        workflowMatchDescription:
          'उपलब्धता और कौशल के आधार पर उपयुक्त निकटतम सहायता दल की पहचान की जाती है।',

        workflowGuide: 'मार्गदर्शन',
        workflowGuideDescription:
          'सहायता दल को सरल और स्वीकृत चरण-दर-चरण मार्गदर्शन मिलता है।',

        workflowCoordinate: 'समन्वय',
        workflowCoordinateDescription:
          'अलग-अलग सहायता दल को अलग-अलग कार्य दिए जाते हैं ताकि समुदाय मिलकर काम करे।',

        workflowHandover: 'हस्तांतरण',
        workflowHandoverDescription:
          'पेशेवर आपातकालीन सहायता दल के पहुंचने पर वे सहायता की जिम्मेदारी संभाल लेते हैं।',

        workflowLearn: 'सीखना',
        workflowLearnDescription:
          'एकत्रित प्रतिक्रिया डेटा कमियों की पहचान करने और भविष्य की तैयारी सुधारने में मदद करता है.',

          //community-preview//

        communityResponse: 'सामुदायिक सहायता',
  rightPeople: 'सही लोग',
  canMakeDifference: 'बदलाव ला सकते हैं।',
  communityPreviewDescription:
    'GoldenLink दुर्घटना के पास मौजूद लोगों को Golden Hour के दौरान उपयोगी सामुदायिक सहायता से जोड़ने में मदद करता है।',
  exploreCommunity: 'समुदाय देखें',
  becomeResponder: 'रिस्पॉन्डर बनें',
  nearbyHelp: 'पास की सहायता',
  nearbyHelpDescription:
    'दुर्घटना के पास मौजूद पंजीकृत सामुदायिक रिस्पॉन्डर्स को खोजें।',
  trustedResponders: 'विश्वसनीय रिस्पॉन्डर्स',
  trustedRespondersDescription:
    'रिस्पॉन्डर्स की प्रोफाइल में उनके कौशल, उपलब्धता और अनुभव की जानकारी हो सकती है।',
  localSupport: 'स्थानीय सहायता',
  localSupportDescription:
    'स्थानीय भाषाओं और स्पष्ट निर्देशों के माध्यम से मार्गदर्शन को समझना आसान बनाया जा सकता है।',
  clearRoles: 'स्पष्ट भूमिकाएँ',
  clearRolesDescription:
    'हर रिस्पॉन्डर को उपयुक्त कार्य दिए जा सकते हैं ताकि सभी एक ही काम न करें।',


    //emetgency-cta//

    goldenHourResponse: 'Golden Hour सहायता',
  whenEverySecondMatters: 'जब हर सेकंड महत्वपूर्ण हो,',
  knowWhatToDo: 'तो जानें कि क्या करना है।',
  emergencyCtaDescription:
    'दुर्घटना की रिपोर्ट करें और पेशेवर आपातकालीन सेवाओं के आने तक घटना के आसपास उपयुक्त लोगों की सहायता सक्रिय करने में मदद करें।',
  goldenLinkEmergencyDisclaimer:
    'GoldenLink AI सामुदायिक समन्वय में सहायता करता है। यह एम्बुलेंस, डॉक्टरों, पुलिस या पेशेवर आपातकालीन सेवाओं का विकल्प नहीं है।',

    //footer//

    footerDescription:
    'Golden Hour के लिए AI-सहायता प्राप्त सामुदायिक प्रतिक्रिया नेटवर्क।',
  footerTagline:
    'सिर्फ दुर्घटना की रिपोर्ट न करें। समुदाय को सक्रिय करें।',
  goldenLink: 'GoldenLink',
  howItWorks: 'यह कैसे काम करता है',
  footercommunity: 'समुदाय',
  responders: 'रिस्पॉन्डर्स',
  support: 'सहायता',
  help: 'मदद',
  safety: 'सुरक्षा',
  privacy: 'गोपनीयता',
  copyright: '© 2026 GoldenLink AI',
  builtForYuva: 'YUVA Future 6.0 के लिए बनाया गया',

  //emergency-button//

  emergencyAssistance: 'आपातकालीन सहायता',
  emergencyQuestion: 'क्या आप किसी दुर्घटना को देख रहे हैं या किसी आपातकालीन स्थिति का सामना कर रहे हैं?',
  call112: '112 पर कॉल करें',


  // ============================================================
  // RESPONDER DASHBOARD
  // ============================================================

  responderIncidentInformationUpdated:
    'घटना की जानकारी अपडेट कर दी गई है।',
  responderNoActiveIncident:
    'कोई सक्रिय घटना नहीं',
  responderNoActiveIncidentDescription:
    'वर्तमान में आपको कोई सक्रिय घटना असाइन नहीं की गई है।',
  responderViewNearbyResponders:
    'पास के सहायता दल देखें',

  responderDashboardTitle:
    'सहायता दल डैशबोर्ड',
  responderEmergencyResponse:
    'आपातकालीन सहायता',
  responderDashboardDescription:
    'अपनी असाइन की गई घटना को प्रबंधित करें और गोल्डन ऑवर के दौरान आपातकालीन सहायता का समन्वय करें।',

  responderActiveIncident:
    'सक्रिय घटना',
  responderResponseProgress:
    'सहायता प्रगति',
  responderLive:
    'लाइव',
  responderAssigned:
    'असाइन किया गया',
  responderOnTheWay:
    'रास्ते में',
  responderOnScene:
    'घटनास्थल पर',
  responderComplete:
    'पूर्ण',

  responderIncidentInformation:
    'घटना की जानकारी',
  responderAccidentDetails:
    'दुर्घटना विवरण',
  responderAccidentType:
    'दुर्घटना का प्रकार',
  responderNotSpecified:
    'निर्दिष्ट नहीं',
  responderPeopleAffected:
    'प्रभावित लोग',
  responderUnconscious:
    'बेहोश',
  responderBleeding:
    'रक्तस्राव',
  responderBreathingDifficulty:
    'सांस लेने में कठिनाई',
  responderTrapped:
    'फंसा हुआ',
  responderReporterDescription:
    'रिपोर्ट करने वाले का विवरण',

  responderAccidentLocation:
    'दुर्घटना का स्थान',
  responderRespondHere:
    'यहाँ सहायता करें',
  responderReportedLocation:
    'रिपोर्ट किया गया स्थान',
  responderOpenLocationInMaps:
    'मैप में स्थान खोलें',

  responderAssignment:
    'असाइनमेंट',
  responderEta:
    'अनुमानित आगमन समय',
  responderVerified:
    'सत्यापित',

  responderOptionalAiSupport:
    'वैकल्पिक AI सहायता',
  responderGoldenLinkAiAssistant:
    'GoldenLink AI सहायक',
  responderAiSupportDescription:
    'घटना का जवाब देते समय अतिरिक्त AI-सहायता प्राप्त मार्गदर्शन प्राप्त करें।',
  responderOpenAiAssistant:
    'AI सहायक खोलें',

  responderResponseControl:
    'सहायता नियंत्रण',
  responderUpdateResponse:
    'सहायता अपडेट करें',
  responderUpdateResponseDescription:
    'अपनी वर्तमान सहायता स्थिति अपडेट करें।',
  responderImOnTheWay:
    'मैं रास्ते में हूँ',
  responderIveArrived:
    'मैं पहुँच गया हूँ',
  responderHandOverEmergencyServices:
    'आपातकालीन सेवाओं को सौंपें',
  responderCompleteResponse:
    'सहायता पूरी करें',

  responderResponseCompleted:
    'सहायता पूर्ण',
  responderIncidentSuccessfullyClosed:
    'यह घटना सफलतापूर्वक बंद कर दी गई है।',

  responderSafetyPrinciple:
    'GoldenLink सहायता दल सुरक्षा सिद्धांत',
  responderSafetyNote:
    'सुरक्षित सहायता प्रक्रियाओं का पालन करें। खुद या दूसरों को अनावश्यक जोखिम में न डालें।',

  responderAccidentRecords:
    'दुर्घटना रिकॉर्ड',

  responderAssignedMessage:
    'आपको इस घटना के लिए असाइन किया गया है।',
  responderEnRouteMessage:
    'आप घटना स्थल की ओर जा रहे हैं।',
  responderOnSceneMessage:
    'आप घटना स्थल पर पहुँच गए हैं।',
  responderHandedOverMessage:
    'घटना आपातकालीन सेवाओं को सौंप दी गई है।',
  responderCompletedMessage:
    'सहायता पूरी कर दी गई है।',
  responderActiveMessage:
    'आप इस घटना पर सक्रिय रूप से सहायता कर रहे हैं।',

  responderSeverityCritical:
    'गंभीर',
  responderSeveritySerious:
    'अति गंभीर',
  responderSeverityModerate:
    'मध्यम',

  responderMarkedOnTheWay:
    'सहायता स्थिति "रास्ते में" कर दी गई है।',
  responderArrivalRecorded:
    'आपकी पहुँच दर्ज कर ली गई है।',
  responderIncidentHandedOver:
    'घटना आपातकालीन सेवाओं को सौंप दी गई है।',
  responderResponseCompletedSuccessfully:
    'सहायता सफलतापूर्वक पूरी हुई।',

  responderCurrentAccidentLocation:
    'वर्तमान दुर्घटना स्थान',
  responderLocationUnavailable:
    'स्थान उपलब्ध नहीं है',

  responderAssignedResponder:
    'असाइन किया गया सहायता दल',
  responderCommunityResponder:
    'समुदाय सहायता दल',
  responderPerson:
    'व्यक्ति',
  responderPeople:
    'लोग',

    //responder=profile//

    responderAccount: 'रिस्पॉन्डर खाता',
  myProfile: 'मेरी प्रोफ़ाइल',
  responderProfileDescription: 'अपनी रिस्पॉन्डर जानकारी और उपलब्धता प्रबंधित करें।',
  editProfile: 'प्रोफ़ाइल संपादित करें',
  profileEditingSoon: 'प्रोफ़ाइल संपादन जल्द उपलब्ध होगा।',
  availableToRespond: 'प्रतिक्रिया देने के लिए उपलब्ध',
  currentlyUnavailable: 'वर्तमान में उपलब्ध नहीं',
  responderId: 'रिस्पॉन्डर आईडी',
  responderAvailability: 'रिस्पॉन्डर उपलब्धता',
  youAreAvailable: 'आप उपलब्ध हैं',
  youAreUnavailable: 'आप उपलब्ध नहीं हैं',
  availableDescription: 'आप पास की आपातकालीन प्रतिक्रिया अनुरोध प्राप्त कर सकते हैं।',
  unavailableDescription: 'आपको नए प्रतिक्रिया अनुरोध प्राप्त नहीं होंगे।',
  responses: 'प्रतिक्रियाएँ',
  successful: 'सफल',
  rating: 'रेटिंग',
  responderInformation: 'रिस्पॉन्डर जानकारी',
  currentArea: 'वर्तमान क्षेत्र',
  joinedGoldenLink: 'GoldenLink AI से जुड़े',
  responseRadius: 'प्रतिक्रिया क्षेत्र',
  respondSafely: 'सुरक्षित रूप से प्रतिक्रिया दें',
  respondSafelyDescription: 'केवल तभी प्रतिक्रिया दें जब ऐसा करना सुरक्षित हो। आपातकालीन निर्देशों का पालन करें और खुद को जोखिम में न डालें।',
  

    //incident-respponce//

    incidentResponderCenter: 'रिस्पॉन्डर केंद्र',
  incidentResponseDescription: 'पास की घटनाओं को खोजें और गोल्डन ऑवर के दौरान अपने समुदाय की मदद करें।',
  activeIncidents: 'सक्रिय घटनाएँ',
  peopleNeedingHelp: 'मदद की जरूरत वाले लोग',
  nearestIncident: 'निकटतम घटना',
  nearbyIncidents: 'पास की घटनाएँ',
  chooseIncidentSafely: 'ऐसी घटना चुनें जिसमें आप सुरक्षित रूप से प्रतिक्रिया दे सकें।',
  handedOver: 'सौंपा गया',
  all: 'सभी',
  kmAway: 'किमी दूर',
  oneMinuteAgo: '1 मिनट पहले',
  minutesAgo: 'मिनट पहले',
  responderNeeded: 'रिस्पॉन्डर आवश्यक',
  respondersNeeded: 'रिस्पॉन्डर आवश्यक हैं',
  incidentAccepted: 'घटना स्वीकार की गई',
  distance: 'दूरी',
  reported: 'रिपोर्ट किया गया',
  incidentNeedsResponder: 'रिस्पॉन्डर की आवश्यकता',
  incidentResponderOnTheWay: 'रिस्पॉन्डर रास्ते में है',
  incidentProfessionalHandover: 'पेशेवर हस्तांतरण',
  viewDetails: 'विवरण देखें',
  acceptResponse: 'प्रतिक्रिया स्वीकार करें',
  viewResponse: 'प्रतिक्रिया देखें',
  noIncidentsHere: 'यहाँ कोई घटना नहीं है',
  noIncidentsMatchingFilter: 'इस फ़िल्टर से मेल खाने वाली कोई घटना अभी नहीं है।',
  incidentRoadAccidentDescription: 'सड़क दुर्घटना की सूचना मिली है। सामुदायिक सहायता आवश्यक है।',
  incidentTwoWheelerDescription: 'रिस्पॉन्डर वर्तमान में घटना स्थल की ओर जा रहे हैं।',
  incidentPedestrianDescription: 'पेशेवर आपातकालीन रिस्पॉन्डर ने जिम्मेदारी संभाल ली है।',

  // nearbycommunity//

  nearbyCommunityGoldenLinkCommunity: 'GOLDENLINK समुदाय',
  nearbyCommunityTitle: 'आपके पास के समुदाय',
  nearbyCommunityDescription: 'पास के GoldenLink समुदाय खोजें और जरूरत के समय सहायता का समन्वय करने वाले लोगों से जुड़ें।',
  nearbyCommunityMembersNearby: 'पास के सामुदायिक सदस्य',
  nearbyCommunityNetwork: 'आपका पास का सामुदायिक नेटवर्क',
  nearbyCommunityLocationDescription: 'समुदाय आपके चुने गए स्थान के आधार पर दिखाए जाते हैं।',
  nearbyCommunityUseMyLocation: 'मेरी लोकेशन का उपयोग करें',
  nearbyCommunityAll: 'सभी समुदाय',
  nearbyCommunityActiveNowFilter: 'अभी सक्रिय',
  nearbyCommunityQuietFilter: 'शांत',
  nearbyCommunityNearbyCommunities: 'पास के समुदाय',
  nearbyCommunityCommunitiesAvailable: 'समुदाय उपलब्ध हैं',
  nearbyCommunityActive: 'सक्रिय समुदाय',
  nearbyCommunityQuiet: 'वर्तमान में शांत',
  nearbyCommunityKm: 'किमी',
  nearbyCommunityDistance: 'दूरी',
  nearbyCommunityMembers: 'सदस्य',
  nearbyCommunityActiveNow: 'अभी सक्रिय',
  nearbyCommunityViewCommunity: 'समुदाय देखें',
  nearbyCommunityJoin: 'जुड़ें',
  nearbyCommunityNoCommunities: 'कोई समुदाय नहीं मिला',
  nearbyCommunityChangeFilter: 'समुदाय फ़िल्टर बदलकर देखें।',
  nearbyCommunityFrontendDemo: 'यह वर्तमान में frontend demonstration है।',
  nearbyCommunitySafety: 'सामुदायिक सुरक्षा',
  nearbyCommunityEmergencySupport: 'आपातकालीन सहायता',
  nearbyCommunityNeighbourhood: 'पड़ोस',
  nearbyCommunityAnnaDescription: 'स्थानीय स्वयंसेवक सामुदायिक सुरक्षा और सहायता का समन्वय कर रहे हैं।',
  nearbyCommunityTnDescription: 'स्थानीय आपातकालीन प्रतिक्रिया में सहायता करने वाला पड़ोस समूह।',
  nearbyCommunityGuindyDescription: 'स्थानीय जानकारी और सहायता साझा करने वाले सामुदायिक स्वयंसेवक।',
  nearbyCommunityVelacheryDescription: 'निवासियों को सुरक्षित रूप से समन्वय करने में मदद करने वाला सक्रिय सामुदायिक नेटवर्क।',

  //volunteer-search//

  volunteerGoldenLinkCommunity: 'GOLDENLINK समुदाय',
  volunteerSearchTitle: 'पास के स्वयंसेवकों को खोजें',
  volunteerSearchDescription: 'पास में मौजूद और सहायता के लिए उपलब्ध विश्वसनीय सामुदायिक रिस्पॉन्डर्स से जुड़ें।',
  volunteerYourLocation: 'आपकी लोकेशन',
  volunteerChange: 'बदलें',
  volunteerSearchPlaceholder: 'स्वयंसेवक, कौशल या क्षेत्र खोजें...',
  volunteerSearchAriaLabel: 'स्वयंसेवकों को खोजें',
  volunteerSearchButton: 'खोजें',
  volunteerAll: 'सभी',
  volunteerAvailable: 'उपलब्ध',
  volunteerResponding: 'प्रतिक्रिया दे रहे हैं',
  volunteerNearbyResponders: 'पास के रिस्पॉन्डर्स',
  volunteerMembersFound: 'सामुदायिक सदस्य मिले',
  volunteerCommunityVerified: 'समुदाय द्वारा सत्यापित',
  volunteerAvailableNow: 'अभी उपलब्ध',
  volunteerCurrentlyResponding: 'वर्तमान में प्रतिक्रिया दे रहे हैं',
  volunteerCurrentlyOffline: 'वर्तमान में ऑफलाइन',
  volunteerUnknown: 'अज्ञात',
  volunteerDistance: 'दूरी',
  volunteerResponse: 'प्रतिक्रिया',
  volunteerRating: 'रेटिंग',
  volunteerResponses: 'प्रतिक्रियाएँ',
  volunteerView: 'देखें',
  volunteerRequestHelp: 'मदद का अनुरोध करें',
  volunteerNoVolunteers: 'कोई स्वयंसेवक नहीं मिला',
  volunteerTryAnotherFilter: 'दूसरा फ़िल्टर या क्षेत्र आज़माएँ।',
  volunteerHelpRequest: 'मदद का अनुरोध',
  volunteerIncidentsSupported: 'समर्थित घटनाएँ',
  volunteerFrontendDemo: 'यह वर्तमान में frontend demonstration है।',

  //nearby-responders//

  nearbyFindingResponders: 'पास के रिस्पॉन्डर्स खोजे जा रहे हैं...',
  nearbyResponderAssignedSuccessfully: 'रिस्पॉन्डर सफलतापूर्वक नियुक्त किया गया!',
  nearbyAcceptedIncidentPreparing: 'ने घटना स्वीकार कर ली है और प्रतिक्रिया देने की तैयारी कर रहे हैं।',
  nearbyEta: 'अनुमानित समय',
  nearbyOpeningDashboard: 'रिस्पॉन्डर डैशबोर्ड खोला जा रहा है...',
  nearbyNoActiveIncident: 'कोई सक्रिय GoldenLink घटना नहीं मिली।',
  nearbyUnknown: 'अज्ञात',
  nearbySerious: 'गंभीर',
  nearbyLocationUnavailable: 'स्थान उपलब्ध नहीं है',
  nearbyFirstAidTrained: 'प्राथमिक उपचार प्रशिक्षित',
  nearbyCommunityVolunteer: 'सामुदायिक स्वयंसेवक',
  nearbyFirstResponseVolunteer: 'प्रथम प्रतिक्रिया स्वयंसेवक',
  nearbyFirstAid: 'प्राथमिक उपचार',
  nearbyTrafficSupport: 'यातायात सहायता',
  nearbyCommunitySupport: 'सामुदायिक सहायता',
  nearbyLocationGuidance: 'स्थान मार्गदर्शन',
  nearbyEmergencyCommunication: 'आपातकालीन संचार',
  nearbyCommunication: 'संचार',
  nearbyCommunityResponse: 'सामुदायिक सहायता',
  nearbyRespondersTitle: 'पास के रिस्पॉन्डर्स',
  nearbyRespondersDescription: 'पास में सहायता के लिए उपलब्ध सत्यापित सामुदायिक रिस्पॉन्डर्स खोजें।',
  nearbyActiveIncident: 'सक्रिय GoldenLink घटना',
  nearbyIncidentId: 'घटना आईडी',
  nearbyPeopleAffected: 'प्रभावित लोग',
  nearbySearchingLocation: 'आपकी लोकेशन के पास खोजा जा रहा है',
  nearbyCurrentAccidentArea: 'वर्तमान दुर्घटना क्षेत्र',
  nearbyRadius: 'दायरा',
  nearbyAvailableNow: 'अभी उपलब्ध',
  nearbyLiveAvailability: 'लाइव उपलब्धता',
  nearbyVerifiedRespondersArea: 'आपके चुने हुए क्षेत्र में सत्यापित रिस्पॉन्डर्स।',
  nearbyPeopleNearby: 'पास के लोग',
  nearbyChooseResponder: 'सहायता के लिए उपयुक्त रिस्पॉन्डर चुनें।',
  nearbyFound: 'मिले',
  nearbyVerified: 'सत्यापित',
  nearbyDistance: 'दूरी',
  nearbyEstimatedArrival: 'अनुमानित आगमन',
  nearbyCommunityRating: 'सामुदायिक रेटिंग',
  nearbyAcceptingIncident: 'घटना स्वीकार की जा रही है...',
  nearbyIncidentAccepted: 'घटना स्वीकार की गई',
  nearbyAcceptIncident: 'घटना स्वीकार करें',
  nearbyCurrentlyUnavailable: 'वर्तमान में उपलब्ध नहीं',
  nearbySafetyPrinciple: 'GoldenLink सुरक्षा सिद्धांत',
  nearbySafetyDescription: 'GoldenLink आपको पंजीकृत सामुदायिक रिस्पॉन्डर्स से जोड़ता है। गंभीर घटनाओं के लिए पेशेवर आपातकालीन सेवाएँ प्राथमिक प्रतिक्रिया बनी रहती हैं।',

  // ================================
// REPORT ACCIDENT - HINDI
// ================================


reportAccidentDescription:
  'दुर्घटना की रिपोर्ट करें और तेज़ सामुदायिक सहायता में मदद करें।',
backToHome: 'होम पर वापस जाएँ',

step: 'चरण',
of: 'में से',


gpsLocationDescription:
  'रिस्पॉन्डर्स को घटनास्थल खोजने में मदद करने के लिए अपने वर्तमान GPS स्थान का उपयोग करें।',

detectingYourLocation: 'आपका स्थान पता लगाया जा रहा है',
locationDetectedSuccessfully: 'स्थान सफलतापूर्वक पता चला',
locationDetectionFailed: 'स्थान पता नहीं चल सका',

detectingLocationButton: 'स्थान पता लगाया जा रहा है...',

gpsCoordinatesCaptured: 'GPS निर्देशांक प्राप्त किए गए',


tryAgain: 'फिर कोशिश करें',

locationHelpBefore: 'आपका',
locationHelpAfter:
  'GPS स्थान GoldenLink को सही रिस्पॉन्डर्स को घटनास्थल से जोड़ने में मदद करता है।',


accidentTypeDescription:
  'आप किस प्रकार की घटना की रिपोर्ट कर रहे हैं, यह बताएं।',




describeWhatYouCanSee: 'आप जो देख सकते हैं उसका वर्णन करें...',

howManyPeopleAffected: 'कितने लोग प्रभावित हुए हैं?',
peopleAffectedDescription:
  'शामिल लोगों की अनुमानित संख्या चुनें।',

unconscious: 'बेहोश',
bleeding: 'रक्तस्राव',
breathingDifficulty: 'सांस लेने में कठिनाई',
trapped: 'फँसे हुए',


urgencyDescription:
  'आप जो देख सकते हैं उसके आधार पर आपातकालीन स्तर चुनें।',

severityNormal: 'सामान्य',
severityModerate: 'मध्यम',
severityCritical: 'गंभीर',

severityNormalDescription:
  'कोई तत्काल खतरा दिखाई नहीं दे रहा है।',
severityModerateDescription:
  'चिकित्सा या सामुदायिक सहायता की आवश्यकता हो सकती है।',
severityCriticalDescription:
  'तत्काल आपातकालीन सहायता आवश्यक है।',

incident: 'घटना',
notSelected: 'चयनित नहीं',
gpsLocation: 'GPS स्थान',
captured: 'प्राप्त हुआ',

selectedUrgency: 'चयनित आपातकालीन स्तर',
selectEmergencyLevel: 'आपातकालीन स्तर चुनें',

activationNote:
  'आपके द्वारा दी गई घटना की जानकारी और स्थान के आधार पर GoldenLink आसपास के रिस्पॉन्डर्स का समन्वय करेगा।',



communityResponseActivatedSuccessfully:
  'सामुदायिक सहायता सफलतापूर्वक सक्रिय की गई!',

helpCoordinatedForIncident:
  'इस घटना के लिए सहायता का समन्वय किया जा रहा है।',

locationRequired:
  'जारी रखने से पहले स्थान आवश्यक है।',

geolocationNotSupported:
  'यह ब्राउज़र जियोलोकेशन का समर्थन नहीं करता।',



locationUnavailableDevice:
  'आपका स्थान निर्धारित नहीं किया जा सका।',

locationDetectionTimeout:
  'स्थान पता करने का समय समाप्त हो गया। फिर कोशिश करें।',

  // ============================================================
// COMMUNITY - HINDI
// ============================================================

communityGoldenLinkNetwork: 'GoldenLink नेटवर्क',
communityOurCommunity: 'हमारा समुदाय',
communityHeaderDescription:
  'मिलकर, सामान्य लोग एक मजबूत प्रथम-प्रतिक्रिया नेटवर्क बना सकते हैं।',

communityPoweredResponse:
  'समुदाय आधारित प्रतिक्रिया',
communityDontJustReport:
  'सिर्फ दुर्घटना की रिपोर्ट न करें।',
communityActivateTheCommunity:
  'समुदाय को सक्रिय करें।',
communityHeroDescription:
  'GoldenLink आपको अपने आसपास होने वाली घटनाओं में मदद करने के लिए तैयार लोगों से जोड़ता है।',


communityTotalResponders:
  'कुल उत्तरदाता',
communityAvailableNow:
  'अभी उपलब्ध',
communityActiveIncidents:
  'सक्रिय घटनाएँ',
communityAverageCoverage:
  'औसत कवरेज',

communityNetworkCoverage:
  'नेटवर्क कवरेज',
communityResponseAreas:
  'सामुदायिक प्रतिक्रिया क्षेत्र',
communityAreasDescription:
  'देखें कि GoldenLink उत्तरदाता अलग-अलग क्षेत्रों में कैसे वितरित हैं।',

communityGoldenLinkCommunity:
  'GoldenLink समुदाय',
communityResponders:
  'उत्तरदाता',
communityAvailable:
  'उपलब्ध',
communityIncidents:
  'घटनाएँ',
communityCoverage:
  'कवरेज',
communityViewCommunity:
  'समुदाय देखें',
communityWord:
  'समुदाय',

communityHowItWorks:
  'यह कैसे काम करता है',
communityOneCommunityFasterHelp:
  'एक समुदाय। तेज़ मदद।',
communityHowItWorksDescription:
  'जब हर सेकंड महत्वपूर्ण होता है, GoldenLink आसपास के लोगों को एक साथ लाता है।',

communityJoin:
  'जुड़ें',
communityJoinDescription:
  'अपनी मूल जानकारी और सत्यापन प्रमाणपत्र के साथ पंजीकरण करें।',

communityStayConnected:
  'जुड़े रहें',
communityStayConnectedDescription:
  'आपातकाल की सूचना मिलने पर GoldenLink पास के सामुदायिक उत्तरदाताओं की पहचान कर सकता है।',

communityRespond:
  'प्रतिक्रिया दें',
communityRespondDescription:
  'पास के स्वयंसेवक अनुरोध स्वीकार करके तत्काल सहायता प्रदान कर सकते हैं।',

communitySaveLives:
  'जीवन बचाएँ',
communitySaveLivesDescription:
  'तेज़ सामुदायिक प्रतिक्रिया पेशेवर आपातकालीन सेवाओं के आने से पहले महत्वपूर्ण अंतर को कम करने में मदद करती है।',

communityBePartOfNetwork:
  'GoldenLink नेटवर्क का हिस्सा बनें',
communityNetworkNote:
  'आपकी छोटी सी कार्रवाई आपातकाल के दौरान बड़ा बदलाव ला सकती है। मिलकर हम एक तेज़ और सुरक्षित सामुदायिक प्रतिक्रिया प्रणाली बना सकते हैं।',

communityRegistrationDescription:
  'सामुदायिक उत्तरदाता के रूप में पंजीकरण करें और आपातकाल के दौरान अपने आसपास के लोगों की मदद करें।',

communityApplicationReceived:
  'आवेदन प्राप्त हुआ',
communityApplicationSubmitted:
  'आवेदन सफलतापूर्वक जमा किया गया!',
communityThankYou:
  'धन्यवाद,',
communityRegistrationSubmitted:
  'आपका पंजीकरण, फोटो और स्वयंसेवी प्रमाणपत्र सफलतापूर्वक जमा किया गया है।',

communityMobileVerified:
  'मोबाइल सत्यापित',
communityCertificatePending:
  'प्रमाणपत्र सत्यापन लंबित',
communityCertificatePendingDescription:
  'आपकी सामुदायिक सदस्यता सक्रिय करने से पहले आपके प्रमाणपत्र की समीक्षा की जाएगी।',
communityDone:
  'हो गया',

communityVolunteerVerificationRequired:
  'स्वयंसेवक सत्यापन आवश्यक',
communityVerificationDescription:
  'कृपया अपना फोटो और वैध स्वयंसेवी सत्यापन प्रमाणपत्र प्रदान करें। सामुदायिक पहुंच सक्रिय करने से पहले आपके विवरण की समीक्षा की जाएगी।',

communityFullName:
  'पूरा नाम',
communityFullNamePlaceholder:
  'अपना पूरा नाम दर्ज करें',

communityGender:
  'लिंग',
communitySelectGender:
  'लिंग चुनें',
communityMale:
  'पुरुष',
communityFemale:
  'महिला',
communityOther:
  'अन्य',
communityPreferNotToSay:
  'कहना पसंद नहीं',

communityPlace:
  'स्थान',
communityPlacePlaceholder:
  'शहर / कस्बा / क्षेत्र',


communityMobilePlaceholder:
  '10 अंकों का मोबाइल नंबर',
communityOtpWillBeSent:
  'इस मोबाइल नंबर पर OTP भेजा जाएगा।',

communityGmailAddress:
  'Gmail पता',
communityGmailPlaceholder:
  'example@gmail.com',
communityOnlyGmail:
  'केवल Gmail पते स्वीकार किए जाते हैं।',

communityDesignation:
  'पद',
communityDesignationPlaceholder:
  'छात्र / इंजीनियर / ड्राइवर...',

communityVehicleType:
  'वाहन का प्रकार',
communitySelectVehicle:
  'वाहन चुनें',
communityNoVehicle:
  'कोई वाहन नहीं',
communityTwoWheeler:
  'दोपहिया वाहन',
communityCar:
  'कार',
communityAutoTaxi:
  'ऑटो / टैक्सी',
communityVan:
  'वैन',
communityTruck:
  'ट्रक',

communityMaritalStatus:
  'वैवाहिक स्थिति',
communitySelectStatus:
  'स्थिति चुनें',
communityMarried:
  'विवाहित',
communityUnmarried:
  'अविवाहित',

communityPersonPhoto:
  'व्यक्ति का फोटो',
communityPhotoSelected:
  'फोटो सफलतापूर्वक चुना गया',
communityUploadPhoto:
  'अपना फोटो अपलोड करें',
communityPhotoFormats:
  'JPG, JPEG या PNG',

communityVerifiedVolunteerCertificate:
  'सत्यापित स्वयंसेवी प्रमाणपत्र',
communityCertificateSelected:
  'प्रमाणपत्र सफलतापूर्वक चुना गया',
communityUploadCertificate:
  'सत्यापित स्वयंसेवी प्रमाणपत्र अपलोड करें',
communityCertificateFormats:
  'PDF, JPG, JPEG या PNG',

communitySecurityVerification:
  'सुरक्षा सत्यापन',
communityCaptchaAnswer:
  'उत्तर',
communityRefreshCaptcha:
  'CAPTCHA रीफ्रेश करें',

communityVerifyAndSendOtp:
  'सत्यापित करें और OTP भेजें',

communityMobileVerification:
  'मोबाइल सत्यापन',
communityVerifyMobileNumber:
  'अपना मोबाइल नंबर सत्यापित करें',
communityEnterOtpSent:
  'भेजा गया 6 अंकों का OTP दर्ज करें',

communityFrontendDemoMode:
  'Frontend demo mode:',
communityDemoOtpSentTo:
  'Demo OTP भेजा गया',
communityDemoOtp:
  'Demo OTP',
communityNewDemoOtpSentTo:
  'नया Demo OTP भेजा गया',


communityOtpExpiresIn:
  'OTP समाप्त होने में',
communityOtpExpired:
  'OTP समाप्त हो गया है।',

communityChangeNumber:
  'नंबर बदलें',
communityCompleteRegistration:
  'पंजीकरण पूरा करें',

communityDidntReceiveOtp:
  'OTP प्राप्त नहीं हुआ?',
communityResendOtp:
  'OTP दोबारा भेजें',

communityPhotoFormatError:
  'JPG, JPEG या PNG फोटो अपलोड करें।',
communityCertificateFormatError:
  'PDF, JPG, JPEG या PNG प्रमाणपत्र अपलोड करें।',

communityIncorrectCaptcha:
  'गलत CAPTCHA। कृपया पुनः प्रयास करें।',

communityOtpExpiredRequest:
  'OTP समाप्त हो गया है। नया OTP अनुरोध करें।',

communityEnterSixDigitOtp:
  '6 अंकों का OTP दर्ज करें।',

communityIncorrectOtp:
  'गलत OTP। OTP जांचकर फिर से प्रयास करें।',

communityEnterName:
  'अपना नाम दर्ज करें।',
communitySelectDob:
  'अपनी जन्म तिथि चुनें।',
communityEnterPlace:
  'अपना स्थान दर्ज करें।',
communityEnterMobile:
  'अपना मोबाइल नंबर दर्ज करें।',
communityMobileTenDigits:
  'मोबाइल नंबर में ठीक 10 अंक होने चाहिए।',
communityEnterGmail:
  'अपना Gmail पता दर्ज करें।',
communityValidGmail:
  '@gmail.com पर समाप्त होने वाला सही Gmail पता दर्ज करें।',
communitySelectMaritalStatus:
  'अपनी वैवाहिक स्थिति चुनें।',
communityEnterDesignation:
  'अपना पद दर्ज करें।',

communityVerifyMobileBeforeSubmit:
  'सबमिट करने से पहले अपना मोबाइल नंबर सत्यापित करें।',

  // ACCIDENT RECORDS
accidentRecordsGoldenLinkHistory: 'GoldenLink इतिहास',
accidentRecordsTitle: 'दुर्घटना रिकॉर्ड',
accidentRecordsDescription: 'आपके द्वारा रिपोर्ट की गई घटनाओं और उनकी प्रतिक्रिया स्थिति को ट्रैक करें।',

accidentRecordsTotalReports: 'कुल रिपोर्ट',
accidentRecordsActive: 'सक्रिय',
accidentRecordsResponding: 'प्रतिक्रिया जारी',
accidentRecordsHandedOver: 'हस्तांतरित',
accidentRecordsCompleted: 'पूरा हुआ',

accidentRecordsFilterIncidents: 'घटनाओं को फ़िल्टर करें',

accidentRecordsCommunityResponseActive: 'सामुदायिक प्रतिक्रिया सक्रिय है',
accidentRecordsRespondersOnTheWay: 'प्रतिक्रिया देने वाले रास्ते में हैं',
accidentRecordsProfessionalHandoverCompleted: 'पेशेवर हस्तांतरण पूरा हुआ',
accidentRecordsResponseCompleted: 'प्रतिक्रिया पूरी हुई',
accidentRecordsUnknownStatus: 'स्थिति अज्ञात',

accidentRecordsViewIncident: 'घटना देखें',

accidentRecordsNoIncidentsFound: 'कोई घटना नहीं मिली',
accidentRecordsNoRecordsCategory: 'इस श्रेणी में कोई दुर्घटना रिकॉर्ड नहीं है।',

accidentRecordsGoldenLinkIncident: 'GoldenLink घटना',
accidentRecordsIncidentDetails: 'घटना का विवरण',
accidentRecordsCloseIncidentDetails: 'घटना का विवरण बंद करें',

accidentRecordsIncidentId: 'घटना ID',
accidentRecordsAccidentType: 'दुर्घटना का प्रकार',
accidentRecordsSeverity: 'गंभीरता',
accidentRecordsVictims: 'प्रभावित लोग',

accidentRecordsVictimInformation: 'प्रभावित व्यक्ति की जानकारी',
accidentRecordsSomeoneUnconscious: 'कोई व्यक्ति बेहोश है',
accidentRecordsHeavyBleeding: 'भारी रक्तस्राव की सूचना मिली',
accidentRecordsPersonTrapped: 'व्यक्ति फंसा हुआ है या हिल नहीं सकता',

accidentRecordsIncidentLocation: 'घटना का स्थान',
accidentRecordsOpenInMaps: 'मैप में खोलें',

accidentRecordsReportDescription: 'रिपोर्ट विवरण',

accidentRecordsAiAssessment: 'AI मूल्यांकन',
accidentRecordsGoldenLinkAiAnalysis: 'GoldenLink AI विश्लेषण',
accidentRecordsConfidence: 'विश्वास स्तर',
accidentRecordsCloseDetails: 'विवरण बंद करें',

accidentRecordsDefaultDescription: 'GoldenLink के माध्यम से दुर्घटना की रिपोर्ट की गई।',

accidentRecordsUnknown: 'अज्ञात',
accidentRecordsUnknownTime: 'समय अज्ञात',
accidentRecordsJustNow: 'अभी-अभी',
accidentRecordsMinutesAgo: '{count} मिनट पहले',
accidentRecordsHoursAgo: '{count} घंटे पहले',
accidentRecordsYesterday: 'कल',
accidentRecordsDaysAgo: '{count} दिन पहले',

accidentRecordsNoResponderAssigned: 'कोई प्रतिक्रिया देने वाला नियुक्त नहीं है',

// AI ASSISTANT
aiGoldenLinkAi: 'GOLDENLINK AI',
aiEmergencyAssistant: 'आपातकालीन सहायक',
aiAssistantDescription: 'AI-सहायित घटना मूल्यांकन और प्रतिक्रिया समन्वय',
aiEmergencyResponseAssistant: 'आपातकालीन प्रतिक्रिया सहायक',

aiWelcome: 'नमस्ते। मैं GoldenLink AI हूँ, आपका आपातकालीन प्रतिक्रिया सहायक।',
aiNoActiveIncident: 'अभी कोई सक्रिय घटना नहीं है। आप पहले दुर्घटना की रिपोर्ट कर सकते हैं या सामान्य आपातकालीन प्रतिक्रिया मार्गदर्शन पूछ सकते हैं।',

aiConnectedToIncident: 'मैं घटना #{incidentId} से जुड़ा हूँ। मैं वर्तमान आपात स्थिति को समझने और प्रतिक्रिया समन्वय में मार्गदर्शन देने में मदद कर सकता हूँ।',
aiExistingAssessment: 'वर्तमान घटना को {severity} के रूप में आंका गया है। मूल्यांकन का विश्वास स्तर {confidence}% है।',
aiQuickAssessmentIntro: 'घटना का आकलन करने में मदद के लिए मैं कुछ छोटे प्रश्न पूछूँगा।',

aiQuestionAtLocation: 'क्या आप अभी दुर्घटना स्थल पर हैं?',
aiQuestionInjuredPeople: 'कितने लोग घायल हुए हैं?',
aiQuestionUnconscious: 'क्या कोई बेहोश है?',
aiQuestionHeavyBleeding: 'क्या किसी को बहुत अधिक रक्तस्राव हो रहा है?',
aiQuestionBreathingDifficulty: 'क्या किसी को सांस लेने में कठिनाई हो रही है?',
aiQuestionTrapped: 'क्या कोई वाहन के अंदर फंसा है या हिल नहीं पा रहा है?',

aiGeneralResponse: 'मैं आपातकालीन प्रतिक्रिया समन्वय में मदद कर सकता हूँ। सुरक्षित स्थान पर रहें, घायल लोगों को अनावश्यक रूप से न हिलाएँ और आपातकालीन सेवाओं के निर्देशों का पालन करें।',

aiBleedingResponse: 'यदि किसी को बहुत अधिक रक्तस्राव हो रहा है, तो तुरंत आपातकालीन चिकित्सा सहायता लें। यदि सुरक्षित हो, तो साफ कपड़े या गॉज से घाव पर दबाव डालें।',

aiUnconsciousResponse: 'यदि कोई बेहोश है या प्रतिक्रिया नहीं दे रहा है, तो तुरंत आपातकालीन सेवाओं से संपर्क करें। जाँच करें कि वह सांस ले रहा है या नहीं और आपातकालीन डिस्पैचर के निर्देशों का पालन करें।',

aiBreathingResponse: 'सांस लेने में कठिनाई एक आपातकालीन चेतावनी संकेत है। तुरंत आपातकालीन सेवाओं से संपर्क करें और पेशेवर सहायता आने तक व्यक्ति को सुरक्षित स्थिति में रखें।',

aiTrappedResponse: 'यदि आग जैसी तत्काल खतरा नहीं है, तो फंसे हुए व्यक्ति को जबरदस्ती बाहर निकालने का प्रयास न करें। आपातकालीन सेवाओं से संपर्क करें और प्रशिक्षित प्रतिक्रिया कर्मियों की प्रतीक्षा करें।',

aiResponderResponse: 'इस घटना के लिए नियुक्त प्रतिक्रिया कर्मी को Responder Dashboard में देखा जा सकता है। दुर्घटना स्थल को सुलभ रखें और प्रतिक्रिया कर्मियों के आने पर उनके निर्देशों का पालन करें।',

aiCriticalAssessment: 'रिपोर्ट की गई स्थितियाँ एक गंभीर आपात स्थिति का संकेत देती हैं जिसके लिए तत्काल प्रतिक्रिया समन्वय आवश्यक है।',
aiSeriousAssessment: 'कई लोगों के प्रभावित होने की सूचना मिली है। शीघ्र सामुदायिक और आपातकालीन सहायता की सिफारिश की जाती है।',
aiModerateAssessment: 'रिपोर्ट की गई घटना में सहायता और निगरानी की आवश्यकता है। सामुदायिक प्रतिक्रिया का समन्वय किया जा सकता है।',

aiAssessmentCompleted: 'धन्यवाद। मैंने प्रारंभिक घटना मूल्यांकन पूरा कर लिया है।',
aiAssessmentResult: 'घटना को {severity} के रूप में आंका गया है। वर्तमान प्रतिक्रिया स्थिति के आधार पर सहायता समन्वय जारी रह सकता है।',

aiAskAnythingPlaceholder: 'GoldenLink AI से कुछ भी पूछें...',
aiSendMessage: 'संदेश भेजें',
aiInputHelp: 'इस घटना, आपातकालीन प्रतिक्रिया, रक्तस्राव, सांस लेने में कठिनाई, प्रतिक्रिया कर्मियों या सहायता आने तक क्या करना है, इसके बारे में पूछें।',
aiDisclaimer: 'GoldenLink AI प्रतिक्रिया समन्वय सहायता प्रदान करता है, चिकित्सा निदान नहीं।',

aiAssessment: 'AI मूल्यांकन',
aiAssessmentInProgress: 'मूल्यांकन जारी है',
aiAssessmentWaitingDescription: 'GoldenLink को आपात स्थिति समझने में मदद करने के लिए प्रश्नों का उत्तर दें।',
aiIncidentAssessment: 'AI घटना मूल्यांकन',
aiReportedConditions: 'रिपोर्ट की गई स्थितियाँ',
aiActivateCommunityResponse: 'सामुदायिक प्रतिक्रिया सक्रिय करें',
aiSafetyNote: 'सुरक्षित स्थान पर रहें और आपातकालीन सेवाओं के निर्देशों का पालन करें।',

aiNotRequested: 'अनुरोध नहीं किया गया',
confidence: 'विश्वास स्तर',

      },


      // ============================================================
      // TELUGU
      // ============================================================
      te: {

        // Navigation
        home: 'హోమ్',
        reportAccident: 'ప్రమాదాన్ని నివేదించండి',
        community: 'కమ్యూనిటీ',
        nearbyResponders: 'సమీపంలోని సహాయకులు',
        volunteers: 'వాలంటీర్లు',
        aiAssistant: 'GoldenLink AI',
        profile: 'ప్రొఫైల్',
        selectLanguage: 'భాషను ఎంచుకోండి',

        // Home
        activateCommunity: 'కమ్యూనిటీ సహాయాన్ని ప్రారంభించండి',
        CommunityResponse: 'కమ్యూనిటీ స్పందన',
        duringGoldenHour: 'గోల్డెన్ అవర్ సమయంలో',
        DontJustReport: 'ప్రమాదాన్ని నివేదించడం మాత్రమే చేయకండి.',
        responderDashboard: 'సహాయకుడి డాష్‌బోర్డ్',
        emergencyResponse: 'అత్యవసర స్పందన',
        witnessedAccident: 'మీరు ప్రమాదాన్ని చూశారా?',
        reportIncidentQuickly:
          'ప్రమాదాన్ని త్వరగా నివేదించి, కీలకమైన గోల్డెన్ అవర్ సమయంలో సమీపంలోని కమ్యూనిటీ సహాయకులను ప్రారంభించండి.',
        ActivateCommunity: 'కమ్యూనిటీని ప్రారంభించండి',

        HelpCanStart: 'సహాయం ప్రారంభమవుతుంది',
        WithPeopleNearby: 'సమీపంలోని వ్యక్తులతో',
        GoldenlinkConnects:
          'GoldenLink సహాయం అవసరమైన వ్యక్తులను సమీపంలోని శిక్షణ పొందిన కమ్యూనిటీ సహాయకులతో కలుపుతుంది.',

        NearbyResponders: 'సమీపంలోని సహాయకులు',
        IdentifyResponders:
          'సంఘటనకు సమీపంలో అందుబాటులో ఉన్న శిక్షణ పొందిన సహాయకులను గుర్తించండి.',

        VerifiedSkills: 'ధృవీకరించబడిన నైపుణ్యాలు',
        ResponderProfiles:
          'ధృవీకరించబడిన సహాయకుల ప్రొఫైల్‌లు మరియు వారి అత్యవసర నైపుణ్యాలను చూడండి.',

        RoleBasedSupport: 'పాత్ర ఆధారిత సహాయం',
        DifferentPeople:
          'వేర్వేరు వ్యక్తులు వేర్వేరు రకాల అత్యవసర సహాయం అందించగలరు.',

        localLanguages: 'స్థానిక భాషలు',
        simpleGuidance:
          'పరిచయమైన స్థానిక భాషల్లో సులభమైన అత్యవసర మార్గదర్శకత్వాన్ని పొందండి.',

        // Why GoldenLink
        whyGoldenLink: 'GoldenLink ఎందుకు?',
        dontJustReport: 'ప్రమాదాన్ని నివేదించడం మాత్రమే చేయకండి.',
        coordinate: 'సమన్వయం చేయండి.',
        whyGoldenLinkDescription:
          'ప్రమాదం జరిగిన సమయం మరియు బాధితుడికి సమర్థవంతమైన సహాయం చేరే సమయం మధ్య ఉన్న సమన్వయ లోటును తగ్గించడానికి GoldenLink రూపొందించబడింది.',

        communityCoordination: 'కమ్యూనిటీ సమన్వయం',
        communityCoordinationDescription:
          'అందరూ ఒకే పని చేయడానికి ప్రయత్నించకుండా, సమీపంలోని వ్యక్తులను సులభమైన పాత్రలుగా ఏర్పాటు చేయవచ్చు.',

        locationAwareResponse: 'స్థాన ఆధారిత స్పందన',
        locationAwareResponseDescription:
          'ప్రమాదాన్ని సమీపంలోని సరైన సహాయకులతో కలపడానికి ఈ వ్యవస్థ సంఘటన మరియు సహాయకుల స్థానాన్ని ఉపయోగిస్తుంది.',

        suitableResponders: 'సరైన సహాయకులు',
        suitableRespondersDescription:
          'సహాయకుల ఎంపికలో అందుబాటు, దూరం, నైపుణ్యాలు మరియు నమోదు చేసిన శిక్షణను పరిగణించవచ్చు.',

        multilingualGuidance: 'బహుభాషా మార్గదర్శకత్వం',
        multilingualGuidanceDescription:
          'ఇంటర్‌ఫేస్ ఇంగ్లీష్, తమిళం మరియు అందుబాటులో ఉన్న ప్రాంతీయ భాషల్లో కమ్యూనికేషన్‌కు మద్దతు ఇస్తుంది.',

        simpleRoles: 'సులభమైన పాత్రలు',
        simpleRolesDescription:
          'ప్రతి పాల్గొనేవారికి స్పష్టమైన పని ఇవ్వబడుతుంది, తద్వారా స్పందనను అర్థం చేసుకోవడం మరియు సమన్వయం చేయడం సులభమవుతుంది.',

        professionalHandover: 'వృత్తిపరమైన అప్పగింత',
        professionalHandoverDescription:
          'సరైన వృత్తిపరమైన అత్యవసర సహాయకులు బాధ్యత తీసుకునే వరకు GoldenLink కమ్యూనిటీ స్పందనకు మద్దతు ఇస్తుంది.',

        ourCoreInnovation: 'మా ప్రధాన ఆవిష్కరణ',
        coordinationLayerGoldenHour:
          'గోల్డెన్ అవర్ కోసం ఒక సమన్వయ పొర.',
        existingSystemsCanCall:
          'ఇప్పటికే ఉన్న వ్యవస్థలు కాల్ చేయగలవు, సమాచారం ఇవ్వగలవు లేదా మార్గదర్శనం చేయగలవు. GoldenLink సమీపంలోని వ్యక్తులను నిర్దిష్టమైన మరియు సురక్షితమైన చర్యల్లో సమన్వయం చేయడంపై దృష్టి పెడుతుంది.',

        // Community responder
        communityResponder: 'కమ్యూనిటీ సహాయకుడు',
        readyToHelp: 'గోల్డెన్ అవర్ సమయంలో సహాయం చేయడానికి సిద్ధంగా ఉన్నారా?',
        joinResponderNetwork:
          'GoldenLink సహాయకుల నెట్‌వర్క్‌లో చేరండి. సమీప సంఘటనలను చూడండి, స్పందన అభ్యర్థనలను అంగీకరించండి మరియు కమ్యూనిటీ సహాయాన్ని సమన్వయం చేయండి.',

        // Common buttons
        emergency: 'అత్యవసరం',
        helpNow: 'ఇప్పుడే సహాయం పొందండి',
        back: 'వెనుకకు',
        next: 'తదుపరి',
        previous: 'మునుపటి',
        cancel: 'రద్దు చేయండి',
        submit: 'సమర్పించండి',
        save: 'సేవ్ చేయండి',
        close: 'మూసివేయండి',
        search: 'వెతకండి',
        view: 'చూడండి',
        continue: 'కొనసాగించండి',
        confirm: 'నిర్ధారించండి',
        edit: 'సవరించండి',
        delete: 'తొలగించండి',
        retry: 'మళ్లీ ప్రయత్నించండి',
        refresh: 'రిఫ్రెష్ చేయండి',
        loading: 'లోడ్ అవుతోంది...',
        yes: 'అవును',
        no: 'కాదు',

        // Location
        detectMyLocation: 'నా స్థానాన్ని గుర్తించండి',
        locationCaptured: 'స్థానం పొందబడింది',
        whereAccidentHappened: 'ప్రమాదం ఎక్కడ జరిగింది?',
        detectingLocation: 'మీ స్థానాన్ని గుర్తిస్తోంది...',
        locationDetected: 'స్థానం విజయవంతంగా గుర్తించబడింది.',
        locationNotAvailable: 'స్థానం అందుబాటులో లేదు.',
        locationPermissionDenied:
          'స్థానం అనుమతి నిరాకరించబడింది. దయచేసి మీ బ్రౌజర్‌లో స్థాన అనుమతిని ప్రారంభించండి.',
        locationError:
          'మీ స్థానాన్ని గుర్తించలేకపోయాము. మళ్లీ ప్రయత్నించండి.',
        latitude: 'అక్షాంశం',
        longitude: 'రేఖాంశం',
        currentLocation: 'ప్రస్తుత స్థానం',

        // Accident
        whatHappened: 'ఏం జరిగింది?',
        roadAccident: 'రోడ్డు ప్రమాదం',
        twoWheelerAccident: 'రెండు చక్రాల వాహన ప్రమాదం',
        pedestrianIncident: 'పాదచారి సంఘటన',
        notSure: 'తెలియదు',

        peopleAffected: 'ఎంత మంది ప్రభావితమయ్యారు?',
        onePerson: '1 వ్యక్తి',
        twoPeople: '2 మంది',
        threePeople: '3 మంది',
        fourPeople: '4 మంది',
        fivePeople: '5 మంది',
        fivePlusPeople: '5+ మంది',

        additionalInformation: 'అదనపు సమాచారం',
        describeWhatYouSee: 'మీరు చూస్తున్నదాన్ని వివరించండి...',

        howUrgent: 'పరిస్థితి ఎంత అత్యవసరంగా ఉంది?',
        normal: 'సాధారణం',
        moderate: 'మధ్యస్థం',
        critical: 'తీవ్రమైనది',

        activateGoldenLink: 'GoldenLink ను ప్రారంభించండి',

        // Messages
        success: 'విజయం',
        accidentReportedSuccessfully:
          'ప్రమాదం విజయవంతంగా నివేదించబడింది.',
        nearbyRespondersNotified:
          'సమీపంలోని సహాయకులకు సమాచారం పంపబడింది.',
        somethingWentWrong:
          'ఏదో తప్పు జరిగింది. మళ్లీ ప్రయత్నించండి.',
        requiredField:
          'ఈ ఫీల్డ్ తప్పనిసరి.',
        invalidInput:
          'దయచేసి సరైన విలువను నమోదు చేయండి.',

        // AI Assistant
        askGoldenLinkAI: 'GoldenLink AIని ఏదైనా అడగండి...',
        accidentLocationQuestion:
          'మీరు ప్రస్తుతం ప్రమాదం జరిగిన ప్రదేశంలో ఉన్నారా?',
        injuredPeopleQuestion:
          'ఎంత మంది గాయపడ్డారు?',
        unconsciousQuestion:
          'ఎవరైనా అపస్మారక స్థితిలో ఉన్నారా?',
        heavyBleedingQuestion:
          'ఎవరైనా ఎక్కువగా రక్తస్రావం అవుతోందా?',
        breathingDifficultyQuestion:
          'ఎవరైనా శ్వాస తీసుకోవడంలో ఇబ్బంది పడుతున్నారా?',
        trappedQuestion:
          'ఎవరైనా వాహనం లోపల చిక్కుకుపోయారా లేదా కదలలేకపోతున్నారా?',
        yesAnswer: 'అవును',
        noAnswer: 'కాదు',
        thinking: 'GoldenLink AI ఆలోచిస్తోంది...',
        aiEmergencyGuidance: 'అత్యవసర మార్గదర్శకత్వం',
        aiResponse: 'AI సమాధానం',

        // Status
        active: 'క్రియాశీలం',
        inactive: 'నిష్క్రియం',
        available: 'అందుబాటులో ఉంది',
        unavailable: 'అందుబాటులో లేదు',
        pending: 'పెండింగ్‌లో ఉంది',
        accepted: 'అంగీకరించబడింది',
        rejected: 'తిరస్కరించబడింది',
        completed: 'పూర్తయింది',
        cancelled: 'రద్దు చేయబడింది',
        responding: 'స్పందిస్తోంది',
        resolved: 'పరిష్కరించబడింది',

        // Responder
        incidentResponse: 'సంఘటన స్పందన',
        responderProfile: 'సహాయకుడి ప్రొఫైల్',
        responderStatus: 'సహాయకుడి స్థితి',
        availableResponders: 'అందుబాటులో ఉన్న సహాయకులు',
        acceptRequest: 'అభ్యర్థనను అంగీకరించండి',
        declineRequest: 'అభ్యర్థనను తిరస్కరించండి',
        responseStarted: 'స్పందన ప్రారంభమైంది.',
        responseCompleted: 'స్పందన పూర్తయింది.',

        // Community
        joinCommunity: 'కమ్యూనిటీలో చేరండి',
        volunteerSearch: 'వాలంటీర్ శోధన',
        nearbyCommunity: 'సమీప కమ్యూనిటీ',

        // Registration
        name: 'పేరు',
        dateOfBirth: 'పుట్టిన తేదీ',
        mobileNumber: 'మొబైల్ నంబర్',
        emailAddress: 'ఇమెయిల్ చిరునామా',
        applicantPhoto: 'దరఖాస్తుదారుడి ఫోటో',
        verifiedCertificate: 'ధృవీకరించబడిన సర్టిఫికేట్',
        captcha: 'CAPTCHA',
        otpVerification: 'OTP ధృవీకరణ',
        enterOtp: 'OTP నమోదు చేయండి',
        sendOtp: 'OTP పంపండి',
        verifyOtp: 'OTP ధృవీకరించండి',

        // Records
        accidentRecords: 'ప్రమాద రికార్డులు',
        incidentRecords: 'సంఘటన రికార్డులు',
        noRecordsFound: 'రికార్డులు కనుగొనబడలేదు.',
        incidentDetails: 'సంఘటన వివరాలు',
        reportedAt: 'నివేదించిన సమయం',
        status: 'స్థితి',
        severity: 'తీవ్రత',
        location: 'స్థానం',

        // Footer
        quickLinks: 'త్వరిత లింకులు',
        emergencySupport: 'అత్యవసర సహాయం',
        communitySupport: 'కమ్యూనిటీ సహాయం',
        allRightsReserved: 'అన్ని హక్కులు రిజర్వ్ చేయబడ్డాయి.',

        // Workflow
        goldenLinkResponseNetwork: 'GoldenLink స్పందన నెట్‌వర్క్',
        fromAccident: 'ప్రమాదం నుండి',
        toCoordinatedResponse: 'సమన్వయంతో కూడిన సహాయం వరకు.',
        workflowIntroduction:
          'GoldenLink ప్రమాదం చుట్టూ ఉన్న వ్యక్తులను కలుపుతుంది మరియు గోల్డెన్ అవర్ సమయంలో ప్రతి సహాయకుడికి సరళమైన మరియు ముఖ్యమైన పాత్రను అందిస్తుంది.',

        workflowReport: 'నివేదించండి',
        workflowReportDescription:
          'అవసరమైన స్థానం మరియు పరిస్థితి వివరాలతో ప్రమాదం నివేదించబడుతుంది.',

        workflowTriage: 'ప్రాథమిక అంచనా',
        workflowTriageDescription:
          'సరళమైన ప్రశ్నలు సరైన సహాయ మార్గాన్ని గుర్తించడంలో సహాయపడతాయి.',

        workflowMatch: 'మ్యాచ్',
        workflowMatchDescription:
          'అందుబాటు మరియు నైపుణ్యాల ఆధారంగా సమీపంలోని సరైన సహాయకులను గుర్తిస్తారు.',

        workflowGuide: 'మార్గదర్శనం',
        workflowGuideDescription:
          'సహాయకులకు సరళమైన మరియు ఆమోదించబడిన దశలవారీ మార్గదర్శకత్వం అందుతుంది.',

        workflowCoordinate: 'సమన్వయం',
        workflowCoordinateDescription:
          'వేర్వేరు సహాయకులకు వేర్వేరు పనులు ఇవ్వబడతాయి, తద్వారా కమ్యూనిటీ కలిసి పనిచేస్తుంది.',

        workflowHandover: 'అప్పగింత',
        workflowHandoverDescription:
          'వృత్తిపరమైన అత్యవసర సహాయకులు వచ్చినప్పుడు వారు సహాయ బాధ్యతను స్వీకరిస్తారు.',

        workflowLearn: 'నేర్చుకోండి',
        workflowLearnDescription:
          'సేకరించిన స్పందన డేటా లోపాలను గుర్తించి భవిష్యత్తు సిద్ధతను మెరుగుపరచడంలో సహాయపడుతుంది.',

          //community-preview//

      communityResponse: 'సమాజ సహాయం',
  rightPeople: 'సరైన వ్యక్తులు',
  canMakeDifference: 'మార్పును తీసుకురాగలరు.',
  communityPreviewDescription:
    'GoldenLink ప్రమాదం జరిగిన ప్రదేశానికి సమీపంలోని వ్యక్తులను Golden Hour సమయంలో ఉపయోగకరమైన సమాజ సహాయంతో అనుసంధానించడంలో సహాయపడుతుంది.',
  exploreCommunity: 'సమాజాన్ని చూడండి',
  becomeResponder: 'రెస్పాండర్‌గా చేరండి',
  nearbyHelp: 'సమీప సహాయం',
  nearbyHelpDescription:
    'ప్రమాదానికి సమీపంలో ఉన్న నమోదిత కమ్యూనిటీ రెస్పాండర్లను కనుగొనండి.',
  trustedResponders: 'నమ్మకమైన రెస్పాండర్లు',
  trustedRespondersDescription:
    'రెస్పాండర్ల ప్రొఫైళ్లలో వారి నైపుణ్యాలు, అందుబాటు మరియు అనుభవం చూపబడవచ్చు.',
  localSupport: 'స్థానిక సహాయం',
  localSupportDescription:
    'స్థానిక భాషలు మరియు స్పష్టమైన సూచనల ద్వారా మార్గదర్శకాన్ని సులభంగా అర్థం చేసుకోవచ్చు.',
  clearRoles: 'స్పష్టమైన పాత్రలు',
  clearRolesDescription:
    'అందరూ ఒకే పని చేయకుండా, ప్రతి రెస్పాండర్‌కు తగిన పనులు ఇవ్వవచ్చు.',

    //emergency-cta//

    goldenHourResponse: 'Golden Hour సహాయం',
  whenEverySecondMatters: 'ప్రతి సెకను ముఖ్యమైనప్పుడు,',
  knowWhatToDo: 'ఏం చేయాలో తెలుసుకోండి.',
  emergencyCtaDescription:
    'ప్రమాదాన్ని నివేదించి, వృత్తిపరమైన అత్యవసర సేవలు బాధ్యత తీసుకునే వరకు ప్రమాదం చుట్టూ ఉన్న తగిన వ్యక్తుల సహాయాన్ని సక్రియం చేయడంలో సహాయపడండి.',
  goldenLinkEmergencyDisclaimer:
    'GoldenLink AI సమాజ సమన్వయానికి సహాయపడుతుంది. ఇది అంబులెన్స్‌లు, వైద్యులు, పోలీసులు లేదా వృత్తిపరమైన అత్యవసర సేవలకు ప్రత్యామ్నాయం కాదు.',


    //footer//

    footerDescription:
    'Golden Hour కోసం AI సహాయంతో పనిచేసే కమ్యూనిటీ స్పందన నెట్‌వర్క్.',
  footerTagline:
    'ప్రమాదాన్ని నివేదించడం మాత్రమే చేయకండి. సమాజాన్ని సక్రియం చేయండి.',
  goldenLink: 'GoldenLink',
  howItWorks: 'ఇది ఎలా పనిచేస్తుంది',
  footercommunity: 'సమాజం',
  responders: 'రెస్పాండర్లు',
  support: 'మద్దతు',
  help: 'సహాయం',
  safety: 'భద్రత',
  privacy: 'గోప్యత',
  copyright: '© 2026 GoldenLink AI',
  builtForYuva: 'YUVA Future 6.0 కోసం రూపొందించబడింది',

  //emergency-button//

  emergencyAssistance: 'అత్యవసర సహాయం',
  emergencyQuestion: 'మీరు ప్రమాదాన్ని చూస్తున్నారా లేదా అత్యవసర పరిస్థితిని ఎదుర్కొంటున్నారా?',
  call112: '112కు కాల్ చేయండి',

  // ============================================================
  // RESPONDER DASHBOARD
  // ============================================================

  responderIncidentInformationUpdated:
    'సంఘటన సమాచారం నవీకరించబడింది.',
  responderNoActiveIncident:
    'క్రియాశీల సంఘటన లేదు',
  responderNoActiveIncidentDescription:
    'ప్రస్తుతం మీకు ఎలాంటి క్రియాశీల సంఘటన కేటాయించబడలేదు.',
  responderViewNearbyResponders:
    'సమీపంలోని సహాయకులను చూడండి',

  responderDashboardTitle:
    'సహాయకుడి డాష్‌బోర్డ్',
  responderEmergencyResponse:
    'అత్యవసర స్పందన',
  responderDashboardDescription:
    'మీకు కేటాయించిన సంఘటనను నిర్వహించి, గోల్డెన్ అవర్ సమయంలో అత్యవసర స్పందనను సమన్వయం చేయండి.',

  responderActiveIncident:
    'క్రియాశీల సంఘటన',
  responderResponseProgress:
    'స్పందన పురోగతి',
  responderLive:
    'లైవ్',
  responderAssigned:
    'కేటాయించబడింది',
  responderOnTheWay:
    'మార్గంలో ఉంది',
  responderOnScene:
    'సంఘటన స్థలంలో',
  responderComplete:
    'పూర్తి',

  responderIncidentInformation:
    'సంఘటన సమాచారం',
  responderAccidentDetails:
    'ప్రమాద వివరాలు',
  responderAccidentType:
    'ప్రమాద రకం',
  responderNotSpecified:
    'పేర్కొనలేదు',
  responderPeopleAffected:
    'ప్రభావిత వ్యక్తులు',
  responderUnconscious:
    'స్పృహలో లేరు',
  responderBleeding:
    'రక్తస్రావం',
  responderBreathingDifficulty:
    'శ్వాస తీసుకోవడంలో ఇబ్బంది',
  responderTrapped:
    'చిక్కుకున్నారు',
  responderReporterDescription:
    'నివేదించిన వ్యక్తి వివరణ',

  responderAccidentLocation:
    'ప్రమాద స్థానం',
  responderRespondHere:
    'ఇక్కడ స్పందించండి',
  responderReportedLocation:
    'నివేదించిన స్థానం',
  responderOpenLocationInMaps:
    'మ్యాప్‌లో స్థానాన్ని తెరవండి',

  responderAssignment:
    'కేటాయింపు',
  responderEta:
    'అంచనా చేరుకునే సమయం',
  responderVerified:
    'ధృవీకరించబడింది',

  responderOptionalAiSupport:
    'ఐచ్ఛిక AI సహాయం',
  responderGoldenLinkAiAssistant:
    'GoldenLink AI సహాయకుడు',
  responderAiSupportDescription:
    'సంఘటనకు స్పందిస్తున్నప్పుడు అదనపు AI మార్గదర్శకత్వాన్ని పొందండి.',
  responderOpenAiAssistant:
    'AI సహాయకుడిని తెరవండి',

  responderResponseControl:
    'స్పందన నియంత్రణ',
  responderUpdateResponse:
    'స్పందనను నవీకరించండి',
  responderUpdateResponseDescription:
    'మీ ప్రస్తుత స్పందన స్థితిని నవీకరించండి.',
  responderImOnTheWay:
    'నేను మార్గంలో ఉన్నాను',
  responderIveArrived:
    'నేను చేరుకున్నాను',
  responderHandOverEmergencyServices:
    'అత్యవసర సేవలకు అప్పగించండి',
  responderCompleteResponse:
    'స్పందనను పూర్తి చేయండి',

  responderResponseCompleted:
    'స్పందన పూర్తయింది',
  responderIncidentSuccessfullyClosed:
    'ఈ సంఘటన విజయవంతంగా ముగించబడింది.',

  responderSafetyPrinciple:
    'GoldenLink సహాయకుడి భద్రతా సూత్రం',
  responderSafetyNote:
    'సురక్షితమైన స్పందన విధానాలను పాటించండి. మిమ్మల్ని లేదా ఇతరులను అనవసరమైన ప్రమాదంలో పెట్టవద్దు.',

  responderAccidentRecords:
    'ప్రమాద రికార్డులు',

  responderAssignedMessage:
    'ఈ సంఘటనకు మీరు కేటాయించబడ్డారు.',
  responderEnRouteMessage:
    'మీరు సంఘటన స్థలానికి మార్గంలో ఉన్నారు.',
  responderOnSceneMessage:
    'మీరు సంఘటన స్థలానికి చేరుకున్నారు.',
  responderHandedOverMessage:
    'సంఘటనను అత్యవసర సేవలకు అప్పగించారు.',
  responderCompletedMessage:
    'స్పందన పూర్తయింది.',
  responderActiveMessage:
    'మీరు ఈ సంఘటనకు చురుకుగా స్పందిస్తున్నారు.',

  responderSeverityCritical:
    'తీవ్రమైనది',
  responderSeveritySerious:
    'గంభీరమైనది',
  responderSeverityModerate:
    'మధ్యస్థం',

  responderMarkedOnTheWay:
    'స్పందన స్థితి "మార్గంలో ఉంది"గా మార్చబడింది.',
  responderArrivalRecorded:
    'మీ రాక నమోదు చేయబడింది.',
  responderIncidentHandedOver:
    'సంఘటన అత్యవసర సేవలకు అప్పగించబడింది.',
  responderResponseCompletedSuccessfully:
    'స్పందన విజయవంతంగా పూర్తయింది.',

  responderCurrentAccidentLocation:
    'ప్రస్తుత ప్రమాద స్థానం',
  responderLocationUnavailable:
    'స్థానం అందుబాటులో లేదు',

  responderAssignedResponder:
    'కేటాయించిన సహాయకుడు',
  responderCommunityResponder:
    'కమ్యూనిటీ సహాయకుడు',
  responderPerson:
    'వ్యక్తి',
  responderPeople:
    'వ్యక్తులు',

    //responder-profile//

    responderAccount: 'రెస్పాండర్ ఖాతా',
  myProfile: 'నా ప్రొఫైల్',
  responderProfileDescription: 'మీ రెస్పాండర్ సమాచారం మరియు అందుబాటు స్థితిని నిర్వహించండి.',
  editProfile: 'ప్రొఫైల్‌ను సవరించండి',
  profileEditingSoon: 'ప్రొఫైల్ సవరణ త్వరలో అందుబాటులో ఉంటుంది.',
  availableToRespond: 'స్పందించడానికి అందుబాటులో ఉన్నారు',
  currentlyUnavailable: 'ప్రస్తుతం అందుబాటులో లేరు',
  responderId: 'రెస్పాండర్ ఐడి',
  responderAvailability: 'రెస్పాండర్ అందుబాటు',
  youAreAvailable: 'మీరు అందుబాటులో ఉన్నారు',
  youAreUnavailable: 'మీరు అందుబాటులో లేరు',
  availableDescription: 'మీకు సమీపంలోని అత్యవసర స్పందన అభ్యర్థనలు అందుతాయి.',
  unavailableDescription: 'మీకు కొత్త స్పందన అభ్యర్థనలు అందవు.',
  responses: 'స్పందనలు',
  successful: 'విజయవంతమైనవి',
  rating: 'రేటింగ్',
  responderInformation: 'రెస్పాండర్ సమాచారం',
  currentArea: 'ప్రస్తుత ప్రాంతం',
  joinedGoldenLink: 'GoldenLink AIలో చేరినది',
  responseRadius: 'స్పందన పరిధి',
  respondSafely: 'సురక్షితంగా స్పందించండి',
  respondSafelyDescription: 'సురక్షితంగా ఉన్నప్పుడు మాత్రమే స్పందించండి. అత్యవసర సూచనలను పాటించండి మరియు మిమ్మల్ని ప్రమాదంలోకి నెట్టుకోకండి.',

  //incident-responce//

  incidentResponderCenter: 'రెస్పాండర్ కేంద్రం',
  incidentResponseDescription: 'సమీపంలోని సంఘటనలను కనుగొని, గోల్డెన్ అవర్ సమయంలో మీ సమాజానికి సహాయం చేయండి.',
  activeIncidents: 'క్రియాశీల సంఘటనలు',
  peopleNeedingHelp: 'సహాయం అవసరమైన వ్యక్తులు',
  nearestIncident: 'సమీప సంఘటన',
  nearbyIncidents: 'సమీపంలోని సంఘటనలు',
  chooseIncidentSafely: 'మీరు సురక్షితంగా స్పందించగల సంఘటనను ఎంచుకోండి.',
  handedOver: 'అప్పగించబడింది',
  all: 'అన్నీ',
  kmAway: 'కిమీ దూరంలో',
  oneMinuteAgo: '1 నిమిషం క్రితం',
  minutesAgo: 'నిమిషాల క్రితం',
  responderNeeded: 'రెస్పాండర్ అవసరం',
  respondersNeeded: 'రెస్పాండర్లు అవసరం',
  incidentAccepted: 'సంఘటన అంగీకరించబడింది',
  distance: 'దూరం',
  reported: 'నివేదించబడింది',
  incidentNeedsResponder: 'రెస్పాండర్ అవసరం',
  incidentResponderOnTheWay: 'రెస్పాండర్ మార్గంలో ఉన్నారు',
  incidentProfessionalHandover: 'వృత్తిపరమైన అప్పగింత',
  viewDetails: 'వివరాలను చూడండి',
  acceptResponse: 'స్పందనను అంగీకరించండి',
  viewResponse: 'స్పందనను చూడండి',
  noIncidentsHere: 'ఇక్కడ సంఘటనలు లేవు',
  noIncidentsMatchingFilter: 'ఈ ఫిల్టర్‌కు సరిపోయే సంఘటనలు ప్రస్తుతం లేవు.',
  incidentRoadAccidentDescription: 'రోడ్డు ప్రమాదం నివేదించబడింది. సమాజ సహాయం అవసరం.',
  incidentTwoWheelerDescription: 'రెస్పాండర్లు ప్రస్తుతం సంఘటన స్థలానికి వెళ్తున్నారు.',
  incidentPedestrianDescription: 'వృత్తిపరమైన అత్యవసర రెస్పాండర్లు బాధ్యత తీసుకున్నారు.',

  //nearbycommunity//

  nearbyCommunityGoldenLinkCommunity: 'GOLDENLINK సమాజం',
  nearbyCommunityTitle: 'మీకు సమీపంలోని సమాజాలు',
  nearbyCommunityDescription: 'సమీపంలోని GoldenLink సమాజాలను కనుగొని, అవసరమైనప్పుడు సహాయాన్ని సమన్వయం చేయగల వ్యక్తులతో కనెక్ట్ అవ్వండి.',
  nearbyCommunityMembersNearby: 'సమీపంలోని సమాజ సభ్యులు',
  nearbyCommunityNetwork: 'మీ సమీప సమాజ నెట్‌వర్క్',
  nearbyCommunityLocationDescription: 'మీరు ఎంచుకున్న ప్రదేశం ఆధారంగా సమాజాలు చూపబడతాయి.',
  nearbyCommunityUseMyLocation: 'నా స్థానాన్ని ఉపయోగించండి',
  nearbyCommunityAll: 'అన్ని సమాజాలు',
  nearbyCommunityActiveNowFilter: 'ఇప్పుడు చురుకుగా',
  nearbyCommunityQuietFilter: 'నిశ్శబ్దం',
  nearbyCommunityNearbyCommunities: 'సమీపంలోని సమాజాలు',
  nearbyCommunityCommunitiesAvailable: 'సమాజాలు అందుబాటులో ఉన్నాయి',
  nearbyCommunityActive: 'చురుకైన సమాజం',
  nearbyCommunityQuiet: 'ప్రస్తుతం నిశ్శబ్దంగా ఉంది',
  nearbyCommunityKm: 'కిమీ',
  nearbyCommunityDistance: 'దూరం',
  nearbyCommunityMembers: 'సభ్యులు',
  nearbyCommunityActiveNow: 'ఇప్పుడు చురుకుగా',
  nearbyCommunityViewCommunity: 'సమాజాన్ని చూడండి',
  nearbyCommunityJoin: 'చేరండి',
  nearbyCommunityNoCommunities: 'సమాజాలు కనుగొనబడలేదు',
  nearbyCommunityChangeFilter: 'సమాజ ఫిల్టర్‌ను మార్చి చూడండి.',
  nearbyCommunityFrontendDemo: 'ఇది ప్రస్తుతం frontend demonstration.',
  nearbyCommunitySafety: 'సమాజ భద్రత',
  nearbyCommunityEmergencySupport: 'అత్యవసర సహాయం',
  nearbyCommunityNeighbourhood: 'పరిసర ప్రాంతం',
  nearbyCommunityAnnaDescription: 'స్థానిక స్వచ్ఛంద సేవకులు సమాజ భద్రత మరియు సహాయాన్ని సమన్వయం చేస్తున్నారు.',
  nearbyCommunityTnDescription: 'స్థానిక అత్యవసర స్పందనకు సహాయపడే పరిసర ప్రాంత సమూహం.',
  nearbyCommunityGuindyDescription: 'స్థానిక సమాచారం మరియు సహాయాన్ని పంచుకునే సమాజ స్వచ్ఛంద సేవకులు.',
  nearbyCommunityVelacheryDescription: 'నివాసితులు సురక్షితంగా సమన్వయం చేసుకోవడానికి సహాయపడే చురుకైన సమాజ నెట్‌వర్క్.',

  //volunteer-search//

  volunteerGoldenLinkCommunity: 'GOLDENLINK సమాజం',
  volunteerSearchTitle: 'సమీపంలోని వాలంటీర్లను కనుగొనండి',
  volunteerSearchDescription: 'సమీపంలో ఉండి సహాయం చేయడానికి అందుబాటులో ఉన్న నమ్మకమైన కమ్యూనిటీ రెస్పాండర్లతో కనెక్ట్ అవ్వండి.',
  volunteerYourLocation: 'మీ స్థానం',
  volunteerChange: 'మార్చండి',
  volunteerSearchPlaceholder: 'వాలంటీర్లు, నైపుణ్యాలు లేదా ప్రాంతాన్ని శోధించండి...',
  volunteerSearchAriaLabel: 'వాలంటీర్లను శోధించండి',
  volunteerSearchButton: 'శోధించండి',
  volunteerAll: 'అన్నీ',
  volunteerAvailable: 'అందుబాటులో',
  volunteerResponding: 'స్పందిస్తున్నారు',
  volunteerNearbyResponders: 'సమీపంలోని రెస్పాండర్లు',
  volunteerMembersFound: 'కమ్యూనిటీ సభ్యులు కనుగొనబడ్డారు',
  volunteerCommunityVerified: 'కమ్యూనిటీ ద్వారా ధృవీకరించబడింది',
  volunteerAvailableNow: 'ఇప్పుడు అందుబాటులో ఉన్నారు',
  volunteerCurrentlyResponding: 'ప్రస్తుతం స్పందిస్తున్నారు',
  volunteerCurrentlyOffline: 'ప్రస్తుతం ఆఫ్‌లైన్‌లో ఉన్నారు',
  volunteerUnknown: 'తెలియదు',
  volunteerDistance: 'దూరం',
  volunteerResponse: 'స్పందన',
  volunteerRating: 'రేటింగ్',
  volunteerResponses: 'స్పందనలు',
  volunteerView: 'చూడండి',
  volunteerRequestHelp: 'సహాయం కోరండి',
  volunteerNoVolunteers: 'వాలంటీర్లు కనుగొనబడలేదు',
  volunteerTryAnotherFilter: 'మరొక ఫిల్టర్ లేదా ప్రాంతాన్ని ప్రయత్నించండి.',
  volunteerHelpRequest: 'సహాయ అభ్యర్థన',
  volunteerIncidentsSupported: 'మద్దతు ఇచ్చిన సంఘటనలు',
  volunteerFrontendDemo: 'ఇది ప్రస్తుతం frontend demonstration.',

  //nearby-responders//

  nearbyFindingResponders: 'సమీపంలోని రెస్పాండర్లను కనుగొంటోంది...',
  nearbyResponderAssignedSuccessfully: 'రెస్పాండర్ విజయవంతంగా నియమించబడ్డారు!',
  nearbyAcceptedIncidentPreparing: 'సంఘటనను అంగీకరించి స్పందించడానికి సిద్ధమవుతున్నారు.',
  nearbyEta: 'అంచనా సమయం',
  nearbyOpeningDashboard: 'రెస్పాండర్ డాష్‌బోర్డ్ తెరవబడుతోంది...',
  nearbyNoActiveIncident: 'క్రియాశీల GoldenLink సంఘటన ఏదీ కనుగొనబడలేదు.',
  nearbyUnknown: 'తెలియదు',
  nearbySerious: 'తీవ్రమైనది',
  nearbyLocationUnavailable: 'స్థానం అందుబాటులో లేదు',
  nearbyFirstAidTrained: 'ప్రథమ చికిత్సలో శిక్షణ పొందినవారు',
  nearbyCommunityVolunteer: 'కమ్యూనిటీ వాలంటీర్',
  nearbyFirstResponseVolunteer: 'మొదటి స్పందన వాలంటీర్',
  nearbyFirstAid: 'ప్రథమ చికిత్స',
  nearbyTrafficSupport: 'ట్రాఫిక్ సహాయం',
  nearbyCommunitySupport: 'కమ్యూనిటీ సహాయం',
  nearbyLocationGuidance: 'స్థాన మార్గదర్శకం',
  nearbyEmergencyCommunication: 'అత్యవసర కమ్యూనికేషన్',
  nearbyCommunication: 'కమ్యూనికేషన్',
  nearbyCommunityResponse: 'కమ్యూనిటీ స్పందన',
  nearbyRespondersTitle: 'సమీపంలోని రెస్పాండర్లు',
  nearbyRespondersDescription: 'సమీపంలో సహాయం చేయడానికి అందుబాటులో ఉన్న ధృవీకరించబడిన కమ్యూనిటీ రెస్పాండర్లను కనుగొనండి.',
  nearbyActiveIncident: 'క్రియాశీల GoldenLink సంఘటన',
  nearbyIncidentId: 'సంఘటన ID',
  nearbyPeopleAffected: 'ప్రభావిత వ్యక్తులు',
  nearbySearchingLocation: 'మీ స్థానానికి సమీపంలో శోధిస్తోంది',
  nearbyCurrentAccidentArea: 'ప్రస్తుత ప్రమాద ప్రాంతం',
  nearbyRadius: 'పరిధి',
  nearbyAvailableNow: 'ఇప్పుడు అందుబాటులో ఉన్నారు',
  nearbyLiveAvailability: 'లైవ్ అందుబాటు',
  nearbyVerifiedRespondersArea: 'మీరు ఎంచుకున్న ప్రాంతంలోని ధృవీకరించబడిన రెస్పాండర్లు.',
  nearbyPeopleNearby: 'సమీపంలోని వ్యక్తులు',
  nearbyChooseResponder: 'సహాయం కోసం సరైన రెస్పాండర్‌ను ఎంచుకోండి.',
  nearbyFound: 'కనుగొనబడ్డారు',
  nearbyVerified: 'ధృవీకరించబడింది',
  nearbyDistance: 'దూరం',
  nearbyEstimatedArrival: 'అంచనా రాక సమయం',
  nearbyCommunityRating: 'కమ్యూనిటీ రేటింగ్',
  nearbyAcceptingIncident: 'సంఘటనను అంగీకరిస్తోంది...',
  nearbyIncidentAccepted: 'సంఘటన అంగీకరించబడింది',
  nearbyAcceptIncident: 'సంఘటనను అంగీకరించండి',
  nearbyCurrentlyUnavailable: 'ప్రస్తుతం అందుబాటులో లేదు',
  nearbySafetyPrinciple: 'GoldenLink భద్రతా సూత్రం',
  nearbySafetyDescription: 'GoldenLink మిమ్మల్ని నమోదు చేయబడిన కమ్యూనిటీ రెస్పాండర్లతో కలుపుతుంది. తీవ్రమైన సంఘటనలకు ప్రొఫెషనల్ అత్యవసర సేవలే ప్రధాన స్పందనగా ఉంటాయి.',

// ================================
// REPORT ACCIDENT - TELUGU
// ================================


reportAccidentDescription:
  'ప్రమాదాన్ని నివేదించి వేగవంతమైన కమ్యూనిటీ సహాయాన్ని సమన్వయం చేయడంలో సహాయపడండి.',
backToHome: 'హోమ్‌కు తిరిగి వెళ్లండి',

step: 'దశ',
of: 'లో',


gpsLocationDescription:
  'రెస్పాండర్లు సంఘటన స్థలాన్ని కనుగొనడంలో సహాయపడటానికి మీ ప్రస్తుత GPS స్థానాన్ని ఉపయోగించండి.',

detectingYourLocation: 'మీ స్థానాన్ని గుర్తిస్తోంది',
locationDetectedSuccessfully: 'స్థానం విజయవంతంగా గుర్తించబడింది',
locationDetectionFailed: 'స్థానాన్ని గుర్తించడం విఫలమైంది',

detectingLocationButton: 'స్థానాన్ని గుర్తిస్తోంది...',

gpsCoordinatesCaptured: 'GPS కోఆర్డినేట్లు నమోదు చేయబడ్డాయి',


tryAgain: 'మళ్లీ ప్రయత్నించండి',

locationHelpBefore: 'మీ',
locationHelpAfter:
  'GPS స్థానం సరైన రెస్పాండర్లను సంఘటనతో అనుసంధానించడానికి GoldenLinkకి సహాయపడుతుంది.',


accidentTypeDescription:
  'మీరు నివేదిస్తున్న సంఘటన రకాన్ని తెలియజేయండి.',


describeWhatYouCanSee: 'మీరు చూడగలిగినదాన్ని వివరించండి...',

howManyPeopleAffected: 'ఎంత మంది ప్రభావితమయ్యారు?',
peopleAffectedDescription:
  'సంఘటనలో పాల్గొన్న వ్యక్తుల సుమారు సంఖ్యను ఎంచుకోండి.',

unconscious: 'అపస్మారక స్థితిలో',
bleeding: 'రక్తస్రావం',
breathingDifficulty: 'శ్వాస తీసుకోవడంలో ఇబ్బంది',
trapped: 'చిక్కుకున్నారు',


urgencyDescription:
  'మీరు గమనించిన పరిస్థితి ఆధారంగా అత్యవసర స్థాయిని ఎంచుకోండి.',

severityNormal: 'సాధారణం',
severityModerate: 'మధ్యస్థం',
severityCritical: 'క్లిష్టమైనది',

severityNormalDescription:
  'తక్షణ ప్రమాదం కనిపించడం లేదు.',
severityModerateDescription:
  'వైద్య లేదా కమ్యూనిటీ సహాయం అవసరం కావచ్చు.',
severityCriticalDescription:
  'తక్షణ అత్యవసర స్పందన అవసరం.',

incident: 'సంఘటన',
notSelected: 'ఎంచుకోలేదు',

gpsLocation: 'GPS స్థానం',
captured: 'నమోదైంది',

selectedUrgency: 'ఎంచుకున్న అత్యవసర స్థాయి',
selectEmergencyLevel: 'అత్యవసర స్థాయిని ఎంచుకోండి',

activationNote:
  'మీరు అందించిన సంఘటన వివరాలు మరియు స్థానాన్ని ఆధారంగా చేసుకుని GoldenLink సమీపంలోని రెస్పాండర్లను సమన్వయం చేస్తుంది.',



communityResponseActivatedSuccessfully:
  'కమ్యూనిటీ స్పందన విజయవంతంగా సక్రియం చేయబడింది!',

helpCoordinatedForIncident:
  'ఈ సంఘటన కోసం సహాయం సమన్వయం చేయబడుతోంది.',

locationRequired:
  'కొనసాగించే ముందు స్థానం అవసరం.',

geolocationNotSupported:
  'ఈ బ్రౌజర్ జియోలొకేషన్‌కు మద్దతు ఇవ్వదు.',



locationUnavailableDevice:
  'మీ స్థానాన్ని గుర్తించలేకపోయాము.',

locationDetectionTimeout:
  'స్థానాన్ని గుర్తించే సమయం ముగిసింది. మళ్లీ ప్రయత్నించండి.',

 // ============================================================
// COMMUNITY - TELUGU
// ============================================================

communityGoldenLinkNetwork: 'GoldenLink నెట్‌వర్క్',
communityOurCommunity: 'మా సమాజం',
communityHeaderDescription:
  'కలిసి, సాధారణ ప్రజలు మరింత బలమైన మొదటి స్పందన నెట్‌వర్క్‌గా మారవచ్చు.',

communityPoweredResponse:
  'సమాజ ఆధారిత స్పందన',
communityDontJustReport:
  'ప్రమాదాన్ని మాత్రమే నివేదించవద్దు.',
communityActivateTheCommunity:
  'సమాజాన్ని చురుకుగా చేయండి.',
communityHeroDescription:
  'మీ చుట్టూ జరుగుతున్న సంఘటనల్లో సహాయం చేయడానికి సిద్ధంగా ఉన్న వ్యక్తులతో GoldenLink మిమ్మల్ని కలుపుతుంది.',


communityTotalResponders:
  'మొత్తం స్పందించేవారు',
communityAvailableNow:
  'ప్రస్తుతం అందుబాటులో ఉన్నవారు',
communityActiveIncidents:
  'క్రియాశీల సంఘటనలు',
communityAverageCoverage:
  'సగటు కవరేజ్',

communityNetworkCoverage:
  'నెట్‌వర్క్ కవరేజ్',
communityResponseAreas:
  'సమాజ స్పందన ప్రాంతాలు',
communityAreasDescription:
  'వివిధ ప్రాంతాల్లో GoldenLink స్పందించేవారు ఎలా ఉన్నారో చూడండి.',

communityGoldenLinkCommunity:
  'GoldenLink సమాజం',
communityResponders:
  'స్పందించేవారు',
communityAvailable:
  'అందుబాటులో',
communityIncidents:
  'సంఘటనలు',
communityCoverage:
  'కవరేజ్',
communityViewCommunity:
  'సమాజాన్ని చూడండి',
communityWord:
  'సమాజం',

communityHowItWorks:
  'ఇది ఎలా పనిచేస్తుంది',
communityOneCommunityFasterHelp:
  'ఒక సమాజం. వేగవంతమైన సహాయం.',
communityHowItWorksDescription:
  'ప్రతి సెకను ముఖ్యమైనప్పుడు GoldenLink సమీపంలోని వ్యక్తులను ఒకచోటకు తీసుకువస్తుంది.',

communityJoin:
  'చేరండి',
communityJoinDescription:
  'మీ ప్రాథమిక సమాచారం మరియు ధృవీకరణ సర్టిఫికెట్‌తో నమోదు చేసుకోండి.',

communityStayConnected:
  'కనెక్ట్ అయి ఉండండి',
communityStayConnectedDescription:
  'అత్యవసర పరిస్థితి నివేదించబడినప్పుడు GoldenLink సమీపంలోని సమాజ స్పందనదారులను గుర్తించగలదు.',

communityRespond:
  'స్పందించండి',
communityRespondDescription:
  'సమీపంలోని వాలంటీర్లు అభ్యర్థనను అంగీకరించి తక్షణ సహాయం అందించవచ్చు.',

communitySaveLives:
  'ప్రాణాలను కాపాడండి',
communitySaveLivesDescription:
  'వేగవంతమైన సమాజ స్పందన, వృత్తిపరమైన అత్యవసర సేవలు చేరుకునే ముందు ఏర్పడే కీలకమైన అంతరాన్ని తగ్గించడంలో సహాయపడుతుంది.',

communityBePartOfNetwork:
  'GoldenLink నెట్‌వర్క్‌లో భాగం అవ్వండి',
communityNetworkNote:
  'అత్యవసర సమయంలో మీ చిన్న చర్య కూడా పెద్ద మార్పును తీసుకురాగలదు. కలిసి వేగవంతమైన మరియు సురక్షితమైన సమాజ స్పందన వ్యవస్థను నిర్మిద్దాం.',

communityRegistrationDescription:
  'సమాజ స్పందనదారుగా నమోదు చేసుకుని అత్యవసర సమయంలో మీ చుట్టూ ఉన్నవారికి సహాయం చేయండి.',

communityApplicationReceived:
  'దరఖాస్తు అందింది',
communityApplicationSubmitted:
  'దరఖాస్తు విజయవంతంగా సమర్పించబడింది!',
communityThankYou:
  'ధన్యవాదాలు,',
communityRegistrationSubmitted:
  'మీ నమోదు, ఫోటో మరియు వాలంటీర్ సర్టిఫికెట్ విజయవంతంగా సమర్పించబడ్డాయి.',

communityMobileVerified:
  'మొబైల్ ధృవీకరించబడింది',
communityCertificatePending:
  'సర్టిఫికెట్ ధృవీకరణ పెండింగ్‌లో ఉంది',
communityCertificatePendingDescription:
  'మీ సమాజ సభ్యత్వాన్ని సక్రియం చేయడానికి ముందు మీ సర్టిఫికెట్ పరిశీలించబడుతుంది.',
communityDone:
  'పూర్తయింది',

communityVolunteerVerificationRequired:
  'వాలంటీర్ ధృవీకరణ అవసరం',
communityVerificationDescription:
  'దయచేసి మీ ఫోటో మరియు చెల్లుబాటు అయ్యే వాలంటీర్ ధృవీకరణ సర్టిఫికెట్‌ను అందించండి. సమాజ యాక్సెస్ సక్రియం చేయడానికి ముందు మీ వివరాలు పరిశీలించబడతాయి.',

communityFullName:
  'పూర్తి పేరు',
communityFullNamePlaceholder:
  'మీ పూర్తి పేరును నమోదు చేయండి',


communityGender:
  'లింగం',
communitySelectGender:
  'లింగాన్ని ఎంచుకోండి',
communityMale:
  'పురుషుడు',
communityFemale:
  'స్త్రీ',
communityOther:
  'ఇతర',
communityPreferNotToSay:
  'చెప్పకూడదని అనుకుంటున్నాను',

communityPlace:
  'ప్రదేశం',
communityPlacePlaceholder:
  'నగరం / పట్టణం / ప్రాంతం',

communityMobilePlaceholder:
  '10 అంకెల మొబైల్ నంబర్',
communityOtpWillBeSent:
  'ఈ మొబైల్ నంబర్‌కు OTP పంపబడుతుంది.',

communityGmailAddress:
  'Gmail చిరునామా',
communityGmailPlaceholder:
  'example@gmail.com',
communityOnlyGmail:
  'Gmail చిరునామాలు మాత్రమే అంగీకరించబడతాయి.',

communityDesignation:
  'హోదా',
communityDesignationPlaceholder:
  'విద్యార్థి / ఇంజనీర్ / డ్రైవర్...',

communityVehicleType:
  'వాహనం రకం',
communitySelectVehicle:
  'వాహనాన్ని ఎంచుకోండి',
communityNoVehicle:
  'వాహనం లేదు',
communityTwoWheeler:
  'ద్విచక్ర వాహనం',
communityCar:
  'కారు',
communityAutoTaxi:
  'ఆటో / టాక్సీ',
communityVan:
  'వ్యాన్',
communityTruck:
  'ట్రక్',

communityMaritalStatus:
  'వైవాహిక స్థితి',
communitySelectStatus:
  'స్థితిని ఎంచుకోండి',
communityMarried:
  'వివాహితుడు / వివాహిత',
communityUnmarried:
  'అవివాహితుడు / అవివాహిత',

communityPersonPhoto:
  'వ్యక్తి ఫోటో',
communityPhotoSelected:
  'ఫోటో విజయవంతంగా ఎంచుకోబడింది',
communityUploadPhoto:
  'మీ ఫోటోను అప్‌లోడ్ చేయండి',
communityPhotoFormats:
  'JPG, JPEG లేదా PNG',

communityVerifiedVolunteerCertificate:
  'ధృవీకరించబడిన వాలంటీర్ సర్టిఫికెట్',
communityCertificateSelected:
  'సర్టిఫికెట్ విజయవంతంగా ఎంచుకోబడింది',
communityUploadCertificate:
  'ధృవీకరించబడిన వాలంటీర్ సర్టిఫికెట్‌ను అప్‌లోడ్ చేయండి',
communityCertificateFormats:
  'PDF, JPG, JPEG లేదా PNG',

communitySecurityVerification:
  'భద్రతా ధృవీకరణ',
communityCaptchaAnswer:
  'సమాధానం',
communityRefreshCaptcha:
  'CAPTCHA రిఫ్రెష్ చేయండి',

communityVerifyAndSendOtp:
  'ధృవీకరించి OTP పంపండి',

communityMobileVerification:
  'మొబైల్ ధృవీకరణ',
communityVerifyMobileNumber:
  'మీ మొబైల్ నంబర్‌ను ధృవీకరించండి',
communityEnterOtpSent:
  'పంపిన 6 అంకెల OTPని నమోదు చేయండి',

communityFrontendDemoMode:
  'Frontend demo mode:',
communityDemoOtpSentTo:
  'Demo OTP పంపబడింది',
communityDemoOtp:
  'Demo OTP',
communityNewDemoOtpSentTo:
  'కొత్త Demo OTP పంపబడింది',


communityOtpExpiresIn:
  'OTP గడువు ముగిసే సమయం',
communityOtpExpired:
  'OTP గడువు ముగిసింది.',

communityChangeNumber:
  'నంబర్ మార్చండి',
communityCompleteRegistration:
  'నమోదును పూర్తి చేయండి',

communityDidntReceiveOtp:
  'OTP అందలేదా?',
communityResendOtp:
  'OTP మళ్లీ పంపండి',

communityPhotoFormatError:
  'JPG, JPEG లేదా PNG చిత్రాన్ని అప్‌లోడ్ చేయండి.',
communityCertificateFormatError:
  'PDF, JPG, JPEG లేదా PNG సర్టిఫికెట్‌ను అప్‌లోడ్ చేయండి.',

communityIncorrectCaptcha:
  'తప్పు CAPTCHA. దయచేసి మళ్లీ ప్రయత్నించండి.',

communityOtpExpiredRequest:
  'OTP గడువు ముగిసింది. కొత్త OTPని అభ్యర్థించండి.',

communityEnterSixDigitOtp:
  '6 అంకెల OTPని నమోదు చేయండి.',

communityIncorrectOtp:
  'తప్పు OTP. OTPని తనిఖీ చేసి మళ్లీ ప్రయత్నించండి.',

communityEnterName:
  'మీ పేరును నమోదు చేయండి.',
communitySelectDob:
  'మీ పుట్టిన తేదీని ఎంచుకోండి.',
communityEnterPlace:
  'మీ ప్రదేశాన్ని నమోదు చేయండి.',
communityEnterMobile:
  'మీ మొబైల్ నంబర్‌ను నమోదు చేయండి.',
communityMobileTenDigits:
  'మొబైల్ నంబర్‌లో ఖచ్చితంగా 10 అంకెలు ఉండాలి.',
communityEnterGmail:
  'మీ Gmail చిరునామాను నమోదు చేయండి.',
communityValidGmail:
  '@gmail.comతో ముగిసే సరైన Gmail చిరునామాను నమోదు చేయండి.',
communitySelectMaritalStatus:
  'మీ వైవాహిక స్థితిని ఎంచుకోండి.',
communityEnterDesignation:
  'మీ హోదాను నమోదు చేయండి.',

communityVerifyMobileBeforeSubmit:
  'సమర్పించే ముందు మీ మొబైల్ నంబర్‌ను ధృవీకరించండి.',

  // ACCIDENT RECORDS
accidentRecordsGoldenLinkHistory: 'GoldenLink చరిత్ర',
accidentRecordsTitle: 'ప్రమాద రికార్డులు',
accidentRecordsDescription: 'మీరు నివేదించిన సంఘటనలు మరియు వాటి స్పందన స్థితిని ట్రాక్ చేయండి.',

accidentRecordsTotalReports: 'మొత్తం నివేదికలు',
accidentRecordsActive: 'క్రియాశీలం',
accidentRecordsResponding: 'స్పందిస్తోంది',
accidentRecordsHandedOver: 'అప్పగించబడింది',
accidentRecordsCompleted: 'పూర్తయింది',

accidentRecordsFilterIncidents: 'సంఘటనలను ఫిల్టర్ చేయండి',

accidentRecordsCommunityResponseActive: 'కమ్యూనిటీ స్పందన క్రియాశీలంగా ఉంది',
accidentRecordsRespondersOnTheWay: 'స్పందనదారులు మార్గంలో ఉన్నారు',
accidentRecordsProfessionalHandoverCompleted: 'వృత్తిపరమైన అప్పగింత పూర్తయింది',
accidentRecordsResponseCompleted: 'స్పందన పూర్తయింది',
accidentRecordsUnknownStatus: 'స్థితి తెలియదు',

accidentRecordsViewIncident: 'సంఘటనను చూడండి',

accidentRecordsNoIncidentsFound: 'సంఘటనలు ఏవీ కనుగొనబడలేదు',
accidentRecordsNoRecordsCategory: 'ఈ వర్గంలో ప్రమాద రికార్డులు ఏవీ లేవు.',

accidentRecordsGoldenLinkIncident: 'GoldenLink సంఘటన',
accidentRecordsIncidentDetails: 'సంఘటన వివరాలు',
accidentRecordsCloseIncidentDetails: 'సంఘటన వివరాలను మూసివేయండి',

accidentRecordsIncidentId: 'సంఘటన ID',
accidentRecordsAccidentType: 'ప్రమాద రకం',
accidentRecordsSeverity: 'తీవ్రత',
accidentRecordsVictims: 'బాధితులు',

accidentRecordsVictimInformation: 'బాధితుల సమాచారం',
accidentRecordsSomeoneUnconscious: 'ఎవరైనా అపస్మారక స్థితిలో ఉన్నారు',
accidentRecordsHeavyBleeding: 'తీవ్రమైన రక్తస్రావం నమోదైంది',
accidentRecordsPersonTrapped: 'వ్యక్తి చిక్కుకుపోయారు లేదా కదలలేరు',

accidentRecordsIncidentLocation: 'సంఘటన స్థలం',
accidentRecordsOpenInMaps: 'మ్యాప్స్‌లో తెరవండి',

accidentRecordsReportDescription: 'నివేదిక వివరణ',

accidentRecordsAiAssessment: 'AI అంచనా',
accidentRecordsGoldenLinkAiAnalysis: 'GoldenLink AI విశ్లేషణ',
accidentRecordsConfidence: 'నమ్మక స్థాయి',
accidentRecordsCloseDetails: 'వివరాలను మూసివేయండి',

accidentRecordsDefaultDescription: 'GoldenLink ద్వారా ప్రమాదం నివేదించబడింది.',

accidentRecordsUnknown: 'తెలియదు',
accidentRecordsUnknownTime: 'సమయం తెలియదు',
accidentRecordsJustNow: 'ఇప్పుడే',
accidentRecordsMinutesAgo: '{count} నిమిషాల క్రితం',
accidentRecordsHoursAgo: '{count} గంటల క్రితం',
accidentRecordsYesterday: 'నిన్న',
accidentRecordsDaysAgo: '{count} రోజుల క్రితం',

accidentRecordsNoResponderAssigned: 'స్పందనదారు కేటాయించబడలేదు',

// AI ASSISTANT
aiGoldenLinkAi: 'GOLDENLINK AI',
aiEmergencyAssistant: 'అత్యవసర సహాయకుడు',
aiAssistantDescription: 'AI సహాయంతో సంఘటన అంచనా మరియు స్పందన సమన్వయం',
aiEmergencyResponseAssistant: 'అత్యవసర స్పందన సహాయకుడు',

aiWelcome: 'నమస్కారం. నేను GoldenLink AI, మీ అత్యవసర స్పందన సహాయకుడిని.',
aiNoActiveIncident: 'ప్రస్తుతం క్రియాశీల సంఘటన ఏదీ లేదు. ముందుగా ప్రమాదాన్ని నివేదించవచ్చు లేదా సాధారణ అత్యవసర స్పందన మార్గదర్శకత్వాన్ని అడగవచ్చు.',

aiConnectedToIncident: 'నేను సంఘటన #{incidentId}కి కనెక్ట్ అయ్యాను. ప్రస్తుత అత్యవసర పరిస్థితిని అర్థం చేసుకోవడంలో మరియు స్పందన సమన్వయంలో సహాయం చేయగలను.',
aiExistingAssessment: 'ప్రస్తుత సంఘటనను {severity}గా అంచనా వేశారు. అంచనా నమ్మక స్థాయి {confidence}%.',
aiQuickAssessmentIntro: 'సంఘటనను అంచనా వేయడానికి కొన్ని త్వరిత ప్రశ్నలు అడుగుతాను.',

aiQuestionAtLocation: 'మీరు ప్రస్తుతం ప్రమాద స్థలంలో ఉన్నారా?',
aiQuestionInjuredPeople: 'ఎంత మంది గాయపడ్డారు?',
aiQuestionUnconscious: 'ఎవరైనా అపస్మారక స్థితిలో ఉన్నారా?',
aiQuestionHeavyBleeding: 'ఎవరైనా తీవ్రమైన రక్తస్రావంతో ఉన్నారా?',
aiQuestionBreathingDifficulty: 'ఎవరైనా శ్వాస తీసుకోవడంలో ఇబ్బంది పడుతున్నారా?',
aiQuestionTrapped: 'ఎవరైనా వాహనంలో చిక్కుకుపోయారా లేదా కదలలేకపోతున్నారా?',

aiGeneralResponse: 'అత్యవసర స్పందన సమన్వయంలో నేను సహాయం చేయగలను. సురక్షితమైన ప్రదేశంలో ఉండండి, గాయపడిన వారిని అవసరం లేకుండా కదపవద్దు మరియు అత్యవసర సేవల సూచనలను పాటించండి.',

aiBleedingResponse: 'ఎవరైనా తీవ్రమైన రక్తస్రావంతో ఉంటే వెంటనే అత్యవసర వైద్య సహాయం పొందండి. సురక్షితంగా ఉంటే శుభ్రమైన వస్త్రం లేదా గాజుతో గాయంపై గట్టిగా ఒత్తిడి చేయండి.',

aiUnconsciousResponse: 'ఎవరైనా అపస్మారక స్థితిలో ఉంటే లేదా స్పందించకపోతే వెంటనే అత్యవసర సేవలను సంప్రదించండి. వారు శ్వాస తీసుకుంటున్నారా అని తనిఖీ చేసి, అత్యవసర డిస్పాచర్ సూచనలను పాటించండి.',

aiBreathingResponse: 'శ్వాస తీసుకోవడంలో ఇబ్బంది అత్యవసర హెచ్చరిక సంకేతం. వెంటనే అత్యవసర సేవలను సంప్రదించి, నిపుణుల సహాయం వచ్చే వరకు వ్యక్తిని సురక్షితమైన స్థితిలో ఉంచండి.',

aiTrappedResponse: 'అగ్ని వంటి తక్షణ ప్రమాదం లేకపోతే చిక్కుకున్న వ్యక్తిని బలవంతంగా బయటకు తీయడానికి ప్రయత్నించవద్దు. అత్యవసర సేవలను సంప్రదించి శిక్షణ పొందిన స్పందనదారుల కోసం వేచి ఉండండి.',

aiResponderResponse: 'ఈ సంఘటనకు కేటాయించిన స్పందనదారుని Responder Dashboardలో చూడవచ్చు. ప్రమాద స్థలాన్ని అందుబాటులో ఉంచి, స్పందనదారులు వచ్చినప్పుడు వారి సూచనలను పాటించండి.',

aiCriticalAssessment: 'నివేదించిన పరిస్థితులు తక్షణ స్పందన సమన్వయం అవసరమైన తీవ్రమైన అత్యవసర పరిస్థితిని సూచిస్తున్నాయి.',
aiSeriousAssessment: 'అనేక మంది బాధితులుగా నివేదించబడ్డారు. త్వరిత కమ్యూనిటీ మరియు అత్యవసర సహాయం సిఫార్సు చేయబడుతుంది.',
aiModerateAssessment: 'నివేదించిన సంఘటనకు సహాయం మరియు పర్యవేక్షణ అవసరం. కమ్యూనిటీ స్పందనను సమన్వయం చేయవచ్చు.',

aiAssessmentCompleted: 'ధన్యవాదాలు. ప్రారంభ సంఘటన అంచనాను పూర్తి చేశాను.',
aiAssessmentResult: 'సంఘటనను {severity}గా అంచనా వేశారు. ప్రస్తుత స్పందన స్థితి ఆధారంగా సహాయ సమన్వయం కొనసాగవచ్చు.',

aiAskAnythingPlaceholder: 'GoldenLink AIని ఏదైనా అడగండి...',
aiSendMessage: 'సందేశం పంపండి',
aiInputHelp: 'ఈ సంఘటన, అత్యవసర స్పందన, రక్తస్రావం, శ్వాస సమస్య, స్పందనదారులు లేదా సహాయం వచ్చే వరకు ఏమి చేయాలో అడగండి.',
aiDisclaimer: 'GoldenLink AI స్పందన సమన్వయ సహాయాన్ని అందిస్తుంది, వైద్య నిర్ధారణను కాదు.',

aiAssessment: 'AI అంచనా',
aiAssessmentInProgress: 'అంచనా జరుగుతోంది',
aiAssessmentWaitingDescription: 'అత్యవసర పరిస్థితిని GoldenLink అర్థం చేసుకోవడానికి ప్రశ్నలకు సమాధానం ఇవ్వండి.',
aiIncidentAssessment: 'AI సంఘటన అంచనా',
aiReportedConditions: 'నివేదించిన పరిస్థితులు',
aiActivateCommunityResponse: 'కమ్యూనిటీ స్పందనను ప్రారంభించండి',
aiSafetyNote: 'సురక్షితమైన ప్రదేశంలో ఉండి అత్యవసర సేవల సూచనలను పాటించండి.',

aiNotRequested: 'అభ్యర్థించలేదు',
confidence: 'నమ్మక స్థాయి',


  },


      // ============================================================
      // MALAYALAM
      // ============================================================
      ml: {

        // Navigation
        home: 'ഹോം',
        reportAccident: 'അപകടം റിപ്പോർട്ട് ചെയ്യുക',
        community: 'കമ്മ്യൂണിറ്റി',
        nearbyResponders: 'സമീപത്തുള്ള സഹായികൾ',
        volunteers: 'സന്നദ്ധ പ്രവർത്തകർ',
        aiAssistant: 'GoldenLink AI',
        profile: 'പ്രൊഫൈൽ',
        selectLanguage: 'ഭാഷ തിരഞ്ഞെടുക്കുക',

        // Home
        activateCommunity: 'കമ്മ്യൂണിറ്റി സഹായം സജീവമാക്കുക',
        CommunityResponse: 'കമ്മ്യൂണിറ്റി പ്രതികരണം',
        duringGoldenHour: 'ഗോൾഡൻ അവറിനിടെ',
        DontJustReport: 'അപകടം റിപ്പോർട്ട് ചെയ്യുന്നതിൽ മാത്രം നിൽക്കരുത്.',
        responderDashboard: 'സഹായി ഡാഷ്ബോർഡ്',
        emergencyResponse: 'അടിയന്തര പ്രതികരണം',
        witnessedAccident: 'നിങ്ങൾ ഒരു അപകടം കണ്ടോ?',
        reportIncidentQuickly:
          'അപകടം വേഗത്തിൽ റിപ്പോർട്ട് ചെയ്യുകയും നിർണായകമായ ഗോൾഡൻ അവറിനിടെ സമീപത്തുള്ള കമ്മ്യൂണിറ്റി സഹായികളെ സജീവമാക്കുകയും ചെയ്യുക.',
        ActivateCommunity: 'കമ്മ്യൂണിറ്റി സജീവമാക്കുക',

        HelpCanStart: 'സഹായം ആരംഭിക്കാം',
        WithPeopleNearby: 'സമീപത്തുള്ള ആളുകളുമായി',
        GoldenlinkConnects:
          'GoldenLink സഹായം ആവശ്യമുള്ള ആളുകളെ സമീപത്തുള്ള പരിശീലനം ലഭിച്ച കമ്മ്യൂണിറ്റി സഹായികളുമായി ബന്ധിപ്പിക്കുന്നു.',

        NearbyResponders: 'സമീപത്തുള്ള സഹായികൾ',
        IdentifyResponders:
          'സംഭവത്തിന് സമീപം ലഭ്യമായ പരിശീലനം ലഭിച്ച സഹായികളെ കണ്ടെത്തുക.',

        VerifiedSkills: 'സ്ഥിരീകരിച്ച കഴിവുകൾ',
        ResponderProfiles:
          'സ്ഥിരീകരിച്ച സഹായി പ്രൊഫൈലുകളും അവരുടെ അടിയന്തര കഴിവുകളും കാണുക.',

        RoleBasedSupport: 'പങ്ക് അടിസ്ഥാനമാക്കിയുള്ള സഹായം',
        DifferentPeople:
          'വ്യത്യസ്ത ആളുകൾക്ക് വ്യത്യസ്ത തരത്തിലുള്ള അടിയന്തര സഹായം നൽകാൻ കഴിയും.',

        localLanguages: 'പ്രാദേശിക ഭാഷകൾ',
        simpleGuidance:
          'പരിചിതമായ പ്രാദേശിക ഭാഷകളിൽ ലളിതമായ അടിയന്തര മാർഗനിർദ്ദേശം നേടുക.',

        // Why GoldenLink
        whyGoldenLink: 'എന്തുകൊണ്ട് GoldenLink?',
        dontJustReport: 'അപകടം റിപ്പോർട്ട് ചെയ്യുന്നതിൽ മാത്രം നിൽക്കരുത്.',
        coordinate: 'ഏകോപിപ്പിക്കുക.',
        whyGoldenLinkDescription:
          'അപകടം സംഭവിക്കുന്നതിനും ഇരയ്ക്ക് ഫലപ്രദമായ സഹായം ലഭിക്കുന്നതിനുമിടയിലെ ഏകോപന വിടവ് നികത്തുന്നതിനാണ് GoldenLink രൂപകൽപ്പന ചെയ്തിരിക്കുന്നത്.',

        communityCoordination: 'കമ്മ്യൂണിറ്റി ഏകോപനം',
        communityCoordinationDescription:
          'എല്ലാവരും ഒരേ കാര്യം ചെയ്യാൻ ശ്രമിക്കുന്നതിനുപകരം സമീപത്തുള്ള ആളുകളെ ലളിതമായ ചുമതലകളായി ക്രമീകരിക്കാം.',

        locationAwareResponse: 'സ്ഥലാധിഷ്ഠിത പ്രതികരണം',
        locationAwareResponseDescription:
          'സംഭവത്തിന്റെയും സഹായികളുടെയും സ്ഥാനം ഉപയോഗിച്ച് അപകടത്തെ സമീപത്തുള്ള അനുയോജ്യമായ സഹായികളുമായി ബന്ധിപ്പിക്കാൻ ഈ സംവിധാനം സഹായിക്കുന്നു.',

        suitableResponders: 'അനുയോജ്യരായ സഹായികൾ',
        suitableRespondersDescription:
          'ലഭ്യത, ദൂരം, കഴിവുകൾ, രജിസ്റ്റർ ചെയ്ത പരിശീലനം എന്നിവ പരിഗണിച്ച് സഹായികളെ പൊരുത്തപ്പെടുത്താം.',

        multilingualGuidance: 'ബഹുഭാഷാ മാർഗനിർദ്ദേശം',
        multilingualGuidanceDescription:
          'ഇംഗ്ലീഷ്, തമിഴ്, മറ്റ് പ്രാദേശിക ഭാഷകളിൽ ആശയവിനിമയത്തിന് ഈ ഇന്റർഫേസ് പിന്തുണ നൽകുന്നു.',

        simpleRoles: 'ലളിതമായ ചുമതലകൾ',
        simpleRolesDescription:
          'ഓരോ പങ്കാളിക്കും വ്യക്തമായ ഒരു ചുമതല നൽകുന്നതിനാൽ പ്രതികരണം മനസ്സിലാക്കാനും ഏകോപിപ്പിക്കാനും എളുപ്പമാണ്.',

        professionalHandover: 'പ്രൊഫഷണൽ കൈമാറ്റം',
        professionalHandoverDescription:
          'അനുയോജ്യരായ പ്രൊഫഷണൽ സഹായികൾ ചുമതല ഏറ്റെടുക്കുന്നതുവരെ GoldenLink കമ്മ്യൂണിറ്റി പ്രതികരണത്തെ പിന്തുണയ്ക്കുന്നു.',

        ourCoreInnovation: 'ഞങ്ങളുടെ പ്രധാന പുതുമ',
        coordinationLayerGoldenHour:
          'ഗോൾഡൻ അവറിനായുള്ള ഒരു ഏകോപന പാളി.',
        existingSystemsCanCall:
          'നിലവിലുള്ള സംവിധാനങ്ങൾക്ക് വിളിക്കാനും അറിയിക്കാനും മാർഗനിർദ്ദേശം നൽകാനും കഴിയും. സമീപത്തുള്ള ആളുകളെ നിർദ്ദിഷ്ടവും സുരക്ഷിതവുമായ പ്രവർത്തനങ്ങളിലേക്ക് ഏകോപിപ്പിക്കുന്നതിലാണ് GoldenLink ശ്രദ്ധ കേന്ദ്രീകരിക്കുന്നത്.',

        // Community responder
        communityResponder: 'കമ്മ്യൂണിറ്റി സഹായി',
        readyToHelp: 'ഗോൾഡൻ അവറിനിടെ സഹായിക്കാൻ തയ്യാറാണോ?',
        joinResponderNetwork:
          'GoldenLink സഹായി ശൃംഖലയിൽ ചേരുക. സമീപത്തുള്ള സംഭവങ്ങൾ കാണുക, സഹായ അഭ്യർത്ഥനകൾ സ്വീകരിക്കുക, കമ്മ്യൂണിറ്റി സഹായം ഏകോപിപ്പിക്കുക.',

        // Common buttons
        emergency: 'അടിയന്തരാവസ്ഥ',
        helpNow: 'ഇപ്പോൾ സഹായം നേടുക',
        back: 'പിന്നിലേക്ക്',
        next: 'അടുത്തത്',
        previous: 'മുമ്പത്തെത്',
        cancel: 'റദ്ദാക്കുക',
        submit: 'സമർപ്പിക്കുക',
        save: 'സംരക്ഷിക്കുക',
        close: 'അടയ്ക്കുക',
        search: 'തിരയുക',
        view: 'കാണുക',
        continue: 'തുടരുക',
        confirm: 'സ്ഥിരീകരിക്കുക',
        edit: 'തിരുത്തുക',
        delete: 'ഇല്ലാതാക്കുക',
        retry: 'വീണ്ടും ശ്രമിക്കുക',
        refresh: 'പുതുക്കുക',
        loading: 'ലോഡ് ചെയ്യുന്നു...',
        yes: 'അതെ',
        no: 'ഇല്ല',

        // Location
        detectMyLocation: 'എന്റെ സ്ഥാനം കണ്ടെത്തുക',
        locationCaptured: 'സ്ഥാനം ലഭിച്ചു',
        whereAccidentHappened: 'അപകടം എവിടെയാണ് സംഭവിച്ചത്?',
        detectingLocation: 'നിങ്ങളുടെ സ്ഥാനം കണ്ടെത്തുന്നു...',
        locationDetected: 'സ്ഥാനം വിജയകരമായി കണ്ടെത്തി.',
        locationNotAvailable: 'സ്ഥാനം ലഭ്യമല്ല.',
        locationPermissionDenied:
          'ലൊക്കേഷൻ അനുമതി നിരസിച്ചു. നിങ്ങളുടെ ബ്രൗസറിൽ ലൊക്കേഷൻ ആക്‌സസ് പ്രവർത്തനക്ഷമമാക്കുക.',
        locationError:
          'നിങ്ങളുടെ സ്ഥാനം കണ്ടെത്താൻ കഴിഞ്ഞില്ല. വീണ്ടും ശ്രമിക്കുക.',
        latitude: 'അക്ഷാംശം',
        longitude: 'രേഖാംശം',
        currentLocation: 'നിലവിലെ സ്ഥാനം',

        // Accident
        whatHappened: 'എന്താണ് സംഭവിച്ചത്?',
        roadAccident: 'റോഡ് അപകടം',
        twoWheelerAccident: 'ഇരുചക്ര വാഹന അപകടം',
        pedestrianIncident: 'കാൽനടയാത്രക്കാരന്റെ സംഭവം',
        notSure: 'ഉറപ്പില്ല',

        peopleAffected: 'എത്ര പേർ ബാധിക്കപ്പെട്ടു?',
        onePerson: '1 വ്യക്തി',
        twoPeople: '2 പേർ',
        threePeople: '3 പേർ',
        fourPeople: '4 പേർ',
        fivePeople: '5 പേർ',
        fivePlusPeople: '5+ പേർ',

        additionalInformation: 'കൂടുതൽ വിവരങ്ങൾ',
        describeWhatYouSee: 'നിങ്ങൾ കാണുന്നത് വിവരിക്കുക...',

        howUrgent: 'സ്ഥിതി എത്ര അടിയന്തരമാണ്?',
        normal: 'സാധാരണ',
        moderate: 'മിതമായ',
        critical: 'ഗുരുതരം',

        activateGoldenLink: 'GoldenLink സജീവമാക്കുക',

        // Messages
        success: 'വിജയം',
        accidentReportedSuccessfully:
          'അപകടം വിജയകരമായി റിപ്പോർട്ട് ചെയ്തു.',
        nearbyRespondersNotified:
          'സമീപത്തുള്ള സഹായികളെ അറിയിച്ചു.',
        somethingWentWrong:
          'എന്തോ തെറ്റ് സംഭവിച്ചു. വീണ്ടും ശ്രമിക്കുക.',
        requiredField:
          'ഈ ഫീൽഡ് നിർബന്ധമാണ്.',
        invalidInput:
          'ദയവായി സാധുവായ മൂല്യം നൽകുക.',

        // AI Assistant
        askGoldenLinkAI: 'GoldenLink AI-യോട് എന്തും ചോദിക്കുക...',
        accidentLocationQuestion:
          'നിങ്ങൾ ഇപ്പോൾ അപകടസ്ഥലത്താണോ?',
        injuredPeopleQuestion:
          'എത്ര പേർക്ക് പരിക്കേറ്റു?',
        unconsciousQuestion:
          'ആർക്കെങ്കിലും ബോധമില്ലേ?',
        heavyBleedingQuestion:
          'ആർക്കെങ്കിലും ശക്തമായ രക്തസ്രാവമുണ്ടോ?',
        breathingDifficultyQuestion:
          'ആർക്കെങ്കിലും ശ്വസിക്കാൻ ബുദ്ധിമുട്ടുണ്ടോ?',
        trappedQuestion:
          'ആരെങ്കിലും വാഹനത്തിനുള്ളിൽ കുടുങ്ങിയിട്ടുണ്ടോ അല്ലെങ്കിൽ നീങ്ങാൻ കഴിയുന്നില്ലേ?',
        yesAnswer: 'അതെ',
        noAnswer: 'ഇല്ല',
        thinking: 'GoldenLink AI ചിന്തിക്കുന്നു...',
        aiEmergencyGuidance: 'അടിയന്തര മാർഗനിർദ്ദേശം',
        aiResponse: 'AI പ്രതികരണം',

        // Status
        active: 'സജീവം',
        inactive: 'നിഷ്ക്രിയം',
        available: 'ലഭ്യമാണ്',
        unavailable: 'ലഭ്യമല്ല',
        pending: 'തീർപ്പാക്കാത്തത്',
        accepted: 'സ്വീകരിച്ചു',
        rejected: 'നിരസിച്ചു',
        completed: 'പൂർത്തിയായി',
        cancelled: 'റദ്ദാക്കി',
        responding: 'പ്രതികരിക്കുന്നു',
        resolved: 'പരിഹരിച്ചു',

        // Responder
        incidentResponse: 'സംഭവ പ്രതികരണം',
        responderProfile: 'സഹായി പ്രൊഫൈൽ',
        responderStatus: 'സഹായി നില',
        availableResponders: 'ലഭ്യമായ സഹായികൾ',
        acceptRequest: 'അഭ്യർത്ഥന സ്വീകരിക്കുക',
        declineRequest: 'അഭ്യർത്ഥന നിരസിക്കുക',
        responseStarted: 'പ്രതികരണം ആരംഭിച്ചു.',
        responseCompleted: 'പ്രതികരണം പൂർത്തിയായി.',

        // Community
        joinCommunity: 'കമ്മ്യൂണിറ്റിയിൽ ചേരുക',
        volunteerSearch: 'സന്നദ്ധ പ്രവർത്തക തിരയൽ',
        nearbyCommunity: 'സമീപത്തുള്ള കമ്മ്യൂണിറ്റി',

        // Registration
        name: 'പേര്',
        dateOfBirth: 'ജനന തീയതി',
        mobileNumber: 'മൊബൈൽ നമ്പർ',
        emailAddress: 'ഇമെയിൽ വിലാസം',
        applicantPhoto: 'അപേക്ഷകന്റെ ഫോട്ടോ',
        verifiedCertificate: 'സ്ഥിരീകരിച്ച സർട്ടിഫിക്കറ്റ്',
        captcha: 'CAPTCHA',
        otpVerification: 'OTP സ്ഥിരീകരണം',
        enterOtp: 'OTP നൽകുക',
        sendOtp: 'OTP അയയ്ക്കുക',
        verifyOtp: 'OTP സ്ഥിരീകരിക്കുക',

        // Records
        accidentRecords: 'അപകട രേഖകൾ',
        incidentRecords: 'സംഭവ രേഖകൾ',
        noRecordsFound: 'രേഖകളൊന്നും കണ്ടെത്തിയില്ല.',
        incidentDetails: 'സംഭവ വിശദാംശങ്ങൾ',
        reportedAt: 'റിപ്പോർട്ട് ചെയ്ത സമയം',
        status: 'നില',
        severity: 'തീവ്രത',
        location: 'സ്ഥലം',

        // Footer
        quickLinks: 'ദ്രുത ലിങ്കുകൾ',
        emergencySupport: 'അടിയന്തര സഹായം',
        communitySupport: 'കമ്മ്യൂണിറ്റി സഹായം',
        allRightsReserved: 'എല്ലാ അവകാശങ്ങളും സംരക്ഷിച്ചിരിക്കുന്നു.',

        // Workflow
        goldenLinkResponseNetwork: 'GoldenLink പ്രതികരണ ശൃംഖല',
        fromAccident: 'അപകടത്തിൽ നിന്ന്',
        toCoordinatedResponse: 'ഏകോപിതമായ സഹായത്തിലേക്ക്.',
        workflowIntroduction:
          'GoldenLink അപകടത്തിന് ചുറ്റുമുള്ള ആളുകളെ ബന്ധിപ്പിക്കുകയും ഗോൾഡൻ അവറിനിടെ ഓരോ സഹായിക്കും ലളിതവും പ്രധാനപ്പെട്ടതുമായ ഒരു പങ്ക് നൽകുകയും ചെയ്യുന്നു.',

        workflowReport: 'റിപ്പോർട്ട്',
        workflowReportDescription:
          'ആവശ്യമായ സ്ഥലവും സാഹചര്യ വിവരങ്ങളും ഉൾപ്പെടുത്തി അപകടം റിപ്പോർട്ട് ചെയ്യുന്നു.',

        workflowTriage: 'പ്രാഥമിക വിലയിരുത്തൽ',
        workflowTriageDescription:
          'ലളിതമായ ചോദ്യങ്ങൾ ശരിയായ സഹായ മാർഗം കണ്ടെത്താൻ സഹായിക്കുന്നു.',

        workflowMatch: 'പൊരുത്തപ്പെടുത്തൽ',
        workflowMatchDescription:
          'ലഭ്യതയും കഴിവുകളും അടിസ്ഥാനമാക്കി സമീപത്തുള്ള അനുയോജ്യരായ സഹായികളെ കണ്ടെത്തുന്നു.',

        workflowGuide: 'മാർഗനിർദ്ദേശം',
        workflowGuideDescription:
          'സഹായികൾക്ക് ലളിതവും അംഗീകരിച്ചതുമായ ഘട്ടം ഘട്ടമായുള്ള മാർഗനിർദ്ദേശം ലഭിക്കുന്നു.',

        workflowCoordinate: 'ഏകോപിപ്പിക്കുക',
        workflowCoordinateDescription:
          'വ്യത്യസ്ത സഹായികൾക്ക് വ്യത്യസ്ത ചുമതലകൾ നൽകുന്നതിനാൽ കമ്മ്യൂണിറ്റി ഒരുമിച്ച് പ്രവർത്തിക്കുന്നു.',

        workflowHandover: 'കൈമാറ്റം',
        workflowHandoverDescription:
          'പ്രൊഫഷണൽ അടിയന്തര സഹായികൾ എത്തിയാൽ അവർ സഹായത്തിന്റെ ചുമതല ഏറ്റെടുക്കുന്നു.',

        workflowLearn: 'പഠിക്കുക',
        workflowLearnDescription:
          'ശേഖരിച്ച പ്രതികരണ ഡാറ്റ കുറവുകൾ കണ്ടെത്താനും ഭാവിയിലെ തയ്യാറെടുപ്പ് മെച്ചപ്പെടുത്താനും സഹായിക്കുന്നു.',

          //community-preview//

        communityResponse: 'സാമൂഹിക സഹായം',
  rightPeople: 'ശരിയായ ആളുകൾ',
  canMakeDifference: 'മാറ്റം സൃഷ്ടിക്കാൻ കഴിയും.',
  communityPreviewDescription:
    'Golden Hour സമയത്ത് അപകടത്തിന് സമീപമുള്ള ആളുകളെ സഹായകരമായ സാമൂഹിക പിന്തുണയുമായി ബന്ധിപ്പിക്കാൻ GoldenLink സഹായിക്കുന്നു.',
  exploreCommunity: 'സമൂഹം കാണുക',
  becomeResponder: 'റെസ്‌പോണ്ടറായി ചേരുക',
  nearbyHelp: 'സമീപ സഹായം',
  nearbyHelpDescription:
    'അപകടത്തിന് സമീപത്തുള്ള രജിസ്റ്റർ ചെയ്ത കമ്മ്യൂണിറ്റി റെസ്‌പോണ്ടർമാരെ കണ്ടെത്തുക.',
  trustedResponders: 'വിശ്വസനീയമായ റെസ്‌പോണ്ടർമാർ',
  trustedRespondersDescription:
    'റെസ്‌പോണ്ടർമാരുടെ കഴിവുകൾ, ലഭ്യത, അനുഭവം എന്നിവ കാണിക്കുന്ന പ്രൊഫൈലുകൾ ഉണ്ടായിരിക്കാം.',
  localSupport: 'പ്രാദേശിക സഹായം',
  localSupportDescription:
    'പ്രാദേശിക ഭാഷകളും വ്യക്തമായ നിർദ്ദേശങ്ങളും ഉപയോഗിച്ച് മാർഗനിർദ്ദേശം എളുപ്പത്തിൽ മനസ്സിലാക്കാം.',
  clearRoles: 'വ്യക്തമായ ചുമതലകൾ',
  clearRolesDescription:
    'എല്ലാവരും ഒരേ കാര്യം ചെയ്യുന്നതിനുപകരം ഓരോ റെസ്‌പോണ്ടർക്കും അനുയോജ്യമായ ചുമതലകൾ നൽകാം.',

    //emergency-cta//

    goldenHourResponse: 'Golden Hour സഹായം',
  whenEverySecondMatters: 'ഓരോ സെക്കന്റും പ്രധാനപ്പെട്ടപ്പോൾ,',
  knowWhatToDo: 'എന്ത് ചെയ്യണമെന്ന് അറിയുക.',
  emergencyCtaDescription:
    'അപകടം റിപ്പോർട്ട് ചെയ്യുകയും പ്രൊഫഷണൽ എമർജൻസി സേവനങ്ങൾ ഏറ്റെടുക്കുന്നതുവരെ അപകടത്തിന് ചുറ്റുമുള്ള അനുയോജ്യരായ ആളുകളുടെ സഹായം സജീവമാക്കാൻ സഹായിക്കുകയും ചെയ്യുക.',
  goldenLinkEmergencyDisclaimer:
    'GoldenLink AI സാമൂഹിക ഏകോപനത്തിന് സഹായിക്കുന്നു. ഇത് ആംബുലൻസുകൾ, ഡോക്ടർമാർ, പോലീസ് അല്ലെങ്കിൽ പ്രൊഫഷണൽ എമർജൻസി സേവനങ്ങൾക്ക് പകരമല്ല.',


  //footer//

  footerDescription:
    'Golden Hour-നായി AI സഹായത്തോടെ പ്രവർത്തിക്കുന്ന സാമൂഹിക പ്രതികരണ ശൃംഖല.',
  footerTagline:
    'അപകടം റിപ്പോർട്ട് ചെയ്യുന്നതിൽ മാത്രം നിൽക്കരുത്. സമൂഹത്തെ സജീവമാക്കുക.',
  goldenLink: 'GoldenLink',
  howItWorks: 'ഇത് എങ്ങനെ പ്രവർത്തിക്കുന്നു',
  footercommunity: 'സമൂഹം',
  responders: 'റെസ്‌പോണ്ടർമാർ',
  support: 'പിന്തുണ',
  help: 'സഹായം',
  safety: 'സുരക്ഷ',
  privacy: 'സ്വകാര്യത',
  copyright: '© 2026 GoldenLink AI',
  builtForYuva: 'YUVA Future 6.0 നായി നിർമ്മിച്ചത്',

  //emergency-button//

  emergencyAssistance: 'അടിയന്തര സഹായം',
  emergencyQuestion: 'നിങ്ങൾ ഒരു അപകടം കാണുകയാണോ അല്ലെങ്കിൽ അടിയന്തര സാഹചര്യം നേരിടുകയാണോ?',
  call112: '112-ലേക്ക് വിളിക്കുക',

  // ============================================================
  // RESPONDER DASHBOARD
  // ============================================================

  responderIncidentInformationUpdated:
    'സംഭവ വിവരങ്ങൾ പുതുക്കി.',
  responderNoActiveIncident:
    'സജീവമായ സംഭവം ഇല്ല',
  responderNoActiveIncidentDescription:
    'നിലവിൽ നിങ്ങൾക്ക് സജീവമായ ഒരു സംഭവവും നിയോഗിച്ചിട്ടില്ല.',
  responderViewNearbyResponders:
    'സമീപത്തുള്ള സഹായികളെ കാണുക',

  responderDashboardTitle:
    'സഹായി ഡാഷ്ബോർഡ്',
  responderEmergencyResponse:
    'അടിയന്തര പ്രതികരണം',
  responderDashboardDescription:
    'നിങ്ങൾക്ക് നിയോഗിച്ച സംഭവം നിയന്ത്രിക്കുകയും ഗോൾഡൻ അവറിനിടെ അടിയന്തര പ്രതികരണം ഏകോപിപ്പിക്കുകയും ചെയ്യുക.',

  responderActiveIncident:
    'സജീവമായ സംഭവം',
  responderResponseProgress:
    'പ്രതികരണ പുരോഗതി',
  responderLive:
    'ലൈവ്',
  responderAssigned:
    'നിയോഗിച്ചു',
  responderOnTheWay:
    'വഴിയിലാണ്',
  responderOnScene:
    'സംഭവസ്ഥലത്ത്',
  responderComplete:
    'പൂർത്തിയായി',

  responderIncidentInformation:
    'സംഭവ വിവരങ്ങൾ',
  responderAccidentDetails:
    'അപകട വിവരങ്ങൾ',
  responderAccidentType:
    'അപകടത്തിന്റെ തരം',
  responderNotSpecified:
    'വ്യക്തമാക്കിയിട്ടില്ല',
  responderPeopleAffected:
    'ബാധിച്ച ആളുകൾ',
  responderUnconscious:
    'ബോധരഹിതം',
  responderBleeding:
    'രക്തസ്രാവം',
  responderBreathingDifficulty:
    'ശ്വസിക്കാൻ ബുദ്ധിമുട്ട്',
  responderTrapped:
    'കുടുങ്ങിയിരിക്കുന്നു',
  responderReporterDescription:
    'റിപ്പോർട്ട് ചെയ്ത വ്യക്തിയുടെ വിവരണം',

  responderAccidentLocation:
    'അപകട സ്ഥലം',
  responderRespondHere:
    'ഇവിടെ പ്രതികരിക്കുക',
  responderReportedLocation:
    'റിപ്പോർട്ട് ചെയ്ത സ്ഥലം',
  responderOpenLocationInMaps:
    'മാപ്പിൽ സ്ഥലം തുറക്കുക',

  responderAssignment:
    'നിയോഗം',
  responderEta:
    'പ്രതീക്ഷിക്കുന്ന എത്തിച്ചേരൽ സമയം',
  responderVerified:
    'സ്ഥിരീകരിച്ചു',

  responderOptionalAiSupport:
    'ഓപ്ഷണൽ AI സഹായം',
  responderGoldenLinkAiAssistant:
    'GoldenLink AI സഹായി',
  responderAiSupportDescription:
    'സംഭവത്തിന് പ്രതികരിക്കുമ്പോൾ അധിക AI സഹായത്തോടെയുള്ള മാർഗനിർദ്ദേശം നേടുക.',
  responderOpenAiAssistant:
    'AI സഹായിയെ തുറക്കുക',

  responderResponseControl:
    'പ്രതികരണ നിയന്ത്രണം',
  responderUpdateResponse:
    'പ്രതികരണം പുതുക്കുക',
  responderUpdateResponseDescription:
    'നിങ്ങളുടെ നിലവിലെ പ്രതികരണ നില പുതുക്കുക.',
  responderImOnTheWay:
    'ഞാൻ വഴിയിലാണ്',
  responderIveArrived:
    'ഞാൻ എത്തി',
  responderHandOverEmergencyServices:
    'അടിയന്തര സേവനങ്ങൾക്ക് കൈമാറുക',
  responderCompleteResponse:
    'പ്രതികരണം പൂർത്തിയാക്കുക',

  responderResponseCompleted:
    'പ്രതികരണം പൂർത്തിയായി',
  responderIncidentSuccessfullyClosed:
    'ഈ സംഭവം വിജയകരമായി അവസാനിപ്പിച്ചു.',

  responderSafetyPrinciple:
    'GoldenLink സഹായി സുരക്ഷാ തത്വം',
  responderSafetyNote:
    'സുരക്ഷിതമായ പ്രതികരണ നടപടികൾ പാലിക്കുക. നിങ്ങളെയോ മറ്റുള്ളവരെയോ അനാവശ്യ അപകടത്തിലാക്കരുത്.',

  responderAccidentRecords:
    'അപകട രേഖകൾ',

  responderAssignedMessage:
    'ഈ സംഭവത്തിലേക്ക് നിങ്ങളെ നിയോഗിച്ചിരിക്കുന്നു.',
  responderEnRouteMessage:
    'നിങ്ങൾ സംഭവസ്ഥലത്തേക്ക് പോകുന്ന വഴിയിലാണ്.',
  responderOnSceneMessage:
    'നിങ്ങൾ സംഭവസ്ഥലത്ത് എത്തി.',
  responderHandedOverMessage:
    'സംഭവം അടിയന്തര സേവനങ്ങൾക്ക് കൈമാറി.',
  responderCompletedMessage:
    'പ്രതികരണം പൂർത്തിയാക്കി.',
  responderActiveMessage:
    'നിങ്ങൾ ഈ സംഭവത്തോട് സജീവമായി പ്രതികരിക്കുന്നു.',

  responderSeverityCritical:
    'ഗുരുതരം',
  responderSeveritySerious:
    'ഗൗരവമുള്ളത്',
  responderSeverityModerate:
    'മിതമായത്',

  responderMarkedOnTheWay:
    'പ്രതികരണ നില "വഴിയിലാണ്" എന്ന് മാറ്റി.',
  responderArrivalRecorded:
    'നിങ്ങളുടെ എത്തിച്ചേരൽ രേഖപ്പെടുത്തി.',
  responderIncidentHandedOver:
    'സംഭവം അടിയന്തര സേവനങ്ങൾക്ക് കൈമാറി.',
  responderResponseCompletedSuccessfully:
    'പ്രതികരണം വിജയകരമായി പൂർത്തിയാക്കി.',

  responderCurrentAccidentLocation:
    'നിലവിലെ അപകട സ്ഥലം',
  responderLocationUnavailable:
    'സ്ഥലം ലഭ്യമല്ല',

  responderAssignedResponder:
    'നിയോഗിച്ച സഹായി',
  responderCommunityResponder:
    'കമ്മ്യൂണിറ്റി സഹായി',
  responderPerson:
    'വ്യക്തി',
  responderPeople:
    'ആളുകൾ',

    //responder-profile//

    responderAccount: 'റെസ്പോണ്ടർ അക്കൗണ്ട്',
  myProfile: 'എന്റെ പ്രൊഫൈൽ',
  responderProfileDescription: 'നിങ്ങളുടെ റെസ്പോണ്ടർ വിവരങ്ങളും ലഭ്യതയും നിയന്ത്രിക്കുക.',
  editProfile: 'പ്രൊഫൈൽ എഡിറ്റ് ചെയ്യുക',
  profileEditingSoon: 'പ്രൊഫൈൽ എഡിറ്റിംഗ് ഉടൻ ലഭ്യമാകും.',
  availableToRespond: 'പ്രതികരിക്കാൻ ലഭ്യമാണ്',
  currentlyUnavailable: 'നിലവിൽ ലഭ്യമല്ല',
  responderId: 'റെസ്പോണ്ടർ ഐഡി',
  responderAvailability: 'റെസ്പോണ്ടർ ലഭ്യത',
  youAreAvailable: 'നിങ്ങൾ ലഭ്യമാണ്',
  youAreUnavailable: 'നിങ്ങൾ ലഭ്യമല്ല',
  availableDescription: 'സമീപത്തുള്ള അടിയന്തര പ്രതികരണ അഭ്യർത്ഥനകൾ നിങ്ങൾക്ക് ലഭിക്കും.',
  unavailableDescription: 'പുതിയ പ്രതികരണ അഭ്യർത്ഥനകൾ നിങ്ങൾക്ക് ലഭിക്കില്ല.',
  responses: 'പ്രതികരണങ്ങൾ',
  successful: 'വിജയകരമായവ',
  rating: 'റേറ്റിംഗ്',
  responderInformation: 'റെസ്പോണ്ടർ വിവരങ്ങൾ',
  currentArea: 'നിലവിലെ പ്രദേശം',
  joinedGoldenLink: 'GoldenLink AI-യിൽ ചേർന്നത്',
  responseRadius: 'പ്രതികരണ പരിധി',
  respondSafely: 'സുരക്ഷിതമായി പ്രതികരിക്കുക',
  respondSafelyDescription: 'സുരക്ഷിതമാണെങ്കിൽ മാത്രം പ്രതികരിക്കുക. അടിയന്തര നിർദ്ദേശങ്ങൾ പാലിക്കുകയും സ്വയം അപകടത്തിൽപ്പെടാതിരിക്കുകയും ചെയ്യുക.',

  //incident-responce//

  incidentResponderCenter: 'റെസ്പോണ്ടർ കേന്ദ്രം',
  incidentResponseDescription: 'സമീപത്തുള്ള സംഭവങ്ങൾ കണ്ടെത്തി ഗോൾഡൻ അവറിൽ നിങ്ങളുടെ സമൂഹത്തെ സഹായിക്കുക.',
  activeIncidents: 'സജീവ സംഭവങ്ങൾ',
  peopleNeedingHelp: 'സഹായം ആവശ്യമുള്ളവർ',
  nearestIncident: 'ഏറ്റവും അടുത്ത സംഭവം',
  nearbyIncidents: 'സമീപത്തുള്ള സംഭവങ്ങൾ',
  chooseIncidentSafely: 'നിങ്ങൾക്ക് സുരക്ഷിതമായി പ്രതികരിക്കാൻ കഴിയുന്ന സംഭവം തിരഞ്ഞെടുക്കുക.',
  handedOver: 'കൈമാറി',
  all: 'എല്ലാം',
  kmAway: 'കിമീ അകലെ',
  oneMinuteAgo: '1 മിനിറ്റ് മുമ്പ്',
  minutesAgo: 'മിനിറ്റുകൾക്ക് മുമ്പ്',
  responderNeeded: 'റെസ്പോണ്ടർ ആവശ്യം',
  respondersNeeded: 'റെസ്പോണ്ടർമാർ ആവശ്യം',
  incidentAccepted: 'സംഭവം സ്വീകരിച്ചു',
  distance: 'ദൂരം',
  reported: 'റിപ്പോർട്ട് ചെയ്തത്',
  incidentNeedsResponder: 'റെസ്പോണ്ടർ ആവശ്യം',
  incidentResponderOnTheWay: 'റെസ്പോണ്ടർ വഴിയിലാണ്',
  incidentProfessionalHandover: 'പ്രൊഫഷണൽ കൈമാറ്റം',
  viewDetails: 'വിശദാംശങ്ങൾ കാണുക',
  acceptResponse: 'പ്രതികരണം സ്വീകരിക്കുക',
  viewResponse: 'പ്രതികരണം കാണുക',
  noIncidentsHere: 'ഇവിടെ സംഭവങ്ങളില്ല',
  noIncidentsMatchingFilter: 'ഈ ഫിൽട്ടറുമായി പൊരുത്തപ്പെടുന്ന സംഭവങ്ങളൊന്നും ഇപ്പോൾ ഇല്ല.',
  incidentRoadAccidentDescription: 'റോഡ് അപകടം റിപ്പോർട്ട് ചെയ്തു. സമൂഹത്തിന്റെ സഹായം ആവശ്യമാണ്.',
  incidentTwoWheelerDescription: 'റെസ്പോണ്ടർമാർ നിലവിൽ സംഭവസ്ഥലത്തേക്ക് പോകുകയാണ്.',
  incidentPedestrianDescription: 'പ്രൊഫഷണൽ അടിയന്തര റെസ്പോണ്ടർമാർ ചുമതല ഏറ്റെടുത്തു.',

  //nearby community//

  nearbyCommunityGoldenLinkCommunity: 'GOLDENLINK സമൂഹം',
  nearbyCommunityTitle: 'നിങ്ങളുടെ സമീപത്തുള്ള സമൂഹങ്ങൾ',
  nearbyCommunityDescription: 'സമീപത്തുള്ള GoldenLink സമൂഹങ്ങൾ കണ്ടെത്തുകയും ആവശ്യമായപ്പോൾ സഹായം ഏകോപിപ്പിക്കാൻ കഴിയുന്ന ആളുകളുമായി ബന്ധപ്പെടുകയും ചെയ്യുക.',
  nearbyCommunityMembersNearby: 'സമീപത്തുള്ള സമൂഹ അംഗങ്ങൾ',
  nearbyCommunityNetwork: 'നിങ്ങളുടെ സമീപത്തെ സമൂഹ ശൃംഖല',
  nearbyCommunityLocationDescription: 'നിങ്ങൾ തിരഞ്ഞെടുത്ത ലൊക്കേഷന്റെ അടിസ്ഥാനത്തിലാണ് സമൂഹങ്ങൾ കാണിക്കുന്നത്.',
  nearbyCommunityUseMyLocation: 'എന്റെ ലൊക്കേഷൻ ഉപയോഗിക്കുക',
  nearbyCommunityAll: 'എല്ലാ സമൂഹങ്ങളും',
  nearbyCommunityActiveNowFilter: 'ഇപ്പോൾ സജീവം',
  nearbyCommunityQuietFilter: 'ശാന്തം',
  nearbyCommunityNearbyCommunities: 'സമീപത്തുള്ള സമൂഹങ്ങൾ',
  nearbyCommunityCommunitiesAvailable: 'സമൂഹങ്ങൾ ലഭ്യമാണ്',
  nearbyCommunityActive: 'സജീവ സമൂഹം',
  nearbyCommunityQuiet: 'നിലവിൽ ശാന്തമാണ്',
  nearbyCommunityKm: 'കിമീ',
  nearbyCommunityDistance: 'ദൂരം',
  nearbyCommunityMembers: 'അംഗങ്ങൾ',
  nearbyCommunityActiveNow: 'ഇപ്പോൾ സജീവം',
  nearbyCommunityViewCommunity: 'സമൂഹം കാണുക',
  nearbyCommunityJoin: 'ചേരുക',
  nearbyCommunityNoCommunities: 'സമൂഹങ്ങളൊന്നും കണ്ടെത്തിയില്ല',
  nearbyCommunityChangeFilter: 'സമൂഹ ഫിൽട്ടർ മാറ്റി നോക്കുക.',
  nearbyCommunityFrontendDemo: 'ഇത് നിലവിൽ frontend demonstration ആണ്.',
  nearbyCommunitySafety: 'സമൂഹ സുരക്ഷ',
  nearbyCommunityEmergencySupport: 'അടിയന്തര സഹായം',
  nearbyCommunityNeighbourhood: 'അയൽപ്പക്കം',
  nearbyCommunityAnnaDescription: 'പ്രാദേശിക സന്നദ്ധ പ്രവർത്തകർ സമൂഹ സുരക്ഷയും സഹായവും ഏകോപിപ്പിക്കുന്നു.',
  nearbyCommunityTnDescription: 'പ്രാദേശിക അടിയന്തര പ്രതികരണത്തെ പിന്തുണയ്ക്കുന്ന അയൽപ്പക്ക സംഘം.',
  nearbyCommunityGuindyDescription: 'പ്രാദേശിക വിവരങ്ങളും സഹായവും പങ്കിടുന്ന സമൂഹ സന്നദ്ധ പ്രവർത്തകർ.',
  nearbyCommunityVelacheryDescription: 'താമസക്കാർക്ക് സുരക്ഷിതമായി ഏകോപിപ്പിക്കാൻ സഹായിക്കുന്ന സജീവ സമൂഹ ശൃംഖല.',

  //volunteer-search//

  volunteerGoldenLinkCommunity: 'GOLDENLINK സമൂഹം',
  volunteerSearchTitle: 'സമീപത്തുള്ള സന്നദ്ധപ്രവർത്തകരെ കണ്ടെത്തുക',
  volunteerSearchDescription: 'സമീപത്തുള്ളതും സഹായിക്കാൻ ലഭ്യമായതുമായ വിശ്വസനീയമായ കമ്മ്യൂണിറ്റി റെസ്പോണ്ടർമാരുമായി ബന്ധപ്പെടുക.',
  volunteerYourLocation: 'നിങ്ങളുടെ ലൊക്കേഷൻ',
  volunteerChange: 'മാറ്റുക',
  volunteerSearchPlaceholder: 'സന്നദ്ധപ്രവർത്തകർ, കഴിവുകൾ അല്ലെങ്കിൽ പ്രദേശം തിരയുക...',
  volunteerSearchAriaLabel: 'സന്നദ്ധപ്രവർത്തകരെ തിരയുക',
  volunteerSearchButton: 'തിരയുക',
  volunteerAll: 'എല്ലാം',
  volunteerAvailable: 'ലഭ്യമാണ്',
  volunteerResponding: 'പ്രതികരിക്കുന്നു',
  volunteerNearbyResponders: 'സമീപത്തുള്ള റെസ്പോണ്ടർമാർ',
  volunteerMembersFound: 'കമ്മ്യൂണിറ്റി അംഗങ്ങളെ കണ്ടെത്തി',
  volunteerCommunityVerified: 'കമ്മ്യൂണിറ്റി പരിശോധിച്ചത്',
  volunteerAvailableNow: 'ഇപ്പോൾ ലഭ്യമാണ്',
  volunteerCurrentlyResponding: 'നിലവിൽ പ്രതികരിക്കുന്നു',
  volunteerCurrentlyOffline: 'നിലവിൽ ഓഫ്‌ലൈൻ',
  volunteerUnknown: 'അജ്ഞാതം',
  volunteerDistance: 'ദൂരം',
  volunteerResponse: 'പ്രതികരണം',
  volunteerRating: 'റേറ്റിംഗ്',
  volunteerResponses: 'പ്രതികരണങ്ങൾ',
  volunteerView: 'കാണുക',
  volunteerRequestHelp: 'സഹായം അഭ്യർത്ഥിക്കുക',
  volunteerNoVolunteers: 'സന്നദ്ധപ്രവർത്തകരെ കണ്ടെത്തിയില്ല',
  volunteerTryAnotherFilter: 'മറ്റൊരു ഫിൽട്ടറോ പ്രദേശമോ പരീക്ഷിക്കുക.',
  volunteerHelpRequest: 'സഹായ അഭ്യർത്ഥന',
  volunteerIncidentsSupported: 'പിന്തുണച്ച സംഭവങ്ങൾ',
  volunteerFrontendDemo: 'ഇത് നിലവിൽ frontend demonstration ആണ്.',

  //nearby-responders//

  nearbyFindingResponders: 'സമീപത്തുള്ള റെസ്പോണ്ടർമാരെ കണ്ടെത്തുന്നു...',
  nearbyResponderAssignedSuccessfully: 'റെസ്പോണ്ടറെ വിജയകരമായി നിയോഗിച്ചു!',
  nearbyAcceptedIncidentPreparing: 'സംഭവം സ്വീകരിച്ച് പ്രതികരിക്കാൻ തയ്യാറെടുക്കുന്നു.',
  nearbyEta: 'പ്രതീക്ഷിക്കുന്ന സമയം',
  nearbyOpeningDashboard: 'റെസ്പോണ്ടർ ഡാഷ്ബോർഡ് തുറക്കുന്നു...',
  nearbyNoActiveIncident: 'സജീവമായ GoldenLink സംഭവം കണ്ടെത്തിയില്ല.',
  nearbyUnknown: 'അജ്ഞാതം',
  nearbySerious: 'ഗുരുതരമായത്',
  nearbyLocationUnavailable: 'ലൊക്കേഷൻ ലഭ്യമല്ല',
  nearbyFirstAidTrained: 'പ്രഥമശുശ്രൂഷ പരിശീലനം നേടിയവർ',
  nearbyCommunityVolunteer: 'കമ്മ്യൂണിറ്റി സന്നദ്ധപ്രവർത്തകൻ',
  nearbyFirstResponseVolunteer: 'പ്രഥമ പ്രതികരണ സന്നദ്ധപ്രവർത്തകൻ',
  nearbyFirstAid: 'പ്രഥമശുശ്രൂഷ',
  nearbyTrafficSupport: 'ട്രാഫിക് സഹായം',
  nearbyCommunitySupport: 'കമ്മ്യൂണിറ്റി സഹായം',
  nearbyLocationGuidance: 'ലൊക്കേഷൻ മാർഗനിർദ്ദേശം',
  nearbyEmergencyCommunication: 'അടിയന്തര ആശയവിനിമയം',
  nearbyCommunication: 'ആശയവിനിമയം',
  nearbyCommunityResponse: 'കമ്മ്യൂണിറ്റി പ്രതികരണം',
  nearbyRespondersTitle: 'സമീപത്തുള്ള റെസ്പോണ്ടർമാർ',
  nearbyRespondersDescription: 'സമീപത്ത് സഹായിക്കാൻ ലഭ്യമായ സ്ഥിരീകരിച്ച കമ്മ്യൂണിറ്റി റെസ്പോണ്ടർമാരെ കണ്ടെത്തുക.',
  nearbyActiveIncident: 'സജീവമായ GoldenLink സംഭവം',
  nearbyIncidentId: 'സംഭവ ഐഡി',
  nearbyPeopleAffected: 'ബാധിക്കപ്പെട്ട ആളുകൾ',
  nearbySearchingLocation: 'നിങ്ങളുടെ ലൊക്കേഷന് സമീപം തിരയുന്നു',
  nearbyCurrentAccidentArea: 'നിലവിലെ അപകട മേഖല',
  nearbyRadius: 'പരിധി',
  nearbyAvailableNow: 'ഇപ്പോൾ ലഭ്യമാണ്',
  nearbyLiveAvailability: 'തത്സമയ ലഭ്യത',
  nearbyVerifiedRespondersArea: 'നിങ്ങൾ തിരഞ്ഞെടുത്ത പ്രദേശത്തെ സ്ഥിരീകരിച്ച റെസ്പോണ്ടർമാർ.',
  nearbyPeopleNearby: 'സമീപത്തുള്ള ആളുകൾ',
  nearbyChooseResponder: 'സഹായത്തിനായി അനുയോജ്യമായ റെസ്പോണ്ടറെ തിരഞ്ഞെടുക്കുക.',
  nearbyFound: 'കണ്ടെത്തി',
  nearbyVerified: 'സ്ഥിരീകരിച്ചു',
  nearbyDistance: 'ദൂരം',
  nearbyEstimatedArrival: 'പ്രതീക്ഷിക്കുന്ന എത്തിച്ചേരൽ സമയം',
  nearbyCommunityRating: 'കമ്മ്യൂണിറ്റി റേറ്റിംഗ്',
  nearbyAcceptingIncident: 'സംഭവം സ്വീകരിക്കുന്നു...',
  nearbyIncidentAccepted: 'സംഭവം സ്വീകരിച്ചു',
  nearbyAcceptIncident: 'സംഭവം സ്വീകരിക്കുക',
  nearbyCurrentlyUnavailable: 'നിലവിൽ ലഭ്യമല്ല',
  nearbySafetyPrinciple: 'GoldenLink സുരക്ഷാ തത്വം',
  nearbySafetyDescription: 'GoldenLink നിങ്ങളെ രജിസ്റ്റർ ചെയ്ത കമ്മ്യൂണിറ്റി റെസ്പോണ്ടർമാരുമായി ബന്ധിപ്പിക്കുന്നു. ഗുരുതരമായ സംഭവങ്ങൾക്ക് പ്രൊഫഷണൽ അടിയന്തര സേവനങ്ങൾ തന്നെയാണ് പ്രധാന പ്രതികരണം.',


  // ================================
// REPORT ACCIDENT - MALAYALAM
// ================================


reportAccidentDescription:
  'അപകടം റിപ്പോർട്ട് ചെയ്ത് വേഗത്തിലുള്ള കമ്മ്യൂണിറ്റി സഹായം ഏകോപിപ്പിക്കാൻ സഹായിക്കുക.',
backToHome: 'ഹോമിലേക്ക് മടങ്ങുക',

step: 'ഘട്ടം',
of: 'ൽ',

gpsLocationDescription:
  'രക്ഷാപ്രവർത്തകർക്ക് സംഭവസ്ഥലം കണ്ടെത്താൻ നിങ്ങളുടെ നിലവിലെ GPS ലൊക്കേഷൻ ഉപയോഗിക്കുക.',

detectingYourLocation: 'നിങ്ങളുടെ ലൊക്കേഷൻ കണ്ടെത്തുന്നു',
locationDetectedSuccessfully: 'ലൊക്കേഷൻ വിജയകരമായി കണ്ടെത്തി',
locationDetectionFailed: 'ലൊക്കേഷൻ കണ്ടെത്താനായില്ല',

detectingLocationButton: 'ലൊക്കേഷൻ കണ്ടെത്തുന്നു...',
gpsCoordinatesCaptured: 'GPS കോർഡിനേറ്റുകൾ രേഖപ്പെടുത്തി',


tryAgain: 'വീണ്ടും ശ്രമിക്കുക',

locationHelpBefore: 'നിങ്ങളുടെ',
locationHelpAfter:
  'GPS ലൊക്കേഷൻ ശരിയായ പ്രതികരണക്കാരെ സംഭവവുമായി ബന്ധിപ്പിക്കാൻ GoldenLink-നെ സഹായിക്കുന്നു.',


accidentTypeDescription:
  'നിങ്ങൾ റിപ്പോർട്ട് ചെയ്യുന്ന സംഭവത്തിന്റെ തരം തിരഞ്ഞെടുക്കുക.',


describeWhatYouCanSee: 'നിങ്ങൾക്ക് കാണാൻ കഴിയുന്നത് വിവരിക്കുക...',

howManyPeopleAffected: 'എത്ര പേർക്ക് ബാധിച്ചിരിക്കുന്നു?',
peopleAffectedDescription:
  'സംഭവത്തിൽ ഉൾപ്പെട്ട ആളുകളുടെ ഏകദേശ എണ്ണം തിരഞ്ഞെടുക്കുക.',

unconscious: 'ബോധരഹിതം',
bleeding: 'രക്തസ്രാവം',
breathingDifficulty: 'ശ്വസിക്കാൻ ബുദ്ധിമുട്ട്',
trapped: 'കുടുങ്ങിയിരിക്കുന്നു',


urgencyDescription:
  'നിങ്ങൾക്ക് കാണാൻ കഴിയുന്ന സാഹചര്യത്തെ അടിസ്ഥാനമാക്കി അടിയന്തര നില തിരഞ്ഞെടുക്കുക.',

severityNormal: 'സാധാരണം',
severityModerate: 'മിതമായത്',
severityCritical: 'ഗുരുതരം',

severityNormalDescription:
  'ഉടനടി അപകടമൊന്നും കാണുന്നില്ല.',
severityModerateDescription:
  'മെഡിക്കൽ അല്ലെങ്കിൽ കമ്മ്യൂണിറ്റി സഹായം ആവശ്യമായി വരാം.',
severityCriticalDescription:
  'ഉടനടി അടിയന്തര പ്രതികരണം ആവശ്യമാണ്.',

incident: 'സംഭവം',
notSelected: 'തിരഞ്ഞെടുത്തിട്ടില്ല',
gpsLocation: 'GPS ലൊക്കേഷൻ',
captured: 'രേഖപ്പെടുത്തി',

selectedUrgency: 'തിരഞ്ഞെടുത്ത അടിയന്തര നില',
selectEmergencyLevel: 'അടിയന്തര നില തിരഞ്ഞെടുക്കുക',

activationNote:
  'നിങ്ങൾ നൽകിയ സംഭവ വിവരങ്ങളും ലൊക്കേഷനും അടിസ്ഥാനമാക്കി GoldenLink സമീപത്തെ പ്രതികരണക്കാരെ ഏകോപിപ്പിക്കും.',




communityResponseActivatedSuccessfully:
  'കമ്മ്യൂണിറ്റി പ്രതികരണം വിജയകരമായി സജീവമാക്കി!',
helpCoordinatedForIncident:
  'ഈ സംഭവത്തിനായി സഹായം ഏകോപിപ്പിച്ചുകൊണ്ടിരിക്കുന്നു.',

locationRequired:
  'തുടരുന്നതിന് മുമ്പ് ലൊക്കേഷൻ ആവശ്യമാണ്.',

geolocationNotSupported:
  'ഈ ബ്രൗസർ ജിയോളൊക്കേഷൻ പിന്തുണയ്ക്കുന്നില്ല.',


locationUnavailableDevice:
  'നിങ്ങളുടെ ലൊക്കേഷൻ കണ്ടെത്താനായില്ല.',

locationDetectionTimeout:
  'ലൊക്കേഷൻ കണ്ടെത്താനുള്ള സമയം കഴിഞ്ഞു. വീണ്ടും ശ്രമിക്കുക.',


  // ============================================================
// COMMUNITY - MALAYALAM
// ============================================================

communityGoldenLinkNetwork: 'GoldenLink നെറ്റ്‌വർക്ക്',
communityOurCommunity: 'ഞങ്ങളുടെ സമൂഹം',
communityHeaderDescription:
  'ഒരുമിച്ച്, സാധാരണക്കാർക്ക് ശക്തമായ ആദ്യ പ്രതികരണ ശൃംഖലയായി മാറാം.',

communityPoweredResponse:
  'സമൂഹ അധിഷ്ഠിത പ്രതികരണം',
communityDontJustReport:
  'അപകടം റിപ്പോർട്ട് ചെയ്യുന്നതിൽ മാത്രം നിൽക്കരുത്.',
communityActivateTheCommunity:
  'സമൂഹത്തെ സജീവമാക്കൂ.',
communityHeroDescription:
  'നിങ്ങളുടെ ചുറ്റുപാടുകളിൽ നടക്കുന്ന സംഭവങ്ങളിൽ സഹായിക്കാൻ തയ്യാറുള്ള ആളുകളുമായി GoldenLink നിങ്ങളെ ബന്ധിപ്പിക്കുന്നു.',


communityTotalResponders:
  'ആകെ പ്രതികരിക്കുന്നവർ',
communityAvailableNow:
  'ഇപ്പോൾ ലഭ്യമായവർ',
communityActiveIncidents:
  'സജീവ സംഭവങ്ങൾ',
communityAverageCoverage:
  'ശരാശരി കവറേജ്',

communityNetworkCoverage:
  'നെറ്റ്‌വർക്ക് കവറേജ്',
communityResponseAreas:
  'സമൂഹ പ്രതികരണ മേഖലകൾ',
communityAreasDescription:
  'വിവിധ പ്രദേശങ്ങളിൽ GoldenLink പ്രതികരണക്കാർ എങ്ങനെ വിതരണം ചെയ്തിരിക്കുന്നുവെന്ന് കാണുക.',

communityGoldenLinkCommunity:
  'GoldenLink സമൂഹം',
communityResponders:
  'പ്രതികരണക്കാർ',
communityAvailable:
  'ലഭ്യമാണ്',
communityIncidents:
  'സംഭവങ്ങൾ',
communityCoverage:
  'കവറേജ്',
communityViewCommunity:
  'സമൂഹം കാണുക',
communityWord:
  'സമൂഹം',

communityHowItWorks:
  'ഇത് എങ്ങനെ പ്രവർത്തിക്കുന്നു',
communityOneCommunityFasterHelp:
  'ഒരു സമൂഹം. വേഗത്തിലുള്ള സഹായം.',
communityHowItWorksDescription:
  'ഓരോ സെക്കന്റും പ്രധാനപ്പെട്ടപ്പോൾ GoldenLink സമീപത്തുള്ള ആളുകളെ ഒരുമിച്ച് കൊണ്ടുവരുന്നു.',

communityJoin:
  'ചേരുക',
communityJoinDescription:
  'നിങ്ങളുടെ അടിസ്ഥാന വിവരങ്ങളും പരിശോധനാ സർട്ടിഫിക്കറ്റും നൽകി രജിസ്റ്റർ ചെയ്യുക.',

communityStayConnected:
  'ബന്ധത്തിൽ തുടരുക',
communityStayConnectedDescription:
  'അടിയന്തര സാഹചര്യം റിപ്പോർട്ട് ചെയ്യുമ്പോൾ സമീപത്തുള്ള സമൂഹ പ്രതികരണക്കാരെ GoldenLink തിരിച്ചറിയുന്നു.',

communityRespond:
  'പ്രതികരിക്കുക',
communityRespondDescription:
  'സമീപത്തുള്ള സന്നദ്ധപ്രവർത്തകർ അഭ്യർത്ഥന സ്വീകരിച്ച് ഉടൻ സഹായം നൽകാം.',

communitySaveLives:
  'ജീവൻ രക്ഷിക്കുക',
communitySaveLivesDescription:
  'വേഗത്തിലുള്ള സമൂഹ പ്രതികരണം പ്രൊഫഷണൽ അടിയന്തര സേവനങ്ങൾ എത്തുന്നതിന് മുമ്പുള്ള നിർണായക ഇടവേള കുറയ്ക്കാൻ സഹായിക്കുന്നു.',

communityBePartOfNetwork:
  'GoldenLink നെറ്റ്‌വർക്കിന്റെ ഭാഗമാകൂ',
communityNetworkNote:
  'അടിയന്തര സാഹചര്യത്തിൽ നിങ്ങളുടെ ചെറിയ പ്രവർത്തനം വലിയ മാറ്റമുണ്ടാക്കും. ഒരുമിച്ച് വേഗമേറിയതും സുരക്ഷിതവുമായ സമൂഹ പ്രതികരണ സംവിധാനം നിർമ്മിക്കാം.',

communityRegistrationDescription:
  'സമൂഹ പ്രതികരണക്കാരനായി രജിസ്റ്റർ ചെയ്ത് അടിയന്തര സാഹചര്യങ്ങളിൽ നിങ്ങളുടെ ചുറ്റുമുള്ളവരെ സഹായിക്കുക.',

communityApplicationReceived:
  'അപേക്ഷ ലഭിച്ചു',
communityApplicationSubmitted:
  'അപേക്ഷ വിജയകരമായി സമർപ്പിച്ചു!',
communityThankYou:
  'നന്ദി,',
communityRegistrationSubmitted:
  'നിങ്ങളുടെ രജിസ്ട്രേഷൻ, ഫോട്ടോ, സന്നദ്ധപ്രവർത്തക സർട്ടിഫിക്കറ്റ് എന്നിവ വിജയകരമായി സമർപ്പിച്ചു.',

communityMobileVerified:
  'മൊബൈൽ സ്ഥിരീകരിച്ചു',
communityCertificatePending:
  'സർട്ടിഫിക്കറ്റ് പരിശോധന കാത്തിരിക്കുന്നു',
communityCertificatePendingDescription:
  'നിങ്ങളുടെ സമൂഹ അംഗത്വം സജീവമാക്കുന്നതിന് മുമ്പ് നിങ്ങളുടെ സർട്ടിഫിക്കറ്റ് പരിശോധിക്കും.',
communityDone:
  'പൂർത്തിയായി',

communityVolunteerVerificationRequired:
  'സന്നദ്ധപ്രവർത്തക പരിശോധന ആവശ്യമാണ്',
communityVerificationDescription:
  'നിങ്ങളുടെ ഫോട്ടോയും സാധുവായ സന്നദ്ധപ്രവർത്തക പരിശോധനാ സർട്ടിഫിക്കറ്റും നൽകുക. സമൂഹ പ്രവേശനം സജീവമാക്കുന്നതിന് മുമ്പ് നിങ്ങളുടെ വിവരങ്ങൾ പരിശോധിക്കും.',

communityFullName:
  'പൂർണ്ണ പേര്',
communityFullNamePlaceholder:
  'നിങ്ങളുടെ പൂർണ്ണ പേര് നൽകുക',


communityGender:
  'ലിംഗം',
communitySelectGender:
  'ലിംഗം തിരഞ്ഞെടുക്കുക',
communityMale:
  'പുരുഷൻ',
communityFemale:
  'സ്ത്രീ',
communityOther:
  'മറ്റുള്ളവ',
communityPreferNotToSay:
  'പറയാൻ താൽപ്പര്യമില്ല',

communityPlace:
  'സ്ഥലം',
communityPlacePlaceholder:
  'നഗരം / പട്ടണം / പ്രദേശം',

communityMobilePlaceholder:
  '10 അക്ക മൊബൈൽ നമ്പർ',
communityOtpWillBeSent:
  'ഈ മൊബൈൽ നമ്പറിലേക്ക് OTP അയയ്ക്കും.',

communityGmailAddress:
  'Gmail വിലാസം',
communityGmailPlaceholder:
  'example@gmail.com',
communityOnlyGmail:
  'Gmail വിലാസങ്ങൾ മാത്രമേ സ്വീകരിക്കൂ.',

communityDesignation:
  'പദവി',
communityDesignationPlaceholder:
  'വിദ്യാർത്ഥി / എഞ്ചിനീയർ / ഡ്രൈവർ...',

communityVehicleType:
  'വാഹന തരം',
communitySelectVehicle:
  'വാഹനം തിരഞ്ഞെടുക്കുക',
communityNoVehicle:
  'വാഹനമില്ല',
communityTwoWheeler:
  'ഇരുചക്ര വാഹനം',
communityCar:
  'കാർ',
communityAutoTaxi:
  'ഓട്ടോ / ടാക്സി',
communityVan:
  'വാൻ',
communityTruck:
  'ട്രക്ക്',

communityMaritalStatus:
  'വൈവാഹിക സ്ഥിതി',
communitySelectStatus:
  'സ്ഥിതി തിരഞ്ഞെടുക്കുക',
communityMarried:
  'വിവാഹിതൻ / വിവാഹിത',
communityUnmarried:
  'അവിവാഹിതൻ / അവിവാഹിത',

communityPersonPhoto:
  'വ്യക്തിയുടെ ഫോട്ടോ',
communityPhotoSelected:
  'ഫോട്ടോ വിജയകരമായി തിരഞ്ഞെടുത്തു',
communityUploadPhoto:
  'നിങ്ങളുടെ ഫോട്ടോ അപ്‌ലോഡ് ചെയ്യുക',
communityPhotoFormats:
  'JPG, JPEG അല്ലെങ്കിൽ PNG',

communityVerifiedVolunteerCertificate:
  'പരിശോധിച്ച സന്നദ്ധപ്രവർത്തക സർട്ടിഫിക്കറ്റ്',
communityCertificateSelected:
  'സർട്ടിഫിക്കറ്റ് വിജയകരമായി തിരഞ്ഞെടുത്തു',
communityUploadCertificate:
  'പരിശോധിച്ച സന്നദ്ധപ്രവർത്തക സർട്ടിഫിക്കറ്റ് അപ്‌ലോഡ് ചെയ്യുക',
communityCertificateFormats:
  'PDF, JPG, JPEG അല്ലെങ്കിൽ PNG',

communitySecurityVerification:
  'സുരക്ഷാ പരിശോധന',
communityCaptchaAnswer:
  'ഉത്തരം',
communityRefreshCaptcha:
  'CAPTCHA പുതുക്കുക',

communityVerifyAndSendOtp:
  'പരിശോധിച്ച് OTP അയയ്ക്കുക',

communityMobileVerification:
  'മൊബൈൽ പരിശോധന',
communityVerifyMobileNumber:
  'നിങ്ങളുടെ മൊബൈൽ നമ്പർ പരിശോധിക്കുക',
communityEnterOtpSent:
  'അയച്ച 6 അക്ക OTP നൽകുക',

communityFrontendDemoMode:
  'Frontend demo mode:',
communityDemoOtpSentTo:
  'Demo OTP അയച്ചു',
communityDemoOtp:
  'Demo OTP',
communityNewDemoOtpSentTo:
  'പുതിയ Demo OTP അയച്ചു',

communityOtpExpiresIn:
  'OTP കാലഹരണപ്പെടുന്നത്',
communityOtpExpired:
  'OTP കാലഹരണപ്പെട്ടു.',

communityChangeNumber:
  'നമ്പർ മാറ്റുക',
communityCompleteRegistration:
  'രജിസ്ട്രേഷൻ പൂർത്തിയാക്കുക',

communityDidntReceiveOtp:
  'OTP ലഭിച്ചില്ലേ?',
communityResendOtp:
  'OTP വീണ്ടും അയയ്ക്കുക',

communityPhotoFormatError:
  'JPG, JPEG അല്ലെങ്കിൽ PNG ചിത്രം അപ്‌ലോഡ് ചെയ്യുക.',
communityCertificateFormatError:
  'PDF, JPG, JPEG അല്ലെങ്കിൽ PNG സർട്ടിഫിക്കറ്റ് അപ്‌ലോഡ് ചെയ്യുക.',

communityIncorrectCaptcha:
  'തെറ്റായ CAPTCHA. വീണ്ടും ശ്രമിക്കുക.',

communityOtpExpiredRequest:
  'OTP കാലഹരണപ്പെട്ടു. പുതിയ OTP അഭ്യർത്ഥിക്കുക.',

communityEnterSixDigitOtp:
  '6 അക്ക OTP നൽകുക.',

communityIncorrectOtp:
  'തെറ്റായ OTP. OTP പരിശോധിച്ച് വീണ്ടും ശ്രമിക്കുക.',

communityEnterName:
  'നിങ്ങളുടെ പേര് നൽകുക.',
communitySelectDob:
  'നിങ്ങളുടെ ജനന തീയതി തിരഞ്ഞെടുക്കുക.',
communityEnterPlace:
  'നിങ്ങളുടെ സ്ഥലം നൽകുക.',
communityEnterMobile:
  'നിങ്ങളുടെ മൊബൈൽ നമ്പർ നൽകുക.',
communityMobileTenDigits:
  'മൊബൈൽ നമ്പറിൽ കൃത്യമായി 10 അക്കങ്ങൾ ഉണ്ടായിരിക്കണം.',
communityEnterGmail:
  'നിങ്ങളുടെ Gmail വിലാസം നൽകുക.',
communityValidGmail:
  '@gmail.com ൽ അവസാനിക്കുന്ന സാധുവായ Gmail വിലാസം നൽകുക.',
communitySelectMaritalStatus:
  'നിങ്ങളുടെ വൈവാഹിക സ്ഥിതി തിരഞ്ഞെടുക്കുക.',
communityEnterDesignation:
  'നിങ്ങളുടെ പദവി നൽകുക.',
communityVerifyMobileBeforeSubmit:
  'സമർപ്പിക്കുന്നതിന് മുമ്പ് നിങ്ങളുടെ മൊബൈൽ നമ്പർ പരിശോധിക്കുക.',

  // ACCIDENT RECORDS
accidentRecordsGoldenLinkHistory: 'GoldenLink ചരിത്രം',
accidentRecordsTitle: 'അപകട രേഖകൾ',
accidentRecordsDescription: 'നിങ്ങൾ റിപ്പോർട്ട് ചെയ്ത സംഭവങ്ങളും അവയുടെ പ്രതികരണ നിലയും ട്രാക്ക് ചെയ്യുക.',

accidentRecordsTotalReports: 'ആകെ റിപ്പോർട്ടുകൾ',
accidentRecordsActive: 'സജീവം',
accidentRecordsResponding: 'പ്രതികരിക്കുന്നു',
accidentRecordsHandedOver: 'കൈമാറി',
accidentRecordsCompleted: 'പൂർത്തിയായി',

accidentRecordsFilterIncidents: 'സംഭവങ്ങൾ ഫിൽട്ടർ ചെയ്യുക',

accidentRecordsCommunityResponseActive: 'കമ്മ്യൂണിറ്റി പ്രതികരണം സജീവമാണ്',
accidentRecordsRespondersOnTheWay: 'പ്രതികരണ പ്രവർത്തകർ വഴിയിലാണ്',
accidentRecordsProfessionalHandoverCompleted: 'പ്രൊഫഷണൽ കൈമാറ്റം പൂർത്തിയായി',
accidentRecordsResponseCompleted: 'പ്രതികരണം പൂർത്തിയായി',
accidentRecordsUnknownStatus: 'നില അറിയില്ല',

accidentRecordsViewIncident: 'സംഭവം കാണുക',

accidentRecordsNoIncidentsFound: 'സംഭവങ്ങളൊന്നും കണ്ടെത്തിയില്ല',
accidentRecordsNoRecordsCategory: 'ഈ വിഭാഗത്തിൽ അപകട രേഖകളൊന്നുമില്ല.',

accidentRecordsGoldenLinkIncident: 'GoldenLink സംഭവം',
accidentRecordsIncidentDetails: 'സംഭവ വിശദാംശങ്ങൾ',
accidentRecordsCloseIncidentDetails: 'സംഭവ വിശദാംശങ്ങൾ അടയ്ക്കുക',

accidentRecordsIncidentId: 'സംഭവ ID',
accidentRecordsAccidentType: 'അപകട തരം',
accidentRecordsSeverity: 'തീവ്രത',
accidentRecordsVictims: 'ബാധിതർ',

accidentRecordsVictimInformation: 'ബാധിതരുടെ വിവരങ്ങൾ',
accidentRecordsSomeoneUnconscious: 'ഒരാൾ ബോധരഹിതനാണ്',
accidentRecordsHeavyBleeding: 'കനത്ത രക്തസ്രാവം റിപ്പോർട്ട് ചെയ്തു',
accidentRecordsPersonTrapped: 'വ്യക്തി കുടുങ്ങിയിരിക്കുന്നു അല്ലെങ്കിൽ നീങ്ങാൻ കഴിയുന്നില്ല',

accidentRecordsIncidentLocation: 'സംഭവ സ്ഥലം',
accidentRecordsOpenInMaps: 'മാപ്പിൽ തുറക്കുക',

accidentRecordsReportDescription: 'റിപ്പോർട്ട് വിവരണം',

accidentRecordsAiAssessment: 'AI വിലയിരുത്തൽ',
accidentRecordsGoldenLinkAiAnalysis: 'GoldenLink AI വിശകലനം',
accidentRecordsConfidence: 'വിശ്വാസ്യത',
accidentRecordsCloseDetails: 'വിശദാംശങ്ങൾ അടയ്ക്കുക',

accidentRecordsDefaultDescription: 'GoldenLink വഴി അപകടം റിപ്പോർട്ട് ചെയ്തു.',

accidentRecordsUnknown: 'അജ്ഞാതം',
accidentRecordsUnknownTime: 'സമയം അറിയില്ല',
accidentRecordsJustNow: 'ഇപ്പോൾ തന്നെ',
accidentRecordsMinutesAgo: '{count} മിനിറ്റ് മുമ്പ്',
accidentRecordsHoursAgo: '{count} മണിക്കൂർ മുമ്പ്',
accidentRecordsYesterday: 'ഇന്നലെ',
accidentRecordsDaysAgo: '{count} ദിവസം മുമ്പ്',

accidentRecordsNoResponderAssigned: 'പ്രതികരണ പ്രവർത്തകനെ നിയോഗിച്ചിട്ടില്ല',

// AI ASSISTANT
aiGoldenLinkAi: 'GOLDENLINK AI',
aiEmergencyAssistant: 'അടിയന്തര സഹായി',
aiAssistantDescription: 'AI സഹായത്തോടെയുള്ള സംഭവം വിലയിരുത്തലും പ്രതികരണ ഏകോപനവും',
aiEmergencyResponseAssistant: 'അടിയന്തര പ്രതികരണ സഹായി',

aiWelcome: 'നമസ്കാരം. ഞാൻ GoldenLink AI, നിങ്ങളുടെ അടിയന്തര പ്രതികരണ സഹായിയാണ്.',
aiNoActiveIncident: 'നിലവിൽ സജീവമായ സംഭവങ്ങളൊന്നുമില്ല. ആദ്യം ഒരു അപകടം റിപ്പോർട്ട് ചെയ്യാം, അല്ലെങ്കിൽ പൊതുവായ അടിയന്തര പ്രതികരണ മാർഗനിർദേശം ചോദിക്കാം.',

aiConnectedToIncident: 'ഞാൻ #{incidentId} എന്ന സംഭവവുമായി ബന്ധിപ്പിച്ചിരിക്കുന്നു. നിലവിലെ അടിയന്തര സാഹചര്യം മനസ്സിലാക്കാനും പ്രതികരണം ഏകോപിപ്പിക്കാനും സഹായിക്കാം.',
aiExistingAssessment: 'നിലവിലെ സംഭവം {severity} ആയി വിലയിരുത്തിയിട്ടുണ്ട്. വിലയിരുത്തലിന്റെ വിശ്വാസ്യത {confidence}% ആണ്.',
aiQuickAssessmentIntro: 'സംഭവം വിലയിരുത്താൻ സഹായിക്കുന്നതിന് കുറച്ച് വേഗത്തിലുള്ള ചോദ്യങ്ങൾ ചോദിക്കാം.',

aiQuestionAtLocation: 'നിങ്ങൾ ഇപ്പോൾ അപകടസ്ഥലത്താണോ?',
aiQuestionInjuredPeople: 'എത്ര പേർക്ക് പരിക്കേറ്റിട്ടുണ്ട്?',
aiQuestionUnconscious: 'ആരെങ്കിലും ബോധരഹിതരാണോ?',
aiQuestionHeavyBleeding: 'ആർക്കെങ്കിലും കനത്ത രക്തസ്രാവമുണ്ടോ?',
aiQuestionBreathingDifficulty: 'ആർക്കെങ്കിലും ശ്വസിക്കാൻ ബുദ്ധിമുട്ടുണ്ടോ?',
aiQuestionTrapped: 'ആരെങ്കിലും വാഹനത്തിനുള്ളിൽ കുടുങ്ങിയിരിക്കുകയോ നീങ്ങാൻ കഴിയാതിരിക്കുകയോ ചെയ്യുന്നുണ്ടോ?',

aiGeneralResponse: 'അടിയന്തര പ്രതികരണ ഏകോപനത്തിൽ എനിക്ക് സഹായിക്കാം. സുരക്ഷിതമായ സ്ഥലത്ത് തുടരുക, പരിക്കേറ്റവരെ അനാവശ്യമായി നീക്കുന്നത് ഒഴിവാക്കുക, അടിയന്തര സേവനങ്ങളുടെ നിർദ്ദേശങ്ങൾ പാലിക്കുക.',

aiBleedingResponse: 'ആർക്കെങ്കിലും കനത്ത രക്തസ്രാവമുണ്ടെങ്കിൽ ഉടൻ അടിയന്തര വൈദ്യസഹായം തേടുക. സുരക്ഷിതമാണെങ്കിൽ വൃത്തിയുള്ള തുണിയോ ഗോസോ ഉപയോഗിച്ച് മുറിവിൽ ഉറച്ച സമ്മർദ്ദം നൽകുക.',

aiUnconsciousResponse: 'ആരെങ്കിലും ബോധരഹിതനാണെങ്കിൽ അല്ലെങ്കിൽ പ്രതികരിക്കുന്നില്ലെങ്കിൽ ഉടൻ അടിയന്തര സേവനങ്ങളുമായി ബന്ധപ്പെടുക. അവർ ശ്വസിക്കുന്നുണ്ടോ എന്ന് പരിശോധിക്കുകയും അടിയന്തര സേവനങ്ങളുടെ നിർദ്ദേശങ്ങൾ പാലിക്കുകയും ചെയ്യുക.',

aiBreathingResponse: 'ശ്വസിക്കാൻ ബുദ്ധിമുട്ട് ഒരു അടിയന്തര മുന്നറിയിപ്പ് ലക്ഷണമാണ്. ഉടൻ അടിയന്തര സേവനങ്ങളുമായി ബന്ധപ്പെടുകയും പ്രൊഫഷണൽ സഹായം എത്തുന്നതുവരെ വ്യക്തിയെ സുരക്ഷിതമായ നിലയിൽ നിർത്തുകയും ചെയ്യുക.',

aiTrappedResponse: 'തീ പോലുള്ള ഉടനടി അപകടമില്ലെങ്കിൽ കുടുങ്ങിയ വ്യക്തിയെ ബലമായി പുറത്തെടുക്കാൻ ശ്രമിക്കരുത്. അടിയന്തര സേവനങ്ങളുമായി ബന്ധപ്പെടുകയും പരിശീലനം ലഭിച്ച പ്രതികരണ പ്രവർത്തകർ വരുന്നത് വരെ കാത്തിരിക്കുകയും ചെയ്യുക.',

aiResponderResponse: 'ഈ സംഭവത്തിന് നിയോഗിച്ച പ്രതികരണ പ്രവർത്തകനെ Responder Dashboard-ൽ കാണാം. അപകടസ്ഥലം പ്രവേശനയോഗ്യമാക്കി വയ്ക്കുകയും പ്രതികരണ പ്രവർത്തകർ എത്തുമ്പോൾ അവരുടെ നിർദ്ദേശങ്ങൾ പാലിക്കുകയും ചെയ്യുക.',

aiCriticalAssessment: 'റിപ്പോർട്ട് ചെയ്ത സാഹചര്യങ്ങൾ ഉടൻ പ്രതികരണ ഏകോപനം ആവശ്യമായ ഗുരുതരമായ അടിയന്തരാവസ്ഥയെ സൂചിപ്പിക്കുന്നു.',
aiSeriousAssessment: 'ഒന്നിലധികം പേർക്ക് പരിക്കേറ്റതായി റിപ്പോർട്ട് ചെയ്തിട്ടുണ്ട്. വേഗത്തിലുള്ള കമ്മ്യൂണിറ്റി, അടിയന്തര സഹായം ശുപാർശ ചെയ്യുന്നു.',
aiModerateAssessment: 'റിപ്പോർട്ട് ചെയ്ത സംഭവത്തിന് സഹായവും നിരീക്ഷണവും ആവശ്യമാണ്. കമ്മ്യൂണിറ്റി പ്രതികരണം ഏകോപിപ്പിക്കാം.',

aiAssessmentCompleted: 'നന്ദി. പ്രാഥമിക സംഭവം വിലയിരുത്തൽ പൂർത്തിയാക്കി.',
aiAssessmentResult: 'സംഭവം {severity} ആയി വിലയിരുത്തിയിട്ടുണ്ട്. നിലവിലെ പ്രതികരണ നിലയെ അടിസ്ഥാനമാക്കി സഹായ ഏകോപനം തുടരാം.',

aiAskAnythingPlaceholder: 'GoldenLink AI-യോട് എന്തും ചോദിക്കാം...',
aiSendMessage: 'സന്ദേശം അയയ്ക്കുക',
aiInputHelp: 'ഈ സംഭവം, അടിയന്തര പ്രതികരണം, രക്തസ്രാവം, ശ്വാസതടസം, പ്രതികരണ പ്രവർത്തകർ, അല്ലെങ്കിൽ സഹായം എത്തുന്നതുവരെ എന്ത് ചെയ്യണം എന്നതിനെക്കുറിച്ച് ചോദിക്കാം.',
aiDisclaimer: 'GoldenLink AI പ്രതികരണ ഏകോപന സഹായം നൽകുന്നു; മെഡിക്കൽ രോഗനിർണയം നൽകുന്നില്ല.',

aiAssessment: 'AI വിലയിരുത്തൽ',
aiAssessmentInProgress: 'വിലയിരുത്തൽ പുരോഗതിയിൽ',
aiAssessmentWaitingDescription: 'അടിയന്തര സാഹചര്യം മനസ്സിലാക്കാൻ GoldenLink-നെ സഹായിക്കുന്നതിന് ചോദ്യങ്ങൾക്ക് ഉത്തരം നൽകുക.',
aiIncidentAssessment: 'AI സംഭവം വിലയിരുത്തൽ',
aiReportedConditions: 'റിപ്പോർട്ട് ചെയ്ത സാഹചര്യങ്ങൾ',
aiActivateCommunityResponse: 'കമ്മ്യൂണിറ്റി പ്രതികരണം സജീവമാക്കുക',
aiSafetyNote: 'സുരക്ഷിതമായ സ്ഥലത്ത് തുടരുകയും അടിയന്തര സേവനങ്ങളുടെ നിർദ്ദേശങ്ങൾ പാലിക്കുകയും ചെയ്യുക.',

aiNotRequested: 'അഭ്യർത്ഥിച്ചിട്ടില്ല',
confidence: 'വിശ്വാസ്യത',

    },


      // ============================================================
      // TANGLISH
      // ============================================================
      tl: {

        // Navigation
        home: 'Home',
        reportAccident: 'Accident Report Pannu',
        community: 'Community',
        nearbyResponders: 'Pakkathula Irukkura Responders',
        volunteers: 'Volunteers',
        aiAssistant: 'GoldenLink AI',
        profile: 'Profile',
        selectLanguage: 'Language Select Pannu',

        // Home
        activateCommunity: 'Community-a Activate Pannu',
        CommunityResponse: 'Community Response',
        duringGoldenHour: 'Golden Hour time-la',
        DontJustReport: 'Accident-a report pannitu mattum irukka vendam.',
        responderDashboard: 'Responder Dashboard',
        emergencyResponse: 'Emergency Response',
        witnessedAccident: 'Accident-a neenga paatheengala?',
        reportIncidentQuickly:
          'Accident-a quick-a report panni, critical Golden Hour time-la pakkathula irukkura community responders-a activate pannunga.',
        ActivateCommunity: 'Community-a Activate Pannu',

        HelpCanStart: 'Help Start Aagalam',
        WithPeopleNearby: 'Pakkathula Irukkura People-oda',
        GoldenlinkConnects:
          'GoldenLink help thevai padura people-a pakkathula irukkura trained community responders-oda connect pannum.',

        NearbyResponders: 'Pakkathula Irukkura Responders',
        IdentifyResponders:
          'Incident pakkathula available-a irukkura trained responders-a identify pannunga.',

        VerifiedSkills: 'Verified Skills',
        ResponderProfiles:
          'Verified responder profiles-um avanga emergency skills-um paakkalam.',

        RoleBasedSupport: 'Role-Based Support',
        DifferentPeople:
          'Different people different types of emergency support provide panna mudiyum.',

        localLanguages: 'Local Languages',
        simpleGuidance:
          'Familiar local languages-la simple emergency guidance kidaikkum.',

        // Why GoldenLink
        whyGoldenLink: 'Why GoldenLink?',
        dontJustReport: 'Accident-a report pannitu mattum irukka vendam.',
        coordinate: 'Coordinate Pannunga.',
        whyGoldenLinkDescription:
          'Accident nadakkura time-lendhu victim-ku effective help reach aagura varaikkum irukkura coordination gap-a reduce panna GoldenLink design pannirukku.',

        communityCoordination: 'Community Coordination',
        communityCoordinationDescription:
          'Pakkathula irukkura people ellarum ore velai panna try pannama simple roles-la organise pannalaam.',

        locationAwareResponse: 'Location-Aware Response',
        locationAwareResponseDescription:
          'Incident-um responder-um irukkura location-a use panni accident-a pakkathula irukkura suitable responders-oda connect panna system help pannum.',

        suitableResponders: 'Suitable Responders',
        suitableRespondersDescription:
          'Responder matching-la availability, distance, skills and registered training consider pannalaam.',

        multilingualGuidance: 'Multilingual Guidance',
        multilingualGuidanceDescription:
          'Interface English, Tamil and accessible regional languages-la communication support pannum.',

        simpleRoles: 'Simple Roles',
        simpleRolesDescription:
          'Ovvoru participant-kum clear-aana task kudukkappadum, appo response-a understand panni coordinate panna easy-aa irukkum.',

        professionalHandover: 'Professional Handover',
        professionalHandoverDescription:
          'Suitable professional responders vandhu responsibility edukkura varaikkum GoldenLink community response-ku support pannum.',

        ourCoreInnovation: 'OUR CORE INNOVATION',
        coordinationLayerGoldenHour:
          'Golden Hour-kkaana coordination layer.',
        existingSystemsCanCall:
          'Existing systems call, inform illa guide panna mudiyum. GoldenLink pakkathula irukkura people-a specific-aana safe actions-la coordinate pannuradhula focus pannum.',

        // Community responder
        communityResponder: 'Community Responder',
        readyToHelp: 'Golden Hour time-la help panna ready-aa?',
        joinResponderNetwork:
          'GoldenLink responder network-la join pannunga. Nearby incidents-a paarunga, response requests accept pannunga, community support-a coordinate pannunga.',

        // Common buttons
        emergency: 'Emergency',
        helpNow: 'Ippo Help Get Pannu',
        back: 'Back',
        next: 'Next',
        previous: 'Previous',
        cancel: 'Cancel',
        submit: 'Submit',
        save: 'Save',
        close: 'Close',
        search: 'Search',
        view: 'View',
        continue: 'Continue',
        confirm: 'Confirm',
        edit: 'Edit',
        delete: 'Delete',
        retry: 'Retry',
        refresh: 'Refresh',
        loading: 'Loading...',
        yes: 'Yes',
        no: 'No',

        // Location
        detectMyLocation: 'En Location-a Detect Pannu',
        locationCaptured: 'Location Captured',
        whereAccidentHappened: 'Accident enga nadandhuchu?',
        detectingLocation: 'Unga location detect pannitu irukku...',
        locationDetected: 'Location successful-a detect aayiduchu.',
        locationNotAvailable: 'Location available illa.',
        locationPermissionDenied:
          'Location permission deny aayiduchu. Browser-la location access enable pannunga.',
        locationError:
          'Unga location-a detect panna mudiyala. Please try again.',
        latitude: 'Latitude',
        longitude: 'Longitude',
        currentLocation: 'Current Location',

        // Accident
        whatHappened: 'Enna nadandhuchu?',
        roadAccident: 'Road Accident',
        twoWheelerAccident: 'Two-Wheeler Accident',
        pedestrianIncident: 'Pedestrian Incident',
        notSure: 'Theriyala',

        peopleAffected: 'Evlo per affect aagirukkaanga?',
        onePerson: '1 Person',
        twoPeople: '2 People',
        threePeople: '3 People',
        fourPeople: '4 People',
        fivePeople: '5 People',
        fivePlusPeople: '5+ People',

        additionalInformation: 'Additional Information',
        describeWhatYouSee: 'Neenga paakradha describe pannunga...',

        howUrgent: 'Situation evlo urgent-aa irukku?',
        normal: 'Normal',
        moderate: 'Moderate',
        critical: 'Critical',

        activateGoldenLink: 'GoldenLink-a Activate Pannu',

        // Messages
        success: 'Success',
        accidentReportedSuccessfully:
          'Accident successful-a report panniduchu.',
        nearbyRespondersNotified:
          'Nearby responders-ku notification send panniduchu.',
        somethingWentWrong:
          'Something went wrong. Please try again.',
        requiredField:
          'Indha field required.',
        invalidInput:
          'Please valid value enter pannunga.',

        // AI Assistant
        askGoldenLinkAI: 'GoldenLink AI-kitta edhavadhu kelunga...',
        accidentLocationQuestion:
          'Neenga ippo accident location-la irukkeengala?',
        injuredPeopleQuestion:
          'Evlo per injured-a irukkaanga?',
        unconsciousQuestion:
          'Yaaravadhu unconscious-aa irukkaangala?',
        heavyBleedingQuestion:
          'Yaaravadhu heavy bleeding-la irukkaangala?',
        breathingDifficultyQuestion:
          'Yaarukkavadhu breathing difficulty irukka?',
        trappedQuestion:
          'Yaaravadhu vehicle-kulla trapped-aa irukkaangala illa move panna mudiyalaiya?',
        yesAnswer: 'Yes',
        noAnswer: 'No',
        thinking: 'GoldenLink AI think pannitu irukku...',
        aiEmergencyGuidance: 'Emergency Guidance',
        aiResponse: 'AI Response',

        // Status
        active: 'Active',
        inactive: 'Inactive',
        available: 'Available',
        unavailable: 'Unavailable',
        pending: 'Pending',
        accepted: 'Accepted',
        rejected: 'Rejected',
        completed: 'Completed',
        cancelled: 'Cancelled',
        responding: 'Responding',
        resolved: 'Resolved',

        // Responder
        incidentResponse: 'Incident Response',
        responderProfile: 'Responder Profile',
        responderStatus: 'Responder Status',
        availableResponders: 'Available Responders',
        acceptRequest: 'Request Accept Pannu',
        declineRequest: 'Request Decline Pannu',
        responseStarted: 'Response start aayiduchu.',
        responseCompleted: 'Response complete aayiduchu.',

        // Community
        joinCommunity: 'Community-la Join Pannu',
        volunteerSearch: 'Volunteer Search',
        nearbyCommunity: 'Nearby Community',

        // Registration
        name: 'Name',
        dateOfBirth: 'Date of Birth',
        mobileNumber: 'Mobile Number',
        emailAddress: 'Email Address',
        applicantPhoto: 'Applicant Photo',
        verifiedCertificate: 'Verified Certificate',
        captcha: 'CAPTCHA',
        otpVerification: 'OTP Verification',
        enterOtp: 'OTP Enter Pannu',
        sendOtp: 'OTP Send Pannu',
        verifyOtp: 'OTP Verify Pannu',

        // Records
        accidentRecords: 'Accident Records',
        incidentRecords: 'Incident Records',
        noRecordsFound: 'Records edhuvum kidaikkala.',
        incidentDetails: 'Incident Details',
        reportedAt: 'Reported At',
        status: 'Status',
        severity: 'Severity',
        location: 'Location',

        // Footer
        quickLinks: 'Quick Links',
        emergencySupport: 'Emergency Support',
        communitySupport: 'Community Support',
        allRightsReserved: 'All rights reserved.',

        // Workflow
        goldenLinkResponseNetwork: 'GoldenLink Response Network',
        fromAccident: 'Accident-la irundhu',
        toCoordinatedResponse: 'coordinated response varaikkum.',
        workflowIntroduction:
          'GoldenLink accident suththi irukkura people-a connect panni, Golden Hour time-la ovvoru responder-kum simple-aana meaningful role kudukkum.',

        workflowReport: 'Report',
        workflowReportDescription:
          'Thevaiyaana location-um situation details-um use panni accident report pannapadum.',

        workflowTriage: 'Triage',
        workflowTriageDescription:
          'Simple questions correct response pathway-a identify panna help pannum.',

        workflowMatch: 'Match',
        workflowMatchDescription:
          'Availability-um skills-um base panni pakkathula irukkura suitable responders identify pannapaduvaanga.',

        workflowGuide: 'Guide',
        workflowGuideDescription:
          'Responders-ku simple-aana approved step-by-step guidance kidaikkum.',

        workflowCoordinate: 'Coordinate',
        workflowCoordinateDescription:
          'Different responders-ku different tasks kuduthu community-a together work panna vaikkum.',

        workflowHandover: 'Handover',
        workflowHandoverDescription:
          'Professional emergency responders vandha udane avanga response-a take over pannuvaanga.',

        workflowLearn: 'Learn',
        workflowLearnDescription:
          'Response data future-la irukkura gaps-a identify panni readiness improve panna help pannum.',

          //community-preview//

          communityResponse: 'Community Response',
  rightPeople: 'Sariyaana people',
  canMakeDifference: 'difference create panna mudiyum.',
  communityPreviewDescription:
    'GoldenLink accident nadandha place-ku pakkathula irukkura people-ai Golden Hour time-la useful community support-oda connect panna help pannum.',
  exploreCommunity: 'Community Explore Pannunga',
  becomeResponder: 'Responder-aa Join Pannunga',
  nearbyHelp: 'Pakkathula Help',
  nearbyHelpDescription:
    'Incident-ku pakkathula irukkura registered community responders-ai kandupidikkalam.',
  trustedResponders: 'Nambikkaiyana Responders',
  trustedRespondersDescription:
    'Responders profile-la avanga skills, availability matrum experience details irukkum.',
  localSupport: 'Local Support',
  localSupportDescription:
    'Local languages matrum clear instructions moolama guidance-ai easy-aa understand panna mudiyum.',
  clearRoles: 'Clear Roles',
  clearRolesDescription:
    'Ellarum ore velai seyyama, ovvoru responder-kum suitable tasks kudukka mudiyum.',

    //emergency-cta//

    goldenHourResponse: 'Golden Hour Response',
  whenEverySecondMatters: 'Ovvoru second-um mukkiyama irukkumbodhu,',
  knowWhatToDo: 'enna seiyanum-nu therinjirukkanum.',
  emergencyCtaDescription:
    'Accident-ai report panni, professional emergency services take over pannum varai incident sutriyulla suitable people-oda help-ai activate panna support pannunga.',
  goldenLinkEmergencyDisclaimer:
    'GoldenLink AI community coordination-ku support pannum. Idhu ambulance, doctors, police illa professional emergency services-ku replacement illa.',


    //footer//

    footerDescription:
    'Golden Hour-kkaana AI-assisted community response network.',
  footerTagline:
    'Accident-ai report pannitu mattum irukkadheenga. Community-ai activate pannunga.',
  goldenLink: 'GoldenLink',
  howItWorks: 'Idhu Eppadi Work Aagum',
  footercommunity: 'Community',
  responders: 'Responders',
  support: 'Support',
  help: 'Help',
  safety: 'Safety',
  privacy: 'Privacy',
  copyright: '© 2026 GoldenLink AI',
  builtForYuva: 'YUVA Future 6.0-kkaaga uruvaakkappattadhu',

  //emergency-button//

  emergencyAssistance: 'Emergency Assistance',
  emergencyQuestion: 'Neenga accident-ai paakureengala illa emergency situation-ai face panreengala?',
  call112: '112-ku Call Pannunga',

  // ============================================================
  // RESPONDER DASHBOARD
  // ============================================================

  responderIncidentInformationUpdated:
    'Incident information update aayiduchu.',
  responderNoActiveIncident:
    'Active Incident Illa',
  responderNoActiveIncidentDescription:
    'Ippo ungaakku active incident edhuvum assign pannala.',
  responderViewNearbyResponders:
    'Pakkathula Irukkura Responders-a Paakkunga',

  responderDashboardTitle:
    'Responder Dashboard',
  responderEmergencyResponse:
    'Emergency Response',
  responderDashboardDescription:
    'Ungalukku assign pannina incident-a manage panni, Golden Hour time-la emergency response-a coordinate pannunga.',

  responderActiveIncident:
    'Active Incident',
  responderResponseProgress:
    'RESPONSE PROGRESS',
  responderLive:
    'Live',
  responderAssigned:
    'Assigned',
  responderOnTheWay:
    'Way-la Irukku',
  responderOnScene:
    'Scene-la',
  responderComplete:
    'Complete',

  responderIncidentInformation:
    'INCIDENT INFORMATION',
  responderAccidentDetails:
    'Accident Details',
  responderAccidentType:
    'Accident Type',
  responderNotSpecified:
    'Specify pannala',
  responderPeopleAffected:
    'Affected People',
  responderUnconscious:
    'Unconscious',
  responderBleeding:
    'Bleeding',
  responderBreathingDifficulty:
    'Breathing Difficulty',
  responderTrapped:
    'Trapped',
  responderReporterDescription:
    'Reporter Description',

  responderAccidentLocation:
    'ACCIDENT LOCATION',
  responderRespondHere:
    'Inga Respond Pannu',
  responderReportedLocation:
    'Reported Location',
  responderOpenLocationInMaps:
    'Maps-la Location Open Pannu',

  responderAssignment:
    'ASSIGNMENT',
  responderEta:
    'ETA',
  responderVerified:
    'Verified',

  responderOptionalAiSupport:
    'OPTIONAL AI SUPPORT',
  responderGoldenLinkAiAssistant:
    'GoldenLink AI Assistant',
  responderAiSupportDescription:
    'Incident-ku response pannumbodhu additional AI guidance-a get pannunga.',
  responderOpenAiAssistant:
    'AI Assistant-a Open Pannu',

  responderResponseControl:
    'RESPONSE CONTROL',
  responderUpdateResponse:
    'Update Response',
  responderUpdateResponseDescription:
    'Unga current response status-a update pannunga.',
  responderImOnTheWay:
    'Naan Way-la Irukken',
  responderIveArrived:
    'Naan Vandhuten',
  responderHandOverEmergencyServices:
    'Emergency Services-kitta Hand Over Pannu',
  responderCompleteResponse:
    'Response-a Complete Pannu',

  responderResponseCompleted:
    'Response Completed',
  responderIncidentSuccessfullyClosed:
    'Indha incident successful-a close aayiduchu.',

  responderSafetyPrinciple:
    'GoldenLink Responder Safety Principle',
  responderSafetyNote:
    'Safe response practices-a follow pannunga. Ungala illa vera yaaraiyum unnecessary risk-la poda vendam.',

  responderAccidentRecords:
    'Accident Records',

  responderAssignedMessage:
    'Indha incident-ku neenga assign pannappatteenga.',
  responderEnRouteMessage:
    'Neenga incident location-ku way-la irukkeenga.',
  responderOnSceneMessage:
    'Neenga incident location-ku vandhutteenga.',
  responderHandedOverMessage:
    'Incident emergency services-kitta hand over panniduchu.',
  responderCompletedMessage:
    'Response complete aayiduchu.',
  responderActiveMessage:
    'Neenga indha incident-ku active-a response pannitu irukkeenga.',

  responderSeverityCritical:
    'Critical',
  responderSeveritySerious:
    'Serious',
  responderSeverityModerate:
    'Moderate',

  responderMarkedOnTheWay:
    'Response status "Way-la Irukku" nu update aayiduchu.',
  responderArrivalRecorded:
    'Unga arrival record panniduchu.',
  responderIncidentHandedOver:
    'Incident emergency services-kitta hand over panniduchu.',
  responderResponseCompletedSuccessfully:
    'Response successful-a complete aayiduchu.',

  responderCurrentAccidentLocation:
    'Current Accident Location',
  responderLocationUnavailable:
    'Location Available Illa',

  responderAssignedResponder:
    'Assigned Responder',
  responderCommunityResponder:
    'Community Responder',
  responderPerson:
    'Person',
  responderPeople:
    'People',

    //responder-profile//

    responderAccount: 'Responder Account',
  myProfile: 'En Profile',
  responderProfileDescription: 'Ungal responder information matrum availability-ai manage pannunga.',
  editProfile: 'Profile-ai Edit Pannunga',
  profileEditingSoon: 'Profile editing seekiram available aagum.',
  availableToRespond: 'Respond panna Available',
  currentlyUnavailable: 'Ippo Available illa',
  responderId: 'Responder ID',
  responderAvailability: 'Responder Availability',
  youAreAvailable: 'Neenga Available-a irukeenga',
  youAreUnavailable: 'Neenga Available-a illa',
  availableDescription: 'Ungalukku pakkathula irukkura emergency response requests varum.',
  unavailableDescription: 'Ungalukku pudhu response requests varaadhu.',
  responses: 'Responses',
  successful: 'Successful',
  rating: 'Rating',
  responderInformation: 'Responder Information',
  currentArea: 'Current Area',
  joinedGoldenLink: 'GoldenLink AI-la Joined',
  responseRadius: 'Response Radius',
  respondSafely: 'Safe-a Respond Pannunga',
  respondSafelyDescription: 'Safe-a irukkumbodhu mattum respond pannunga. Emergency instructions-ai follow pannunga; unga safety-ai risk pannaadheenga.',

  //incident-responce//

  incidentResponderCenter: 'Responder Center',
  incidentResponseDescription: 'Pakkathula irukkura incidents-ai kandupidichu Golden Hour-la unga community-ku help pannunga.',
  activeIncidents: 'Active Incidents',
  peopleNeedingHelp: 'Help thevai irukkura people',
  nearestIncident: 'Nearest Incident',
  nearbyIncidents: 'Nearby Incidents',
  chooseIncidentSafely: 'Neenga safe-a respond panna mudiyura incident-ai select pannunga.',
  handedOver: 'Handed Over',
  all: 'All',
  kmAway: 'km away',
  oneMinuteAgo: '1 minute ago',
  minutesAgo: 'minutes ago',
  responderNeeded: 'responder thevai',
  respondersNeeded: 'responders thevai',
  incidentAccepted: 'Incident accept pannappattadhu',
  distance: 'Distance',
  reported: 'Reported',
  incidentNeedsResponder: 'Responder thevai',
  incidentResponderOnTheWay: 'Responder way-la irukkaar',
  incidentProfessionalHandover: 'Professional handover',
  viewDetails: 'Details Paarkka',
  acceptResponse: 'Response Accept Pannunga',
  viewResponse: 'Response Paarkka',
  noIncidentsHere: 'Inga incidents illa',
  noIncidentsMatchingFilter: 'Indha filter-ku match aagura incidents ippo illa.',
  incidentRoadAccidentDescription: 'Road accident report aagiyirukku. Community help thevai.',
  incidentTwoWheelerDescription: 'Responders ippo incident location-ku poittu irukkaanga.',
  incidentPedestrianDescription: 'Professional emergency responders responsibility eduthuttaanga.',

  //nearby community//

  nearbyCommunityGoldenLinkCommunity: 'GOLDENLINK Community',
  nearbyCommunityTitle: 'Ungalukku Pakkathula Irukkura Communities',
  nearbyCommunityDescription: 'Pakkathula irukkura GoldenLink communities-ai kandupidichu, thevaiyana nerathula support coordinate panna mudiyura people-oda connect pannunga.',
  nearbyCommunityMembersNearby: 'pakkathula irukkura community members',
  nearbyCommunityNetwork: 'Unga pakkathula irukkura community network',
  nearbyCommunityLocationDescription: 'Neenga select panna location base panni communities kaattappadum.',
  nearbyCommunityUseMyLocation: 'En Location-ai Use Pannunga',
  nearbyCommunityAll: 'Ella Communities',
  nearbyCommunityActiveNowFilter: 'Ippo Active',
  nearbyCommunityQuietFilter: 'Quiet',
  nearbyCommunityNearbyCommunities: 'Pakkathula Irukkura Communities',
  nearbyCommunityCommunitiesAvailable: 'communities available',
  nearbyCommunityActive: 'Active Community',
  nearbyCommunityQuiet: 'Ippo Quiet-a irukku',
  nearbyCommunityKm: 'km',
  nearbyCommunityDistance: 'Distance',
  nearbyCommunityMembers: 'Members',
  nearbyCommunityActiveNow: 'Ippo Active',
  nearbyCommunityViewCommunity: 'Community Paarkka',
  nearbyCommunityJoin: 'Join',
  nearbyCommunityNoCommunities: 'Communities kidaikkala',
  nearbyCommunityChangeFilter: 'Community filter-ai change panni paarunga.',
  nearbyCommunityFrontendDemo: 'Idhu ippo frontend demonstration.',
  nearbyCommunitySafety: 'Community Safety',
  nearbyCommunityEmergencySupport: 'Emergency Support',
  nearbyCommunityNeighbourhood: 'Neighbourhood',
  nearbyCommunityAnnaDescription: 'Local volunteers community safety matrum support-ai coordinate pannuraanga.',
  nearbyCommunityTnDescription: 'Local emergency response-ku support pannura neighbourhood group.',
  nearbyCommunityGuindyDescription: 'Local information matrum support-ai share pannura community volunteers.',
  nearbyCommunityVelacheryDescription: 'Residents safe-a coordinate panna help pannura active community network.',

  //volunteer-search//

  volunteerGoldenLinkCommunity: 'GOLDENLINK Community',
  volunteerSearchTitle: 'Pakkathula Irukkura Volunteers-ai Find Pannunga',
  volunteerSearchDescription: 'Pakkathula irukkura matrum help panna ready-a irukkura trusted community responders-oda connect pannunga.',
  volunteerYourLocation: 'Unga Location',
  volunteerChange: 'Change',
  volunteerSearchPlaceholder: 'Volunteers, skills illa area-ai search pannunga...',
  volunteerSearchAriaLabel: 'Volunteers-ai search pannunga',
  volunteerSearchButton: 'Search',
  volunteerAll: 'All',
  volunteerAvailable: 'Available',
  volunteerResponding: 'Responding',
  volunteerNearbyResponders: 'Pakkathula Irukkura Responders',
  volunteerMembersFound: 'community members found',
  volunteerCommunityVerified: 'Community Verified',
  volunteerAvailableNow: 'Ippo Available',
  volunteerCurrentlyResponding: 'Ippo Respond Pannitu Irukkaar',
  volunteerCurrentlyOffline: 'Ippo Offline-a irukkaar',
  volunteerUnknown: 'Unknown',
  volunteerDistance: 'Distance',
  volunteerResponse: 'Response',
  volunteerRating: 'Rating',
  volunteerResponses: 'responses',
  volunteerView: 'View',
  volunteerRequestHelp: 'Help Request Pannunga',
  volunteerNoVolunteers: 'Volunteers kidaikkala',
  volunteerTryAnotherFilter: 'Vera filter illa area try pannunga.',
  volunteerHelpRequest: 'Help Request',
  volunteerIncidentsSupported: 'Support panna incidents',
  volunteerFrontendDemo: 'Idhu ippo frontend demonstration.',

  //nearby-responders//

  nearbyFindingResponders: 'Pakkathula irukkura responders-ai find pannitu irukku...',
  nearbyResponderAssignedSuccessfully: 'Responder successful-a assign aayittaar!',
  nearbyAcceptedIncidentPreparing: 'incident-ai accept panni respond panna prepare pannitu irukkaar.',
  nearbyEta: 'ETA',
  nearbyOpeningDashboard: 'Responder dashboard open pannitu irukku...',
  nearbyNoActiveIncident: 'Active GoldenLink incident edhuvum kidaikkala.',
  nearbyUnknown: 'Theriyala',
  nearbySerious: 'Serious',
  nearbyLocationUnavailable: 'Location available illa',
  nearbyFirstAidTrained: 'First-Aid Trained',
  nearbyCommunityVolunteer: 'Community Volunteer',
  nearbyFirstResponseVolunteer: 'First Response Volunteer',
  nearbyFirstAid: 'First Aid',
  nearbyTrafficSupport: 'Traffic Support',
  nearbyCommunitySupport: 'Community Support',
  nearbyLocationGuidance: 'Location Guidance',
  nearbyEmergencyCommunication: 'Emergency Communication',
  nearbyCommunication: 'Communication',
  nearbyCommunityResponse: 'Community Response',
  nearbyRespondersTitle: 'Pakkathula Irukkura Responders',
  nearbyRespondersDescription: 'Pakkathula help panna available-a irukkura verified community responders-ai find pannunga.',
  nearbyActiveIncident: 'Active GoldenLink Incident',
  nearbyIncidentId: 'Incident ID',
  nearbyPeopleAffected: 'Affected People',
  nearbySearchingLocation: 'Unga location pakkathula search pannitu irukku',
  nearbyCurrentAccidentArea: 'Current Accident Area',
  nearbyRadius: 'Radius',
  nearbyAvailableNow: 'Ippo Available',
  nearbyLiveAvailability: 'Live Availability',
  nearbyVerifiedRespondersArea: 'Neenga select panna area-la verified responders.',
  nearbyPeopleNearby: 'Pakkathula Irukkura People',
  nearbyChooseResponder: 'Help-kku suitable responder-ai choose pannunga.',
  nearbyFound: 'found',
  nearbyVerified: 'Verified',
  nearbyDistance: 'Distance',
  nearbyEstimatedArrival: 'Estimated Arrival',
  nearbyCommunityRating: 'Community Rating',
  nearbyAcceptingIncident: 'Incident Accept pannitu irukku...',
  nearbyIncidentAccepted: 'Incident Accepted',
  nearbyAcceptIncident: 'Incident Accept Pannunga',
  nearbyCurrentlyUnavailable: 'Ippo Available illa',
  nearbySafetyPrinciple: 'GoldenLink Safety Principle',
  nearbySafetyDescription: 'GoldenLink registered community responders-oda unga connect pannum. Serious incidents-ku professional emergency services dhaan primary response.',


  // ================================
// REPORT ACCIDENT - TANGLISH
// ================================


reportAccidentDescription:
  'Accident-a report panni, fast community help coordinate panna help pannunga.',
backToHome: 'Home-ku Thirumbi Po',

step: 'Step',
of: 'of',


gpsLocationDescription:
  'Responders incident location kandupidikka unga current GPS location use pannunga.',

detectingYourLocation: 'Unga location detect pannitu irukku',
locationDetectedSuccessfully: 'Location successfully detect aayiduchu',
locationDetectionFailed: 'Location detect panna mudiyala',

detectingLocationButton: 'Location detect pannitu irukku...',

gpsCoordinatesCaptured: 'GPS coordinates capture aayiduchu',

tryAgain: 'Thirumba Try Pannu',

locationHelpBefore: 'Unga',
locationHelpAfter:
  'GPS location correct responders-a incident-kku connect panna GoldenLink-ku help pannum.',


accidentTypeDescription:
  'Neenga report panra incident type-a select pannunga.',



describeWhatYouCanSee: 'Neenga paakradha describe pannunga...',

howManyPeopleAffected: 'Evlo per affect aagirukanga?',
peopleAffectedDescription:
  'Incident-la involve aana people count-a select pannunga.',

unconscious: 'Unconscious',
bleeding: 'Bleeding',
breathingDifficulty: 'Breathing Difficulty',
trapped: 'Trapped',

urgencyDescription:
  'Neenga observe panra situation base panni emergency level select pannunga.',

severityNormal: 'Normal',
severityModerate: 'Moderate',
severityCritical: 'Critical',

severityNormalDescription:
  'Immediate danger edhuvum theriyala.',
severityModerateDescription:
  'Medical illa community help theva padalam.',
severityCriticalDescription:
  'Immediate emergency response theva.',

incident: 'Incident',
notSelected: 'Select pannala',
gpsLocation: 'GPS Location',
captured: 'Captured',

selectedUrgency: 'Selected urgency',
selectEmergencyLevel: 'Emergency level select pannunga',

activationNote:
  'Neenga kudutha incident details and location base panni GoldenLink nearby responders-a coordinate pannum.',


communityResponseActivatedSuccessfully:
  'Community response successfully activate aayiduchu!',

helpCoordinatedForIncident:
  'Indha incident-ku help coordinate pannitu irukku.',

locationRequired:
  'Continue panna location theva.',

geolocationNotSupported:
  'Indha browser geolocation support pannaadhu.',


locationUnavailableDevice:
  'Unga location-a determine panna mudiyala.',

locationDetectionTimeout:
  'Location detect panna time out aayiduchu. Thirumba try pannunga.',

// ============================================================
// COMMUNITY - TANGLISH
// ============================================================

communityGoldenLinkNetwork:
  'GoldenLink Network',

communityOurCommunity:
  'Namma Community',

communityHeaderDescription:
  'Onnaga serndhu, ordinary people oru strong first-response network ah maaralaam.',

communityPoweredResponse:
  'Community-powered response',

communityDontJustReport:
  'Accident ah report mattum pannadheenga.',

communityActivateTheCommunity:
  'Community ah activate pannunga.',

communityHeroDescription:
  'GoldenLink, unga surroundings la nadakkura incidents ku help panna ready ah irukkura people ah connect pannum.',

communityTotalResponders:
  'Total responders',

communityAvailableNow:
  'Ippo available',

communityActiveIncidents:
  'Active incidents',

communityAverageCoverage:
  'Average coverage',

communityNetworkCoverage:
  'NETWORK COVERAGE',

communityResponseAreas:
  'Community Response Areas',

communityAreasDescription:
  'Different areas la GoldenLink responders epdi distributed ah irukkanga nu paarunga.',

communityGoldenLinkCommunity:
  'GoldenLink Community',

communityResponders:
  'Responders',

communityAvailable:
  'Available',

communityIncidents:
  'Incidents',

communityCoverage:
  'Coverage',

communityViewCommunity:
  'Community ah View Pannunga',

communityWord:
  'Community',

communityHowItWorks:
  'HOW IT WORKS',

communityOneCommunityFasterHelp:
  'One community. Faster help.',

communityHowItWorksDescription:
  'Every second mukkiyam ah irukkumbodhu GoldenLink nearby people ah onna connect pannum.',

communityJoin:
  'Join',

communityJoinDescription:
  'Unga basic information and verification certificate oda register pannunga.',

communityStayConnected:
  'Stay Connected',

communityStayConnectedDescription:
  'Emergency report aana udane GoldenLink nearby community responders ah identify pannum.',

communityRespond:
  'Respond',

communityRespondDescription:
  'Nearby volunteers request ah accept panni immediate assistance provide pannalaam.',

communitySaveLives:
  'Save Lives',

communitySaveLivesDescription:
  'Faster community response, professional emergency services varathukku munnaadi irukkura critical gap ah reduce panna help pannum.',

communityBePartOfNetwork:
  'GoldenLink network oda oru part ah irunga',

communityNetworkNote:
  'Emergency time la unga small action kooda big difference create pannum. Onnaga serndhu faster and safer community response system build pannalaam.',

communityRegistrationDescription:
  'Community responder ah register panni emergency time la unga surroundings la irukkura people ku help pannunga.',

communityApplicationReceived:
  'APPLICATION RECEIVED',

communityApplicationSubmitted:
  'Application Successfully Submitted!',

communityThankYou:
  'Thank you,',

communityRegistrationSubmitted:
  'Unga registration, photo and volunteer certificate successfully submit aayiduchu.',

communityMobileVerified:
  'Mobile Verified',

communityCertificatePending:
  'Certificate Verification Pending',

communityCertificatePendingDescription:
  'Unga community membership activate pannurathukku munnaadi unga certificate review pannappadum.',

communityDone:
  'Done',

communityVolunteerVerificationRequired:
  'Volunteer verification required',

communityVerificationDescription:
  'Unga photo and valid volunteer verification certificate provide pannunga. Community access activate pannurathukku munnaadi unga details review pannappadum.',

communityFullName:
  'Full Name',

communityFullNamePlaceholder:
  'Unga full name enter pannunga',



communityGender:
  'Gender',

communitySelectGender:
  'Gender select pannunga',

communityMale:
  'Male',

communityFemale:
  'Female',

communityOther:
  'Other',

communityPreferNotToSay:
  'Prefer not to say',

communityPlace:
  'Place',

communityPlacePlaceholder:
  'City / Town / Area',


communityMobilePlaceholder:
  '10-digit mobile number',

communityOtpWillBeSent:
  'Indha mobile number ku OTP send pannappadum.',

communityGmailAddress:
  'Gmail Address',

communityGmailPlaceholder:
  'example@gmail.com',

communityOnlyGmail:
  'Gmail addresses mattum accept pannappadum.',

communityDesignation:
  'Designation',

communityDesignationPlaceholder:
  'Student / Engineer / Driver...',

communityVehicleType:
  'Vehicle Type',

communitySelectVehicle:
  'Vehicle select pannunga',

communityNoVehicle:
  'No Vehicle',

communityTwoWheeler:
  'Two Wheeler',

communityCar:
  'Car',

communityAutoTaxi:
  'Auto / Taxi',

communityVan:
  'Van',

communityTruck:
  'Truck',

communityMaritalStatus:
  'Marital Status',

communitySelectStatus:
  'Status select pannunga',

communityMarried:
  'Married',

communityUnmarried:
  'Unmarried',

communityPersonPhoto:
  'Person Photo',

communityPhotoSelected:
  'Photo successfully selected',

communityUploadPhoto:
  'Unga photo upload pannunga',

communityPhotoFormats:
  'JPG, JPEG or PNG',

communityVerifiedVolunteerCertificate:
  'Volunteer Verified Certificate',

communityCertificateSelected:
  'Certificate successfully selected',

communityUploadCertificate:
  'Verified volunteer certificate upload pannunga',

communityCertificateFormats:
  'PDF, JPG, JPEG or PNG',

communitySecurityVerification:
  'Security Verification',

communityCaptchaAnswer:
  'Answer',

communityRefreshCaptcha:
  'Refresh CAPTCHA',

communityVerifyAndSendOtp:
  'Verify & Send OTP',

communityMobileVerification:
  'MOBILE VERIFICATION',

communityVerifyMobileNumber:
  'Unga Mobile Number ah Verify Pannunga',

communityEnterOtpSent:
  'Send panna 6-digit OTP ah enter pannunga',

communityFrontendDemoMode:
  'Frontend demo mode:',

communityDemoOtpSentTo:
  'Demo OTP send pannappattadhu',

communityDemoOtp:
  'Demo OTP',

communityNewDemoOtpSentTo:
  'New demo OTP send pannappattadhu',


communityOtpExpiresIn:
  'OTP expires in',

communityOtpExpired:
  'OTP expired.',

communityChangeNumber:
  'Change Number',

communityCompleteRegistration:
  'Complete Registration',

communityDidntReceiveOtp:
  'OTP receive aagalaya?',

communityResendOtp:
  'Resend OTP',

communityPhotoFormatError:
  'JPG, JPEG or PNG image upload pannunga.',

communityCertificateFormatError:
  'PDF, JPG, JPEG or PNG certificate upload pannunga.',

communityIncorrectCaptcha:
  'Incorrect CAPTCHA. Please try again.',

communityOtpExpiredRequest:
  'OTP expired. New OTP request pannunga.',

communityEnterSixDigitOtp:
  '6-digit OTP enter pannunga.',

communityIncorrectOtp:
  'Incorrect OTP. OTP check panni again try pannunga.',

communityEnterName:
  'Unga name enter pannunga.',

communitySelectDob:
  'Unga date of birth select pannunga.',

communityEnterPlace:
  'Unga place enter pannunga.',

communityEnterMobile:
  'Unga mobile number enter pannunga.',

communityMobileTenDigits:
  'Mobile number exactly 10 digits irukkanum.',

communityEnterGmail:
  'Unga Gmail address enter pannunga.',

communityValidGmail:
  '@gmail.com la end aagura valid Gmail address enter pannunga.',

communitySelectMaritalStatus:
  'Unga marital status select pannunga.',

communityEnterDesignation:
  'Unga designation enter pannunga.',


communityVerifyMobileBeforeSubmit:
  'Submit pannurathukku munnaadi unga mobile number verify pannunga.',

  // ACCIDENT RECORDS
accidentRecordsGoldenLinkHistory: 'GoldenLink History',
accidentRecordsTitle: 'Accident Records',
accidentRecordsDescription: 'Neenga report panna incidents matrum avanga response status-ai track pannunga.',

accidentRecordsTotalReports: 'Total Reports',
accidentRecordsActive: 'Active',
accidentRecordsResponding: 'Responding',
accidentRecordsHandedOver: 'Handed Over',
accidentRecordsCompleted: 'Completed',

accidentRecordsFilterIncidents: 'Incidents-ai filter pannunga',

accidentRecordsCommunityResponseActive: 'Community response active-aa irukku',
accidentRecordsRespondersOnTheWay: 'Responders vazhiyila vandhuttu irukkaanga',
accidentRecordsProfessionalHandoverCompleted: 'Professional handover complete aayiduchu',
accidentRecordsResponseCompleted: 'Response complete aayiduchu',
accidentRecordsUnknownStatus: 'Status theriyala',

accidentRecordsViewIncident: 'Incident-ai View Pannunga',

accidentRecordsNoIncidentsFound: 'Incidents edhuvum kidaikkala',
accidentRecordsNoRecordsCategory: 'Indha category-la accident records edhuvum illa.',

accidentRecordsGoldenLinkIncident: 'GoldenLink Incident',
accidentRecordsIncidentDetails: 'Incident Details',
accidentRecordsCloseIncidentDetails: 'Incident details-ai close pannunga',

accidentRecordsIncidentId: 'Incident ID',
accidentRecordsAccidentType: 'Accident Type',
accidentRecordsSeverity: 'Severity',
accidentRecordsVictims: 'Affected People',

accidentRecordsVictimInformation: 'Victim Information',
accidentRecordsSomeoneUnconscious: 'Yaaravadhu unconscious-aa irukkaanga',
accidentRecordsHeavyBleeding: 'Heavy bleeding report aayirukku',
accidentRecordsPersonTrapped: 'Person trapped-aa irukkaanga illa move panna mudiyala',

accidentRecordsIncidentLocation: 'Incident Location',
accidentRecordsOpenInMaps: 'Maps-la Open Pannunga',

accidentRecordsReportDescription: 'Report Description',

accidentRecordsAiAssessment: 'AI Assessment',
accidentRecordsGoldenLinkAiAnalysis: 'GoldenLink AI Analysis',
accidentRecordsConfidence: 'Confidence',
accidentRecordsCloseDetails: 'Details-ai Close Pannunga',

accidentRecordsDefaultDescription: 'GoldenLink moolama accident report pannappattadhu.',

accidentRecordsUnknown: 'Theriyala',
accidentRecordsUnknownTime: 'Time theriyala',
accidentRecordsJustNow: 'Ippothaan',
accidentRecordsMinutesAgo: '{count} minutes munnaadi',
accidentRecordsHoursAgo: '{count} hours munnaadi',
accidentRecordsYesterday: 'Nethu',
accidentRecordsDaysAgo: '{count} days munnaadi',

accidentRecordsNoResponderAssigned: 'Responder assign pannala',

// AI ASSISTANT
aiGoldenLinkAi: 'GOLDENLINK AI',
aiEmergencyAssistant: 'Emergency Assistant',
aiAssistantDescription: 'AI help-oda incident assessment matrum response coordination',
aiEmergencyResponseAssistant: 'Emergency-response assistant',

aiWelcome: 'Vanakkam. Naan GoldenLink AI, unga emergency-response assistant.',
aiNoActiveIncident: 'Ippo active incident edhuvum illa. Mudhal-la accident report pannalaam, illa general emergency-response guidance en kitta kekkalaam.',

aiConnectedToIncident: 'Naan incident #{incidentId}-oda connected-aa irukken. Current emergency-ai purinjikkaum response coordination guidance kudukkaum help panna mudiyum.',
aiExistingAssessment: 'Current incident {severity}-aa assess pannappattirukku. Assessment confidence {confidence}%.',
aiQuickAssessmentIntro: 'Incident-ai assess panna help aagura sila quick questions kekkaren.',

aiQuestionAtLocation: 'Neenga ippo accident location-la irukeengala?',
aiQuestionInjuredPeople: 'Evlo per injured-aa irukkaanga?',
aiQuestionUnconscious: 'Yaaravadhu unconscious-aa irukkaangala?',
aiQuestionHeavyBleeding: 'Yaarukkavadhu heavy bleeding irukka?',
aiQuestionBreathingDifficulty: 'Yaarukkavadhu breathing difficulty irukka?',
aiQuestionTrapped: 'Yaaravadhu vehicle-kulla trapped-aa irukkaangala illa move panna mudiyalaiya?',

aiGeneralResponse: 'Emergency-response coordination-la naan help panna mudiyum. Safe location-la irunga, injured people-ai unnecessary-aa move pannaadheenga, emergency services instructions-ai follow pannunga.',

aiBleedingResponse: 'Yaarukkavadhu heavy bleeding irundha immediate-aa emergency medical help seek pannunga. Safe-aa irundha clean cloth illa gauze use panni wound mela firm pressure kudunga.',

aiUnconsciousResponse: 'Yaaravadhu unconscious-aa irundha illa respond pannaama irundha immediate-aa emergency services-ai contact pannunga. Avanga breathing pannuraangala check panni emergency dispatcher instructions-ai follow pannunga.',

aiBreathingResponse: 'Breathing difficulty oru emergency warning sign. Immediate-aa emergency services-ai contact panni professional help varum varaikkum person-ai safe position-la vechukonga.',

aiTrappedResponse: 'Fire maadhiri immediate danger illa na trapped person-ai force panni veliya edukka try pannaadheenga. Emergency services-ai contact panni trained responders varum varaikkum wait pannunga.',

aiResponderResponse: 'Indha incident-ku assigned responder-ai Responder Dashboard-la paakalaam. Accident location accessible-aa vechukonga, responders vandha avanga instructions-ai follow pannunga.',

aiCriticalAssessment: 'Reported conditions immediate response coordination thevai padura critical emergency-ai indicate pannudhu.',
aiSeriousAssessment: 'Multiple victims report pannappattirukkaanga. Quick community and emergency assistance recommend pannapadudhu.',
aiModerateAssessment: 'Reported incident-ku assistance and monitoring thevai. Community response coordinate panna mudiyum.',

aiAssessmentCompleted: 'Thank you. Initial incident assessment complete pannitten.',
aiAssessmentResult: 'Incident {severity}-aa assess pannappattirukku. Current response status basis-la help coordination continue pannalaam.',

aiAskAnythingPlaceholder: 'GoldenLink AI-kitta edhu venumnaalum kelunga...',
aiSendMessage: 'Message anuppu',
aiInputHelp: 'Indha incident, emergency response, bleeding, breathing difficulty, responders, illa help varum varaikkum enna panna vendum-nu kelunga.',
aiDisclaimer: 'GoldenLink AI response coordination assistance provide pannum; medical diagnosis provide pannaadhu.',

aiAssessment: 'AI Assessment',
aiAssessmentInProgress: 'Assessment nadandhuttu irukku',
aiAssessmentWaitingDescription: 'Emergency-ai GoldenLink purinjikka questions-ku answer pannunga.',
aiIncidentAssessment: 'AI Incident Assessment',
aiReportedConditions: 'Reported conditions',
aiActivateCommunityResponse: 'Community Response-ai Activate Pannunga',
aiSafetyNote: 'Safe location-la irundhu emergency services instructions-ai follow pannunga.',

aiNotRequested: 'Request pannala',
confidence: 'Confidence',

      }

    };


    // ============================================================
    // SET LANGUAGE
    // ============================================================

    setLanguage(language: LanguageCode): void {
      this.currentLanguage.set(language);

      try {
        localStorage.setItem(
          this.STORAGE_KEY,
          language
        );
      } catch {
        // Ignore localStorage errors.
      }
    }


    // ============================================================
    // TRANSLATE
    // ============================================================

    translate(key: string): string {
      const language = this.currentLanguage();

      return (
        this.translations[language]?.[key] ??
        this.translations.en[key] ??
        key
      );
    }


    // ============================================================
    // GET SAVED LANGUAGE
    // ============================================================

    private getSavedLanguage(): LanguageCode {

      try {

        const savedLanguage = localStorage.getItem(
          this.STORAGE_KEY
        ) as LanguageCode | null;

        if (
          savedLanguage === 'en' ||
          savedLanguage === 'ta' ||
          savedLanguage === 'hi' ||
          savedLanguage === 'te' ||
          savedLanguage === 'ml' ||
          savedLanguage === 'tl'
        ) {
          return savedLanguage;
        }

      } catch {
        // Ignore localStorage errors.
      }

      return 'en';
    }

  }