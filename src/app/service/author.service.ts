import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthorService {

  httpOptions = {
    headers: new HttpHeaders(
      {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept'
      })
  };

  private userUrl = 'LibraryManagementWEB/author';
  constructor(private http: HttpClient) { }


  getAuthors(): Observable<Author[]> {
    return this.http.get<Author[]>('LibraryManagementWEB/author');
  }

  addAuthor(atr: Author): number {
    // console.log('service');
    const t = this.http.post<Author>('LibraryManagementWEB/author', atr, this.httpOptions).subscribe(res => {
      const aut: Author = res;
      alert('l\'auteur ' + aut.name + ' est bien ajoutée ');
    },
      err => {
        alert(err.message);
      });
    return 1;

  }

}


export class Author {
  constructor(
    // public id: number,
    public name: string,
    public description: string
  ) {

  }
}