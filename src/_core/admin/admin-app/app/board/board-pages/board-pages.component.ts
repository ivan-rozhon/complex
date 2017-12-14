import { Component, OnInit, OnDestroy } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { Store } from '@ngrx/store';

import * as PagesActions from './board-pages-actions';
import * as fromBoard from './../board-reducers';
import { Pages, Page } from '../board.model';
import { PickItemPipe } from './../../shared/pipes/pickItem.pipe';

@Component({
    selector: 'ca-board-pages',
    templateUrl: 'board-pages.component.html'
})
export class BoardPagesComponent implements OnInit, OnDestroy {
    // pages streams
    pages$: Observable<Pages>;
    pagesLoading$: Observable<boolean>;
    // subscription of pages stream
    pagesSubscription: Subscription;
    // pages
    pages: Pages;

    // editorContent = '';
    // colors = [
    //     '#F44336',
    //     '#3F51B5',
    //     '#CDDC39',
    //     '#4CAF50',
    //     '#FFC107',
    //     '#795548'
    // ];

    constructor(
        private store: Store<fromBoard.State>,
        private pickItem: PickItemPipe
    ) { }

    ngOnInit(): void {
        // pages & loading indication store streams
        this.pages$ = this.store.select(fromBoard.getPages);
        this.pagesLoading$ = this.store.select(fromBoard.getPagesLoading);

        // subscribe pages stream
        this.pagesSubscription =
            this.pages$
                .subscribe(pages => this.pages = Object.assign({}, pages));

        // load pages on init
        this.loadPages();
    }

    /** dispatch action for load pages */
    loadPages(): void {
        this.store.dispatch(new PagesActions.LoadPages());
    }

    /**
     * update schemes model (two-way data binding)
     * @param index index of schema to update
     * @param value updated value
     */
    updateSchema(index: number, value: Page[]): void {
        // update each schema according to index in iteration
        this.pages.webSchema[
            // use pickItemPipe to get proper key
            this.pickItem.transform(this.pages.webSchema, 'key', index)
        ] = value;
    }

    ngOnDestroy(): void {
        // unsubscribe subscriptions
        this.pagesSubscription.unsubscribe();
    }
}
