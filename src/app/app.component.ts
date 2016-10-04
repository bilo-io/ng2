import { Component, Inject } from '@angular/core';
import { AppService } from './app.service';
import { WsItem } from './shared/ws/ws.models';

@Component({
  selector: 'app',
  template: `
    <ws-navbar [wsSidenavItems]="sidenavItems"></ws-navbar>
    <router-outlet></router-outlet>
    `
})
export class AppComponent {
  public sidenavItems: WsItem[] = [];
  constructor( @Inject(AppService) private app: AppService) {
    this.sidenavItems = [
      new WsItem('Home', '/home'),
      new WsItem('Map', '/map'),
      new WsItem('Ws Components', '/ws')
    ];
  }
}
