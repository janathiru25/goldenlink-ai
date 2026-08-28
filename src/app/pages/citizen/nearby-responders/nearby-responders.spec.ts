import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NearbyResponders } from './nearby-responders';

describe('NearbyResponders', () => {
  let component: NearbyResponders;
  let fixture: ComponentFixture<NearbyResponders>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NearbyResponders],
    }).compileComponents();

    fixture = TestBed.createComponent(NearbyResponders);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
