import { CommonModule } from '@angular/common';
import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { IonItem, IonLabel, IonList, IonImg, IonThumbnail } from '@ionic/angular/standalone'
import { Observable, Subscription, map } from 'rxjs';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';
import { CustomLocationData } from 'src/app/services/database/custom-location.service';
import { FoursquareService, Photo, Place, PlaceSearchQuery } from 'src/app/services/foursquare/foursquare.service';
import { UserLocationService } from 'src/app/services/location/user-location.service';
import { MapboxService } from 'src/app/services/mapbox/mapbox.service';

@Component({
  selector: 'app-mapbox-discover-select',
  templateUrl: './mapbox-discover-select.component.html',
  styleUrls: ['./mapbox-discover-select.component.scss'],
  standalone: true,
  imports: [IonImg, IonList, IonLabel, IonItem, CommonModule, IonThumbnail],
})
export class MapboxDiscoverSelectComponent implements OnInit {

  @Output() selectedPlace: EventEmitter<Place | { id: string, data: CustomLocationData }> = new EventEmitter<Place | { id: string, data: CustomLocationData }>();
  //subscription: Subscription;

  places$: Observable<Place[]>;

  constructor(private foursquareService: FoursquareService, private userLocationService: UserLocationService, private mapboxService: MapboxService) {
    this.places$ = this.foursquareService.placeSearch(this.getSearchQuery(this.userLocationService.currentLocation$.value.latitude, this.userLocationService.currentLocation$.value.longitude)).pipe(map(results => { return results.results }));
    this.mapboxService.clickCoords.subscribe(
      coords => {
        this.places$ = this.foursquareService.placeSearch(this.getSearchQuery(coords.lat, coords.lng)).pipe(map(results => { return results.results }));
      }
    );

  }

  ngOnInit() {
    let test = 0;
  }

  getSearchQuery(lat: number, lng: number): PlaceSearchQuery {
    const userLocation = this.userLocationService.currentLocation$.getValue();
    return {
      ll: `${lat},${lng}`,
      sort: 'DISTANCE',
      limit: 12,
      fields: "distance,hours,rating,location,photos,name,price,tips,website,fsq_id,geocodes"
    }
  }

  getPlacePhotoSrc(photo: Photo | undefined): string {
    if (!photo) {
      return 'https://ionicframework.com/docs/img/demos/card-media.png';
    }
    return photo.prefix + '800x800' + photo.suffix;
  }

  metersToMiles(meters: number | undefined): string {
    if (!meters) { return '0.0 mi' };
    const miles = meters * 0.000621371;
    return miles.toFixed(2) + ' mi';
  }

}
