import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import {
  IonContent, IonInput, IonButton, IonLabel, IonItem, IonSpinner
} from '@ionic/angular/standalone';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, IonContent, IonInput, IonButton, IonLabel, IonItem, IonSpinner],
})
export class LoginPage {
  email = '';
  password = '';
  loading = false;
  error = '';

  constructor(private auth: AuthService, private router: Router) {}

  async onLogin() {
    this.error = '';
    this.loading = true;
    try {
      await this.auth.login(this.email, this.password);
    } catch {
      this.error = 'Invalid email or password';
    } finally {
      this.loading = false;
    }
  }

  goToRegister() {
    this.router.navigate(['/register']);
  }
}