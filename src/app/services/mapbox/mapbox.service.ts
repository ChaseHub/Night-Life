import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Map, Marker, Popup } from 'mapbox-gl';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MapboxService {

  map!: Map;
  style = 'mapbox://styles/chasehubbell/clsmhrqwd01pr01qrfchy9w51';

  clickCoords: BehaviorSubject<{ lat: number, lng: number }> = new BehaviorSubject<{ lat: number, lng: number }>({ lat: 0, lng: 0 });

  constructor() {}

  initializeMap(lng: number, lat: number) {
    this.map = new Map({
      accessToken: environment.mapbox.accessToken,
      container: 'map',
      style: this.style,
      zoom: 19,
      center: [0, 0], // Default center, will be overridden when initialized
      pitch: 90,
      doubleClickZoom: false,
      antialias: true,
    });
    this.clickCoords.next({lat, lng});
    this.map.setCenter([lng, lat]);
    this.map.once('render', () => {
      this.map.resize();
    });
    this.map.once('load', async () => {
      this.map.on("click", async (e) => {
        this.clickCoords.next({ lat: e.lngLat.lat, lng: e.lngLat.lng}); // Update behavior subject
      });
    });
  }

  setStyle(style: string) {
    this.map.setStyle(style);
  }

  setZoom(zoom: number) {
    this.map.setZoom(zoom);
  }

  setCenter(lng: number, lat: number) {
    this.map.setCenter({ lng: lng, lat: lat });
  }

  createMarker(lng: number, lat: number) {
    new Marker().setLngLat({ lat: lat, lng: lng }).addTo(this.map);
    console.log(lat.toString() + "," + lng.toString());
  }

  createPopup(lng: number, lat: number, data: string | undefined) {
    new Popup().setLngLat({ lat: lat, lng: lng }).setHTML(`<p style='color:black;'> ${data} </p>`).addTo(this.map);
  }

  flyTo(lng: number, lat: number) {
    this.map.flyTo({
      center: { lng: lng, lat: lat },
      essential: true
    });
  }
}
