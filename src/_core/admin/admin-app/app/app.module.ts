import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

// ngrx/platform modules
import { StoreModule } from '@ngrx/store';
import { StoreRouterConnectingModule, RouterStateSerializer } from '@ngrx/router-store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
// ngrx app modules
import { reducers, metaReducers } from './app-reducers';
import { AppRouterStateSerializer } from './app-router-state-serializer';
import { CoreEffects } from './core/core-effects';

// app modules
import { AppRoutingModule } from './app-routing.module';
import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';
import { BoardModule } from './board/board.module';

import { AppComponent } from './app.component';

// check if environment is production (production/development)
const production = process.env.ENV === 'production';

@NgModule({
    imports: [
        BrowserModule,
        HttpClientModule,
        AppRoutingModule,
        CoreModule,
        SharedModule,
        BoardModule,

        // StoreModule.forRoot is imported once in the root module, accepting a reducer function or object map of reducer functions.
        StoreModule.forRoot(reducers, { metaReducers }),

        // @ngrx/router-store keeps router state up-to-date in the store.
        StoreRouterConnectingModule,

        // Store devtools instrument the store retaining past versions of state and recalculating new states.
        // !production ? StoreDevtoolsModule.instrument() : [],

        // EffectsModule.forRoot() is imported once in the root module
        // and sets up the effects class to be initialized immediately when the application starts.
        EffectsModule.forRoot([CoreEffects])
    ],
    providers: [
        { provide: RouterStateSerializer, useClass: AppRouterStateSerializer }
    ],
    declarations: [
        AppComponent
    ],
    bootstrap: [AppComponent]
})

export class AppModule { }
