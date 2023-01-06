import {ComponentFixture, TestBed} from '@angular/core/testing';

import {FireSegmentComponent} from './fire-segment.component';

describe('FireSegmentComponent', () => {
	let component: FireSegmentComponent;
	let fixture: ComponentFixture<FireSegmentComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [FireSegmentComponent]
		})
			.compileComponents();

		fixture = TestBed.createComponent(FireSegmentComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
