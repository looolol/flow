import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Env } from './env';

describe('Env', () => {
  let component: Env;
  let fixture: ComponentFixture<Env>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Env]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Env);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
