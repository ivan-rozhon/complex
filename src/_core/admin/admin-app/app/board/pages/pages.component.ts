import { Component, OnInit, OnDestroy } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { Store } from '@ngrx/store';

import * as MediaActions from './../media/media-actions';
import * as PagesActions from './pages-actions';
import * as fromBoard from './../board-reducers';
import { Pages, Page, Content, ContentData, Gallery } from '../board.model';
import { PickItemPipe } from './../../shared/pipes/pickItem.pipe';

@Component({
    selector: 'ca-pages',
    templateUrl: 'pages.component.html',
    styleUrls: ['pages.component.scss']
})
export class PagesComponent implements OnInit, OnDestroy {
    // pages streams
    pages$: Observable<Pages>;
    pagesLoading$: Observable<boolean>;
    pagesSaving$: Observable<boolean>;
    // content streams
    content$: Observable<Content>;
    contentLoading$: Observable<boolean>;
    // subscription of pages stream
    pagesSubscription: Subscription;
    // pages
    pages: Pages;

    constructor(
        private store: Store<fromBoard.State>,
        private pickItem: PickItemPipe
    ) { }

    ngOnInit(): void {
        // pages & loading indication store streams
        this.pages$ = this.store.select(fromBoard.getPages);
        this.pagesLoading$ = this.store.select(fromBoard.getPagesLoading);
        this.pagesSaving$ = this.store.select(fromBoard.getPagesSaving);

        // content & loading indication store streams
        this.content$ = this.store.select(fromBoard.getContent);
        this.contentLoading$ = this.store.select(fromBoard.getContentLoading);

        // subscribe pages stream
        this.pagesSubscription =
            this.pages$
                .subscribe(pages => this.pages = Object.assign({}, pages));

        // load pages on init
        this.loadPages();

        // load list of galleries
        this.store.dispatch(new MediaActions.LoadGalleries());
    }

    /** dispatch action for load pages */
    loadPages(): void {
        this.store.dispatch(new PagesActions.LoadPages());
    }

    /** dispatch action for save pages */
    savePages(pages: Pages): void {
        this.store.dispatch(new PagesActions.SavePages(pages));
    }

    /**
     * dispatch action for edit page`s content (data)
     * @param dataId ID of data to edit
     * @param templateId ID of template
     */
    loadContent({ dataId, templateId }: { dataId: string, templateId: string }): void {
        this.store.dispatch(new PagesActions.LoadContent({ dataId, templateId }));
    }

    /**
     * dispatch action for create new content (data) ID
     * @param templateId ID of template
     * @param indexes indexes - path of requested page in pages object/array
     * @param schema actual schema object
     */
    createContent({ templateId, indexes }: { templateId: string, indexes: (number | string)[] }, schema: { [x: string]: Page[] }): void {
        // pick schema key
        const schemaKey = Object.keys(schema)[0];

        // dispatch action
        this.store.dispatch(new PagesActions.CreateContent({
            templateId,
            indexes: [schemaKey, ...indexes],
            pages: this.pages
        }));
    }

    /**
     * dispatch action for delete content (data) ID
     * @param dataId ID of data to delete
     * @param indexes indexes - path of requested page in pages object/array
     * @param schema actual schema object
     */
    deleteContent({ dataId, indexes }: { dataId: string, indexes: (number | string)[] }, schema: { [x: string]: Page[] }): void {
        // pick schema key
        const schemaKey = Object.keys(schema)[0];

        // dispatch action
        this.store.dispatch(new PagesActions.DeleteContent({
            dataId,
            indexes: [schemaKey, ...indexes],
            pages: this.pages
        }));
    }

    /**
     * dispatch action for save page`s content
     * @param dataId ID of data to save
     * @param contentData page`s content to save
     */
    saveContent({ dataId, contentData }: { dataId: string, contentData: ContentData }): void {
        this.store.dispatch(new PagesActions.SaveContent({ dataId, contentData }));
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

    /** check if some pages exists */
    get pagesExists(): boolean {
        return this.pages.webSchema.webSchemaMain.length !== 0;
    }

    ngOnDestroy(): void {
        // unsubscribe subscriptions
        this.pagesSubscription.unsubscribe();
    }
}
