import { Component, Inject } from '@angular/core';
import { WsListComponent } from '../../shared/ws/ws-list/ws-list.component';
import { WsItem } from '../../shared/ws/ws.models';
import { AppService } from './../../app.service';

@Component({
    moduleId: module.id,
    selector: 'ws-demo',
    templateUrl: 'ws-demo.component.html',
    styleUrls: [
        'ws-demo.component.css',
        '../../shared/ws/scss/ws.css'
    ]
})
export class WsDemoComponent {
    public demoState: string = 'select';
    public demoItems: WsItem[] = [];
    constructor(@Inject(AppService) public app: AppService) {
        // this.app.setState('ws-demo');
        this.demoItems = [
            new WsItem('Overview', 'overview'),
            new WsItem('Autocomplete', 'autocomplete'),
            new WsItem('BBox', 'bbox'),
            new WsItem('DateTime', 'datetime'),
            new WsItem('Input', 'input'),
            new WsItem('Loader', 'loader'),
            new WsItem('Modal', 'modal'),
            new WsItem('Point', 'point'),
            new WsItem('Select', 'select'),
            new WsItem('Tabs', 'tabs'),
            new WsItem('Testing', 'testing'),
            new WsItem('Toast', 'toast')
        ];
    }

    changeDemoItem(item: WsItem) {
        console.log(item);
        this.demoState = item.value;
    }
}
