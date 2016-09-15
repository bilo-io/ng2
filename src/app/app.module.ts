import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { routing } from './app.routing';

import { AppComponent }   from './app.component';
import { Component1 } from './components/component-1/component-1.component';
import { Component2 } from './components/component-2/component-2.component';

@NgModule({
    imports: [
        BrowserModule,
        routing
    ],
    declarations: [
        AppComponent,
        Component1,
        Component2
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }