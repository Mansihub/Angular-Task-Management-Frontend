import { Component ,Inject} from '@angular/core';
import { FormGroup,FormBuilder,Validators } from '@angular/forms';
import { AddTaskService } from '../../services/add-task.service';
import { MatDialogRef,MAT_DIALOG_DATA } from '@angular/material/dialog';
import { catchError, of } from 'rxjs';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrl: './dialog.component.css'
})
export class DialogComponent {
taskForm!:FormGroup;
actionBtn:string="Save"

constructor(private formbuilder:FormBuilder,
  private addTaskService:AddTaskService,
  private dialogRef:MatDialogRef<DialogComponent>,
  @Inject(MAT_DIALOG_DATA) public editData:any){}

ngOnInit():void{
this.taskForm=this.formbuilder.group({
  taskName:['',Validators.required],
  status:[''],
  taskDescription:['']
})


if(this.editData){
  this.actionBtn="Update";
  this.taskForm.controls['taskName'].setValue(this.editData.taskName);
  this.taskForm.controls['status'].setValue(this.editData.status);
  this.taskForm.controls['taskDescription'].setValue(this.editData.taskDescription);
  }
}
addTask():void{
  if(!this.editData){
    this.addTaskService.postTask(this.taskForm.value)
    .pipe(catchError(error=>{
      console.log('Error ocurred while adding task');
      return of();
    })
    ).subscribe(
      response=>{
        console.log(this.taskForm.value)
        this.dialogRef.close('save');
      }
  )
  }
  else{
    this.updateTask();
  }
}

updateTask():void{
  this.addTaskService.updateTask(this.taskForm.value,this.editData.taskId)
  .pipe(catchError(error=>{
    console.log('Error ocurred while updating task');
    return of();
  }))
  .subscribe(
    response=>{
      this.dialogRef.close('update');
    }
   );
}

}
