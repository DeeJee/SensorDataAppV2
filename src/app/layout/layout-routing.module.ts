import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from './layout.component';
import { AddDatasourceComponent } from './sensor-data/add-datasource/add-datasource.component';
import { SensorDataModule } from './sensor-data/sensor-data.module';
import { DatasourceManagementComponent } from './sensor-data/datasource-management/datasource-management.component';
import { DatasourceDetailsComponent } from './sensor-data/datasource-details/datasource-details.component';
import { UploadImageComponent } from './sensor-data/upload-image/upload-image.component';

const routes: Routes = [
    {
        path: '',
        component: LayoutComponent,
        children: [
            { path: '', redirectTo: 'dashboard' },
            //{ path: 'dashboard', loadChildren: './dashboard/dashboard.module#DashboardModule' },
            { path: 'dashboard', loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule) },
            //{ path: 'channeldata', loadChildren: './sensor-data/channel-data/channeldata.module#ChanneldataModule' },
            { path: 'channeldata', loadChildren: () => import('./sensor-data/channel-data/channeldata.module').then(m => m.ChanneldataModule) },
            //{ path: 'components', loadChildren: './bs-component/bs-component.module#BsComponentModule' },
            { path: 'components', loadChildren: () => import('./bs-component/bs-component.module').then(m => m.BsComponentModule) },

            { path: 'adddatasources', component: AddDatasourceComponent },
            { path: 'managedatasources', component: DatasourceManagementComponent },
            { path: 'datasourcedetails/:id', component: DatasourceDetailsComponent },
            { path: 'uploadImage/:id', component: UploadImageComponent },
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes),
        SensorDataModule
    ],
    exports: [RouterModule]
})
export class LayoutRoutingModule { }
