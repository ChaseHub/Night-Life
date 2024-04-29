import { Component, OnInit } from '@angular/core';
import { IonItem } from "@ionic/angular/standalone";

@Component({
  selector: 'app-browse-location-details',
  templateUrl: './browse-location-details.component.html',
  styleUrls: ['./browse-location-details.component.scss'],
  standalone: true,
  imports: [IonItem, ]
})
export class BrowseLocationDetailsComponent  implements OnInit {

  constructor() { }

  ngOnInit() {
    let test = 0;
  }

}
