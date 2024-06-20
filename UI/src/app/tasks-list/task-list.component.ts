// src/app/todo-list/todo-list.component.ts
import { Component, OnInit } from '@angular/core';
import { TodoService, Todo } from '../_service/todo.service';
import { Observable, from, map, pipe, subscribeOn } from 'rxjs';
import { TaskStatus, TaskStatusList } from '../utils/general.config';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-todo-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TodoListComponent implements OnInit {
  todos: Observable<Todo[]> | undefined;
  newTodoTitle = '';

  statusList: string[] = TaskStatusList;
  StatusFilter: string = "";

  constructor(private todoService: TodoService) {}

  ngOnInit(): void {
    this.getAllToDos();
  }

  getAllToDos() {
    this.todos = this.todoService.getTodos().pipe(
      map((res: any) => {
        if(res) {
          console.log(res);
          return res.taskList;
        }
      })
    );
  }

  statusFilter(event: any) {
    console.log(event.target.value);

    this.todos = this.todoService.statusFilterTodos(event.target.value).pipe(
      map((res: any) => {
        if(res) {
          console.log(res);
          return res.taskList;
        }
      })
    );
  }

  idFilter(event: any) {
    console.log(event.target.value);

    this.todos = this.todoService.getIdFilterTodo(event.target.value).pipe(
      map((res: any) => {
        if(res) {
          console.log(res);
          return res;
        }
      })
    );
  }

  addTodo() {
    const newTodo = {
      title: this.newTodoTitle,
      status: TaskStatus.pending,
      description: ""
    };
    this.todoService.addTodo(newTodo).subscribe(
      (res: any) => {
        if(res) {
          this.newTodoTitle = '';
          this.getAllToDos();
        }
      },
      (err: any) => {
        console.error(err);
      }
    );
  }

  updateTodo(todo: Todo) {
    this.todoService.updateTodo(todo.taskId, todo).subscribe(
      (res: any) => {
        if(res) {
          this.getAllToDos();
        }
      },
      (err: any) => {
        console.error(err);
      }
    );
  }

  deleteTodo(id: number) {
    this.todoService.deleteTodo(id).subscribe(
      (res: any) => {
        if(res) {
          this.getAllToDos();
        }
      },
      (err: any) => {
        console.error(err);
      }
    );
  }

  uploadCSV(event: any) {
    const file = event.target.files[0];
    const form = new FormData();
    form.append('file', file);

    this.todoService.setTodosFromCSV(form).subscribe(
      (res: any) => {
        if(res) {
          this.getAllToDos();
        }
      },
      (err) => {
        console.error(err);
      }
    );
  }

  downloadCSV() {
    this.todoService.getTodosAsCSV({});
  }



}
