import { TestBed } from '@angular/core/testing';
import { UI_THEME_STORAGE_KEY, UiThemeService } from '../../core/ui-theme.service';
import { MnThemeToggle } from './mn-theme-toggle';

describe('MnThemeToggle', () => {
  let root: HTMLElement;
  let trigger: HTMLButtonElement;

  async function setup() {
    const fixture = TestBed.createComponent(MnThemeToggle);
    await fixture.whenStable();
    root = fixture.nativeElement as HTMLElement;
    trigger = root.querySelector<HTMLButtonElement>('button[aria-haspopup="menu"]')!;
    return fixture;
  }

  const menu = () => root.querySelector('[role="menu"]');
  const items = () => [...root.querySelectorAll<HTMLButtonElement>('[role="menuitemradio"]')];

  beforeEach(() => {
    localStorage.removeItem(UI_THEME_STORAGE_KEY);
    if (!window.matchMedia) {
      window.matchMedia = (() => ({
        matches: false,
        addEventListener: () => {},
      })) as unknown as typeof window.matchMedia;
    }
  });

  afterEach(() => {
    localStorage.removeItem(UI_THEME_STORAGE_KEY);
    document.documentElement.classList.remove('dark');
  });

  it('shows the resolved theme on a closed trigger', async () => {
    TestBed.inject(UiThemeService).set('dark');
    await setup();
    expect(trigger.getAttribute('aria-label')).toBe('Toggle theme');
    expect(trigger.getAttribute('aria-expanded')).toBe('false');
    expect(trigger.querySelector('mn-icon')?.getAttribute('data-icon')).toBe('moon');
    expect(menu()).toBeNull();
  });

  it('opens a menu of Light, Dark and System with the saved choice checked and focused', async () => {
    const fixture = await setup();
    trigger.click();
    await fixture.whenStable();
    expect(trigger.getAttribute('aria-expanded')).toBe('true');
    expect(items().map((item) => item.textContent?.trim())).toEqual(['Light', 'Dark', 'System']);
    expect(items().map((item) => item.getAttribute('aria-checked'))).toEqual([
      'false',
      'false',
      'true',
    ]);
    expect(document.activeElement).toBe(items()[2]);
  });

  it('applies and saves a choice, then closes and returns focus', async () => {
    const fixture = await setup();
    trigger.click();
    await fixture.whenStable();
    items()[1].click();
    await fixture.whenStable();
    const theme = TestBed.inject(UiThemeService);
    expect(theme.preference()).toBe('dark');
    expect(localStorage.getItem(UI_THEME_STORAGE_KEY)).toBe('dark');
    expect(document.documentElement.classList.contains('dark')).toBe(true);
    expect(menu()).toBeNull();
    expect(document.activeElement).toBe(trigger);
    theme.set('light');
  });

  it('moves focus with the arrow keys, Home and End', async () => {
    const fixture = await setup();
    trigger.click();
    await fixture.whenStable();
    const key = (key: string) =>
      document.activeElement!.dispatchEvent(new KeyboardEvent('keydown', { key, bubbles: true }));
    key('ArrowDown');
    expect(document.activeElement).toBe(items()[0]);
    key('ArrowUp');
    expect(document.activeElement).toBe(items()[2]);
    key('Home');
    expect(document.activeElement).toBe(items()[0]);
    key('End');
    expect(document.activeElement).toBe(items()[2]);
  });

  it('closes on Escape and on a click outside', async () => {
    const fixture = await setup();
    trigger.click();
    await fixture.whenStable();
    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));
    await fixture.whenStable();
    expect(menu()).toBeNull();

    trigger.click();
    await fixture.whenStable();
    expect(menu()).not.toBeNull();
    document.body.dispatchEvent(new Event('pointerdown', { bubbles: true }));
    await fixture.whenStable();
    expect(menu()).toBeNull();
  });
});
