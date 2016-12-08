import { Component } from '@angular/core';
import template from './input-demo.component.html!text';
import style from './input-demo.component.css!text';

@Component({
    selector: 'input-demo',
    template,
    styles: [ style ]
})
export class InputDemoComponent {
    public textModel: string = 'textModelValue';
    private numberModel: number = 12345;
    constructor() {}
}
