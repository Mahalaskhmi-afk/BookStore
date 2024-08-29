import { Component } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {

  constructor(
    private authService : AuthService,
    private router : Router
  ){}

  userName!: any
  userId!: any

  ngOnInit(): void {
    this.userName = this.authService.getUserName()
    this.userId = this.authService.getUserId()
  }

  logout(){
    this.authService.logout()
    this.router.navigateByUrl('/login')
  }
}
