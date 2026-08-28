import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-community-preview',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './community-preview.html',
  styleUrl: './community-preview.scss',
})
export class CommunityPreview {}