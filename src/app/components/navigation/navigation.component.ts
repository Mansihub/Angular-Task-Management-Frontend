import { Component } from '@angular/core';
import { Router,NavigationEnd } from '@angular/router';
import { LoginService } from '../../services/login.service';
import { Location } from '@angular/common';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.css'
})

export class NavigationComponent {
 checkIsLoggedIn : boolean  = false
 currentRoute:string='';

constructor(private router: Router,private loginService:LoginService,private location: Location) { }

ngOnInit(){
    this.isLoggedInCheck();
}

 isCurrentRoute(route: string): boolean {
  return this.location.path() === route;
}

isLoggedInCheck(): void {
     this.checkIsLoggedIn = this.loginService.isLoggedIn()
  
     if (this.checkIsLoggedIn){
      this.navigateToTasks();
     }
     else{
      this.navigateToLogin();
     }
    
  }

navigateToTasks() {
    this.router.navigate(['/tasks']);
}

navigateToSignup() {
  this.router.navigate(['/signup']);
}
navigateToLogin() {
  this.router.navigate(['/login']);
}

logout(): void {
  this.loginService.logout()
    .pipe(
      catchError(error => {
        console.log('Error occurred during logout', error);
        return of(); 
      })
    )
    .subscribe(
      response => {
        console.log('logout successful', response);
        this.router.navigate(['/login']);
      }
    );
}

}




    
