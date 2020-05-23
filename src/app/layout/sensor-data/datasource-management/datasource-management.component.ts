import { Component, OnInit } from '@angular/core';
import { DatasourceService } from '../services/datasource.service';
import { QuerystringBuilderService } from '../services/querystringbuilder.service';
import { Datasource } from '../../models/datasource';
import { Channel } from '../../models/Channel';
import { Router } from '../../../../../node_modules/@angular/router';


@Component({
  providers: [DatasourceService, QuerystringBuilderService],
  selector: 'app-datasource-management',
  templateUrl: './datasource-management.component.html',
  styleUrls: ['./datasource-management.component.css']
})
export class DatasourceManagementComponent implements OnInit {
  dataSources: Datasource[] = [];
  dataSourceTypes: Channel[] = [];
  noImageFound: string = "assets/images/noimage.png";

  ngOnInit(): void {
    this.loadData();
  }
  constructor(private datasourceService: DatasourceService, private router: Router) { }

  loadData(): void {
    this.datasourceService.getDataSourceTypes().subscribe(res => {
      this.dataSourceTypes = res;
    }, err => null,
      () => {
        console.log('dataSourceTypes loaded');
      });

    this.datasourceService.getAllDataSources().subscribe(res => {
      for (let index = 0; index < res.length; index++) {
        let item = res[index];
        this.dataSources.push(item);
        this.datasourceService.getDataSourceImageById(item.DeviceId).subscribe(data => {
          this.createImageFromBlob(data, item);
        },
          err => {
            item.image = this.noImageFound;
          })
      }
    }, err => null,
      () => {
        console.log('dataSources loaded');
      });
  }

  delete(id): void {
    this.datasourceService.deleteDatasource(id).subscribe(
      ds => null,
      err => null,
      () => {
        console.debug("Datasource deleted: " + id);
        for (let index = 0; index < this.dataSources.length; index++) {
          if (this.dataSources[index].Id === id) {
            this.dataSources.splice(index, 1);
          }
        }
      });
  }

  edit(id): void {
    this.router.navigate([`datasourcedetails/${id}`]);
  }

  save(): void {
    for (let index = 0; index < this.dataSources.length; index++) {
      let datasource = this.dataSources[index];
      if (datasource.DataTypeId && datasource.DataTypeId > 0) {
        console.debug(datasource.DeviceId + ", " + datasource.Description);
        
        let ds = new Datasource(datasource.Id, datasource.DeviceId, datasource.ChannelId, datasource.Description, datasource.DataTypeId);
        this.datasourceService.updateDatasource(ds).subscribe(
          ds => null,
          err => null,
          () => {
            console.debug("Datasource added: " + datasource.DeviceId);
          });
      }
    }
  }

  loadImage(deviceId: string) {
    return `https://localhost:44374/api/DataSource/${deviceId}/Images`;

  }

  private createImageFromBlob(image: Blob, ds: Datasource) {
    let reader = new FileReader();
    reader.addEventListener("load", () => {
      ds.image = reader.result;
    }, false);

    if (image) {
      reader.readAsDataURL(image);
    }
  }
}
