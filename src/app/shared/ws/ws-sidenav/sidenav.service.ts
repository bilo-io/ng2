import { Injectable } from '@angular/core';

@Injectable()
export class SidenavService {
    isOn: boolean = false;
    constructor() {
    }
    public open() {
        this.isOn = true;
    }
    public close() {
        this.isOn = false;
    }
    public toggle() {
        this.isOn = !this.isOn;
        console.log('Sidenav On: ' + this.isOn);
    }    
}