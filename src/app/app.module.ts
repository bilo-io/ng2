import { NgModule }      from '@angular/core';
import { Http, HttpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { routing } from './app.routing';
// Services
import { AppService } from './app.service';
import { GeocoderService } from './shared/services/geocoder.service';
// Ws Components
import { WsModule } from './shared/ws/ws.module';
// Ws Services
import { WsToastService } from './shared/ws/ws-toast/ws-toast.service';
import { WsModalService } from './shared/ws/ws-modal/ws-modal.service';
import { WsMapService } from './shared/ws/ws-map/ws-map.service';
import { WsSidenavService } from './shared/ws/ws-sidenav/ws-sidenav.service';
// Ws demo
import { WsDemoModule } from './shared/ws-demo/ws-demo.module';
// import { WsDemoComponent } from './shared/ws-demo/ws-demo.component';
// import { AutocompleteDemoComponent } from './shared/ws-demo/autocomplete-demo/autocomplete-demo.component';
// import { PointDemoComponent } from './shared/ws-demo/point-demo/point-demo.component';
// import { BBoxDemoComponent } from './shared/ws-demo/bbox-demo/bbox-demo.component';
// import { DateTimeDemoComponent } from './shared/ws-demo/datetime-demo/datetime-demo.component';
// import { SelectDemoComponent } from './shared/ws-demo/select-demo/select-demo.component';
// import { LoaderDemoComponent } from './shared/ws-demo/loader-demo/loader-demo.component';
// import { ModalDemoComponent } from './shared/ws-demo/modal-demo/modal-demo.component';
// import { TabsDemoComponent } from './shared/ws-demo/tabs-demo/tabs-demo.component';
// import { ToastDemoComponent } from './shared/ws-demo/toast-demo/toast-demo.component';
// import { TestingComponent } from './shared/ws-demo/testing/testing.component';
// App Components
import { AppComponent }   from './app.component';
import { Component1 } from './components/component-1/component-1.component';
import { Component2 } from './components/component-2/component-2.component';

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        WsModule,
        WsDemoModule,
        routing
    ],
    providers: [
        AppService,
        GeocoderService,
    ],
    declarations: [
        AppComponent,
        Component1,
        Component2,
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }