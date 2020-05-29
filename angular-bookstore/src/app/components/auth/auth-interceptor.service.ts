import { HttpInterceptor, HttpRequest, HttpResponse, HttpHandler } from '@angular/common/http';

export class AuthInterceptorService implements HttpInterceptor{
  intercept(req:HttpRequest<any>,next:HttpHandler)
    {
    const xhr = req.clone({
      withCredentials: true

    });

    return next.handle(xhr);
    }



}
