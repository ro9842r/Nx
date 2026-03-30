import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { CountryStrategyList } from './country-strategy-list';

describe('CountryStrategyList', () => {
  let component: CountryStrategyList;
  let fixture: ComponentFixture<CountryStrategyList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CountryStrategyList],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(CountryStrategyList);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
