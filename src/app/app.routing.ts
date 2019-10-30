import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './login/index';
import { SearchComponent } from './search/index';
import { AuthGuard } from './_guards/index';

const appRoutes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'login', component: LoginComponent },
  { path: 'search', component: SearchComponent, canActivate: [AuthGuard] },

  // otherwise redirect to home
  { path: '**', redirectTo: '' }
];

export const routing = RouterModule.forRoot(appRoutes);
