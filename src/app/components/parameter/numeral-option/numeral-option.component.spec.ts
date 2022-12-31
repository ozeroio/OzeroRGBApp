import {ComponentFixture, TestBed} from '@angular/core/testing';

import {NumeralOptionComponent} from './numeral-option.component';

describe('RangeComponent', () => {
	let component: NumeralOptionComponent;
	let fixture: ComponentFixture<NumeralOptionComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [NumeralOptionComponent]
		})
			.compileComponents();

		fixture = TestBed.createComponent(NumeralOptionComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
