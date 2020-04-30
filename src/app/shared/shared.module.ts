import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NavbarComponent } from './navbar/navbar.component';
import { RouterModule } from '@angular/router';
import { UpvoteComponent } from './upvote/upvote.component';
import { TextBodyComponent } from './text-body/text-body.component';
import { CommentsComponent } from './comments/comments.component';
import { NewPostComponent } from './new-post/new-post.component';
import { ErrorAlertComponent } from './error-alert/error-alert.component';
import { MenuComponent } from './menu/menu.component';



@NgModule({
  declarations: [
    NavbarComponent,
    CommentsComponent,
    UpvoteComponent,
    TextBodyComponent,
    NewPostComponent,
    ErrorAlertComponent,
    MenuComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports:[
    NavbarComponent,
    CommentsComponent,
    UpvoteComponent,
    TextBodyComponent,
    NewPostComponent,
    ErrorAlertComponent,
    MenuComponent
  ]
})
export class SharedModule { }
