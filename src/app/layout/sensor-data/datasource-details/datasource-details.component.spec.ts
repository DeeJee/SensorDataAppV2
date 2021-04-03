import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DatasourceDetailsComponent } from './datasource-details.component';
import { ActivatedRoute } from '@angular/router';
import { FakeActivatedRoute } from '../../../shared/fakes/FakeActivatedRoute';
import { DatasourceService } from '../services/datasource.service';
import { FakeDatasourceService } from '../../../shared/fakes/FakeDatasourceService';
import { DataTypeService } from '../services/datatype.service';
import { RouterTestingModule } from '@angular/router/testing';
import { SensorDataService } from '../services/sensordata.service';
import { FakeSensorDataService } from '../../../shared/fakes/FakeSensorDataService';
import { of } from 'rxjs';

describe('DatasourceDetailsComponent', () => {
  let component: DatasourceDetailsComponent;
  let fixture: ComponentFixture<DatasourceDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [DatasourceDetailsComponent],
      providers: [
        {
          provide: ActivatedRoute, useValue: {
            params: of({ id: 123 })
          }
        },
        { provide: DatasourceService, useClass: FakeDatasourceService },
        { provide: DataTypeService, useClass: FakeDatasourceService },
        { provide: SensorDataService, useClass: FakeSensorDataService }
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
