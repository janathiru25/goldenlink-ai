import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

interface RegisterResponse {
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
  selector: 'app-bystander-registration',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './bystander-registration.html',
  styleUrl: './bystander-registration.scss'
})
export class BystanderRegistration {
  fullName = '';
  phoneNumber = '';
  email = '';
  password = '';
  confirmPassword = '';
  location = '';

  showPassword = false;
  showConfirmPassword = false;
  isLoading = false;

  private readonly apiUrl = 'http://127.0.0.1:8000/api/auth';

  constructor(
    private http: HttpClient,
    private router: Router
  ) {}

  togglePassword(): void {
    this.showPassword = !this.showPassword;
  }

  toggleConfirmPassword(): void {
    this.showConfirmPassword = !this.showConfirmPassword;
  }

  register(): void {
    if (
      !this.fullName ||
      !this.phoneNumber ||
      !this.email ||
      !this.password ||
      !this.confirmPassword ||
      !this.location
    ) {
      alert('Please fill in all required fields.');
      return;
    }

    if (this.password !== this.confirmPassword) {
      alert('Passwords do not match.');
      return;
    }

    this.isLoading = true;

    const registrationData = {
      fullName: this.fullName.trim(),
      phoneNumber: this.phoneNumber.trim(),
      email: this.email.trim(),
      password: this.password,
      location: this.location.trim()
    };

    this.http
      .post<RegisterResponse>(
        `${this.apiUrl}/register`,
        registrationData
      )
      .subscribe({
        next: (response) => {
          this.isLoading = false;

          if (response.success) {
            alert('Account created successfully!');

            this.router.navigate(['/bystander-login']);
          } else {
            alert(response.message || 'Registration failed.');
          }
        },

        error: (error) => {
          this.isLoading = false;

          console.error('Bystander registration error:', error);

          const message =
            error?.error?.detail ||
            error?.error?.message ||
            'Unable to create your account. Please try again.';

          alert(message);
        }
      });
  }

  goToLogin(): void {
    this.router.navigate(['/bystander-login']);
  }
}