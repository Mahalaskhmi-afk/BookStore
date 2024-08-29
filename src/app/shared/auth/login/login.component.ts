import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { EmailValidator, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { error, log } from 'console';
import { PassThrough } from 'stream';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule, FormsModule,CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  loginForm!: FormGroup
  responseMessage ="";
  checked = false;

  constructor(
    private authService : AuthService,
    private builder : FormBuilder,
    private router : Router
  ){}


  ngOnInit(): void {
    this.loginForm = this.builder.group({
      email : ['', Validators.required],
      password : ['',Validators.required],
      choice :[false]
    });
  }

  onSubmit(){
    this.authService.signUp(this.loginForm.value).subscribe(
      {
        next: res =>{
          console.log(res)
          this.authService.setUserName(res.userName)
          this.authService.setToken(res.token)
          this.authService.setUserId(res.userId)
          this.responseMessage = "Login Successful"
          this.router.navigateByUrl('list')
          this.checked = this.loginForm.get("choice")?.value ? true : false;
          if(this.checked){
            this.authService.setRole("ROLE_ADMIN");
          }else{
            this.authService.setRole("ROLE_USER")
          }
        },
        error : err =>{
          console.log(err)
          this.responseMessage = err.err
        }
      }
    )
  }  
}
