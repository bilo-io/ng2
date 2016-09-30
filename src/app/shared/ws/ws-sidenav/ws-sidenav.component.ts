import { Component, Inject } from '@angular/core';
import { WsSidenavService } from './ws-sidenav.service';
import { AppService } from '../../../app.service';
import { WsItem } from '../ws.models';

interface INavItem {
    name: string;
    iconName: string;
    routerLink: string;
}
class NavItem implements INavItem {
    constructor(
        public name: string,
        public iconName: string,
        public routerLink: string) { }
}

@Component({
    moduleId: module.id,
    selector: 'ws-sidenav',
    templateUrl: 'ws-sidenav.component.html',
    styleUrls: [
        'ws-sidenav.component.css',
        '../../../app.style.css'
    ]
})
export class WsSidenavComponent {
    private items: NavItem[] = [];
    private activeItem: NavItem; 
    constructor(
        @Inject(WsSidenavService) public sidenav: WsSidenavService,
        @Inject(AppService) public app: AppService) {
        this.initMenuItems();
    }

    initMenuItems() {
        this.items.push(new NavItem('Home', 'home', '/home'));
        this.items.push(new NavItem('Map Demo', 'map', '/map'));
        this.items.push(new NavItem('Ws Components', '', '/ws'))
        this.activeItem = this.items[0];
    }
    selectItem(item: NavItem) {
        this.activeItem = item;
        // this.app.setState(item.name);
    }
}