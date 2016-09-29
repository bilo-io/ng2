import { Component } from '@angular/core';

@Component({
  selector: 'app',
  template: `
    <ws-navbar></ws-navbar>
    <router-outlet></router-outlet>
    `
})
export class AppComponent { }
