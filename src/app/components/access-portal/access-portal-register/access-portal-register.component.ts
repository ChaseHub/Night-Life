import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { IonList, IonLabel, IonItem, IonInput, IonIcon } from "@ionic/angular/standalone";
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';
import { FormsModule } from '@angular/forms';

import { UserService } from 'src/app/services/database/user.service';
import { UsernameService } from 'src/app/services/database/username.service';

@Component({
  selector: 'app-access-portal-register',
  templateUrl: './access-portal-register.component.html',
  styleUrls: ['./access-portal-register.component.scss'],
  standalone: true,
  imports: [IonIcon, IonInput, IonItem, IonLabel, IonList, FormsModule]
})
export class AccessPortalRegisterComponent implements OnInit {

  @Output() backPressed: EventEmitter<void> = new EventEmitter<void>();

  email: string = "";
  password: string = "";
  username: string = "";

  constructor(private authService: AuthenticationService, private userService: UserService, private usernameService: UsernameService, private router: Router) { }

  ngOnInit() {
    let test = 0;
  }

  register() {
    if (!this.username || !this.email || !this.password) {
      return;
    }

    this.authService.registerUser(this.email, this.password, this.username).subscribe({
      next: (firebaseUser) => {
        if (firebaseUser) {
          this.userService.createUser(firebaseUser.uid, this.username).subscribe({
            next: () => {
              this.usernameService.createUsername(firebaseUser.uid, this.username).subscribe({
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
}
