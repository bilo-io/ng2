import { Component, signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { MnButton, mnButtonClasses, type MnButtonSize, type MnButtonVariant } from './mn-button';

@Component({
  imports: [MnButton],
  template: `
    <button type="button" mnButton [variant]="variant()" [size]="size()" class="w-full">Go</button>
    <a mnButton variant="outline" href="/map">Map</a>
  `,
})
class Host {
  readonly variant = signal<MnButtonVariant>('default');
  readonly size = signal<MnButtonSize>('default');
}

describe('MnButton', () => {
  it('gives buttons and links the midnite classes, keeping their own', async () => {
    const fixture = TestBed.createComponent(Host);
    await fixture.whenStable();
    const [button, link] = [
      ...(fixture.nativeElement as HTMLElement).querySelectorAll<HTMLElement>('[mnButton]'),
    ];
    expect(button.classList).toContain('bg-primary');
    expect(button.classList).toContain('h-9');
    expect(button.classList).toContain('w-full');
    expect(link.classList).toContain('border-input');
  });

  it('follows variant and size changes', async () => {
    const fixture = TestBed.createComponent(Host);
    await fixture.whenStable();
    fixture.componentInstance.variant.set('ghost');
    fixture.componentInstance.size.set('icon');
    await fixture.whenStable();
    const button = (fixture.nativeElement as HTMLElement).querySelector('button')!;
    expect(button.classList).toContain('hover:bg-accent');
    expect(button.classList).toContain('w-9');
    expect(button.classList).not.toContain('bg-primary');
    expect(button.classList).toContain('w-full');
  });

  it('builds every variant and size', () => {
    const variants: MnButtonVariant[] = [
      'default',
      'secondary',
      'ghost',
      'outline',
      'destructive',
      'success',
    ];
    for (const variant of variants) {
      expect(mnButtonClasses(variant)).toContain('rounded-md');
    }
    expect(mnButtonClasses('default', 'sm')).toContain('h-8');
    expect(mnButtonClasses('default', 'lg')).toContain('h-10');
  });
});
