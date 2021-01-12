import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {UserListPageComponent} from './user/user-list-page.component';
import {UserLoginComponent} from './login/user-login.component';
import {AuthGuard} from './guards/auth.guard';
import {UserDetailPageComponent} from './user/user-detail-page.component';
import {AdminLoginComponent} from './login/admin-login.component';
import {AdminPageComponent} from './admin/admin-page.component';

const routes: Routes = [
  // Login pages
  {
    path: 'admin/login',
    component: AdminLoginComponent,
  },
  {
    path: 'login',
    component: UserLoginComponent,
  },
  {
    path: '',
    canActivate: [AuthGuard],
    children: [
      // Common section
      {
        path: '',
        component: UserListPageComponent,
      },
      {
        path: 'user/:username',
        component: UserDetailPageComponent,
      }
    ],
  },
  // Admin section
  {
    path: 'admin',
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full',
      },
      {
        path: ':module',
        component: AdminPageComponent,
      }
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
