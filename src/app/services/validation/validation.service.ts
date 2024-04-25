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

  isValidPlanName(planName: string): boolean {
    // Check if the plan name is not empty and has a minimum length
    return planName.trim().length > 0;
  }

  // Add more validation functions as needed such as phone-number






}
