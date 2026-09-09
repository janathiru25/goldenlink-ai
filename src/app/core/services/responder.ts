import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, map, of, tap } from 'rxjs';
import { Responder } from '../models/responder';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ResponderService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = environment.apiUrl;

  private defaultResponders: Responder[] = [
    {
      id: 1,
      responderId: 'GL-R-2026-001',
      name: 'Arun Kumar',
      initials: 'AK',
      role: 'First-Aid Trained',
      type: 'medical',
      phone: '+91 98765 43210',
      distance: '0.4 km',
      distanceKm: 0.4,
      eta: '3 min',
      estimatedArrivalMinutes: 3,
      rating: 4.9,
      verified: true,
      available: true,
      status: 'available',
      skills: ['First Aid', 'Traffic Support', 'CPR'],
      icon: 'bi-person-check-fill'
    },
    {
      id: 2,
      responderId: 'GL-R-2026-002',
      name: 'Priya S',
      initials: 'PS',
      role: 'Community Volunteer',
      type: 'volunteer',
      phone: '+91 98765 43211',
      distance: '0.8 km',
      distanceKm: 0.8,
      eta: '5 min',
      estimatedArrivalMinutes: 5,
      rating: 4.8,
      verified: true,
      available: true,
      status: 'available',
      skills: ['Community Support', 'Location Guidance', 'First Aid'],
      icon: 'bi-person-heart'
    },
    {
      id: 3,
      responderId: 'GL-R-2026-003',
      name: 'Vignesh R',
      initials: 'VR',
      role: 'First Response Volunteer',
      type: 'ambulance',
      phone: '+91 98765 43212',
      distance: '1.1 km',
      distanceKm: 1.1,
      eta: '7 min',
      estimatedArrivalMinutes: 7,
      rating: 4.7,
      verified: true,
      available: true,
      status: 'available',
      skills: ['First Aid', 'Emergency Communication', 'Trauma Care'],
      icon: 'bi-shield-check'
    },
    {
      id: 4,
      responderId: 'GL-R-2026-004',
      name: 'Kavya M',
      initials: 'KM',
      role: 'Community Volunteer',
      type: 'volunteer',
      phone: '+91 98765 43213',
      distance: '1.6 km',
      distanceKm: 1.6,
      eta: '9 min',
      estimatedArrivalMinutes: 9,
      rating: 4.6,
      verified: true,
      available: false,
      status: 'busy',
      skills: ['Location Guidance', 'Communication'],
      icon: 'bi-person-check'
    }
  ];

  getResponders(): Observable<Responder[]> {
    return this.http.get<Responder[]>(`${this.apiUrl}/responders`).pipe(
      catchError(err => {
        console.warn('GoldenLink: Using local fallback responders:', err);
        return of(this.defaultResponders);
      })
    );
  }

  getNearbyResponders(lat: number, lng: number, radiusKm: number = 5): Observable<Responder[]> {
    return this.http.get<Responder[]>(`${this.apiUrl}/responders/nearby`, {
      params: { lat, lng, radius_km: radiusKm }
    }).pipe(
      catchError(err => {
        console.warn('GoldenLink: Nearby responders API fallback:', err);
        return of(this.defaultResponders);
      })
    );
  }

  getRecommendedResponders(incidentId: string): Observable<Responder[]> {
    return this.http.get<Responder[]>(`${this.apiUrl}/incidents/${incidentId}/recommended-responders`).pipe(
      catchError(err => {
        console.warn('GoldenLink: Recommended responders API fallback:', err);
        return of(this.defaultResponders);
      })
    );
  }

  acceptIncident(responderId: string | number, incidentId: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/responders/${responderId}/accept/${incidentId}`, {}).pipe(
      catchError(err => {
        console.warn('GoldenLink: Accept incident API fallback:', err);
        return of({ success: true, message: 'Local fallback accepted' });
      })
    );
  }

  updateStatus(responderId: string | number, status: string): Observable<Responder> {
    return this.http.patch<Responder>(`${this.apiUrl}/responders/${responderId}/status`, { status }).pipe(
      catchError(err => {
        console.warn('GoldenLink: Update responder status API fallback:', err);
        const match = this.defaultResponders.find(r => r.id === responderId || r.responderId === responderId);
        return of(match || { id: responderId, status } as Responder);
      })
    );
  }
}

// Backward-compatibility alias for the spec file
export { ResponderService as Responder };
