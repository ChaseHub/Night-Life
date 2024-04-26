import { Injectable } from '@angular/core';
import { LocationType, PlanLocation, Role } from 'src/app/services/database/plan.service';


@Injectable({
  providedIn: 'root'
})
export class ValidationService {
  constructor() { }

  isValidEmail(email: string): boolean {
    // Regex for email validation
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  }

  isValidPassword(password: string): boolean {
    // Password validation rules
    const minLength = 8;
    const hasUppercase = /[A-Z]/.test(password);
    const hasLowercase = /[a-z]/.test(password);
    const hasNumber = /[0-9]/.test(password);

    return password.length >= minLength && hasUppercase && hasLowercase && hasNumber;
  }

  /**
   * @param planName
   * Validates a plan name based on length and character content.
   */
  isValidPlanName(planName: string): boolean {
    // Check if the plan name is not empty, has a maximum length of 32 characters, and contains no special characters
    const validPattern = /^[a-zA-Z0-9 ]*$/; // Allow only alphanumeric characters and spaces
    return planName.trim().length > 0 && planName.length <= 32 && validPattern.test(planName.trim());
  }

  isValidLocationName(name: string): boolean {
    // Check if the location name is not empty and has a minimum length
    return name.trim().length > 0;
  }

  isValidLatLng(lat: number, lng: number): boolean {
    // Check if the latitude and longitude are within valid ranges
    return lat >= -90 && lat <= 90 && lng >= -180 && lng <= 180;
  }

  isValidDate(date: string): boolean {
    // Check if the date is a valid ormat (YYYY-MM-DDTHH:mm:ss)
    const isoDateRegex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}$/;
    return isoDateRegex.test(date);
  }

  isValidDateRange(startDate: string, endDate: string): boolean {
    if (!this.isValidDate(startDate) || !this.isValidDate(endDate)) {
      return false;
    }

    const start = new Date(startDate);
    const end = new Date(endDate);
    return end >= start;
  }

  isValidLocationOrder(order: number, maxLocations: number): boolean {
    return Number.isInteger(order) && order >= 0 && order <= maxLocations;
  }

  isValidRole(role: string): boolean {
    return Object.values(Role).includes(role as Role);
  }

  isValidUid(uid: string): boolean {
    return typeof uid === 'string' && uid.trim().length > 0;
  }

  isValidMember(member: { role: Role; uid: string }): boolean {
    return this.isValidRole(member.role) && this.isValidUid(member.uid);
  }

  /**
   * @param location
   * fix errors regarding location object, addLocation in plan.service.ts
  isValidLocation(location: Location): boolean {
    return (
      typeof location.id === 'string' &&
      location.id.trim().length > 0 &&
      typeof location.name === 'string' &&
      location.name.trim().length > 0 &&
      typeof location.lng === 'number' &&
      typeof location.lat === 'number' &&
      Object.values(LocationType).includes(location.type)
    );
  }

  isValidPlanLocation(location: PlanLocation): boolean {
    return (
      this.isValidLocation(location.location) &&
      this.isValidUid(location.addedBy) &&
      this.isValidDate(location.addedDate) &&
      this.isValidDate(location.startDate) &&
      this.isValidDate(location.endDate) &&
      this.isValidLocationOrder(location.orderNum, Number.MAX_SAFE_INTEGER) &&
      Array.isArray(location.attending) &&
      location.attending.every(uid => this.isValidUid(uid))
    );
  }
    */

  isValidUserLocation(userLocation: { uid: string; lat: number; lng: number }): boolean {
    return (
      this.isValidUid(userLocation.uid) &&
      typeof userLocation.lat === 'number' &&
      typeof userLocation.lng === 'number'
    );
  }



}
