import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateDataTypeComponent } from './create-data-type.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatDialogRef } from '@angular/material';
import { FakeMatDialogRef } from '../../../shared/fakes/FakeMatDialogRef';

describe('CreateDataTypeComponent', () => {
  let component: CreateDataTypeComponent;
  let fixture: ComponentFixture<CreateDataTypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [CreateDataTypeComponent],
      providers: [
        { provide: MatDialogRef, useClass: FakeMatDialogRef }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateDataTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
