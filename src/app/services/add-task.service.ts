import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AddTaskService {

  constructor(private http:HttpClient) { }
 
  postTask(userData:any):Observable<any>{
    return this.http.post<any>('http://localhost:4203/tasks',userData,{withCredentials : true})
    }
  
  getAllTasks(){
    return this.http.get('http://localhost:4203/tasks',{withCredentials : true})
  }

  updateTask(data:any,taskId:number){
    return this.http.put('http://localhost:4203/tasks/'+taskId,data,{withCredentials : true})
  }

  deleteTask(taskId:number){
    return this.http.delete('http://localhost:4203/tasks/'+taskId,{withCredentials : true})
  }
}
