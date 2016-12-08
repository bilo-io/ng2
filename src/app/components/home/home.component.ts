import { Component, Inject } from '@angular/core';
import { PrincipalService } from '../../api/principal.service';
import { WsPoint } from '../../shared/ws/models';
import template from './home.component.html!text';
import style from './home.component.css!text';
import wsStyle from '../../shared/ws/scss/ws.css!text';

@Component({
    selector: 'home',
    template,
    styles: [ style, wsStyle ]
})
export class HomeComponent {
    constructor( @Inject(PrincipalService) private principal: PrincipalService) {
    }

    ngOnInit() {
    }   
}
