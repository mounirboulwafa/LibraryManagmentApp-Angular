import { Component, OnInit } from '@angular/core';
import { Author, AuthorService } from '../../service/author.service';

@Component({
  selector: 'app-authors',
  templateUrl: './authors.component.html',
  styleUrls: ['./authors.component.css']
})
export class AuthorsComponent implements OnInit {

  model = new Author('', '');
  listeAuthors = [];

  constructor(private ac: AuthorService) { }


  submitted = false;
  onSubmit() {
    this.submitted = true;
  }

  get diagnostic() {
    return JSON.stringify(this.model);
  }

  ngOnInit() {
    this.ac.getAuthors().subscribe(
      data => this.listeAuthors = data
    )
  }

  newCategory() {
    let a = this.ac.addAuthor(this.model);
    this.ac.getAuthors().subscribe(data => this.listeAuthors = data);
    this.listeAuthors.unshift(this.model);
  }

}
