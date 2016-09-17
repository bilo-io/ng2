import { Component, Inject } from '@angular/core';
import { WsListComponent } from '../../shared/components/ws/ws-list/ws-list.component';
import { WsItem } from '../../shared/components/ws/ws.models';
import { AppService } from './../../app.service';
// Ws Demo Components
import { AutocompleteDemoComponent } from './autocomplete-demo/autocomplete-demo.component';
import { PointDemoComponent } from './point-demo/point-demo.component';
import { BBoxDemoComponent } from './bbox-demo/bbox-demo.component';
import { DateTimeDemoComponent } from './datetime-demo/datetime-demo.component';
import { SelectDemoComponent } from './select-demo/select-demo.component';
import { LoaderDemoComponent } from './loader-demo/loader-demo.component';
import { ModalDemoComponent } from './modal-demo/modal-demo.component';
import { TabsDemoComponent } from './tabs-demo/tabs-demo.component';
import { ToastDemoComponent } from './toast-demo/toast-demo.component';
import { TestingComponent } from './testing/testing.component';

@Component({
    moduleId: module.id,
    selector: 'ws-demo',
    templateUrl: 'ws-demo.component.html',
    styleUrls: [
        'ws-demo.component.css',
        '../../app.style.css',
        '../../shared/components/ws/ws.style.css'
    ]
})
export class WsDemoComponent {
    public demoState: string = 'autocomplete';
    public demoItems: WsItem[] = [];
    constructor(@Inject(AppService) public app: AppService) {
        // this.app.setState('ws-demo');
        this.demoItems = [
            new WsItem('Autocomplete', 'autocomplete', undefined),
            new WsItem('Point', 'point', undefined),
            new WsItem('BBox', 'bbox', undefined),
            new WsItem('DateTime', 'datetime', undefined),
            new WsItem('Select', 'select', undefined),
            new WsItem('Loader', 'loader', undefined),
            new WsItem('Modal', 'modal', undefined),
            new WsItem('Tabs', 'tabs', undefined),
            new WsItem('Toast', 'toast', undefined),
            new WsItem('Testing', 'testing', undefined)
        ];
    }

    changeDemoItem(item: WsItem) {
        console.log(item);
        this.demoState = item.value;
    }
}
