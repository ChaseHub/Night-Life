import { Injectable } from '@angular/core';
import { UsernameService } from '../database/username.service';
import { Observable, forkJoin, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class InputValidationService {

  constructor(private usernameService: UsernameService) { }

  /**
   * Validates email and password inputs.
   * 
   * @param email The email input from the user.
   * @param password The password input from the user.
   * @returns An object containing validation results and messages.
   */
  validateLoginInputs(email: string, password: string): { isValid: boolean, errors: string[] } {
    const errors: string[] = [];

    // Email validation
    if (!email) {
      errors.push('Email is required.');
    } else if (!this.validateEmail(email)) {
      errors.push('Email is invalid.');
    }

    // Password validation
    if (!password) {
      errors.push('Password is required.');
    } else if (!this.validatePassword(password)) {
      errors.push('Password must be at least 6 characters long and include at least one number');
    }

    return {
      isValid: errors.length === 0,
      errors: errors
    };
  }

  validateEmailInput(email: string): { isValid: boolean, errors: string[] } {
    const errors: string[] = [];
  
    // Email validation
    if (!email) {
      errors.push('Email is required.');
    } else if (!this.validateEmail(email)) {
      errors.push('Email is invalid.');
    }
  
    return {
      isValid: errors.length === 0,
      errors: errors
    };
  }

  validateRegistrationInputs(email: string, password: string, username: string): { isValid: boolean, errors: string[] } {
    const errors: string[] = [];

    // Validate email
    if (!email) {
      errors.push('Email is required.');
    } else if (!this.validateEmail(email)) {
      errors.push('Email is invalid.');
    }

    // Validate password
    if (!password) {
      errors.push('Password is required.');
    } else if (!this.validatePassword(password)) {
      errors.push('Password must be at least 6 characters long and include at least one number');
    }

    return {
      isValid: errors.length === 0,
      errors: errors
    };
  }


  /**
   * Validates the format of the given email.
   * 
   * @param email The email to validate.
   * @returns true if the email is valid, false otherwise.
   */
  private validateEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  /**
   * Validates the password strength and requirements.
   * 
   * @param password The password to validate.
   * @returns true if the password meets the criteria, false otherwise.
   */
  private validatePassword(password: string): boolean {
    const passwordRegex = /^(?=.*\d)[a-zA-Z\d]{6,}$/;
    return passwordRegex.test(password);
  }
}
