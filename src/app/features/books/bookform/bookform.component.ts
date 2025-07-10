import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BookService } from '../../auth/services/bookstore.services';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-bookform',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './bookform.component.html',
  styleUrl: './bookform.component.scss'
})
export class BookformComponent {
  book = { title: '', author: '', price: 0 };
  isEdit = false;
  id = 0;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private bookService: BookService
  ) {}

  ngOnInit() {
    this.id = +this.route.snapshot.paramMap.get('id')!;
    if (this.id) {
      this.isEdit = true;
      this.bookService.getBooks().subscribe(data => {
        const found = (data as any[]).find(b => b.id === this.id);
        if (found) this.book = found;
      });
    }
  }

  save() {
    if (this.isEdit) {
      this.bookService.updateBook(this.id, this.book).subscribe(() => {
        this.router.navigate(['/books']);
      });
    } else {
      this.bookService.addBook(this.book).subscribe(() => {
        this.router.navigate(['/books']);
      });
    }
  }
}
