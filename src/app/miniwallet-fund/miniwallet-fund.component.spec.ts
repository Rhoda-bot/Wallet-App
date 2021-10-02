import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MiniwalletFundComponent } from './miniwallet-fund.component';

describe('MiniwalletFundComponent', () => {
  let component: MiniwalletFundComponent;
  let fixture: ComponentFixture<MiniwalletFundComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MiniwalletFundComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MiniwalletFundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
