import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChanneldataComponent } from './channeldata.component';
import { Component } from '@angular/core';

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
