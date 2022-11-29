import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ColorSegmentComponent} from './color-segment.component';

describe('ColorSegmentComponent', () => {
    let component: ColorSegmentComponent;
    let fixture: ComponentFixture<ColorSegmentComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [ColorSegmentComponent]
        })
            .compileComponents();

        fixture = TestBed.createComponent(ColorSegmentComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
