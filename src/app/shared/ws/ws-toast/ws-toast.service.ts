import { Injectable, signal } from '@angular/core';

export type WsToastKind = 'default' | 'light' | 'dark' | 'success' | 'warning' | 'error';

export interface WsToast {
  id: number;
  message: string;
  kind: WsToastKind;
}

const DURATIONS: Record<WsToastKind, number> = {
  default: 3000,
  light: 3000,
  dark: 3000,
  success: 2000,
  warning: 5000,
  error: 5000,
};

/** Short messages that show in <ws-toast> and leave on their own. */
@Injectable({ providedIn: 'root' })
export class WsToastService {
  private nextId = 0;
  readonly toasts = signal<WsToast[]>([]);

  show(message: string, duration?: number): void {
    this.push(message, 'default', duration);
  }

  notify(message: string, light = false, duration?: number): void {
    this.push(message, light ? 'light' : 'dark', duration);
  }

  success(message: string, duration?: number): void {
    this.push(message, 'success', duration);
  }

  warning(message: string, duration?: number): void {
    this.push(message, 'warning', duration);
  }

  error(message: string, duration?: number): void {
    this.push(message, 'error', duration);
  }

  dismiss(id: number): void {
    this.toasts.update((toasts) => toasts.filter((toast) => toast.id !== id));
  }

  private push(message: string, kind: WsToastKind, duration = DURATIONS[kind]): void {
    const toast: WsToast = { id: this.nextId++, message, kind };
    this.toasts.update((toasts) => [...toasts, toast]);
    setTimeout(() => this.dismiss(toast.id), duration);
  }
}
