import { ChangeDetectionStrategy, Component, computed, input, model, signal } from '@angular/core';
import type { WsItem } from '../ws-item';
import { MnIcon } from '../../midnite/mn-icon';
import { WsList } from '../ws-list/ws-list';

/** A drop-down select, single or multiple, built on ws-list. */
@Component({
  selector: 'ws-select',
  imports: [WsList, MnIcon],
  template: `
    @if (label()) {
      <div class="ws-select-label">{{ label() }}</div>
    }
    <button
      type="button"
      class="ws-select-button ws-field"
      [attr.aria-expanded]="open()"
      (click)="open.set(!open())"
      (keydown.escape)="open.set(false)"
    >
      <span class="text" [class.hint]="value().length === 0">{{ displayText() }}</span>
      <mn-icon name="chevron-down" class="chevron" [class.open]="open()" />
    </button>
    @if (open()) {
      <ws-list
        [items]="items()"
        [multiple]="multiple()"
        [rememberState]="true"
        [shadow]="true"
        [label]="label()"
        [(active)]="value"
        (itemClicked)="!multiple() && open.set(false)"
      />
    }
  `,
  styles: `
    :host {
      display: block;
      position: relative;
    }
    .ws-select-label {
      margin-bottom: 0.375rem;
      color: hsl(var(--foreground));
      font-size: 0.875rem;
      font-weight: 500;
    }
    .ws-select-button {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 0.5rem;
      text-align: left;
      cursor: pointer;
    }
    .chevron {
      color: hsl(var(--muted-foreground));
      transition: transform 0.15s;
    }
    .chevron.open {
      transform: rotate(180deg);
    }
    @media (prefers-reduced-motion: reduce) {
      .chevron {
        transition: none;
      }
    }
    .hint {
      color: hsl(var(--muted-foreground));
    }
    ws-list {
      position: absolute;
      z-index: 5;
      left: 0;
      right: 0;
      margin-top: 0.25rem;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WsSelect<T> {
  readonly label = input('');
  readonly items = input<WsItem<T>[]>([]);
  readonly multiple = input(false);
  readonly hint = input('Select…');
  readonly value = model<T[]>([]);

  protected readonly open = signal(false);
  protected readonly displayText = computed(() => {
    const chosen = this.items().filter((item) => this.value().includes(item.value));
    return chosen.length > 0 ? chosen.map((item) => item.name).join(', ') : this.hint();
  });
}
