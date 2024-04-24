import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';
import { CustomLocationData, CustomLocationService, Location, Price } from 'src/app/services/database/custom-location.service';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { IonCheckbox, IonItem, IonLabel, IonIcon, IonDatetimeButton, IonModal, IonButton, IonDatetime, IonSelectOption, IonInput, IonSelect } from "@ionic/angular/standalone";

@Component({
  selector: 'app-mapbox-create-custom-location',
  templateUrl: './mapbox-create-custom-location.component.html',
  styleUrls: ['./mapbox-create-custom-location.component.scss'],
  standalone: true,
  imports: [IonSelect, IonInput, IonCheckbox, IonButton, IonModal, IonDatetimeButton, IonIcon, IonLabel, IonItem, ReactiveFormsModule, IonDatetime, IonSelectOption]
})
export class MapboxCreateCustomLocationComponent implements OnInit {
  readonly Price = Price;
  @Output() backPressed: EventEmitter<void> = new EventEmitter<void>();
  @Output() locationCreated: EventEmitter<{ id: string, data: CustomLocationData }> = new EventEmitter<{ id: string, data: CustomLocationData }>();

  customPrice = false;

  locationForm: FormGroup = new FormGroup({
    name: new FormControl(""),
    description: new FormControl(""),
    formattedAddress: new FormControl(""),
    startHours: new FormControl(new Date().toISOString().split('T')[1].slice(0, 8)),
    endHours: new FormControl(new Date().toISOString().split('T')[1].slice(0, 8)),
    lat: new FormControl(-9999),
    lng: new FormControl(-9999),
    photos: new FormControl([]),
    price: new FormControl(""),
    date: new FormControl(new Date().toISOString().split('T')[0])
  });

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

  constructor(private authService: AuthenticationService, private customLocationService: CustomLocationService) { }

  ngOnInit() {
    let test = 0;
  }

  createCustomLocation() {
    if (!this.locationForm.valid) {
      return;
    }
    let createdLocation: Location = {
      name: this.locationForm.value.name,
      description: this.locationForm.value.description,
      formattedAddress: this.locationForm.value.formattedAddress,
      hours: {
        start: this.locationForm.value.startHours,
        end: this.locationForm.value.endHours,
      },
      lat: this.locationForm.value.lat,
      lng: this.locationForm.value.lng,
      photos: this.locationForm.value.photos,
      price: this.locationForm.value.price,
      date: this.locationForm.value.date,
    }
    const uid = this.authService.currentUser.value?.uid as string;
    this.customLocationService.createLocation(uid, createdLocation).subscribe(
      (data) => {
        this.locationCreated.emit(data);
      }
    );
  }
}
