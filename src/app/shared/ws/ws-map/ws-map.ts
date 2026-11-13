import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  ElementRef,
  afterNextRender,
  effect,
  inject,
  input,
  output,
  signal,
  untracked,
  viewChild,
} from '@angular/core';
import {
  LngLatBounds,
  Map as MapLibreMap,
  Marker,
  NavigationControl,
  Popup,
  ScaleControl,
  setWorkerUrl,
  type GeoJSONSource,
  type MapGeoJSONFeature,
} from 'maplibre-gl';
import { Point, type Position } from '../../geojson';
import {
  BEARING_3D,
  BUILDINGS_LAYER_ID,
  HILLSHADE_LAYER_ID,
  HILLSHADE_SOURCE_ID,
  PITCH_3D,
  TERRAIN_SOURCE_ID,
  beforeIdFor3d,
  buildingExtrusionLayer,
  findBuildingSource,
  hasOwnExtrusions,
  hillshadeLayer,
  skySpec,
  terrainDemSource,
  terrainSpec,
} from './map-3d';
import {
  LINES_SOURCE_ID,
  POINTS_LAYER_ID,
  POINTS_SOURCE_ID,
  POLYGONS_SOURCE_ID,
  linesCollection,
  overlayLayers,
  pointsCollection,
  polygonsCollection,
} from './map-overlays';
import {
  SATELLITE_OVERLAY_LAYER_IDS,
  SATELLITE_ROADS_LAYER_ID,
  getMapTheme,
  styleFor,
  withoutCamera,
  type MapThemeId,
} from './map-themes';
import type { WsMapMarker, WsMapMarkerKind, WsMapView } from './ws-map.models';
import { WsMapService } from './ws-map.service';

/** Where the Angular 2 app's map opened: Midrand, between Johannesburg and Pretoria. */
export const DEFAULT_CENTER: Position = [28.1821, -25.9518];
export const DEFAULT_ZOOM = 11;

const PIN_IMAGES: Record<WsMapMarkerKind, string> = {
  start: 'map-markers/map-pin-green.png',
  end: 'map-markers/map-pin-red.png',
};

let workerUrlSet = false;

/**
 * A MapLibre GL map with five free, keyless themes and an optional 3D view
 * (tilt, terrain, hillshade and building extrusions). Draws whatever
 * WsMapService holds: points, lines, polygons and start and end pins.
 */
@Component({
  selector: 'ws-map',
  template: `
    <div #canvas class="ws-map-canvas"></div>
    @if (error()) {
      <p class="ws-map-error" role="alert">{{ error() }}</p>
    }
  `,
  styleUrl: './ws-map.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[attr.data-map-theme]': 'theme()',
    '[attr.data-three-d]': 'threeD()',
    '[attr.data-style]': 'styleName()',
    '[attr.data-pitch]': 'pitch()',
  },
})
export class WsMap {
  /** The first view, then a fly-to whenever they change. [lng, lat] */
  readonly center = input<Position>(DEFAULT_CENTER);
  readonly zoom = input(DEFAULT_ZOOM);
  readonly theme = input<MapThemeId>('light');
  readonly threeD = input(false);
  /** Place names over the satellite imagery. */
  readonly satelliteLabels = input(true);

  readonly mapClick = output<Point>();
  readonly moveEnd = output<WsMapView>();
  /** The loaded style's name, after each theme swap. */
  readonly styleLoad = output<string>();

  protected readonly styleName = signal('');
  protected readonly pitch = signal(0);
  protected readonly error = signal('');

  private readonly canvas = viewChild.required<ElementRef<HTMLDivElement>>('canvas');
  private readonly service = inject(WsMapService);
  private readonly map = signal<MapLibreMap | undefined>(undefined);
  /** Bumped on every style load, so overlays get re-added. */
  private readonly styleRevision = signal(0);
  /** False between setStyle and style.load. (map.isStyleLoaded also waits for tiles.) */
  private readonly styleReady = signal(false);
  private readonly markers = new Map<WsMapMarkerKind, Marker>();
  private loadedTheme: MapThemeId | undefined;
  /** Whether terrain and 3D layers are on the map. */
  private applied3d = false;
  /** Whether the camera is tilted for 3D (or flying there). */
  private tilted = false;
  /** Where the last centre/zoom input sent the camera. */
  private flightTarget: { center: Position; zoom: number } | undefined;

  constructor() {
    const destroyRef = inject(DestroyRef);

    afterNextRender(() => {
      const map = this.createMap();
      if (!map) return;
      this.map.set(map);
      destroyRef.onDestroy(() => map.remove());
    });

    const cameraSub = this.service.camera$.subscribe((command) => {
      const map = this.map();
      if (!map) return;
      if (command.kind === 'panTo') {
        map.flyTo({ center: command.point.coordinates, zoom: command.zoom, essential: true });
      } else {
        const bounds = new LngLatBounds();
        command.points.forEach((p) => bounds.extend(p.coordinates));
        map.fitBounds(bounds, { padding: 48, maxZoom: 15 });
      }
    });
    destroyRef.onDestroy(() => cameraSub.unsubscribe());

    // Theme: swap the whole style, keeping the camera.
    effect(() => {
      const map = this.map();
      const id = this.theme();
      if (map) untracked(() => this.applyTheme(map, id));
    });

    // Satellite labels: just show or hide the label layer.
    effect(() => {
      const map = this.map();
      const visible = this.satelliteLabels();
      this.styleRevision();
      for (const id of SATELLITE_OVERLAY_LAYER_IDS) {
        if (map?.getLayer(id)) map.setLayoutProperty(id, 'visibility', visible ? 'visible' : 'none');
      }
    });

    // 3D: add or remove terrain and buildings, then tilt or flatten smoothly.
    effect(() => {
      const map = this.map();
      const enabled = this.threeD();
      if (!map) return;
      untracked(() => {
        // Before style.load, onStyleLoad adds the layers instead.
        if (this.styleReady()) this.apply3dLayers(map, enabled);
        if (enabled === this.tilted) return;
        this.tilted = enabled;
        // Keep heading for a place the map is still flying to.
        map.flyTo({
          ...(map.isMoving() ? this.flightTarget : {}),
          pitch: enabled ? PITCH_3D : 0,
          bearing: enabled ? BEARING_3D : 0,
          duration: 1500,
          essential: true,
        });
      });
    });

    // Centre and zoom inputs after the first render, keeping the 3D tilt.
    effect(() => {
      const center = this.center();
      const zoom = this.zoom();
      const map = untracked(this.map);
      if (!map) return;
      this.flightTarget = { center, zoom };
      map.flyTo({
        center,
        zoom,
        pitch: this.tilted ? PITCH_3D : 0,
        bearing: this.tilted ? BEARING_3D : 0,
        essential: true,
      });
    });

    // Overlays from the service, re-added after every style swap.
    effect(() => {
      const map = this.map();
      const points = this.service.points();
      const lines = this.service.lines();
      const polygons = this.service.polygons();
      if (!map || !this.styleReady()) return;
      untracked(() => {
        this.ensureOverlays(map);
        (map.getSource(POINTS_SOURCE_ID) as GeoJSONSource).setData(pointsCollection(points));
        (map.getSource(LINES_SOURCE_ID) as GeoJSONSource).setData(linesCollection(lines));
        (map.getSource(POLYGONS_SOURCE_ID) as GeoJSONSource).setData(polygonsCollection(polygons));
      });
    });

    // Start and end pins: DOM markers, so they survive style swaps.
    effect(() => {
      const map = this.map();
      const start = this.service.startMarker();
      const end = this.service.endMarker();
      if (!map) return;
      untracked(() => {
        this.syncMarker(map, 'start', start);
        this.syncMarker(map, 'end', end);
      });
    });
  }

  private createMap(): MapLibreMap | undefined {
    if (!workerUrlSet) {
      setWorkerUrl(new URL('maplibre/maplibre-gl-worker.mjs', document.baseURI).href);
      workerUrlSet = true;
    }
    const theme = this.theme();
    const threeD = this.threeD();
    let map: MapLibreMap;
    try {
      map = new MapLibreMap({
        container: this.canvas().nativeElement,
        style: styleFor(theme, { labels: this.satelliteLabels() }),
        center: this.center(),
        zoom: this.zoom(),
        pitch: threeD ? PITCH_3D : 0,
        bearing: threeD ? BEARING_3D : 0,
        maxPitch: 85,
      });
    } catch (e) {
      // Most likely no WebGL2 in this browser.
      this.error.set(`The map could not start: ${e instanceof Error ? e.message : e}`);
      return undefined;
    }
    this.loadedTheme = theme;
    this.tilted = threeD;

    map.addControl(new NavigationControl({ visualizePitch: true }), 'top-right');
    map.addControl(new ScaleControl(), 'bottom-left');

    map.on('style.load', () => this.onStyleLoad(map));
    // Some styles reference sprite icons their sprite sheet lacks; draw nothing
    // for those instead of logging a warning for each one.
    map.on('styleimagemissing', (e) => {
      if (!map.hasImage(e.id)) map.addImage(e.id, { width: 1, height: 1, data: new Uint8Array(4) });
    });
    map.on('moveend', () => this.onMoveEnd(map));
    map.on('click', (e) => {
      const point = new Point([e.lngLat.lng, e.lngLat.lat]);
      this.service.emitClick(point);
      this.mapClick.emit(point);
    });
    map.on('click', POINTS_LAYER_ID, (e) => this.showPointPopup(map, e.features?.[0]));
    map.on('mouseenter', POINTS_LAYER_ID, () => (map.getCanvas().style.cursor = 'pointer'));
    map.on('mouseleave', POINTS_LAYER_ID, () => (map.getCanvas().style.cursor = ''));
    return map;
  }

  private applyTheme(map: MapLibreMap, id: MapThemeId): void {
    if (id === this.loadedTheme) return;
    this.loadedTheme = id;
    this.styleReady.set(false);
    // diff: false so style.load fires and 3D layers and overlays get re-added.
    map.setStyle(styleFor(id, { labels: untracked(this.satelliteLabels) }), {
      diff: false,
      transformStyle: (_previous, next) => withoutCamera(next),
    });
  }

  private onStyleLoad(map: MapLibreMap): void {
    this.apply3dLayers(map, untracked(this.threeD), true);
    const name = map.getStyle().name ?? getMapTheme(this.loadedTheme ?? 'light').source;
    this.styleName.set(name);
    this.styleRevision.update((n) => n + 1);
    this.styleReady.set(true);
    this.styleLoad.emit(name);
  }

  /** Adds (or removes) terrain, hillshade, sky and building extrusions. */
  private apply3dLayers(map: MapLibreMap, enabled: boolean, force = false): void {
    if (enabled === this.applied3d && !force) return;
    this.applied3d = enabled;
    const theme = getMapTheme(this.loadedTheme ?? 'light');

    if (!enabled) {
      map.setTerrain(null);
      for (const layer of [BUILDINGS_LAYER_ID, HILLSHADE_LAYER_ID]) {
        if (map.getLayer(layer)) map.removeLayer(layer);
      }
      for (const source of [TERRAIN_SOURCE_ID, HILLSHADE_SOURCE_ID]) {
        if (map.getSource(source)) map.removeSource(source);
      }
      return;
    }

    const style = map.getStyle();
    const beforeId = beforeIdFor3d(style, SATELLITE_ROADS_LAYER_ID);
    if (!map.getSource(TERRAIN_SOURCE_ID)) map.addSource(TERRAIN_SOURCE_ID, terrainDemSource());
    if (!map.getSource(HILLSHADE_SOURCE_ID)) map.addSource(HILLSHADE_SOURCE_ID, terrainDemSource());
    if (!map.getLayer(HILLSHADE_LAYER_ID)) map.addLayer(hillshadeLayer(theme), beforeId);

    const building = findBuildingSource(style);
    if (building && !hasOwnExtrusions(style) && !map.getLayer(BUILDINGS_LAYER_ID)) {
      map.addLayer(buildingExtrusionLayer(building, theme), beforeId);
    }
    map.setTerrain(terrainSpec());
    map.setSky(skySpec(theme));
  }

  private ensureOverlays(map: MapLibreMap): void {
    for (const id of [POLYGONS_SOURCE_ID, LINES_SOURCE_ID, POINTS_SOURCE_ID]) {
      if (!map.getSource(id)) {
        map.addSource(id, { type: 'geojson', data: { type: 'FeatureCollection', features: [] } });
      }
    }
    for (const layer of overlayLayers()) {
      if (!map.getLayer(layer.id)) map.addLayer(layer);
    }
  }

  private syncMarker(map: MapLibreMap, kind: WsMapMarkerKind, marker: WsMapMarker | null): void {
    const existing = this.markers.get(kind);
    if (!marker) {
      existing?.remove();
      this.markers.delete(kind);
      return;
    }
    if (existing) {
      existing.setLngLat(marker.point.coordinates);
      existing.getPopup()?.setText(marker.name);
      return;
    }
    const pin = document.createElement('img');
    pin.src = PIN_IMAGES[kind];
    pin.alt = `${kind} pin`;
    pin.className = 'ws-map-pin';
    pin.width = 32;
    pin.height = 32;
    const created = new Marker({ element: pin, anchor: 'bottom', draggable: true })
      .setLngLat(marker.point.coordinates)
      .setPopup(new Popup({ offset: 28 }).setText(marker.name))
      .addTo(map);
    created.on('dragend', () => {
      const { lng, lat } = created.getLngLat();
      this.service.markerMoved$.next({ kind, point: new Point([lng, lat]) });
    });
    pin.addEventListener('click', () => this.service.markerClicked$.next(kind));
    this.markers.set(kind, created);
  }

  private showPointPopup(map: MapLibreMap, feature: MapGeoJSONFeature | undefined): void {
    if (!feature || feature.geometry.type !== 'Point') return;
    const [lng, lat] = feature.geometry.coordinates;
    new Popup().setLngLat([lng, lat]).setText(String(feature.properties['name'] ?? '')).addTo(map);
  }

  private onMoveEnd(map: MapLibreMap): void {
    const bounds = map.getBounds();
    const center = map.getCenter();
    const mapBounds = {
      northEast: new Point([bounds.getNorthEast().lng, bounds.getNorthEast().lat]),
      southWest: new Point([bounds.getSouthWest().lng, bounds.getSouthWest().lat]),
    };
    this.pitch.set(Math.round(map.getPitch()));
    this.service.moved$.next(mapBounds);
    this.moveEnd.emit({
      center: [center.lng, center.lat],
      zoom: map.getZoom(),
      pitch: map.getPitch(),
      bearing: map.getBearing(),
      bounds: mapBounds,
    });
  }
}
