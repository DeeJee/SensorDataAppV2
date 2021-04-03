import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbCarouselModule, NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import {
    TimelineComponent,
    NotificationComponent,
    ChatComponent
} from './components';
import { StatModule } from '../../shared';
import { NotificationsComponent } from './notifications/notifications.component';
import { NotificationsService } from './notifications/notifications.service';
import { LastEntriesComponent } from './last-entries/last-entries.component';

@NgModule({
    imports: [
        CommonModule,
        NgbCarouselModule,
        NgbAlertModule,
        DashboardRoutingModule,
        StatModule        
    ],
    declarations: [
        DashboardComponent,
        TimelineComponent,
        NotificationComponent,
        NotificationsComponent,
        ChatComponent,
        LastEntriesComponent
    ],
    providers:[
        NotificationsService
    ]
})
export class DashboardModule {}
