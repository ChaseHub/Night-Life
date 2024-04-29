import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { UserLocationService } from 'src/app/services/location/user-location.service';
import { MapboxService } from 'src/app/services/mapbox/mapbox.service';
import { ClickRippleDirective } from 'src/app/directives/click-ripple.directive';

@Component({
  selector: 'app-mapbox-map',
  templateUrl: './mapbox-map.component.html',
  styleUrls: ['./mapbox-map.component.scss'],
  standalone: true,
  imports: [ClickRippleDirective],
})
export class MapboxMapComponent implements OnInit {

  constructor(private mapbox: MapboxService, private userLocationService: UserLocationService) {}

  ngOnInit() {
    let test = 0;
    const userLocation = this.userLocationService.currentLocation$.getValue();
    this.mapbox.initializeMap(userLocation.longitude, userLocation.latitude);
  }

}

export interface Coords {
  lat: number;
  lng: number;
}
