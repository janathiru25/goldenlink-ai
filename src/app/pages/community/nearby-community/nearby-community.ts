import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

interface Community {
  id: string;
  name: string;
  area: string;
  distance: string;
  members: number;
  activeMembers: number;
  status: 'ACTIVE' | 'QUIET';
  description: string;
  category: string;
  initials: string;
}

@Component({
  selector: 'app-nearby-community',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './nearby-community.html',
  styleUrl: './nearby-community.scss',
})
export class NearbyCommunity {

  activeFilter = 'ALL';

  communities: Community[] = [
    {
      id: 'COM-001',
      name: 'Anna Nagar Community',
      area: 'Anna Nagar, Chennai',
      distance: '1.1 km',
      members: 284,
      activeMembers: 42,
      status: 'ACTIVE',
      description: 'Local volunteers coordinating community safety and support.',
      category: 'Community Safety',
      initials: 'AN'
    },
    {
      id: 'COM-002',
      name: 'T Nagar Response Group',
      area: 'T Nagar, Chennai',
      distance: '2.4 km',
      members: 196,
      activeMembers: 28,
      status: 'ACTIVE',
      description: 'A neighbourhood group supporting local emergency response.',
      category: 'Emergency Support',
      initials: 'TN'
    },
    {
      id: 'COM-003',
      name: 'Guindy Volunteers',
      area: 'Guindy, Chennai',
      distance: '3.2 km',
      members: 153,
      activeMembers: 12,
      status: 'QUIET',
      description: 'Community volunteers sharing local information and support.',
      category: 'Neighbourhood',
      initials: 'GV'
    },
    {
      id: 'COM-004',
      name: 'Velachery Community',
      area: 'Velachery, Chennai',
      distance: '4.6 km',
      members: 327,
      activeMembers: 36,
      status: 'ACTIVE',
      description: 'Active community network helping residents coordinate safely.',
      category: 'Community Safety',
      initials: 'VC'
    }
  ];

  get filteredCommunities(): Community[] {
    if (this.activeFilter === 'ALL') {
      return this.communities;
    }

    return this.communities.filter(
      community => community.status === this.activeFilter
    );
  }

  setFilter(filter: string): void {
    this.activeFilter = filter;
  }

  getStatusLabel(status: Community['status']): string {
    return status === 'ACTIVE'
      ? 'Active community'
      : 'Currently quiet';
  }

  getStatusClass(status: Community['status']): string {
    return status === 'ACTIVE'
      ? 'community-active'
      : 'community-quiet';
  }

  viewCommunity(community: Community): void {
    alert(
      `${community.name}\n\n` +
      `${community.area}\n` +
      `${community.members} members\n` +
      `${community.activeMembers} active now`
    );
  }

  joinCommunity(community: Community): void {
    alert(
      `Join ${community.name}\n\n` +
      `This is currently a frontend demonstration.`
    );
  }
}