import { ChangeDetectionStrategy, Component, input, model } from '@angular/core';

/** An on/off switch. Replaces both ws-toggle and ws-switch from the Angular 2 library. */
@Component({
  selector: 'ws-toggle',
  template: `
    <label class="ws-toggle">
      <span class="label">{{ label() }}</span>
      <input
        type="checkbox"
        role="switch"
        [checked]="checked()"
        [disabled]="disabled()"
        (change)="checked.set($any($event.target).checked)"
      />
      <span class="track" aria-hidden="true"><span class="thumb"></span></span>
    </label>
  `,
  styles: `
    .ws-toggle {
      position: relative;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 0.75rem;
      min-height: 2.5rem;
      cursor: pointer;
    }
    /* Invisible, but covers the whole row so it is the real click target. */
    input {
      position: absolute;
      inset: 0;
      width: 100%;
      height: 100%;
      margin: 0;
      opacity: 0;
      cursor: pointer;
    }
    .track {
      position: relative;
      flex: none;
      width: 2.5rem;
      height: 1.4rem;
      border-radius: 1rem;
      background: var(--ws-border);
      transition: background 0.2s;
    }
    .thumb {
      position: absolute;
      top: 0.2rem;
      left: 0.2rem;
      width: 1rem;
      height: 1rem;
      border-radius: 50%;
      background: #fff;
      box-shadow: 0 1px 2px rgb(0 0 0 / 0.4);
      transition: transform 0.2s;
    }
    input:checked + .track {
      background: var(--ws-primary);
    }
    input:checked + .track .thumb {
      transform: translateX(1.1rem);
    }
    input:focus-visible + .track {
      outline: 2px solid var(--ws-primary);
      outline-offset: 2px;
    }
    input:disabled + .track {
      opacity: 0.5;
    }
    @media (prefers-reduced-motion: reduce) {
      .track,
      .thumb {
        transition: none;
      }
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WsToggle {
  readonly label = input('');
  readonly disabled = input(false);
  readonly checked = model(false);
}
