import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MemberService {
  httpOptions = {
    headers: new HttpHeaders(
      {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept'
      })
  };

  constructor(private http: HttpClient) { }

  getMembers(): Observable<Member[]> {
    return this.http.get<Member[]>('LibraryManagementWEB/member');
  }

  deleteMembre(id: number): void {
    this.http.get('LibraryManagementWEB/member/deleteMember/' + id).subscribe();

  }

}


export class Member {
  constructor(
    public id: number,
    public name: string,
    public type_Member: string,
    public address: string,
    public cardNumber: string,
    public age: number,
    public email: string,
    public phone: string,
    public sex: string,
    public school: string,
    public subject: string,
    public classs: string,
    public year: number,
    public membershipDate: Date,
  ) {

  }
}