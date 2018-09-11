import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';

import { HttpHeaders, HttpClient } from '@angular/common/http';
import { DataType } from '../../models/DataType';
import { environment } from '../../../../environments/environment';

@Injectable()
export class DataTypeService {
    host: string;
    baseUrl: string;

    constructor(private http: HttpClient) {
        this.host = environment.services.sensorDataService.host;
        this.baseUrl = environment.services.sensorDataService.baseUrl;
     }

    public get(): Observable<DataType[]> {
        let url = this.host + "/api/DataTypes";
        console.debug('url: ' + url);
        return this.http.get<DataType[]>(url);
    }

    public getById(id:number): Observable<DataType> {
        let url = this.host + "/api/DataTypes/" + id;
        console.debug('url: ' + url);
        return this.http.get <DataType>(url);
    }

    public create(dataType: DataType): Observable<DataType> {
        let url = this.host + "/api/DataTypes/";
        console.log("Posting data to " + url);
        let headers = new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' });

        let options = { headers: headers };
        return this.http.post<DataType> (url, dataType, options);
            //.map(res=> dataType).catch(this.handleError);
    }

    private handleError(error: Response) {
        console.error(error);
        return Observable.throw(error || 'Server error');
    }
}