import { Component } from '@angular/core';
import { IonContent, IonHeader, IonToolbar, IonTitle } from '@ionic/angular/standalone';

@Component({
  selector: 'app-home-tab',
  template: `
    <ion-header>
      <ion-toolbar>
        <ion-title>Critaceous</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <!-- Home content goes here -->
    </ion-content>
  `,
  standalone: true,
  imports: [IonContent, IonHeader, IonToolbar, IonTitle],
})
export class HomeTabPage {}