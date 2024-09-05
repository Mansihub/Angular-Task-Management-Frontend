import { Component } from '@angular/core';
import { FormGroup,FormControl,Validators } from '@angular/forms';
import { SignupService } from '../../services/signup.service';
import { Router } from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {
signupForm:FormGroup|any;
hide=true;
emailAlreadyExist = "";
constructor(private signupService:SignupService,private router:Router, private snackBar: MatSnackBar){}

ngOnInit(){
  this.signupForm=this.createFormGroup();}

  createFormGroup():FormGroup{
    return new FormGroup({
      "fname":new FormControl("",[Validators.required]),
      "lname":new FormControl("",[Validators.required]),
      "email":new FormControl("",[Validators.required,Validators.email]),
      "password":new FormControl("",[Validators.required,Validators.minLength(5)])
      
    })
  }
 
signup(): void {
  this.signupService.signup(this.signupForm.value)
    .pipe(
      catchError(error => {
        if (error.status === 409) {
          const msg = JSON.stringify(error.error.error);
          const msgToShow = msg.slice(1, 21);
          this.snackBar.open(msgToShow, 'Close');
        }
        console.log('Error occurred during signup', error.error);
        return of(); 
      })
    )
    .subscribe(
      response => {
        this.router.navigate(['/tasks']);
      }
    );
}
}