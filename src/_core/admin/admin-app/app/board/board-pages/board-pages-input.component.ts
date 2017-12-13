import { Component, Input } from '@angular/core';

import { InputData } from '../board.model';

@Component({
    selector: 'ca-board-pages-input',
    templateUrl: 'board-pages-input.component.html'
})

export class BoardPagesInputComponent {
    @Input() inputKey: string;
    @Input() inputValue: any;
    @Input() inputData: InputData;

    constructor() { }
}
