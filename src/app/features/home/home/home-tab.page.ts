import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import {
  IonContent, IonHeader, IonToolbar, IonTitle,
  IonCard, IonCardHeader, IonCardTitle, IonCardContent,
  IonBadge, IonAvatar, IonLabel, IonSpinner
} from '@ionic/angular/standalone';
import { ApiService } from '../../../core/services/api.service';
import { RatingBadgeComponent } from '../../../shared/components/rating-badge/rating-badge.component';

@Component({
  selector: 'app-home-tab',
  templateUrl: './home-tab.page.html',
  styleUrls: ['./home-tab.page.scss'],
  standalone: true,
  imports: [
    CommonModule, RatingBadgeComponent,
    IonContent, IonHeader, IonToolbar, IonTitle,
    IonCard, IonCardHeader, IonCardTitle, IonCardContent,
    IonBadge, IonAvatar, IonLabel, IonSpinner
  ],
})
export class HomeTabPage implements OnInit {
  featured: any[] = [];
  latestComments: any[] = [];
  loading = true;

  constructor(private api: ApiService, private router: Router) {}

  async ngOnInit() {
    try {
      this.featured = await this.api.getAllMovies({ sortBy: 'popularity_desc' });
      const all = await Promise.all(
        this.featured.map(m => this.api.getCommentsByMovie(m.tmdbId))
      );
      this.latestComments = (all as any[][])
        .flat()
        .sort((a: any, b: any) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
        .slice(0, 10)
        .map((c: any) => ({ ...c, expanded: false }));
    } finally {
      this.loading = false;
    }
  }

  goToDetail(tmdbId: string) {
    this.router.navigate(['/movie', tmdbId]);
  }

  goToPublicProfile(event: Event, userId: string) {
    // Prevent card click from triggering
    event.stopPropagation();
    if (userId) this.router.navigate(['/public-profile', userId]);
  }

  toggleExpand(event: Event, comment: any) {
    event.stopPropagation();
    comment.expanded = !comment.expanded;
  }
}