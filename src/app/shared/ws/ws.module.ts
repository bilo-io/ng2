import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
// Ws Components
import { WsAutocompleteComponent } from './ws-autocomplete/ws-autocomplete.component';
import { WsBBoxComponent } from './ws-bbox/ws-bbox.component';
import { WsCheckboxComponent } from './ws-checkbox/ws-checkbox.component';
import { WsDateTimeComponent } from './ws-datetime/ws-datetime.component';
import { WsListComponent } from './ws-list/ws-list.component';
import { WsLoaderComponent } from './ws-loader/ws-loader.component';
import { WsLoaderLabelComponent } from './ws-loader-label/ws-loader-label.component';
import { WsMapComponent } from './ws-map/ws-map.component';
import { WsModalComponent } from './ws-modal/ws-modal.component';
import { WsModesComponent } from './ws-modes/ws-modes.component';
import { WsNavbarComponent } from './ws-navbar/ws-navbar.component';
import { WsPointComponent } from './ws-point/ws-point.component';
import { WsSelectComponent } from './ws-select/ws-select.component';
import { WsSidenavComponent } from './ws-sidenav/ws-sidenav.component';
import { WsSpinnerComponent } from './ws-spinner/ws-spinner.component';
import { WsSwitchComponent } from './ws-switch/ws-switch.component';
import { WsTabsComponent } from './ws-tabs/ws-tabs.component';
import { WsToastComponent } from './ws-toast/ws-toast.component';
import { WsToggleComponent } from './ws-toggle/ws-toggle.component';
// Ws Services
import { WsToastService } from './ws-toast/ws-toast.service';
import { WsModalService } from './ws-modal/ws-modal.service';
import { WsMapService } from './ws-map/ws-map.service';
import { WsSidenavService } from './ws-sidenav/ws-sidenav.service';

@NgModule({
    imports: [
        FormsModule,
        BrowserModule,
        RouterModule
    ],
    providers: [
        WsMapService,
        WsSidenavService,
        WsToastService,
        WsModalService
    ],
    declarations: [
        WsAutocompleteComponent,
        WsBBoxComponent,
        WsCheckboxComponent,
        WsDateTimeComponent,
        WsListComponent,
        WsLoaderComponent,
        WsLoaderLabelComponent,
        WsMapComponent,
        WsModalComponent,
        WsModesComponent,
        WsNavbarComponent,
        WsPointComponent,
        WsSelectComponent,
        WsSidenavComponent,
        WsSpinnerComponent,
        WsSwitchComponent,
        WsTabsComponent,
        WsToastComponent,
        WsToggleComponent
    ],
    exports: [
        WsAutocompleteComponent,
        WsBBoxComponent,
        WsCheckboxComponent,
        WsDateTimeComponent,
        WsListComponent,
        WsLoaderComponent,
        WsLoaderLabelComponent,
        WsMapComponent,
        WsModalComponent,
        WsModesComponent,
        WsNavbarComponent,
        WsPointComponent,
        WsSelectComponent,
        WsSidenavComponent,
        WsSpinnerComponent,
        WsSwitchComponent,
        WsTabsComponent,
        WsToastComponent,
        WsToggleComponent
    ]
})
export class WsModule {
}