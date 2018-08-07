import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '../../../../../node_modules/@angular/router';
import { DatasourceService } from '../services/datasource.service';
import { HttpErrorResponse } from '../../../../../node_modules/@angular/common/http';
import { Datasource } from '../../models/datasource';
import { DataType } from '../../models/DataType';
import { DataTypeService } from '../services/datatype.service';
import { SensorDataService } from '../services/sensordata.service';

@Component({
  selector: 'app-datasource-details',
  templateUrl: './datasource-details.component.html',
  styleUrls: ['./datasource-details.component.scss']
})
export class DatasourceDetailsComponent implements OnInit {

  private id: string;
  datasource: Datasource;
  datatype: DataType;
  datasets: number;
  lastData: Date;
  fields: string;

  constructor(
    private activatedRoute: ActivatedRoute,
    private datasourceService: DatasourceService,
    private datatypeService: DataTypeService,
    private sensordataService: SensorDataService) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      this.id = params['id'];
      this.datasourceService.getDataSourceById(this.id).subscribe((res: Datasource[]) => {
        if (res.length == 1) {
          this.datasource = res[0];
          this.datatypeService.getById(res[0].DataTypeId).subscribe(res => {
            this.datatype = res;
            this.fields = res.Properties;
          });
        }
        this.sensordataService.getCount(this.id).subscribe(res => this.datasets = res);
        this.sensordataService.getMostRecent(this.id).subscribe(res => {
          this.lastData = res.TimeStamp;
          this.fields = res.Payload.Properties;
        });
      }, (err: HttpErrorResponse) => {
        console.log(err.error.Message);
      }
      );

    });
  }

  deleteData(): void {

  }
  delete(): void {

  }

}
