import { Component } from '@angular/core';
import { WsLoaderComponent } from '../../ws/components';
import template from './loader-demo.component.html!text';
import style from './loader-demo.component.css!text';
import wsDemoStyle from '../ws-demo.component.css!text';

@Component({
    selector: 'loader-demo',
    template,
    styles: [ style, wsDemoStyle ]
})
export class LoaderDemoComponent {
    constructor() { }
}
