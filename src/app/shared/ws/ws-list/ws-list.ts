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
    .ws-list {
      margin: 0;
      padding: 0;
      list-style: none;
      border-radius: var(--ws-radius);
      background: var(--ws-surface);
      overflow: hidden;
    }
    .ws-list-shadow {
      box-shadow: var(--ws-shadow);
    }
    li {
      padding: 0.6rem 1rem;
      border-bottom: 1px solid var(--ws-border);
      cursor: pointer;
    }
    li:last-child {
      border-bottom: 0;
    }
    li:hover,
    li:focus-visible {
      background: var(--ws-surface-2);
    }
    li.active {
      background: var(--ws-primary);
      color: var(--ws-primary-contrast);
    }
    li.empty {
      color: var(--ws-muted);
      cursor: default;
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
