import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent, IonHeader, IonToolbar, IonTitle,
  IonCard, IonCardContent, IonItem, IonLabel,
  IonToggle, IonSelect, IonSelectOption
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
  standalone: true,
  imports: [
    CommonModule, FormsModule,
    IonContent, IonHeader, IonToolbar, IonTitle,
    IonCard, IonCardContent, IonItem, IonLabel,
    IonToggle, IonSelect, IonSelectOption
  ],
})
export class SettingsPage {
  // TODO: persist preferences with storage service
  darkMode = true;
  soundEnabled = true;
  language = 'en';
  defaultSort = 'popularity';
}