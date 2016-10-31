import { NgModule }      from '@angular/core';
import { Http, HttpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
// Ws Component Library
import { WsModule } from './shared/ws/ws.module';
import { WsDemoModule } from './shared/ws-demo/ws-demo.module';
import { WsDemoComponent } from './shared/ws-demo/ws-demo.component';
// App Components
import { AppComponent }   from './app.component';
import { MapComponent } from './components/map/map.component';
import { HomeComponent } from './components/home/home.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
// App Services
import { AppService } from './app.service';
import { ApiService } from './api/api.service';
import { PrincipalService } from './api/principal.service';
import { GeocoderService } from './shared/services/geocoder.service';
import { TapiService } from './api/tapi/tapi.service';
// Routing
const appRoutes: Routes = [
    {
        path: '',
        children: [
            { path: '', component: HomeComponent },
            { path: 'ws', component: WsDemoComponent },
            { path: 'map', component: MapComponent },
            { path: 'home', component: HomeComponent },
            { path: '**', component: NotFoundComponent }
        ]
    }
];

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        RouterModule,
        RouterModule.forRoot(appRoutes),
        WsModule,
        WsDemoModule
    ],
    declarations: [
        AppComponent,
        MapComponent,
        HomeComponent,
        NotFoundComponent,
    ],
    providers: [
        AppService,
        ApiService,
        PrincipalService,
        GeocoderService,
        TapiService
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }