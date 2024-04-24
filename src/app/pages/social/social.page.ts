import { Component, OnInit } from '@angular/core';
import { IonContent } from '@ionic/angular/standalone';
import { SocialFriendInvitesComponent } from 'src/app/components/social/social-friend-invites/social-friend-invites.component';
import { SocialFriendSearchComponent } from 'src/app/components/social/social-friend-search/social-friend-search.component';
import { SocialFriendsListComponent } from 'src/app/components/social/social-friends-list/social-friends-list.component';
import { SocialInviteToPlanComponent } from 'src/app/components/social/social-invite-to-plan/social-invite-to-plan.component';

@Component({
  selector: 'app-social',
  templateUrl: './social.page.html',
  styleUrls: ['./social.page.scss'],
  standalone: true,
  imports: [IonContent, SocialFriendsListComponent, SocialFriendSearchComponent, SocialFriendInvitesComponent, SocialInviteToPlanComponent]
})
export class SocialPage implements OnInit {
  readonly Content = Content;
  currentContent: Content = Content.FriendsList;

  selectedUser: string = "";

  constructor() { }

  ngOnInit() {
    let test = 0;
  }

}

enum Content {
  FriendsList = "friendsList",
  FriendSearch = "friendSearch",
  FriendInvites = 'friendInvites',
  InviteToPlan = 'inviteToPlan'
}
