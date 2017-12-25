import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'ca-pages-content-input',
    templateUrl: 'pages-content-input.component.html'
})

export class PagesContentInputComponent {
    inputValueModel: any;

    @Input() inputKey: string;
    @Input()
    get inputValue(): any {
        return this.inputValueModel;
    }
    @Input() inputMetadata: any;

    @Output() inputValueChange = new EventEmitter<any>();

    // inputValue model setter
    set inputValue(value: any) {
        this.inputValueModel = value;
        this.inputValueChange.emit(this.inputValueModel);
    }

    constructor() { }
}
