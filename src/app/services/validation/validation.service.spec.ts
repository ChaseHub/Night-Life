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

  it('should validate plan name correctly', () => {
    expect(service.isValidPlanName('test')).toBeTrue()
    expect(service.isValidPlanName('')).toBeFalse()
    expect(service.isValidPlanName('test-plans')).toBeFalse()
  })

  it('should validate location name correctly', () => {
    expect(service.isValidLocationName('Central Park')).toBeTrue();
    expect(service.isValidLocationName('   Empire State Building  ')).toBeTrue();
    expect(service.isValidLocationName('Food Fair 2024')).toBeTrue();
    expect(service.isValidLocationName('')).toBeFalse();
    expect(service.isValidLocationName('  ')).toBeFalse();
  });

  it('should validate latitude and longitude correctly', () => {
    expect(service.isValidLatLng(40.7128, -74.0060)).toBeTrue();
    expect(service.isValidLatLng(0, 0)).toBeTrue();
    expect(service.isValidLatLng(-90, -180)).toBeTrue();
    expect(service.isValidLatLng(90, 180)).toBeTrue();
    expect(service.isValidLatLng(-91, 0)).toBeFalse();
    expect(service.isValidLatLng(91, 0)).toBeFalse();
    expect(service.isValidLatLng(0, -181)).toBeFalse();
    expect(service.isValidLatLng(0, 181)).toBeFalse();
  });
});
