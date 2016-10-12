import { Component, Input, Output, EventEmitter } from
'@angular/core';
import { WsItem } from '../models'; 

// export class WsSelectItem {
//     constructor(
//         public name: string,
//         public value: string,
//         public isActive: boolean
//     ) { }
// }
@Component({
    moduleId: module.id,
    selector: 'ws-select',
    templateUrl: 'ws-select.component.html',
    styleUrls: [
        'ws-select.component.css',
        '../scss/ws.css'
    ]
})
export class WsSelectComponent {
    // Inputs
    @Input() wsName: string;
    @Input() wsItems: WsItem[];
    @Input() wsMultiple: boolean = false;
    @Input() wsRememberState: boolean = false;
    @Input() wsDefaultItem: WsItem;
    @Input() wsHint: string;
    @Input() wsColTitle: string = '#00ADEE';
    @Input() wsColText: string = 'white';
    @Input() wsColBack: string = 'transparent';
    // Outputs
    @Output() wsChanged$: EventEmitter<WsItem[]> = new EventEmitter<WsItem[]>();
    @Output() wsItemChanged$: EventEmitter<WsItem> = new EventEmitter<WsItem>();
    @Output() wsItemsChanged$: EventEmitter<WsItem[]> = new EventEmitter<WsItem[]>();
    // Fields
    public displayText: string = '';
    public selectedItem: WsItem;
    public showingList: boolean = false;

    constructor() {
    }

    ngAfterContentInit() {
        this.initDisplayText();
    }

    initDisplayText() {
        // Use the hint text        
        if (this.wsHint && this.wsHint.length > 0) {
            this.displayText = this.wsHint;
        }

        // Multiple Select List
        if (this.wsMultiple) {
            this.updateDisplayText();
            return;
        }

        // Single Select List
        if (!this.wsHint && this.wsItems.length > 0) {
            this.displayText = this.wsItems[0].name;
            return;
        }

        if (this.wsHint && this.wsHint.length > 0) {
            this.displayText = this.wsHint;
            return;
        }

        // Nothing was set... tell the user
        this.displayText = 'set [wsHint]="\'text\'" on <ws-select>';
    }

    getItemName(obj: WsItem) {
        if (obj) {
            if (obj.name) {
                return obj.name;
            }
            // return 'obj.name is null';
        }
        // return 'obj is null';
    }

    public updateItem(item: WsItem) {
        console.log('updateItem():', item);
        this.wsChanged$.emit([this.selectedItem = item]);
        this.wsItemChanged$.emit(this.selectedItem = item);
    }

    setItem(item: WsItem): void {
        this.selectedItem = item;
        this.showingList = false;
        this.displayText = item.name;
        console.log(this.selectedItem);
        this.wsChanged$.emit([this.selectedItem]);
        this.wsItemChanged$.emit(this.selectedItem);
    }

    toggleItem(item: WsItem): void {
        this.updateDisplayText();
        let activeItems: WsItem[] = [];
        this.wsItems.forEach((item) => {
            if (item.isActive) {
                activeItems.push(item);
            }
        })
        this.wsChanged$.emit(activeItems);
    }

    toggleList(): void {
        this.showingList = !this.showingList;
    }

    updateDisplayText(): void {
        this.displayText = '';
        this.wsItems.forEach((item) => {
            if (item.isActive) {
                this.displayText += '' + item.name + ', ';
            }
        });
        this.displayText = this.displayText.slice(0, -2);
        if (this.displayText.length == 0) {
            this.displayText = this.wsHint ? this.wsHint : 'set [wsHint]="\'text\'" on <ws-select>';
        }
    }

    ngOnChanges(changes) {
        if (this.wsMultiple) {
            this.updateDisplayText();
        }
    }
}