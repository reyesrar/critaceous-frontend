import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  IonContent, IonHeader, IonToolbar, IonTitle,
  IonAvatar, IonBadge, IonCard, IonCardContent, IonItem, IonLabel
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    IonContent, IonHeader, IonToolbar, IonTitle,
    IonAvatar, IonBadge, IonCard, IonCardContent, IonItem, IonLabel
  ],
})
export class ProfilePage {
  // TODO: replace with real user from auth service
  user = {
    name: 'John Doe',
    email: 'john@example.com',
    // Account type: user | critic | admin
    role: 'critic',
    joinedAt: '2024-01-15',
    totalComments: 24,
    avgRating: 7.8,
  };
}