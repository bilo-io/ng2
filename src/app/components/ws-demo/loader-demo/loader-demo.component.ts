import { Component } from '@angular/core';
import { WsLoaderComponent } from '../../../shared/ws/ws-loader/ws-loader.component';

@Component({
    moduleId: module.id,
    selector: 'loader-demo',
    templateUrl: 'loader-demo.component.html',
    styleUrls: ['loader-demo.component.css'],
    directives: [
        WsLoaderComponent
    ]
})
export class LoaderDemoComponent {
    constructor() {}
}
