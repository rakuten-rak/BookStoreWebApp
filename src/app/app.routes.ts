import { RouterModule, Routes } from '@angular/router';
import { RegisterFormComponent } from './features/auth/components/register-form/register-form.component';
import { LoginFormComponent } from './features/auth/components/login-form/login-form.component';
import { NgModule } from '@angular/core';
import { RegisterPageComponent } from './features/auth/pages/register-page/register-page.component';
import { LoginPageComponent } from './features/auth/pages/login-page/login-page.component';
import { BookformComponent } from './features/books/bookform/bookform.component';
import { BooklistComponent } from './features/books/booklist/booklist.component';

export const routes: Routes = [
    { path: '', redirectTo: 'books', pathMatch: 'full' },
    {path:'register', component: RegisterPageComponent},
    {path:'login', component:LoginPageComponent},
    { path: 'books', component: BooklistComponent },
    { path: 'add-book', component: BookformComponent },
    { path: 'edit-book/:id', component: BookformComponent }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})

export class AppRoutingModule {}



