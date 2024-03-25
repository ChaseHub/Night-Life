import { CUSTOM_ELEMENTS_SCHEMA, Component, Input, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { FoursquareCardSmallComponent } from '../foursquare-card-small/foursquare-card-small.component';
import { FoursquareCardMediumComponent } from '../foursquare-card-medium/foursquare-card-medium.component';
import { FoursquareCardLargeComponent } from '../foursquare-card-large/foursquare-card-large.component';
import { Place } from 'src/app/services/foursquare/foursquare.service';

@Component({
  selector: 'app-foursquare-swipe',
  templateUrl: './foursquare-swipe.component.html',
  styleUrls: ['./foursquare-swipe.component.scss'],
  standalone: true,
  imports: [IonicModule, FoursquareCardSmallComponent, FoursquareCardMediumComponent, FoursquareCardLargeComponent],
  schemas:[CUSTOM_ELEMENTS_SCHEMA]
})
export class FoursquareSwipeComponent  implements OnInit {

  @Input() size: string = this.getRandomSize();

  @Input() places: Place[] = [];

  constructor() { }

  ngOnInit() {
    let test = 0;
    console.log('swipe foursquare component created');
  }

  getRandomSize(): string {
    const sizes = ['small', 'medium', 'large'];
    const randomIndex = Math.floor(Math.random() * sizes.length);
    return sizes[randomIndex];
}

}

