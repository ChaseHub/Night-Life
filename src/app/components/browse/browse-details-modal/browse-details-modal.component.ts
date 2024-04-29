import { CUSTOM_ELEMENTS_SCHEMA, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IonItem, IonGrid, IonRow, IonCol, IonIcon, IonLabel, IonText, IonList, IonImg, IonThumbnail, ModalController } from "@ionic/angular/standalone";
import { Photo, Place } from 'src/app/services/foursquare/foursquare.service';
import { BrowseAddToPlanComponent } from '../browse-add-to-plan/browse-add-to-plan.component';

@Component({
  selector: 'app-browse-details-modal',
  templateUrl: './browse-details-modal.component.html',
  styleUrls: ['./browse-details-modal.component.scss'],
  standalone: true,
  imports: [IonImg, IonList, IonText, IonLabel, IonIcon, IonCol, IonRow, IonGrid, IonItem, IonThumbnail, BrowseAddToPlanComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class BrowseDetailsModalComponent implements OnInit {

  @Input() place!: Place;

  addToPlanClicked: boolean = false;

  constructor(private modalController: ModalController) { }

  ngOnInit() {
    let test = 0;
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

  getStars(rating: number | undefined): string[] {
    if (!rating) {
      return [];
    }

    const convertedRating = Math.min(Math.max(0, Math.round(rating) / 2), 5);
    const fullStars = Math.floor(convertedRating);
    const halfStar = convertedRating % 1 === 0.5 ? 1 : 0;

    const stars: string[] = Array(fullStars).fill('full_star');
    if (halfStar === 1) {
      stars.push('half_star');
    }
    return stars;
  }

  getPrice(price: number | undefined): string {
    return price ? '$'.repeat(price) : "";
  }

  async exitModal() {
    await this.modalController.dismiss(null, 'backPressed');
  }

}
