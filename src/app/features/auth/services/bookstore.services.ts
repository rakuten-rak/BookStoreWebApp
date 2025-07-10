import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from './auth.services';

@Injectable({
  providedIn: 'root'
})
export class BookService {
  private apiUrl = 'https://localhost:5001/api/books';

  constructor(private http: HttpClient, private auth: AuthService) {}

  getBooks() {
    return this.http.get(this.apiUrl);
  }

  addBook(book: any) {
    const headers = this.getHeaders();
    return this.http.post(this.apiUrl, book, { headers });
  }

  updateBook(id: number, book: any) {
    const headers = this.getHeaders();
    return this.http.put(`${this.apiUrl}/${id}`, book, { headers });
  }

  deleteBook(id: number) {
    const headers = this.getHeaders();
    return this.http.delete(`${this.apiUrl}/${id}`, { headers });
  }

  private getHeaders() {
    return new HttpHeaders({
      Authorization: `Bearer ${this.auth.getToken()}`
    });
  }
}
