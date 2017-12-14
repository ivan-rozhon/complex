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

    /**
     * update inputValue (inputValueModel) model (two-way data binding)
     * @param index index of page contains input to update
     * @param inputIndex index of input in page to update
     * @param value updated value
     */
    updateInput(index: number, inputIndex: number, value: any): void {
        // use pickItemPipe to get proper key of page
        const pageKey = this.pickItem.transform(this.pages, 'key', index);

        this.pages[pageKey][
            // use pickItemPipe to get proper key of input in page
            this.pickItem.transform(this.pages[pageKey], 'key', inputIndex)
        ] = value;
    }

    /**
     * update pages (pagesModel) model (two-way data binding)
     * @param index index of page to update
     * @param value updated value
     */
    updatePage(index: number, value: Page[]): void {
        this.pages[
            // use pickItemPipe to get proper key
            this.pickItem.transform(this.pages, 'key', index)
        ].sub = value;
    }
}
