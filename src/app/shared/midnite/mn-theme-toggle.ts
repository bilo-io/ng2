import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Injector,
  afterNextRender,
  computed,
  inject,
  signal,
  viewChild,
  viewChildren,
} from '@angular/core';
import {
  UI_THEME_PREFERENCES,
  UiThemeService,
  type UiThemePreference,
} from '../../core/ui-theme.service';
import { MnButton } from './mn-button';
import { rovingIndex } from './roving';
import { MnIcon, type MnIconName } from './mn-icon';

const OPTIONS: Record<UiThemePreference, { label: string; icon: MnIconName }> = {
  light: { label: 'Light', icon: 'sun' },
  dark: { label: 'Dark', icon: 'moon' },
  system: { label: 'System', icon: 'laptop' },
};

/**
 * midnite-ui's ThemeToggle: a ghost icon button showing the resolved theme (sun or moon)
 * that opens a menu of Light, Dark and System, the saved choice checked.
 */
@Component({
  selector: 'mn-theme-toggle',
  imports: [MnButton, MnIcon],
  template: `
    <button
      #trigger
      type="button"
      mnButton
      variant="ghost"
      size="icon"
      aria-label="Toggle theme"
      aria-haspopup="menu"
      [attr.aria-expanded]="open()"
      [title]="'Theme: ' + options[theme.preference()].label"
      (click)="toggle()"
    >
      <mn-icon [name]="theme.scheme() === 'dark' ? 'moon' : 'sun'" />
    </button>
    @if (open()) {
      <div
        role="menu"
        aria-label="Theme"
        class="mn-pop absolute right-0 top-full z-50 mt-2 min-w-[10rem] rounded-md border bg-card p-1 text-card-foreground shadow-md"
        (keydown)="onMenuKey($event)"
      >
        @for (value of preferences; track value) {
          <button
            #item
            type="button"
            role="menuitemradio"
            class="flex w-full items-center gap-2 rounded-sm px-2 py-1.5 text-sm transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:bg-accent focus-visible:outline-none"
            [class.bg-accent]="value === theme.preference()"
            [class.text-accent-foreground]="value === theme.preference()"
            [attr.aria-checked]="value === theme.preference()"
            (click)="choose(value)"
          >
            <mn-icon [name]="options[value].icon" />
            <span>{{ options[value].label }}</span>
            @if (value === theme.preference()) {
              <mn-icon name="check" class="ml-auto" />
            }
          </button>
        }
      </div>
    }
  `,
  styles: `
    .mn-pop {
      animation: mn-pop 120ms ease-out;
      transform-origin: top right;
    }
    @keyframes mn-pop {
      from {
        opacity: 0;
        transform: translateY(-4px) scale(0.98);
      }
    }
    @media (prefers-reduced-motion: reduce) {
      .mn-pop {
        animation: none;
      }
    }
  `,
  host: {
    class: 'relative inline-flex',
    '(document:pointerdown)': 'onOutside($event)',
    '(document:keydown.escape)': 'close(true)',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MnThemeToggle {
  protected readonly theme = inject(UiThemeService);
  private readonly host = inject<ElementRef<HTMLElement>>(ElementRef);
  private readonly injector = inject(Injector);
  private readonly trigger = viewChild.required<ElementRef<HTMLButtonElement>>('trigger');
  private readonly items = viewChildren<ElementRef<HTMLButtonElement>>('item');

  protected readonly options = OPTIONS;
  protected readonly preferences = UI_THEME_PREFERENCES;
  protected readonly open = signal(false);
  private readonly checkedIndex = computed(() => this.preferences.indexOf(this.theme.preference()));

  protected toggle(): void {
    if (this.open()) {
      this.close(false);
      return;
    }
    this.open.set(true);
    afterNextRender(() => this.focusItem(this.checkedIndex()), { injector: this.injector });
  }

  protected choose(preference: UiThemePreference): void {
    this.theme.set(preference);
    this.close(true);
  }

  protected close(returnFocus: boolean): void {
    if (!this.open()) return;
    this.open.set(false);
    if (returnFocus) this.trigger().nativeElement.focus();
  }

  protected onOutside(event: PointerEvent): void {
    if (this.open() && !this.host.nativeElement.contains(event.target as Node)) this.close(false);
  }

  /** Up and Down move between the items, Home and End jump to the ends; Tab leaves the menu. */
  protected onMenuKey(event: KeyboardEvent): void {
    const items = this.items().map((item) => item.nativeElement);
    const current = items.indexOf(event.target as HTMLButtonElement);
    const last = items.length - 1;
    const next = rovingIndex(event.key, current, last);
    if (next !== undefined) {
      event.preventDefault();
      this.focusItem(next);
    } else if (event.key === 'Tab') {
      this.close(false);
    }
  }

  private focusItem(index: number): void {
    this.items()[index]?.nativeElement.focus();
  }
}
