import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})

export class LoginService {

  constructor(private http:HttpClient,private cookieService: CookieService) { }

  isLoggedIn(): boolean {
    const isCookiePresent=this.getCookie('access_token')
    if(isCookiePresent){
      return true 
    }
    else {
      return false
    }
 
  }

  getCookie(key: string){
    return this.cookieService.get(key);
  }


  // login(userData:any):Observable<any>{
  //   return this.http.post('http://localhost:4203/login',userData, 
  //   {headers: {"Content-Type": "application/json"},withCredentials : true})
  // }
  login(userData:any):Observable<any>{
    return this.http.post('http://localhost:4203/login',userData,{withCredentials : true})
  }

  logout():Observable<any>{
    return this.http.get('http://localhost:4203/logout' ,{withCredentials : true})
  }

}
