import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from '../core/auth-guard.service';
import { BoardComponent } from './board.component';
import { PagesComponent } from './pages/pages.component';
import { MediaComponent } from './media/media.component';
import { ConfigComponent } from './config/config.component';

const routes: Routes = [
    {
        path: '',
        component: BoardComponent,
        canActivate: [AuthGuard],
        children: [
            { path: 'pages', component: PagesComponent },
            { path: 'media', component: MediaComponent },
            { path: 'config', component: ConfigComponent }
        ]
    },
    { path: '**', redirectTo: '/pages', pathMatch: 'full' }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class BoardRoutingModule { }
