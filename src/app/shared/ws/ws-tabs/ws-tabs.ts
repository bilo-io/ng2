import {
  ChangeDetectionStrategy,
  Component,
  computed,
  ElementRef,
  input,
  model,
  viewChildren,
} from '@angular/core';
import { rovingIndex } from '../../midnite/roving';
import type { WsItem } from '../ws-item';

/**
 * midnite-ui's segmented Tabs: one tab stop (roving tabindex), Left/Right (and Up/Down)
 * move and select, Home and End jump to the ends.
 */
@Component({
  selector: 'ws-tabs',
  template: `
    <div class="ws-tabs" role="tablist" (keydown)="onKey($event)">
      @for (tab of tabs(); track tab.value; let i = $index) {
        <button
          #tabButton
          type="button"
          role="tab"
          [attr.aria-selected]="tab.value === active()"
          [attr.tabindex]="i === tabStop() ? 0 : -1"
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
      display: inline-flex;
      max-width: 100%;
      align-items: center;
      overflow-x: auto;
      padding: 0.125rem;
      border: 1px solid hsl(var(--border) / 0.6);
      border-radius: calc(var(--radius) - 2px);
      background: hsl(var(--card) / 0.6);
    }
    button {
      flex: none;
      padding: 0.25rem 0.625rem;
      border: 0;
      border-radius: 0.25rem;
      background: none;
      color: hsl(var(--muted-foreground));
      font-size: 0.75rem;
      font-weight: 500;
      cursor: pointer;
      transition:
        color 0.15s,
        background-color 0.15s;
    }
    button:hover {
      color: hsl(var(--foreground));
    }
    button.active {
      background: hsl(var(--accent));
      color: hsl(var(--accent-foreground));
    }
    button:focus-visible {
      outline: none;
      box-shadow: 0 0 0 1px hsl(var(--ring));
    }
    @media (prefers-reduced-motion: reduce) {
      button {
        transition: none;
      }
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WsTabs<T> {
  readonly tabs = input<WsItem<T>[]>([]);
  readonly active = model<T>();
  private readonly buttons = viewChildren<ElementRef<HTMLButtonElement>>('tabButton');
  private readonly activeIndex = computed(() =>
    this.tabs().findIndex((tab) => tab.value === this.active()),
  );
  /** The one tab in the Tab order: the active tab, or the first while none is. */
  protected readonly tabStop = computed(() => Math.max(this.activeIndex(), 0));

  protected onKey(event: KeyboardEvent): void {
    const tabs = this.tabs();
    const index = rovingIndex(event.key, this.activeIndex(), tabs.length - 1, true);
    if (index === undefined || !tabs.length) return;
    event.preventDefault();
    this.active.set(tabs[index].value);
    this.buttons()[index]?.nativeElement.focus();
  }
}
