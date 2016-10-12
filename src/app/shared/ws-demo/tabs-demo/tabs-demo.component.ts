import { Component } from '@angular/core';
import { WsItem } from '../../ws/models';
import { WsTabsComponent } from '../../ws/components';

@Component({
    moduleId: module.id,
    selector: 'tabs-demo',
    templateUrl: 'tabs-demo.component.html',
    styleUrls: [
        'tabs-demo.component.css',
        '../ws-demo.component.css'
    ]
})
export class TabsDemoComponent {
    public tabs: WsItem[] = [];
    public selectedTab: number;

    constructor() {
        this.tabs = [
            new WsItem('Tab1', 0, undefined, true),
            new WsItem('Tab2', 1, undefined, false),
            new WsItem('Tab3', 2, undefined, false),
        ];
        this.switchTab(this.tabs[0]);
    }
    
    public switchTab(newTab:WsItem) {
        this.selectedTab = newTab.value;
        console.log('Selected tab: ' + this.selectedTab);
    }
}
