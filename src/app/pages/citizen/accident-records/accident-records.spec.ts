import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AccidentRecords } from './accident-records';

describe('AccidentRecords', () => {
  let component: AccidentRecords;
  let fixture: ComponentFixture<AccidentRecords>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AccidentRecords],
    }).compileComponents();

    fixture = TestBed.createComponent(AccidentRecords);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
