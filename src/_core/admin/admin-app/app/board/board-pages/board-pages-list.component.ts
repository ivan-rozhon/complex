import { Component, Input, Output, EventEmitter } from '@angular/core';

import { Page, PagesMetadata } from '../board.model';
import { PickItemPipe } from '../../shared/pipes/pickItem.pipe';

@Component({
    selector: 'ca-board-pages-list',
    templateUrl: 'board-pages-list.component.html'
})

export class BoardPagesListComponent {
    pagesModel: Page[];

    @Input()
    get pages(): Page[] {
        return this.pagesModel;
    }
    @Input() metadata: PagesMetadata;

    @Output() pagesChange = new EventEmitter<Page[]>();

    // pages model setter
    set pages(value: Page[]) {
        this.pagesModel = value;
        this.pagesChange.emit(this.pagesModel);
    }

    constructor(
        private pickItem: PickItemPipe
    ) { }

    /** update pages (pagesModel) model (two-way data binding) */
    updatePages(index: number, event: Page[]): void {
        this.pages[
            // use pickItemPipe to get proper key
            this.pickItem.transform(this.pages, 'key', index)
        ].sub = event;
    }
}
