import { Directive, computed, input } from '@angular/core';

export type MnSurface = 'solid' | 'glass';

const SURFACES: Record<MnSurface, string> = {
  // midnite-ui Card.
  solid: 'rounded-lg border bg-card text-card-foreground shadow-sm',
  // The frosted surface bilo.dev and the showcase float over busy content.
  glass: 'mn-glass rounded-xl border text-card-foreground shadow-lg',
};

/** midnite-ui's Card surface on any element: `<section mnCard>`, `<div mnCard="glass">`. Add padding with `p-*`. */
@Directive({
  selector: '[mnCard]',
  host: { '[class]': 'classes()' },
})
export class MnCard {
  readonly surface = input<MnSurface | ''>('solid', { alias: 'mnCard' });
  protected readonly classes = computed(() => SURFACES[this.surface() || 'solid']);
}
