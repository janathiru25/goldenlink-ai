import { Component, inject } from '@angular/core';

import {
  TranslationService,
  LanguageCode
} from '../../../core/services/translation';

interface Language {
  code: LanguageCode;
  name: string;
  nativeName: string;
  flag: string;
}

@Component({
  selector: 'app-language-switcher',
  standalone: true,
  templateUrl: './language-switcher.html',
  styleUrl: './language-switcher.scss'
})
export class LanguageSwitcher {

  private translationService = inject(TranslationService);

  isOpen = false;

  selectedLanguage: Language = {
    code: 'en',
    name: 'English',
    nativeName: 'English',
    flag: '🇬🇧'
  };

  languages: Language[] = [
    {
      code: 'en',
      name: 'English',
      nativeName: 'English',
      flag: '🇬🇧'
    },
    {
      code: 'ta',
      name: 'Tamil',
      nativeName: 'தமிழ்',
      flag: '🇮🇳'
    },
    {
      code: 'hi',
      name: 'Hindi',
      nativeName: 'हिन्दी',
      flag: '🇮🇳'
    },
    {
      code: 'te',
      name: 'Telugu',
      nativeName: 'తెలుగు',
      flag: '🇮🇳'
    },
    {
      code: 'ml',
      name: 'Malayalam',
      nativeName: 'മലയാളം',
      flag: '🇮🇳'
    },
    {
      code: 'tl',
      name: 'Tanglish',
      nativeName: 'Tanglish',
      flag: '💬'
    }
  ];

  toggleDropdown(): void {
    this.isOpen = !this.isOpen;
  }

  selectLanguage(language: Language): void {
    this.selectedLanguage = language;

    this.translationService.setLanguage(language.code);

    this.isOpen = false;
  }
}