import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { GoogleMap } from '@angular/google-maps';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { UbicacionService } from 'src/app/services/ubicacion/ubicacion.service';

@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.component.html',
  styleUrls: ['./mapa.component.scss'],
})
export class MapaComponent implements OnInit {
  apiLoaded: Observable<boolean>;
  opcionesMapa!: google.maps.MapOptions;
  marker1 = {
    position: { lat: 4.68601, lng: -74.054 },
    label: { color: '#0033a0', text: 'Salud' },
    title: 'Marker title ',
  };
  marker2 = {
    position: { lat: 4.7, lng: -74.032 },
    label: { color: '#0033a0', text: 'Salud' },
    title: 'Marker sURA BOGOTA',
  };
  marker3 = {
    position: { lat: 4.599, lng: -74.116 },
    label: { color: '#0033a0', text: 'Salud' },
    title: 'Marker surA',
  };

  markers = [this.marker1, this.marker2, this.marker3];
  @ViewChild(GoogleMap, { static: false }) map!: GoogleMap;
  private ubicacionSerice = inject(UbicacionService);

  constructor(httpClient: HttpClient) {
    this.apiLoaded = httpClient
      .jsonp(
        'https://maps.googleapis.com/maps/api/js?key=AIzaSyD2gNf26iP9WDdkQ3CVtSB__TW28zyZdVs',
        'callback'
      )
      .pipe(
        map(() => true),
        catchError(() => of(false))
      );
  }

  centrarMapa(): void {
    this.map.googleMap?.fitBounds(this.getBounds(this.markers));
  }

  ngOnInit(): void {
    this.ubicacionSerice.obtenerPosicion().subscribe((coordenadas) => {
      this.opcionesMapa = {
        center: {
          lat: coordenadas.coords.latitude,
          lng: coordenadas.coords.longitude,
        },
        mapTypeControl: false,
        fullscreenControl: false,
        streetViewControl: false,
      };
      this.centrarMapa();
    });
  }

  getBounds(markers: any) {
    let north;
    let south;
    let east;
    let west;

    for (const marker of markers) {
      north =
        north !== undefined
          ? Math.max(north, marker.position.lat)
          : marker.position.lat;
      south =
        south !== undefined
          ? Math.min(south, marker.position.lat)
          : marker.position.lat;
      east =
        east !== undefined
          ? Math.max(east, marker.position.lng)
          : marker.position.lng;
      west =
        west !== undefined
          ? Math.min(west, marker.position.lng)
          : marker.position.lng;
    }

    const bounds = { north, south, east, west };
    return bounds;
  }
}
