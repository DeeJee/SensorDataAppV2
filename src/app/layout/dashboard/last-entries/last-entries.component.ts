import { Component, OnInit } from '@angular/core';
import { SensorDataService } from '../../sensor-data/services/sensordata.service';

@Component({
  selector: 'app-last-entries',
  templateUrl: './last-entries.component.html',
  styleUrls: ['./last-entries.component.css']
})
export class LastEntriesComponent implements OnInit {

  entries: any;

  constructor(private sensorDataService: SensorDataService) { }

  ngOnInit(): void {
    this.sensorDataService.getMostRecentAll().subscribe(res => {
      this.entries = res;
    });
  }

}
