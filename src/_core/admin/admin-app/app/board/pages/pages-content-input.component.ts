import { Component, Input } from '@angular/core';

@Component({
    selector: 'ca-pages-content-input',
    templateUrl: 'pages-content-input.component.html'
})

export class PagesContentInputComponent {
    @Input() inputValue: any;
    @Input() inputKey: string;
    @Input() inputMetadata: any;

    constructor() { }
}
