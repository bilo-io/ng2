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
      background: rgb(0 0 0 / 0.45);
    }
    .drawer {
      position: fixed;
      z-index: 31;
      top: 0;
      bottom: 0;
      left: 0;
      width: min(18rem, 85vw);
      padding-top: var(--ws-navbar-height);
      background: var(--ws-surface);
      box-shadow: var(--ws-shadow);
      transform: translateX(-105%);
      transition: transform 0.2s ease-out;
    }
    .drawer.open {
      transform: none;
    }
    ul {
      margin: 0;
      padding: 0;
      list-style: none;
    }
    a {
      display: block;
      padding: 0.9rem 1.25rem;
      border-left: 4px solid transparent;
      color: var(--ws-text);
      text-decoration: none;
    }
    a:hover {
      background: var(--ws-surface-2);
    }
    a.active {
      border-left-color: var(--ws-primary);
      color: var(--ws-primary-strong);
      font-weight: 600;
    }
    @media (prefers-reduced-motion: reduce) {
      .drawer {
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
