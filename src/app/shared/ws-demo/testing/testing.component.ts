import { Component } from '@angular/core';
import { WsSwitchComponent } from '../../ws/ws-switch/ws-switch.component';
import { Mode } from '../../../api/tapi/tapi.models';

@Component({
    moduleId: module.id,
    selector: 'testing',
    templateUrl: 'testing.component.html',
    styleUrls: [
        'testing.component.css',
        '../ws-demo.component.css'
    ]
})
export class TestingComponent {

    constructor() {        
    }

    ngOnInit() {
    }    
}