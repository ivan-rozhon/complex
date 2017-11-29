import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';

import { BoardRoutingModule } from './board-routing.module';

import { BoardComponent } from './board.component';
import { BoardPagesComponent } from './board-pages/board-pages.component';
import { BoardMediaComponent } from './board-media/board-media.component';
import { BoardMediaImagesComponent } from './board-media/board-media-images.component';
import { BoardMediaGalleriesComponent } from './board-media/board-media-galleries.component';
import { BoardConfigComponent } from './board-config/board-config.component';

import { BoardService } from './board.service';

@NgModule({
    imports: [
        SharedModule,
        BoardRoutingModule
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
