import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from "./core/components/navbar/navbar.component";
import { RegisterFormComponent } from './features/auth/components/register-form/register-form.component';
import { LoginFormComponent } from "./features/auth/components/login-form/login-form.component";
import { HomeComponent } from "./pages/home/home.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent, RegisterFormComponent, LoginFormComponent, HomeComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'books';
  // hiddenPage = false;
}
