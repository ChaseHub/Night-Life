import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';
import { CustomLocationData, CustomLocationService, Location, Price } from 'src/app/services/database/custom-location.service';
import { IonSelect, IonItem, IonLabel, IonIcon, IonDatetimeButton, IonModal, IonDatetime, IonSelectOption, IonButton, IonInput, IonCheckbox } from "@ionic/angular/standalone";

@Component({
  selector: 'app-mapbox-edit-custom-location',
  templateUrl: './mapbox-edit-custom-location.component.html',
  styleUrls: ['./mapbox-edit-custom-location.component.scss'],
  standalone: true,
  imports: [IonSelect, IonCheckbox, IonInput, IonButton, IonModal, IonDatetimeButton, IonIcon, IonLabel, IonItem, IonDatetime, IonSelectOption, CommonModule, ReactiveFormsModule],
})
export class MapboxEditCustomLocationComponent implements OnInit, OnChanges {
  readonly Price = Price;
  customPrice = false;

  @Input() customLocation!: { id: string, data: CustomLocationData };
  @Output() backPressed: EventEmitter<void> = new EventEmitter<void>();
  @Output() confirmedEdit: EventEmitter<void> = new EventEmitter<void>();

  customLocationForm!: FormGroup;

  dateTimeButtonFormat = {
    date: {
      weekday: 'short',
      month: 'long',
      day: '2-digit',
    },
    time: {
      hour: '2-digit',
      minute: '2-digit',
    },
  };

  constructor(private customLocationService: CustomLocationService, private authService: AuthenticationService) {
  }

  ngOnInit() {
    let test = 0;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if(changes["customLocation"]){
      this.customLocationForm = new FormGroup({
        name: new FormControl(this.customLocation.data.location.name),
        description: new FormControl(this.customLocation.data.location.description),
        lng: new FormControl(this.customLocation.data.location.lng),
        lat: new FormControl(this.customLocation.data.location.lat),
        photos: new FormControl(this.customLocation.data.location.photos),
        date: new FormControl(this.customLocation.data.location.date),
        hoursStart: new FormControl(this.customLocation.data.location.hours.start),
        hoursEnd: new FormControl(this.customLocation.data.location.hours.end),
        price: new FormControl(this.customLocation.data.location.price),
        formattedAddress: new FormControl(this.customLocation.data.location.formattedAddress)
      });
    }
  }

  editCustomLocation() {
    const uid = this.authService.currentUser.value?.uid as string;
    let newLocationData: Location = {
      name: this.customLocationForm.value.name as string,
      description: this.customLocationForm.value.description as string,
      lng: this.customLocationForm.value.lng as number,
      lat: this.customLocationForm.value.lat as number,
      photos: this.customLocationForm.value.photos as string[],
      date: this.customLocationForm.value.date as string,
      hours: {
        start: this.customLocationForm.value.hoursStart as string,
        end: this.customLocationForm.value.hoursEnd as string,
      },
      price: this.customLocationForm.value.price as string,
      formattedAddress: this.customLocationForm.value.formattedAddress as string,
    }
    this.customLocationService.updateLocation(uid, this.customLocation.id, newLocationData).subscribe(
      () => {
        this.confirmedEdit.emit();
      }
    );
  }

}
