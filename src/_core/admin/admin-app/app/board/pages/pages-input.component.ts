import { Component, Input, Output, EventEmitter } from '@angular/core';

import { InputMetatdata } from './../board.model';
import { PickItemPipe } from './../../shared/pipes/pickItem.pipe';

@Component({
    selector: 'ca-pages-input',
    templateUrl: 'pages-input.component.html'
})

export class PagesInputComponent {
    inputValueModel: any;

    @Input() inputKey: string;
    @Input()
    get inputValue(): any {
        return this.inputValueModel;
    }
    @Input() inputMetadata: InputMetatdata;

    @Output() inputValueChange = new EventEmitter<any>();

    // inputValue model setter
    set inputValue(value: any) {
        this.inputValueModel = value;
        this.inputValueChange.emit(this.inputValueModel);
    }

    constructor(
        private pickItem: PickItemPipe
    ) { }

    /**
     * update input -> inputValue (inputValueModel) model (two-way data binding)
     * @param index index of input to update
     * @param value updated value
     */
    updateInput(index: number, value: any): void {
        this.inputValue[
            // use pickItemPipe to get proper key
            this.pickItem.transform(this.inputValue, 'key', index)
        ] = value;
    }
}
