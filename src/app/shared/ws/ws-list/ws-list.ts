import { ChangeDetectionStrategy, Component, input, model, output } from '@angular/core';
import type { WsItem } from '../ws-item';

/** A clickable list; single or multiple choice. */
@Component({
  selector: 'ws-list',
  template: `
    <ul
      class="ws-list"
      role="listbox"
      [class.ws-list-shadow]="shadow()"
      [attr.aria-label]="label() || null"
      [attr.aria-multiselectable]="multiple()"
    >
      @for (item of items(); track item.value) {
        <li
          role="option"
          tabindex="0"
          [attr.aria-selected]="isActive(item)"
          [class.active]="rememberState() && isActive(item)"
          (click)="toggle(item)"
          (keydown.enter)="toggle(item)"
          (keydown.space)="$event.preventDefault(); toggle(item)"
        >
          {{ item.name }}
        </li>
      } @empty {
        @if (emptyText()) {
          <li class="empty">{{ emptyText() }}</li>
        }
      }
    </ul>
  `,
  styles: `
    /* midnite-ui Select's menu: a bordered card of rounded rows, muted until hovered or chosen. */
    .ws-list {
      display: grid;
      gap: 0.125rem;
      margin: 0;
      padding: 0.25rem;
      list-style: none;
      border: 1px solid hsl(var(--border));
      border-radius: calc(var(--radius) - 2px);
      background: hsl(var(--card));
      color: hsl(var(--card-foreground));
    }
    .ws-list-shadow {
      box-shadow: var(--mn-shadow-lg);
    }
    li {
      padding: 0.375rem 0.5rem;
      border-radius: 0.25rem;
      color: hsl(var(--muted-foreground));
      font-size: 0.875rem;
      cursor: pointer;
      transition: background-color 0.15s, color 0.15s;
    }
    li:hover,
    li:focus-visible {
      outline: none;
      background: hsl(var(--accent) / 0.6);
      color: hsl(var(--foreground));
    }
    li.active {
      background: hsl(var(--accent));
      color: hsl(var(--accent-foreground));
      font-weight: 500;
    }
    li.empty {
      cursor: default;
    }
    li.empty:hover {
      background: none;
      color: hsl(var(--muted-foreground));
    }
    @media (prefers-reduced-motion: reduce) {
      li {
        transition: none;
      }
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WsList<T> {
  readonly items = input<WsItem<T>[]>([]);
  readonly multiple = input(false);
  /** Highlight the chosen items. */
  readonly rememberState = input(false);
  readonly shadow = input(false);
  readonly label = input('');
  readonly emptyText = input('');
  /** The chosen values. */
  readonly active = model<T[]>([]);
  readonly itemClicked = output<WsItem<T>>();

  isActive(item: WsItem<T>): boolean {
    return this.active().includes(item.value);
  }

  toggle(item: WsItem<T>): void {
    if (this.multiple()) {
      this.active.update((active) =>
        active.includes(item.value) ? active.filter((v) => v !== item.value) : [...active, item.value],
      );
    } else {
      this.active.set([item.value]);
    }
    this.itemClicked.emit(item);
  }
}
