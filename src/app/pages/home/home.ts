import { ChangeDetectionStrategy, Component, VERSION } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MnButton } from '../../shared/midnite/mn-button';
import { MnCard } from '../../shared/midnite/mn-card';
import { MnChip } from '../../shared/midnite/mn-chip';
import { MnIcon, type MnIconName } from '../../shared/midnite/mn-icon';

interface Feature {
  icon: MnIconName;
  title: string;
  text: string;
  link: string;
}

@Component({
  selector: 'app-home',
  imports: [RouterLink, MnButton, MnCard, MnChip, MnIcon],
  template: `
    <div class="mn-ambient min-h-[calc(100dvh-var(--ws-navbar-height))]">
      <section class="mx-auto max-w-5xl px-4 pb-12 pt-14 sm:px-6 sm:pb-16 sm:pt-24">
        <span mnChip>
          <span class="h-1.5 w-1.5 rounded-full bg-success" aria-hidden="true"></span>
          Angular {{ version }} · MapLibre GL · midnite tokens
        </span>
        <h1 class="mt-6 max-w-3xl text-4xl font-bold leading-[1.05] tracking-tight sm:text-6xl">
          An Angular starter with a <span class="mui-rainbow-text mui-brand-glow">map</span>.
        </h1>
        <p class="mt-6 max-w-2xl text-base text-muted-foreground sm:text-lg">
          Standalone components and signals, a small library of reusable
          <strong class="font-semibold text-foreground">ws</strong> components, and an interactive
          map built on MapLibre GL: five free OpenStreetMap-based themes and a 3D view with terrain
          and buildings.
        </p>
        <div class="mt-8 flex flex-wrap gap-3">
          <a mnButton size="lg" routerLink="/map">
            Open the map
            <mn-icon name="arrow-right" />
          </a>
          <a mnButton size="lg" variant="outline" routerLink="/ws">Ws components</a>
        </div>
      </section>

      <section
        class="mx-auto grid max-w-5xl gap-4 px-4 pb-20 sm:grid-cols-3 sm:px-6"
        aria-label="Highlights"
      >
        @for (feature of features; track feature.title) {
          <a
            mnCard
            class="group block p-6 no-underline transition duration-300 hover:-translate-y-0.5 hover:border-foreground/20 hover:shadow-md motion-reduce:transition-none motion-reduce:hover:translate-y-0"
            [routerLink]="feature.link"
          >
            <span
              class="grid h-9 w-9 place-items-center rounded-md border bg-background text-foreground"
              aria-hidden="true"
            >
              <mn-icon [name]="feature.icon" />
            </span>
            <h2 class="mt-4 text-sm font-semibold">{{ feature.title }}</h2>
            <p class="mt-1 text-sm text-muted-foreground">{{ feature.text }}</p>
          </a>
        }
      </section>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Home {
  protected readonly version = VERSION.full;
  protected readonly features: Feature[] = [
    {
      icon: 'layers',
      title: 'Five keyless map themes',
      text: 'Light, Dark, Street, Colour and Satellite, from CARTO, OpenFreeMap and Esri. Auto follows the app theme.',
      link: '/map',
    },
    {
      icon: 'mountain',
      title: 'A 3D view',
      text: 'Open elevation tiles for terrain, hillshade, a sky with fog and extruded buildings, on every theme.',
      link: '/map',
    },
    {
      icon: 'box',
      title: 'The ws library',
      text: 'Standalone, OnPush, signal-based components: map, place search, select, tabs, toast, modal and more.',
      link: '/ws',
    },
  ];
}
