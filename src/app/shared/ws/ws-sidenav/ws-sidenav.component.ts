import { Component, Inject, Input } from '@angular/core';
import { Router } from '@angular/router';
import { WsSidenavService } from './ws-sidenav.service';
import { AppService } from '../../../app.service';
import { WsItem } from '../models';
import template from './ws-sidenav.component.html!text';
import style from './ws-sidenav.component.css!text';
import wsStyle from '../scss/ws.css!text';

@Component({
    selector: 'ws-sidenav',
    template,
    styles: [ style, wsStyle ]
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