import { Component } from '@angular/core';
import template from './card-demo.component.html!text';
import style from './card-demo.component.css!text';
import wsDemoStyle from '../ws-demo.component.css!text';

@Component({
    selector: 'card-demo',
    template,
    styles: [ style, wsDemoStyle ]
})
export class CardDemoComponent {
    constructor() { }
}
