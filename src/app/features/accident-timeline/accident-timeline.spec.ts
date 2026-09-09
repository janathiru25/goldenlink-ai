import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AccidentTimeline } from './accident-timeline';

describe('AccidentTimeline', () => {
  let component: AccidentTimeline;
  let fixture: ComponentFixture<AccidentTimeline>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AccidentTimeline],
    }).compileComponents();

    fixture = TestBed.createComponent(AccidentTimeline);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
