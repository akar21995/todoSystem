// src/app/todo.service.ts
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface Todo {
  taskId: number;
  title: string;
  description: string;
  status: string;
}

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  private todos: Todo[] = [];
  private todosSubject = new BehaviorSubject<Todo[]>(this.todos);

  private apiUrl = "http://localhost:3000";

  constructor(
    private http: HttpClient
  ) {}

  getTodos(): Observable<any> {
    return this.http.get(`${this.apiUrl}/private/api/task`);
  }

  statusFilterTodos(status: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/private/api/task/taskList/filter?status=${status}`);
  }

  getIdFilterTodo(id: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/private/api/task/${id}`);
  }

  addTodo(todo: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/private/api/task/create`, todo);
  }

  updateTodo(id: string | number, updatedTodo: Todo): Observable<any> {
    return this.http.put(`${this.apiUrl}/private/api/task/${id}`, updatedTodo);
  }

  deleteTodo(id: string | number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/private/api/task/${id}`);
  }

  setTodosFromCSV(file: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/private/api/csv/upload`, file);
  }

  getTodosAsCSV(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/private/api/csv/download`, data);
  }
}
