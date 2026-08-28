import { Component, inject } from '@angular/core';

import {
  RouterLink,
  RouterLinkActive
} from '@angular/router';

import { LanguageSwitcher } from '../language-switcher/language-switcher';

import { ThemeToggle } from '../theme-toggle/theme-toggle';

import { TranslationService } from '../../../core/services/translation';

@Component({
  selector: 'app-navbar',
  standalone: true,

  imports: [
    RouterLink,
    RouterLinkActive,
    LanguageSwitcher,
    ThemeToggle
  ],

  templateUrl: './navbar.html',
  styleUrl: './navbar.scss'
})
export class Navbar {

  translation = inject(TranslationService);

  t(key: string): string {
    return this.translation.translate(key);
  }

}