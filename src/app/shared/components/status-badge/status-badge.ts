import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-status-badge',
  standalone: true,
  templateUrl: './status-badge.html',
  styleUrl: './status-badge.scss'
})
export class StatusBadge {

  @Input() status = '';

  get statusClass(): string {

    const normalizedStatus = this.status
      .toLowerCase()
      .trim()
      .replace(/\s+/g, '-');

    return `status-${normalizedStatus}`;
  }

  get statusIcon(): string {

    const normalizedStatus = this.status
      .toLowerCase()
      .trim();

    switch (normalizedStatus) {

      case 'active':
        return 'bi-broadcast-pin';

      case 'pending':
        return 'bi-hourglass-split';

      case 'responding':
        return 'bi-person-walking';

      case 'completed':
        return 'bi-check-circle-fill';

      case 'resolved':
        return 'bi-check-circle-fill';

      case 'cancelled':
      case 'canceled':
        return 'bi-x-circle-fill';

      case 'unavailable':
        return 'bi-person-x';

      default:
        return 'bi-info-circle-fill';
    }
  }
}