import { Component } from '@angular/core';
import { WsTabsComponent } from '../../ws/ws-tabs/ws-tabs.component';
import { WsItem } from '../../ws/ws.models';

@Component({
    moduleId: module.id,
    selector: 'tabs-demo',
    templateUrl: 'tabs-demo.component.html',
    styleUrls: ['tabs-demo.component.css'],
    directives: [
        WsTabsComponent
    ]
})
export class TabsDemoComponent {
    public tabs: WsItem[] = [];
    public selectedTab: string;

    constructor() {
        this.tabs = [
            new WsItem('Tab1', 0, undefined, true),
            new WsItem('Tab2', 1, undefined, false),
            new WsItem('Tab3', 2, undefined, false),
        ];
    }
    
    switchTab(newTab:WsItem) {
        this.selectedTab = newTab.name;
    }
}
