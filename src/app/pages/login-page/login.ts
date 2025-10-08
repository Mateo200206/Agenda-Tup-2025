import { Component, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { Auth } from '../../services/auth';
import { FormsModule, NgForm } from '@angular/forms';
import { LoginData } from '../../interfaces/auth';

@Component({
  selector: 'app-login-page',
  imports: [RouterModule,FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.scss'
})
export class LoginPage {
  authService = inject(Auth)
  router = inject(Router)

  errorLogin = false;

  async login(loginData: LoginData){
    this.errorLogin = false;
    if(!loginData.email || !loginData.password){
      this.errorLogin = true;
      return
    }
    const loginResult = await this.authService.login(loginData);
    if(loginResult) this.router.navigate(["/"]);
    this.errorLogin = true;
  }
}