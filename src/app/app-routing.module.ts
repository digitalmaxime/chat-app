import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


import { ChatroomComponent } from './components/chatroom/chatroom.component';
import { LoginFormComponent } from './components/login-form/login-form.component';
import { SignupFormComponent } from './components/signup-form/signup-form.component';

// import { appRoutes } from 'src/routes';
// const routes: Routes = appRoutes;
const routes: Routes = [
  { path: 'signup', component: SignupFormComponent },
  { path: 'login', component: LoginFormComponent },
  { path: 'chat', component: ChatroomComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full'},
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
