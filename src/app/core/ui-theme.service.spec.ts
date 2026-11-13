import { TestBed } from '@angular/core/testing';
import { UI_THEME_STORAGE_KEY, UiThemeService } from './ui-theme.service';

describe('UiThemeService', () => {
  beforeEach(() => localStorage.removeItem(UI_THEME_STORAGE_KEY));
  afterEach(() => localStorage.removeItem(UI_THEME_STORAGE_KEY));

  it('starts from a stored choice', () => {
    localStorage.setItem(UI_THEME_STORAGE_KEY, 'dark');
    const service = TestBed.inject(UiThemeService);
    expect(service.preference()).toBe('dark');
    expect(service.scheme()).toBe('dark');
  });

  it('cycles system, light, dark and stores the choice', () => {
    const service = TestBed.inject(UiThemeService);
    expect(service.preference()).toBe('system');
    service.cycle();
    expect(service.preference()).toBe('light');
    service.cycle();
    expect(service.preference()).toBe('dark');
    expect(localStorage.getItem(UI_THEME_STORAGE_KEY)).toBe('dark');
    service.cycle();
    expect(service.preference()).toBe('system');
  });

  it('sets data-theme on the page', () => {
    const service = TestBed.inject(UiThemeService);
    service.set('dark');
    TestBed.tick();
    expect(document.documentElement.dataset['theme']).toBe('dark');
    service.set('light');
    TestBed.tick();
    expect(document.documentElement.dataset['theme']).toBe('light');
  });
});
