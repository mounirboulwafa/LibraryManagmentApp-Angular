import { Component, OnInit } from '@angular/core';
import { Member, MemberService } from '../../service/member.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-member',
  templateUrl: './member.component.html',
  styleUrls: ['./member.component.css']
})
export class MemberComponent implements OnInit {

  form: FormGroup;
  object = new Member(null, null, null, null, null, null, null, null, null, null, null, null, null, null);
  listeMembers = [];
  oneMember: Member;
  isAdded: boolean = false;
  httpOptions = {
    headers: new HttpHeaders(
      {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept'
      })
  };

  constructor(
    private ms: MemberService,
    private modalService: NgbModal,
    public fb: FormBuilder,
    private http: HttpClient) {

    this.createForm();

  }

  createForm() {
    this.form = this.fb.group({
      // 'id': ['', Validators.required],
      "name": ["", Validators.required],
      "cardNumber": "",
      "membershipDate": "2018-11-14T00:00:00Z[UTC]",
      "email": "",
      "phone": "",
      "address": "",
      "sex": "",
      "age": ""

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
    this.ajouterMembre(data);
    this.form.reset();
    this.ms.getMembers().subscribe(
      data => this.listeMembers = data
    );
  }

  ajouterMembre(newMbr) {
    this.http.post('LibraryManagementWEB/member', newMbr, this.httpOptions)
      .subscribe(
        res => {
          console.log(res);
          this.isAdded = true;
          this.ms.getMembers().subscribe(data => this.listeMembers = data);
          this.listeMembers.unshift(this.object);

        },
        err => {
          console.log("errrreur xxxxxxxxxxxxxxxxxxxxx");
        }
      )
  }


  ngOnInit() {
    this.ms.getMembers().subscribe(
      data => this.listeMembers = data
    )
  }

  delete(mbr: Member) {
    this.ms.deleteMembre(mbr.id);
    this.ms.getMembers().subscribe(data => this.listeMembers = data);
    this.listeMembers.unshift(this.object);

  }


  view(mbr: Member) {
    this.oneMember = mbr;
  }
  open(content) {
    this.modalService.open(content, { size: 'lg' });
  }

}
