import { Component } from '@angular/core';
import { WsItem } from '../../ws/models';
import { WsSelectComponent } from '../../ws/components';
import template from './select-demo.component.html!text';
import style from './select-demo.component.css!text';
import wsDemoStyle from '../ws-demo.component.css!text';

@Component({
    selector: 'select-demo',
    template,
    styles: [ style, wsDemoStyle ]
})
export class SelectDemoComponent {
    public items: WsItem[] = [];
    public showCode1: boolean;
    public showCode2: boolean;
    public code1: string;
    public code2: string;

    constructor() {
        this.items = [
            new WsItem('Name1', 'Value1', '', false),
            new WsItem('Name2', 'Value2', '', false),
            new WsItem('Name3', 'Value3', '', false),
            new WsItem('Name4', 'Value4', '', false),
            new WsItem('Name5', 'Value5', '', false)
        ];

        this.showCode1 = false;
        this.showCode2 = false;

        this.code1 = `
<ws-select \n
    [wsName]="'Single'"
    [wsHint]="'Select an item'"
    [wsItems]="items"
    [wsColTitle]="'#00ADEE'"
    [wsColText]="'black'"
    [wsColBack]="'transparent'">
</ws-select>
        `;

        this.code2 = `
<ws-select
    [wsName]="'Multiple'"
    [wsHint]="'Select multiple items'"
    [wsItems]="items"
    [wsColTitle]="'#00ADEE'"
    [wsColText]="'black'"
    [wsColBack]="'transparent'"
    [wsMultiple]="true">
</ws-select>
        `;
    }
}
