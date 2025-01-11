import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { LocalStorageService } from '../Services/local-storage.service';

export const authGuard: CanActivateFn = (route, state) => {
  
  const router = inject(Router);
  const localStorage = inject(LocalStorageService);
  if (localStorage.getVar('token')) {
    return true;
  } else {
    router.navigate(['login']);
    return false;
  }
};

