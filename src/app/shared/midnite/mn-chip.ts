import { Directive, computed, input } from '@angular/core';

const BASE =
  'inline-flex items-center gap-1.5 whitespace-nowrap rounded-full border font-medium no-underline transition-colors motion-reduce:transition-none';
const SIZES = { sm: 'px-2.5 py-0.5 text-xs', md: 'h-8 px-3 text-xs' } as const;
const IDLE = 'border-border/80 bg-background/60 text-muted-foreground';
const ACTIVE = 'border-foreground/20 bg-accent text-accent-foreground';
const INTERACTIVE = 'cursor-pointer hover:border-foreground/30 hover:text-foreground';

/**
 * A pill: a static badge on a `span`, or a filter chip on a `button` (hover and
 * `active` states). The chip look bilo.dev builds on midnite-ui's tokens.
 */
@Directive({
  selector: '[mnChip]',
  host: { '[class]': 'classes()', '[attr.data-active]': 'active() || null' },
})
export class MnChip {
  readonly size = input<keyof typeof SIZES>('sm');
  readonly active = input(false);
  readonly interactive = input(false);
  protected readonly classes = computed(
    () =>
      `${BASE} ${SIZES[this.size()]} ${this.active() ? ACTIVE : IDLE} ${this.interactive() ? INTERACTIVE : ''}`,
  );
}
