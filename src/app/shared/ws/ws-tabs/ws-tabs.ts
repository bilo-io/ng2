import { ChangeDetectionStrategy, Component, input, model } from '@angular/core';
import type { WsItem } from '../ws-item';

@Component({
  selector: 'ws-tabs',
  template: `
    <div class="ws-tabs" role="tablist">
      @for (tab of tabs(); track tab.value) {
        <button
          type="button"
          role="tab"
          [attr.aria-selected]="tab.value === active()"
          [class.active]="tab.value === active()"
          (click)="active.set(tab.value)"
        >
          {{ tab.name }}
        </button>
      }
    </div>
  `,
  styles: `
    .ws-tabs {
      display: flex;
      overflow-x: auto;
      border-bottom: 1px solid var(--ws-border);
    }
    button {
      flex: 1 0 auto;
      min-height: 2.75rem;
      padding: 0.5rem 1rem;
      border: 0;
      border-bottom: 3px solid transparent;
      background: none;
      cursor: pointer;
    }
    button.active {
      border-bottom-color: var(--ws-primary);
      color: var(--ws-primary-strong);
      font-weight: 600;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WsTabs<T> {
  readonly tabs = input<WsItem<T>[]>([]);
  readonly active = model<T>();
}
