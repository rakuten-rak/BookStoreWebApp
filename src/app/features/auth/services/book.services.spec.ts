import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { BookService } from './book.services';
import { Book } from '../../users/model/uesr.model';

describe('BookService', () => {
  let service: BookService;
  let httpMock: HttpTestingController;

  const mockBooks: Book[] = [
    {
      id: '1',
      name: 'Test Book 1',
      category: 'Fiction',
      price: 19.99,
      description: 'A test book description'
    },
    {
      id: '2',
      name: 'Test Book 2',
      category: 'Non-Fiction',
      price: 24.99,
      description: 'Another test book description'
    }
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [BookService]
    });
    service = TestBed.inject(BookService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should search books', () => {
    service.searchBooks('test', 'Fiction').subscribe(books => {
      expect(books).toEqual(mockBooks);
    });

    const req = httpMock.expectOne('https://localhost:3000/api/books?query=test&category=Fiction');
    expect(req.request.method).toBe('GET');
    req.flush(mockBooks);
  });

  it('should get book by id', () => {
    const mockBook = mockBooks[0];

    service.getBook('1').subscribe(book => {
      expect(book).toEqual(mockBook);
    });

    const req = httpMock.expectOne('https://localhost:3000/api/books/1');
    expect(req.request.method).toBe('GET');
    req.flush(mockBook);
  });

  it('should create book', () => {
    const newBook = {
      name: 'New Book',
      category: 'Science',
      price: 29.99,
      description: 'A new book description'
    };

    const createdBook: Book = { id: '3', ...newBook };

    service.createBook(newBook).subscribe(book => {
      expect(book).toEqual(createdBook);
    });

    const req = httpMock.expectOne('https://localhost:3000/api/books');
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(newBook);
    req.flush(createdBook);
  });

  it('should update book', () => {
    const updatedBook = { ...mockBooks[0], name: 'Updated Book' };

    service.updateBook('1', { name: 'Updated Book' }).subscribe(book => {
      expect(book).toEqual(updatedBook);
    });

    const req = httpMock.expectOne('https://localhost:3000/api/books/1');
    expect(req.request.method).toBe('PUT');
    req.flush(updatedBook);
  });

  it('should delete book', () => {
    service.deleteBook('1').subscribe();

    const req = httpMock.expectOne('https://localhost:3000/api/books/1');
    expect(req.request.method).toBe('DELETE');
    req.flush({});
  });

  it('should get categories', () => {
    const mockCategories = ['Fiction', 'Non-Fiction', 'Science'];

    service.getCategories().subscribe(categories => {
      expect(categories).toEqual(mockCategories);
    });

    const req = httpMock.expectOne('https://localhost:3000/api/books/categories');
    expect(req.request.method).toBe('GET');
    req.flush(mockCategories);
  });
});