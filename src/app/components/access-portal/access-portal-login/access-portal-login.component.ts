import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';
import { IonList, IonItem, IonIcon, IonLabel, IonInput } from "@ionic/angular/standalone";
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-access-portal-login',
  templateUrl: './access-portal-login.component.html',
  styleUrls: ['./access-portal-login.component.scss'],
  standalone: true,
  imports: [IonInput, IonLabel, IonIcon, IonItem, IonList, ReactiveFormsModule]
})
export class AccessPortalLoginComponent  implements OnInit {

  @Output() registerPressed: EventEmitter<void> = new EventEmitter<void>();
  @Output() forgotPasswordPressed: EventEmitter<void> = new EventEmitter<void>();

  loginForm: FormGroup = new FormGroup({
    email: new FormControl(''),
    password: new FormControl('')
  })

  constructor(private authService: AuthenticationService) { }

  ngOnInit() {
    let test = 0;
  }

  login(){
    if(!this.loginForm.valid){
      return;
    }
    this.authService.loginUser(this.loginForm.value.email, this.loginForm.value.password).subscribe();
  }

}
