import { NgModule }      from '@angular/core';
import { Http, HttpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
// Ws Component Library
import { WsModule } from './shared/ws/ws.module';
import { WsDemoModule } from './shared/ws-demo/ws-demo.module';
// App Router
import { routing } from './app.routing';
// App Components
import { AppComponent }   from './app.component';
import { Component1 } from './components/component-1/component-1.component';
import { Component2 } from './components/component-2/component-2.component';
// App Services
import { AppService } from './app.service';
import { GeocoderService } from './shared/services/geocoder.service';

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        WsModule,
        WsDemoModule,
        routing
    ],
    declarations: [
        AppComponent,
        Component1,
        Component2,
    ],
    providers: [
        AppService,
        GeocoderService,
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }