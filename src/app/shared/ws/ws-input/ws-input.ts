import { ChangeDetectionStrategy, Component, input, model } from '@angular/core';

let nextId = 0;

@Component({
  selector: 'ws-input',
  template: `
    @if (label()) {
      <label class="ws-input-label" [attr.for]="id">{{ label() }}</label>
    }
    <input
      class="ws-field"
      [id]="id"
      [type]="type()"
      [placeholder]="placeholder()"
      [value]="value()"
      (input)="value.set($any($event.target).value)"
    />
  `,
  styles: `
    :host {
      display: block;
    }
    .ws-input-label {
      display: block;
      margin-bottom: 0.25rem;
      color: var(--ws-primary-strong);
      font-size: 0.85rem;
      font-weight: 600;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WsInput {
  protected readonly id = `ws-input-${nextId++}`;
  readonly label = input('');
  readonly type = input<'text' | 'number' | 'search' | 'email'>('text');
  readonly placeholder = input('');
  readonly value = model('');
}
