import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import {
  IonContent, IonHeader, IonToolbar, IonTitle,
  IonBackButton, IonButtons, IonAvatar, IonBadge, IonSpinner
} from '@ionic/angular/standalone';
import { ApiService } from '../../core/services/api.service';

@Component({
  selector: 'app-public-profile',
  templateUrl: './public-profile.page.html',
  styleUrls: ['./public-profile.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    IonContent, IonHeader, IonToolbar, IonTitle,
    IonBackButton, IonButtons, IonAvatar, IonBadge, IonSpinner
  ],
})
export class PublicProfilePage implements OnInit {
  user: any;
  loading = true;

  constructor(private route: ActivatedRoute, private api: ApiService) {}

  async ngOnInit() {
    const id = this.route.snapshot.paramMap.get('userId') as string;
    try {
      this.user = await this.api.getPublicProfile(id);
    } finally {
      this.loading = false;
    }
  }
}