import { NgModule } from '@angular/core';

import { BoardRoutingModule } from './board-routing.module';

import { BoardComponent } from './board.component';
import { BoardPagesComponent } from './board-pages/board-pages.component';
import { BoardMediaComponent } from './board-media/board-media.component';
import { BoardConfigComponent } from './board-config/board-config.component';

import { BoardService } from './board.service';

@NgModule({
    imports: [
        BoardRoutingModule
    ],
    exports: [],
    declarations: [
        BoardComponent,
        BoardPagesComponent,
        BoardMediaComponent,
        BoardConfigComponent
    ],
    providers: [
        BoardService
    ],
})
export class BoardModule { }
