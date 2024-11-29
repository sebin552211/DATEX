import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.css'
})
export class AuthComponent {
  constructor(private router: Router){
    this.adminLogin();
  }

  adminLogin() {
    this.router.navigate(['/app/dashboard'])
  }
}
