import { logging } from 'protractor';
import { Router } from '@angular/router';
import { LoginService } from './login.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  form: FormGroup
  loading: boolean = false

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

    const data = this.form.value
    
    if (data.username && data.password) {
      this.loginService.auth(data.username, data.password).subscribe( (res: any) => {
        localStorage.setItem('jwt', res.data.login.token)
        localStorage.setItem('username', res.data.login.username)
        
        this.loading = false
        this.router.navigate([''])
      })
    }
    else {        
      this.loading = false
    }
  }

}
