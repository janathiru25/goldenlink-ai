import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EmergencyCta } from './emergency-cta';

describe('EmergencyCta', () => {
  let component: EmergencyCta;
  let fixture: ComponentFixture<EmergencyCta>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmergencyCta],
    }).compileComponents();

    fixture = TestBed.createComponent(EmergencyCta);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
