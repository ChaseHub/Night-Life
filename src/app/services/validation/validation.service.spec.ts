import { TestBed } from '@angular/core/testing';
import { ValidationService } from './validation.service';
import { Location, LocationType, PlanLocation, Role } from 'src/app/services/database/plan.service';


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

  it('should validate ISO 8601 date format correctly', () => {
    expect(service.isValidDate('2023-04-15T12:00:00')).toBeTrue();
    expect(service.isValidDate('2023-04-15T12:00')).toBeFalse();
    expect(service.isValidDate('2023-04-15')).toBeFalse();
    expect(service.isValidDate('15-04-2023T12:00:00')).toBeFalse();
    expect(service.isValidDate('2023-04-15T25:00:00')).toBeFalse(); // Invalid hour
    expect(service.isValidDate('2023-04-15T12:60:00')).toBeFalse(); // Invalid minute
    expect(service.isValidDate('2023-04-15T12:00:60')).toBeFalse(); // Invalid second
  });

  it('should validate date ranges correctly', () => {
    expect(service.isValidDateRange('2023-04-15T12:00:00', '2023-04-16T12:00:00')).toBeTrue();
    expect(service.isValidDateRange('2023-04-15T12:00:00', '2023-04-15T12:00:00')).toBeTrue(); // Same start and end
    expect(service.isValidDateRange('2023-04-15T12:00:00', '2023-04-14T12:00:00')).toBeFalse(); // End before start
    expect(service.isValidDateRange('2023-04-15T12:00:00', 'invalid-date')).toBeFalse(); // Invalid end date
    expect(service.isValidDateRange('invalid-date', '2023-04-15T12:00:00')).toBeFalse(); // Invalid start date
  });

  it('should validate plan name correctly', () => {
    expect(service.isValidPlanName('Valid Plan Name')).toBeTrue();
    expect(service.isValidPlanName('  Short Name  ')).toBeTrue();
    expect(service.isValidPlanName('')).toBeFalse();
    expect(service.isValidPlanName('  ')).toBeFalse();
    expect(service.isValidPlanName('a'.repeat(101))).toBeFalse();
  });

  it('should validate date correctly', () => {
    expect(service.isValidDate('2023-06-08T10:30:00')).toBeTrue();
    expect(service.isValidDate('2023-06-08T10:30:00Z')).toBeFalse();
    expect(service.isValidDate('2023-06-08 10:30:00')).toBeFalse();
    expect(service.isValidDate('2023-06-08')).toBeFalse();
  });

  it('should validate date range correctly', () => {
    expect(service.isValidDateRange('2023-06-08T10:30:00', '2023-06-08T11:30:00')).toBeTrue();
    expect(service.isValidDateRange('2023-06-08T10:30:00', '2023-06-08T10:30:00')).toBeTrue();
    expect(service.isValidDateRange('2023-06-08T11:30:00', '2023-06-08T10:30:00')).toBeFalse();
    expect(service.isValidDateRange('2023-06-08T10:30:00', 'invalid-date')).toBeFalse();
    expect(service.isValidDateRange('invalid-date', '2023-06-08T10:30:00')).toBeFalse();
  });

  it('should validate location order correctly', () => {
    expect(service.isValidLocationOrder(0, 5)).toBeTrue();
    expect(service.isValidLocationOrder(3, 5)).toBeTrue();
    expect(service.isValidLocationOrder(5, 5)).toBeTrue();
    expect(service.isValidLocationOrder(-1, 5)).toBeFalse();
    expect(service.isValidLocationOrder(6, 5)).toBeFalse();
    expect(service.isValidLocationOrder(1.5, 5)).toBeFalse();
  });

  it('should validate role correctly', () => {
    expect(service.isValidRole(Role.Owner)).toBeTrue();
    expect(service.isValidRole(Role.CoOwner)).toBeTrue();
    expect(service.isValidRole(Role.Planner)).toBeTrue();
    expect(service.isValidRole(Role.Attendee)).toBeTrue();
    expect(service.isValidRole(Role.Invited)).toBeTrue();
    expect(service.isValidRole('invalid-role')).toBeFalse();
  });

  it('should validate uid correctly', () => {
    expect(service.isValidUid('valid-uid')).toBeTrue();
    expect(service.isValidUid('')).toBeFalse();
    expect(service.isValidUid('  ')).toBeFalse();
  });

  it('should validate member correctly', () => {
    expect(service.isValidMember({ role: Role.Owner, uid: 'valid-uid' })).toBeTrue();
    expect(service.isValidMember({ role: Role.Owner, uid: '' })).toBeFalse();
  });

  it('should validate plan location correctly', () => {
    const validLocation: Location = {
      id: 'valid-id',
      name: 'Valid Location',
      lng: 0,
      lat: 0,
      type: LocationType.Custom
    };
    const validPlanLocation: PlanLocation = {
      location: validLocation,
      locationID: 'valid-location-id',
      addedBy: 'valid-uid',
      addedDate: '2023-06-08T10:30:00',
      startDate: '2023-06-08T10:30:00',
      endDate: '2023-06-08T11:30:00',
      orderNum: 1,
      attending: ['valid-uid-1', 'valid-uid-2']
    };
    expect(service.isValidPlanLocation(validPlanLocation)).toBeTrue();

    const invalidLocation: Location = {
      id: '',
      name: '',
      lng: 0,
      lat: 0,
      type: 'invalid-type' as LocationType
    };
    const invalidPlanLocation: PlanLocation = {
      location: invalidLocation,
      locationID: '',
      addedBy: '',
      addedDate: 'invalid-date',
      startDate: 'invalid-date',
      endDate: 'invalid-date',
      orderNum: -1,
      attending: ['']
    };
    expect(service.isValidPlanLocation(invalidPlanLocation)).toBeFalse();
  });

  it('should validate user location correctly', () => {
    expect(service.isValidUserLocation({ uid: 'valid-uid', lat: 0, lng: 0 })).toBeTrue();
    expect(service.isValidUserLocation({ uid: '', lat: 0, lng: 0 })).toBeFalse();
    expect(service.isValidUserLocation({ uid: 'valid-uid', lat: '0' as any, lng: 0 })).toBeFalse();
    expect(service.isValidUserLocation({ uid: 'valid-uid', lat: 0, lng: '0' as any })).toBeFalse();
  });

  it('should validate location correctly', () => {
    const validLocation: Location = {
      id: 'valid-id',
      name: 'Valid Location',
      lng: 0,
      lat: 0,
      type: LocationType.Custom
    };
    expect(service.isValidLocation(validLocation)).toBeTrue();

    const invalidLocation: Location = {
      id: '',
      name: '',
      lng: '0' as any,
      lat: '0' as any,
      type: 'invalid-type' as LocationType
    };
    expect(service.isValidLocation(invalidLocation)).toBeFalse();
  });



});
