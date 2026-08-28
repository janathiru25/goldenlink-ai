import { ComponentFixture, TestBed } from '@angular/core/testing';
import { WhyGoldenlink } from './why-goldenlink';

describe('WhyGoldenlink', () => {
  let component: WhyGoldenlink;
  let fixture: ComponentFixture<WhyGoldenlink>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WhyGoldenlink],
    }).compileComponents();

    fixture = TestBed.createComponent(WhyGoldenlink);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
