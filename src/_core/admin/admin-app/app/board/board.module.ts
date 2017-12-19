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

import { ConfigComponent } from './config/config.component';

import { MediaComponent } from './media/media.component';
import { MediaImagesComponent } from './media/media-images.component';
import { MediaGalleriesComponent } from './media/media-galleries.component';

import { PagesComponent } from './pages/pages.component';
import { PagesContentComponent } from './pages/pages-content.component';
import { PagesContentInputComponent } from './pages/pages-content-input.component';
import { PagesContentListComponent } from './pages/pages-content-list.component';
import { PagesInputComponent } from './pages/pages-input.component';
import { PagesListComponent } from './pages/pages-list.component';

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

        ConfigComponent,

        MediaComponent,
        MediaImagesComponent,
        MediaGalleriesComponent,

        PagesComponent,
        PagesContentComponent,
        PagesContentInputComponent,
        PagesContentListComponent,
        PagesInputComponent,
        PagesListComponent,
    ],
    providers: [
        BoardService
    ]
})
export class BoardModule { }
