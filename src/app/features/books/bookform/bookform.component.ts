import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BookService } from '../../auth/services/bookstore.services';
import { AuthService } from '../../auth/services/auth.services';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, FormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Title } from '@angular/platform-browser';
import { Book } from '../../users/model/uesr.model';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-bookform',
  standalone: true,
  imports: [FormsModule, CommonModule,ReactiveFormsModule],
  templateUrl: './bookform.component.html',
  styleUrl: './bookform.component.scss'
})
export class BookformComponent implements OnInit {
  @Input() book: Book | null = null;
  @Input() categories: string[] = [];
  @Output() bookSaved = new EventEmitter<void>();
  @Output() formClosed = new EventEmitter<void>();

  bookForm: FormGroup;
  loading = false;
  error = '';
  isEditMode = false;

  constructor(
    private formBuilder: FormBuilder,
    private bookService: BookService
  ) {
    this.bookForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      category: ['', [Validators.required]],
      price: [0, [Validators.required, Validators.min(0.01)]],
      description: ['', [Validators.required, Validators.minLength(10)]]
    });
  }

  ngOnInit(): void {
    if (this.book) {
      this.isEditMode = true;
      this.bookForm.patchValue({
        name: this.book.name,
        category: this.book.category,
        price: this.book.price,
        description: this.book.description
      });
    }
  }

  onSubmit(): void {
    if (this.bookForm.valid) {
      this.loading = true;
      this.error = '';

      const bookData = this.bookForm.value;

      if (this.isEditMode && this.book) {
        this.bookService.updateBook(this.book.id, bookData).subscribe({
          next: () => {
            this.bookSaved.emit();
          },
          error: (error) => {
            this.error = error.error?.message || 'Failed to update book';
            this.loading = false;
          }
        });
      } else {
        this.bookService.addBook(bookData).subscribe({
          next: () => {
            this.bookSaved.emit();
          },
          error: (error) => {
            this.error = error.error?.message || 'Failed to create book';
            this.loading = false;
          }
        });
      }
    }
  }

  onCancel(): void {
    this.formClosed.emit();
  }

  get f() { return this.bookForm.controls; }
}