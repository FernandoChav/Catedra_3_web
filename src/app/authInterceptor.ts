import { HttpInterceptorFn } from '@angular/common/http';

/**
 * This interceptor is used for inject a berar json token
 * for make requests based on rol
 * 
 * @param req the requests
 * @param next used for redirect the requests
 * @returns a new requets
 */

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const token = localStorage.getItem('token')?.slice(1, -1);

  if (token) {
    const clonedRequest = req.clone({
      headers : req.headers.set("authorization", `Bearer ${token}`)
    });

    return next(clonedRequest);
  }

  return next(req);
};