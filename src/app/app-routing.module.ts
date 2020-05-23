import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthenticationGuard, MsAdalAngular6Service } from 'microsoft-adal-angular6';

const routes: Routes = [
    { path: '', loadChildren: './layout/layout.module#LayoutModule', canActivate: [AuthenticationGuard] },
    { path: 'login', loadChildren: './login/login.module#LoginModule' },
    
    { path: 'error', loadChildren: './server-error/server-error.module#ServerErrorModule' },
    { path: 'access-denied', loadChildren: './access-denied/access-denied.module#AccessDeniedModule' },
    { path: 'not-found', loadChildren: './not-found/not-found.module#NotFoundModule' },
    { path: '**', redirectTo: 'not-found' }
];

@NgModule({
    imports: [RouterModule.forRoot(routes, {enableTracing:false})],
    providers:[
        MsAdalAngular6Service
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {}
