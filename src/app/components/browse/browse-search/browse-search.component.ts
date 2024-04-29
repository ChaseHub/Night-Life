import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { IonItem, IonLabel, IonList, IonImg, IonThumbnail } from "@ionic/angular/standalone";
import { Observable, map } from 'rxjs';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';
import { CustomLocationData } from 'src/app/services/database/custom-location.service';
import { FoursquareService, Photo, Place, PlaceSearchQuery } from 'src/app/services/foursquare/foursquare.service';
import { UserLocationService } from 'src/app/services/location/user-location.service';

@Component({
  selector: 'app-browse-search',
  templateUrl: './browse-search.component.html',
  styleUrls: ['./browse-search.component.scss'],
  standalone: true,
  imports: [IonImg, IonList, IonLabel, IonItem, IonThumbnail, CommonModule]
})
export class BrowseSearchComponent implements OnInit, OnChanges {

  @Input() searchQuery: string = "";
  @Output() selectedFoursquareLocation: EventEmitter<Place> = new EventEmitter<Place>();
  @Output() selectedCustomLocation: EventEmitter<{ id: string, data: CustomLocationData }> = new EventEmitter<{ id: string, data: CustomLocationData }>();

  places$: Observable<Place[]> | null = null;


  constructor(private authService: AuthenticationService, private foursquareService: FoursquareService, private userLocationService: UserLocationService) {
  }

  ngOnInit() {
    let test = 0;
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.findPlaces(this.searchQuery);
  }

  findPlaces(query: string) {
    const userLocation = this.userLocationService.currentLocation$.getValue();
    let placeSearchQuery: PlaceSearchQuery = {
      query: query,
      ll: `${userLocation.latitude},${userLocation.longitude}`,
      sort: 'DISTANCE',
      limit: 12,
      fields: "distance,hours,rating,location,photos,name,price,tips,website,fsq_id,geocodes"
    }
    this.places$ = this.foursquareService.placeSearch(placeSearchQuery).pipe(map(results => { return results.results }));
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
