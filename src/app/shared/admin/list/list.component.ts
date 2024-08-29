import { Component, OnInit } from '@angular/core';
import { BooksService } from '../../services/books.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-list',
  standalone: true,
  imports:[CommonModule],
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  books: any[] = [];

  constructor(private service: BooksService) {}

  ngOnInit(): void {
    this.getBooks(); // Fetch the books on component initialization
  }

  getBooks(): void {
    this.service.getBooks().subscribe({
      next: (res) => {
        console.log(res)
        this.books = res.map(book => ({
          ...book,
          processedImg: book.returnedImage ? 'data:image/jpeg;base64,' + book.returnedImage : 'assets/placeholder.png'
        }));
      },
      error: (err) => {
        console.error('Error loading books:', err);
      }
    });
  }
  
}
