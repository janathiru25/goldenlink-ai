export interface Hospital {
  hospitalId: string;

  name: string;

  address: string;

  latitude: number;

  longitude: number;

  distanceKm?: number;

  phone?: string;

  emergencyAvailable: boolean;

  availableBeds?: number;

  icuAvailable?: number;

  specialties?: string[];

  ambulanceAvailable?: boolean;

  estimatedArrivalMinutes?: number;

  operatingHours?: string;

  rating?: number;
}