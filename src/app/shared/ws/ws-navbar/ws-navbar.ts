import { ChangeDetectionStrategy, Component, computed, inject, input } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { UiThemeService } from '../../../core/ui-theme.service';
import type { WsItem } from '../ws-item';
import { WsSidenav, WsSidenavService } from '../ws-sidenav/ws-sidenav';

const THEME_LABELS = { system: 'System theme', light: 'Light theme', dark: 'Dark theme' } as const;

/** The top bar: menu, title, links and the light/dark switch. */
@Component({
  selector: 'ws-navbar',
  imports: [RouterLink, RouterLinkActive, WsSidenav],
  template: `
    <header class="navbar">
      <button
        type="button"
        class="icon-button"
        aria-label="Menu"
        [attr.aria-expanded]="sidenav.isOpen()"
        (click)="sidenav.toggle()"
      >
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M3 6h18v2H3zm0 5h18v2H3zm0 5h18v2H3z" />
        </svg>
      </button>
      <a class="title" routerLink="/">{{ title() }}</a>
      <nav class="links" aria-label="Sections">
        @for (item of items(); track item.value) {
          <a
            [routerLink]="item.value"
            routerLinkActive="active"
            [routerLinkActiveOptions]="{ exact: item.value === '/' }"
            >{{ item.name }}</a
          >
        }
      </nav>
      <button
        type="button"
        class="icon-button theme"
        [attr.aria-label]="themeLabel() + ' (change)'"
        [title]="themeLabel()"
        (click)="theme.cycle()"
      >
        @switch (theme.preference()) {
          @case ('light') {
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <circle cx="12" cy="12" r="4.5" />
              <path
                d="M12 1v3M12 20v3M1 12h3M20 12h3M4.2 4.2l2.1 2.1M17.7 17.7l2.1 2.1M4.2 19.8l2.1-2.1M17.7 6.3l2.1-2.1"
                stroke="currentColor"
                stroke-width="2"
              />
            </svg>
          }
          @case ('dark') {
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M20 14.5A8.5 8.5 0 0 1 9.5 4a8.5 8.5 0 1 0 10.5 10.5z" />
            </svg>
          }
          @default {
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M3 4h18v12H3zm2 2v8h14V6zM8 18h8v2H8z" />
            </svg>
          }
        }
      </button>
    </header>
    <ws-sidenav [items]="items()" />
  `,
  styles: `
    .navbar {
      position: sticky;
      top: 0;
      z-index: 32;
      display: flex;
      align-items: center;
      gap: 0.5rem;
      height: var(--ws-navbar-height);
      padding: 0 0.5rem;
      background: #1e1e1e;
      color: #e4e4e4;
      box-shadow: 0 1px 4px rgb(0 0 0 / 0.4);
    }
    .title {
      color: #00adee;
      font-size: 1.25rem;
      font-weight: 600;
      text-decoration: none;
    }
    .links {
      display: none;
      gap: 0.25rem;
      margin-left: 1rem;
    }
    .links a {
      padding: 0.4rem 0.75rem;
      border-radius: var(--ws-radius);
      color: #e4e4e4;
      text-decoration: none;
    }
    .links a:hover {
      background: #333;
    }
    .links a.active {
      color: #00adee;
    }
    .icon-button {
      display: inline-grid;
      place-items: center;
      width: 2.75rem;
      height: 2.75rem;
      border: 0;
      border-radius: 50%;
      background: none;
      color: inherit;
      cursor: pointer;
    }
    .icon-button:hover {
      background: #333;
    }
    .icon-button svg {
      width: 1.5rem;
      height: 1.5rem;
      fill: currentColor;
    }
    .theme {
      margin-left: auto;
    }
    @media (min-width: 720px) {
      .links {
        display: flex;
      }
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WsNavbar {
  protected readonly sidenav = inject(WsSidenavService);
  protected readonly theme = inject(UiThemeService);
  readonly title = input('ng2');
  readonly items = input<WsItem[]>([]);
  protected readonly themeLabel = computed(() => THEME_LABELS[this.theme.preference()]);
}
