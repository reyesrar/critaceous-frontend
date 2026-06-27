import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import {
  IonContent, IonHeader, IonToolbar, IonTitle,
  IonSearchbar, IonSelect, IonSelectOption,
  IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonBadge
} from '@ionic/angular/standalone';
import { MovieService } from '../../../core/services/movie.service';
import { Movie } from '../../../core/models/movie.model';

@Component({
  selector: 'app-explore',
  templateUrl: './explore.page.html',
  styleUrls: ['./explore.page.scss'],
  standalone: true,
  imports: [
    CommonModule, FormsModule,
    IonContent, IonHeader, IonToolbar, IonTitle,
    IonSearchbar, IonSelect, IonSelectOption,
    IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonBadge
  ],
})
export class ExplorePage implements OnInit {
  allMovies: Movie[] = [];
  filtered: Movie[] = [];

  searchTerm = '';
  selectedGenre = '';
  sortBy = 'popularity';

  genres: string[] = [];

  constructor(private movieService: MovieService, private router: Router) {}

  ngOnInit() {
    this.allMovies = this.movieService.getAll();
    this.extractGenres();
    this.applyFilters();
  }

  extractGenres() {
    // Build unique genre list from all movies
    const genreSet = new Set<string>();
    this.allMovies.forEach((m) => m.genres.forEach((g) => genreSet.add(g)));
    this.genres = Array.from(genreSet).sort();
  }

  applyFilters() {
    let result = [...this.allMovies];

    // Filter by search term
    if (this.searchTerm.trim()) {
      result = result.filter((m) =>
        m.title.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    }

    // Filter by genre
    if (this.selectedGenre) {
      result = result.filter((m) => m.genres.includes(this.selectedGenre));
    }

    // Sort results
    result.sort((a, b) => {
      if (this.sortBy === 'userRating') return b.userRating - a.userRating;
      if (this.sortBy === 'criticRating') return b.criticRating - a.criticRating;
      if (this.sortBy === 'releaseDate') return new Date(b.releaseDate).getTime() - new Date(a.releaseDate).getTime();
      return b.popularity - a.popularity;
    });

    this.filtered = result;
  }

  goToDetail(id: string) {
    this.router.navigate(['/movie', id]);
  }
}