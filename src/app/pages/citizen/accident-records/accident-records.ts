import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface AccidentRecord {
  id: string;
  type: string;
  location: string;
  reportedAt: string;
  status: 'ACTIVE' | 'RESPONDING' | 'HANDED_OVER' | 'COMPLETED';
  responders: number;
  description: string;
  icon: string;
}

@Component({
  selector: 'app-accident-records',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './accident-records.html',
  styleUrl: './accident-records.scss',
})
export class AccidentRecords {

  activeFilter = 'ALL';

  records: AccidentRecord[] = [

    {
      id: 'GL-2026-001',
      type: 'Road Accident',
      location: 'Anna Salai, Chennai',
      reportedAt: '4 minutes ago',
      status: 'ACTIVE',
      responders: 3,
      description: 'Road accident reported nearby.',
      icon: 'bi-car-front-fill'
    },

    {
      id: 'GL-2026-002',
      type: 'Two-Wheeler Accident',
      location: 'RS Puram, Coimbatore',
      reportedAt: '32 minutes ago',
      status: 'RESPONDING',
      responders: 2,
      description: 'Community responders are moving toward the incident.',
      icon: 'bi-bicycle'
    },

    {
      id: 'GL-2026-003',
      type: 'Pedestrian Incident',
      location: 'Trichy Road, Coimbatore',
      reportedAt: 'Yesterday',
      status: 'HANDED_OVER',
      responders: 4,
      description: 'Professional responders have taken over.',
      icon: 'bi-person-walking'
    },

    {
      id: 'GL-2026-004',
      type: 'Road Accident',
      location: 'Gandhi Road, Erode',
      reportedAt: '2 days ago',
      status: 'COMPLETED',
      responders: 3,
      description: 'Community response completed successfully.',
      icon: 'bi-car-front-fill'
    }

  ];

  // ==========================================
  // SUMMARY DATA
  // ==========================================

  get activeCount(): number {
    return this.records.filter(
      record => record.status === 'ACTIVE'
    ).length;
  }

  get totalResponders(): number {
    return this.records.reduce(
      (total, record) => total + record.responders,
      0
    );
  }

  // ==========================================
  // FILTER RECORDS
  // ==========================================

  get filteredRecords(): AccidentRecord[] {

    if (this.activeFilter === 'ALL') {
      return this.records;
    }

    return this.records.filter(
      record => record.status === this.activeFilter
    );
  }

  setFilter(filter: string): void {
    this.activeFilter = filter;
  }

  // ==========================================
  // STATUS LABEL
  // ==========================================

  getStatusLabel(status: AccidentRecord['status']): string {

    switch (status) {

      case 'ACTIVE':
        return 'Community response active';

      case 'RESPONDING':
        return 'Responders are on the way';

      case 'HANDED_OVER':
        return 'Professional handover completed';

      case 'COMPLETED':
        return 'Response completed';

      default:
        return 'Unknown status';
    }
  }

  // ==========================================
  // STATUS CSS CLASS
  // ==========================================

  getStatusClass(status: AccidentRecord['status']): string {

    switch (status) {

      case 'ACTIVE':
        return 'status-active';

      case 'RESPONDING':
        return 'status-responding';

      case 'HANDED_OVER':
        return 'status-handed';

      case 'COMPLETED':
        return 'status-completed';

      default:
        return '';
    }
  }

  // ==========================================
  // VIEW INCIDENT
  // ==========================================

  viewIncident(record: AccidentRecord): void {

    console.log('Selected incident:', record);

    alert(
      `Incident ${record.id}\n\n` +
      `${record.type}\n` +
      `${record.location}\n\n` +
      `${this.getStatusLabel(record.status)}`
    );
  }

}