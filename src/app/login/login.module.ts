import { ApolloModule } from 'apollo-angular';
import { NgModule } from '@angular/core';
import { CommonModule,  } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { LoginComponent } from './login.component';
import { LoginService } from './login.service';



@NgModule({
  declarations: [LoginComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ApolloModule
  ],
  providers: [LoginService]
})
export class LoginModule { }
