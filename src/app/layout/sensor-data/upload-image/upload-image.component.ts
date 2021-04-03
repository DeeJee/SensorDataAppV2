import { Component, OnInit, Input } from '@angular/core';
import { UploadImageService } from '../services/upload-image.service';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { DatasourceService } from '../services/datasource.service';

@Component({
  selector: 'app-upload-image',
  templateUrl: './upload-image.component.html',
  styleUrls: ['./upload-image.component.scss'],
  providers: [UploadImageService]
})
export class UploadImageComponent implements OnInit {
  noImageFound: string = "assets/images/noimage.png";
  imageToShow: any = this.noImageFound;
  error: string = null;
  fileToUpload: File;

  constructor(
    private imageService: UploadImageService,
    private activatedRoute: ActivatedRoute,
    private datasourceService: DatasourceService,
    private location: Location) { }

  @Input()
  deviceId: string;

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      this.deviceId = params['id'];
      this.datasourceService.getDataSourceImageById(this.deviceId).subscribe(data => {
        this.createImageFromBlob(data);
      }, err => {
        this.imageToShow = this.noImageFound;
      });

    });
  }

  handleFileInput(file: FileList) {
    this.fileToUpload = file.item(0);

    var reader = new FileReader();
    reader.onload = (event: any) => {
      this.imageToShow = event.target.result;
    }
    reader.readAsDataURL(this.fileToUpload);

    this.OnSubmit(this.fileToUpload);    
  }

  OnSubmit(Image) {
    this.imageService.postFile(this.deviceId, this.fileToUpload).subscribe(
      data => {
        console.log("Upload complete");
        Image.value = null;
      },
      err=>{
        this.error=err.error.ExceptionMessage;
      }
    );
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
}
