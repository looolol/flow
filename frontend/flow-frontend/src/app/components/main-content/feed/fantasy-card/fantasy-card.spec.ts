import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FantasyCard } from './fantasy-card';

describe('FantasyCard', () => {
  let component: FantasyCard;
  let fixture: ComponentFixture<FantasyCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FantasyCard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FantasyCard);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
