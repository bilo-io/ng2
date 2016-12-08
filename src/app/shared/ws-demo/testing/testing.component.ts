import { Component } from '@angular/core';
import { WsSwitchComponent } from '../../ws/components';
import { Mode } from '../../../api/tapi/tapi.models';
import template from './testing.component.html!text';
import style from './testing.component.css!text';
import wsDemoStyle from '../ws-demo.component.css!text';

@Component({
    selector: 'testing',
    template,
    styles: [ style, wsDemoStyle ]
})
export class TestingComponent {

    constructor() {        
    }

    ngOnInit() {
    }    
}