import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MnIcon, type MnIconName } from '../../midnite/mn-icon';
import { WsToastService, type WsToastKind } from './ws-toast.service';

const ICONS: Record<WsToastKind, MnIconName> = {
  default: 'info',
  light: 'info',
  dark: 'info',
  success: 'circle-check',
  warning: 'triangle-alert',
  error: 'circle-x',
};

/** Shows the toasts from WsToastService, as midnite-ui cards with a status icon. Put one in the app shell. */
@Component({
  selector: 'ws-toast',
  imports: [MnIcon],
  template: `
    <div class="stack" aria-live="polite">
      @for (toast of toaster.toasts(); track toast.id) {
        <div [class]="'toast toast-' + toast.kind" role="status">
          <mn-icon class="icon" [name]="icons[toast.kind]" />
          <span class="message">{{ toast.message }}</span>
          <button type="button" aria-label="Dismiss" (click)="toaster.dismiss(toast.id)">
            <mn-icon name="x" />
          </button>
        </div>
      }
    </div>
  `,
  styles: `
    .stack {
      position: fixed;
      z-index: 50;
      right: 1rem;
      bottom: 1rem;
      left: 1rem;
      display: flex;
      flex-direction: column;
      align-items: flex-end;
      gap: 0.5rem;
      pointer-events: none;
    }
    .toast {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      width: min(22rem, 100%);
      padding: 0.75rem 0.75rem 0.75rem 1rem;
      border: 1px solid hsl(var(--border));
      border-radius: var(--radius);
      background: hsl(var(--card));
      color: hsl(var(--card-foreground));
      font-size: 0.875rem;
      box-shadow: var(--mn-shadow-lg);
      pointer-events: auto;
      animation: toast-in 0.25s var(--ease-out-expo);
    }
    .icon {
      color: hsl(var(--muted-foreground));
    }
    .toast-success .icon {
      color: hsl(var(--success));
    }
    .toast-warning .icon {
      color: hsl(var(--status-wip));
    }
    .toast-error {
      border-color: hsl(var(--destructive) / 0.5);
    }
    .toast-error .icon {
      color: hsl(var(--destructive));
    }
    .toast-light {
      background: hsl(var(--secondary));
      color: hsl(var(--secondary-foreground));
    }
    .toast-dark {
      border-color: transparent;
      background: hsl(var(--primary));
      color: hsl(var(--primary-foreground));
    }
    .toast-dark .icon {
      color: inherit;
    }
    .message {
      flex: 1;
    }
    button {
      display: inline-grid;
      place-items: center;
      width: 1.75rem;
      height: 1.75rem;
      border: 0;
      border-radius: calc(var(--radius) - 4px);
      background: none;
      color: inherit;
      opacity: 0.7;
      cursor: pointer;
    }
    button:hover {
      opacity: 1;
    }
    @keyframes toast-in {
      from {
        opacity: 0;
        transform: translateY(0.5rem);
      }
    }
    @media (prefers-reduced-motion: reduce) {
      .toast {
        animation: none;
      }
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WsToastHost {
  protected readonly toaster = inject(WsToastService);
  protected readonly icons = ICONS;
}
