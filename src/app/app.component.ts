import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IonApp, IonRouterOutlet } from '@ionic/angular/standalone';
import { Capacitor } from '@capacitor/core';
import { App } from '@capacitor/app';
import { StatusBar, Style } from '@capacitor/status-bar';

@Component({
  selector: 'app-root',
  template: `<ion-app><ion-router-outlet /></ion-app>`,
  standalone: true,
  imports: [IonApp, IonRouterOutlet],
})
export class AppComponent implements OnInit {
  constructor(private router: Router) {}

  async ngOnInit() {
    if (Capacitor.isNativePlatform()) {
      // Overlay status bar to use full screen
      await StatusBar.setOverlaysWebView({ overlay: true });
      await StatusBar.setStyle({ style: Style.Dark });

      // Handle back button — never exit or logout
      App.addListener('backButton', () => {
        const url = this.router.url;
        // Block back on main screens
        if (url === '/app/home' || url === '/login' || url === '/splash') return;
        window.history.back();
      });
    }
  }
}