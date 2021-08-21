import { Component, OnInit, ComponentFactoryResolver, Input, ViewChild, ViewContainerRef, OnDestroy } from '@angular/core';
import { DatasourceService } from '../services/datasource.service';
import { ActivatedRoute, Router } from '@angular/router';
import { DataTypeService } from '../services/datatype.service';
import { routerTransition } from '../../../router.animations';
import { Datasource } from '../../models/datasource';
import * as Collections from 'typescript-collections';
import { SensorDataChartComponent } from '../sensordata-chart/sensordatachart.component';
import { SdDatePickerComponent } from '../../bs-component/components';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import * as signalR from '@aspnet/signalR';
import { SensorDataService } from '../services/sensordata.service';
import { Series } from '../sensordata-chart/series';
import { environment } from '../../../../environments/environment';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-channeldata',
    templateUrl: './channeldata.component.html',
    styleUrls: ['./channeldata.component.scss'],
    animations: [routerTransition()]
})
export class ChanneldataComponent implements OnInit, OnDestroy {
    subs = new Subscription();
    noImageFound: string = "assets/images/noimage.png";
    imageToShow: any = this.noImageFound;
    isImageLoading: boolean;
    tab: string;
    loading: boolean;
    startDate: any;
    endDate: any;
    lastData: string;
    lastDate: Date;
    public dataSource: Datasource;
    labels: Date[] = [];
    feeds = new Collections.Dictionary<string, Series[]>();
    charts: any[];
    properties: string[];

    @Input() public channel: number;
    @ViewChild('dataCharts', { read: ViewContainerRef }) dataContainer;
    @ViewChild('metadataCharts', { read: ViewContainerRef }) metadataContainer;
    @ViewChild('fromPicker', { read: SdDatePickerComponent, }) fromPicker: SdDatePickerComponent;
    @ViewChild('toPicker', { read: SdDatePickerComponent }) toPicker: SdDatePickerComponent;
    private hubConnection: signalR.HubConnection;

    //dialogRef: MatDialogRef<CreateDataTypeComponent>;

    constructor(
        private datasourceService: DatasourceService,
        private sensorDataService: SensorDataService,
        private activatedRoute: ActivatedRoute,
        private componentFactoryResolver: ComponentFactoryResolver,
        private dataTypeService: DataTypeService,
    ) {
        this.charts = [];
    }


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
        this.switchTab('data');

        this.activatedRoute.params.subscribe(params => {
            this.channel = params['id'];
        });

        this.hubConnection = new signalR.HubConnectionBuilder()
            .withUrl(`${environment.services.sensorDataService.host}/sensordatahub`)
            .build();

        this.hubConnection.start()
            .then(() => console.log("Connection started"))
            .catch(err => console.log('Error while starting connection: ' + err));

        this.hubConnection.on('SensorData', (data) => {
            if (typeof data.payload === "string") {
                data.payload = JSON.parse(data.payload);
            }
            console.log(`${data.deviceId}:${JSON.stringify(data.payload)}`);

            if (data.deviceId === this.dataSource.DeviceId) {
                console.log(`${data.deviceId}:${JSON.stringify(data.payload)}`);
                this.lastData = data.timeStamp.toString();
                this.labels.push(data.timeStamp);
                for (let graph of this.charts) {
                    graph.addDatapoint(data);
                }
            }
            else {
                console.debug(`Data received for deviceId ${data.deviceId} and discarded as currently deviceId ${this.dataSource.DeviceId} is selected`);
            }
        })

    }

    ngOnDestroy(): void {
        console.log("SignalR unsubscribed");
        this.hubConnection.stop();
        this.subs.unsubscribe();
    }

    public dataSourceChanged(dataSource: Datasource): void {
        //this.subs.unsubscribe();
        this.dataSource = dataSource;
        this.sensorDataService.getMostRecent(this.dataSource.DeviceId).subscribe(res => {
            this.lastDate = new Date(res.TimeStamp);
            this.lastData = res.TimeStamp.toString();
            //nu weten we op welke dag de laatste dataset is binnen gekomen
            this.loadCharts();
        });


        this.subs.add(this.datasourceService.getDataSourceImageById(this.dataSource.DeviceId).subscribe(
            data => {
                this.createImageFromBlob(data);
                this.isImageLoading = false;
            },
            error => {
                this.isImageLoading = false;
                this.imageToShow = this.noImageFound;
                if (error.status != 404) {
                    console.log(error);
                }
            }
        ));
    }

    switchTab(tab: string): void {
        this.tab = tab;
    }

    private convertToString(value: NgbDateStruct): string {
        if (!value) return null;
        let month = value.month.toString();
        if (month.length === 1) {
            month = `0${month}`;
        }

        let day = value.day.toString();
        if (day.length === 1) {
            day = `0${day}`;
        }
        return `${value.year}-${month}-${day}`;
    }
    private loadCharts() {
        // this.dialogRef = this.dialog.open(CreateDataTypeComponent,
        //     {
        //       data: { datasource: ds, title: "aap" },
        //       //   position: {top: '-100', left: '-100'},
        //       width: "600px"
        //     });
        //   this.dialogRef.afterClosed().subscribe((res) => {
        //     if (res) {
        //       this.loadDataTypes();
        //     }
        //   });


        this.labels = [];
        this.charts = [];

        console.log('voor call: startDate: ' + this.startDate + ', endDate: ' + this.endDate);
        // this.subs.add(this.sensorDataService.getMostRecent(this.dataSource.DeviceId).subscribe(res => {
        //     this.lastData = res.TimeStamp.toString();
        // }));


        this.subs.add(this.dataTypeService.getById(this.dataSource.DataTypeId).subscribe(dataType => {
            this.properties = dataType.Properties.split(',');

            //loading chart data
            let startDate = this.convertToString(this.fromPicker.model);
            let endDate = this.convertToString(this.toPicker.model);
            console.log("getting data");
            if (!startDate && !endDate) {
                console.log(this.lastDate);
               // return `${this.lastDate.getFullYear()}-${this.lastDate.getMonth()}-${this.lastDate.getDay()}`;
                //startDate = new Date(this.lastDate.getFullYear(), this.lastDate.getMonth(), this.lastDate.getDay()).toString('yyyy');
                startDate = this.lastDate.toISOString().split('T')[0]
                //startDate = this.lastDate.getDate().toString();
            }
            this.subs.add(this.sensorDataService.getData(this.dataSource.DeviceId, startDate, endDate).subscribe(res => {

                //create the feeds
                for (let property of this.properties) {
                    this.feeds.setValue(property, []);
                }

                //push the data on the correct feed
                for (let item of res) {
                    let payload = JSON.parse(item.Payload);
                    this.publishData(item.TimeStamp, payload, this.properties);
                    // let payload = JSON.parse(item.Payload);

                    for (let property of this.properties) {
                        let feed = this.feeds.getValue(property);
                        let value = payload.hasOwnProperty(property) ? payload[property] : 0;
                        feed.push(value);
                    }

                    this.labels.push(item.TimeStamp);
                };

                //create a graph for each feed
                const factory = this.componentFactoryResolver.resolveComponentFactory(SensorDataChartComponent);
                this.dataContainer.clear();
                this.metadataContainer.clear();

                for (let property of this.properties) {
                    let feed = this.feeds.getValue(property);
                    if (["Voltage", "RSSI"].indexOf(property) > -1) {
                        const ref = this.metadataContainer.createComponent(factory);
                        this.AddGraph(ref, property, feed, this.labels, this.dataSource.DeviceId);
                    }
                    else {
                        const ref = this.dataContainer.createComponent(factory);
                        this.AddGraph(ref, property, feed, this.labels, this.dataSource.DeviceId);
                    }
                }
                this.loading = false;
            }, err => {
                return null;
            },
                () => {
                    console.log('channel data loaded');
                    //this.showSpinner = false;
                    this.loading = false;
                }));
        }));
    }

    private publishData(timestamp: Date, payload: any, properties: string[]): void {


        // for (let property of properties) {
        //     let feed: Series[] = this.feeds.getValue(property);
        //     let value = payload.hasOwnProperty(property) ? payload[property] : 0;
        //     if (feed.length == 0) {
        //         feed.push(new Series(property, []));
        //     }
        //     feed[0].data.push(value);
        // }

        // this.labels.push(timestamp);
    }

    private AddGraph(ref: any, key: string, data: Series[], labels: any[], deviceId: string): void {
        let instance = (<SensorDataChartComponent>ref.instance);
        instance.feed = key;
        instance.values = data;
        //instance.lineChartData = data;
        instance.lineChartLabels = labels;
        instance.datasource = deviceId;
        this.charts.push(instance);
    }

    public refresh(): void {

        for (let chart of this.charts) {
            chart.loading = true;
        }

        this.loading = true;

        this.loadCharts();
    }
}
