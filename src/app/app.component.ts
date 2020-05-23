import { Component, OnInit } from '@angular/core';
//import { AdalService } from 'adal-angular4/adal.service';
import { environment } from '../environments/environment';
import { MsAdalAngular6Module } from 'microsoft-adal-angular6';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
    constructor(private adalService:MsAdalAngular6Module) {
    }

    ngOnInit() {
        //this.adalService.init(environment.adalConfig);
        //this.adalService.handleWindowCallback();
    }
}
