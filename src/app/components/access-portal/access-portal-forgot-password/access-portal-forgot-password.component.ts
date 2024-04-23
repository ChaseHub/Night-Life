import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonList, IonLabel, IonItem, IonInput, IonIcon } from "@ionic/angular/standalone";
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';

@Component({
  selector: 'app-access-portal-forgot-password',
  templateUrl: './access-portal-forgot-password.component.html',
  styleUrls: ['./access-portal-forgot-password.component.scss'],
  standalone: true,
  imports: [IonIcon, IonInput, IonItem, IonLabel, IonList, FormsModule]
})
export class AccessPortalForgotPasswordComponent  implements OnInit {
  @Output() backPressed: EventEmitter<void> = new EventEmitter<void>();

  email: string = "";
  successfulReset: boolean = false;

  constructor(private authService: AuthenticationService) { }

  ngOnInit() {
    let test = 0;
  }

  sendPasswordReset(){
    if(!this.email){
      return;
    }
    this.authService.resetPassword(this.email).subscribe(
      ()=>{
        this.successfulReset = true;
      }
    );
  }

}
