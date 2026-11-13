import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { WsModalService } from './ws-modal.service';

/** The dialog WsModalService opens. Put one in the app shell. */
@Component({
  selector: 'ws-modal',
  template: `
    @if (modal.content(); as content) {
      <div class="backdrop" (click)="modal.close(false)"></div>
      <div
        class="dialog"
        role="dialog"
        aria-modal="true"
        aria-labelledby="ws-modal-title"
      >
        <h2 id="ws-modal-title">{{ content.title }}</h2>
        <p>{{ content.message }}</p>
        <div class="buttons">
          <button type="button" class="ws-btn ws-btn-ghost" (click)="modal.close(false)">
            {{ content.dismissButton }}
          </button>
          @if (content.confirmButton) {
            <button type="button" class="ws-btn" (click)="modal.close(true)">
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
      background: rgb(0 0 0 / 0.5);
    }
    .dialog {
      position: fixed;
      z-index: 41;
      top: 50%;
      left: 50%;
      width: min(28rem, calc(100vw - 2rem));
      padding: 1.25rem;
      border-radius: var(--ws-radius);
      background: var(--ws-surface);
      box-shadow: var(--ws-shadow);
      transform: translate(-50%, -50%);
    }
    h2 {
      margin: 0 0 0.5rem;
      font-size: 1.25rem;
    }
    .buttons {
      display: flex;
      justify-content: flex-end;
      gap: 0.5rem;
      margin-top: 1rem;
    }
  `,
  host: { '(document:keydown.escape)': 'modal.content() && modal.close(false)' },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WsModal {
  protected readonly modal = inject(WsModalService);
}
