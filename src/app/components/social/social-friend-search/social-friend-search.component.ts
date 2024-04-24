import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { IonList, IonInput, IonItem, IonChip, IonAvatar, IonLabel, IonIcon } from "@ionic/angular/standalone";
import { HideOnClickDirective } from 'src/app/directives/hide-on-click.directive';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';
import { FriendshipService } from 'src/app/services/database/friendship.service';
import { UsernameService } from 'src/app/services/database/username.service';


@Component({
  selector: 'app-social-friend-search',
  templateUrl: './social-friend-search.component.html',
  styleUrls: ['./social-friend-search.component.scss'],
  standalone: true,
  imports: [IonIcon, IonLabel, IonAvatar, IonChip, IonItem, IonInput, IonList, ReactiveFormsModule, HideOnClickDirective]
})
export class SocialFriendSearchComponent implements OnInit {

  @Output() backPressed: EventEmitter<void> = new EventEmitter<void>();

  foundUser: { username: string, uid: string, alreadyFriend: boolean } | null = null;
  alreadyFriend: boolean = false;

  friendSearchForm: FormGroup = new FormGroup({
    search: new FormControl("")
  });

  username!: string;

  constructor(private usernameService: UsernameService, private authService: AuthenticationService, private friendshipService: FriendshipService) {
    const uid = this.authService.currentUser.value?.uid as string;
    this.usernameService.getUsername(uid).subscribe(
      (username) => {
        this.username = username;
      }
    );
  }

  ngOnInit() {
    let test = 0;
  }

  submitSearch() {
    if (!this.friendSearchForm.value.search || this.friendSearchForm.value.search === this.username) {
      return;
    }
    const searchValue = this.friendSearchForm.value.search as string;
    this.usernameService.usernameExists(searchValue).subscribe(
      (exist) => {
        if (exist) {
          this.usernameService.getUID(this.friendSearchForm.value.search).subscribe(
            (foundUID) => {
              const uid = this.authService.currentUser.value?.uid as string;
              this.friendshipService.doesFriendshipExist(uid, foundUID).subscribe(
                (friendshipExist) => {
                  this.foundUser = { username: searchValue, uid: foundUID, alreadyFriend: friendshipExist };
                }
              )
            }
          );
        } else {
          this.foundUser = null;
        }
      }
    )
  }

  sendFriendRequest() {
    if (!this.foundUser) {
      return
    }
    const uid = this.authService.currentUser.value?.uid as string;
    this.friendshipService.createFriendship(uid, this.foundUser?.uid).subscribe();
  }

}
