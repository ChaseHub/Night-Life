import { CommonModule } from '@angular/common';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { IonItem, IonIcon, IonList, IonLabel, IonToggle } from '@ionic/angular/standalone'
import { Observable } from 'rxjs';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';
import { UserData, UserService } from 'src/app/services/database/user.service';

@Component({
  selector: 'app-profile-user-settings',
  templateUrl: './profile-user-settings.component.html',
  styleUrls: ['./profile-user-settings.component.scss'],
  standalone: true,
  imports: [IonToggle, IonLabel, IonList, IonIcon, IonItem, CommonModule]
})
export class ProfileUserSettingsComponent implements OnInit {

  @Output() backPressed: EventEmitter<void> = new EventEmitter<void>();

  userData: Observable<UserData>;

  constructor(private userService: UserService, private authService: AuthenticationService) {
    const uid = this.authService.currentUser.value?.uid as string;
    this.userData = this.userService.getUserData(uid);
  }

  ngOnInit() {
    let test = 0;
  }

  updateLocationAllowed(checked: boolean){
    const uid = this.authService.currentUser.value?.uid as string;
    this.userService.updateSettings(uid, {locationAllowed: checked}).subscribe();
  }

  updateAccountPrivate(checked: boolean){
    const uid = this.authService.currentUser.value?.uid as string;
    this.userService.updateSettings(uid, {accountPrivate: checked}).subscribe();
  }

}
