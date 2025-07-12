import { Component, OnInit } from '@angular/core';
import { BookService } from '../../auth/services/bookstore.services';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../../auth/services/auth.services';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-booklist',
  standalone: true,
  imports: [RouterModule,CommonModule],
  templateUrl: './booklist.component.html',
  styleUrl: './booklist.component.scss'
})
export class BooklistComponent implements OnInit {
  books: any[] = [];
   loading: boolean = false;
  error: string | null = null;

   constructor(
    private http: HttpClient,
    private authService: AuthService
    // private bookservice: BookService
  ) {}

  

  ngOnInit() {
    this.loadBooks();
  }

 loadBooks() {
    const headers = this.authService.isAuthenticated();
    
    // Fixed: Changed from 'books' to 'Book' to match controller route
    this.http.get('http://localhost:5047/api/Book',).subscribe({
      next: (books: any) => {
        this.books = books;
        console.log('Books loaded successfully:', books);
      },
      error: (error) => {
        console.error('Error loading books:', error);
        if (error.status === 401) {
          console.log('User not authenticated');
          // Handle unauthorized access
        }
      }
    });
  }

 deleteBook(id: number): void {
    if (confirm('Are you sure you want to delete this book?')) {
      const headers = this.authService.isAuthenticated();
      
      // Fixed: Changed from 'books' to 'Book' to match controller route
      this.http.delete(`http://localhost:5047/api/Book/${id}`).subscribe({
        next: () => {
          this.books = this.books.filter(book => book.id !== id);
          console.log('Book deleted successfully');
        },
        error: (error) => {
          console.error('Error deleting book:', error);
          this.error = 'Failed to delete book';
        }
      });
    }
}
}