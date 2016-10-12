import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
// Ws Services
import { WsToastService } from './ws-toast/ws-toast.service';
import { WsModalService } from './ws-modal/ws-modal.service';
import { WsMapService } from './ws-map/ws-map.service';
import { WsSidenavService } from './ws-sidenav/ws-sidenav.service';
// Ws Components
import { WsAutocompleteComponent } from './ws-autocomplete/ws-autocomplete.component';
import { WsBBoxComponent } from './ws-bbox/ws-bbox.component';
import { WsCheckboxComponent } from './ws-checkbox/ws-checkbox.component';
import { WsDateTimeComponent } from './ws-datetime/ws-datetime.component';
import { WsListComponent } from './ws-list/ws-list.component';
import { WsInputComponent } from './ws-input/ws-input.component';
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

export const WsServices = [
    WsToastService,
    WsModalService,
    WsMapService,
    WsSidenavService
];
export const WsComponents = [
    WsAutocompleteComponent,
    WsBBoxComponent,
    WsCheckboxComponent,
    WsDateTimeComponent,
    WsInputComponent,
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
];
@NgModule({
    imports: [
        FormsModule,
        BrowserModule,
        RouterModule
    ],
    providers: [
        ...WsServices
    ],
    declarations: [
        ...WsComponents
    ],
    exports: [
        ...WsComponents
    ]
})
export class WsModule {
}

export * from './models';
// Services
export * from './ws-toast/ws-toast.service';
export * from './ws-map/ws-map.service';
export * from './ws-sidenav/ws-sidenav.service';
// export * from './ws-modal/ws-modal.service';
// Components
export { WsAutocompleteComponent } from './ws-autocomplete/ws-autocomplete.component';
export { WsBBoxComponent } from './ws-bbox/ws-bbox.component';
export { WsCheckboxComponent } from './ws-checkbox/ws-checkbox.component';
export { WsDateTimeComponent } from './ws-datetime/ws-datetime.component';
export { WsListComponent } from './ws-list/ws-list.component';
export { WsInputComponent } from './ws-input/ws-input.component';
export { WsLoaderComponent } from './ws-loader/ws-loader.component';
export { WsLoaderLabelComponent } from './ws-loader-label/ws-loader-label.component';
export { WsMapComponent } from './ws-map/ws-map.component';
export { WsModalComponent } from './ws-modal/ws-modal.component';
export { WsModesComponent } from './ws-modes/ws-modes.component';
export { WsNavbarComponent } from './ws-navbar/ws-navbar.component';
export { WsPointComponent } from './ws-point/ws-point.component';
export { WsSelectComponent } from './ws-select/ws-select.component';
export { WsSidenavComponent } from './ws-sidenav/ws-sidenav.component';
export { WsSpinnerComponent } from './ws-spinner/ws-spinner.component';
export { WsSwitchComponent } from './ws-switch/ws-switch.component';
export { WsTabsComponent } from './ws-tabs/ws-tabs.component';
export { WsToastComponent } from './ws-toast/ws-toast.component';
export { WsToggleComponent } from './ws-toggle/ws-toggle.component';