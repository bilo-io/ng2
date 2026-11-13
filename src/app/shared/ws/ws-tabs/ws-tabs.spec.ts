import { Component, signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import type { WsItem } from '../ws-item';
import { WsTabs } from './ws-tabs';

@Component({
  imports: [WsTabs],
  template: `<ws-tabs [tabs]="tabs" [(active)]="active" />`,
})
class Host {
  readonly tabs: WsItem<number>[] = [
    { name: 'One', value: 1 },
    { name: 'Two', value: 2 },
    { name: 'Three', value: 3 },
  ];
  readonly active = signal(1);
}

describe('WsTabs', () => {
  it('has one tab stop and moves it with the arrow keys, Home and End', async () => {
    const fixture = TestBed.createComponent(Host);
    await fixture.whenStable();
    const tabs = () => [
      ...(fixture.nativeElement as HTMLElement).querySelectorAll<HTMLButtonElement>('[role="tab"]'),
    ];
    expect(tabs().map((tab) => tab.tabIndex)).toEqual([0, -1, -1]);

    const press = async (key: string) => {
      tabs()[0].dispatchEvent(new KeyboardEvent('keydown', { key, bubbles: true }));
      await fixture.whenStable();
    };
    await press('ArrowRight');
    expect(fixture.componentInstance.active()).toBe(2);
    expect(tabs().map((tab) => tab.getAttribute('aria-selected'))).toEqual([
      'false',
      'true',
      'false',
    ]);
    await press('End');
    expect(fixture.componentInstance.active()).toBe(3);
    await press('ArrowRight');
    expect(fixture.componentInstance.active()).toBe(1);
    await press('ArrowLeft');
    expect(fixture.componentInstance.active()).toBe(3);
    await press('Home');
    expect(fixture.componentInstance.active()).toBe(1);
    expect(tabs().map((tab) => tab.tabIndex)).toEqual([0, -1, -1]);
  });
});
