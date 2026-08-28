import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-emergency-cta',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './emergency-cta.html',
  styleUrl: './emergency-cta.scss',
})
export class EmergencyCta {}