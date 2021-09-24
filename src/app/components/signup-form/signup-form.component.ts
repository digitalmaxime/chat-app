import { Component, OnInit } from '@angular/core';
import { DataSnapshot } from '@angular/fire/database/interfaces';
import { Data, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
@Component({
  selector: 'app-signup-form',
  templateUrl: './signup-form.component.html',
  styleUrls: ['./signup-form.component.css']
})
export class SignupFormComponent {
  email: string;
  password: string;
  displayName: string;
  errorMsg: string;
  warningMsg: string;

  constructor(private authService: AuthService, private router: Router) {}

  signUp() { 
    this.authService.userNameExists(this.displayName).then((userExists: DataSnapshot) => {
      if(userExists.exists()) {
        this.warningMsg = "Désolé, ce nom d'utilisateur existe déjà."
      } else {
        this.errorMsg = '';
        const email = this.email;
        const password = this.password;
        const displayName = this.displayName;
        this.authService.signUp(email, password, displayName)
          .then(resolve => this.router.navigate(['chat']))
          .catch(error => {
            this.errorMsg = error.message
          })
      }
    })
  }

}
