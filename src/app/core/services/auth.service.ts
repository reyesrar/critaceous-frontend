import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage-angular';
import { firstValueFrom } from 'rxjs';
import { environment } from '../../../environments/environment';

const API = environment.apiUrl;

@Injectable({ providedIn: 'root' })
export class AuthService {
  private _token: string | null = null;

  constructor(
    private http: HttpClient,
    private router: Router,
    private storage: Storage
  ) {}

  async init() {
    // Initialize storage and load saved token
    await this.storage.create();
    this._token = await this.storage.get('token');
  }

  get token(): string | null {
    return this._token;
  }

  async register(name: string, email: string, password: string) {
    const res: any = await firstValueFrom(
      this.http.post(`${API}/auth/register`, { name, email, password })
    );
    await this.saveSession(res);
  }

  async login(email: string, password: string) {
    const res: any = await firstValueFrom(
      this.http.post(`${API}/auth/login`, { email, password })
    );
    await this.saveSession(res);
  }

  async logout() {
    this._token = null;
    await this.storage.remove('token');
    await this.storage.remove('user');
    this.router.navigate(['/login'], { replaceUrl: true });
  }

  async getUser() {
    return this.storage.get('user');
  }

  isLoggedIn(): boolean {
    return !!this._token;
  }

  private async saveSession(res: { token: string; user: any }) {
    this._token = res.token;
    await this.storage.set('token', res.token);
    await this.storage.set('user', res.user);
    this.router.navigate(['/app'], { replaceUrl: true });
  }
}