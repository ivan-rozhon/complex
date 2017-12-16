import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

// @ngrx/...
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { reducers } from './board-reducers';

import { SharedModule } from '../shared/shared.module';

import { BoardRoutingModule } from './board-routing.module';

import { BoardComponent } from './board.component';

import { BoardConfigComponent } from './board-config/board-config.component';

import { BoardMediaComponent } from './board-media/board-media.component';
import { BoardMediaImagesComponent } from './board-media/board-media-images.component';
import { BoardMediaGalleriesComponent } from './board-media/board-media-galleries.component';

import { BoardPagesComponent } from './board-pages/board-pages.component';
import { BoardPagesContentComponent } from './board-pages/board-pages-content.component';
import { BoardPagesContentListComponent } from './board-pages/board-pages-content-list.component';
import { BoardPagesInputComponent } from './board-pages/board-pages-input.component';
import { BoardPagesListComponent } from './board-pages/board-pages-list.component';

import { BoardService } from './board.service';
import { BoardEffects } from './board-effects';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        SharedModule,
        BoardRoutingModule,
        StoreModule.forFeature('board', reducers),
        EffectsModule.forFeature([BoardEffects])
    ],
    exports: [],
    declarations: [
        BoardComponent,

        BoardConfigComponent,

        BoardMediaComponent,
        BoardMediaImagesComponent,
        BoardMediaGalleriesComponent,

        BoardPagesComponent,
        BoardPagesContentComponent,
        BoardPagesContentListComponent,
        BoardPagesInputComponent,
        BoardPagesListComponent,
    ],
    providers: [
        BoardService
    ]
})
export class BoardModule { }
