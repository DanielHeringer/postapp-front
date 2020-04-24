import { Router } from '@angular/router';
import { Component, OnInit, Input, OnChanges } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent  {

  username: string

  @Input()
  validToken: boolean

  constructor(private router: Router) {
    this.validToken = false
  }

  ngOnChanges() {
    if(localStorage.getItem('username')){
      this.username = localStorage.getItem('username')
    }
  }

  logout(){
    localStorage.clear()
    this.router.navigate(['/login'])
  }

  

}
