import { ChangeDetectionStrategy, Component, input, model } from '@angular/core';
import { MnCard } from './mn-card';
import { MnIcon, type MnIconName } from './mn-icon';

let nextId = 0;

/**
 * A floating glass panel with a disclosure header. The body opens and closes with
 * midnite-ui's Collapse technique: a CSS grid track animating between 0fr and 1fr,
 * no measuring and no per-frame work; `inert` while closed. Give the host a
 * `max-height` and the body scrolls inside it (the host is a flex column, so the
 * card shrinks to fit).
 */
@Component({
  selector: 'mn-panel',
  imports: [MnCard, MnIcon],
  template: `
    <section mnCard="glass" class="flex min-h-0 flex-col" [attr.aria-label]="heading()">
      <button
        type="button"
        class="flex min-h-11 w-full shrink-0 items-center gap-2 rounded-xl px-4 py-2 text-left text-sm font-semibold focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
        [attr.aria-expanded]="open()"
        [attr.aria-controls]="bodyId"
        (click)="open.set(!open())"
      >
        @if (icon(); as icon) {
          <mn-icon [name]="icon" class="text-muted-foreground" />
        }
        <span>{{ heading() }}</span>
        <span class="min-w-0 flex-1 truncate font-normal text-muted-foreground">{{
          summary()
        }}</span>
        <mn-icon
          name="chevron-down"
          class="text-muted-foreground transition-transform duration-200 motion-reduce:transition-none"
          [class.rotate-180]="open()"
        />
      </button>
      <div
        class="grid min-h-0 transition-[grid-template-rows] duration-200 ease-out motion-reduce:transition-none"
        [id]="bodyId"
        [class.grid-rows-[1fr]]="open()"
        [class.grid-rows-[0fr]]="!open()"
        [attr.data-open]="open()"
      >
        <div
          class="min-h-0"
          [class.overflow-hidden]="!open()"
          [class.overflow-y-auto]="open()"
          [attr.inert]="open() ? null : ''"
        >
          <div class="grid gap-3 px-4 pb-4 pt-1">
            <ng-content />
          </div>
        </div>
      </div>
    </section>
  `,
  host: { class: 'flex flex-col' },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MnPanel {
  protected readonly bodyId = `mn-panel-${nextId++}`;
  readonly heading = input.required<string>();
  /** A short line beside the heading, e.g. the current choice. */
  readonly summary = input('');
  readonly icon = input<MnIconName | undefined>(undefined);
  readonly open = model(true);
}
