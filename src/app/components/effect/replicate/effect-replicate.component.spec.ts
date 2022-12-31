import {ComponentFixture, TestBed} from '@angular/core/testing';

import {EffectReplicateComponent} from './effect-replicate.component';

describe('BookmarkReplicateComponent', () => {
	let component: EffectReplicateComponent;
	let fixture: ComponentFixture<EffectReplicateComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [EffectReplicateComponent]
		})
			.compileComponents();

		fixture = TestBed.createComponent(EffectReplicateComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
