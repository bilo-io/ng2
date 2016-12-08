import { Component, Input, Output, EventEmitter } from '@angular/core';
import { NgClass } from '@angular/common';
import { WsItem } from '../models';
import template from './ws-tabs.component.html!text';
import style from './ws-tabs.component.css!text';
import wsStyle from '../scss/ws.css!text';
@Component({
    selector: 'ws-tabs',
    template,
    styles: [ style, wsStyle ]
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
