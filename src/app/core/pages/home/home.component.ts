import { AfterViewInit, Component, ContentChild, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { RegisterFormComponent } from "../../../features/auth/components/register-form/register-form.component";
import { LoginFormComponent } from "../../../features/auth/components/login-form/login-form.component";

import { FormBuilder, FormGroup } from '@angular/forms';
import { BookService } from '../../../features/auth/services/book.services';
import { AuthService } from '../../../features/auth/services/auth.services';
import { Book } from '../../../features/users/model/uesr.model';
import { Router } from '@angular/router';
import { CommonModule, DecimalPipe, NgIf } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { SlicePipe } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  standalone:true,
  imports:[ReactiveFormsModule,DecimalPipe,SlicePipe,NgIf,CommonModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  books: Book[] = [];
  categories: string[] = [];
  searchForm: FormGroup;
  loading = false;
  selectedBook: Book | null = null;
  showBookModal = false;

  constructor(
    private fb: FormBuilder,
    private bookService: BookService,
    private authService: AuthService,
    private router: Router
  ) {
    this.searchForm = this.fb.group({
      query: [''],
      category: ['']
    });
  }

  ngOnInit(): void {
    this.loadBooks();
    this.loadCategories();
  }

  loadBooks(): void {
    this.loading = true;
    const { query, category } = this.searchForm.value;
    
    this.bookService.searchBooks(query, category).subscribe({
      next: (books) => {
        this.books = books;
        this.loading = false;
      },
      error: (err) => {
        console.error('Error loading books:', err);
        this.loading = false;
      }
    });
  }

  loadCategories(): void {
    this.bookService.getCategories().subscribe({
      next: (categories) => {
        this.categories = categories;
      },
      error: (err) => {
        console.error('Error loading categories:', err);
      }
    });
  }

  onSearch(): void {
    this.loadBooks();
  }

  onClearSearch(): void {
    this.searchForm.reset();
    this.loadBooks();
  }

  onAddBook(): void {
    this.selectedBook = null;
    this.showBookModal = true;
  }

  onEditBook(book: Book): void {
    this.selectedBook = book;
    this.showBookModal = true;
  }

  onDeleteBook(book: Book): void {
    if (confirm(`Are you sure you want to delete "${book.name}"?`)) {
      this.bookService.deleteBook(book.id).subscribe({
        next: () => {
          this.loadBooks();
        },
        error: (err) => {
          console.error('Error deleting book:', err);
          alert('Failed to delete book. Please try again.');
        }
      });
    }
  }

  onBookSaved(): void {
    this.showBookModal = false;
    this.selectedBook = null;
    this.loadBooks();
  }

  onModalClose(): void {
    this.showBookModal = false;
    this.selectedBook = null;
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
