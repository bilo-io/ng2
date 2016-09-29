import { Component, Input } from '@angular/core';
//http://projects.lukehaas.me/css-loaders/
@Component({
    moduleId: module.id,
    selector: 'ws-loader',
    templateUrl: 'ws-loader.component.html',
    styleUrls: [
        'ws-loader.component.css'
    ]
})
export class WsLoaderComponent {
    @Input() color: string;
    @Input() wsName: string = 'arc-stretch';
    constructor() {
    }
}