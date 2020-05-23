import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DatasourceManagementComponent } from './datasource-management.component';
import { LoadingSpinnerComponent } from '../../../shared/modules/loading-spinner/loading-spinner.component';
import { FormsModule } from '@angular/forms';
import { Component } from '@angular/core';
import { DatasourceService } from '../services/datasource.service';
import { FakeDatasourceService } from '../../../shared/fakes/FakeDatasourceService';
import { RouterTestingModule } from '@angular/router/testing';

@Component({
  selector: 'app-loading-spinner',
  template: 'loadingspinner'
})
class LoadingSpinnerComponentMock { }

describe('DatasourceManagementComponent', () => {
  let component: DatasourceManagementComponent;
  let fixture: ComponentFixture<DatasourceManagementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule,
        RouterTestingModule
      ],
      declarations: [
        DatasourceManagementComponent,
        LoadingSpinnerComponentMock,
        LoadingSpinnerComponent
      ],
      providers: [
        { provide: DatasourceService, useClass: FakeDatasourceService }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DatasourceManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
