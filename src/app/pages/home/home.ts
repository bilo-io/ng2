import { ChangeDetectionStrategy, Component, VERSION } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [RouterLink],
  template: `
    <section class="hero">
      <h1>An Angular starter with a map</h1>
      <p>
        Angular {{ version }} with standalone components and signals, a small library of reusable
        <strong>ws</strong> components, and an interactive <a routerLink="/map">Map</a> built on
        MapLibre GL: five free OpenStreetMap-based themes and a 3D view with terrain and buildings.
      </p>
      <div class="actions">
        <a class="ws-btn big" routerLink="/map">Map</a>
        <a class="ws-btn ws-btn-ghost big" routerLink="/ws">Ws library</a>
      </div>
    </section>
  `,
  styles: `
    .hero {
      max-width: 44rem;
      margin: 0 auto;
      padding: clamp(2rem, 12vh, 8rem) 1rem 2rem;
      text-align: center;
    }
    h1 {
      font-size: clamp(1.75rem, 6vw, 2.75rem);
      font-weight: 400;
    }
    p {
      color: var(--ws-muted);
    }
    .actions {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      gap: 1rem;
      margin-top: 2rem;
    }
    .big {
      min-width: 9rem;
      padding: 1rem 2rem;
      font-size: 1.25rem;
      font-weight: 300;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Home {
  protected readonly version = VERSION.full;
}
