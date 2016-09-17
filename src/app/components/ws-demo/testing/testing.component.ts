import { Component } from '@angular/core';
import { WsSwitchComponent } from '../../../shared/components/ws/ws-switch/ws-switch.component';
import { Mode } from '../../../api/tapi/tapi.models';

@Component({
    moduleId: module.id,
    selector: 'testing',
    templateUrl: 'testing.component.html',
    styleUrls: [
        'testing.component.css'
    ]
})
export class TestingComponent {

    constructor() {        
    }

    ngOnInit() {
    }    
}