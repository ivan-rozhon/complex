import { Component, OnChanges, SimpleChanges, Input, ViewChild, ElementRef } from '@angular/core';

import * as UIkit from 'uikit';

import { Content } from './../board.model';
import { PickItemPipe } from '../../shared/pipes/pickItem.pipe';

@Component({
    selector: 'ca-pages-content',
    templateUrl: 'pages-content.component.html'
})

export class PagesContentComponent implements OnChanges {
    @Input() content: Content;

    @ViewChild('caContentModal') contentModalElementRef: ElementRef;

    constructor(
        private pickItem: PickItemPipe
    ) { }

    ngOnChanges(changes: SimpleChanges): void {
        // check for changes in content
        if (changes.content && !changes.content.firstChange) {

            // check if metadata cointains values - otherwise return
            if (!Object.keys(this.content._metadata).length) { return; }

            // open the content modal window
            this.openContentModal();
        }
    }

    /** open modal window contains page content */
    openContentModal(): void {
        UIkit.modal(this.contentModalElementRef.nativeElement).show();
    }

    /**
     * update contentValue (contentValueModel) model (two-way data binding)
     * @param value new (updated) value of contentValue
     * @param index index of content data container to update
     */
    updateContent(value: any[], index: number): void {
        // use pickItemPipe to get proper key of content container
        const contentKey = this.pickItem.transform(this.content.data, 'key', index);

        // update value
        this.content.data[contentKey] = value;
    }
}
