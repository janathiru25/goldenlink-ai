import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

interface LoginResponse {
  success: boolean;
  message: string;
  accessToken?: string | null;
  user?: {
    userId: string;
    fullName: string;
    phoneNumber: string;
    email: string;
    location: string;
    createdAt: string;
  } | null;
}

@Component({
  selector: 'app-bystander-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './bystander-login.html',
  styleUrl: './bystander-login.scss'
})
export class BystanderLogin {
  phoneNumber = '';
  password = '';
  showPassword = false;
  rememberMe = false;
  isLoading = false;

  private readonly apiUrl = 'http://127.0.0.1:8000/api/auth';

  constructor(
    private http: HttpClient,
    private router: Router
  ) {}

  togglePassword(): void {
    this.showPassword = !this.showPassword;
  }

  login(): void {
    if (!this.phoneNumber || !this.password) {
      alert('Please enter your mobile number and password.');
      return;
    }

    this.isLoading = true;

    const loginData = {
      phoneNumber: this.phoneNumber.trim(),
      password: this.password
    };

    this.http
      .post<LoginResponse>(
        `${this.apiUrl}/login`,
        loginData
      )
      .subscribe({
        next: (response) => {
          this.isLoading = false;

          if (response.success && response.accessToken && response.user) {
            localStorage.setItem(
              'goldenlink_access_token',
              response.accessToken
            );

            localStorage.setItem(
              'goldenlink_bystander',
              JSON.stringify(response.user)
            );

            if (this.rememberMe) {
              localStorage.setItem(
                'goldenlink_remember_me',
                'true'
              );
            } else {
              localStorage.removeItem(
                'goldenlink_remember_me'
              );
            }

            console.log(
              'Bystander login successful:',
              response.user
            );

            this.router.navigate(['/']);
          } else {
            alert(
              response.message ||
              'Login failed. Please check your details.'
            );
          }
        },

        error: (error) => {
          this.isLoading = false;

          console.error(
            'Bystander login error:',
            error
          );

          const message =
            error?.error?.detail ||
            error?.error?.message ||
            'Unable to login. Please try again.';

          alert(
            Array.isArray(message)
              ? 'Please check your login details.'
              : message
          );
        }
      });
  }

  register(): void {
    this.router.navigate(['/bystander-registration']);
  }

  forgotPassword(): void {
    console.log('Forgot password selected');
  }

  continueAsGuest(): void {
    this.router.navigate(['/accident-report']);
  }
}