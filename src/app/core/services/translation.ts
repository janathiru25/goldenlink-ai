import { Injectable, signal } from '@angular/core';

export type LanguageCode = 'en' | 'ta' | 'hi' | 'te' | 'ml' | 'tl';

@Injectable({
  providedIn: 'root'
})
export class TranslationService {

  currentLanguage = signal<LanguageCode>('en');

  private translations: Record<LanguageCode, Record<string, string>> = {

    en: {
      home: 'Home',
      reportAccident: 'Report Accident',
      community: 'Community',
      nearbyResponders: 'Nearby Responders',
      volunteers: 'Volunteers',
      selectLanguage: 'Select Language',
      profile: 'Profile'
    },

    ta: {
      home: 'முகப்பு',
      reportAccident: 'விபத்தைப் புகாரளிக்கவும்',
      community: 'சமூகம்',
      nearbyResponders: 'அருகிலுள்ள உதவியாளர்கள்',
      volunteers: 'தன்னார்வலர்கள்',
      selectLanguage: 'மொழியைத் தேர்ந்தெடுக்கவும்',
      profile: 'சுயவிவரம்'
    },

    hi: {
      home: 'होम',
      reportAccident: 'दुर्घटना की रिपोर्ट करें',
      community: 'समुदाय',
      nearbyResponders: 'निकटतम सहायता दल',
      volunteers: 'स्वयंसेवक',
      selectLanguage: 'भाषा चुनें',
      profile: 'प्रोफ़ाइल'
    },

    te: {
      home: 'హోమ్',
      reportAccident: 'ప్రమాదాన్ని నివేదించండి',
      community: 'సమాజం',
      nearbyResponders: 'సమీప సహాయకులు',
      volunteers: 'వాలంటీర్లు',
      selectLanguage: 'భాషను ఎంచుకోండి',
      profile: 'ప్రొఫైల్'
    },

    ml: {
      home: 'ഹോം',
      reportAccident: 'അപകടം റിപ്പോർട്ട് ചെയ്യുക',
      community: 'കമ്മ്യൂണിറ്റി',
      nearbyResponders: 'സമീപത്തുള്ള സഹായികൾ',
      volunteers: 'വോളന്റിയർമാർ',
      selectLanguage: 'ഭാഷ തിരഞ്ഞെടുക്കുക',
      profile: 'പ്രൊഫൈൽ'
    },

    tl: {
      home: 'Home',
      reportAccident: 'Accident Report Pannu',
      community: 'Community',
      nearbyResponders: 'Pakkathula Irukkura Responders',
      volunteers: 'Volunteers',
      selectLanguage: 'Language Select Pannu',
      profile: 'Profile'
    }

  };

  setLanguage(language: LanguageCode): void {
    this.currentLanguage.set(language);
  }

  translate(key: string): string {
    const language = this.currentLanguage();

    return this.translations[language]?.[key]
      ?? this.translations.en[key]
      ?? key;
  }
}