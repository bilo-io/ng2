import { Point } from '../../models/geojson.models';

export class WsBBox {
    constructor(
        topLeft: WsPoint,
        bottomRight: WsPoint
    ) {}
}

export class WsPoint {
    constructor(
        public name: string,
        public point: Point) {}
}

export class WsModalContent {
    constructor(
        public title: string,
        public message: string,
        public dismissButton: string,
        public confirmButton: string
    ) {}
}

export class WsModeItem {
    constructor(
        public name: string,
        public iconName: string,
        public isActive: boolean,
        public color: string) {}
}

export class WsSelectItem {
    constructor(
        public name: string,
        public value: string,
        public isActive: boolean
    ) { }
}

export class WsItem {
    constructor(
        public name: string,
        public value: any,
        public image: any,
        public isActive: boolean = true) { }
    
    toggle() {
        this.isActive = !this.isActive;
    }
}