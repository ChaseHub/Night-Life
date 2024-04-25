import { TestBed } from '@angular/core/testing';
import { ValidationService } from './validation.service';

describe('ValidationService', () => {
  let service: ValidationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ValidationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should validate email correctly', () => {
    expect(service.isValidEmail('test@example.com')).toBeTrue();
    expect(service.isValidEmail('invalid-email')).toBeFalse();
  });

  it('should validate password correctly', () => {
    expect(service.isValidPassword('Password123')).toBeTrue();
    expect(service.isValidPassword('weakpass')).toBeFalse();
    expect(service.isValidPassword('ALLCAPS')).toBeFalse();
    expect(service.isValidPassword('nocaps123')).toBeFalse();
    expect(service.isValidPassword('NoNumbers')).toBeFalse();
    expect(service.isValidPassword('Sh0rt')).toBeFalse();
  });
});
