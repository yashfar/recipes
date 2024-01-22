import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpParams
} from '@angular/common/http';
import { take, exhaustMap } from 'rxjs/operators';
import { AuthService } from 'src/app/shared/auth.service';

@Injectable()
export class AuthInterceptorService implements HttpInterceptor {
  constructor(private authService: AuthService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    return this.authService.user.pipe(
      take(1),
      exhaustMap(user => {
        if (!user) {
          return next.handle(req);
        }

        // Ensure that user.token is not null before using it
        const token = user.token || ''; // Provide a default value if it's null

        const modifiedReq = req.clone({
          params: new HttpParams().set('auth', token)
        });
        return next.handle(modifiedReq);
      })
    );
  }
}
