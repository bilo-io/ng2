import { Directive } from '@angular/core';

@Directive({
    selector: '[ng-directive]',
    inputs: [
        'text: ng-directive'
    ],
    host: {
        '(mouseenter)' : 'onMouseEnter()',
        '(mouseleave)' : 'onMouseLeave()'
    }
})
export class NgDirective {
    constructor() {
        console.log('NgDirective');
    }

    onMouseEnter() {
        console.log('NgDirective: mouse enter');
    }

    onMouseLeave() {
        console.log('NgDirective: mouse leave');
    }
}
