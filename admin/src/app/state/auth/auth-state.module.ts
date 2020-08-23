import { NgModule } from '@angular/core';

import { StoreModule } from '@ngrx/store';

import * as fromAuth from './auth.reducer';

@NgModule({
  imports: [StoreModule.forFeature(fromAuth.authFeatureKey, fromAuth.reducer)],
  exports: [],
  declarations: [],
  providers: [],
})
export class AuthStateModule {}
