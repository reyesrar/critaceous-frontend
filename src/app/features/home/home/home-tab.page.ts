import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import {
  IonContent, IonHeader, IonToolbar, IonTitle,
  IonCard, IonCardHeader, IonCardTitle, IonCardContent,
  IonBadge, IonAvatar, IonLabel
} from '@ionic/angular/standalone';
import { MovieService } from '../../../core/services/movie.service';
import { Movie, Comment } from '../../../core/models/movie.model';

@Component({
  selector: 'app-home-tab',
  templateUrl: './home-tab.page.html',
  styleUrls: ['./home-tab.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    IonContent, IonHeader, IonToolbar, IonTitle,
    IonCard, IonCardHeader, IonCardTitle, IonCardContent,
    IonBadge, IonAvatar, IonLabel
  ],
})
export class HomeTabPage implements OnInit {
  featured: Movie[] = [];
  latestComments: Comment[] = [];

  constructor(private movieService: MovieService, private router: Router) {}

  ngOnInit() {
    this.featured = this.movieService.getFeatured();
    this.latestComments = this.movieService.getLatestComments();
  }

  goToDetail(id: string) {
    this.router.navigate(['/movie', id]);
  }
}