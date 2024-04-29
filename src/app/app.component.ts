import { Component } from '@angular/core';
import { IonApp, IonRouterOutlet } from '@ionic/angular/standalone';
import { AuthenticationService } from './services/authentication/authentication.service';
import { register } from 'swiper/element/bundle'
import { UserLocationService } from './services/location/user-location.service';
register();
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  standalone: true,
  imports: [IonApp, IonRouterOutlet],
})
export class AppComponent {
  constructor(private authService: AuthenticationService, private userLocationService: UserLocationService) {}
}
