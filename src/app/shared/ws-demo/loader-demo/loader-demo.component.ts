import { Component } from '@angular/core';
import { WsLoaderComponent } from '../../ws/ws-loader/ws-loader.component';

@Component({
    moduleId: module.id,
    selector: 'loader-demo',
    templateUrl: 'loader-demo.component.html',
    styleUrls: [
        'loader-demo.component.css',
        '../ws-demo.component.css'
    ]
})
export class LoaderDemoComponent {
    constructor() { }
}
