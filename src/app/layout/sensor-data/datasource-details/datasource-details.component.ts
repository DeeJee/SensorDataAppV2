import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '../../../../../node_modules/@angular/router';
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
  imageToShow: any = "assets/images/noimage.png";
  isImageLoading: boolean;
  id: string;
  datasource: Datasource;
  datatype: DataType;
  datasets: number;
  lastData: Date;
  fields: string;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private datasourceService: DatasourceService,
    private datatypeService: DataTypeService,
    private sensordataService: SensorDataService) { }

  private createImageFromBlob(image: Blob) {
    let reader = new FileReader();
    reader.addEventListener("load", () => {
      this.imageToShow = reader.result;
    }, false);

    if (image) {
      reader.readAsDataURL(image);
    }
  }

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      this.id = params['id'];
      this.datasourceService.getDataSourceImageById(this.id).subscribe(
        data => {
          this.createImageFromBlob(data);
          this.isImageLoading = false;
        },
        error => {
          this.isImageLoading = false;
          console.log(error);
        }
      );


      this.datasourceService.getDataSourceById(this.id).subscribe((res: Datasource) => {
          this.datasource = res;
          this.datatypeService.getById(res.DataTypeId).subscribe(res => {
            this.datatype = res;
            this.fields = res.Properties;
          });
      }, (err: HttpErrorResponse) => {
        //console.log("status code: " + err.status);
        console.log(err);
      }
      );

      this.sensordataService.getCount(this.id).subscribe(res => this.datasets = res);

      this.sensordataService.getMostRecent(this.id).subscribe(res => {
        this.lastData = res.TimeStamp;
        this.fields = res.Payload.Properties;
      }, (err: HttpErrorResponse) => {
        if (err.status == 404) {
          this.datasets = 0;
        }
        console.log("status code: " + err.status);
      });

    });
  }

  uploadImage() {
    //this.router.navigate(['/uploadImage',this.id]);
  }

  handleFileInput(file: FileList) {
   
  }

  deleteData(): void {

  }
  delete(): void {

  }

}
