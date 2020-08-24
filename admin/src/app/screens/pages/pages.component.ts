import { Component, OnInit, OnDestroy } from '@angular/core';

import { Store } from '@ngrx/store';

import { Observable, Subscription } from 'rxjs';

import { RootState } from '@cx/state/index';

import { PagesActions, PagesSelectors } from '@cx/state/pages';
import { MediaActions } from '@cx/state/media';

import { Pages, Page, Content, ContentData } from '@cx/shared/types';

import { PickItemPipe } from '@cx/shared/pipes';

@Component({
  selector: 'cx-pages',
  templateUrl: 'pages.component.html',
  styleUrls: ['pages.component.scss'],
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
    private store$: Store<RootState>,
    private pickItem: PickItemPipe
  ) {}

  ngOnInit(): void {
    // pages & loading indication store streams
    this.pages$ = this.store$.select(PagesSelectors.selectPages);
    this.pagesLoading$ = this.store$.select(PagesSelectors.selectPagesLoading);
    this.pagesSaving$ = this.store$.select(PagesSelectors.selectPagesSaving);

    // content & loading indication store streams
    this.content$ = this.store$.select(PagesSelectors.selectContent);
    this.contentLoading$ = this.store$.select(
      PagesSelectors.selectContentLoading
    );

    // subscribe pages stream
    this.pagesSubscription = this.pages$.subscribe(
      (pages) => (this.pages = Object.assign({}, pages))
    );

    // load pages on init
    this.loadPages();

    // load list of images and galleries
    this.store$.dispatch(MediaActions.loadImages());
    this.store$.dispatch(MediaActions.loadGalleries());
  }

  /** dispatch action for load pages */
  loadPages(): void {
    this.store$.dispatch(PagesActions.loadPages());
  }

  /** dispatch action for save pages */
  savePages(pages: Pages): void {
    this.store$.dispatch(PagesActions.savePages({ pages }));
  }

  /**
   * dispatch action for edit page`s content (data)
   * @param dataId ID of data to edit
   * @param templateId ID of template
   */
  loadContent({
    dataId,
    templateId,
  }: {
    dataId: string;
    templateId: string;
  }): void {
    this.store$.dispatch(PagesActions.loadContent({ dataId, templateId }));
  }

  /**
   * dispatch action for create new content (data) ID
   * @param templateId ID of template
   * @param indexes indexes - path of requested page in pages object/array
   * @param schema actual schema object
   */
  createContent(
    {
      templateId,
      indexes,
    }: { templateId: string; indexes: (number | string)[] },
    schema: { [x: string]: Page[] }
  ): void {
    // pick schema key
    const schemaKey = Object.keys(schema)[0];

    // dispatch action
    this.store$.dispatch(
      PagesActions.createContent({
        templateId,
        indexes: [schemaKey, ...indexes],
        pages: this.pages,
      })
    );
  }

  /**
   * dispatch action for delete content (data) ID
   * @param dataId ID of data to delete
   * @param indexes indexes - path of requested page in pages object/array
   * @param schema actual schema object
   */
  deleteContent(
    { dataId, indexes }: { dataId: string; indexes: (number | string)[] },
    schema: { [x: string]: Page[] }
  ): void {
    // pick schema key
    const schemaKey = Object.keys(schema)[0];

    // dispatch action
    this.store$.dispatch(
      PagesActions.deleteContent({
        dataId,
        indexes: [schemaKey, ...indexes],
        pages: this.pages,
      })
    );
  }

  /**
   * dispatch action for save page`s content
   * @param dataId ID of data to save
   * @param contentData page`s content to save
   */
  saveContent({
    dataId,
    contentData,
  }: {
    dataId: string;
    contentData: ContentData;
  }): void {
    this.store$.dispatch(PagesActions.saveContent({ dataId, contentData }));
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
