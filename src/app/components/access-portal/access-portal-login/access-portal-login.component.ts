import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';
import { IonList, IonItem, IonIcon, IonLabel, IonInput } from "@ionic/angular/standalone";
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-access-portal-login',
  templateUrl: './access-portal-login.component.html',
  styleUrls: ['./access-portal-login.component.scss'],
  standalone: true,
  imports: [IonInput, IonLabel, IonIcon, IonItem, IonList, FormsModule]
})
export class AccessPortalLoginComponent  implements OnInit {

  @Output() registerPressed: EventEmitter<void> = new EventEmitter<void>();
  @Output() forgotPasswordPressed: EventEmitter<void> = new EventEmitter<void>();

  email: string = "";
  password: string = "";

  constructor(private authService: AuthenticationService) { }

  ngOnInit() {
    let test = 0;
  }

  login(){
    if(!this.email || !this.password){
      console.log("test");
      return;
    }
    this.authService.loginUser(this.email, this.password).subscribe();
  }

}
