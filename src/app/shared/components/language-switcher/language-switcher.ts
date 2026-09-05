import {
  Component,
  inject
} from '@angular/core';

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

  private readonly translationService =
    inject(TranslationService);

  isOpen = false;

  languages: Language[] = [

    {
      code: 'en',
      name: 'English',
      nativeName: 'English',
      flag: 'GB'
    },

    {
      code: 'ta',
      name: 'Tamil',
      nativeName: 'தமிழ்',
      flag: 'IN'
    },

    {
      code: 'hi',
      name: 'Hindi',
      nativeName: 'हिन्दी',
      flag: 'IN'
    },

    {
      code: 'te',
      name: 'Telugu',
      nativeName: 'తెలుగు',
      flag: 'IN'
    },

    {
      code: 'ml',
      name: 'Malayalam',
      nativeName: 'മലയാളം',
      flag: 'IN'
    },

    {
      code: 'tl',
      name: 'Tanglish',
      nativeName: 'Tanglish',
      flag: '💬'
    }

  ];


  get selectedLanguage(): Language {

    const current =
      this.translationService.currentLanguage();

    return (
      this.languages.find(
        language => language.code === current
      ) ?? this.languages[0]
    );
  }


  toggleDropdown(): void {
    this.isOpen = !this.isOpen;
  }


  selectLanguage(language: Language): void {

    this.translationService.setLanguage(
      language.code
    );

    this.isOpen = false;
  }


  t(key: string): string {

    return this.translationService.translate(key);
  }
}