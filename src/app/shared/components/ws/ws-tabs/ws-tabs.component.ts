import { Component, Input, Output, EventEmitter } from '@angular/core';
import { NgClass } from '@angular/common';
import { WsItem } from '../ws.models.ts';

@Component({
    moduleId: module.id,
    selector: 'ws-tabs',
    templateUrl: 'ws-tabs.component.html',
    styleUrls: ['ws-tabs.component.css'],
    directives: [
        NgClass
    ]
})
export class WsTabsComponent {
    @Input() tabs: WsItem[] = [];
    @Output() wsChanged$: EventEmitter<any> = new EventEmitter<any>();

    constructor() {
    }

    activateTab(selectedTab:WsItem) {
        this.tabs.map((tab: WsItem) => {
            tab.isActive = false;
        });
        selectedTab.isActive = true;
        this.wsChanged$.emit(selectedTab);
    }
}
