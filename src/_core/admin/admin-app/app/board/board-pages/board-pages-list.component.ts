import { Component, Input, Output, EventEmitter } from '@angular/core';

import { Page, PagesMetadata } from '../board.model';
import { PickItemPipe } from '../../shared/pipes/pickItem.pipe';
import { SharedService } from './../../shared/shared.service';

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
        private pickItem: PickItemPipe,
        private sharedService: SharedService
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

    /**
     * move page item in array of pages
     * @param direction up/down (increase/decrease) index
     * @param index current index of page item
     */
    movePage(direction: 'up' | 'down', index: number): void {
        // get new index according to direction of move
        const newIndex = direction === 'up'
            ? index - 1
            : direction === 'down'
                ? index + 1
                : null;

        // do not anything if newIndex doesn`t exists
        if (newIndex === null) { return; }

        // reorder items in array
        this.pages = this.sharedService.moveArrayItem(this.pages, index, newIndex);
    }
}
