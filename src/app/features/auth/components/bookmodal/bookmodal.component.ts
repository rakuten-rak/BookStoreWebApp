import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BookService } from '../../services/book.services';
import { Book } from '../../../users/model/uesr.model';
import { ReactiveFormsModule } from '@angular/forms';
import { NgFor,NgForOf, NgIf } from '@angular/common';

@Component({
  selector: 'app-bookmodal',
  standalone: true,
  imports: [ReactiveFormsModule,NgFor,NgForOf,NgIf],
  templateUrl: './bookmodal.component.html',
  styleUrl: './bookmodal.component.scss'
})
export class BookmodalComponent {
  @Input() show = false;
  @Input() book: Book | null = null;
  @Input() categories: string[] = [];
  @Output() save = new EventEmitter<void>();
  @Output() close = new EventEmitter<void>();

  bookForm: FormGroup;
  loading = false;
  error = '';

  constructor(
    private fb: FormBuilder,
    private bookService: BookService
  ) {
    this.bookForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      category: ['', Validators.required],
      price: ['', [Validators.required, Validators.min(0)]],
      description: ['', [Validators.required, Validators.minLength(10)]]
    });
  }

  ngOnInit(): void {
    this.resetForm();
  }

  ngOnChanges(): void {
    if (this.show) {
      this.resetForm();
    }
  }

  resetForm(): void {
    if (this.book) {
      this.bookForm.patchValue({
        name: this.book.name,
        category: this.book.category,
        price: this.book.price,
        description: this.book.description
      });
    } else {
      this.bookForm.reset();
    }
    this.error = '';
  }

  onSubmit(): void {
    if (this.bookForm.valid) {
      this.loading = true;
      this.error = '';

      const bookData = this.bookForm.value;

      if (this.book) {
        // Update existing book
        this.bookService.updateBook(this.book.id, bookData).subscribe({
          next: () => {
            this.loading = false;
            this.save.emit();
          },
          error: (err) => {
            this.error = err.error?.message || 'Failed to update book';
            this.loading = false;
          }
        });
      } else {
        // Create new book
        this.bookService.createBook(bookData).subscribe({
          next: () => {
            this.loading = false;
            this.save.emit();
          },
          error: (err) => {
            this.error = err.error?.message || 'Failed to create book';
            this.loading = false;
          }
        });
      }
    }
  }

  onClose(): void {
    this.close.emit();
    
  }

  get f() { return this.bookForm.controls; }
  get isEditing() { return !!this.book; }
}



