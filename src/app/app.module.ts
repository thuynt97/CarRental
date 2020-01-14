import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './layout/header/header.component';
import { SearchCarComponent } from './pages/search-car/search-car.component';
import { FeatureAreaComponent } from './layout/feature-area/feature-area.component';
import { FooterAreaComponent } from './layout/footer-area/footer-area.component';
import { CarListComponent } from './pages/car-list/car-list.component';
import { CarDetailComponent } from './pages/car-detail/car-detail.component';
import { AppRoutingModule } from './app-routing.module';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { LoginComponent } from './pages/login/login.component';
import { CarRentalGuideComponent } from './pages/car-rental-guide/car-rental-guide.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import {MatSelectModule} from "@angular/material/select";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { HttpClientModule } from '@angular/common/http';
import {MatTabsModule} from '@angular/material/tabs';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { reducer } from './common/store.reducer';
import {MatSliderModule,  MatCheckboxModule} from '@angular/material';
import { NgxMatDatetimePickerModule, NgxMatTimepickerModule } from 'ngx-mat-datetime-picker';
import {MatDialogModule} from '@angular/material/dialog';
import {
  MatCardModule,
  MatButtonModule
} from '@angular/material';
import { TokenStorage } from './common/token.storage';
import { RegisterUserComponent } from './pages/register-user/register-user.component';
import { UserInfoComponent } from './pages/user-info/user-info.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SearchCarComponent,
    FeatureAreaComponent,
    FooterAreaComponent,
    CarListComponent,
    CarDetailComponent,
    PageNotFoundComponent,
    LoginComponent,
    CarRentalGuideComponent,
    RegisterUserComponent,
    UserInfoComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    HttpClientModule,
    MatTabsModule,
    StoreModule.forRoot(
      { datas: reducer },
      {
        runtimeChecks: {
          strictStateImmutability: true,
          strictActionImmutability: true
        }
      }
    ),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production }),
    MatSliderModule,
    MatCheckboxModule,
    NgxMatDatetimePickerModule,
    NgxMatTimepickerModule,
    MatDialogModule,
    MatCardModule,
    MatButtonModule

  ],
  providers: [
    MatDatepickerModule,
    TokenStorage
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
