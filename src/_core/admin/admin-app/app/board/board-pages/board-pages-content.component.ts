import { Component, OnChanges, SimpleChanges, Input, ViewChild, ElementRef } from '@angular/core';

import * as UIkit from 'uikit';

import { Content } from './../board.model';

@Component({
    selector: 'ca-board-pages-content',
    templateUrl: 'board-pages-content.component.html'
})

export class BoardPagesContentComponent implements OnChanges {
    @Input() content: Content;

    @ViewChild('caContentModal') contentModalElementRef: ElementRef;

    constructor() { }

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
}
