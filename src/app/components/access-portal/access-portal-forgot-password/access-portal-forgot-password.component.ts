import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl } from '@angular/forms';
import { IonList, IonLabel, IonItem, IonInput, IonIcon } from "@ionic/angular/standalone";
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';

@Component({
  selector: 'app-access-portal-forgot-password',
  templateUrl: './access-portal-forgot-password.component.html',
  styleUrls: ['./access-portal-forgot-password.component.scss'],
  standalone: true,
  imports: [IonIcon, IonInput, IonItem, IonLabel, IonList, ReactiveFormsModule]
})
export class AccessPortalForgotPasswordComponent  implements OnInit {
  @Output() backPressed: EventEmitter<void> = new EventEmitter<void>();

  successfulReset: boolean = false;

  forgotPasswordForm: FormGroup = new FormGroup({
    email: new FormControl(''),
  });

  constructor(private authService: AuthenticationService) { }

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

}
