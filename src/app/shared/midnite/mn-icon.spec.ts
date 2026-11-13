import { Component, signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { MN_ICON_NAMES, MnIcon, type MnIconName } from './mn-icon';

@Component({
  imports: [MnIcon],
  template: `<mn-icon [name]="name()" [size]="size()" />`,
})
class Host {
  readonly name = signal<MnIconName>('sun');
  readonly size = signal<'sm' | 'md' | 'lg'>('md');
}

describe('MnIcon', () => {
  it('draws the named icon, hidden from assistive tech', async () => {
    const fixture = TestBed.createComponent(Host);
    await fixture.whenStable();
    const host = (fixture.nativeElement as HTMLElement).querySelector('mn-icon')!;
    expect(host.getAttribute('data-icon')).toBe('sun');
    expect(host.querySelector('svg')?.getAttribute('aria-hidden')).toBe('true');
    expect(host.querySelectorAll('path').length).toBe(9);
    expect(host.classList).toContain('h-4');

    fixture.componentInstance.name.set('moon');
    fixture.componentInstance.size.set('lg');
    await fixture.whenStable();
    expect(host.querySelectorAll('path').length).toBe(1);
    expect(host.classList).toContain('h-5');
    expect(host.classList).not.toContain('h-4');
  });

  it('has path data for every icon', async () => {
    const fixture = TestBed.createComponent(Host);
    for (const name of MN_ICON_NAMES) {
      fixture.componentInstance.name.set(name);
      await fixture.whenStable();
      const paths = [...(fixture.nativeElement as HTMLElement).querySelectorAll('path')];
      expect(paths.length, name).toBeGreaterThan(0);
      expect(
        paths.every((path) => /^[Mm]/.test(path.getAttribute('d') ?? '')),
        name,
      ).toBe(true);
    }
  });
});
