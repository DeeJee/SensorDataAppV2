import { of } from "rxjs";

export class FakeSensorDataService 
{
    getMostRecent(id:number){
        return of([]);
    }
}