import { HttpInterceptor, HttpRequest, HttpResponse, HttpHandler } from '@angular/common/http';

export class AuthInterceptorService implements HttpInterceptor {

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    if (localStorage.token!==undefined) {
      const xhr = req.clone({
        setHeaders: {
          'Content-Type': 'application/json; charset=utf-8',
          'Accept': 'application/json',
          'Authorization': localStorage.token,
        },
      });
      return next.handle(xhr);
    }

    return next.handle(req);
  }



}
