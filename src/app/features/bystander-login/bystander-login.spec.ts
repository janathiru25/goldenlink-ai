import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BystanderLogin } from './bystander-login';

describe('BystanderLogin', () => {
  let component: BystanderLogin;
  let fixture: ComponentFixture<BystanderLogin>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BystanderLogin],
    }).compileComponents();

    fixture = TestBed.createComponent(BystanderLogin);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
