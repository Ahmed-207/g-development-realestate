import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '', loadComponent: () => import('./core/layouts/user/user.component').then((c) => c.UserComponent), children: [
            {
                path: '', redirectTo: 'home', pathMatch: 'full'
            },
            {
                path: 'home', loadComponent: () => import('./features/home/home.component').then((c) => c.HomeComponent), title: 'G Developments'
            },
            {
                path: 'about', loadComponent: () => import('./features/about-us/about-us.component').then((c) => c.AboutUsComponent), title: 'G Developments | About Us'
            },
            {
                path: 'project-details/:slug', loadComponent: () => import('./features/project-details/project-details.component').then((c) => c.ProjectDetailsComponent), title: 'Project Details Page'
            },
            {
                path: 'contact-us', loadComponent: () => import('./features/contact-us/contact-us.component').then((c) => c.ContactUsComponent), title: 'G Development | Contact Us'
            },
            { path: '**', loadComponent: () => import('./features/not-found/not-found.component').then((c) => c.NotFoundComponent), title: 'Error !' }
        ]
    }
];
