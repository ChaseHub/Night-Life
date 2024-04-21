import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';
import { CustomLocationData, CustomLocationService, Price } from 'src/app/services/database/custom-location.service';

@Component({
  selector: 'app-mapbox-edit-custom-location',
  templateUrl: './mapbox-edit-custom-location.component.html',
  styleUrls: ['./mapbox-edit-custom-location.component.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class MapboxEditCustomLocationComponent implements OnInit {
  readonly Price = Price;
  customPrice = false;

  @Input() customLocation!: { id: string, data: CustomLocationData };
  @Output() backPressed: EventEmitter<void> = new EventEmitter<void>();
  @Output() confirmedEdit: EventEmitter<void> = new EventEmitter<void>();

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

  constructor(private customLocationService: CustomLocationService, private authService: AuthenticationService) { }

  ngOnInit() {
    let test = 0;
  }

  editCustomLocation() {
    const uid = this.authService.currentUser.value?.uid as string;
    console.log(this.customLocation.data);
    this.customLocationService.updateLocation(uid, this.customLocation.id, this.customLocation.data.location).subscribe(
      () => {
        this.confirmedEdit.emit();
      }
    );
  }

}