import { Component } from '@angular/core';
import { FormGroup,FormControl,Validators } from '@angular/forms';
import { LoginService } from '../../services/login.service';
import { Router } from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

loginForm:FormGroup|any;
loginError: string = '';
hide=true;


constructor(private loginService:LoginService,private router: Router,private snackBar: MatSnackBar ){}

ngOnInit(){
  this.loginForm=this.createFormGroup();
}

createFormGroup():FormGroup{
    return new FormGroup({
       "email":new FormControl("",[Validators.required,Validators.email]),
      "password":new FormControl("",[Validators.required,Validators.minLength(5)])
      })
  }

login(): void {
  this.loginService.login(this.loginForm.value)
    .pipe(
      catchError(error => {
        this.loginError = 'Invalid credentials. Please enter valid email and password.';
        this.snackBar.open(this.loginError, 'Close');
        return of(); // Return an observable to complete the pipeline
      })
    )
    .subscribe(
      response => {
        this.router.navigate(['/tasks']);
      }
    );
}

}

