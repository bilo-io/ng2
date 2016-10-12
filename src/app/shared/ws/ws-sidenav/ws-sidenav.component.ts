import { Component, Inject, Input } from '@angular/core';
import { Router } from '@angular/router';
import { WsSidenavService } from './ws-sidenav.service';
import { AppService } from '../../../app.service';
import { WsItem } from '../models';

@Component({
    moduleId: module.id,
    selector: 'ws-sidenav',
    templateUrl: 'ws-sidenav.component.html',
    styleUrls: [
        'ws-sidenav.component.css',
        '../scss/ws.css'
    ]
})
export class WsSidenavComponent {
    @Input() private wsItems: WsItem[] = [];
    private activeItem: WsItem;
    constructor(
        @Inject(WsSidenavService) public sidenav: WsSidenavService,
        @Inject(Router) private router: Router) {
    }
    
    navigate(item: WsItem) {
        console.log(item);
        this.router.navigate([item.value]);
        this.sidenav.close();
    }
}