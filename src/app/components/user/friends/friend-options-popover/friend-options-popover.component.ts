import { Component, Input, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular/standalone';
import { IonicModule } from '@ionic/angular';
import { FriendshipService } from 'src/app/services/database/friendship.service';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';
import { Member, PlanData, PlanService, Role } from 'src/app/services/database/plan.service';
import { Observable, forkJoin, map } from 'rxjs';

@Component({
  selector: 'app-friend-options-popover',
  templateUrl: './friend-options-popover.component.html',
  styleUrls: ['./friend-options-popover.component.scss'],
  standalone: true,
  imports: [IonicModule]
})
export class FriendOptionsPopoverComponent implements OnInit {

  @Input() friendUID: string | null = null;

  plans: { id: string, data: PlanData }[] = [];

  constructor(private popoverController: PopoverController, private friendshipService: FriendshipService, private authService: AuthenticationService, private planService: PlanService) {
    this.getPlans();
  }

  ngOnInit() {
    let test = 0;
  }

  async removeFriend() {
    const uid = this.authService.currentUser.value?.uid as string;
    this.friendshipService.removeFriendship(uid, this.friendUID as string).subscribe(
      () => {
        this.popoverController.dismiss(null, 'removed');
      }
    );
  }

  async getPlans() {
    this.plans = [];
    const uid = this.authService.currentUser.value?.uid as string;
    this.planService.getUserPlans(uid).subscribe(
      (planIDs) => {
        planIDs.forEach(id => {
          this.planService.getPlanData(uid, id).subscribe(
            (data) => {
              const member = (data.members as Member[]).find(member => member.uid === uid);
              if (member && (member.role === Role.CoOwner || member?.role === Role.Owner)) {
                this.plans.push({ id, data })
              }
            }
          );
        });
      }
    );
  }

  async inviteFriendToPlan(planID: string) {
    const uid = this.authService.currentUser.value?.uid as string;
    this.planService.addMember(uid, planID, this.friendUID as string).subscribe(
      () => {
        this.popoverController.dismiss(null, 'invited');
      }
    );
  }

}
