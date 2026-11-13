import { Component, signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { MnSegmented, type MnSegmentedOption } from './mn-segmented';

type Fruit = 'apple' | 'pear' | 'fig';

@Component({
  imports: [MnSegmented],
  template: `<mn-segmented label="Fruit" [options]="options" [columns]="2" [(value)]="value" />`,
})
class Host {
  readonly options: MnSegmentedOption<Fruit>[] = [
    { value: 'apple', label: 'Apple', icon: 'sun' },
    { value: 'pear', label: 'Pear' },
    { value: 'fig', label: 'Fig' },
  ];
  readonly value = signal<Fruit>('pear');
}

describe('MnSegmented', () => {
  it('is a labelled group of radios with the value checked', async () => {
    const fixture = TestBed.createComponent(Host);
    await fixture.whenStable();
    const root = fixture.nativeElement as HTMLElement;
    expect(root.querySelector('legend')?.textContent?.trim()).toBe('Fruit');
    const radios = [...root.querySelectorAll<HTMLInputElement>('input[type=radio]')];
    expect(radios.map((radio) => radio.value)).toEqual(['apple', 'pear', 'fig']);
    expect(radios.map((radio) => radio.checked)).toEqual([false, true, false]);
    expect(new Set(radios.map((radio) => radio.name)).size).toBe(1);
    expect(root.querySelectorAll('mn-icon').length).toBe(1);
    const grid = root.querySelector<HTMLElement>('fieldset > div')!;
    expect(grid.style.gridTemplateColumns).toBe('repeat(2, minmax(0, 1fr))');
  });

  it('writes the chosen value back and highlights it', async () => {
    const fixture = TestBed.createComponent(Host);
    await fixture.whenStable();
    const root = fixture.nativeElement as HTMLElement;
    const fig = root.querySelectorAll<HTMLInputElement>('input[type=radio]')[2];
    fig.click();
    await fixture.whenStable();
    expect(fixture.componentInstance.value()).toBe('fig');
    expect(fig.closest('label')?.classList).toContain('bg-accent');
  });

  it('gives each instance its own radio name', async () => {
    const one = TestBed.createComponent(Host);
    const two = TestBed.createComponent(Host);
    await one.whenStable();
    await two.whenStable();
    const name = (fixture: typeof one) =>
      (fixture.nativeElement as HTMLElement).querySelector<HTMLInputElement>('input')!.name;
    expect(name(one)).not.toBe(name(two));
  });
});
