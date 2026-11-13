import { DOCUMENT, Injectable, computed, effect, inject, signal } from '@angular/core';

export type UiScheme = 'light' | 'dark';
export type UiThemePreference = 'system' | UiScheme;

export const UI_THEME_STORAGE_KEY = 'ws-ui-theme';
const ORDER: UiThemePreference[] = ['system', 'light', 'dark'];

/** The app's light/dark theme: the OS preference unless the user picks one. */
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
      const root = this.document.documentElement;
      root.dataset['theme'] = this.scheme();
      root.style.colorScheme = this.scheme();
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

  /** system → light → dark → system */
  cycle(): void {
    this.set(ORDER[(ORDER.indexOf(this.preference()) + 1) % ORDER.length]);
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
