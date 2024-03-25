import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { FoursquareSwipeComponent } from 'src/app/components/foursquare/foursquare-swipe/foursquare-swipe.component';
import { FoursquareService, Place } from 'src/app/services/foursquare/foursquare.service';
import { firstValueFrom } from 'rxjs';
import { FoursquareCardSmallComponent } from 'src/app/components/foursquare/foursquare-card-small/foursquare-card-small.component';
import { FoursquareCardMediumComponent } from 'src/app/components/foursquare/foursquare-card-medium/foursquare-card-medium.component';
import { FoursquareCardLargeComponent } from 'src/app/components/foursquare/foursquare-card-large/foursquare-card-large.component';

@Component({
  selector: 'app-browse',
  templateUrl: './browse.page.html',
  styleUrls: ['./browse.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, FoursquareSwipeComponent, FoursquareCardSmallComponent, FoursquareCardMediumComponent, FoursquareCardLargeComponent]
})
export class BrowsePage implements OnInit {

  isSearching: boolean = false;

  searchResults: Place[] | [] = [];

  recommendations: Place[][] | [][] = [[]];

  constructor(private foursquare: FoursquareService) { }

  ngOnInit() {
    console.log("Browse Page Created");
    this.getRecommendations();
  }

  async handleInput(input: string | null | undefined) {
    if (input && input.length > 0) {
      this.isSearching = true;
      this.lookupQuery(input);
    } else {
      this.isSearching = false;
      this.searchResults = [];
    }
  }

  async getRecommendations() {
    let retryCount = 0;
    do {
      try {
        const data = await firstValueFrom(
          this.foursquare.placeSearch({
            ll: '30.26618380749575,-97.73357972175239',
            sort: 'DISTANCE',
            limit: 4,
            fields: "distance,hours,rating,location,photos,name"
          })
        );
        if (data.results.length > 1) {
          this.recommendations[0] = data.results;
          break;
        }
      } catch (error) {
        console.error('Error fetching data:', error);
        this.recommendations[0] = [];
      }
      retryCount++;
    } while (retryCount < 10);

    if (retryCount === 10) {
      this.recommendations[0] = [];
    }

    this.recommendations[1] = this.recommendations[0];
    this.recommendations[2] = this.recommendations[0];
    this.recommendations[3] = this.recommendations[0];
    this.recommendations[4] = this.recommendations[0];
    this.recommendations[5] = this.recommendations[0];
  }

  async lookupQuery(input: string) {
    const query = input.toLowerCase();
    let retryCount = 0;

    do {
      try {
        const data = await firstValueFrom(
          this.foursquare.placeSearch({
            query: query,
            ll: '30.26618380749575,-97.73357972175239',
            sort: 'DISTANCE',
            limit: 10,
            fields: "distance,hours,rating,location,photos,name"
          })
        );
        if (data.results.length > 1) {
          this.searchResults = data.results;
          break;
        }
      } catch (error) {
        console.error('Error fetching data:', error);
        this.searchResults = [];
      }
      retryCount++;
    } while (retryCount < 10);

    if (retryCount === 10) {
      this.searchResults = [];
    }
  }

}
