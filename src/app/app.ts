import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import type { WsItem } from './shared/ws/ws-item';
import { WsModal } from './shared/ws/ws-modal/ws-modal';
import { WsNavbar } from './shared/ws/ws-navbar/ws-navbar';
import { WsToastHost } from './shared/ws/ws-toast/ws-toast';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, WsNavbar, WsToastHost, WsModal],
  template: `
    <ws-navbar title="ng2" [items]="links" />
    <main>
      <router-outlet />
    </main>
    <ws-toast />
    <ws-modal />
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class App {
  protected readonly links: WsItem[] = [
    { name: 'Home', value: '/' },
    { name: 'Map', value: '/map' },
    { name: 'Ws components', value: '/ws' },
  ];
}
