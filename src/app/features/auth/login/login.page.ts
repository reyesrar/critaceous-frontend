import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import {
  IonContent, IonInput, IonButton, IonLabel, IonItem
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [IonContent, IonInput, IonButton, IonLabel, IonItem, FormsModule],
})
export class LoginPage {
  email = '';
  password = '';

  constructor(private router: Router) {}

  onLogin() {
    // TODO: connect to auth service
    this.router.navigate(['/app'], { replaceUrl: true });
  }

  goToRegister() {
    this.router.navigate(['/register']);
  }
}