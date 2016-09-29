import { Component, Inject } from '@angular/core';
import { SidenavService } from './sidenav.service';
import { AppService } from '../../../app.service';

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
    selector: 'sidenav',
    templateUrl: 'sidenav.component.html',
    styleUrls: [
        'sidenav.component.css',
        '../../../app.style.css'
    ]
})
export class SidenavComponent {
    private items: NavItem[] = [];
    private activeItem: NavItem; 
    constructor(
        @Inject(SidenavService) public sidenav: SidenavService,
        @Inject(AppService) public app: AppService) {
        this.initMenuItems();
    }

    initMenuItems() {
        this.items.push(new NavItem('Map', 'timeline', '/component-1'));
        this.items.push(new NavItem('About', 'language', '/component-2'));
        this.items.push(new NavItem('Ws Components', '', '/ws-demo'))
        this.activeItem = this.items[0];
    }
    selectItem(item: NavItem) {
        this.activeItem = item;
        // this.app.setState(item.name);
    }
}