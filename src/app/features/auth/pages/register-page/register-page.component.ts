import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.services';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register-page',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './register-page.component.html',
  styleUrl: './register-page.component.scss'
})
export class RegisterPageComponent {
  
  userData = {
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  };

  loading = false;
  error = '';

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  register() {
    // Add email validation
    if (!this.userData.username || !this.userData.email || !this.userData.password) {
      this.error = 'Please fill in all fields';
      return;
    }

    if (this.userData.password !== this.userData.confirmPassword) {
      this.error = 'Passwords do not match';
      return;
    }

    this.loading = true;
    this.error = '';

    // Send username, email, and password to match backend
    const registrationData = {
      username: this.userData.username,
      email: this.userData.email,
      password: this.userData.password
    };

    console.log('Sending registration data:', registrationData);

    this.authService.register(registrationData).subscribe({
      next: (response) => {
        console.log('Registration successful:', response);
        this.loading = false;
        alert('Registration successful! You can now login.');
        this.router.navigate(['/login']);
      },
      error: (error) => {
        console.error('Registration error:', error);
        this.loading = false;
        
        if (error.status === 400) {
          this.error = error.error || 'Invalid registration data';
        } else if (error.status === 0) {
          this.error = 'Unable to connect to server. Please check if the server is running on http://localhost:5047';
        } else {
          this.error = error.error || 'Registration failed. Please try again.';
        }
      }
    });
  }
}