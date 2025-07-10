import { Component } from '@angular/core';
import { AuthService } from '../../../../features/auth/services/auth.services';
import { ReactiveFormsModule,FormsModule, FormControl, Validators, FormBuilder } from '@angular/forms';
import { passwordMatchValidator } from '../../../../../passwordMatch.interface';
import {RouterModule} from '@angular/router';




@Component({
  selector: 'app-register-form',
  standalone: true,
  imports: [ReactiveFormsModule,RouterModule],
  templateUrl: './register-form.component.html',
  styleUrl: './register-form.component.scss'
})
export class RegisterFormComponent {

  constructor(private authService: AuthService,private formBuilder: FormBuilder){

  }
  registerForm = this.formBuilder.group(
    {
      email: new FormControl('', [
        Validators.required,
        Validators.email,
        Validators.minLength(6),
        Validators.maxLength(40),
      ]),
      password: new FormControl('', [
        Validators.required,
        // Validators.pattern('^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$'),
        Validators.minLength(6),
        Validators.maxLength(25),
      ]),
      passwordConfirm: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
      ]),
    },
    { validators: passwordMatchValidator }
  );
  ngOnInit() {
    console.log("Register User here.......")
  }
  onSubmit(): void {
    const user = this.registerForm.value;
    // this.authService.register(user);
    this.registerForm.reset();
  }

}
