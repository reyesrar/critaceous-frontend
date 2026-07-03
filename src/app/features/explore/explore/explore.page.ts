import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import {
  IonContent, IonHeader, IonToolbar, IonTitle,
  IonSearchbar, IonSelect, IonSelectOption,
  IonCard, IonBadge, IonSpinner
} from '@ionic/angular/standalone';
import { ApiService } from '../../../core/services/api.service';
import { RatingBadgeComponent } from '../../../shared/components/rating-badge/rating-badge.component';

@Component({
  selector: 'app-explore',
  templateUrl: './explore.page.html',
  styleUrls: ['./explore.page.scss'],
  standalone: true,
  imports: [
    CommonModule, FormsModule, RatingBadgeComponent,
    IonContent, IonHeader, IonToolbar, IonTitle,
    IonSearchbar, IonSelect, IonSelectOption,
    IonCard, IonBadge, IonSpinner
  ],
})
export class ExplorePage implements OnInit {
  results: any[] = [];
  searchTerm = '';
  selectedGenre = '';
  sortBy = 'popularity';
  minUserRating = 0;
  minCriticRating = 0;
  genres: string[] = [];
  loading = false;
  // Track if user is searching TMDB or browsing local DB
  searchingTMDB = false;

  constructor(private api: ApiService, private router: Router) {}

  async ngOnInit() {
    await this.loadLocal();
  }

  async loadLocal() {
    this.loading = true;
    try {
      this.results = await this.api.getAllMovies({
        genre: this.selectedGenre,
        sortBy: this.sortBy,
        minUserRating: this.minUserRating,
        minCriticRating: this.minCriticRating,
      });
      this.extractGenres();
      this.searchingTMDB = false;
    } finally {
      this.loading = false;
    }
  }

  async onSearch() {
    if (!this.searchTerm.trim()) { await this.loadLocal(); return; }
    this.loading = true;
    try {
      // Search TMDB for broader results
      this.results = await this.api.searchMovies(this.searchTerm);
      this.searchingTMDB = true;
    } finally {
      this.loading = false;
    }
  }

  async applyFilters() {
    this.searchTerm = '';
    await this.loadLocal();
  }

  extractGenres() {
    const set = new Set<string>();
    this.results.forEach((m: any) => m.genres?.forEach((g: string) => set.add(g)));
    this.genres = Array.from(set).sort();
  }

  goToDetail(movie: any) {
    // TMDB results use 'id', local DB uses 'tmdbId'
    const id = movie.tmdbId ?? String(movie.id);
    this.router.navigate(['/movie', id]);
  }
}