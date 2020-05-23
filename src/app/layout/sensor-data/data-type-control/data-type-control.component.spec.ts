import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DataTypeControlComponent } from './data-type-control.component';
import { FormsModule } from '@angular/forms';

describe('DataTypeControlComponent', () => {
  let component: DataTypeControlComponent;
  let fixture: ComponentFixture<DataTypeControlComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule],
      declarations: [DataTypeControlComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DataTypeControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
