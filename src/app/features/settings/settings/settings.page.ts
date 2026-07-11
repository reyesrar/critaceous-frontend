import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import {
  IonContent, IonHeader, IonToolbar, IonTitle,
  IonCard, IonCardContent, IonItem, IonLabel,
  IonSelect, IonSelectOption, IonButton, IonAlert
} from '@ionic/angular/standalone';
import { ApiService } from '../../../core/services/api.service';
import { AuthService } from '../../../core/services/auth.service';
import { Storage } from '@ionic/storage-angular';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
  standalone: true,
  imports: [
    CommonModule, FormsModule,
    IonContent, IonHeader, IonToolbar, IonTitle,
    IonCard, IonCardContent, IonItem, IonLabel,
    IonSelect, IonSelectOption, IonButton, IonAlert
  ],
})
export class SettingsPage implements OnInit {
  defaultSort = 'popularity';
  showDeleteAlert = false;

  alertButtons = [
    { text: 'Cancel', role: 'cancel' },
    { text: 'Delete', role: 'destructive', handler: () => this.confirmDelete() },
  ];

  constructor(
    private api: ApiService,
    private auth: AuthService,
    private storage: Storage,
    private router: Router
  ) {}

  async ngOnInit() {
    // Load saved sort preference
    const saved = await this.storage.get('defaultSort');
    if (saved) this.defaultSort = saved;
  }

  async onSortChange() {
    // Persist sort preference locally
    await this.storage.set('defaultSort', this.defaultSort);
  }

  async confirmDelete() {
    await this.api.deleteMe();
    await this.auth.logout();
  }
}