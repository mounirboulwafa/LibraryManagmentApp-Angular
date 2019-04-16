import { Component, OnInit } from '@angular/core';
import { CategorieService, Category } from "../../service/categorie.service";
import { CategoriesComponent } from "../categories/categories.component";
import { Author, AuthorService } from '../../service/author.service';
import { Language, LanguageService } from '../../service/language.service';
import { Book, BookService } from '../../service/book.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css']
})
export class BookComponent implements OnInit {

  httpOptions = {
    headers: new HttpHeaders(
      {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept'
      })
  };

  form: FormGroup;
  isAdded: boolean = false;
  category = new Category(null, null, null);
  author = new Author('', '');
  language = new Language('', '');

  model = new Book(0, "", "", 0, "", "", null, 0, this.author, this.category, this.language);
  listeLanguages = [];
  listeCategories = [];
  listeAuthors = [];
  listeBooks = [];
  oneBook: Book;


  constructor(
    private modalService: NgbModal,
    public fb: FormBuilder,
    private http: HttpClient,
    private bs: BookService,
    private cs: CategorieService,
    private as: AuthorService,
    private ls: LanguageService
  ) {
    this.createForm();
    // this.model.categorie = this.category;
    // this.model.author = this.author;
    // this.model.language = this.language;
  }

  createForm() {
    this.form = this.fb.group({
      // 'id': ['', Validators.required],
      "title": ["", Validators.required],
      "ISBN": "",
      "description": "",
      "pagesNamber": "",
      "price": "",
      "yearsEdition": "",
      "qnt": "",
      "language": "",
      "author": "",
      "category": ""

    })
  }

  submitted = false;
  onSubmit() {
    this.submitted = true;
    if (this.form.invalid) {
      return;
    }

    let data = JSON.stringify(this.form.value);
    // console.log(data);
    this.ajouterBook(data);
    this.form.reset();
    this.bs.getBooks().subscribe(
      data => this.listeBooks = data
    );
  }

  ajouterBook(newBook) {
    this.http.post('LibraryManagementWEB/book', newBook, this.httpOptions)
      .subscribe(
        res => {
          console.log(res);
          this.isAdded = true;
          this.bs.getBooks().subscribe(data => this.listeBooks = data)
        },
        err => {
          console.log("errrreur xxxxxxxxxxxxxxxxxxxxx");
        }
      )
  }


  ngOnInit() {
    this.cs.getCategories().subscribe(data => this.listeCategories = data);
    this.ls.getLanguages().subscribe(data => this.listeLanguages = data);
    this.as.getAuthors().subscribe(data => this.listeAuthors = data);
    // this.cs.getCateggories().subscribe(data => this.listeCategorie = data);

    this.bs.getBooks().subscribe(data => this.listeBooks = data)
  }

  delete(book: Book) {
    this.bs.deleteBook(book.id);
    this.bs.getBooks().subscribe(data => this.listeBooks = data);
    this.listeBooks.unshift(this.model);

  }


  view(book: Book) {
    this.oneBook = book;
  }
  open(content) {
    this.modalService.open(content, { size: 'lg' });
  }

}
