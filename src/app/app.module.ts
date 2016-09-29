import { NgModule }      from '@angular/core';
import { Http, HttpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { routing } from './app.routing';
// Shared Components
import { NavbarComponent } from './shared/ws/ws-navbar/navbar.component';
import { MapComponent } from './shared/ws/ws-map/map.component';
import { SidenavComponent } from './shared/ws/ws-sidenav/sidenav.component';
// Services
import { AppService } from './app.service';
import { GeocoderService } from './shared/services/geocoder.service';
import { MapService } from './shared/ws/ws-map/map.service';
import { SidenavService } from './shared/ws/ws-sidenav/sidenav.service';
// Ws
import { WsModule } from './shared/ws/ws.module';
import { WsAutocompleteComponent } from './shared/ws/ws-autocomplete/ws-autocomplete.component';
import { WsBBoxComponent } from './shared/ws/ws-bbox/ws-bbox.component';
import { WsCheckboxComponent } from './shared/ws/ws-checkbox/ws-checkbox.component';
import { WsDateTimeComponent } from './shared/ws/ws-datetime/ws-datetime.component';
import { WsListComponent } from './shared/ws/ws-list/ws-list.component';
import { WsLoaderComponent } from './shared/ws/ws-loader/ws-loader.component';
import { WsLoaderLabelComponent } from './shared/ws/ws-loader-label/ws-loader-label.component';
import { WsModalComponent } from './shared/ws/ws-modal/ws-modal.component';
import { WsModesComponent } from './shared/ws/ws-modes/ws-modes.component';
import { WsPointComponent } from './shared/ws/ws-point/ws-point.component';
import { WsSelectComponent } from './shared/ws/ws-select/ws-select.component';
import { WsSpinnerComponent } from './shared/ws/ws-spinner/ws-spinner.component';
import { WsSwitchComponent } from './shared/ws/ws-switch/ws-switch.component';
import { WsTabsComponent } from './shared/ws/ws-tabs/ws-tabs.component';
import { WsToastComponent } from './shared/ws/ws-toast/ws-toast.component';
import { WsToggleComponent } from './shared/ws/ws-toggle/ws-toggle.component';
// Services
import { WsToastService } from './shared/ws/ws-toast/ws-toast.service';
import { WsModalService } from './shared/ws/ws-modal/ws-modal.service';
// Ws demo
import { WsDemoComponent } from './components/ws-demo/ws-demo.component';
import { AutocompleteDemoComponent } from './components/ws-demo/autocomplete-demo/autocomplete-demo.component';
import { PointDemoComponent } from './components/ws-demo/point-demo/point-demo.component';
import { BBoxDemoComponent } from './components/ws-demo/bbox-demo/bbox-demo.component';
import { DateTimeDemoComponent } from './components/ws-demo/datetime-demo/datetime-demo.component';
import { SelectDemoComponent } from './components/ws-demo/select-demo/select-demo.component';
import { LoaderDemoComponent } from './components/ws-demo/loader-demo/loader-demo.component';
import { ModalDemoComponent } from './components/ws-demo/modal-demo/modal-demo.component';
import { TabsDemoComponent } from './components/ws-demo/tabs-demo/tabs-demo.component';
import { ToastDemoComponent } from './components/ws-demo/toast-demo/toast-demo.component';
import { TestingComponent } from './components/ws-demo/testing/testing.component';
// App Components
import { AppComponent }   from './app.component';
import { Component1 } from './components/component-1/component-1.component';
import { Component2 } from './components/component-2/component-2.component';

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        routing
    ],
    providers: [
        AppService,
        MapService,
        GeocoderService,
        SidenavService,
        WsToastService,
        WsModalService
    ],
    declarations: [
        AppComponent,
        NavbarComponent,
        SidenavComponent,
        MapComponent,
        Component1,
        Component2,
        WsDemoComponent,  
        // Ws demo
        AutocompleteDemoComponent,
        BBoxDemoComponent,
        DateTimeDemoComponent,
        ModalDemoComponent,
        LoaderDemoComponent,
        PointDemoComponent,
        SelectDemoComponent,
        TabsDemoComponent,
        ToastDemoComponent,
        TestingComponent,
        // Ws Components
        WsAutocompleteComponent,
        WsBBoxComponent,
        WsCheckboxComponent,
        WsDateTimeComponent,
        WsListComponent,
        WsLoaderComponent,
        WsLoaderLabelComponent,
        WsModalComponent,
        WsModesComponent,
        WsPointComponent,
        WsSelectComponent,
        WsSpinnerComponent,
        WsSwitchComponent,
        WsTabsComponent,
        WsToastComponent,
        WsToggleComponent
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }