import { NgModule } from '@angular/core';

import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

// import { MediaEffects } from './media.effects';
import * as fromMedia from './media.reducer';

@NgModule({
  imports: [
    StoreModule.forFeature(fromMedia.mediaFeatureKey, fromMedia.reducer),
    EffectsModule.forFeature([MediaEffects]),
  ],
  exports: [],
  declarations: [],
  providers: [],
})
export class MediaStateModule {}
