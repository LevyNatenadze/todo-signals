import { Injectable, signal } from '@angular/core';
import { TodoInterface } from '../types/todo.interface';
import { FilterEnum } from '../types/filter.enum';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  todos = signal<TodoInterface[]>([]);
  filters = signal<FilterEnum>(FilterEnum.all);

  changeFilter(filterName: FilterEnum): void {
    this.filters.set(filterName);
  }

  addTodo(text: string): void {
    const newTodo: TodoInterface = {
      text,
      isCompleted: false,
      id: Math.random().toString(16)
    };

    this.todos.update((todos) => [...todos, newTodo]);
  }

  editTodo(id: string, text: string): void {
    this.todos.update((todos) => 
      todos.map(todo => todo.id === id ? {...todo, text} : todo));
  }

  deleteTodo(id: string) {
    this.todos.update((todos) => todos.filter((todo) => todo.id !== id));
  }

  toggleTodo(id: string): void {
    this.todos.update((todos) => 
      todos.map(todo => todo.id === id ? {...todo, isCompleted: !todo.isCompleted} : todo));
  }

  toggleAllTodos(isCompleted: boolean) {
    this.todos.update((todos) => 
      todos.map(todo => ({...todo, isCompleted})));
  }
  
}
