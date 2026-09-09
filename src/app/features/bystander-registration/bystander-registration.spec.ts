import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BystanderRegistration } from './bystander-registration';

describe('BystanderRegistration', () => {
  let component: BystanderRegistration;
  let fixture: ComponentFixture<BystanderRegistration>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BystanderRegistration],
    }).compileComponents();

    fixture = TestBed.createComponent(BystanderRegistration);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
