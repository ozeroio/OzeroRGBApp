import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ColorSegmentListComponent} from './fire-segment-list.component';

describe('ColorSegmentListComponent', () => {
	let component: ColorSegmentListComponent;
	let fixture: ComponentFixture<ColorSegmentListComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [ColorSegmentListComponent]
		})
			.compileComponents();

		fixture = TestBed.createComponent(ColorSegmentListComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
