import { Component, Input, ViewChild, ElementRef } from '@angular/core';

import * as UIkit from 'uikit';

import { Content } from './../board.model';

@Component({
    selector: 'ca-board-pages-content',
    templateUrl: 'board-pages-content.component.html'
})

export class BoardPagesContentComponent {
    @Input() content: Content;

    @ViewChild('caContentModal') contentModalElementRef: ElementRef;

    constructor() { }

    /**
     * open modal window contains page content
     */
    openContentModal(): void {
        UIkit.modal(this.contentModalElementRef.nativeElement).show();
    }
}
