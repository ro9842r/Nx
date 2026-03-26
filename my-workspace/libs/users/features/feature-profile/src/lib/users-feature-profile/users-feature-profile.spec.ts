import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UsersFeatureProfile } from './users-feature-profile';

describe('UsersFeatureProfile', () => {
  let component: UsersFeatureProfile;
  let fixture: ComponentFixture<UsersFeatureProfile>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UsersFeatureProfile],
    }).compileComponents();

    fixture = TestBed.createComponent(UsersFeatureProfile);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
