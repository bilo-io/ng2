import { ChangeDetectionStrategy, Component, computed, effect, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { UiThemeService } from '../../core/ui-theme.service';
import { Point, lineString, type Position } from '../../shared/geojson';
import { WsPointPicker, type WsPoint } from '../../shared/ws/ws-point/ws-point';
import { WsToggle } from '../../shared/ws/ws-toggle/ws-toggle';
import {
  MAP_THEMES,
  getMapTheme,
  isMapThemeChoice,
  resolveMapTheme,
  type MapThemeChoice,
} from '../../shared/ws/ws-map/map-themes';
import { DEFAULT_CENTER, DEFAULT_ZOOM, WsMap } from '../../shared/ws/ws-map/ws-map';
import type { WsMapView } from '../../shared/ws/ws-map/ws-map.models';
import { WsMapService } from '../../shared/ws/ws-map/ws-map.service';

interface Place {
  name: string;
  center: Position;
  zoom: number;
}

/** Spots that show off the 3D view: buildings, then terrain. */
export const PLACES: Place[] = [
  { name: 'Midrand', center: DEFAULT_CENTER, zoom: DEFAULT_ZOOM },
  { name: 'Joburg CBD', center: [28.0436, -26.2044], zoom: 15.5 },
  { name: 'Table Mountain', center: [18.4037, -33.9628], zoom: 12.5 },
  { name: 'Manhattan', center: [-73.9855, 40.758], zoom: 15.5 },
];

const STORAGE_KEY = 'ws-map-settings';

interface MapSettings {
  theme: MapThemeChoice;
  threeD: boolean;
  labels: boolean;
  center: Position;
  zoom: number;
}

@Component({
  selector: 'app-map-page',
  imports: [WsMap, WsToggle, WsPointPicker],
  templateUrl: './map-page.html',
  styleUrl: './map-page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MapPage {
  private readonly ui = inject(UiThemeService);
  private readonly mapService = inject(WsMapService);
  private readonly saved = readSettings();

  protected readonly themes = MAP_THEMES;
  protected readonly places = PLACES;

  protected readonly themeChoice = signal<MapThemeChoice>(this.saved.theme ?? 'auto');
  protected readonly threeD = signal(this.saved.threeD ?? false);
  protected readonly labels = signal(this.saved.labels ?? true);
  protected readonly center = signal<Position>(this.saved.center ?? DEFAULT_CENTER);
  protected readonly zoom = signal(this.saved.zoom ?? DEFAULT_ZOOM);
  /** Open on wide screens; a one-line bar on phones until tapped. */
  protected readonly panelOpen = signal(window.matchMedia('(min-width: 600px)').matches);

  protected readonly themeId = computed(() => resolveMapTheme(this.themeChoice(), this.ui.scheme()));
  protected readonly activeTheme = computed(() => getMapTheme(this.themeId()));
  protected readonly hint = signal('Click the map to drop a start pin.');
  private view: Pick<MapSettings, 'center' | 'zoom'> | null = null;

  constructor() {
    effect(() => {
      this.save({ theme: this.themeChoice(), threeD: this.threeD(), labels: this.labels() });
    });

    this.mapService.clicked$.pipe(takeUntilDestroyed()).subscribe((point) => this.dropPin(point));
    this.mapService.markerMoved$.pipe(takeUntilDestroyed()).subscribe(() => this.drawRoute());
  }

  protected chooseTheme(choice: MapThemeChoice): void {
    this.themeChoice.set(choice);
  }

  protected flyTo(place: Place): void {
    this.center.set([...place.center]);
    this.zoom.set(place.zoom);
  }

  protected goToSearchResult(place: WsPoint): void {
    this.mapService.showPoints([{ name: place.name, point: place.point, color: '#00adee' }]);
    this.mapService.panTo(place.point, 14);
  }

  protected rememberView(view: WsMapView): void {
    this.view = { center: view.center, zoom: view.zoom };
    this.save({});
  }

  protected clearPins(): void {
    this.mapService.setMarker('start', null);
    this.mapService.setMarker('end', null);
    this.mapService.clearLines();
    this.mapService.clearPoints();
    this.hint.set('Click the map to drop a start pin.');
  }

  /** First click: start pin. Second: end pin and a dotted line. Third: start again. */
  private dropPin(point: Point): void {
    const start = this.mapService.startMarker();
    const end = this.mapService.endMarker();
    if (!start || end) {
      this.mapService.setMarker('start', { name: 'Start', point });
      this.mapService.setMarker('end', null);
      this.mapService.clearLines();
      this.hint.set('Click again for an end pin. Drag pins to move them.');
    } else {
      this.mapService.setMarker('end', { name: 'End', point });
      this.drawRoute();
      this.hint.set('Drag the pins, or click to start over.');
    }
  }

  private drawRoute(): void {
    const start = this.mapService.startMarker();
    const end = this.mapService.endMarker();
    if (!start || !end) return;
    this.mapService.showLines([
      {
        color: '#00adee',
        dotted: true,
        line: lineString([start.point.coordinates, end.point.coordinates]),
      },
    ]);
  }

  private save(partial: Partial<MapSettings>): void {
    const settings: Partial<MapSettings> = {
      theme: this.themeChoice(),
      threeD: this.threeD(),
      labels: this.labels(),
      ...(this.view ?? {}),
      ...partial,
    };
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
    } catch {
      // Storage can be blocked; settings then last for this visit only.
    }
  }
}

function readSettings(): Partial<MapSettings> {
  try {
    const raw: unknown = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? '{}');
    if (!raw || typeof raw !== 'object') return {};
    const s = raw as Record<string, unknown>;
    const center = s['center'];
    return {
      theme: isMapThemeChoice(s['theme']) ? s['theme'] : undefined,
      threeD: typeof s['threeD'] === 'boolean' ? s['threeD'] : undefined,
      labels: typeof s['labels'] === 'boolean' ? s['labels'] : undefined,
      center:
        Array.isArray(center) && center.length === 2 && Point.validLatLng(center[1], center[0])
          ? [center[0], center[1]]
          : undefined,
      zoom: typeof s['zoom'] === 'number' && Number.isFinite(s['zoom']) ? s['zoom'] : undefined,
    };
  } catch {
    return {};
  }
}
