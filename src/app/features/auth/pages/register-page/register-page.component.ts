import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.services';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-register-page',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './register-page.component.html',
  styleUrl: './register-page.component.scss'
})
export class RegisterPageComponent {
  
  
  
    username = '';
    password = '';
    confirm = '';
    error = '';
    success = '';
  
    constructor(private auth: AuthService, private router: Router) {}
  
    register() {
      if (this.password !== this.confirm) {
        this.error = 'Passwords do not match';
        return;
      }
  
      this.auth.register({ username: this.username, password: this.password })
        .subscribe({
          next: () => {
            this.success = 'Registration successful! You can login now.';
            this.error = '';
          },
          error: () => {
            this.error = 'Registration failed';
            this.success = '';
          }
        });
    }
  }
  

