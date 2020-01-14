import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SearchCarComponent } from './pages/search-car/search-car.component';
import { CarListComponent } from './pages/car-list/car-list.component';
import { CarDetailComponent } from './pages/car-detail/car-detail.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { LoginComponent } from './pages/login/login.component';
import { CarRentalGuideComponent } from './pages/car-rental-guide/car-rental-guide.component';
import { RegisterUserComponent } from './pages/register-user/register-user.component';
import { UserInfoComponent } from './pages/user-info/user-info.component';
import { ChangePassWordComponent } from './pages/change-pass-word/change-pass-word.component';

const routes: Routes = [
  
  { path: '', component: SearchCarComponent},
  { path: 'login', component: LoginComponent},
  { path: 'user-info', component: UserInfoComponent},
  { path: 'change-password', component:ChangePassWordComponent},
  { path: 'register', component: RegisterUserComponent},
  { path: 'cars', component: CarListComponent},
  { path: 'car-detail', component: CarDetailComponent},
  { path: 'car-rental-guide', component: CarRentalGuideComponent},
  { path: '**', component: PageNotFoundComponent},
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { } 