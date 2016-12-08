import { Component } from '@angular/core';
import template from './not-found.component.html!text';
import style from './not-found.component.css!text';

@Component({
    selector: 'not-found',
    template,
    styles: [ style ]
})
export class NotFoundComponent {
    constructor() {
    }
}
