import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SharedInterfaces } from './shared-interfaces';

describe('SharedInterfaces', () => {
  let component: SharedInterfaces;
  let fixture: ComponentFixture<SharedInterfaces>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SharedInterfaces],
    }).compileComponents();

    fixture = TestBed.createComponent(SharedInterfaces);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
