import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent, IonHeader, IonToolbar, IonTitle,
  IonAvatar, IonBadge, IonCard, IonCardContent,
  IonItem, IonLabel, IonButton, IonSpinner, IonInput
} from '@ionic/angular/standalone';
import { ApiService } from '../../../core/services/api.service';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
  standalone: true,
  imports: [
    CommonModule, FormsModule,
    IonContent, IonHeader, IonToolbar, IonTitle,
    IonAvatar, IonBadge, IonCard, IonCardContent,
    IonItem, IonLabel, IonButton, IonSpinner, IonInput
  ],
})
export class ProfilePage implements OnInit {
  user: any;
  loading = true;
  editMode = false;
  editName = '';
  editEmail = '';

  constructor(private api: ApiService, private auth: AuthService) {}

  async ngOnInit() {
    try {
      this.user = await this.api.getMe();
    } finally {
      this.loading = false;
    }
  }

  startEdit() {
    this.editName = this.user.name;
    this.editEmail = this.user.email;
    this.editMode = true;
  }

  async saveEdit() {
    await this.api.updateMe({ name: this.editName, email: this.editEmail });
    this.user.name = this.editName;
    this.user.email = this.editEmail;
    this.editMode = false;
  }

  cancelEdit() {
    this.editMode = false;
  }

  async switchRole() {
    const res = await this.api.switchRole();
    this.user.role = res.role;
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

  async logout() {
    await this.auth.logout();
  }
}