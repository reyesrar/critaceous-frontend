import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { environment } from '../../../environments/environment';

const API = environment.apiUrl;

@Injectable({ providedIn: 'root' })
export class ApiService {
  constructor(private http: HttpClient) {}

  // Movies
  searchMovies(q: string) {
    return firstValueFrom(this.http.get<any[]>(`${API}/movies/search`, { params: { q } }));
  }

  getMovie(tmdbId: string) {
    return firstValueFrom(this.http.get<any>(`${API}/movies/${tmdbId}`));
  }

  getAllMovies(filters?: {
    genre?: string;
    sortBy?: string;
    minUserRating?: number;
    minCriticRating?: number;
  }) {
    let params = new HttpParams();
    if (filters?.genre) params = params.set('genre', filters.genre);
    if (filters?.sortBy) params = params.set('sortBy', filters.sortBy);
    if (filters?.minUserRating) params = params.set('minUserRating', filters.minUserRating);
    if (filters?.minCriticRating) params = params.set('minCriticRating', filters.minCriticRating);
    return firstValueFrom(this.http.get<any[]>(`${API}/movies`, { params }));
  }

  // Comments
  getCommentsByMovie(tmdbId: string) {
    return firstValueFrom(this.http.get<any[]>(`${API}/comments/movie/${tmdbId}`));
  }

  createComment(tmdbId: string, content: string, rating: number) {
    return firstValueFrom(this.http.post(`${API}/comments`, { tmdbId, content, rating }));
  }

  deleteComment(id: string) {
    return firstValueFrom(this.http.delete(`${API}/comments/${id}`));
  }

  // Users
  getMe() {
    return firstValueFrom(this.http.get<any>(`${API}/users/me`));
  }

  updateMe(data: { name?: string; email?: string }) {
    return firstValueFrom(this.http.put(`${API}/users/me`, data));
  }

  uploadProfilePicture(file: File) {
    const form = new FormData();
    form.append('picture', file);
    return firstValueFrom(this.http.post<{ url: string }>(`${API}/users/me/picture`, form));
  }

  switchRole() {
    return firstValueFrom(this.http.patch<{ role: string }>(`${API}/users/me/role`, {}));
  }
}