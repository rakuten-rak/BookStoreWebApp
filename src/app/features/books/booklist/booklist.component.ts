import { Component, OnInit } from '@angular/core';
import { BookService } from '../../auth/services/bookstore.services';
import { RouterModule } from '@angular/router';
@Component({
  selector: 'app-booklist',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './booklist.component.html',
  styleUrl: './booklist.component.scss'
})
export class BooklistComponent implements OnInit {
  books: any[] = [];

  constructor(private bookService: BookService) {}

  ngOnInit() {
    this.loadBooks();
  }

  loadBooks() {
    this.bookService.getBooks().subscribe(data => {
      this.books = data as any[];
    });
  }

  deleteBook(id: number) {
    this.bookService.deleteBook(id).subscribe(() => {
      this.loadBooks();
    });
  }
}
