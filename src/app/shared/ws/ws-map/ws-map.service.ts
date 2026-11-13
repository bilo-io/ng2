import { Injectable, signal } from '@angular/core';
import { Subject } from 'rxjs';
import type { Point } from '../../geojson';
import type {
  WsMapBounds,
  WsMapCameraCommand,
  WsMapLine,
  WsMapMarker,
  WsMapMarkerKind,
  WsMapPoint,
  WsMapPolygon,
} from './ws-map.models';

/**
 * Talks to a <ws-map> from anywhere in the app, as the Angular 2 version did:
 * set what it draws (points, lines, polygons, start and end pins), move its
 * camera, and listen for clicks, moves and pin drags.
 */
@Injectable({ providedIn: 'root' })
export class WsMapService {
  // What the map draws. <ws-map> renders whatever these hold.
  readonly points = signal<WsMapPoint[]>([]);
  readonly lines = signal<WsMapLine[]>([]);
  readonly polygons = signal<WsMapPolygon[]>([]);
  readonly startMarker = signal<WsMapMarker | null>(null);
  readonly endMarker = signal<WsMapMarker | null>(null);

  // Camera moves going to the map.
  private readonly cameraCommands = new Subject<WsMapCameraCommand>();
  readonly camera$ = this.cameraCommands.asObservable();

  // Events coming from the map.
  readonly clicked$ = new Subject<Point>();
  readonly moved$ = new Subject<WsMapBounds>();
  readonly markerMoved$ = new Subject<{ kind: WsMapMarkerKind; point: Point }>();
  readonly markerClicked$ = new Subject<WsMapMarkerKind>();

  /** The last point clicked on the map. */
  readonly lastClicked = signal<Point | null>(null);

  showPoints(points: WsMapPoint[]): void {
    this.points.set(points);
  }

  clearPoints(): void {
    this.points.set([]);
  }

  /** Repaints every point and line in one colour, e.g. after a theme change. */
  recolour(color: string): void {
    this.points.update((points) => points.map((point) => ({ ...point, color })));
    this.lines.update((lines) => lines.map((line) => ({ ...line, color })));
  }

  showLines(lines: WsMapLine[]): void {
    this.lines.set(lines);
  }

  addLines(lines: WsMapLine[]): void {
    this.lines.update((current) => [...current, ...lines]);
  }

  clearLines(): void {
    this.lines.set([]);
  }

  showPolygons(polygons: WsMapPolygon[]): void {
    this.polygons.set(polygons);
  }

  clearPolygons(): void {
    this.polygons.set([]);
  }

  setMarker(kind: WsMapMarkerKind, marker: WsMapMarker | null): void {
    (kind === 'start' ? this.startMarker : this.endMarker).set(marker);
  }

  panTo(point: Point, zoom?: number): void {
    this.cameraCommands.next({ kind: 'panTo', point, zoom });
  }

  fitBounds(points: Point[]): void {
    if (points.length > 0) this.cameraCommands.next({ kind: 'fitBounds', points });
  }

  /** Called by <ws-map>. */
  emitClick(point: Point): void {
    this.lastClicked.set(point);
    this.clicked$.next(point);
  }
}
