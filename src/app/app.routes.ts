import { Routes } from '@angular/router';

export const routes: Routes = [

    {
        path: 'login',
        pathMatch: 'full',
        loadComponent: () => import('./Authentication/Pages/login/login.component').then(m => m.LoginComponent)
    }
];
