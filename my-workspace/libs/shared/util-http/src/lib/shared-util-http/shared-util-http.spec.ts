import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SharedUtilHttp } from './shared-util-http';

describe('SharedUtilHttp', () => {
  let component: SharedUtilHttp;
  let fixture: ComponentFixture<SharedUtilHttp>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SharedUtilHttp],
    }).compileComponents();

    fixture = TestBed.createComponent(SharedUtilHttp);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
