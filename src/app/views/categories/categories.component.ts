import { Component, OnInit } from '@angular/core';
import { CategorieService, Category } from '../../service/categorie.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {

  httpOptions = {
    headers: new HttpHeaders(
      {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept'
      })
  };



  // post: any;
  // id: number;
  // name: string;
  // description: string;

  form: FormGroup;
  isAdded: boolean = false;
  model = new Category(null, null, null);
  listeCategory = [];
  oneCategory: Category;

  constructor(
    private modalService: NgbModal,
    private cs: CategorieService,
    public fb: FormBuilder,
    private http: HttpClient) {

    this.createForm();

  }

  createForm() {
    this.form = this.fb.group({
      // 'id': ['', Validators.required],
      "name": ["", Validators.required],
      "description": ""
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
    this.ajouterCategory(data);
    this.form.reset();
    this.cs.getCategories().subscribe(
      data => this.listeCategory = data
    );

  }

  get diagnostic() {
    return JSON.stringify(this.model);
  }

  ngOnInit() {
    this.cs.getCategories().subscribe(
      data => this.listeCategory = data
    );
    this.createForm()
  }


  ajouterCategory(newCat) {
    this.http.post('LibraryManagementWEB/category', newCat, this.httpOptions)
      .subscribe(
        res => {
          console.log(res);
          this.isAdded = true;
        },
        err => {
          console.log("errrreur xxxxxxxxxxxxxxxxxxxxx");
        }
      )
  }



  newCategory() {
    let c = this.cs.addCategory(this.model);
    // this.cs.getCategories().subscribe(data => this.listeCategory = data);
    // this.listeCategory.unshift(this.model);
  }

  delete(ctgry: Category) {
    this.cs.deleteCategory(ctgry.id);
    this.cs.getCategories().subscribe(data => this.listeCategory = data);
    this.listeCategory.unshift(this.model);

  }

  view(ctgry: Category) {
    this.oneCategory = ctgry;
  }

  open(content) {
    this.modalService.open(content);
  }

}
