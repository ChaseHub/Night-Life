import { Component, OnInit } from '@angular/core';
import { IonContent, IonHeader, IonToolbar, IonTitle, IonSearchbar, ModalController } from '@ionic/angular/standalone';
import { BrowseDetailsModalComponent } from 'src/app/components/browse/browse-details-modal/browse-details-modal.component';
import { BrowseDiscoverComponent } from 'src/app/components/browse/browse-discover/browse-discover.component';
import { BrowseSearchComponent } from 'src/app/components/browse/browse-search/browse-search.component';
import { Place } from 'src/app/services/foursquare/foursquare.service';

@Component({
  selector: 'app-browse',
  templateUrl: './browse.page.html',
  styleUrls: ['./browse.page.scss'],
  standalone: true,
  imports: [IonSearchbar, IonTitle, IonToolbar, IonHeader, IonContent, BrowseDiscoverComponent, BrowseSearchComponent]
})
export class BrowsePage implements OnInit {
  isSearching: boolean = false;
  searchQuery: string = "";

  constructor(private modalController: ModalController) { }

  ngOnInit() {
    let test = 0;
  }

  async openLocationDetailsModal(location: Place){
    const modal = await this.modalController.create({
      component: BrowseDetailsModalComponent,
      cssClass: 'browse-page-modal',
      mode: 'ios',
      componentProps: {
        place: location
      }
    });
    modal.present();
    const { data, role } = await modal.onWillDismiss();
  }

  updateIsSearching(value: string | null | undefined){
    this.isSearching = !!value;
    if(value){
      this.searchQuery = value;
    }
  }
}
