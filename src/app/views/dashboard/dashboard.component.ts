import { Component, OnInit } from '@angular/core';
// import * as $ from 'jquery';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  form: FormGroup;

  post: any;
  id: number;
  name: string;
  description: string;

  constructor(public fb: FormBuilder, private modalService: NgbModal) {
    this.form = this.fb.group({
      'id': ['', Validators.required],
      'name': [''],
      'description': ['54545']
    })
  }


  addAuthor(post) {
    this.id = post.id;
    this.name = post.name;
    this.description = post.description;

    // this.http.post('http://localhost:8080/LibraryManagementWEB/author', JSON.stringify(this.form))
  }


  ngOnInit() {
    console.log(this.form.value)
  }



  //Modal Code

  open(content) {
    this.modalService.open(content);
  }


}
