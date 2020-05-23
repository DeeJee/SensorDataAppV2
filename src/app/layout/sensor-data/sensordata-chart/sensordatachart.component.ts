import { Component, OnInit, Input} from '@angular/core';
import { Series } from './series';
import { DataModel } from '../../models/datamodel';


@Component({
  selector: 'sensorDataChart',
  template: `
  <div style="display: block;">
    <div *ngIf="loading">
      <app-loading-spinner [(show)]="loading" message="loading"></app-loading-spinner>
    </div>
    <canvas *ngIf="!loading" id="myChart" baseChart 
                [datasets]="lineChartData"
                [labels]="lineChartLabels"
                [options]="lineChartOptions"
                [colors]="lineChartColors"
                [legend]="lineChartLegend"
                [chartType]="lineChartType"
                (chartHover)="chartHovered($event)"
                (chartClick)="chartClicked($event)">
    </canvas>
  </div>
  `
})

export class SensorDataChartComponent implements OnInit{
  constructor() { }

  ngOnInit(): void {
    this.lineChartData.push(new Series(this.feed, this.values));
  }


  errorMessages: any;
  @Input() public loading: boolean;
  @Input() public values: any[];
  @Input() public feed: string;
  @Input() public datasource: string;

  public lineChartData: Series[] = [];
  @Input() public lineChartLabels: any[] = [];

  public addDatapoint(data): void {
    let val = data.payload[this.feed];
    
    this.values.push(val);

    this.lineChartData=[];
    this.lineChartData.push(new Series(this.feed,this.values));
    console.log(`Data added ${data.timeStamp}: ${val}`);
    console.info(`${this.feed} Labels: ${this.lineChartLabels.length}`);
    console.info(`${this.feed} Series: ${this.lineChartData[0].data.length}`);
  }

  public lineChartOptions: any = {
    responsive: true,
    scales: {
      yAxes: [{
        display: true,
        ticks: {
          beginAtZero: true,
        }
      }]
    },
  };
  public lineChartColors: Array<any> = [
    { // grey
      backgroundColor: 'rgba(148,159,177,0.2)',
      borderColor: 'rgba(148,159,177,1)',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    },
    { // dark grey
      backgroundColor: 'rgba(77,83,96,0.2)',
      borderColor: 'rgba(77,83,96,1)',
      pointBackgroundColor: 'rgba(77,83,96,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(77,83,96,1)'
    },
    { // grey
      backgroundColor: 'rgba(148,159,177,0.2)',
      borderColor: 'rgba(148,159,177,1)',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    }
  ];
  public lineChartLegend: boolean = true;
  public lineChartType: string = 'line';

  // events
  public chartClicked(e: any): void {
    console.log(e);
  }

  public chartHovered(e: any): void {
    console.log(e);
  }
}
