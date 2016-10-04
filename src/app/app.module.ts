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
import { MapComponent } from './components/map/map.component';
import { HomeComponent } from './components/home/home.component';
// App Services
import { AppService } from './app.service';
import { GeocoderService } from './shared/services/geocoder.service';
import { ApiService } from './api/api.service';
import { TapiService } from './api/tapi/tapi.service';

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
        MapComponent,
        HomeComponent,
    ],
    providers: [
        AppService,
        ApiService,
        GeocoderService,
        TapiService
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }