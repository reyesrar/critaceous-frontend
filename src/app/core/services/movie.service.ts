import { Injectable } from '@angular/core';
import { Movie, Comment } from '../models/movie.model';

@Injectable({ providedIn: 'root' })
export class MovieService {

  // Mock data until backend is ready
  private movies: Movie[] = [
    {
      id: '1',
      title: 'Dune: Part Two',
      poster: 'https://image.tmdb.org/t/p/w500/1pdfLvkbY9ohJlCjQH2CZjjYVvJ.jpg',
      synopsis: 'Paul Atreides unites with Chani and the Fremen while seeking revenge against the conspirators who destroyed his family.',
      releaseDate: '2024-03-01',
      genres: ['Sci-Fi', 'Adventure'],
      actors: ['Timothée Chalamet', 'Zendaya', 'Rebecca Ferguson'],
      directors: ['Denis Villeneuve'],
      userRating: 8.4,
      criticRating: 8.1,
      popularity: 98.3,
    },
    {
      id: '2',
      title: 'Oppenheimer',
      poster: 'https://image.tmdb.org/t/p/w500/8Gxv8gSFCU0XGDykEGv7zR1n2ua.jpg',
      synopsis: 'The story of J. Robert Oppenheimer and his role in the development of the atomic bomb.',
      releaseDate: '2023-07-21',
      genres: ['Drama', 'History'],
      actors: ['Cillian Murphy', 'Emily Blunt', 'Matt Damon'],
      directors: ['Christopher Nolan'],
      userRating: 8.9,
      criticRating: 9.1,
      popularity: 95.1,
    },
    {
      id: '3',
      title: 'Poor Things',
      poster: 'https://image.tmdb.org/t/p/w500/kCGlIMHnOm8JPXEeSo4DyadwJFk.jpg',
      synopsis: 'The incredible tale about the fantastical evolution of Bella Baxter, a young woman brought back to life.',
      releaseDate: '2023-12-08',
      genres: ['Comedy', 'Romance'],
      actors: ['Emma Stone', 'Mark Ruffalo', 'Willem Dafoe'],
      directors: ['Yorgos Lanthimos'],
      userRating: 7.9,
      criticRating: 8.8,
      popularity: 88.7,
    },
  ];

  private comments: Comment[] = [
    {
      id: 'c1',
      userId: 'u1',
      userName: 'Sarah K.',
      movieId: '1',
      movieTitle: 'Dune: Part Two',
      content: 'An absolute visual masterpiece. Villeneuve at his best.',
      rating: 9,
      createdAt: '2024-03-15',
      isCritic: false,
    },
    {
      id: 'c2',
      userId: 'u2',
      userName: 'CriticMark',
      movieId: '2',
      movieTitle: 'Oppenheimer',
      content: 'A towering achievement in filmmaking. Cillian Murphy is transcendent.',
      rating: 10,
      createdAt: '2024-03-10',
      isCritic: true,
    },
    {
      id: 'c3',
      userId: 'u3',
      userName: 'MovieFan92',
      movieId: '3',
      movieTitle: 'Poor Things',
      content: 'Bizarre, beautiful and unlike anything I have seen before.',
      rating: 8,
      createdAt: '2024-03-05',
      isCritic: false,
    },
  ];

  getFeatured(): Movie[] {
    // Return top movies by popularity
    return [...this.movies].sort((a, b) => b.popularity - a.popularity);
  }

  getLatestComments(): Comment[] {
    // Return comments sorted by date descending
    return [...this.comments].sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  }

  getById(id: string): Movie | undefined {
    return this.movies.find((m) => m.id === id);
  }

  getAll(): Movie[] {
    return this.movies;
  }

  getCommentsByMovieId(movieId: string): Comment[] {
    // Return comments filtered by movie
    return this.comments.filter((c) => c.movieId === movieId);
  }
}