import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MnButton } from '../../midnite/mn-button';
import { WsModalService } from './ws-modal.service';

/** The dialog WsModalService opens, as a midnite-ui card over a blurred backdrop. Put one in the app shell. */
@Component({
  selector: 'ws-modal',
  imports: [MnButton],
  template: `
    @if (modal.content(); as content) {
      <div class="backdrop" (click)="modal.close(false)"></div>
      <div class="dialog" role="dialog" aria-modal="true" aria-labelledby="ws-modal-title">
        <h2 id="ws-modal-title">{{ content.title }}</h2>
        <p>{{ content.message }}</p>
        <div class="buttons">
          <button type="button" mnButton variant="outline" (click)="modal.close(false)">
            {{ content.dismissButton }}
          </button>
          @if (content.confirmButton) {
            <button type="button" mnButton (click)="modal.close(true)">
              {{ content.confirmButton }}
            </button>
          }
        </div>
      </div>
    }
  `,
  styles: `
    .backdrop {
      position: fixed;
      inset: 0;
      z-index: 40;
      background: hsl(var(--background) / 0.7);
      backdrop-filter: blur(4px);
      animation: fade 0.15s ease-out;
    }
    .dialog {
      position: fixed;
      z-index: 41;
      top: 50%;
      left: 50%;
      width: min(28rem, calc(100vw - 2rem));
      padding: 1.5rem;
      border: 1px solid hsl(var(--border));
      border-radius: var(--radius);
      background: hsl(var(--card));
      color: hsl(var(--card-foreground));
      box-shadow: var(--mn-shadow-lg);
      transform: translate(-50%, -50%);
      animation: pop 0.2s var(--ease-out-expo);
    }
    h2 {
      margin: 0 0 0.375rem;
      font-size: 1.125rem;
      font-weight: 600;
      letter-spacing: -0.01em;
    }
    p {
      margin: 0;
      color: hsl(var(--muted-foreground));
      font-size: 0.875rem;
    }
    .buttons {
      display: flex;
      justify-content: flex-end;
      gap: 0.5rem;
      margin-top: 1.5rem;
    }
    @keyframes fade {
      from {
        opacity: 0;
      }
    }
    @keyframes pop {
      from {
        opacity: 0;
        transform: translate(-50%, -48%) scale(0.98);
      }
    }
    @media (prefers-reduced-motion: reduce) {
      .backdrop,
      .dialog {
        animation: none;
      }
    }
  `,
  host: { '(document:keydown.escape)': 'modal.content() && modal.close(false)' },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WsModal {
  protected readonly modal = inject(WsModalService);
}
