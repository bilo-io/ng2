import { Component, Inject } from '@angular/core';
import { WsSidenavService } from '../ws-sidenav/ws-sidenav.service';
import { WsSidenavComponent } from '../ws-sidenav/ws-sidenav.component';
import { WsSelectComponent } from '../ws-select/ws-select.component';
import { WsItem } from './../ws.models';
import { AppService } from '../../../app.service';

@Component({
    moduleId: module.id,
    selector: 'ws-navbar',
    templateUrl: 'ws-navbar.component.html',
    styleUrls: [
        'ws-navbar.component.css',
        '../scss/ws.css'
    ]
})
export class WsNavbarComponent {
    public settings;
    public showingEnvDetails: boolean = false;
    public showingDownloadDetails: boolean = false;
    public showingCustomEnvDetails: boolean = false;
    public isElectron: boolean = true;
    public mapStyles: WsItem[] = [];
    public environments: WsItem[] = [];
    private sidenavItems: WsItem[] = [];

    constructor(
        @Inject(AppService) public app: AppService,
        @Inject(WsSidenavService) public sidenav: WsSidenavService) {
        this.initAppService();
        this.initSidenavItems();
    }

    initSidenavItems() {
        this.sidenavItems.push(new WsItem('Home', '/home'));
        this.sidenavItems.push(new WsItem('Map Demo', '/map'));
        this.sidenavItems.push(new WsItem('Ws Components', '/ws'));
    }

    initAppService() {
        this.app.map.styles.forEach((style) => {
            this.mapStyles.push(new WsItem(style, style, '', true));
        });
        let mapStyle: string = localStorage.getItem('wingman-map-style');
        this.isElectron = window.nodeRequire;
        this.initEnvironments();
    }

    private initEnvironments() {
        this.environments = [
            new WsItem('Production', 'PROD', true),
            new WsItem('Test', 'TEST', true),
            new WsItem('Development', 'DEV', true),
            new WsItem('Local', 'LOCAL', true),
            new WsItem('Custom', 'CUSTOM', true)
        ];
    }

    exit() {
        // Electron
        window.close();
    }

    setMapStyle(items: WsItem[]) {
        localStorage.setItem('wingman-map-style', items[0].name);
        this.app.map.updateStyle$.emit(items[0].name);
    }

    setEnvironment(environment: WsItem[]) {
        let env = environment[0];
    }

    toggleEnvDetails() {
        this.showingEnvDetails = !this.showingEnvDetails;
        if (this.showingCustomEnvDetails) {
            this.showingCustomEnvDetails = false;
            this.showingDownloadDetails = false;
        }
    }

    toggleDownloadDetails() {
        this.showingDownloadDetails = !this.showingDownloadDetails;
        if (this.showingDownloadDetails) {
            this.showingEnvDetails = false;
            this.showingCustomEnvDetails = false;
        }
    }

    toggleCustomEnvDetails() {
        this.showingCustomEnvDetails = !this.showingCustomEnvDetails;
        if (this.showingCustomEnvDetails) {
            this.showingEnvDetails = false;
            this.showingDownloadDetails = false;
        }
    }
}
