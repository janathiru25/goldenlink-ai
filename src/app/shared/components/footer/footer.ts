import { Component, inject } from '@angular/core';

import { TranslationService } from '../../../core/services/translation';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [],
  templateUrl: './footer.html',
  styleUrl: './footer.scss',
})
export class Footer {

  translation = inject(TranslationService);

  t(key: string): string {
    return this.translation.translate(key);
  }

}