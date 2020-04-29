import { AuthService } from './../../auth/auth.service';
import { Component, OnInit, Input, OnChanges } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
})
export class NavbarComponent  {

  username: string

  @Input()
  validToken: boolean

  constructor(
    private authService: AuthService,) {
    this.validToken = false
  }

  ngOnChanges() {
    if(localStorage.getItem('username')){
      this.username = localStorage.getItem('username')
    }
  }

  logout(){
    this.authService.logout()
    window.location.reload()
  }

  

}
