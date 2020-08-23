import { NgModule } from '@angular/core';

import { StoreModule } from '@ngrx/store';

import * as fromPages from './pages.reducer';

@NgModule({
  imports: [
    StoreModule.forFeature(fromPages.pagesFeatureKey, fromPages.reducer),
  ],
  exports: [],
  declarations: [],
  providers: [],
})
export class PagesStateModule {}
