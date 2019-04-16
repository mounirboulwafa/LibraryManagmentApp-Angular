import { Injectable } from '@angular/core';
import { Author } from './author.service';
import { Category } from './categorie.service';
import { Language } from './language.service';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  constructor(private http: HttpClient) { }

  getBooks(): Observable<Book[]> {
    return this.http.get<Book[]>('LibraryManagementWEB/book');
  }

  deleteBook(id: number): void {
    this.http.get('LibraryManagementWEB/book/deleteBook/' + id).subscribe();

  }
}


export class Book {
  constructor(
    public id: number,
    public title: string,
    public ISBN: string,
    public price: number,
    public yearsedition: string,
    public description: string,
    public pagesnamber: number,
    public qnt: number,
    public author: Author,
    public categorie: Category,
    public language: Language

  ) {


  }
}