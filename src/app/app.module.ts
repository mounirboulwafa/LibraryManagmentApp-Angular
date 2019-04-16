import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import {
  MatButtonModule,
  MatCheckboxModule,
  MatToolbarModule,
  MatSidenavModule,
  MatIconModule,
  MatListModule
} from "@angular/material";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { ModalModule, BsModalRef } from "ngx-bootstrap";
import { RouterModule, Routes } from "@angular/router";

import { AppComponent } from "./app.component";
import { DashboardComponent } from "./views/dashboard/dashboard.component";
import { BookComponent } from "./views/book/book.component";
import { MemberComponent } from "./views/member/member.component";
import { LayoutModule } from "@angular/cdk/layout";
import { TopNavbarComponent } from "./views/top-navbar/top-navbar.component";
import { CategoriesComponent } from "./views/categories/categories.component";
import { CirculationComponent } from "./views/circulation/circulation.component";
import { FooterComponent } from "./views/footer/footer.component";
import { CollectionsComponent } from "./views/Collections/Collections.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { AuthorsComponent } from "./views/authors/authors.component";
import { AddcategorieComponent } from "./views/categories/addcategorie/addcategorie.component";
import { NewMemberComponent } from "./views/member/new-member/new-member.component";
import { NewbookComponent } from "./views/book/newbook/newbook.component";

const appRoutes: Routes = [
  { path: "", component: DashboardComponent },
  { path: "Circulation", component: CirculationComponent },
  { path: "Livres", component: BookComponent },
  { path: "Members", component: MemberComponent },
  { path: "Collections", component: CollectionsComponent },
  { path: "Categories", component: CategoriesComponent },
  { path: "Categories/addcategorie", component: AddcategorieComponent },
  { path: "Members/newmember", component: NewMemberComponent },
  { path: "Livres/newbook", component: NewbookComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    BookComponent,
    MemberComponent,
    TopNavbarComponent,
    CollectionsComponent,
    CategoriesComponent,
    CirculationComponent,
    FooterComponent,
    AuthorsComponent,
    AddcategorieComponent,
    NewMemberComponent,
    NewbookComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatCheckboxModule,
    LayoutModule,
    MatToolbarModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    NgbModule.forRoot(),
    ModalModule.forRoot(),
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true } // <-- debugging purposes only
    )
  ],
  providers: [BsModalRef],
  bootstrap: [AppComponent]
})
export class AppModule {}
