import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Observable, concat, tap } from 'rxjs';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';
import { Location, LocationType, PlanData, PlanService, Role, rolePrecedence } from 'src/app/services/database/plan.service';
import { Place } from 'src/app/services/foursquare/foursquare.service';
import { IonItem, IonList, IonLabel, IonCheckbox, IonIcon } from "@ionic/angular/standalone";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-browse-add-to-plan',
  templateUrl: './browse-add-to-plan.component.html',
  styleUrls: ['./browse-add-to-plan.component.scss'],
  standalone: true,
  imports: [IonIcon, IonCheckbox, IonLabel, IonList, IonItem, CommonModule]
})
export class BrowseAddToPlanComponent implements OnInit {

  @Input() selectedPlace!: Place;
  @Output() backPressed: EventEmitter<void> = new EventEmitter<void>();
  @Output() confirmedAdd: EventEmitter<void> = new EventEmitter<void>();

  plans$: Observable<{ id: string, data: PlanData }[]>;
  selectedPlans: { plan: { id: string, data: PlanData }, checked: boolean }[] = [];
  showAddLocation: boolean = false;

  constructor(private authService: AuthenticationService, private planService: PlanService) {
    const uid = this.authService.currentUser.value?.uid as string;
    this.plans$ = this.planService.getUserPlans(uid).pipe(
      tap((plans) => {
        plans.forEach((plan) => {
          this.selectedPlans.push({ plan, checked: false });
          return plans;
        })
        console.log(this.selectedPlans);
      })
    );
  }

  ngOnInit() {
    let test = 0;
  }

  getUserRole(plan: { id: string, data: PlanData }): Role {
    const uid = this.authService.currentUser.value?.uid as string;
    return plan.data.members.find(member => member.uid === uid)?.role as Role;
  }

  canAddToPlan(plan: { id: string, data: PlanData }): boolean {
    return rolePrecedence[this.getUserRole(plan)] <= rolePrecedence.planner;
  }

  handleCheckboxChange(plan: { id: string, data: PlanData }, checked: boolean) {
    const foundPlanIndex = this.selectedPlans.findIndex(planSelect => planSelect.plan.id === plan.id);
    if (foundPlanIndex > -1) {
      this.selectedPlans[foundPlanIndex].checked = checked;
    }
    this.showAddLocation = this.selectedPlans.filter(plan => plan.checked === true).length > 0;
  }

  addLocationToPlans() {
    const uid = this.authService.currentUser.value?.uid as string;
    const checkedPlans = this.selectedPlans.filter(plan => plan.checked === true);
    if (checkedPlans.length < 1) {
      return;
    }
    const addLocationObservables: Observable<void>[] = [];
    checkedPlans.forEach(plan => {
      const locationData: Location = {
        id: this.selectedPlace.fsq_id,
        type: LocationType.Foursquare,
        name: this.selectedPlace.name,
        lat: -9999,
        lng: -9999,
      }
      addLocationObservables.push(this.planService.addLocation(uid, plan.plan.id, this.planService.getFormattedTimestamp(), this.planService.getFormattedTimestamp(), locationData, -1));
    });
    concat(...addLocationObservables).subscribe(
      () => {
        this.confirmedAdd.emit();
      }
    )
  }

}
