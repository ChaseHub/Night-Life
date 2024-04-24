import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';
import { FriendshipService } from 'src/app/services/database/friendship.service';
import { IonList, IonItem, IonIcon, IonChip, IonAvatar, IonLabel } from "@ionic/angular/standalone";
import { CommonModule } from '@angular/common';
import { UidToUsernamePipe } from 'src/app/pipes/uid-to-username.pipe';

@Component({
  selector: 'app-social-friend-invites',
  templateUrl: './social-friend-invites.component.html',
  styleUrls: ['./social-friend-invites.component.scss'],
  standalone: true,
  imports: [IonLabel, IonAvatar, IonChip, IonIcon, IonItem, IonList, CommonModule, UidToUsernamePipe]
})
export class SocialFriendInvitesComponent implements OnInit {

  @Output() backPressed: EventEmitter<void> = new EventEmitter<void>();

  friendInvites$: Observable<string[]>;

  constructor(private authService: AuthenticationService, private friendshipService: FriendshipService) {
    const uid = this.authService.currentUser.value?.uid as string;
    this.friendInvites$ = this.friendshipService.getFriendRequest(uid);
  }

  ngOnInit() {
    let test = 0;
  }

  acceptFriendRequest(inviteUID: string){
    const uid = this.authService.currentUser.value?.uid as string;
    this.friendshipService.acceptFriendRequest(inviteUID, uid).subscribe(
      () => {
        this.friendInvites$ = this.friendshipService.getFriendRequest(uid);
      }
    );
  }

}
