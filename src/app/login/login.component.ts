import { logging } from 'protractor';
import { Router } from '@angular/router';
import { LoginService } from './login.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray, FormControl } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class LoginComponent implements OnInit {

  formRegister: FormGroup
  showErrorRegister: boolean = false
  loading: boolean = false
  errorMsg
  formLogin: FormGroup
  showErrorLogin: boolean = false

  constructor(
    private formBuilder: FormBuilder,
    private loginService: LoginService,
    private router: Router
  ) {
      this.formLogin = this.formBuilder.group({
        username: [null, Validators.required],
        password: [null, Validators.required]
      });
  }

  ngOnInit(): void {
  }

  login() {

    if (this.formLogin.valid) {

      this.loading = true
      const values = this.formLogin.value
      
      this.loginService.auth(values.username, values.password)
        .subscribe( (res: {data: any, extensions, errors}) => {

            if(res.errors){
              this.errorMsg = res.errors[0].message
              this.showErrorLogin = true
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
      this.validateForm(this.formLogin)
    }
  }

  validateForm (form: FormGroup) {
    form.markAllAsTouched()
  }

  verifyValidTouched (field: string, form: FormGroup) {
    return !form.get(field).valid && form.get(field).touched
  }


}
