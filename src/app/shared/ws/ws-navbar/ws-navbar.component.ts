import { Component, Inject, Window, provide } from '@angular/core';
import { WsSidenavComponent } from '../ws-sidenav/ws-sidenav.component';
import { WsSidenavService } from '../ws-sidenav/ws-sidenav.service';
import { WsSelectComponent, WsSelectItem } from '../ws-select/ws-select.component';
import { AppService } from '../../../app.service';

@Component({
    moduleId: module.id,
    selector: 'ws-navbar',
    templateUrl: 'ws-navbar.component.html',
    styleUrls: [
        'ws-navbar.component.css',
        '../../../app.style.css'
    ]
})
export class WsNavbarComponent {
    public settings;
    public showingEnvDetails: boolean = false;
    public showingDownloadDetails: boolean = false;
    public showingCustomEnvDetails: boolean = false;
    public isElectron: boolean = true;
    public mapStyles: WsSelectItem[] = [];
    public environments: WsSelectItem[] = [];

    constructor(
        @Inject(AppService) public app: AppService,
        @Inject(WsSidenavService) public sidenav: WsSidenavService) {
        this.initAppService();
    }

    initAppService() {
        this.app.map.styles.forEach((style) => {
            this.mapStyles.push(new WsSelectItem(style, style, true));
        });
        let mapStyle: string = localStorage.getItem('wingman-map-style');
        this.isElectron = window.nodeRequire;
        this.initEnvironments();
    }

    private initEnvironments() {
        this.environments = [
            new WsSelectItem('Production', 'PROD', true),
            new WsSelectItem('Test', 'TEST', true),
            new WsSelectItem('Development', 'DEV', true),
            new WsSelectItem('Local', 'LOCAL', true),
            new WsSelectItem('Custom', 'CUSTOM', true)
        ];
    }

    exit() {
        // Electron
        window.close();
    }

    setMapStyle(items: WsSelectItem[]) {
        localStorage.setItem('wingman-map-style', items[0].name);
        this.app.map.updateStyle$.emit(items[0].name);
    }

    setEnvironment(environment: WsSelectItem[]) {
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
