import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent {
  email: string;
  password: string;
  errorMsg: string;

  constructor(private authService: AuthService, private router: Router) { 
    this.errorMsg = '';
  }
  
  login() {
    this.authService.login(this.email, this.password)
    .then(() => this.errorMsg = '')
    .catch(error => {
      this.errorMsg = 'Le mot de passe ou courriel entré est invalide.'
    });
  }

}
