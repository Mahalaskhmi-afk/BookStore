import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from './shared/services/auth.service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {

  const service = inject(AuthService)
  const token = service.getToken()

  const cloneReq = req.clone({
    setHeaders:{Authorization:`Bearer ${token}`}
  })

  return next(cloneReq);
};
