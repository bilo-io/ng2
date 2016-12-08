import { Component, Inject } from '@angular/core';
import { WsListComponent } from '../../shared/ws/ws-list/ws-list.component';
import { WsItem } from '../../shared/ws/models';
import { AppService } from './../../app.service';
import template from './ws-demo.component.html!text';
import style from './ws-demo.component.css!text';

@Component({
    selector: 'ws-demo',
    template, 
    styles: [ style ]
})
export class WsDemoComponent {
    public demoState: string = 'overview';
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
