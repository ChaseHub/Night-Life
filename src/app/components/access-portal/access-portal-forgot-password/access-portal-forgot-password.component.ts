import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { IonList, IonLabel, IonItem, IonInput, IonIcon, IonButton } from "@ionic/angular/standalone";
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';
import { InputValidationService } from 'src/app/services/validation/input-validation.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-access-portal-forgot-password',
  templateUrl: './access-portal-forgot-password.component.html',
  styleUrls: ['./access-portal-forgot-password.component.scss'],
  standalone: true,
  imports: [IonIcon, IonInput, IonItem, IonLabel, IonList, ReactiveFormsModule, IonButton, CommonModule]
})
export class AccessPortalForgotPasswordComponent  implements OnInit {
  @Output() backPressed: EventEmitter<void> = new EventEmitter<void>();

  successfulReset: boolean = false;

  forgotPasswordForm: FormGroup;
  errors: string[] = []; // Store validation errors

  constructor(private authService: AuthenticationService, private fb: FormBuilder, private inputValidationService: InputValidationService) {
    this.forgotPasswordForm = this.fb.group({
      email: ['', Validators.required] // Form control for email
    })
  }

  ngOnInit() {
    let test = 0;
  }

  sendPasswordReset(){
    if(!this.forgotPasswordForm.valid){
      return;
    }
    this.authService.resetPassword(this.forgotPasswordForm.value.email).subscribe(
      ()=>{
        this.successfulReset = true;
      }
    );
  }

  onSubmission() {
 
    this.errors = [];

    const email = this.forgotPasswordForm.get('email')?.value;

    // Validate inputs using the validation service
    const validationResult = this.inputValidationService.validateEmailInput(email);
    console.log(validationResult)

    if (!validationResult.isValid) {
      // If not valid, add errors to the errors array
      this.errors = validationResult.errors;
      return;
    }

    // Proceed with the reset process
    this.sendPasswordReset()
  }

}
