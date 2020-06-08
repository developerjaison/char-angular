import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { RouterModule } from '@angular/router';
import { ApiService } from '../shared/service/api.service';

@NgModule({
  declarations: [RegisterComponent, LoginComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule
  ],
  exports: [RegisterComponent, LoginComponent],
  entryComponents: [RegisterComponent, LoginComponent],
  providers: [ApiService]
})
export class UserModule { }
