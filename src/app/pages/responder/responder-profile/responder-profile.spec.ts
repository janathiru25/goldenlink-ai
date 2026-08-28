import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ResponderProfile } from './responder-profile';

describe('ResponderProfile', () => {
  let component: ResponderProfile;
  let fixture: ComponentFixture<ResponderProfile>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ResponderProfile],
    }).compileComponents();

    fixture = TestBed.createComponent(ResponderProfile);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
