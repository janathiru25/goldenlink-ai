import { Injectable, signal } from '@angular/core';

export type LanguageCode = 'en' | 'ta' | 'hi' | 'te' | 'ml' | 'tl';

@Injectable({
  providedIn: 'root'
})
export class TranslationService {

  currentLanguage = signal<LanguageCode>(this.getSavedLanguage());

  private translations: Record<LanguageCode, Record<string, string>> = {

    // =========================================================
    // ENGLISH
    // =========================================================
    en: {

      // Navbar
      home: 'Home',
      reportAccident: 'Report Accident',
      community: 'Community',
      nearbyResponders: 'Nearby Responders',
      volunteers: 'Volunteers',
      aiAssistant: 'GoldenLink AI',
      profile: 'Profile',
      selectLanguage: 'Select Language',

      // Home hero
      activateCommunity: 'Activate Community',
      CommunityResponse: 'Community Response',
      duringGoldenHour: 'during the Golden Hour',
      DontJustReport: 'Don’t just report an accident.',
      responderDashboard: 'Responder Dashboard',

      // Accident section
      emergencyResponse: 'Emergency Response',
      witnessedAccident: 'Witnessed an accident?',
      reportIncidentQuickly:
        'Report the incident quickly and activate nearby community responders during the critical Golden Hour.',

      // Community activation
      ActivateCommunity: 'Activate Community',
      HelpCanStart: 'Help Can Start',
      WithPeopleNearby: 'With People Nearby',
      GoldenlinkConnects:
        'GoldenLink connects people in need with trained community responders nearby.',

      // Features
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

      // Responder
      communityResponder: 'Community Responder',
      readyToHelp:
        'Ready to help during the Golden Hour?',
      joinResponderNetwork:
        'Join the GoldenLink responder network. View nearby incidents, accept response requests and coordinate community support.',

      // Emergency
      emergency: 'Emergency',
      helpNow: 'Get Help Now',

      // Common
      back: 'Back',
      next: 'Next',
      cancel: 'Cancel',
      submit: 'Submit',
      save: 'Save',
      close: 'Close',
      search: 'Search',
      view: 'View',
      loading: 'Loading...',
      yes: 'Yes',
      no: 'No'
    },


    // =========================================================
    // TAMIL
    // =========================================================
    ta: {

      // Navbar
      home: 'முகப்பு',
      reportAccident: 'விபத்தைப் புகாரளிக்கவும்',
      community: 'சமூகம்',
      nearbyResponders: 'அருகிலுள்ள உதவியாளர்கள்',
      volunteers: 'தன்னார்வலர்கள்',
      aiAssistant: 'GoldenLink AI',
      profile: 'சுயவிவரம்',
      selectLanguage: 'மொழியைத் தேர்ந்தெடுக்கவும்',

      // Home hero
      activateCommunity: 'சமூக உதவியை செயல்படுத்துங்கள்',
      CommunityResponse: 'சமூக உதவி',
      duringGoldenHour: 'Golden Hour நேரத்தில்',
      DontJustReport: 'விபத்தை மட்டும் தெரிவிக்க வேண்டாம்.',
      responderDashboard: 'உதவியாளர் டாஷ்போர்டு',

      // Accident
      emergencyResponse: 'அவசர உதவி',
      witnessedAccident: 'விபத்தை பார்த்தீர்களா?',
      reportIncidentQuickly:
        'விபத்தை விரைவாகப் புகாரளித்து, Golden Hour நேரத்தில் அருகிலுள்ள சமூக உதவியாளர்களை செயல்படுத்துங்கள்.',

      // Community
      ActivateCommunity: 'சமூக உதவியை செயல்படுத்துங்கள்',
      HelpCanStart: 'உதவி தொடங்கலாம்',
      WithPeopleNearby: 'அருகிலுள்ள மக்களுடன்',
      GoldenlinkConnects:
        'GoldenLink உதவி தேவைப்படும் மக்களை அருகிலுள்ள பயிற்சி பெற்ற சமூக உதவியாளர்களுடன் இணைக்கிறது.',

      // Features
      NearbyResponders: 'அருகிலுள்ள உதவியாளர்கள்',
      IdentifyResponders:
        'விபத்து நடந்த இடத்திற்கு அருகில் உள்ள பயிற்சி பெற்ற உதவியாளர்களைக் கண்டறியுங்கள்.',

      VerifiedSkills: 'சரிபார்க்கப்பட்ட திறன்கள்',
      ResponderProfiles:
        'சரிபார்க்கப்பட்ட உதவியாளர்களின் சுயவிவரங்களையும் அவசரகால திறன்களையும் பார்க்கவும்.',

      RoleBasedSupport: 'பங்கு அடிப்படையிலான உதவி',
      DifferentPeople:
        'வெவ்வேறு நபர்கள் வெவ்வேறு வகையான அவசர உதவிகளை வழங்க முடியும்.',

      localLanguages: 'உள்ளூர் மொழிகள்',
      simpleGuidance:
        'பரிச்சயமான உள்ளூர் மொழிகளில் எளிய அவசர வழிகாட்டுதலைப் பெறுங்கள்.',

      // Responder
      communityResponder: 'சமூக உதவியாளர்',
      readyToHelp: 'Golden Hour நேரத்தில் உதவ தயாரா?',
      joinResponderNetwork:
        'GoldenLink உதவியாளர் வலையமைப்பில் இணையுங்கள். அருகிலுள்ள விபத்துகளைப் பார்த்து, உதவி கோரிக்கைகளை ஏற்று சமூக உதவியை ஒருங்கிணைக்கவும்.',

      // Emergency
      emergency: 'அவசரம்',
      helpNow: 'இப்போது உதவி பெறுங்கள்',

      // Common
      back: 'பின்செல்',
      next: 'அடுத்து',
      cancel: 'ரத்து செய்',
      submit: 'சமர்ப்பிக்கவும்',
      save: 'சேமி',
      close: 'மூடு',
      search: 'தேடு',
      view: 'பார்க்கவும்',
      loading: 'ஏற்றுகிறது...',
      yes: 'ஆம்',
      no: 'இல்லை'
    },


    // =========================================================
    // HINDI
    // =========================================================
    hi: {

      home: 'होम',
      reportAccident: 'दुर्घटना की रिपोर्ट करें',
      community: 'समुदाय',
      nearbyResponders: 'निकटतम सहायता दल',
      volunteers: 'स्वयंसेवक',
      aiAssistant: 'GoldenLink AI',
      profile: 'प्रोफ़ाइल',
      selectLanguage: 'भाषा चुनें',

      activateCommunity: 'समुदाय की सहायता सक्रिय करें',
      CommunityResponse: 'सामुदायिक सहायता',
      duringGoldenHour: 'गोल्डन ऑवर के दौरान',
      DontJustReport: 'सिर्फ दुर्घटना की रिपोर्ट न करें।',
      responderDashboard: 'सहायता दल डैशबोर्ड',

      emergencyResponse: 'आपातकालीन सहायता',
      witnessedAccident: 'क्या आपने दुर्घटना देखी?',
      reportIncidentQuickly:
        'दुर्घटना की तुरंत रिपोर्ट करें और गोल्डन ऑवर के दौरान आसपास के सामुदायिक सहायता दल को सक्रिय करें।',

      ActivateCommunity: 'समुदाय की सहायता सक्रिय करें',
      HelpCanStart: 'मदद शुरू हो सकती है',
      WithPeopleNearby: 'आसपास के लोगों के साथ',
      GoldenlinkConnects:
        'GoldenLink जरूरतमंद लोगों को आसपास के प्रशिक्षित सामुदायिक सहायता दल से जोड़ता है।',

      NearbyResponders: 'निकटतम सहायता दल',
      IdentifyResponders:
        'दुर्घटना स्थल के पास उपलब्ध प्रशिक्षित सहायता दल खोजें।',

      VerifiedSkills: 'सत्यापित कौशल',
      ResponderProfiles:
        'सत्यापित सहायता दल की प्रोफ़ाइल और आपातकालीन कौशल देखें।',

      RoleBasedSupport: 'भूमिका आधारित सहायता',
      DifferentPeople:
        'अलग-अलग लोग अलग-अलग प्रकार की आपातकालीन सहायता प्रदान कर सकते हैं।',

      localLanguages: 'स्थानीय भाषाएँ',
      simpleGuidance:
        'परिचित स्थानीय भाषाओं में सरल आपातकालीन मार्गदर्शन प्राप्त करें।',

      communityResponder: 'सामुदायिक सहायता दल',
      readyToHelp: 'गोल्डन ऑवर के दौरान मदद करने के लिए तैयार हैं?',
      joinResponderNetwork:
        'GoldenLink सहायता नेटवर्क से जुड़ें और आसपास की घटनाओं में सहायता करें।',

      emergency: 'आपातकाल',
      helpNow: 'अभी सहायता प्राप्त करें',

      back: 'वापस',
      next: 'आगे',
      cancel: 'रद्द करें',
      submit: 'जमा करें',
      save: 'सहेजें',
      close: 'बंद करें',
      search: 'खोजें',
      view: 'देखें',
      loading: 'लोड हो रहा है...',
      yes: 'हाँ',
      no: 'नहीं'
    },


    // =========================================================
    // TELUGU
    // =========================================================
    te: {

      home: 'హోమ్',
      reportAccident: 'ప్రమాదాన్ని నివేదించండి',
      community: 'సమాజం',
      nearbyResponders: 'సమీప సహాయకులు',
      volunteers: 'వాలంటీర్లు',
      aiAssistant: 'GoldenLink AI',
      profile: 'ప్రొఫైల్',
      selectLanguage: 'భాషను ఎంచుకోండి',

      activateCommunity: 'సమాజ సహాయాన్ని ప్రారంభించండి',
      CommunityResponse: 'సమాజ సహాయం',
      duringGoldenHour: 'గోల్డెన్ అవర్ సమయంలో',
      DontJustReport: 'ప్రమాదాన్ని మాత్రమే నివేదించవద్దు.',
      responderDashboard: 'సహాయక డ్యాష్‌బోర్డ్',

      emergencyResponse: 'అత్యవసర సహాయం',
      witnessedAccident: 'మీరు ప్రమాదాన్ని చూశారా?',
      reportIncidentQuickly:
        'ప్రమాదాన్ని త్వరగా నివేదించి, గోల్డెన్ అవర్ సమయంలో సమీపంలోని కమ్యూనిటీ సహాయకులను సక్రియం చేయండి.',

      ActivateCommunity: 'సమాజ సహాయాన్ని ప్రారంభించండి',
      HelpCanStart: 'సహాయం ప్రారంభమవుతుంది',
      WithPeopleNearby: 'సమీపంలోని ప్రజలతో',
      GoldenlinkConnects:
        'GoldenLink అవసరమైన వ్యక్తులను సమీపంలోని శిక్షణ పొందిన కమ్యూనిటీ సహాయకులతో కలుపుతుంది.',

      NearbyResponders: 'సమీప సహాయకులు',
      IdentifyResponders:
        'ప్రమాద స్థలానికి సమీపంలో ఉన్న శిక్షణ పొందిన సహాయకులను కనుగొనండి.',

      VerifiedSkills: 'ధృవీకరించబడిన నైపుణ్యాలు',
      ResponderProfiles:
        'ధృవీకరించబడిన సహాయకుల ప్రొఫైల్‌లు మరియు అత్యవసర నైపుణ్యాలను చూడండి.',

      RoleBasedSupport: 'పాత్ర ఆధారిత సహాయం',
      DifferentPeople:
        'వివిధ వ్యక్తులు వివిధ రకాల అత్యవసర సహాయాన్ని అందించగలరు.',

      localLanguages: 'స్థానిక భాషలు',
      simpleGuidance:
        'మీకు పరిచయమైన స్థానిక భాషల్లో సులభమైన అత్యవసర మార్గదర్శకాలను పొందండి.',

      communityResponder: 'కమ్యూనిటీ సహాయకుడు',
      readyToHelp: 'గోల్డెన్ అవర్‌లో సహాయం చేయడానికి సిద్ధంగా ఉన్నారా?',
      joinResponderNetwork:
        'GoldenLink సహాయకుల నెట్‌వర్క్‌లో చేరి సమీప ఘటనలకు సహాయం చేయండి.',

      emergency: 'అత్యవసరం',
      helpNow: 'ఇప్పుడే సహాయం పొందండి',

      back: 'వెనుకకు',
      next: 'తదుపరి',
      cancel: 'రద్దు',
      submit: 'సమర్పించండి',
      save: 'సేవ్ చేయండి',
      close: 'మూసివేయండి',
      search: 'వెతకండి',
      view: 'చూడండి',
      loading: 'లోడ్ అవుతోంది...',
      yes: 'అవును',
      no: 'కాదు'
    },


    // =========================================================
    // MALAYALAM
    // =========================================================
    ml: {

      home: 'ഹോം',
      reportAccident: 'അപകടം റിപ്പോർട്ട് ചെയ്യുക',
      community: 'കമ്മ്യൂണിറ്റി',
      nearbyResponders: 'സമീപത്തുള്ള സഹായികൾ',
      volunteers: 'വോളന്റിയർമാർ',
      aiAssistant: 'GoldenLink AI',
      profile: 'പ്രൊഫൈൽ',
      selectLanguage: 'ഭാഷ തിരഞ്ഞെടുക്കുക',

      activateCommunity: 'കമ്മ്യൂണിറ്റി സഹായം സജീവമാക്കുക',
      CommunityResponse: 'കമ്മ്യൂണിറ്റി സഹായം',
      duringGoldenHour: 'ഗോൾഡൻ അവറിൽ',
      DontJustReport: 'അപകടം റിപ്പോർട്ട് ചെയ്യുന്നതിൽ മാത്രം നിർത്തരുത്.',
      responderDashboard: 'സഹായ ഡാഷ്ബോർഡ്',

      emergencyResponse: 'അടിയന്തര സഹായം',
      witnessedAccident: 'നിങ്ങൾ ഒരു അപകടം കണ്ടോ?',
      reportIncidentQuickly:
        'അപകടം വേഗത്തിൽ റിപ്പോർട്ട് ചെയ്ത് ഗോൾഡൻ അവറിൽ സമീപത്തുള്ള കമ്മ്യൂണിറ്റി സഹായികളെ സജീവമാക്കുക.',

      ActivateCommunity: 'കമ്മ്യൂണിറ്റി സഹായം സജീവമാക്കുക',
      HelpCanStart: 'സഹായം ആരംഭിക്കാം',
      WithPeopleNearby: 'സമീപത്തുള്ള ആളുകളിലൂടെ',
      GoldenlinkConnects:
        'GoldenLink സഹായം ആവശ്യമുള്ള ആളുകളെ സമീപത്തുള്ള പരിശീലനം നേടിയ കമ്മ്യൂണിറ്റി സഹായികളുമായി ബന്ധിപ്പിക്കുന്നു.',

      NearbyResponders: 'സമീപത്തുള്ള സഹായികൾ',
      IdentifyResponders:
        'അപകട സ്ഥലത്തിന് സമീപമുള്ള പരിശീലനം നേടിയ സഹായികളെ കണ്ടെത്തുക.',

      VerifiedSkills: 'പരിശോധിച്ച കഴിവുകൾ',
      ResponderProfiles:
        'പരിശോധിച്ച സഹായികളുടെ പ്രൊഫൈലുകളും അടിയന്തര കഴിവുകളും കാണുക.',

      RoleBasedSupport: 'പങ്ക് അടിസ്ഥാനമാക്കിയുള്ള സഹായം',
      DifferentPeople:
        'വ്യത്യസ്ത ആളുകൾക്ക് വ്യത്യസ്ത തരത്തിലുള്ള അടിയന്തര സഹായം നൽകാം.',

      localLanguages: 'പ്രാദേശിക ഭാഷകൾ',
      simpleGuidance:
        'പരിചിതമായ പ്രാദേശിക ഭാഷകളിൽ ലളിതമായ അടിയന്തര മാർഗനിർദ്ദേശം നേടുക.',

      communityResponder: 'കമ്മ്യൂണിറ്റി സഹായി',
      readyToHelp: 'ഗോൾഡൻ അവറിൽ സഹായിക്കാൻ തയ്യാറാണോ?',
      joinResponderNetwork:
        'GoldenLink സഹായ ശൃംഖലയിൽ ചേരുകയും സമീപത്തുള്ള സംഭവങ്ങളിൽ സഹായിക്കുകയും ചെയ്യുക.',

      emergency: 'അടിയന്തരം',
      helpNow: 'ഇപ്പോൾ സഹായം നേടുക',

      back: 'തിരികെ',
      next: 'അടുത്തത്',
      cancel: 'റദ്ദാക്കുക',
      submit: 'സമർപ്പിക്കുക',
      save: 'സംരക്ഷിക്കുക',
      close: 'അടയ്ക്കുക',
      search: 'തിരയുക',
      view: 'കാണുക',
      loading: 'ലോഡ് ചെയ്യുന്നു...',
      yes: 'അതെ',
      no: 'ഇല്ല'
    },


    // =========================================================
    // TANGLISH
    // =========================================================
    tl: {

      home: 'Home',
      reportAccident: 'Accident Report Pannu',
      community: 'Community',
      nearbyResponders: 'Pakkathula Irukkura Responders',
      volunteers: 'Volunteers',
      aiAssistant: 'GoldenLink AI',
      profile: 'Profile',
      selectLanguage: 'Language Select Pannu',

      activateCommunity: 'Community Help Activate Pannu',
      CommunityResponse: 'Community Response',
      duringGoldenHour: 'Golden Hour-la',
      DontJustReport: 'Accident-a report pannitu mattum irukka vendam.',
      responderDashboard: 'Responder Dashboard',

      emergencyResponse: 'Emergency Response',
      witnessedAccident: 'Accident-a paatheengala?',
      reportIncidentQuickly:
        'Accident-a seekiram report panni, Golden Hour-la pakkathula irukkura responders-a activate pannunga.',

      ActivateCommunity: 'Community Help Activate Pannu',
      HelpCanStart: 'Help Start Aagalam',
      WithPeopleNearby: 'Pakkathula Irukkura People-oda',
      GoldenlinkConnects:
        'GoldenLink help thevai paduravangala pakkathula irukkura trained responders-oda connect pannum.',

      NearbyResponders: 'Pakkathula Irukkura Responders',
      IdentifyResponders:
        'Accident location-ku pakkathula irukkura trained responders-a find pannunga.',

      VerifiedSkills: 'Verified Skills',
      ResponderProfiles:
        'Verified responder profiles and emergency skills-a paarunga.',

      RoleBasedSupport: 'Role Based Support',
      DifferentPeople:
        'Different people different emergency support provide panna mudiyum.',

      localLanguages: 'Local Languages',
      simpleGuidance:
        'Ungalukku familiar-aana local language-la simple emergency guidance kidaikkum.',

      communityResponder: 'Community Responder',
      readyToHelp: 'Golden Hour-la help panna ready-a?',
      joinResponderNetwork:
        'GoldenLink responder network-la join panni nearby incidents-ku help pannunga.',

      emergency: 'Emergency',
      helpNow: 'Ippo Help Get Pannu',

      back: 'Back',
      next: 'Next',
      cancel: 'Cancel',
      submit: 'Submit',
      save: 'Save',
      close: 'Close',
      search: 'Search',
      view: 'View',
      loading: 'Loading...',
      yes: 'Yes',
      no: 'No'
    }
  };


  // =========================================================
  // LANGUAGE
  // =========================================================

  setLanguage(language: LanguageCode): void {

    this.currentLanguage.set(language);

    localStorage.setItem(
      'goldenlink_language',
      language
    );
  }


  // =========================================================
  // TRANSLATE
  // =========================================================

  translate(key: string): string {

    const language = this.currentLanguage();

    return (
      this.translations[language]?.[key] ??
      this.translations.en[key] ??
      key
    );
  }


  // =========================================================
  // LOAD SAVED LANGUAGE
  // =========================================================

  private getSavedLanguage(): LanguageCode {

    const saved =
      localStorage.getItem('goldenlink_language');

    if (
      saved === 'en' ||
      saved === 'ta' ||
      saved === 'hi' ||
      saved === 'te' ||
      saved === 'ml' ||
      saved === 'tl'
    ) {
      return saved;
    }

    return 'en';
  }
}