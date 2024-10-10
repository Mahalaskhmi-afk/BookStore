import { Component, OnInit } from '@angular/core';
import { BooksService } from '../../services/books.service';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  books: any[] = [];
  currentDate!: string;
  bookForm!: FormGroup;
  image!: File;
  responseMessage = '';

  constructor(
    private service: BooksService,
    private fb: FormBuilder,
    public authService: AuthService
  ) {}

  ngOnInit(): void {
    this.getBooks();

    this.bookForm = this.fb.group({
      title: ['', Validators.required],
      author: ['', Validators.required],
      genre: ['', Validators.required],
      price: ['', Validators.required],
      stock: ['', Validators.required],
    });
  }

  getBooks(): void {
    this.service.getBooks().subscribe({
      next: (res) => {
        console.log(res);
        this.books = res.map(book => ({
          ...book,
          processedImg: book.image ? 'data:image/jpeg;base64,' + book.image : 'assets/placeholder.png'
        }));
      },   
      error: (err) => {
        console.error('Error loading books:', err);
      }
    });
  }

  onFileSelected(event: Event) {
    const fileInput = event.target as HTMLInputElement;
    if (fileInput.files && fileInput.files.length > 0) {
        this.bookForm.patchValue({
            image: fileInput.files[0]
        });
    } else {
        console.warn("No file selected");
        this.bookForm.patchValue({
            image: null
        });
    }
}


  addBooks() {
    if (this.bookForm.valid) {
      const formData = new FormData();
    
      Object.keys(this.bookForm.value).forEach(key => {
        formData.append(key, this.bookForm.value[key]);
      });

      if (this.image) {
        formData.append('image', this.image, this.image.name);
      }

      this.service.addBooks(formData).subscribe({
        next: (res) => {
          console.log(res);
          this.responseMessage = 'Book added successfully';
          this.bookForm.reset();
        },
        error: (err) => {
          console.error(err);
          this.responseMessage = err.error;
        }
      });
    }
  }
}
