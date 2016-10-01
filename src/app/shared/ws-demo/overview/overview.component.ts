import { Component } from '@angular/core';
import { WsItem } from '../../ws/ws.models';

@Component({
    moduleId: module.id,
    selector: 'overview',
    templateUrl: 'overview.component.html',
    styleUrls: [
        'overview.component.css',
        '../ws-demo.component.css'
    ]
})
export class OverviewComponent {
    private geojsonTab: string = '';
    private geojsonTabs: WsItem[] = [];

    constructor() { 
        this.geojsonTabs = [
            new WsItem('Point', '', '', true),
            new WsItem('Bounding Box'),
        ];
        this.switchGeojsonTab(this.geojsonTabs[0]);
    }

    public switchGeojsonTab(tab: WsItem) {
        this.geojsonTab = tab.name;
    }
}
