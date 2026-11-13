import { ChangeDetectionStrategy, Component, Injectable, inject, input, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import type { WsItem } from '../ws-item';

@Injectable({ providedIn: 'root' })
export class WsSidenavService {
  readonly isOpen = signal(false);

  open(): void {
    this.isOpen.set(true);
  }

  close(): void {
    this.isOpen.set(false);
  }

  toggle(): void {
    this.isOpen.update((open) => !open);
  }
}

/** A slide-in drawer of navigation links. */
@Component({
  selector: 'ws-sidenav',
  imports: [RouterLink, RouterLinkActive],
  template: `
    @if (sidenav.isOpen()) {
      <div class="backdrop" (click)="sidenav.close()"></div>
    }
    <nav class="drawer" [class.open]="sidenav.isOpen()" aria-label="Main" [attr.inert]="sidenav.isOpen() ? null : ''">
      <ul>
        @for (item of items(); track item.value) {
          <li>
            <a
              [routerLink]="item.value"
              routerLinkActive="active"
              ariaCurrentWhenActive="page"
              [routerLinkActiveOptions]="{ exact: item.value === '/' }"
              (click)="sidenav.close()"
              >{{ item.name }}</a
            >
          </li>
        }
      </ul>
    </nav>
  `,
  styles: `
    .backdrop {
      position: fixed;
      inset: 0;
      z-index: 30;
      background: hsl(var(--background) / 0.6);
      backdrop-filter: blur(4px);
      animation: fade 0.2s ease-out;
    }
    .drawer {
      position: fixed;
      z-index: 31;
      top: 0;
      bottom: 0;
      left: 0;
      width: min(18rem, 85vw);
      padding: calc(var(--ws-navbar-height) + 0.75rem) 0.75rem 0.75rem;
      border-right: 1px solid hsl(var(--border));
      background: hsl(var(--card));
      box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1);
      transform: translateX(-105%);
      transition: transform 0.25s var(--ease-out-expo);
    }
    .drawer.open {
      transform: none;
    }
    ul {
      display: grid;
      gap: 0.125rem;
      margin: 0;
      padding: 0;
      list-style: none;
    }
    a {
      display: flex;
      align-items: center;
      height: 2.5rem;
      padding: 0 0.75rem;
      border-radius: calc(var(--radius) - 2px);
      color: hsl(var(--muted-foreground));
      font-size: 0.875rem;
      text-decoration: none;
      transition: background-color 0.15s, color 0.15s;
    }
    a:hover {
      background: hsl(var(--accent) / 0.6);
      color: hsl(var(--foreground));
    }
    a.active {
      background: hsl(var(--accent));
      color: hsl(var(--accent-foreground));
      font-weight: 500;
    }
    @keyframes fade {
      from {
        opacity: 0;
      }
    }
    @media (prefers-reduced-motion: reduce) {
      .backdrop,
      .drawer,
      a {
        animation: none;
        transition: none;
      }
    }
  `,
  host: { '(document:keydown.escape)': 'sidenav.close()' },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WsSidenav {
  protected readonly sidenav = inject(WsSidenavService);
  /** Label and router path for each link. */
  readonly items = input<WsItem[]>([]);
}
