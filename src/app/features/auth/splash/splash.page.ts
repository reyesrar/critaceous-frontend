import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IonContent } from '@ionic/angular/standalone';

@Component({
  selector: 'app-splash',
  templateUrl: './splash.page.html',
  styleUrls: ['./splash.page.scss'],
  standalone: true,
  imports: [IonContent],
})
export class SplashPage implements OnInit {
  constructor(private router: Router) {}

  ngOnInit() {
    // Redirect to login after splash animation
    setTimeout(() => {
      this.router.navigate(['/login'], { replaceUrl: true });
    }, 2500);
  }
}