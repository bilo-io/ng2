import { ChangeDetectionStrategy, Component, inject, input, output, signal } from '@angular/core';
import { takeUntilDestroyed, toObservable } from '@angular/core/rxjs-interop';
import { catchError, debounceTime, distinctUntilChanged, map, of, switchMap, tap } from 'rxjs';
import { Point } from '../../geojson';
import { GeocoderService, type GeocodeResult } from '../../services/geocoder.service';
import type { WsItem } from '../ws-item';
import { MnButton } from '../../midnite/mn-button';
import { MnIcon } from '../../midnite/mn-icon';
import { WsList } from '../ws-list/ws-list';

export type WsPoint = GeocodeResult;

/** Find a place by name (OpenStreetMap Nominatim) or type its coordinates. */
@Component({
  selector: 'ws-point',
  imports: [WsList, MnButton, MnIcon],
  template: `
    <div class="row">
      @if (mode() === 'search') {
        <input
          class="ws-field"
          type="search"
          [attr.aria-label]="label() || 'Search for a place'"
          [placeholder]="placeholder()"
          [value]="query()"
          (input)="query.set($any($event.target).value)"
        />
      } @else {
        <input
          class="ws-field"
          type="number"
          step="any"
          aria-label="Latitude"
          placeholder="Latitude"
          [value]="lat()"
          (input)="lat.set($any($event.target).value)"
        />
        <input
          class="ws-field"
          type="number"
          step="any"
          aria-label="Longitude"
          placeholder="Longitude"
          [value]="lng()"
          (input)="lng.set($any($event.target).value)"
          (keydown.enter)="useCoordinates()"
        />
        <button type="button" mnButton [disabled]="!coordinatesValid()" (click)="useCoordinates()">
          Go
        </button>
      }
      <button
        type="button"
        mnButton
        variant="outline"
        size="icon"
        class="shrink-0"
        [attr.aria-label]="mode() === 'search' ? 'Enter coordinates' : 'Search by name'"
        [title]="mode() === 'search' ? 'Enter coordinates' : 'Search by name'"
        (click)="mode.set(mode() === 'search' ? 'coordinates' : 'search')"
      >
        <mn-icon [name]="mode() === 'search' ? 'crosshair' : 'search'" />
      </button>
    </div>
    @if (mode() === 'search' && (searching() || results().length > 0)) {
      <div class="results">
        @if (searching()) {
          <div class="searching">Searching…</div>
        } @else {
          <ws-list [items]="results()" [shadow]="true" [label]="'Places'" (itemClicked)="choose($event)" />
        }
      </div>
    }
  `,
  styles: `
    :host {
      display: block;
      position: relative;
    }
    .row {
      display: flex;
      gap: 0.5rem;
    }
    .row input {
      min-width: 0;
    }
    .results {
      position: absolute;
      z-index: 5;
      left: 0;
      right: 0;
      margin-top: 0.25rem;
      max-height: 16rem;
      overflow-y: auto;
    }
    .searching {
      padding: 0.5rem 0.75rem;
      border: 1px solid hsl(var(--border));
      border-radius: calc(var(--radius) - 2px);
      background: hsl(var(--card));
      font-size: 0.875rem;
      color: hsl(var(--muted-foreground));
      box-shadow: var(--mn-shadow-lg);
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WsPointPicker {
  private readonly geocoder = inject(GeocoderService);
  readonly label = input('');
  readonly placeholder = input('Search for a place');
  readonly changed = output<WsPoint>();

  protected readonly mode = signal<'search' | 'coordinates'>('search');
  protected readonly query = signal('');
  protected readonly lat = signal('');
  protected readonly lng = signal('');
  protected readonly searching = signal(false);
  protected readonly results = signal<WsItem<GeocodeResult>[]>([]);
  /** The name of the place just picked; not searched for again. */
  private chosenName = '';

  constructor() {
    toObservable(this.query)
      .pipe(
        map((query) => query.trim()),
        debounceTime(700),
        distinctUntilChanged(),
        map((query) => (query.length >= 3 && query !== this.chosenName ? query : '')),
        tap((query) => this.searching.set(query !== '')),
        switchMap((query) =>
          query === ''
            ? of([])
            : this.geocoder.search(query).pipe(catchError(() => of([] as GeocodeResult[]))),
        ),
        takeUntilDestroyed(),
      )
      .subscribe((places) => {
        this.searching.set(false);
        this.results.set(places.map((place) => ({ name: place.name, value: place })));
      });
  }

  protected coordinatesValid(): boolean {
    return this.lat() !== '' && this.lng() !== '' && Point.validLatLng(Number(this.lat()), Number(this.lng()));
  }

  protected useCoordinates(): void {
    if (!this.coordinatesValid()) return;
    const point = new Point([Number(this.lng()), Number(this.lat())]);
    this.changed.emit({ name: `${point.latitude.toFixed(5)}, ${point.longitude.toFixed(5)}`, point });
  }

  protected choose(item: WsItem<GeocodeResult>): void {
    this.chosenName = item.name;
    this.query.set(item.name);
    this.results.set([]);
    this.changed.emit(item.value);
  }
}
