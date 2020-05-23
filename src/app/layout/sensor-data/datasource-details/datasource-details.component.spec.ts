import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DatasourceDetailsComponent } from './datasource-details.component';
import { ActivatedRoute } from '@angular/router';
import { FakeActivatedRoute } from '../../../shared/fakes/FakeActivatedRoute';
import { DatasourceService } from '../services/datasource.service';
import { FakeDatasourceService } from '../../../shared/fakes/FakeDatasourceService';
import { DataTypeService } from '../services/datatype.service';

describe('DatasourceDetailsComponent', () => {
  let component: DatasourceDetailsComponent;
  let fixture: ComponentFixture<DatasourceDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DatasourceDetailsComponent],
      providers: [
        { provide: ActivatedRoute, useClass: FakeActivatedRoute },
        { provide: DatasourceService, useClass: FakeDatasourceService },
        { provide: DataTypeService, useClass: FakeDatasourceService }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DatasourceDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
