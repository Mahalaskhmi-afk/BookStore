import { Component, inject } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { LoginComponent } from "./shared/auth/login/login.component";
import { RegisterComponent } from "./shared/auth/register/register.component";
import { NavbarComponent } from "./shared/navbar/navbar.component";
import { CommonModule } from '@angular/common';
import { ListComponent } from "./shared/admin/list/list.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, LoginComponent, 
    LoginComponent, RegisterComponent, NavbarComponent, 
    CommonModule, ListComponent, ListComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {

  public router = inject(Router)
  title = 'BookShop';
}
