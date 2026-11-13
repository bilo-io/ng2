import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { MnCard } from './mn-card';
import { MnChip } from './mn-chip';

@Component({
  imports: [MnCard, MnChip],
  template: `
    <section mnCard class="p-6">Solid</section>
    <div mnCard="glass">Glass</div>
    <span mnChip>Badge</span>
    <button type="button" mnChip size="md" [active]="true" [interactive]="true">Chip</button>
  `,
})
class Host {}

describe('MnCard and MnChip', () => {
  let root: HTMLElement;

  beforeEach(async () => {
    const fixture = TestBed.createComponent(Host);
    await fixture.whenStable();
    root = fixture.nativeElement as HTMLElement;
  });

  it('gives a card the solid surface by default and glass on request', () => {
    const [solid, glass] = [...root.querySelectorAll<HTMLElement>('[mnCard]')];
    expect(solid.classList).toContain('bg-card');
    expect(solid.classList).toContain('shadow-sm');
    expect(solid.classList).toContain('p-6');
    expect(glass.classList).toContain('mn-glass');
    expect(glass.classList).toContain('rounded-xl');
  });

  it('draws a chip idle or active', () => {
    const [badge, chip] = [...root.querySelectorAll<HTMLElement>('[mnChip]')];
    expect(badge.classList).toContain('rounded-full');
    expect(badge.classList).toContain('text-muted-foreground');
    expect(badge.hasAttribute('data-active')).toBe(false);
    expect(chip.classList).toContain('bg-accent');
    expect(chip.classList).toContain('h-8');
    expect(chip.classList).toContain('cursor-pointer');
    expect(chip.getAttribute('data-active')).toBe('true');
  });
});
