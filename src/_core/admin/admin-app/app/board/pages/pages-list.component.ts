import { Component, Input, Output, EventEmitter } from '@angular/core';

import * as UIkit from 'uikit';

import { Page, InputMetatdata, SchemaMetadata } from '../board.model';
import { PickItemPipe } from '../../shared/pipes/pickItem.pipe';
import { SharedService } from './../../shared/shared.service';

@Component({
    selector: 'ca-pages-list',
    templateUrl: 'pages-list.component.html'
})

export class PagesListComponent {
    pagesModel: Page[];

    @Input()
    get pages(): Page[] {
        return this.pagesModel;
    }
    @Input() inputMetadata: InputMetatdata;
    @Input() schemaMetadata: SchemaMetadata;
    @Input() schemaDepth: number;

    @Output() pagesChange = new EventEmitter<Page[]>();
    @Output() onEditContent = new EventEmitter<{ dataId: string, templateId: string }>();
    @Output() onCreateContent = new EventEmitter<{ templateId: string, indexes: number[] }>();
    @Output() onDeleteContent = new EventEmitter<{ dataId: string; indexes: number[] }>();

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
     * edit page`s content (data)
     * @param dataId ID of data to edit
     * @param templateId ID of template
     */
    editContent({ dataId, templateId, index }: { dataId: string, templateId: string, index?: number }): void {
        // if dataId & templateId exists emit event to edit content
        if (dataId.length && templateId.length) {
            this.onEditContent.emit({ dataId, templateId });

            // if data ID doesn`t exists - do create one (template ID must exists) - emit event
        } else if (!dataId.length && templateId.length) {
            // show confirmation dialog before create new content (data ID)
            UIkit.modal
                .confirm(`There is no content yet. Create one?`)
                .then(() => {
                    // emit event to delete gallery
                    this.onCreateContent.emit({ templateId, indexes: [index] });
                },
                    // catch a rejection
                    () => { });
        }
    }

    /**
     * create new page`s content (data)
     * @param templateId ID of template
     * @param indexes indexes - path of requested page in pages object/array
     * @param index index of actual pages/schema
     */
    createContent({ templateId, indexes }: { templateId: string, indexes: number[], }, index: number): void {
        this.onCreateContent.emit({ templateId, indexes: [index, ...indexes] });
    }

    /**
     * remove page`s content (data)
     * @param dataId ID of data to edit
     * @param indexes indexes - path of requested page in pages object/array
     */
    deleteContent({ dataId, indexes }: { dataId: string, indexes: number[] }, index: number): void {
        // if indexes (path to item) exists - just emit callback (user already confirmed it)
        if (indexes.length) {
            this.onDeleteContent.emit({ dataId, indexes: [index, ...indexes] });
            return;
        }

        // show confirmation dialog before delete content (data ID)
        UIkit.modal
            .confirm(`Delete page content. Are you sure?`)
            .then(() => {
                // emit event to delete content
                this.onDeleteContent.emit({ dataId, indexes: [index] });
            },
                // catch a rejection
                () => { });
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

    /**
     * delete page item
     * @param index index of page item to delete
     */
    deletePage(index: number): void {
        this.pages.splice(index, 1);
    }

    /**
     * add page item
     * @param index index of page item from which comes event
     */
    addPage(index: number): void {
        // add new item (from 'add' array) after the item from which comes event
        this.pages.splice(index + 1, 0, this.schemaMetadata.add[0]);
    }

    /**
     * add sub page item
     * @param index index of page item which will be contain sub item
     */
    addSubPage(index: number): void {
        // directly push new item to 'sub' array (it will be the first item)
        this.pages[index].sub
            .push(this.schemaMetadata.add[1]);
    }

    /**
     * remove first item of 'add' array in schema metadata
     * @param schemaMetadata original object of schema metadata
     */
    removeFirstAdd(schemaMetadata: SchemaMetadata): SchemaMetadata {
        // create deep copy of schema metadata object
        const deeperSchemaMetadata = Object.assign({}, schemaMetadata);

        // remove first item in 'add' array (for deeper components)
        deeperSchemaMetadata.add = this.sharedService.removeArrayItem(deeperSchemaMetadata.add, 0);

        return deeperSchemaMetadata;
    }
}
