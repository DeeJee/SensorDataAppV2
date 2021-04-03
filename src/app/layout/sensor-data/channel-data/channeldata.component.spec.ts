import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChanneldataComponent } from './channeldata.component';
import { Component } from '@angular/core';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FakeDatasourceService } from '../../../shared/fakes/FakeDatasourceService';
import { FakeSensorDataService } from '../../../shared/fakes/FakeSensorDataService';
import { SensorDataService } from '../services/sensordata.service';
import { DatasourceService } from '../services/datasource.service';
import { RouterTestingModule } from '@angular/router/testing';
import { DataTypeService } from '../services/datatype.service';
import { FakeDataTypeService } from '../../../shared/fakes/FakeDataTypeService';

@Component({
    template: '<div>This is the page header</div>',
    selector: 'app-page-header'
})
class FakePageHeader { }

describe('ChanneldataComponent', () => {
    let component: ChanneldataComponent;
    let fixture: ComponentFixture<ChanneldataComponent>;

    beforeEach(
        async(() => {
            TestBed.configureTestingModule({
                imports: [
                    HttpClientTestingModule,
                    RouterTestingModule
                ],
                providers: [
                    { provide: DatasourceService, useClass: FakeDatasourceService },
                    { provide: SensorDataService, useClass: FakeSensorDataService },
                    { provide: DataTypeService, useClass: FakeDataTypeService }
                ],
                declarations: [
                    ChanneldataComponent,
                    FakePageHeader
                ]
            }).compileComponents();
        })
    );

    beforeEach(() => {
        fixture = TestBed.createComponent(ChanneldataComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
