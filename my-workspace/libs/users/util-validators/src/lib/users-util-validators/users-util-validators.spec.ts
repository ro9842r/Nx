import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UsersUtilValidators } from './users-util-validators';

describe('UsersUtilValidators', () => {
  let component: UsersUtilValidators;
  let fixture: ComponentFixture<UsersUtilValidators>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UsersUtilValidators],
    }).compileComponents();

    fixture = TestBed.createComponent(UsersUtilValidators);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
