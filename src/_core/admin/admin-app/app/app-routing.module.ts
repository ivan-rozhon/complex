import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './shared/login/login.component';

const routes: Routes = [
    { path: 'login', component: LoginComponent },
];

@NgModule({
    imports: [
        RouterModule.forRoot(
            routes,
            { useHash: true }
        )
    ],
    exports: [RouterModule],
})
export class AppRoutingModule { }