import { AuthService } from './auth/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit{

  validToken = false

  constructor(private authService: AuthService) {
    this.checkLogin()
  }

  checkLogin() { 
    if(this.authService.isAuthenticated()){
      this.validToken = true
    }
  }

  ngOnInit(): void {
  }
}
