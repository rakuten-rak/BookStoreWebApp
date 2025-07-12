import { Component,Injectable,OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { User } from '../../../features/users/model/uesr.model'
import { AuthService } from '../../../features/auth/services/auth.services'
import { RouterOutlet } from "@angular/router";
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterOutlet,RouterModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})

@Injectable({
  providedIn: 'root',
})
export class NavbarComponent implements OnInit {

  isConnected: boolean = false;
  // user: User | undefined; // my web app


  // my web app
  constructor(private authService: AuthService) {
    // this.isConnected = this.authService.isAuthenticated;
  }

  ngOnInit(): void {
    // my web app
    // this.authService.isConnected$.subscribe((connectionState: boolean) => {
    //   this.isConnected = connectionState;
    //   // this.user = this.authService.authenticatedUser; // my web app
    // });

    //
    // this.authService.$isAuthenticated.subscribe((isAuthenticated) => {
    //
    //   this.isConnected = isAuthenticated;
    // });

    // my web app
    // this.authService.$authenticatedUser.subscribe((authenticatedUser) => {
    //   this.user = authenticatedUser;
    // });
  }

  logout(): void {
    // this.authService.logout();
  }



}
