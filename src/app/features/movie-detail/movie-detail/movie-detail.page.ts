import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent, IonHeader, IonToolbar, IonTitle, IonBackButton,
  IonButtons, IonBadge, IonCard, IonCardContent, IonAvatar,
  IonLabel, IonSpinner, IonButton, IonRange, IonIcon
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { chevronDownOutline } from 'ionicons/icons';
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
    IonLabel, IonSpinner, IonButton, IonRange, IonIcon
  ],
})
export class MovieDetailPage implements OnInit {
  movie: any;
  comments: any[] = [];
  loading = true;
  tmdbId = '';

  newComment = '';
  newRating = 5;
  submitting = false;
  // Whether the user is editing their existing comment
  isEditing = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private api: ApiService,
    public auth: AuthService
  ) {
    addIcons({ chevronDownOutline });
  }

  async ngOnInit() {
    this.tmdbId = this.route.snapshot.paramMap.get('tmdbId') as string;
    try {
      [this.movie, this.comments] = await Promise.all([
        this.api.getMovie(this.tmdbId),
        this.api.getCommentsByMovie(this.tmdbId),
      ]);
      this.comments = this.comments.map((c: any) => ({ ...c, expanded: false }));
      // Pre-fill form if user already has a comment
      const myComment = await this.api.getMyCommentForMovie(this.tmdbId);
      if (myComment) {
        this.newComment = myComment.content;
        this.newRating = myComment.rating;
        this.isEditing = true;
      }
    } finally {
      this.loading = false;
    }
  }

  async submitComment() {
    if (!this.newComment.trim()) return;
    // Enforce maximum comment length of 250 characters
    if ((this.newComment || '').length > 250) {
      this.newComment = this.newComment.slice(0, 250);
    }
    // Validate rating bounds
    if (this.newRating < 1 || this.newRating > 10) return;
    this.submitting = true;
    try {
      await this.api.createComment(this.tmdbId, this.newComment, this.newRating);
      [this.movie, this.comments] = await Promise.all([
        this.api.getMovie(this.tmdbId),
        this.api.getCommentsByMovie(this.tmdbId),
      ]);
      this.comments = this.comments.map((c: any) => ({ ...c, expanded: false }));
      this.isEditing = true;
    } finally {
      this.submitting = false;
    }
  }

  async deleteComment(id: string) {
    await this.api.deleteComment(id);
    this.comments = (await this.api.getCommentsByMovie(this.tmdbId))
      .map((c: any) => ({ ...c, expanded: false }));
    this.newComment = '';
    this.newRating = 5;
    this.isEditing = false;
  }

  goToPublicProfile(event: Event, userId: string) {
    event.stopPropagation();
    if (userId) this.router.navigate(['/public-profile', userId]);
  }

  toggleExpand(comment: any) {
    comment.expanded = !comment.expanded;
  }
}