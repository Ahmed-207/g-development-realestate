import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  {
    path: 'project-details/:slug',
    renderMode: RenderMode.Server 
  },
  {
    path: '**',
    renderMode: RenderMode.Prerender
  }
];
