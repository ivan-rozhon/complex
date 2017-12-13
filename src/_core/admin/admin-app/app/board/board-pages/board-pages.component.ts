import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';

import * as PagesActions from './board-pages-actions';
import * as fromBoard from './../board-reducers';
import { Pages } from '../board.model';

@Component({
    selector: 'ca-board-pages',
    templateUrl: 'board-pages.component.html'
})
export class BoardPagesComponent implements OnInit {
    // pages streams
    pages$: Observable<Pages>;
    pagesLoading$: Observable<boolean>;

    editorContent = '';
    colors = [
        '#F44336',
        '#3F51B5',
        '#CDDC39',
        '#4CAF50',
        '#FFC107',
        '#795548'
    ];

    constructor(
        private store: Store<fromBoard.State>
    ) { }

    ngOnInit(): void {
        // pages & loading indication store streams
        this.pages$ = this.store.select(fromBoard.getPages);
        this.pagesLoading$ = this.store.select(fromBoard.getPagesLoading);

        // load pages on init
        this.loadPages();
    }

    /** dispatch action for load pages */
    loadPages(): void {
        this.store.dispatch(new PagesActions.LoadPages());
    }
}
