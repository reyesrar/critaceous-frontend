import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import {
  IonContent, IonHeader, IonToolbar, IonTitle, IonBackButton,
  IonButtons, IonBadge, IonCard, IonCardContent, IonAvatar, IonLabel
} from '@ionic/angular/standalone';
import { MovieService } from '../../../core/services/movie.service';
import { Movie, Comment } from '../../../core/models/movie.model';
import { RatingBadgeComponent } from '../../../shared/components/rating-badge/rating-badge.component';

@Component({
  selector: 'app-movie-detail',
  templateUrl: './movie-detail.page.html',
  styleUrls: ['./movie-detail.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    RatingBadgeComponent,
    IonContent, IonHeader, IonToolbar, IonTitle, IonBackButton,
    IonButtons, IonBadge, IonCard, IonCardContent, IonAvatar, IonLabel
  ],
})
export class MovieDetailPage implements OnInit {
  movie: Movie | undefined;
  comments: Comment[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private movieService: MovieService
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.movie = this.movieService.getById(id);
      this.comments = this.movieService.getCommentsByMovieId(id);
    }
  }
}