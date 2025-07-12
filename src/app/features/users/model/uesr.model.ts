export interface Book {
  id: number;
  name: string;
  category: string;
  price: number;
  description: string;
}

 export interface User {
  // id: string;
  username: string;
  email: string;
  password:string
}

export interface LoginRequest {
  username: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  user: User;
}


// // src/app/models/book.model.ts
// export interface Book {
//   id: string;
//   name: string;
//   category: string;
//   price: number;
//   description: string;
// }

// // src/app/models/user.model.ts
// export interface User {
//   id: string;
//   username: string;
//   email: string;
// }

// export interface LoginRequest {
//   username: string;
//   password: string;
// }

// export interface LoginResponse {
//   token: string;
//   user: User;
// }

// // src/app/services/auth.service.ts
// import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { BehaviorSubject, Observable, tap } from 'rxjs';
// import { LoginRequest, LoginResponse, User } from '../models/user.model';

// @Injectable({
//   providedIn: 'root'
// })
// export class AuthService {
//   private apiUrl = 'https://localhost:3000/api';
//   private currentUserSubject = new BehaviorSubject<User | null>(null);
//   public currentUser$ = this.currentUserSubject.asObservable();

//   constructor(private http: HttpClient) {
//     this.loadUserFromStorage();
//   }

//   login(credentials: LoginRequest): Observable<LoginResponse> {
//     return this.http.post<LoginResponse>(`${this.apiUrl}/auth/login`, credentials)
//       .pipe(
//         tap(response => {
//           this.setToken(response.token);
//           this.setCurrentUser(response.user);
//         })
//       );
//   }

//   logout(): void {
//     localStorage.removeItem('token');
//     localStorage.removeItem('user');
//     this.currentUserSubject.next(null);
//   }

//   getToken(): string | null {
//     return localStorage.getItem('token');
//   }

//   isAuthenticated(): boolean {
//     const token = this.getToken();
//     return token !== null && !this.isTokenExpired(token);
//   }

//   private setToken(token: string): void {
//     localStorage.setItem('token', token);
//   }

//   private setCurrentUser(user: User): void {
//     localStorage.setItem('user', JSON.stringify(user));
//     this.currentUserSubject.next(user);
//   }

//   private loadUserFromStorage(): void {
//     const userStr = localStorage.getItem('user');
//     if (userStr) {
//       const user = JSON.parse(userStr);
//       this.currentUserSubject.next(user);
//     }
//   }

//   private isTokenExpired(token: string): boolean {
//     try {
//       const payload = JSON.parse(atob(token.split('.')[1]));
//       return Date.now() >= payload.exp * 1000;
//     } catch {
//       return true;
//     }
//   }
// }

// // src/app/services/book.service.ts
// import { Injectable } from '@angular/core';
// import { HttpClient, HttpParams } from '@angular/common/http';
// import { Observable } from 'rxjs';
// import { Book } from '../models/book.model';

// @Injectable({
//   providedIn: 'root'
// })
// export class BookService {
//   private apiUrl = 'https://localhost:3000/api/books';

//   constructor(private http: HttpClient) {}

//   searchBooks(query?: string, category?: string): Observable<Book[]> {
//     let params = new HttpParams();
//     if (query) params = params.set('query', query);
//     if (category) params = params.set('category', category);
    
//     return this.http.get<Book[]>(this.apiUrl, { params });
//   }

//   getBook(id: string): Observable<Book> {
//     return this.http.get<Book>(`${this.apiUrl}/${id}`);
//   }

//   createBook(book: Omit<Book, 'id'>): Observable<Book> {
//     return this.http.post<Book>(this.apiUrl, book);
//   }

//   updateBook(id: string, book: Partial<Book>): Observable<Book> {
//     return this.http.put<Book>(`${this.apiUrl}/${id}`, book);
//   }

//   deleteBook(id: string): Observable<void> {
//     return this.http.delete<void>(`${this.apiUrl}/${id}`);
//   }

//   getCategories(): Observable<string[]> {
//     return this.http.get<string[]>(`${this.apiUrl}/categories`);
//   }
// }

// // src/app/interceptors/auth.interceptor.ts
// import { Injectable } from '@angular/core';
// import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
// import { Observable } from 'rxjs';
// import { AuthService } from '../services/auth.service';

// @Injectable()
// export class AuthInterceptor implements HttpInterceptor {
//   constructor(private authService: AuthService) {}

//   intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
//     const token = this.authService.getToken();
    
//     if (token) {
//       const authReq = req.clone({
//         setHeaders: {
//           Authorization: `Bearer ${token}`
//         }
//       });
//       return next.handle(authReq);
//     }
    
//     return next.handle(req);
//   }
// }

// // src/app/guards/auth.guard.ts
// import { Injectable } from '@angular/core';
// import { CanActivate, Router } from '@angular/router';
// import { AuthService } from '../services/auth.service';

// @Injectable({
//   providedIn: 'root'
// })
// export class AuthGuard implements CanActivate {
//   constructor(
//     private authService: AuthService,
//     private router: Router
//   ) {}

//   canActivate(): boolean {
//     if (this.authService.isAuthenticated()) {
//       return true;
//     }
    
//     this.router.navigate(['/login']);
//     return false;
//   }
// }

// // src/app/components/login/login.component.ts
// import { Component, OnInit } from '@angular/core';
// import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import { Router } from '@angular/router';
// import { AuthService } from '../../services/auth.service';

// @Component({
//   selector: 'app-login',
//   templateUrl: './login.component.html',
//   styleUrls: ['./login.component.css']
// })
// export class LoginComponent implements OnInit {
//   loginForm: FormGroup;
//   loading = false;
//   error = '';

//   constructor(
//     private fb: FormBuilder,
//     private authService: AuthService,
//     private router: Router
//   ) {
//     this.loginForm = this.fb.group({
//       username: ['', [Validators.required, Validators.minLength(3)]],
//       password: ['', [Validators.required, Validators.minLength(6)]]
//     });
//   }

//   ngOnInit(): void {
//     if (this.authService.isAuthenticated()) {
//       this.router.navigate(['/dashboard']);
//     }
//   }

//   onSubmit(): void {
//     if (this.loginForm.valid) {
//       this.loading = true;
//       this.error = '';
      
//       this.authService.login(this.loginForm.value).subscribe({
//         next: () => {
//           this.router.navigate(['/dashboard']);
//         },
//         error: (err) => {
//           this.error = err.error?.message || 'Login failed. Please try again.';
//           this.loading = false;
//         }
//       });
//     }
//   }

//   get f() { return this.loginForm.controls; }
// }

// // src/app/components/login/login.component.html
// <div class="container-fluid vh-100 d-flex align-items-center justify-content-center bg-light">
//   <div class="row w-100">
//     <div class="col-md-6 col-lg-4 mx-auto">
//       <div class="card shadow-lg">
//         <div class="card-header bg-primary text-white text-center">
//           <h3 class="mb-0">
//             <i class="fas fa-book me-2"></i>Book Store Login
//           </h3>
//         </div>
//         <div class="card-body p-4">
//           <form [formGroup]="loginForm" (ngSubmit)="onSubmit()">
//             <div class="mb-3">
//               <label for="username" class="form-label">Username</label>
//               <input 
//                 type="text" 
//                 id="username"
//                 class="form-control"
//                 formControlName="username"
//                 [class.is-invalid]="f['username'].invalid && f['username'].touched"
//                 placeholder="Enter your username">
//               <div class="invalid-feedback" *ngIf="f['username'].invalid && f['username'].touched">
//                 <div *ngIf="f['username'].errors?.['required']">Username is required</div>
//                 <div *ngIf="f['username'].errors?.['minlength']">Username must be at least 3 characters</div>
//               </div>
//             </div>

//             <div class="mb-3">
//               <label for="password" class="form-label">Password</label>
//               <input 
//                 type="password" 
//                 id="password"
//                 class="form-control"
//                 formControlName="password"
//                 [class.is-invalid]="f['password'].invalid && f['password'].touched"
//                 placeholder="Enter your password">
//               <div class="invalid-feedback" *ngIf="f['password'].invalid && f['password'].touched">
//                 <div *ngIf="f['password'].errors?.['required']">Password is required</div>
//                 <div *ngIf="f['password'].errors?.['minlength']">Password must be at least 6 characters</div>
//               </div>
//             </div>

//             <div class="alert alert-danger" *ngIf="error" role="alert">
//               <i class="fas fa-exclamation-triangle me-2"></i>{{ error }}
//             </div>

//             <div class="d-grid">
//               <button 
//                 type="submit" 
//                 class="btn btn-primary btn-lg"
//                 [disabled]="loginForm.invalid || loading">
//                 <span *ngIf="loading" class="spinner-border spinner-border-sm me-2"></span>
//                 <i class="fas fa-sign-in-alt me-2" *ngIf="!loading"></i>
//                 {{ loading ? 'Signing in...' : 'Sign In' }}
//               </button>
//             </div>
//           </form>
//         </div>
//       </div>
//     </div>
//   </div>
// </div>

// // src/app/components/dashboard/dashboard.component.ts
// import { Component, OnInit } from '@angular/core';
// import { FormBuilder, FormGroup } from '@angular/forms';
// import { BookService } from '../../services/book.service';
// import { AuthService } from '../../services/auth.service';
// import { Book } from '../../models/book.model';
// import { Router } from '@angular/router';

// @Component({
//   selector: 'app-dashboard',
//   templateUrl: './dashboard.component.html',
//   styleUrls: ['./dashboard.component.css']
// })
// export class DashboardComponent implements OnInit {
//   books: Book[] = [];
//   categories: string[] = [];
//   searchForm: FormGroup;
//   loading = false;
//   selectedBook: Book | null = null;
//   showBookModal = false;

//   constructor(
//     private fb: FormBuilder,
//     private bookService: BookService,
//     private authService: AuthService,
//     private router: Router
//   ) {
//     this.searchForm = this.fb.group({
//       query: [''],
//       category: ['']
//     });
//   }

//   ngOnInit(): void {
//     this.loadBooks();
//     this.loadCategories();
//   }

//   loadBooks(): void {
//     this.loading = true;
//     const { query, category } = this.searchForm.value;
    
//     this.bookService.searchBooks(query, category).subscribe({
//       next: (books) => {
//         this.books = books;
//         this.loading = false;
//       },
//       error: (err) => {
//         console.error('Error loading books:', err);
//         this.loading = false;
//       }
//     });
//   }

//   loadCategories(): void {
//     this.bookService.getCategories().subscribe({
//       next: (categories) => {
//         this.categories = categories;
//       },
//       error: (err) => {
//         console.error('Error loading categories:', err);
//       }
//     });
//   }

//   onSearch(): void {
//     this.loadBooks();
//   }

//   onClearSearch(): void {
//     this.searchForm.reset();
//     this.loadBooks();
//   }

//   onAddBook(): void {
//     this.selectedBook = null;
//     this.showBookModal = true;
//   }

//   onEditBook(book: Book): void {
//     this.selectedBook = book;
//     this.showBookModal = true;
//   }

//   onDeleteBook(book: Book): void {
//     if (confirm(`Are you sure you want to delete "${book.name}"?`)) {
//       this.bookService.deleteBook(book.id).subscribe({
//         next: () => {
//           this.loadBooks();
//         },
//         error: (err) => {
//           console.error('Error deleting book:', err);
//           alert('Failed to delete book. Please try again.');
//         }
//       });
//     }
//   }

//   onBookSaved(): void {
//     this.showBookModal = false;
//     this.selectedBook = null;
//     this.loadBooks();
//   }

//   onModalClose(): void {
//     this.showBookModal = false;
//     this.selectedBook = null;
//   }

//   logout(): void {
//     this.authService.logout();
//     this.router.navigate(['/login']);
//   }
// }

// // src/app/components/dashboard/dashboard.component.html
// <nav class="navbar navbar-expand-lg navbar-dark bg-primary">
//   <div class="container-fluid">
//     <a class="navbar-brand" href="#">
//       <i class="fas fa-book me-2"></i>Book Store
//     </a>
//     <div class="navbar-nav ms-auto">
//       <button class="btn btn-outline-light" (click)="logout()">
//         <i class="fas fa-sign-out-alt me-2"></i>Logout
//       </button>
//     </div>
//   </div>
// </nav>

// <div class="container-fluid mt-4">
//   <div class="row">
//     <div class="col-12">
//       <div class="card">
//         <div class="card-header d-flex justify-content-between align-items-center">
//           <h5 class="mb-0">
//             <i class="fas fa-search me-2"></i>Book Search & Management
//           </h5>
//           <button class="btn btn-success" (click)="onAddBook()">
//             <i class="fas fa-plus me-2"></i>Add New Book
//           </button>
//         </div>
//         <div class="card-body">
//           <form [formGroup]="searchForm" (ngSubmit)="onSearch()" class="mb-4">
//             <div class="row">
//               <div class="col-md-4">
//                 <input 
//                   type="text" 
//                   class="form-control" 
//                   formControlName="query"
//                   placeholder="Search books...">
//               </div>
//               <div class="col-md-3">
//                 <select class="form-select" formControlName="category">
//                   <option value="">All Categories</option>
//                   <option *ngFor="let category of categories" [value]="category">
//                     {{ category }}
//                   </option>
//                 </select>
//               </div>
//               <div class="col-md-5">
//                 <button type="submit" class="btn btn-primary me-2">
//                   <i class="fas fa-search me-2"></i>Search
//                 </button>
//                 <button type="button" class="btn btn-outline-secondary" (click)="onClearSearch()">
//                   <i class="fas fa-times me-2"></i>Clear
//                 </button>
//               </div>
//             </div>
//           </form>

//           <div *ngIf="loading" class="text-center">
//             <div class="spinner-border" role="status">
//               <span class="visually-hidden">Loading...</span>
//             </div>
//           </div>

//           <div *ngIf="!loading && books.length === 0" class="text-center text-muted">
//             <i class="fas fa-book-open fa-3x mb-3"></i>
//             <p>No books found. Try adjusting your search criteria.</p>
//           </div>

//           <div *ngIf="!loading && books.length > 0" class="table-responsive">
//             <table class="table table-striped table-hover">
//               <thead class="table-dark">
//                 <tr>
//                   <th>ID</th>
//                   <th>Name</th>
//                   <th>Category</th>
//                   <th>Price</th>
//                   <th>Description</th>
//                   <th>Actions</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 <tr *ngFor="let book of books">
//                   <td>{{ book.id }}</td>
//                   <td>{{ book.name }}</td>
//                   <td>
//                     <span class="badge bg-secondary">{{ book.category }}</span>
//                   </td>
//                   <td>${{ book.price | number:'1.2-2' }}</td>
//                   <td>{{ book.description | slice:0:100 }}{{ book.description.length > 100 ? '...' : '' }}</td>
//                   <td>
//                     <button class="btn btn-sm btn-outline-primary me-2" (click)="onEditBook(book)">
//                       <i class="fas fa-edit"></i>
//                     </button>
//                     <button class="btn btn-sm btn-outline-danger" (click)="onDeleteBook(book)">
//                       <i class="fas fa-trash"></i>
//                     </button>
//                   </td>
//                 </tr>
//               </tbody>
//             </table>
//           </div>
//         </div>
//       </div>
//     </div>
//   </div>
// </div>

// <!-- Book Modal -->
// <app-book-modal 
//   [show]="showBookModal" 
//   [book]="selectedBook"
//   [categories]="categories"
//   (save)="onBookSaved()"
//   (close)="onModalClose()">
// </app-book-modal>

// // src/app/components/book-modal/book-modal.component.ts
// import { Component, Input, Output, EventEmitter, OnInit, OnChanges } from '@angular/core';
// import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import { BookService } from '../../services/book.service';
// import { Book } from '../../models/book.model';

// @Component({
//   selector: 'app-book-modal',
//   templateUrl: './book-modal.component.html',
//   styleUrls: ['./book-modal.component.css']
// })
// export class BookModalComponent implements OnInit, OnChanges {
//   @Input() show = false;
//   @Input() book: Book | null = null;
//   @Input() categories: string[] = [];
//   @Output() save = new EventEmitter<void>();
//   @Output() close = new EventEmitter<void>();

//   bookForm: FormGroup;
//   loading = false;
//   error = '';

//   constructor(
//     private fb: FormBuilder,
//     private bookService: BookService
//   ) {
//     this.bookForm = this.fb.group({
//       name: ['', [Validators.required, Validators.minLength(2)]],
//       category: ['', Validators.required],
//       price: ['', [Validators.required, Validators.min(0)]],
//       description: ['', [Validators.required, Validators.minLength(10)]]
//     });
//   }

//   ngOnInit(): void {
//     this.resetForm();
//   }

//   ngOnChanges(): void {
//     if (this.show) {
//       this.resetForm();
//     }
//   }

//   resetForm(): void {
//     if (this.book) {
//       this.bookForm.patchValue({
//         name: this.book.name,
//         category: this.book.category,
//         price: this.book.price,
//         description: this.book.description
//       });
//     } else {
//       this.bookForm.reset();
//     }
//     this.error = '';
//   }

//   onSubmit(): void {
//     if (this.bookForm.valid) {
//       this.loading = true;
//       this.error = '';

//       const bookData = this.bookForm.value;

//       if (this.book) {
//         // Update existing book
//         this.bookService.updateBook(this.book.id, bookData).subscribe({
//           next: () => {
//             this.loading = false;
//             this.save.emit();
//           },
//           error: (err) => {
//             this.error = err.error?.message || 'Failed to update book';
//             this.loading = false;
//           }
//         });
//       } else {
//         // Create new book
//         this.bookService.createBook(bookData).subscribe({
//           next: () => {
//             this.loading = false;
//             this.save.emit();
//           },
//           error: (err) => {
//             this.error = err.error?.message || 'Failed to create book';
//             this.loading = false;
//           }
//         });
//       }
//     }
//   }

//   onClose(): void {
//     this.close.emit();
//   }

//   get f() { return this.bookForm.controls; }
//   get isEditing() { return !!this.book; }
// }

// // src/app/components/book-modal/book-modal.component.html
// <div class="modal" [class.show]="show" [style.display]="show ? 'block' : 'none'" tabindex="-1">
//   <div class="modal-dialog modal-lg">
//     <div class="modal-content">
//       <div class="modal-header">
//         <h5 class="modal-title">
//           <i class="fas fa-book me-2"></i>
//           {{ isEditing ? 'Edit Book' : 'Add New Book' }}
//         </h5>
//         <button type="button" class="btn-close" (click)="onClose()"></button>
//       </div>
//       <div class="modal-body">
//         <form [formGroup]="bookForm" (ngSubmit)="onSubmit()">
//           <div class="row">
//             <div class="col-md-6">
//               <div class="mb-3">
//                 <label for="name" class="form-label">Book Name *</label>
//                 <input 
//                   type="text" 
//                   id="name"
//                   class="form-control"
//                   formControlName="name"
//                   [class.is-invalid]="f['name'].invalid && f['name'].touched"
//                   placeholder="Enter book name">
//                 <div class="invalid-feedback" *ngIf="f['name'].invalid && f['name'].touched">
//                   <div *ngIf="f['name'].errors?.['required']">Book name is required</div>
//                   <div *ngIf="f['name'].errors?.['minlength']">Book name must be at least 2 characters</div>
//                 </div>
//               </div>
//             </div>
//             <div class="col-md-6">
//               <div class="mb-3">
//                 <label for="category" class="form-label">Category *</label>
//                 <select 
//                   id="category"
//                   class="form-select"
//                   formControlName="category"
//                   [class.is-invalid]="f['category'].invalid && f['category'].touched">
//                   <option value="">Select a category</option>
//                   <option *ngFor="let category of categories" [value]="category">
//                     {{ category }}
//                   </option>
//                 </select>
//                 <div class="invalid-feedback" *ngIf="f['category'].invalid && f['category'].touched">
//                   Category is required
//                 </div>
//               </div>
//             </div>
//           </div>

//           <div class="mb-3">
//             <label for="price" class="form-label">Price *</label>
//             <div class="input-group">
//               <span class="input-group-text">$</span>
//               <input 
//                 type="number" 
//                 id="price"
//                 class="form-control"
//                 formControlName="price"
//                 [class.is-invalid]="f['price'].invalid && f['price'].touched"
//                 placeholder="0.00"
//                 step="0.01"
//                 min="0">
//               <div class="invalid-feedback" *ngIf="f['price'].invalid && f['price'].touched">
//                 <div *ngIf="f['price'].errors?.['required']">Price is required</div>
//                 <div *ngIf="f['price'].errors?.['min']">Price must be greater than 0</div>
//               </div>
//             </div>
//           </div>

//           <div class="mb-3">
//             <label for="description" class="form-label">Description *</label>
//             <textarea 
//               id="description"
//               class="form-control"
//               formControlName="description"
//               [class.is-invalid]="f['description'].invalid && f['description'].touched"
//               placeholder="Enter book description"
//               rows="4"></textarea>
//             <div class="invalid-feedback" *ngIf="f['description'].invalid && f['description'].touched">
//               <div *ngIf="f['description'].errors?.['required']">Description is required</div>
//               <div *ngIf="f['description'].errors?.['minlength']">Description must be at least 10 characters</div>
//             </div>
//           </div>

//           <div class="alert alert-danger" *ngIf="error" role="alert">
//             <i class="fas fa-exclamation-triangle me-2"></i>{{ error }}
//           </div>
//         </form>
//       </div>
//       <div class="modal-footer">
//         <button type="button" class="btn btn-secondary" (click)="onClose()">Cancel</button>
//         <button 
//           type="submit" 
//           class="btn btn-primary"
//           [disabled]="bookForm.invalid || loading"
//           (click)="onSubmit()">
//           <span *ngIf="loading" class="spinner-border spinner-border-sm me-2"></span>
//           <i class="fas fa-save me-2" *ngIf="!loading"></i>
//           {{ loading ? 'Saving...' : (isEditing ? 'Update Book' : 'Create Book') }}
//         </button>
//       </div>
//     </div>
//   </div>
// </div>
// <div class="modal-backdrop" [class.show]="show" *ngIf="show"></div>

// // src/app/app-routing.module.ts
// import { NgModule } from '@angular/core';
// import { RouterModule, Routes } from '@angular/router';
// import { LoginComponent } from './components/login/login.component';
// import { DashboardComponent } from './components/dashboard/dashboard.component';
// import { AuthGuard } from './guards/auth.guard';

// const routes: Routes = [
//   { path: '', redirectTo: '/login', pathMatch: 'full' },
//   { path: 'login', component: LoginComponent },
//   { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
//   { path: '**', redirectTo: '/login' }
// ];

// @NgModule({
//   imports: [RouterModule.forRoot(routes)],
//   exports: [RouterModule]
// })
// export class AppRoutingModule { }

// // src/app/app.module.ts
// import { NgModule } from '@angular/core';
// import { BrowserModule } from '@angular/platform-browser';
// import { ReactiveFormsModule } from '@angular/forms';
// import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

// import { AppRoutingModule } from './app-routing.module';
// import { AppComponent } from './app.component';
// import { LoginComponent } from './components/login/login.component';
// import { DashboardComponent } from './components/dashboard/dashboard.component';
// import { BookModalComponent } from './components/book-modal/book-modal.component';
// import { AuthInterceptor } from './interceptors/auth.interceptor';

// @NgModule({
//   declarations: [
//     AppComponent,
//     LoginComponent,
//     DashboardComponent,
//     BookModalComponent
//   ],
//   imports: [
//     BrowserModule,
//     AppRoutingModule,
//     ReactiveFormsModule,
//     HttpClientModule
//   ],
//   providers: [
//     {
//       provide: HTTP_INTERCEPTORS,
//       useClass: AuthInterceptor,
//       multi: true
//     }
//   ],
//   bootstrap: [AppComponent]
// })
// export class AppModule { }

// // src/app/app.component.ts
// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-root',
//   template: '<router-outlet></router-outlet>',
//   styleUrls: ['./app.component.css']
// })
// export class AppComponent {
//   title = 'bookstore-spa';
// }

// // src/index.html
// <!doctype html>
// <html lang="en">
// <head>
//   <meta charset="utf-8">
//   <title>Book Store SPA</title>
//   <base href="/">
//   <meta name="viewport" content="width=device-width, initial-scale=1">
//   <link rel="icon" type="image/x-icon" href="favicon.ico">
//   <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
//   <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" rel="stylesheet">
// </head>
// <body>
//   <app-root></app-root>
//   <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
// </body>
// </html>

// // src/styles.css
// /* Global Styles */
// body {
//   font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
//   background-color: #f8f9fa;
// }

// .modal.show {
//   display: block !important;
// }

// .modal-backdrop.show {
//   opacity: 0.5;
// }

// .table-hover tbody tr:hover {
//   background-color: rgba(0, 0, 0, 0.075);
// }

// .card {
//   border: none;
//   box-shadow: 0 0.125rem 0.25rem rgba(0, 0, 0, 0.075);
// }

// .btn {
//   border-radius: 0.375rem;
// }

// .form-control, .form-select {
//   border-radius: 0.375rem;
// }

// // Unit Tests

// // src/app/services/auth.service.spec.ts
// import { TestBed } from '@angular/core/testing';
// import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
// import { AuthService } from './auth.service';
// import { LoginRequest, LoginResponse } from '../models/user.model';

// describe('AuthService', () => {
//   let service: AuthService;
//   let httpMock: HttpTestingController;

//   beforeEach(() => {
//     TestBed.configureTestingModule({
//       imports: [HttpClientTestingModule],
//       providers: [AuthService]
//     });