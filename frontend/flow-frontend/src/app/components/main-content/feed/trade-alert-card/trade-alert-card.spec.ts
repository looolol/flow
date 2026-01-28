import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TradeAlertCard } from './trade-alert-card';

describe('TradeAlertCard', () => {
  let component: TradeAlertCard;
  let fixture: ComponentFixture<TradeAlertCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TradeAlertCard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TradeAlertCard);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
