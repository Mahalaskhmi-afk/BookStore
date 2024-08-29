import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {

  userForm! : FormGroup;
  userId! :any
  role! : any
  constructor(
    private authService : AuthService,
    private builder : FormBuilder
  ){}

  ngOnInit(): void {
    this.userForm = this.builder.group({
      userId : [this.userId],
      firstName : ['',Validators.required],
      lastName : ['',Validators.required],
      email : ['',Validators.required],
      gender : ['',Validators.required],
      address : ['',Validators.required],
      city : ['',Validators.required],
      state : ['',Validators.required],
      country : ['',Validators.required],
      pincode : ['',Validators.required],
    })

    this.getUserById()
  }

  getUserById(){
    this.userId = this.authService.getUserId();
    this.role = this.authService.getRole();
    this.authService.getUserProfile(this.userId).subscribe({
      next : (res) =>{
        this.userForm.patchValue(res)
      },
      error(err) {
        console.log("Something went wrong")
      },
    })
  }
}
