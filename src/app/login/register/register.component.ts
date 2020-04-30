import { Router } from '@angular/router';
import { RegisterService } from './register.service';
import { FormGroup, FormBuilder, Validators, FormControl, FormArray, ValidatorFn, AbstractControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  formRegister: FormGroup
  showErrorRegister: boolean = false
  loading: boolean = false
  errorMsg: string

  constructor(
    private formBuilder: FormBuilder,
    private registerService: RegisterService,
    private router: Router
  ) {
      
      this.formRegister = this.formBuilder.group({
        username: [null, Validators.required],
        password: [null, Validators.required],
        password2: [null, Validators.required],
      }, {validator: this.equalPassword });
  }

  ngOnInit(): void {
  }

  
  register() {

    if (this.formRegister.valid) {

      this.loading = true
      const values = this.formRegister.value
      
      this.registerService.newUser(values.username, values.password)
        .subscribe( (res: {data: any, extensions, errors}) => {

            if(res.errors){
              this.errorMsg = res.errors[0].message
              this.showErrorRegister = true
            }
            else {
              localStorage.setItem('jwt', res.data.createUser.token)
              localStorage.setItem('username', res.data.createUser.username)
              localStorage.setItem('_id', res.data.createUser._id)
              
              this.router.navigate([''])
            }
            
            this.loading = false
        })
    }
    else {
      this.validateForm(this.formRegister)
    }
  }

  equalPassword(group: FormGroup) {
    let pass = group.get('password').value;
    let confirmPass = group.get('password2').value;

    return pass === confirmPass ? null : { diff: true }     
  }


  validateForm (form: FormGroup) {
    form.markAllAsTouched()
  }

  verifyValidTouched (field: string, form: FormGroup) {
    return !form.get(field).valid && form.get(field).touched
  }

}
