import {Component, Injectable } from '@angular/core';
import {AddTaskService } from '../../services/add-task.service';
import {ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { DialogComponent } from '../dialog/dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { MatSelectChange } from '@angular/material/select';
import {MatSnackBar} from '@angular/material/snack-bar';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrl: './todo-list.component.css',
  })


export class TodoListComponent  {
  
  displayedColumns: string[] = ['taskName','taskDescription','status','action'];
  dataSource!: MatTableDataSource<any>;

 @ViewChild(MatPaginator,{static: false}) paginator!: MatPaginator;
 @ViewChild(MatSort) sort!: MatSort;

 
constructor(private showTask:AddTaskService,private dialog:MatDialog,private snackBar: MatSnackBar ){}
   
ngOnInit(){
  this.showAllTasks();
}

showAllTasks() {
  this.showTask.getAllTasks()
    .pipe(
      catchError(error => {
        console.log('Error occurred while displaying all tasks:', error);
        return of({ tasks: [] });
      })
    )
    .subscribe(
      (response: any) => {
        console.log('All tasks displayed:', response.tasks);
        this.dataSource = new MatTableDataSource<any>(response.tasks);
        setTimeout(() => this.dataSource.paginator = this.paginator);
        this.dataSource.sort = this.sort;

        if (this.dataSource.data.length === 0) {
          this.snackBar.open('No tasks found. Please add some tasks.', 'Close');
        }
      }
    );
}

openDialog(): void {
  this.dialog.open(DialogComponent, {
    width:'30%'
  }).afterClosed().subscribe(val=>{
    if (val==='save'){
      this.showAllTasks();
    }
  });
}

editTask(row:any){
  this.dialog.open(DialogComponent,{
    width:'30%',data:row
  }).afterClosed().subscribe(val=>{
    if(val==='update'){
      this.showAllTasks();
      }
  })
}


deleteTask(taskId:number){
  this.showTask.deleteTask(taskId)
  .pipe(
    catchError(error=>{
          this.snackBar.open('error occured in deleting task');
          return of();
    })
  ).subscribe(
    response=>{
      this.showAllTasks();
    },
  )
}

applyFilter(event: Event) {
  const filterValue = (event.target as HTMLInputElement).value;
  this.dataSource.filter = filterValue.trim().toLowerCase();

  if (this.dataSource.paginator) {
    this.dataSource.paginator.firstPage();
  }
}

onChange1(event: MatSelectChange){

  const filterValue = event.value;

  if (filterValue === 'All') {
    this.dataSource.filter = ''; 
  } else{
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
 

  if (this.dataSource.paginator) {
    this.dataSource.paginator.firstPage();
  }
}


}