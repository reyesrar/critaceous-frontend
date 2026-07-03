import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'splash',
    pathMatch: 'full',
  },
  {
    path: 'splash',
    loadComponent: () =>
      import('./features/auth/splash/splash.page').then((m) => m.SplashPage),
  },
  {
    path: 'login',
    loadComponent: () =>
      import('./features/auth/login/login.page').then((m) => m.LoginPage),
  },
  {
    path: 'register',
    loadComponent: () =>
      import('./features/auth/register/register.page').then((m) => m.RegisterPage),
  },
  {
    path: 'app',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./features/home/home/home.page').then((m) => m.HomePage),
    children: [
      {
        path: 'home',
        loadComponent: () =>
          import('./features/home/home/home-tab.page').then((m) => m.HomeTabPage),
      },
      {
        path: 'explore',
        loadComponent: () =>
          import('./features/explore/explore/explore.page').then((m) => m.ExplorePage),
      },
      {
        path: 'profile',
        loadComponent: () =>
          import('./features/profile/profile/profile.page').then((m) => m.ProfilePage),
      },
      {
        path: 'settings',
        loadComponent: () =>
          import('./features/settings/settings/settings.page').then((m) => m.SettingsPage),
      },
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full',
      },
    ],
  },
  {
    path: 'movie/:tmdbId',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./features/movie-detail/movie-detail/movie-detail.page').then((m) => m.MovieDetailPage),
  },
];