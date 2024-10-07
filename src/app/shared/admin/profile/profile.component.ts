import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'] // Fix styleUrl to styleUrls
})
export class ProfileComponent {
  userForm!: FormGroup;
  userId!: any;
  role!: any;

  constructor(private authService: AuthService, private builder: FormBuilder) {}

  ngOnInit(): void {
    this.userForm = this.builder.group({
      userId: [this.userId],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', Validators.required],
      gender: ['', Validators.required],
      address: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],
      country: ['', Validators.required],
      pinCode: ['', Validators.required],
      image: [''] // Add image field to the form
    });

    this.getUserById();
  }

  getUserById(): void {
    this.userId = this.authService.getUserId();
    this.role = this.authService.getRole();

    this.authService.getUserProfile(this.userId).subscribe({
      next: (res) => {
        console.log(res);
        this.userForm.patchValue(res);
      },
      error: (err) => {
        console.error('Error loading user profile:', err);
      }
    });
  }

  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        const img = document.getElementById('profilePicPreview') as HTMLImageElement;
        img.src = e.target.result; // Set the image source to the file data
        img.style.display = 'block'; // Ensure the image is displayed
        this.userForm.patchValue({ image: e.target.result.split(',')[1] }); // Store base64 image data in form
      };
      reader.readAsDataURL(file); // Read the file as a data URL
    }
  }
}
