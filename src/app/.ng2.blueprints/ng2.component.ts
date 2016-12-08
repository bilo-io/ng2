import { Component } from '@angular/core';
import template from './ng-component.component.html!text';
import style from './ng-component.component.css!text';

@Component({
    //moduleId: module.id,
    selector: 'ng-component',
    template: template,
    styles: [ style ]
})
export class NgComponent {
    constructor() {}
}
