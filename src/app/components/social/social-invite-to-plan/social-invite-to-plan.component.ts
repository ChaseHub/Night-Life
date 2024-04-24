import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { Observable, map, switchMap } from 'rxjs';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';
import { PlanData, PlanService, Role } from 'src/app/services/database/plan.service';
import { IonList, IonItem, IonIcon } from "@ionic/angular/standalone";
import { UidToUsernamePipe } from 'src/app/pipes/uid-to-username.pipe';
import { CommonModule } from '@angular/common';
import { FriendshipService } from 'src/app/services/database/friendship.service';
import { HideOnClickDirective } from 'src/app/directives/hide-on-click.directive';

@Component({
  selector: 'app-social-invite-to-plan',
  templateUrl: './social-invite-to-plan.component.html',
  styleUrls: ['./social-invite-to-plan.component.scss'],
  standalone: true,
  imports: [IonIcon, IonItem, IonList, UidToUsernamePipe, CommonModule, HideOnClickDirective]
})
export class SocialInviteToPlanComponent implements OnInit, OnChanges {

  @Input() selectedUser!: string;
  @Output() backPressed: EventEmitter<void> = new EventEmitter<void>();

  plans$: Observable<{ id: string, data: PlanData }[]>;

  constructor(private authService: AuthenticationService, private planService: PlanService, private friendshipService: FriendshipService) {
    const uid = this.authService.currentUser.value?.uid as string;
    this.plans$ = planService.getUserPlans(uid).pipe(switchMap(plans => this.filterPlans(plans)));
  }

  ngOnInit() {
    let test = 0;
  }

  ngOnChanges(changes: SimpleChanges): void {
    const uid = this.authService.currentUser.value?.uid as string;
    this.friendshipService.doesFriendshipExist(uid, this.selectedUser).subscribe(
      (exist) => {
        if (!exist) {
          this.backPressed.emit()
        }
      }
    );
  }

  filterPlans(plans: { id: string, data: PlanData }[]): Observable<{ id: string, data: PlanData }[]> {
    const uid = this.authService.currentUser.value?.uid as string;
    return this.planService.getUserPlans(this.selectedUser).pipe(
      map(selectedUserPlans => {
        return plans.filter(plan => this.planService.hasPermission(uid, plan.data.members, Role.CoOwner) &&
          !selectedUserPlans.some(selectedPlan => selectedPlan.id === plan.id)
        );
      })
    );
  }

  inviteToPlan(plan: { id: string, data: PlanData }) {
    const uid = this.authService.currentUser.value?.uid as string;
    this.planService.addMember(uid, plan.id, this.selectedUser).subscribe();
  }

}
