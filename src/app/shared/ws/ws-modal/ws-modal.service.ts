import { Injectable, signal } from '@angular/core';

export interface WsModalContent {
  title: string;
  message: string;
  dismissButton: string;
  confirmButton?: string;
}

/** Opens <ws-modal>. `show` resolves true on confirm, false on dismiss. */
@Injectable({ providedIn: 'root' })
export class WsModalService {
  readonly content = signal<WsModalContent | null>(null);
  private resolve?: (confirmed: boolean) => void;

  show(content: WsModalContent): Promise<boolean> {
    this.resolve?.(false);
    this.content.set(content);
    return new Promise((resolve) => (this.resolve = resolve));
  }

  close(confirmed: boolean): void {
    this.content.set(null);
    this.resolve?.(confirmed);
    this.resolve = undefined;
  }
}
