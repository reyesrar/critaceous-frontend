import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';

// Attach JWT token to every outgoing request
export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const auth = inject(AuthService);
  if (auth.token) {
    req = req.clone({
      setHeaders: { Authorization: `Bearer ${auth.token}` }
    });
  }
  return next(req);
};