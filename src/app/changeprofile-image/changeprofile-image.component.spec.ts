import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangeprofileImageComponent } from './changeprofile-image.component';

describe('ChangeprofileImageComponent', () => {
  let component: ChangeprofileImageComponent;
  let fixture: ComponentFixture<ChangeprofileImageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChangeprofileImageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangeprofileImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
