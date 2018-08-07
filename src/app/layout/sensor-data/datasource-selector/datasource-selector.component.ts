import { Component, OnInit, EventEmitter, Output, Input, OnChanges, SimpleChanges } from '@angular/core';
import { SensorDataService } from '../services/sensordata.service';
import { Datasource } from '../../models/datasource';
import { DatasourceService } from '../services/datasource.service';
import { IfStmt } from '../../../../../node_modules/@angular/compiler';
import { EMAIL_VALIDATOR } from '../../../../../node_modules/@angular/forms/src/directives/validators';

@Component({
  providers: [SensorDataService],
  selector: 'dataSourceSelector',
  templateUrl: 'datasource-selector.component.html'
  //template:''
})
export class DataSourceSelectorComponent implements OnInit, OnChanges {
  @Output("dataSourceChange") selectedDataSourceChange: EventEmitter<Datasource> = new EventEmitter<Datasource>();

  @Input() public channel: number;
  @Input() public dataSources: Datasource[];

  constructor(private datasourceService: DatasourceService) { }

  ngOnChanges(changes: SimpleChanges): void {
    console.log("DataSourceSelectorComponent: channel=" + this.channel);

    let fireEvent:boolean;
    if(changes.channel.previousValue){
      console.log('Page reload. Firing event');
      fireEvent=true;
    }
    else{
      console.log('Fresh page load. Not firing event');
      fireEvent=false;
    }
    this.loadDatasources(fireEvent);
  }

  ngOnInit(): void {
    this.loadDatasources(true);
  }

  private loadDatasources(emitEvent: boolean): void {
    this.datasourceService.getDataSources(this.channel).subscribe(res => {
      this.dataSources = res;
      if (emitEvent && this.dataSources.length > 0) {
        this.selectedDataSourceChange.emit(this.dataSources[0]);
      }
    },
      error => { console.error(error) },
      () => {
        console.log('getDataSources finished');
        console.debug("datasources: " + this.dataSources.length);
        console.debug("datasources: channel: " + this.channel);
      });
  }

  public dataSourceChanged(event: any): void {
    let dataSource = this.getDatasource(event.target.value);
    this.selectedDataSourceChange.emit(dataSource);
  }

  private getDatasource(deviceId: string): Datasource {
    for (let entry of this.dataSources) {
      if (entry.DeviceId === deviceId) {
        return entry;
      }
    }
    return null;
  }
}
