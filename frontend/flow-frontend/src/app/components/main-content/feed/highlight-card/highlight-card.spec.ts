import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HighlightCard } from './highlight-card';

describe('HighlightCard', () => {
  let component: HighlightCard;
  let fixture: ComponentFixture<HighlightCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HighlightCard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HighlightCard);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
