import { ChangeDetectionStrategy, Component, computed, input, output, signal } from '@angular/core';
import type { WsItem } from '../ws-item';
import { WsList } from '../ws-list/ws-list';

/** Filters a list of items as you type. */
@Component({
  selector: 'ws-autocomplete',
  imports: [WsList],
  template: `
    <input
      class="ws-field"
      type="search"
      [attr.aria-label]="hint()"
      [placeholder]="hint()"
      [value]="query()"
      (input)="query.set($any($event.target).value); open.set(true)"
    />
    @if (open() && query().length > 0) {
      <ws-list
        [items]="matches()"
        [shadow]="true"
        [emptyText]="noResultText()"
        (itemClicked)="choose($event)"
      />
    }
  `,
  styles: `
    :host {
      display: block;
      position: relative;
    }
    ws-list {
      position: absolute;
      z-index: 5;
      left: 0;
      right: 0;
      margin-top: 0.25rem;
      max-height: 16rem;
      overflow-y: auto;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WsAutocomplete<T> {
  readonly items = input<WsItem<T>[]>([]);
  readonly hint = input('Search for items');
  readonly noResultText = input('No items match your query');
  readonly selected = output<WsItem<T>>();

  protected readonly query = signal('');
  protected readonly open = signal(false);
  protected readonly matches = computed(() => {
    const query = this.query().trim().toLowerCase();
    return this.items().filter((item) => item.name.toLowerCase().includes(query));
  });

  protected choose(item: WsItem<T>): void {
    this.query.set(item.name);
    this.open.set(false);
    this.selected.emit(item);
  }
}
