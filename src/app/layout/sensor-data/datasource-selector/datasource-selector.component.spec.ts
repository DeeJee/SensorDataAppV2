import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { DataSourceSelectorComponent } from './datasource-selector.component';
import { DatasourceService } from '../services/datasource.service';
import { FakeDatasourceService } from '../../../shared/fakes/FakeDatasourceService';

describe('DatasourceSelectorComponent', () => {
  let component: DataSourceSelectorComponent;
  let fixture: ComponentFixture<DataSourceSelectorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DataSourceSelectorComponent],
      providers: [
        { provide: DatasourceService, useClass: FakeDatasourceService }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DataSourceSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
