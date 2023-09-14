import { Injectable, inject } from '@angular/core';
import { GeolocationService } from '@ng-web-apis/geolocation';
import { Observable, take } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UbicacionService {
  private ubicacion = inject(GeolocationService);

  obtenerPosicion(): Observable<GeolocationPosition> {
    return this.ubicacion.pipe(take(1));
  }
}
