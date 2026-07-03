import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent, IonHeader, IonToolbar, IonTitle, IonBackButton,
  IonButtons, IonBadge, IonCard, IonCardContent, IonAvatar,
  IonLabel, IonSpinner, IonTextarea, IonButton, IonItem
} from '@ionic/angular/standalone';
import { ApiService } from '../../../core/services/api.service';
import { AuthService } from '../../../core/services/auth.service';
import { RatingBadgeComponent } from '../../../shared/components/rating-badge/rating-badge.component';

@Component({
  selector: 'app-movie-detail',
  templateUrl: './movie-detail.page.html',
  styleUrls: ['./movie-detail.page.scss'],
  standalone: true,
  imports: [
    CommonModule, FormsModule, RatingBadgeComponent,
    IonContent, IonHeader, IonToolbar, IonTitle, IonBackButton,
    IonButtons, IonBadge, IonCard, IonCardContent, IonAvatar,
    IonLabel, IonSpinner, IonTextarea, IonButton, IonItem
  ],
})
export class MovieDetailPage implements OnInit {
  movie: any;
  comments: any[] = [];
  loading = true;
  tmdbId = '';

  // New comment fields
  newComment = '';
  newRating = 5;
  submitting = false;

  constructor(
    private route: ActivatedRoute,
    private api: ApiService,
    public auth: AuthService
  ) {}

  async ngOnInit() {
    this.tmdbId = this.route.snapshot.paramMap.get('tmdbId') as string;
    try {
      [this.movie, this.comments] = await Promise.all([
        this.api.getMovie(this.tmdbId),
        this.api.getCommentsByMovie(this.tmdbId),
      ]);
    } finally {
      this.loading = false;
    }
  }

  async submitComment() {
    if (!this.newComment.trim()) return;
    this.submitting = true;
    try {
      await this.api.createComment(this.tmdbId, this.newComment, this.newRating);
      // Reload comments and movie ratings after submission
      [this.movie, this.comments] = await Promise.all([
        this.api.getMovie(this.tmdbId),
        this.api.getCommentsByMovie(this.tmdbId),
      ]);
      this.newComment = '';
      this.newRating = 5;
    } finally {
      this.submitting = false;
    }
  }

  async deleteComment(id: string) {
    await this.api.deleteComment(id);
    this.comments = await this.api.getCommentsByMovie(this.tmdbId);
  }
}