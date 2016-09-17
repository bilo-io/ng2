import { Component, Input } from '@angular/core';
import { WsLoaderComponent } from '../ws-loader/ws-loader.component';

@Component({
    moduleId: module.id,
    selector: 'ws-loader-label',
    templateUrl: 'ws-loader-label.component.html',
    styleUrls: ['ws-loader-label.component.css'],
    directives: [
        WsLoaderComponent
    ]
})
export class WsLoaderLabelComponent {
    @Input() public wsText: string = 'ws-loader-label component';
    constructor() {}
}
