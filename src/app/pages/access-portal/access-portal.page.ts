import { Component, OnInit } from '@angular/core';
import { IonContent } from '@ionic/angular/standalone';
import { AccessPortalForgotPasswordComponent } from 'src/app/components/access-portal/access-portal-forgot-password/access-portal-forgot-password.component';
import { AccessPortalLoginComponent } from 'src/app/components/access-portal/access-portal-login/access-portal-login.component';
import { AccessPortalRegisterComponent } from 'src/app/components/access-portal/access-portal-register/access-portal-register.component';

@Component({
  selector: 'app-access-portal',
  templateUrl: './access-portal.page.html',
  styleUrls: ['./access-portal.page.scss'],
  standalone: true,
  imports: [IonContent, AccessPortalLoginComponent, AccessPortalRegisterComponent, AccessPortalForgotPasswordComponent]
})
export class AccessPortalPage implements OnInit {
  readonly Content = Content;
  content: Content = Content.Login;

  constructor() { }

  ngOnInit() {
    let test = 0;
  }

}

enum Content {
  Login = "login",
  Register = "register",
  ForgotPassword = "forgotPassword"
}
