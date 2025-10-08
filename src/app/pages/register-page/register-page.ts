import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { FormUser } from '../../interfaces/user';
import { UsersService } from '../../services/user-service';
import { Auth } from '../../services/auth';


@Component({
  selector: 'app-register',
  imports: [FormsModule, RouterLink],
  templateUrl: './register-page.html',
  styleUrl: './register-page.scss',
})
export class RegisterPage {
  isLoading = false;
  errorRegister = false;

  router = inject(Router);
  userService = inject(UsersService);
  authService = inject(Auth);

  async register(form: FormUser) {
    this.errorRegister = false;
    
    if (
      !form.firstName ||
      !form.lastName ||
      !form.email ||
      !form.password ||
      !form.password2 ||
      form.password !== form.password2
    ) {
      this.errorRegister = true;
      return;
    }

    this.isLoading = true;


    const registerOk = await this.userService.register({
      firstName: form.firstName,
      lastName: form.lastName,
      email: form.email,
      password: form.password,
    });
    
    this.isLoading = false;

    if (registerOk) {
      const loginOk = await this.authService.login({
      email: form.email,
      password: form.password
    });
    
    if (loginOk) {
      this.router.navigate(["/"]);
      console.log("login y registro exitoso")
    } else {
      this.router.navigate(["/login"]);
    }
  } else {
    this.isLoading = false;
    this.errorRegister = true;
    console.log("error en el registro")
  }
  }
}