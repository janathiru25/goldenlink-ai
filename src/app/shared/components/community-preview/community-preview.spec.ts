import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CommunityPreview } from './community-preview';

describe('CommunityPreview', () => {
  let component: CommunityPreview;
  let fixture: ComponentFixture<CommunityPreview>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommunityPreview],
    }).compileComponents();

    fixture = TestBed.createComponent(CommunityPreview);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
