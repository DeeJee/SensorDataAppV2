import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthenticationGuard, MsAdalAngular6Service } from 'microsoft-adal-angular6';

const routes: Routes = [
    //{ path: '', loadChildren: './layout/layout.module#LayoutModule', canActivate: [AuthenticationGuard] },
    { path: '', loadChildren: () => import('./layout/layout.module').then(m => m.LayoutModule), canActivate: [AuthenticationGuard] },
    { path: 'login', loadChildren: './login/login.module#LoginModule' },
    
    { path: 'error', loadChildren: () => import('./server-error/server-error.module').then(m => m.ServerErrorModule) },
//    { path: 'error', loadChildren: './server-error/server-error.module#ServerErrorModule' },
    //{ path: 'access-denied', loadChildren: './access-denied/access-denied.module#AccessDeniedModule' },
    { path: 'access-denied', loadChildren: () => import('./access-denied/access-denied.module').then(m => m.AccessDeniedModule) },
  // { path: 'not-found', loadChildren: './not-found/not-found.module#NotFoundModule' },
    { path: 'not-found', loadChildren: () => import('./not-found/not-found.module').then(m => m.NotFoundModule) },
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
