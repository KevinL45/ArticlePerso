import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddGalleryComponent } from './add-gallery.component';

describe('AddGalleryComponent', () => {
  let component: AddGalleryComponent;
  let fixture: ComponentFixture<AddGalleryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddGalleryComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddGalleryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
