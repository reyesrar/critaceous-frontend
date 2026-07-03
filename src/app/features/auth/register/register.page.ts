import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import {
  IonContent, IonInput, IonButton, IonLabel, IonItem, IonSpinner
} from '@ionic/angular/standalone';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, IonContent, IonInput, IonButton, IonLabel, IonItem, IonSpinner],
})
export class RegisterPage {
  name = '';
  email = '';
  password = '';
  confirmPassword = '';
  loading = false;
  error = '';

  constructor(private auth: AuthService, private router: Router) {}

  async onRegister() {
    this.error = '';
    if (this.password !== this.confirmPassword) {
      this.error = 'Passwords do not match';
      return;
    }
    this.loading = true;
    try {
      await this.auth.register(this.name, this.email, this.password);
    } catch {
      this.error = 'Registration failed. Try again.';
    } finally {
      this.loading = false;
    }
  }

  goToLogin() {
    this.router.navigate(['/login']);
  }
}