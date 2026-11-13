import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Point } from '../geojson';

export interface GeocodeResult {
  name: string;
  point: Point;
}

interface NominatimPlace {
  display_name: string;
  lat: string;
  lon: string;
}

/**
 * Place search on OpenStreetMap's Nominatim (free, no key). Its usage policy
 * allows about one request a second, so callers debounce what they send.
 * https://operations.osmfoundation.org/policies/nominatim/
 */
@Injectable({ providedIn: 'root' })
export class GeocoderService {
  static readonly BASE_URL = 'https://nominatim.openstreetmap.org';
  private readonly http = inject(HttpClient);

  search(query: string, limit = 5): Observable<GeocodeResult[]> {
    return this.http
      .get<NominatimPlace[]>(`${GeocoderService.BASE_URL}/search`, {
        params: { q: query, format: 'jsonv2', limit },
      })
      .pipe(map((places) => places.map(toResult)));
  }

  reverse(point: Point): Observable<GeocodeResult | null> {
    return this.http
      .get<NominatimPlace | { error: string }>(`${GeocoderService.BASE_URL}/reverse`, {
        params: { lat: point.latitude, lon: point.longitude, format: 'jsonv2' },
      })
      .pipe(map((place) => ('display_name' in place ? toResult(place) : null)));
  }
}

function toResult(place: NominatimPlace): GeocodeResult {
  return { name: place.display_name, point: new Point([Number(place.lon), Number(place.lat)]) };
}
