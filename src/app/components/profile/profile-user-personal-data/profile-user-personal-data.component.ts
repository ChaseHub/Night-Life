import { CommonModule } from '@angular/common';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonList, IonItem, IonLabel, IonIcon, IonInput } from '@ionic/angular/standalone'
import { Observable } from 'rxjs';
import { HideOnClickDirective } from 'src/app/directives/hide-on-click.directive';
import { UidToUsernamePipe } from 'src/app/pipes/uid-to-username.pipe';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';
import { UserData, UserService } from 'src/app/services/database/user.service';
import { UsernameService } from 'src/app/services/database/username.service';

@Component({
  selector: 'app-profile-user-personal-data',
  templateUrl: './profile-user-personal-data.component.html',
  styleUrls: ['./profile-user-personal-data.component.scss'],
  standalone: true,
  imports: [IonInput, IonIcon, IonLabel, IonItem, IonList, UidToUsernamePipe, CommonModule, HideOnClickDirective, FormsModule]
})
export class ProfileUserPersonalDataComponent implements OnInit {

  @Output() backPressed: EventEmitter<void> = new EventEmitter<void>();

  uid: string;
  userData: Observable<UserData>;
  email: string;
  emailVerified: boolean;

  updatedUsername: string = "";
  updatedEmail: string = "";
  updatedAddress: string = "";

  toggleUsernameEdit = false;
  toggleEmailEdit = false;
  toggleAddressEdit = false;

  constructor(private userService: UserService, private authService: AuthenticationService, private usernameService: UsernameService) {
    this.uid = this.authService.currentUser.value?.uid as string;
    this.email = this.authService.currentUser.value?.email as string;
    this.emailVerified = this.authService.isVerified;
    this.userData = this.userService.getUserData(this.uid);
  }

  ngOnInit() {
    let test = 0;
  }

  updateEmail() {
    if (!this.updatedEmail) {
      return;
    }
    this.authService.updateEmail(this.updatedEmail).subscribe(
      () => {
        this.email = this.authService.currentUser.value?.email as string;
        this.toggleEmailEdit = false;
      }
    );
  }

  updateUsername() {
    if (!this.updatedUsername) {
      return;
    }
    this.usernameService.getUsername(this.uid).subscribe(
      (username) => {
        this.userService.updateUsername(this.uid, this.updatedUsername).subscribe(
          () => {
            this.usernameService.updateUsername(username, this.updatedUsername).subscribe(
              () => {
                this.userData = this.userService.getUserData(this.uid);
                this.toggleUsernameEdit = false;
              }
            );
          }
        );
      }
    );
  }

  updateAddress() {
    if (!this.updatedAddress) {
      return;
    }
    this.userService.updatePersonalData(this.uid, { home: { formattedAddress: this.updatedAddress, lat: -9999, lng: -9999 } }).subscribe(
      () => {
        this.userData = this.userService.getUserData(this.uid);
        this.toggleAddressEdit = false;
      }
    );
  }

  sendEmailVerification() {
    this.authService.sendEmailVerification().subscribe();
  }

  signOut() {
    this.authService.signOut().subscribe();
  }
}
