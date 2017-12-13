import { Component, OnInit, Input } from '@angular/core';

import { Page, PagesMetadata } from '../board.model';

@Component({
    selector: 'ca-board-pages-list',
    templateUrl: 'board-pages-list.component.html'
})

export class BoardPagesListComponent implements OnInit {
    @Input() pages: Page[];
    @Input() metadata: PagesMetadata;

    constructor() { }

    ngOnInit() { }
}
