import { TestBed } from '@angular/core/testing';
import { UI_THEME_STORAGE_KEY, UiThemeService } from './ui-theme.service';

/** A controllable `(prefers-color-scheme: dark)` query. */
function fakeSystemTheme(dark: boolean) {
  const listeners: ((event: { matches: boolean }) => void)[] = [];
  const query = {
    matches: dark,
    addEventListener: (_: string, listener: (event: { matches: boolean }) => void) =>
      listeners.push(listener),
  };
  vi.spyOn(window, 'matchMedia').mockReturnValue(query as unknown as MediaQueryList);
  return {
    change(matches: boolean) {
      query.matches = matches;
      listeners.forEach((listener) => listener({ matches }));
    },
  };
}

describe('UiThemeService', () => {
  const root = document.documentElement;

  beforeEach(() => {
    localStorage.removeItem(UI_THEME_STORAGE_KEY);
    root.classList.remove('dark');
    // jsdom has no matchMedia; give every test a light system theme unless it says otherwise.
    if (!window.matchMedia) window.matchMedia = (() => ({})) as unknown as typeof window.matchMedia;
    fakeSystemTheme(false);
  });

  afterEach(() => {
    localStorage.removeItem(UI_THEME_STORAGE_KEY);
    vi.restoreAllMocks();
  });

  it('starts from a stored choice', () => {
    localStorage.setItem(UI_THEME_STORAGE_KEY, 'dark');
    const service = TestBed.inject(UiThemeService);
    expect(service.preference()).toBe('dark');
    expect(service.scheme()).toBe('dark');
  });

  it('ignores a stored value it does not know', () => {
    localStorage.setItem(UI_THEME_STORAGE_KEY, 'sepia');
    expect(TestBed.inject(UiThemeService).preference()).toBe('system');
  });

  it('sets html.dark and color-scheme, and stores the choice', () => {
    const service = TestBed.inject(UiThemeService);
    service.set('dark');
    TestBed.tick();
    expect(root.classList.contains('dark')).toBe(true);
    expect(root.style.colorScheme).toBe('dark');
    expect(localStorage.getItem(UI_THEME_STORAGE_KEY)).toBe('dark');

    service.set('light');
    TestBed.tick();
    expect(root.classList.contains('dark')).toBe(false);
    expect(root.style.colorScheme).toBe('light');
  });

  it('follows the system theme under "system", live', () => {
    const system = fakeSystemTheme(true);
    const service = TestBed.inject(UiThemeService);
    expect(service.preference()).toBe('system');
    expect(service.scheme()).toBe('dark');
    system.change(false);
    expect(service.scheme()).toBe('light');
    service.set('dark');
    system.change(false);
    expect(service.scheme()).toBe('dark');
  });

  it('keeps working when storage is blocked', () => {
    vi.spyOn(Storage.prototype, 'getItem').mockImplementation(() => {
      throw new Error('blocked');
    });
    vi.spyOn(Storage.prototype, 'setItem').mockImplementation(() => {
      throw new Error('blocked');
    });
    const service = TestBed.inject(UiThemeService);
    expect(service.preference()).toBe('system');
    expect(() => service.set('dark')).not.toThrow();
    expect(service.scheme()).toBe('dark');
  });

  it('points the theme-color meta at the --background token', () => {
    root.style.setProperty('--background', '240 10% 3.9%');
    TestBed.inject(UiThemeService).set('dark');
    TestBed.tick();
    const meta = document.querySelector<HTMLMetaElement>('meta[name="theme-color"]');
    expect(meta?.content).toBe('hsl(240 10% 3.9%)');
    root.style.removeProperty('--background');
  });
});
