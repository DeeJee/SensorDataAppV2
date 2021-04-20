import { Component, OnInit } from '@angular/core';
//import { AdalService } from 'adal-angular4/adal.service';
import { environment } from '../environments/environment';
import { AuthService } from './services/auth.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
    constructor(private authService:AuthService) {
    }

    ngOnInit(): void {
        this.authService.updateLoggedInStatus();
        //this.authService.login();
      }

      login() {
        this.authService.login();
      }

      logout() {
        this.authService.logout();
      }
}
