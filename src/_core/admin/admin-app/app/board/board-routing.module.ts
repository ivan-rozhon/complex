import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from '../core/auth-guard.service';
import { BoardComponent } from './board.component';
import { BoardPagesComponent } from './board-pages/board-pages.component';
import { BoardMediaComponent } from './board-media/board-media.component';
import { BoardConfigComponent } from './board-config/board-config.component';

const routes: Routes = [
    { path: '', redirectTo: '/pages', pathMatch: 'full' },
    {
        path: '',
        component: BoardComponent,
        canActivate: [AuthGuard],
        children: [
            { path: 'pages', component: BoardPagesComponent },
            { path: 'media', component: BoardMediaComponent },
            { path: 'config', component: BoardConfigComponent }
        ]
    },
    { path: '**', redirectTo: '/pages', pathMatch: 'full' }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class BoardRoutingModule { }
