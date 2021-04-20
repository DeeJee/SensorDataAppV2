import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MsalGuard } from '@azure/msal-angular';

const routes: Routes = [
    //{ path: '', loadChildren: './layout/layout.module#LayoutModule', canActivate: [AuthenticationGuard] },
    { path: '', loadChildren: () => import('./layout/layout.module').then(m => m.LayoutModule), canActivate: [MsalGuard] },
    //{ path: 'login', loadChildren: './login/login.module#LoginModule' },
    { path: 'login', loadChildren:  () => import('./login/login.module').then(m => m.LoginModule) },
    
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
    providers:[],
    exports: [RouterModule]
})
export class AppRoutingModule {}
