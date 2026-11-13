import { Directive, computed, input } from '@angular/core';

export type MnButtonVariant =
  'default' | 'secondary' | 'ghost' | 'outline' | 'destructive' | 'success';
export type MnButtonSize = 'default' | 'sm' | 'lg' | 'icon';

/** midnite-ui `buttonVariants`, class for class. `success` is this app's addition (toasts demo). */
const BASE =
  'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium no-underline transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 motion-reduce:transition-none';

const VARIANTS: Record<MnButtonVariant, string> = {
  default: 'bg-primary text-primary-foreground hover:bg-primary/90',
  secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
  ghost: 'hover:bg-accent hover:text-accent-foreground',
  outline: 'border border-input bg-background hover:bg-accent hover:text-accent-foreground',
  destructive: 'bg-destructive text-destructive-foreground hover:bg-destructive/90',
  success: 'bg-success text-success-foreground hover:bg-success/90',
};

const SIZES: Record<MnButtonSize, string> = {
  default: 'h-9 px-4 py-2',
  sm: 'h-8 px-3 text-xs',
  lg: 'h-10 px-6',
  icon: 'h-9 w-9',
};

export function mnButtonClasses(
  variant: MnButtonVariant = 'default',
  size: MnButtonSize = 'default',
): string {
  return `${BASE} ${VARIANTS[variant]} ${SIZES[size]}`;
}

/**
 * midnite-ui's Button as an attribute, so native buttons and router links keep their semantics:
 * `<button mnButton variant="outline">`, `<a mnButton routerLink="/map">`, and
 * `<button mnButton size="icon" aria-label="…">` for an icon button.
 */
@Directive({
  selector: 'button[mnButton], a[mnButton]',
  host: { '[class]': 'classes()' },
})
export class MnButton {
  readonly variant = input<MnButtonVariant>('default');
  readonly size = input<MnButtonSize>('default');
  protected readonly classes = computed(() => mnButtonClasses(this.variant(), this.size()));
}
