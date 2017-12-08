import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// @ngrx/...
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { reducers } from './board-reducers';

import { SharedModule } from '../shared/shared.module';

import { BoardRoutingModule } from './board-routing.module';

import { BoardComponent } from './board.component';
import { BoardPagesComponent } from './board-pages/board-pages.component';
import { BoardMediaComponent } from './board-media/board-media.component';
import { BoardMediaImagesComponent } from './board-media/board-media-images.component';
import { BoardMediaGalleriesComponent } from './board-media/board-media-galleries.component';
import { BoardConfigComponent } from './board-config/board-config.component';

import { BoardService } from './board.service';
import { BoardEffects } from './board-effects';

@NgModule({
    imports: [
        CommonModule,
        SharedModule,
        BoardRoutingModule,
        StoreModule.forFeature('board', reducers),
        EffectsModule.forFeature([BoardEffects])
    ],
    exports: [],
    declarations: [
        BoardComponent,
        BoardPagesComponent,
        BoardMediaComponent,
        BoardMediaImagesComponent,
        BoardMediaGalleriesComponent,
        BoardConfigComponent
    ],
    providers: [
        BoardService
    ]
})
export class BoardModule { }
