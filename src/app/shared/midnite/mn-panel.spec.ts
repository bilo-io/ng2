import { Component, signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { MnPanel } from './mn-panel';

@Component({
  imports: [MnPanel],
  template: `
    <mn-panel heading="Map" summary="Light · 3D" icon="layers" [(open)]="open">
      <button type="button">Inside</button>
    </mn-panel>
  `,
})
class Host {
  readonly open = signal(false);
}

describe('MnPanel', () => {
  it('opens and closes from its header, inert while closed', async () => {
    const fixture = TestBed.createComponent(Host);
    await fixture.whenStable();
    const root = fixture.nativeElement as HTMLElement;
    const header = root.querySelector<HTMLButtonElement>('button[aria-controls]')!;
    const body = root.querySelector<HTMLElement>(`#${header.getAttribute('aria-controls')}`)!;

    expect(header.textContent).toContain('Map');
    expect(header.textContent).toContain('Light · 3D');
    expect(header.getAttribute('aria-expanded')).toBe('false');
    expect(body.classList).toContain('grid-rows-[0fr]');
    expect(body.firstElementChild?.hasAttribute('inert')).toBe(true);

    header.click();
    await fixture.whenStable();
    expect(fixture.componentInstance.open()).toBe(true);
    expect(header.getAttribute('aria-expanded')).toBe('true');
    expect(body.classList).toContain('grid-rows-[1fr]');
    expect(body.firstElementChild?.hasAttribute('inert')).toBe(false);
    expect(body.textContent).toContain('Inside');
  });

  it('names its region after the heading', async () => {
    const fixture = TestBed.createComponent(Host);
    await fixture.whenStable();
    const section = (fixture.nativeElement as HTMLElement).querySelector('section');
    expect(section?.getAttribute('aria-label')).toBe('Map');
  });
});
