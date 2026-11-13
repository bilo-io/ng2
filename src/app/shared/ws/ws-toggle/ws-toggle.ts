import { ChangeDetectionStrategy, Component, input, model } from '@angular/core';

/** An on/off switch in midnite-ui's Switch look. Replaces both ws-toggle and ws-switch from the Angular 2 library. */
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
    .label {
      font-size: 0.875rem;
      font-weight: 500;
    }
    /* midnite-ui Switch: h-5 w-9 track, border colour off, foreground on; a background-coloured thumb. */
    .track {
      position: relative;
      flex: none;
      width: 2.25rem;
      height: 1.25rem;
      padding: 0.125rem;
      border-radius: 9999px;
      background: hsl(var(--border));
      transition: background-color 0.2s ease-in-out;
    }
    .thumb {
      display: block;
      width: 1rem;
      height: 1rem;
      border-radius: 9999px;
      background: hsl(var(--background));
      box-shadow: 0 1px 2px 0 rgb(0 0 0 / 0.15);
      transition: transform 0.2s ease-in-out;
    }
    input:checked + .track {
      background: hsl(var(--foreground));
    }
    input:checked + .track .thumb {
      transform: translateX(1rem);
    }
    input:focus-visible + .track {
      outline: 2px solid hsl(var(--ring));
      outline-offset: 2px;
    }
    input:disabled + .track {
      opacity: 0.4;
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
