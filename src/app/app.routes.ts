import { RouterModule, Routes } from '@angular/router';
import { RegisterFormComponent } from './features/auth/components/register-form/register-form.component';
import { LoginFormComponent } from './features/auth/components/login-form/login-form.component';
import { NgModule } from '@angular/core';

export const routes: Routes = [
    {path:'register', component: RegisterFormComponent},
    {path:'login', component:LoginFormComponent},
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})

export class AppRoutingModule {}