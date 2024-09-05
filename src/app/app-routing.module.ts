import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignupComponent } from './components/signup/signup.component';
import { LoginComponent } from './components/login/login.component';
import { TodoListComponent } from './components/todo-list/todo-list.component';
import { LogoutComponent } from './components/logout/logout.component';
import { AuthGuard } from './auth.guard';

const routes: Routes = [
{path:"",redirectTo:"login",pathMatch:'full'},
{path:"login",component:LoginComponent},
{path:"signup",component:SignupComponent},
{path:"tasks",component:TodoListComponent,canActivate: [AuthGuard]},
{path:"logout",component:LogoutComponent},
{path:"**",redirectTo:""}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
