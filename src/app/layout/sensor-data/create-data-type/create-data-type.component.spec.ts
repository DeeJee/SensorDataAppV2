import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateDataTypeComponent } from './create-data-type.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FakeMatDialogRef } from '../../../shared/fakes/FakeMatDialogRef';
import { MatLegacyDialogRef as MatDialogRef } from '@angular/material/legacy-dialog';

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
