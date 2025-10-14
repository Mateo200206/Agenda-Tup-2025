import { Component, inject } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { Auth } from '../../services/auth';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-logged-layout',
  imports: [RouterOutlet, RouterModule],
  templateUrl: './logged-layout.html',
  styleUrl: './logged-layout.scss'
})
export class LoggedLayout {
   authService = inject(Auth)

   showLogoutModal(){
   Swal.fire({
    title: "Do you want to logout?",
    showDenyButton: false,
    showCancelButton: true,
    confirmButtonText: 'Logout',
    confirmButtonColor: "var(--color-error)",
    denyButtonText: `Don't save`
  }).then((result) => {
    /* Read more about isConfirmed, isDenied below */
    if (result.isConfirmed) {
      this.authService.logout();
    }
  });
}}
