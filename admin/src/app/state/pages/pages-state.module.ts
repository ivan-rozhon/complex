import { NgModule } from '@angular/core';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { PagesEffects } from './pages.effects';
import * as fromPages from './pages.reducer';

@NgModule({
  imports: [
    StoreModule.forFeature(fromPages.pagesFeatureKey, fromPages.reducer),
    EffectsModule.forFeature([PagesEffects]),
  ],
  exports: [],
  declarations: [],
  providers: [],
})
export class PagesStateModule {}
