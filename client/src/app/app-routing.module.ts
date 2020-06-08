import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './user/components/login/login.component';
import { RegisterComponent } from './user/components/register/register.component';
import { MessageComponent } from './chat/components/message/message.component';
import { AuthService } from './shared/service/auth.service';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'message', component: MessageComponent,  canActivate: [AuthService]},
  { path: '',   redirectTo: 'login', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
