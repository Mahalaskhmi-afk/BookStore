import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule, FormsModule, CommonModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  registerForm! : FormGroup;
  responseMessage = '';

  constructor(
    private service : AuthService,
    private builder : FormBuilder
  ){}

  ngOnInit(): void {
    this.registerForm = this.builder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
      address: ['', Validators.required],
      city: ['', Validators.required],
      role: ['USER_ROLE']
    });
  }

  onRoleChange(event: any) {
    if (event.target.checked) {
      this.registerForm.patchValue({ role: 'ROLE_ADMIN' });
    } else {
      this.registerForm.patchValue({ role: 'ROLE_USER' });
    }
  }

  onSubmit() {
    if (this.registerForm.valid) {
      this.service.signIn(this.registerForm.value).subscribe({
        next: res => {
          console.log(res);
          this.responseMessage = "Registered Successfully \n Login to continue"
        },
        error: err => {
          console.log(err);
          this.responseMessage = err.error
        }
      });
    }
  }
}
