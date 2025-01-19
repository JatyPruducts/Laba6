import { Routes } from '@angular/router';
import { BaseLayoutComponent } from './layout/base-layout/base-layout.component';
import { MainPageComponent } from './pages/main-page/main-page.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { TourDetailComponent } from './tour-detail/tour-detail.component';
import { AuthGuard } from './services/auth.guard';


export const routes: Routes = [
  // ПУТИ ДЛЯ ЛОГИНА/РЕГИСТРАЦИИ (доступны без авторизации)
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },

  // ВСЁ ОСТАЛЬНОЕ ПОД GUARD
  {
    path: '',
    component: BaseLayoutComponent,
    canActivate: [AuthGuard], // <-- проверяем
    children: [
      { path: '', component: MainPageComponent },
      { path: 'tours/:id', component: TourDetailComponent },
      // и т.д.
    ]
  },

  { path: '**', redirectTo: '' },
];