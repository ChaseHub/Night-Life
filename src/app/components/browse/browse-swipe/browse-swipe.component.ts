import { CUSTOM_ELEMENTS_SCHEMA, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IonItemGroup, IonItem, IonThumbnail, IonLabel } from "@ionic/angular/standalone";
import { CustomLocationData } from 'src/app/services/database/custom-location.service';
import { Photo, Place } from 'src/app/services/foursquare/foursquare.service';

@Component({
  selector: 'app-browse-swipe',
  templateUrl: './browse-swipe.component.html',
  styleUrls: ['./browse-swipe.component.scss'],
  standalone: true,
  imports: [IonItem, IonItemGroup, IonThumbnail, IonLabel],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class BrowseSwipeComponent implements OnInit {

  @Input() foursquareLocations: Place[] | null = [];
  @Input() customLocations: { id: string, data: CustomLocationData }[] = [];

  @Output() selectedFoursquareLocation: EventEmitter<Place> = new EventEmitter<Place>();
  @Output() selectedCustomLocation: EventEmitter<{ id: string, data: CustomLocationData }> = new EventEmitter<{ id: string, data: CustomLocationData }>();

  constructor() { }

  ngOnInit() {
    let test = 0;
  }

  getPlacePhotoSrc(photo: Photo | undefined): string {
    if (!photo) {
      return 'https://ionicframework.com/docs/img/demos/card-media.png';
    }
    return photo.prefix + '800x800' + photo.suffix;
  }

}
