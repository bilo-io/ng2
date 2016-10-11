import { Component } from '@angular/core';
import { PrincipalService } from '../../api/principal.service';

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
    constructor() {}
}
