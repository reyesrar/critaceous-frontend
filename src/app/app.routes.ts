import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'splash',
    pathMatch: 'full',
  },
  {
    // Splash screen before auth
    path: 'splash',
    loadComponent: () =>
      import('./features/auth/splash/splash.page').then((m) => m.SplashPage),
  },
  {
    // Login screen
    path: 'login',
    loadComponent: () =>
      import('./features/auth/login/login.page').then((m) => m.LoginPage),
  },
  {
    // Register screen
    path: 'register',
    loadComponent: () =>
      import('./features/auth/register/register.page').then((m) => m.RegisterPage),
  },
  {
    // Main home screen
    path: 'app',
    loadComponent: () =>
      import('./features/home/home/home.page').then((m) => m.HomePage),
  },
  {
    // Explore / search screen
    path: 'explore',
    loadComponent: () =>
      import('./features/explore/explore/explore.page').then((m) => m.ExplorePage),
  },
  {
    // Movie detail
    path: 'movie/:id',
    loadComponent: () =>
      import('./features/movie-detail/movie-detail/movie-detail.page').then((m) => m.MovieDetailPage),
  },
  {
    // User profile
    path: 'profile',
    loadComponent: () =>
      import('./features/profile/profile/profile.page').then((m) => m.ProfilePage),
  },
  {
    // App settings
    path: 'settings',
    loadComponent: () =>
      import('./features/settings/settings/settings.page').then((m) => m.SettingsPage),
  },
];