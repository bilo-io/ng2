import { Component, Inject } from '@angular/core';
import { PrincipalService } from '../../api/principal.service';
import { WsPoint } from '../../shared/ws';

@Component({
    moduleId: module.id,
    selector: 'home',
    templateUrl: 'home.component.html',
    styleUrls: [
        'home.component.css',
        '../../shared/ws/scss/ws.css'
    ]
})
export class HomeComponent {
    constructor( @Inject(PrincipalService) private principal: PrincipalService) {

    }
}
