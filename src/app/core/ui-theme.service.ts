import { DOCUMENT, Injectable, computed, effect, inject, signal } from '@angular/core';

export type UiScheme = 'light' | 'dark';
export type UiThemePreference = 'system' | UiScheme;

/** Read by the inline script in index.html too: keep the two in step. */
export const UI_THEME_STORAGE_KEY = 'ws-ui-theme';
export const UI_THEME_PREFERENCES: readonly UiThemePreference[] = ['light', 'dark', 'system'];

/**
 * The app's light/dark theme, applied as midnite-ui expects: the `dark` class on
 * `<html>` plus `color-scheme`. Follows the OS unless the user picks light or dark.
 */
@Injectable({ providedIn: 'root' })
export class UiThemeService {
  private readonly document = inject(DOCUMENT);
  private readonly media = this.document.defaultView?.matchMedia?.('(prefers-color-scheme: dark)');

  private readonly systemDark = signal(this.media?.matches ?? false);
  readonly preference = signal<UiThemePreference>(readPreference(this.document));
  readonly scheme = computed<UiScheme>(() => {
    const preference = this.preference();
    if (preference !== 'system') return preference;
    return this.systemDark() ? 'dark' : 'light';
  });

  constructor() {
    this.media?.addEventListener('change', (event) => this.systemDark.set(event.matches));
    effect(() => {
      const scheme = this.scheme();
      const root = this.document.documentElement;
      root.classList.toggle('dark', scheme === 'dark');
      root.style.colorScheme = scheme;
      this.syncThemeColor();
    });
  }

  set(preference: UiThemePreference): void {
    this.preference.set(preference);
    try {
      this.document.defaultView?.localStorage.setItem(UI_THEME_STORAGE_KEY, preference);
    } catch {
      // Storage can be blocked; the choice still holds for this visit.
    }
  }

  /** The browser chrome colour follows the `--background` token. */
  private syncThemeColor(): void {
    const root = this.document.documentElement;
    const background = this.document.defaultView
      ?.getComputedStyle(root)
      .getPropertyValue('--background')
      .trim();
    if (!background) return;
    let meta = this.document.querySelector<HTMLMetaElement>('meta[name="theme-color"]');
    if (!meta) {
      meta = this.document.createElement('meta');
      meta.name = 'theme-color';
      this.document.head.appendChild(meta);
    }
    meta.content = `hsl(${background})`;
  }
}

function readPreference(document: Document): UiThemePreference {
  try {
    const stored = document.defaultView?.localStorage.getItem(UI_THEME_STORAGE_KEY);
    return stored === 'light' || stored === 'dark' ? stored : 'system';
  } catch {
    return 'system';
  }
}
