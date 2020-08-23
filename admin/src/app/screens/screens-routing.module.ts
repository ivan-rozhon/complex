import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from '@cx-core/utils/auth.guard';

import { ScreensComponent } from './screens.component';

import { PagesComponent } from './pages/pages.component';

const routes: Routes = [
  {
    path: '',
    component: ScreensComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        component: PagesComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ScreensRoutingModule {}
