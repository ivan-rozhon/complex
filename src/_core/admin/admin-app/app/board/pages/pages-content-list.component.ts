import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'ca-pages-content-list',
    templateUrl: 'pages-content-list.component.html'
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

    constructor() { }

    /**
     * add new content item
     * @param content content item to add
     * @param index index of content item from which comes event
     */
    addContent(content: { [x: string]: any }, index: number): void {
        // add new content item
        this.contentValue.splice(index + 1, 0, content);
    }
}
