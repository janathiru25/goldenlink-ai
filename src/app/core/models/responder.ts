export type ResponderType =
  | 'ambulance'
  | 'police'
  | 'fire'
  | 'medical'
  | 'rescue'
  | string;

export type ResponderStatus =
  | 'available'
  | 'dispatched'
  | 'on-scene'
  | 'busy'
  | 'offline'
  | string;

export interface Responder {
  id?: string | number;

  responderId?: string | number;

  name?: string;

  type?: ResponderType;

  phone?: string;

  status?: ResponderStatus;

  vehicleNumber?: string;

  latitude?: number;

  longitude?: number;

  distanceKm?: number;

  estimatedArrivalMinutes?: number;

  organization?: string;

  assignedIncidentId?: string | number;

  lastUpdated?: string;

  [key: string]: any;
}