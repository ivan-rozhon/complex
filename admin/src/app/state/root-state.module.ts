import { NgModule } from '@angular/core';

import { StoreModule } from '@ngrx/store';
// TODO:
// import { EffectsModule } from '@ngrx/effects';
// import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { PagesStateModule } from './pages/pages-state.module';

@NgModule({
  imports: [
    PagesStateModule,
    StoreModule.forRoot(
      {},
      {
        // These checks are here to guide developers to follow the core concepts and best practices.
        runtimeChecks: {
          strictStateImmutability: true,
          strictActionImmutability: true,
          strictStateSerializability: true,
          strictActionSerializability: false, // https://github.com/ngrx/platform/issues/1993
        },
      }
    ),
  ],
  exports: [],
  declarations: [],
  providers: [],
})
export class RootStateModule {}
