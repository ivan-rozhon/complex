import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from '@cx/shared/components';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./screens/screens.module').then((m) => m.ScreensModule),
  },
  { path: 'login', component: LoginComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
