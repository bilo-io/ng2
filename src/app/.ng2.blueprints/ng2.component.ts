import { Component } from '@angular/core';
import template from './ng-component.component.html!text';
@Component({
    moduleId: module.id,
    selector: 'ng-component',
    template: template,
    styleUrls: [ 'ng-component.component.css']
})
export class NgComponent {
    constructor() {}
}
