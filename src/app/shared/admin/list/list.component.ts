import { Component, OnInit } from '@angular/core';
import { BooksService } from '../../services/books.service';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-list',
  standalone: true,
  imports:[CommonModule],
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  books: any[] = [];
  currentDate!: string;
  bookForm! : FormGroup
  image!:File
  role!:string


  constructor(private service: BooksService,
    private fb : FormBuilder,
    private authService : AuthService
  ) {}
  ngOnInit(): void {

    const role = this.authService.getRole();
    this.getBooks();

    this.bookForm = this.fb.group({
      title: ['', Validators.required],
      author: ['', Validators.required],
      genre: ['', Validators.required],
      price: ['', Validators.required],
      stock: ['', Validators.required],
    })

  }

  getBooks(): void {
    this.service.getBooks().subscribe({
      next: (res) => {
        console.log(res)
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
}
