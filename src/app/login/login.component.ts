import { logging } from 'protractor';
import { Router } from '@angular/router';
import { LoginService } from './login.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class LoginComponent implements OnInit {

  form: FormGroup
  loading: boolean = false
  errorMsg
  showError: boolean = false

  constructor(
    private formBuilder: FormBuilder,
    private loginService: LoginService,
    private router: Router
  ) {
      this.form = this.formBuilder.group({
        username: ['', Validators.required],
        password: ['', Validators.required]
    });
  }

  ngOnInit(): void {
  }

  login() {
    
    this.loading = true

    const values = this.form.value
    
    if (values.username && values.password) {
      this.loginService.auth(values.username, values.password)
        .subscribe( (res: {data: any, extensions, errors}) => {

        if(res.errors){
          this.errorMsg = res.errors[0].message
          this.showError = true
        }
        else {
          localStorage.setItem('jwt', res.data.login.token)
          localStorage.setItem('username', res.data.login.username)
          localStorage.setItem('_id', res.data.login._id)
          
          this.router.navigate([''])
        }
        
        this.loading = false
      })
    }
    else {        
      this.loading = false
    }
  }

}
