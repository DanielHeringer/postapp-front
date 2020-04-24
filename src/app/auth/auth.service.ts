import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable()
export class AuthService {

  constructor(
    public jwtHelper: JwtHelperService,  
    public router: Router
  ) {}

  public isAuthenticated(): boolean {
    const token = localStorage.getItem('jwt')
    // Check whether the token is expired and return
    // true or false
    if(token == null || token == ''){
      return false
    }
    return !this.jwtHelper.isTokenExpired(token) 
  }

  
  logout(){
    localStorage.clear()
    this.router.navigate(['/login'])
  }
}