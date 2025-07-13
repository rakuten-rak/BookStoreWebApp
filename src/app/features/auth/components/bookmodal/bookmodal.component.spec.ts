import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookmodalComponent } from './bookmodal.component';


import { ReactiveFormsModule } from '@angular/forms';
import { of, throwError } from 'rxjs';

import { BookService } from '../../services/book.services';
import { Book } from '../../../users/model/uesr.model';

describe('BookmodalComponent', () => {
  let component: BookmodalComponent;
  let fixture: ComponentFixture<BookmodalComponent>;


  let bookService: jasmine.SpyObj<BookService>;

  const mockBook: Book = {
    id: '1',
    name: 'Test Book',
    category: 'Fiction',
    price: 19.99,
    description: 'Test description'
  };

  beforeEach(async () => {
    const bookSpy = jasmine.createSpyObj('BookService', ['createBook', 'updateBook']);
    await TestBed.configureTestingModule({
      imports: [BookmodalComponent, ReactiveFormsModule],
      providers: [
        { provide: BookService, useValue: bookSpy }
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(BookmodalComponent);
    component = fixture.componentInstance;
    bookService = TestBed.inject(BookService) as jasmine.SpyObj<BookService>;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize form for new book', () => {
    component.book = null;
    component.ngOnInit();

    expect(component.isEditing).toBeFalsy();
    expect(component.bookForm.get('name')?.value).toBe('');
  });

  it('should initialize form for editing book', () => {
    component.book = mockBook;
    component.ngOnChanges();

    expect(component.isEditing).toBeTruthy();
    expect(component.bookForm.get('name')?.value).toBe('Test Book');
  });

  it('should create new book', () => {
    bookService.createBook.and.returnValue(of(mockBook));
    spyOn(component.save, 'emit');

    component.book = null;
    component.bookForm.patchValue({
      name: 'New Book',
      category: 'Fiction',
      price: 29.99,
      description: 'New description'
    });

    component.onSubmit();

    expect(bookService.createBook).toHaveBeenCalled();
    expect(component.save.emit).toHaveBeenCalled();
  });

  it('should update existing book', () => {
    bookService.updateBook.and.returnValue(of(mockBook));
    spyOn(component.save, 'emit');

    component.book = mockBook;
    component.bookForm.patchValue({
      name: 'Updated Book',
      category: 'Fiction',
      price: 29.99,
      description: 'Updated description'
    });

    component.onSubmit();

    expect(bookService.updateBook).toHaveBeenCalled();
    expect(component.save.emit).toHaveBeenCalled();
  });

  it('should handle form validation', () => {
    component.bookForm.patchValue({
      name: '',
      category: '',
      price: -1,
      description: ''
    });

    expect(component.bookForm.invalid).toBeTruthy();
  });
});

