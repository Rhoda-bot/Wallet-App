import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WalletCardsComponent } from './wallet-cards.component';

describe('WalletCardsComponent', () => {
  let component: WalletCardsComponent;
  let fixture: ComponentFixture<WalletCardsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WalletCardsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WalletCardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
