import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeComponent } from './home.component';


import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { of, throwError } from 'rxjs';

import { BookService } from '../../../features/auth/services/book.services';
import { AuthService } from '../../../features/auth/services/auth.services';
import { Book } from '../../../features/users/model/uesr.model';

describe('HomeComponent', () => {


  let bookService: jasmine.SpyObj<BookService>;
  let authService: jasmine.SpyObj<AuthService>;
  let router: jasmine.SpyObj<Router>;

  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  const mockBooks: Book[] = [
    {
      id: '1',
      name: 'Test Book',
      category: 'Fiction',
      price: 19.99,
      description: 'Test description'
    }
  ];

  beforeEach(async () => {
    const bookSpy = jasmine.createSpyObj('BookService', ['searchBooks', 'getCategories', 'deleteBook']);
    const authSpy = jasmine.createSpyObj('AuthService', ['logout']);
    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      // declarations:[HomeComponent],
      imports: [HomeComponent, ReactiveFormsModule],
      providers: [
        { provide: BookService, useValue: bookSpy },
        { provide: AuthService, useValue: authSpy },
        { provide: Router, useValue: routerSpy }
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(HomeComponent);
    bookService = TestBed.inject(BookService) as jasmine.SpyObj<BookService>;
    authService = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load books on init', () => {
    bookService.searchBooks.and.returnValue(of(mockBooks));
    bookService.getCategories.and.returnValue(of(['Fiction', 'Non-Fiction']));

    component.ngOnInit();

    expect(bookService.searchBooks).toHaveBeenCalled();
    expect(bookService.getCategories).toHaveBeenCalled();
    expect(component.books).toEqual(mockBooks);
  });

  it('should search books', () => {
    bookService.searchBooks.and.returnValue(of(mockBooks));

    component.searchForm.patchValue({ query: 'test', category: 'Fiction' });
    component.onSearch();

    expect(bookService.searchBooks).toHaveBeenCalledWith('test', 'Fiction');
  });

  it('should logout and redirect', () => {
    component.logout();

    expect(authService.logout).toHaveBeenCalled();
    
  });

  it('should delete book after confirmation', () => {
    spyOn(window, 'confirm').and.returnValue(true);
    bookService.deleteBook.and.returnValue(of(undefined));
    bookService.searchBooks.and.returnValue(of([]));

    component.onDeleteBook(mockBooks[0]);

    expect(bookService.deleteBook).toHaveBeenCalledWith('1');
    expect(bookService.searchBooks).toHaveBeenCalled();
  });

});

