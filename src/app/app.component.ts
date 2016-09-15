import { Component } from '@angular/core';

@Component({
  selector: 'my-app',
  template: `
    <h1>Angular 2 Starter Application</h1>
    <a routerLink="/component1">Component 1</a>
    <br>
    <a routerLink="/component2">Component 2</a>
    <router-outlet></router-outlet>
    `
})
export class AppComponent { }


/*
Copyright 2016 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/