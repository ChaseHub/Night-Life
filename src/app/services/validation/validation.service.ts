import { Injectable } from '@angular/core';

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


}
