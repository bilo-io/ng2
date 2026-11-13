import { ChangeDetectionStrategy, Component, inject, input } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { MnButton } from '../../midnite/mn-button';
import { MnIcon } from '../../midnite/mn-icon';
import { MnThemeToggle } from '../../midnite/mn-theme-toggle';
import type { WsItem } from '../ws-item';
import { WsSidenav, WsSidenavService } from '../ws-sidenav/ws-sidenav';

/** The top bar, in the midnite showcase's style: brand, segmented links, theme menu. */
@Component({
  selector: 'ws-navbar',
  imports: [RouterLink, RouterLinkActive, WsSidenav, MnButton, MnIcon, MnThemeToggle],
  template: `
    <header
      class="mn-glass sticky top-0 z-[32] flex h-[var(--ws-navbar-height)] items-center gap-2 border-b px-2 sm:px-4"
    >
      <button
        type="button"
        mnButton
        variant="ghost"
        size="icon"
        class="min-[720px]:hidden"
        aria-label="Menu"
        [attr.aria-expanded]="sidenav.isOpen()"
        (click)="sidenav.toggle()"
      >
        <mn-icon [name]="sidenav.isOpen() ? 'x' : 'menu'" size="lg" />
      </button>
      <a
        class="title group flex items-center gap-2 rounded-md text-lg font-semibold tracking-tight no-underline"
        routerLink="/"
      >
        <span
          class="grid h-7 w-7 place-items-center rounded-lg bg-foreground text-background transition-transform duration-300 group-hover:-rotate-6 motion-reduce:transition-none"
          aria-hidden="true"
        >
          <mn-icon name="map" />
        </span>
        <span class="mui-rainbow-text">{{ title() }}</span>
      </a>
      <nav
        class="links ml-4 hidden items-center gap-0.5 rounded-lg border border-border/60 bg-card/60 p-0.5 min-[720px]:flex"
        aria-label="Sections"
      >
        @for (item of items(); track item.value) {
          <a
            class="rounded-md px-3 py-1.5 text-sm font-medium text-muted-foreground no-underline transition-colors hover:text-foreground motion-reduce:transition-none"
            [routerLink]="item.value"
            routerLinkActive="bg-accent !text-accent-foreground shadow-sm"
            ariaCurrentWhenActive="page"
            [routerLinkActiveOptions]="{ exact: item.value === '/' }"
            >{{ item.name }}</a
          >
        }
      </nav>
      <mn-theme-toggle class="ml-auto" />
    </header>
    <ws-sidenav [items]="items()" />
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WsNavbar {
  protected readonly sidenav = inject(WsSidenavService);
  readonly title = input('ng2');
  readonly items = input<WsItem[]>([]);
}
