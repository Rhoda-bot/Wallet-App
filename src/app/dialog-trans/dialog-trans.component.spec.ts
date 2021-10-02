import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogTransComponent } from './dialog-trans.component';

describe('DialogTransComponent', () => {
  let component: DialogTransComponent;
  let fixture: ComponentFixture<DialogTransComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogTransComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogTransComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
