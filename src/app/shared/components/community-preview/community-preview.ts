import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';

import { TranslationService } from '../../../core/services/translation';

@Component({
  selector: 'app-community-preview',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './community-preview.html',
  styleUrl: './community-preview.scss',
})
export class CommunityPreview {

  translation = inject(TranslationService);

  t(key: string): string {
    return this.translation.translate(key);
  }

}