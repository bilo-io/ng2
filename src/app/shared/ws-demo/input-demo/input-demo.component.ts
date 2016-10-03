import { Component } from '@angular/core';

@Component({
    moduleId: module.id,
    selector: 'input-demo',
    templateUrl: 'input-demo.component.html',
    styleUrls: [ 'input-demo.component.css']
})
export class InputDemoComponent {
    public textModel: string = 'textModelValue';
    private numberModel: number = 12345;
    constructor() {}
}
