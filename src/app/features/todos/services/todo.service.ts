import { Injectable, signal } from '@angular/core';
import { TodoInterface } from '../types/todo.interface';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  todos = signal<TodoInterface[]>([]);
  
}
