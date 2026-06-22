import { Component } from '@angular/core';
import {
  IonTabs, IonTabBar, IonTabButton, IonIcon, IonLabel
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { homeOutline, searchOutline, personOutline, settingsOutline } from 'ionicons/icons';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: true,
  imports: [IonTabs, IonTabBar, IonTabButton, IonIcon, IonLabel],
})
export class HomePage {
  constructor() {
    // Register tab bar icons
    addIcons({ homeOutline, searchOutline, personOutline, settingsOutline });
  }
}