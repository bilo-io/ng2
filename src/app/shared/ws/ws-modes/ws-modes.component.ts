import { Component, Input, Output, EventEmitter } from '@angular/core';
import { NgClass } from '@angular/common';
import template from './ws-modes.component.html!text';
import style from './ws-modes.component.css!text';
import wsStyle from '../scss/ws.css!text';

export class WsModeItem {
    constructor(
        public name: string,
        public iconName: string,
        public isActive: boolean,
        public color: string) { }
}
@Component({
    selector: 'ws-modes',
    template,
    styles: [ style, wsStyle ]
})
export class WsModesComponent {
    @Input() wsName: string = 'Modes';
    @Input() wsItems: WsModeItem[] = [];
    @Input() onColor: string = '#00ADEE';
    @Input() offColor: string = 'grey';
    @Output() wsChanged$: EventEmitter<WsModeItem[]> = new EventEmitter<WsModeItem[]>();
    
    public showingList: boolean = false;

    constructor() { 
    }

    ngOnInit() {
        this.wsItems.forEach((item) => {
            if (item.isActive) {
                item.color = this.onColor;
            } else {
                item.color = this.offColor;
            }
        });
    }

    toggleMode(i: number) {
        this.wsItems[i].isActive = !this.wsItems[i].isActive;
        let activeModes: WsModeItem[] = [];

        this.wsItems.forEach((item) => {
            if (item.isActive) {
                item.color = this.onColor;
                activeModes.push(item);
            } else {
                item.color = this.offColor;
            }
        });
        console.log({activeModes});
        this.wsChanged$.emit(activeModes);
    }

    toggleList() {
        this.showingList = !this.showingList;
        console.log('Toggle Modes');
    }
}
