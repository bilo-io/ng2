import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { WsToastService, type WsToastKind } from './ws-toast.service';

const ICONS: Record<WsToastKind, string> = {
  default: 'ℹ',
  light: 'ℹ',
  dark: 'ℹ',
  success: '✓',
  warning: '!',
  error: '✕',
};

/** Shows the toasts from WsToastService. Put one in the app shell. */
@Component({
  selector: 'ws-toast',
  template: `
    <div class="stack" aria-live="polite">
      @for (toast of toaster.toasts(); track toast.id) {
        <div [class]="'toast toast-' + toast.kind" role="status">
          <span class="icon" aria-hidden="true">{{ icons[toast.kind] }}</span>
          <span class="message">{{ toast.message }}</span>
          <button type="button" aria-label="Dismiss" (click)="toaster.dismiss(toast.id)">✕</button>
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
      max-width: 24rem;
      padding: 0.6rem 0.75rem;
      border-radius: var(--ws-radius);
      box-shadow: var(--ws-shadow);
      background: var(--ws-primary);
      color: #fff;
      pointer-events: auto;
    }
    .toast-success {
      background: var(--ws-success);
    }
    .toast-warning {
      background: var(--ws-warning);
    }
    .toast-error {
      background: var(--ws-error);
    }
    .toast-light {
      background: #eef1ef;
      color: #1e1e1e;
    }
    .toast-dark {
      background: #1e1e1e;
      color: #eef1ef;
    }
    .icon {
      font-weight: 700;
    }
    .message {
      flex: 1;
    }
    button {
      border: 0;
      background: none;
      color: inherit;
      cursor: pointer;
      opacity: 0.8;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WsToastHost {
  protected readonly toaster = inject(WsToastService);
  protected readonly icons = ICONS;
}
