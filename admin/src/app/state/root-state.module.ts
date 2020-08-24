import { NgModule } from '@angular/core';

import { StoreModule } from '@ngrx/store';

import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { environment } from '@cx/environments/environment';

import { AuthStateModule } from './auth/auth-state.module';
import { PagesStateModule } from './pages/pages-state.module';

@NgModule({
  imports: [
    AuthStateModule,
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
    EffectsModule.forRoot([]),
    ...(environment.production
      ? []
      : [
          StoreDevtoolsModule.instrument({
            maxAge: 25 // Retains last 25 states
          })
        ])
  ],
  exports: [],
  declarations: [],
  providers: [],
})
export class RootStateModule {}
