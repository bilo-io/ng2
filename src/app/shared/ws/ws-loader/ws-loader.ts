import { ChangeDetectionStrategy, Component, input } from '@angular/core';

/** A spinning progress ring, with an optional label beside it (was ws-loader-label). */
@Component({
  selector: 'ws-loader',
  template: `
    <svg class="ring" viewBox="25 25 50 50" aria-hidden="true">
      <circle cx="50" cy="50" r="20" fill="none" stroke-width="4" stroke-miterlimit="10" />
    </svg>
    <span [class.visually-hidden]="!text()">{{ text() || 'Loading' }}</span>
  `,
  host: { role: 'status' },
  styles: `
    :host {
      display: inline-flex;
      align-items: center;
      gap: 0.75rem;
      color: var(--ws-primary-strong);
    }
    .ring {
      width: 2.5rem;
      height: 2.5rem;
      animation: rotate 2s linear infinite;
    }
    circle {
      stroke: var(--ws-primary);
      stroke-dasharray: 1, 200;
      stroke-dashoffset: 0;
      stroke-linecap: round;
      animation: dash 1.5s ease-in-out infinite;
    }
    .visually-hidden {
      position: absolute;
      width: 1px;
      height: 1px;
      overflow: hidden;
      clip-path: inset(50%);
    }
    @keyframes rotate {
      to {
        transform: rotate(360deg);
      }
    }
    @keyframes dash {
      0% {
        stroke-dasharray: 1, 200;
        stroke-dashoffset: 0;
      }
      50% {
        stroke-dasharray: 89, 200;
        stroke-dashoffset: -35px;
      }
      100% {
        stroke-dasharray: 89, 200;
        stroke-dashoffset: -124px;
      }
    }
    @media (prefers-reduced-motion: reduce) {
      .ring,
      circle {
        animation-duration: 6s;
      }
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WsLoader {
  readonly text = input('');
}
