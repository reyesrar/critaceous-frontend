import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  IonContent, IonHeader, IonToolbar, IonTitle,
  IonAvatar, IonBadge, IonCard, IonCardContent,
  IonItem, IonLabel, IonButton, IonSpinner
} from '@ionic/angular/standalone';
import { ApiService } from '../../../core/services/api.service';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    IonContent, IonHeader, IonToolbar, IonTitle,
    IonAvatar, IonBadge, IonCard, IonCardContent,
    IonItem, IonLabel, IonButton, IonSpinner
  ],
})
export class ProfilePage implements OnInit {
  user: any;
  loading = true;

  constructor(private api: ApiService, private auth: AuthService) {}

  async ngOnInit() {
    try {
      this.user = await this.api.getMe();
    } finally {
      this.loading = false;
    }
  }

  async switchRole() {
    const res = await this.api.switchRole();
    this.user.role = res.role;
  }

  async logout() {
    await this.auth.logout();
  }

  async uploadPicture() {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = async (e: any) => {
      const file = e.target.files[0];
      if (!file) return;
      const res = await this.api.uploadProfilePicture(file);
      this.user.profilePicture = res.url;
    };
    input.click();
  }
}