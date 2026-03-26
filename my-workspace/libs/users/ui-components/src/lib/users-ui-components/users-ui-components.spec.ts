import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UsersUiComponents } from './users-ui-components';

describe('UsersUiComponents', () => {
  let component: UsersUiComponents;
  let fixture: ComponentFixture<UsersUiComponents>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UsersUiComponents],
    }).compileComponents();

    fixture = TestBed.createComponent(UsersUiComponents);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
