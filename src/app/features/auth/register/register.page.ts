import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import {
  IonContent, IonInput, IonButton, IonLabel, IonItem
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  standalone: true,
  imports: [IonContent, IonInput, IonButton, IonLabel, IonItem, FormsModule],
})
export class RegisterPage {
  name = '';
  email = '';
  password = '';
  confirmPassword = '';

  constructor(private router: Router) {}

  onRegister() {
    // TODO: connect to auth service
    this.router.navigate(['/app'], { replaceUrl: true });
  }

  goToLogin() {
    this.router.navigate(['/login']);
  }
}