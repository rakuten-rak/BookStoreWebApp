import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.services';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from "@angular/material/card";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatCard } from '@angular/material/card';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [FormsModule, MatCardModule, MatFormFieldModule,MatCard,CommonModule],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.scss'
})
export class LoginPageComponent {
  // username = '';
  // password = '';
  // error = '';

  credentials = { username: '', password: '' };
  error = '';

  constructor(private auth: AuthService, private router: Router) {}

  login() {
    this.auth.login(this.credentials).subscribe({
      next: (res: any) => {
        this.auth.saveToken(res.token);
        this.router.navigate(['/books']);
      },
      error: () => {
        this.error = 'Invalid username or password.';
      }
    });
  }
}


