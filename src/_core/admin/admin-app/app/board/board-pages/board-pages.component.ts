import { Component } from '@angular/core';

@Component({
    selector: 'ca-board-pages',
    templateUrl: 'board-pages.component.html'
})
export class BoardPagesComponent {
    editorContent = '';
    colors = [
        '#F44336',
        '#3F51B5',
        '#CDDC39',
        '#4CAF50',
        '#FFC107',
        '#795548'
    ];

    constructor() { }
}
