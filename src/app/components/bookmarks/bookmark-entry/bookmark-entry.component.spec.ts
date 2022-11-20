import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookmarkEntryComponent } from './bookmark-entry.component';

describe('BookmarkEntryComponent', () => {
  let component: BookmarkEntryComponent;
  let fixture: ComponentFixture<BookmarkEntryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BookmarkEntryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BookmarkEntryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
