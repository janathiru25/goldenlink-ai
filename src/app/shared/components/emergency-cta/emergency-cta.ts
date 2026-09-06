import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';

import { TranslationService } from '../../../core/services/translation';

@Component({
  selector: 'app-emergency-cta',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './emergency-cta.html',
  styleUrl: './emergency-cta.scss',
})
export class EmergencyCta {

  translation = inject(TranslationService);

  t(key: string): string {
    return this.translation.translate(key);
  }

}