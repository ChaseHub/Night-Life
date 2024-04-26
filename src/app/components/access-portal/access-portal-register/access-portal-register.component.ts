import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { IonList, IonLabel, IonItem, IonInput, IonIcon, IonButton } from "@ionic/angular/standalone";
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { UserService } from 'src/app/services/database/user.service';
import { UsernameService } from 'src/app/services/database/username.service';
import { InputValidationService } from 'src/app/services/validation/input-validation.service';

@Component({
  selector: 'app-access-portal-register',
  templateUrl: './access-portal-register.component.html',
  styleUrls: ['./access-portal-register.component.scss'],
  standalone: true,
  imports: [IonIcon, IonInput, IonItem, IonLabel, IonList, ReactiveFormsModule, IonButton, CommonModule]
})
export class AccessPortalRegisterComponent implements OnInit {

  @Output() backPressed: EventEmitter<void> = new EventEmitter<void>();

  registerForm: FormGroup;
  errors: string[] = []; // Store validation errors

  constructor(private authService: AuthenticationService, private userService: UserService, private usernameService: UsernameService, private router: Router,
    private fb: FormBuilder, private inputValidationService: InputValidationService
  ) { 
    this.registerForm = this.fb.group({
      email: ['', Validators.required], // Form control for email
      password: ['', Validators.required], // Form control for password
      username: ['', Validators.required]
    })
  }

  ngOnInit() {
    let test = 0;
  }

  register() {
    if (!this.registerForm.valid) {
      return;
    }

    this.authService.registerUser(this.registerForm.value.email, this.registerForm.value.password, this.registerForm.value.username).subscribe({
      next: (firebaseUser) => {
        if (firebaseUser) {
          this.userService.createUser(firebaseUser.uid, this.registerForm.value.username).subscribe({
            next: () => {
              this.usernameService.createUsername(firebaseUser.uid, this.registerForm.value.username).subscribe({
                next: () => {
                },
                error: (error) => {
                  console.error('Error creating username:', error);
                }
              });
            },
            error: (error) => {
              console.error('Error creating user profile:', error);
            }
          });
        }
      },
      error: (error) => {
        console.error('Error registering user:', error);
      }
    });
  }

  onRegistration() {
    const email = this.registerForm.get('email')?.value;
    const password = this.registerForm.get('password')?.value;
    const username = this.registerForm.get('username')?.value;
  
    const validationResult = this.inputValidationService.validateRegistrationInputs(email, password, username)

    if (!validationResult.isValid) {
      // If not valid, add errors to the errors array
      this.errors = validationResult.errors;
      return;
    }

    this.register()
  }
}
