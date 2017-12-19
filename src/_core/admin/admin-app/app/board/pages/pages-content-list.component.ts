import { Component, Input } from '@angular/core';

@Component({
    selector: 'ca-pages-content-list',
    templateUrl: 'pages-content-list.component.html'
})

export class PagesContentListComponent {
    @Input() contentValue: any[];
    @Input() contentKey: string;
    @Input() contentMetadata: any;

    constructor() { }
}
