import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

// const HttpUploadOptions = {
//   headers: new HttpHeaders({ "Content-Type", "application/json" })
// }

@Injectable({
  providedIn: 'root'
})
export class CategorieService {

  httpOptions = {
    headers: new HttpHeaders(
      {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept'
      })
  };

  constructor(private http: HttpClient) { }


  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>('LibraryManagementWEB/category');
  }

  // getCategorybyID(id: number) {
  //   return this.http.get<Category>('LibraryManagementWEB/category/getCategory/' + id);
  // }

  addCategory(cat: Category): number {
    // console.log('service');
    const t = this.http.post<Category>('LibraryManagementWEB/category', cat, this.httpOptions).subscribe(res => {
      const catg: Category = res;
      alert('la categorie ' + catg.name + ' est bien ajoutée ');
    },
      err => {
        alert(err.message);
      });
    return 1;

  }

  deleteCategory(id: number): void {
    this.http.get('LibraryManagementWEB/category/deleteCategory/' + id).subscribe();

  }

}

export class Category {
  constructor(
    public id: number,
    public name: string,
    public description: string
  ) {

  }

}
