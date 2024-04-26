import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';
import { IonList, IonItem, IonIcon, IonLabel, IonInput, IonButton } from "@ionic/angular/standalone";
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { InputValidationService } from 'src/app/services/validation/input-validation.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-access-portal-login',
  templateUrl: './access-portal-login.component.html',
  styleUrls: ['./access-portal-login.component.scss'],
  standalone: true,
  imports: [IonInput, IonLabel, IonIcon, IonItem, IonList, ReactiveFormsModule, IonButton, CommonModule]
})
export class AccessPortalLoginComponent  implements OnInit {

  @Output() registerPressed: EventEmitter<void> = new EventEmitter<void>();
  @Output() forgotPasswordPressed: EventEmitter<void> = new EventEmitter<void>();

  loginForm: FormGroup;
  errors: string[] = []; // Store validation errors

  constructor(private authService: AuthenticationService, private fb: FormBuilder, private inputValidationService: InputValidationService) {
    this.loginForm = this.fb.group({
      email: ['', Validators.required], // Form control for email
      password: ['', Validators.required], // Form control for password
    });
  }

  ngOnInit() {
    let test = 0;
  }

  login(){
    if(!this.loginForm.valid){
      return;
    }
    this.authService.loginUser(this.loginForm.value.email, this.loginForm.value.password).subscribe();
  }

  createForm() {
    // Create the login form with basic validators
    this.loginForm = this.fb.group({
      email: ['', Validators.required], // Form control for email
      password: ['', Validators.required], // Form control for password
    });
  }

  onLogin() {
 
    this.errors = [];

    const email = this.loginForm.get('email')?.value;
    const password = this.loginForm.get('password')?.value;

    // Validate inputs using the validation service
    const validationResult = this.inputValidationService.validateLoginInputs(email, password);

    if (!validationResult.isValid) {
      // If not valid, add errors to the errors array
      this.errors = validationResult.errors;
      return;
    }

    // Proceed with the login process
    this.login()
  }

}
