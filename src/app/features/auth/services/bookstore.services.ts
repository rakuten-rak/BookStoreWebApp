
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.services';

@Injectable({
  providedIn: 'root'
})
export class BookService {
  private readonly apiUrl = 'http://localhost:5047/api/books';
  
  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) {}

  getBooks(): Observable<any[]> {
    const headers = this.authService.isAuthenticated();
    return this.http.get<any[]>(this.apiUrl) //, { headers });
  }

  getBook(id: number): Observable<any> {
    const headers = this.authService.isAuthenticated();
    return this.http.get<any>(`${this.apiUrl}/${id}`) //, { headers });
  }

  addBook(book: any): Observable<any> {
    const headers = this.authService.isAuthenticated();
    return this.http.post<any>(this.apiUrl, book) //{ headers });
  }

  updateBook(id: number, book: any): Observable<any> {
    const headers = this.authService.isAuthenticated();
    return this.http.put<any>(`${this.apiUrl}/${id}`, { ...book, id },) // { headers });
  }

  deleteBook(id: number): Observable<any> {
    const headers = this.authService.isAuthenticated();
    return this.http.delete<any>(`${this.apiUrl}/${id}`) //, { headers });
  }
    // // bookstore.services.ts - Updated with better error handling
    // import { Injectable } from '@angular/core';
    // import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
    // import { AuthService } from './auth.services';
    // import { Observable, catchError, throwError } from 'rxjs';
    
    // @Injectable({
    //   providedIn: 'root'
    // })
    // export class BookService {
    //   private apiUrl = 'http://localhost:5047/api/books';
    
    //   constructor(private http: HttpClient, private auth: AuthService) {}
    
    //   getBooks(): Observable<any> {
    //     return this.http.get(this.apiUrl).pipe(
    //       catchError(this.handleError)
    //     );
    //   }
    
    //   addBook(book: any): Observable<any> {
    //     const headers = this.getHeaders();
    //     return this.http.post(this.apiUrl, book, { headers }).pipe(
    //       catchError(this.handleError)
    //     );
    //   }
    
    //   updateBook(id: number, book: any): Observable<any> {
    //     const headers = this.getHeaders();
    //     return this.http.put(`${this.apiUrl}/${id}`, book, { headers }).pipe(
    //       catchError(this.handleError)
    //     );
    //   }
    
    //   deleteBook(id: number): Observable<any> {
    //     const headers = this.getHeaders();
    //     return this.http.delete(`${this.apiUrl}/${id}`, { headers }).pipe(
    //       catchError(this.handleError)
    //     );
    //   }
    
    //   private getHeaders(): HttpHeaders {
    //     const token = this.auth.getToken();
    //     return new HttpHeaders({
    //       'Content-Type': 'application/json',
    //       'Authorization': `Bearer ${token}`
    //     });
    //   }
    
    //   private handleError(error: HttpErrorResponse): Observable<never> {
    //     let errorMessage = 'An error occurred';
        
    //     if (error.status === 404) {
    //       errorMessage = 'Books API endpoint not found. Please check your backend server.';
    //     } else if (error.status === 401) {
    //       errorMessage = 'Unauthorized. Please login again.';
    //     } else if (error.status === 0) {
    //       errorMessage = 'Cannot connect to server. Please check if the server is running.';
    //     } else {
    //       errorMessage = error.error?.message || `Server error: ${error.status}`;
    //     }
        
    //     console.error('BookService Error:', errorMessage);
    //     return throwError(() => new Error(errorMessage));
    //   }
    // }
}