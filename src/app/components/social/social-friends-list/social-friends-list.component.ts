import { CommonModule } from '@angular/common';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { IonList, IonItem, IonLabel, IonIcon, IonChip, IonAvatar, IonItemSliding, IonItemOptions, IonItemOption } from "@ionic/angular/standalone";
import { Observable } from 'rxjs';
import { UidToUsernamePipe } from 'src/app/pipes/uid-to-username.pipe';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';
import { FriendshipService } from 'src/app/services/database/friendship.service';

@Component({
  selector: 'app-social-friends-list',
  templateUrl: './social-friends-list.component.html',
  styleUrls: ['./social-friends-list.component.scss'],
  standalone: true,
  imports: [IonItemOption, IonItemOptions, IonItemSliding, IonAvatar, IonChip, IonIcon, IonLabel, IonItem, IonList, CommonModule, UidToUsernamePipe]
})
export class SocialFriendsListComponent implements OnInit {

  @Output() invitesPressed: EventEmitter<void> = new EventEmitter<void>();
  @Output() searchPressed: EventEmitter<void> = new EventEmitter<void>();
  @Output() inviteToPlanPressed: EventEmitter<string> = new EventEmitter<string>();

  friends$: Observable<string[]>;

  constructor(private authService: AuthenticationService, private friendshipService: FriendshipService) {
    const uid: string = this.authService.currentUser.value?.uid as string;
    this.friends$ = this.friendshipService.getFriends(uid);
  }

  ngOnInit() {
    let test = 0;
  }

  removeFriend(friendUID: string) {
    if (!friendUID) {
      return;
    }
    const uid: string = this.authService.currentUser.value?.uid as string;
    this.friendshipService.removeFriendship(uid, friendUID).subscribe(
      () => {
        this.friends$ = this.friendshipService.getFriends(uid);
      }
    )
  }

}
