import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';

import { TranslationService } from '../../../core/services/translation';

interface Community {
  id: string;
  name: string;
  area: string;
  distanceKm: number;
  members: number;
  activeMembers: number;
  status: 'ACTIVE' | 'QUIET';
  descriptionKey:
    | 'nearbyCommunityAnnaDescription'
    | 'nearbyCommunityTnDescription'
    | 'nearbyCommunityGuindyDescription'
    | 'nearbyCommunityVelacheryDescription';
  categoryKey:
    | 'nearbyCommunitySafety'
    | 'nearbyCommunityEmergencySupport'
    | 'nearbyCommunityNeighbourhood';
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

  readonly translation =
    inject(TranslationService);

  activeFilter = 'ALL';

  communities: Community[] = [

    {
      id: 'COM-001',
      name: 'Anna Nagar Community',
      area: 'Anna Nagar, Chennai',
      distanceKm: 1.1,
      members: 284,
      activeMembers: 42,
      status: 'ACTIVE',
      descriptionKey:
        'nearbyCommunityAnnaDescription',
      categoryKey:
        'nearbyCommunitySafety',
      initials: 'AN'
    },

    {
      id: 'COM-002',
      name: 'T Nagar Response Group',
      area: 'T Nagar, Chennai',
      distanceKm: 2.4,
      members: 196,
      activeMembers: 28,
      status: 'ACTIVE',
      descriptionKey:
        'nearbyCommunityTnDescription',
      categoryKey:
        'nearbyCommunityEmergencySupport',
      initials: 'TN'
    },

    {
      id: 'COM-003',
      name: 'Guindy Volunteers',
      area: 'Guindy, Chennai',
      distanceKm: 3.2,
      members: 153,
      activeMembers: 12,
      status: 'QUIET',
      descriptionKey:
        'nearbyCommunityGuindyDescription',
      categoryKey:
        'nearbyCommunityNeighbourhood',
      initials: 'GV'
    },

    {
      id: 'COM-004',
      name: 'Velachery Community',
      area: 'Velachery, Chennai',
      distanceKm: 4.6,
      members: 327,
      activeMembers: 36,
      status: 'ACTIVE',
      descriptionKey:
        'nearbyCommunityVelacheryDescription',
      categoryKey:
        'nearbyCommunitySafety',
      initials: 'VC'
    }

  ];


  // -----------------------------------------
  // Translation
  // -----------------------------------------

  t(key: string): string {
    return this.translation.translate(key);
  }


  // -----------------------------------------
  // Filter
  // -----------------------------------------

  get filteredCommunities(): Community[] {

    if (this.activeFilter === 'ALL') {
      return this.communities;
    }

    return this.communities.filter(
      community =>
        community.status === this.activeFilter
    );

  }


  setFilter(filter: string): void {

    this.activeFilter =
      filter;

  }


  // -----------------------------------------
  // Status
  // -----------------------------------------

  getStatusLabel(
    status: Community['status']
  ): string {

    return status === 'ACTIVE'
      ? this.t('nearbyCommunityActive')
      : this.t('nearbyCommunityQuiet');

  }


  getStatusClass(
    status: Community['status']
  ): string {

    return status === 'ACTIVE'
      ? 'community-active'
      : 'community-quiet';

  }


  // -----------------------------------------
  // Description
  // -----------------------------------------

  getDescription(
    community: Community
  ): string {

    return this.t(
      community.descriptionKey
    );

  }


  // -----------------------------------------
  // Category
  // -----------------------------------------

  getCategory(
    community: Community
  ): string {

    return this.t(
      community.categoryKey
    );

  }


  // -----------------------------------------
  // Distance
  // -----------------------------------------

  getDistance(
    distanceKm: number
  ): string {

    return `${distanceKm.toFixed(1)} ${this.t('nearbyCommunityKm')}`;

  }


  // -----------------------------------------
  // View community
  // -----------------------------------------

  viewCommunity(
    community: Community
  ): void {

    alert(
      `${community.name}\n\n` +
      `${community.area}\n` +
      `${community.members} ${this.t('nearbyCommunityMembers')}\n` +
      `${community.activeMembers} ${this.t('nearbyCommunityActiveNow')}`
    );

  }


  // -----------------------------------------
  // Join community
  // -----------------------------------------

  joinCommunity(
    community: Community
  ): void {

    alert(
      `${this.t('nearbyCommunityJoin')} ${community.name}\n\n` +
      `${this.t('nearbyCommunityFrontendDemo')}`
    );

  }

}