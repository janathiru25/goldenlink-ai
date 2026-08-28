import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReportAccident } from './report-accident';

describe('ReportAccident', () => {
  let component: ReportAccident;
  let fixture: ComponentFixture<ReportAccident>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReportAccident],
    }).compileComponents();

    fixture = TestBed.createComponent(ReportAccident);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
