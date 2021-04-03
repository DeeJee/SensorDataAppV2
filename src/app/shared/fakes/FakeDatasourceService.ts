import { of } from "rxjs";

export class FakeDatasourceService{
    public getDataSources(){
        return of([]);
    }

    public getDataSourceImageById(){
        return of([]);
    }

    public getDataSourceById(){
        return of([]);
    }
}