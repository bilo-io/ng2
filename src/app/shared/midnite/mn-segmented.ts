import { ChangeDetectionStrategy, Component, computed, input, model } from '@angular/core';
import { MnIcon, type MnIconName } from './mn-icon';

export interface MnSegmentedOption<T extends string> {
  value: T;
  label: string;
  icon?: MnIconName;
}

let nextId = 0;

/**
 * midnite-ui's segmented Tabs control, as a radio group: native radios give arrow-key
 * movement and form semantics for free. Wraps into `columns` when there are many options.
 */
@Component({
  selector: 'mn-segmented',
  imports: [MnIcon],
  template: `
    <fieldset class="m-0 min-w-0 border-0 p-0">
      @if (label()) {
        <legend class="mn-eyebrow mb-1.5 p-0">{{ label() }}</legend>
      }
      <div
        class="grid gap-0.5 rounded-md border border-border/60 bg-card/60 p-0.5"
        [style.grid-template-columns]="gridColumns()"
      >
        @for (option of options(); track option.value) {
          <label
            class="relative inline-flex min-h-8 cursor-pointer items-center justify-center gap-1.5 rounded px-2.5 py-1 text-xs font-medium transition-colors has-[:focus-visible]:ring-1 has-[:focus-visible]:ring-ring motion-reduce:transition-none"
            [class]="
              option.value === value()
                ? 'bg-accent text-accent-foreground shadow-sm'
                : 'text-muted-foreground hover:text-foreground'
            "
          >
            <input
              type="radio"
              class="absolute inset-0 m-0 h-full w-full cursor-pointer opacity-0"
              [name]="name"
              [value]="option.value"
              [checked]="option.value === value()"
              (change)="value.set(option.value)"
            />
            @if (option.icon) {
              <mn-icon [name]="option.icon" size="sm" />
            }
            {{ option.label }}
          </label>
        }
      </div>
    </fieldset>
  `,
  host: { class: 'block' },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MnSegmented<T extends string> {
  protected readonly name = `mn-segmented-${nextId++}`;
  readonly label = input('');
  readonly options = input.required<readonly MnSegmentedOption<T>[]>();
  /** Options per row; defaults to all on one row. */
  readonly columns = input<number | undefined>(undefined);
  readonly value = model.required<T>();
  protected readonly gridColumns = computed(
    () => `repeat(${this.columns() ?? this.options().length}, minmax(0, 1fr))`,
  );
}
