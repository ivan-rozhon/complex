import { Component, Input, Output, EventEmitter } from '@angular/core';

import { PickItemPipe } from './../../shared/pipes/pickItem.pipe';

@Component({
    selector: 'ca-pages-content-list',
    templateUrl: 'pages-content-list.component.html',
    styles: [`
        .uk-invisible {
            margin: 0;
            padding: 0;
            height: 0;
        }
    `]
})

export class PagesContentListComponent {
    contentValueModel: any[];

    @Input() contentKey: string;
    @Input()
    get contentValue(): any[] {
        return this.contentValueModel;
    }
    @Input() contentMetadata: any;

    @Output() contentValueChange = new EventEmitter<any[]>();

    // contentValue model setter
    set contentValue(value: any[]) {
        this.contentValueModel = value;
        this.contentValueChange.emit(this.contentValueModel);
    }

    constructor(
        private pickItem: PickItemPipe
    ) { }

    /**
     * add new content item
     * @param content content item to add
     * @param index index of content item from which comes event
     */
    addContent(content: { [x: string]: any }, index: number): void {
        // add new content item
        this.contentValue.splice(index + 1, 0, content);
    }

    /**
     * update content input model (two-way data binding)
     * @param value updated value
     * @param index index of object of content input to update
     */
    updateInput(value, index): void {
        this.contentValue[index][
            // use pickItemPipe to get proper key
            this.pickItem.transform(this.contentValue[index], 'key')
        ] = value;
    }

    /**
     * delete content item
     * @param index index of content item to delete
     */
    deleteContent(index: number): void {
        this.contentValue.splice(index, 1);
    }
}
