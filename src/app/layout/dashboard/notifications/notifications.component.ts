import { Component, OnInit } from '@angular/core';
import { NotificationModel } from '../../models/NotificationModel';
import { NotificationsService } from './notifications.service';
import * as signalR from '@aspnet/signalR';
import { environment } from '../../../../environments/environment';

@Component({
  providers: [NotificationsService],
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css']
})
export class NotificationsComponent implements OnInit {

  constructor(private notificationsService: NotificationsService) { }

  notifications: NotificationModel[];

  private hubConnection: signalR.HubConnection;

  ngOnInit() {
    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl(`${environment.services.sensorDataService.host}/sensordatahub`)
      .build();

    this.hubConnection.start()
      .then(() => console.log("Connection started"))
      .catch(err => console.log('Error while starting connection: ' + err));

    this.hubConnection.on('notification', (notification: NotificationModel) => {
      this.notifications.splice(0, 0, notification);
    })

    this.notificationsService.Get(10).subscribe(res => {
      this.notifications = res;
    }, err => {
      console.log(err)
    });
  }

  showAll(): void {
    console.log("showAll clicked");
    this.notificationsService.GetAll().subscribe(res => {
      this.notifications = res;
    }, err => console.log(err));
  }

  delete(id: number): void {
    this.notificationsService.Delete(id).subscribe(res => {

      let index: number;
      this.notifications.forEach((item) => {
        if (item.Id === id) {
          index = this.notifications.indexOf(item);
        }
      })
      this.notifications.splice(index, 1);
    }, err => console.log(err));
  }
}
