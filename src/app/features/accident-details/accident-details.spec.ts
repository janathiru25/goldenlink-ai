import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AccidentDetails } from './accident-details';

describe('AccidentDetails', () => {
  let component: AccidentDetails;
  let fixture: ComponentFixture<AccidentDetails>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AccidentDetails],
    }).compileComponents();

    fixture = TestBed.createComponent(AccidentDetails);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
