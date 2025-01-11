import { Routes } from '@angular/router';
import { authGuard } from './Authentication/Guards/auth.guard';
export const routes: Routes = [

    {
        path: 'login',
        pathMatch: 'full',
        loadComponent: () => import('./Authentication/Pages/login/login.component').then(m => m.LoginComponent)
    },
    {
        path: 'register',
        pathMatch: 'full',
        loadComponent: () => import('./Authentication/Pages/register/register.component').then(m => m.RegisterComponent)
    },
    {
        path: 'home',
        pathMatch: 'full',
        loadComponent: () => import('./Posts/Pages/home/home.component').then(m => m.HomeComponent),
        canActivate: [authGuard]
    },
    {
        path: 'post',
        pathMatch: 'full',
        loadComponent: () => import('./Posts/Pages/post/post.component').then(m => m.PostComponent),
        canActivate: [authGuard]
    },
    {
        path: '',
        pathMatch: 'full',
        redirectTo: 'login'
    }
];
