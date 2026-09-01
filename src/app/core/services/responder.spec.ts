import { TestBed } from '@angular/core/testing';
import { Responder } from './responder';

describe('Responder', () => {
  let service: Responder;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Responder);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
