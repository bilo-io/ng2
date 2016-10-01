import { Component } from '@angular/core';
import { WsSelectComponent, WsSelectItem } from '../../ws/ws-select/ws-select.component';

@Component({
    moduleId: module.id,
    selector: 'select-demo',
    templateUrl: 'select-demo.component.html',
    styleUrls: [
        'select-demo.component.css',
        '../ws-demo.component.css'
    ]
})
export class SelectDemoComponent {
    public items: WsSelectItem[] = [];
    public showCode1: boolean;
    public showCode2: boolean;
    public code1: string;
    public code2: string;

    constructor() {
        this.items = [
            new WsSelectItem('Name1', 'Value1', false),
            new WsSelectItem('Name2', 'Value2', false),
            new WsSelectItem('Name3', 'Value3', false),
            new WsSelectItem('Name4', 'Value4', false),
            new WsSelectItem('Name5', 'Value5', false)
        ];

        this.showCode1 = false;
        this.showCode2 = false;

        this.code1 = `
<ws-select
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
