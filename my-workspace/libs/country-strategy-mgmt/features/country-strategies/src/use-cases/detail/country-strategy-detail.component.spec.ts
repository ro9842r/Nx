import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { CountryStrategyDetail } from './country-strategy-detail.component';

describe('CountryStrategyDetail', () => {
  let component: CountryStrategyDetail;
  let fixture: ComponentFixture<CountryStrategyDetail>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CountryStrategyDetail],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              paramMap: {
                get: (key: string) => (key === 'id' ? '64' : null),
              },
            },
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(CountryStrategyDetail);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
