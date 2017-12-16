import { Component, Input } from '@angular/core';

@Component({
    selector: 'ca-board-pages-content-list',
    templateUrl: 'board-pages-content-list.component.html'
})

export class BoardPagesContentListComponent {
    @Input() contentValue: any[];
    @Input() contentKey: string;
    @Input() contentMetadata: any;

    constructor() { }
}
