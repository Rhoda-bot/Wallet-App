import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllhistoryComponent } from './allhistory.component';

describe('AllhistoryComponent', () => {
  let component: AllhistoryComponent;
  let fixture: ComponentFixture<AllhistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllhistoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AllhistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
