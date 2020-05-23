import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UploadImageService {
  host: string;
  baseUrl: string;

  constructor(private http: HttpClient) {
    this.host = environment.services.sensorDataService.host;
    this.baseUrl = environment.services.sensorDataService.baseUrl;
  }

  postFile(deviceId: string, fileToUpload: File) {
    let endpoint = `${this.host}${this.baseUrl}/DataSource/UploadImage`;
    
    const formData: FormData = new FormData();
    formData.append('image', fileToUpload, fileToUpload.name);
    formData.append('id', deviceId);
    return this.http.post(endpoint, formData);
  }
}
