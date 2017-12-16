import { Component, Input } from '@angular/core';

@Component({
    selector: 'ca-board-pages-content-input',
    templateUrl: 'board-pages-content-input.component.html'
})

export class BoardPagesContentInputComponent {
    @Input() inputValue: any;
    @Input() inputKey: string;
    @Input() inputMetadata: any;

    constructor() { }
}
