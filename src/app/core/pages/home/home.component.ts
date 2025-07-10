import { AfterViewInit, Component, ContentChild, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { RegisterFormComponent } from "../../../features/auth/components/register-form/register-form.component";
import { LoginFormComponent } from "../../../features/auth/components/login-form/login-form.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RegisterFormComponent, LoginFormComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit,AfterViewInit{
  @ContentChild(RegisterFormComponent) register!: RegisterFormComponent;
  // @ViewChildren(RegisterFormComponent) registerForm!: QueryList<RegisterFormComponent>;
  hiddenPage = false;
  @ViewChild(RegisterFormComponent) registerFormComponent!: RegisterFormComponent;

  ngOnInit(): void {
    // console.log(this.registerFormComponent)

  }
  ngAfterViewInit(): void {
    console.log("registerFormComponents already initiated....")
  }

}
