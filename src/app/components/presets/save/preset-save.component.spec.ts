import {ComponentFixture, TestBed} from '@angular/core/testing';

import {PresetSaveComponent} from './preset-save.component';

describe('BookmarkEditComponent', () => {
	let component: PresetSaveComponent;
	let fixture: ComponentFixture<PresetSaveComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [PresetSaveComponent]
		})
			.compileComponents();

		fixture = TestBed.createComponent(PresetSaveComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
