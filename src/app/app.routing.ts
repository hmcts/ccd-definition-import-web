import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { ImportComponent } from './feature/import/import.component';
import { OAuth2RedirectComponent } from './feature/oauth2/oauth2-redirect.component';

const routes: Routes = [
  {
    path: 'oauth2redirect',
    component: OAuth2RedirectComponent
  },
  {
    path: '',
    component: AppComponent,
    children: [
      {
        path: '', pathMatch: 'full', redirectTo: 'import'
      },
      {
        path: 'import',
        component: ImportComponent
      }
    ]
  }
];

export const routing = RouterModule.forRoot(routes);
