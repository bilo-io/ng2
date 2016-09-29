import { Component, Inject, Window, provide } from '@angular/core';
import { SidenavComponent } from '../ws-sidenav/sidenav.component';
import { SidenavService } from '../ws-sidenav/sidenav.service';
import { WsSelectComponent, WsSelectItem } from '../ws-select/ws-select.component';
import { AppService } from '../../../app.service';

@Component({
    moduleId: module.id,
    selector: 'navbar',
    templateUrl: 'navbar.component.html',
    styleUrls: [
        'navbar.component.css',
        '../../../app.style.css'
    ]
})
export class NavbarComponent {
    public settings;
    public showingEnvDetails: boolean = false;
    public showingDownloadDetails: boolean = false;
    public showingCustomEnvDetails: boolean = false;
    public isElectron: boolean = true;
    public mapStyles: WsSelectItem[] = [];
    public environments: WsSelectItem[] = [];

    constructor(
        @Inject(AppService) public app: AppService,
        @Inject(SidenavService) public sidenav: SidenavService) {
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
