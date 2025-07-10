import { Component, OnInit, ViewChild } from '@angular/core';
import { RegisterFormComponent } from "../../features/auth/components/register-form/register-form.component";
import { LoginFormComponent } from "../../features/auth/components/login-form/login-form.component";
import { RegisterPageComponent } from "../../features/auth/pages/register-page/register-page.component";
import { LoginPageComponent } from "../../features/auth/pages/login-page/login-page.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RegisterFormComponent, LoginFormComponent, RegisterPageComponent, LoginPageComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  hiddenPage = false;
  @ViewChild(RegisterPageComponent) registerPage!: RegisterPageComponent;

  ngOnInit(): void{
    console.log(this.registerPage)
  }


}
