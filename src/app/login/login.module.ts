import { SharedModule } from './../shared/shared.module';
import { ApolloModule } from 'apollo-angular';
import { NgModule } from '@angular/core';
import { CommonModule,  } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { LoginComponent } from './login.component';
import { LoginService } from './login.service';
import { RegisterComponent } from './register/register.component';



@NgModule({
  declarations: [LoginComponent, RegisterComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ApolloModule,
    SharedModule
  ],
  providers: [LoginService]
})
export class LoginModule { }
