import { CUSTOM_ELEMENTS_SCHEMA, Component, EventEmitter, OnInit, Output } from '@angular/core';
import { IonList, IonItem, IonLabel, IonItemGroup, IonThumbnail } from "@ionic/angular/standalone";
import { BrowseSwipeComponent } from '../browse-swipe/browse-swipe.component';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';
import { FoursquareService, Place, PlaceSearchQuery } from 'src/app/services/foursquare/foursquare.service';
import { Observable, map } from 'rxjs';
import { CommonModule } from '@angular/common';
import { UserLocationService } from 'src/app/services/location/user-location.service';

@Component({
  selector: 'app-browse-discover',
  templateUrl: './browse-discover.component.html',
  styleUrls: ['./browse-discover.component.scss'],
  standalone: true,
  imports: [IonItemGroup, IonLabel, IonItem, IonList, IonThumbnail, BrowseSwipeComponent, CommonModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class BrowseDiscoverComponent implements OnInit {

  @Output() selectedFoursquareLocation: EventEmitter<Place> = new EventEmitter<Place>();

  places$: Observable<Place[]>;

  constructor(private foursquareService: FoursquareService, private authService: AuthenticationService, private userLocationService: UserLocationService) {
    this.places$ = this.foursquareService.placeSearch(this.getSearchQuery()).pipe(map(results => { return results.results }));
  }

  getSearchQuery(): PlaceSearchQuery{
    const userLocation = this.userLocationService.currentLocation$.getValue();
    return {
      ll: `${userLocation.latitude},${userLocation.longitude}`,
      sort: 'DISTANCE',
      limit: 5,
      fields: "distance,hours,rating,location,photos,name,price,tips,website,fsq_id,geocodes"
    }
  }

  ngOnInit() {
    let test = 0;
  }

  discoverLocations() {
  }

}
