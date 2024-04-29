import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserLocationService {

  private defaultLocation = { latitude: 30.2672, longitude: -97.7431 }; // Austin, Texas coordinates
  currentLocation$: BehaviorSubject<{ latitude: number; longitude: number }> = new BehaviorSubject<{ latitude: number; longitude: number }>(this.defaultLocation);

  constructor() {
    this.startWatchingLocation();
  }

  private startWatchingLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.watchPosition(
        position => {
          this.currentLocation$.next({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
          });
        },
        error => {
          console.error('Error getting location:', error);
          this.currentLocation$.next(this.defaultLocation);
        }
      );
    } else {
      console.error('Geolocation is not supported by this browser.');
      this.currentLocation$.next(this.defaultLocation);
    }
  }
}
