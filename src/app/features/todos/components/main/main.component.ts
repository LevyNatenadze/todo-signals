import { Component, computed, inject } from '@angular/core';
import { TodoService } from '../../services/todo.service';
import { FilterEnum } from '../../types/filter.enum';
import { TodoComponent } from '../todo/todo.component';
import { CommonModule } from '@angular/common';
import { TodosFirebaseService } from '../../services/todos-firebase.service';
import { forkJoin, tap } from 'rxjs';

@Component({
  selector: 'app-todos-main',
  standalone: true,
  imports: [TodoComponent, CommonModule],
  templateUrl: './main.component.html',
})
export class MainComponent {
  todoService = inject(TodoService);
  todoFirebaseService = inject(TodosFirebaseService);
  editingId: string | null = null;
  
  visibleTodos = computed(() => {
    const todos = this.todoService.todos();
    const filter = this.todoService.filters();

    if(filter === FilterEnum.active) {
      return todos.filter(todo => !todo.isCompleted)
    } else if(filter === FilterEnum.completed) {
      return todos.filter(todo => todo.isCompleted)
    }

    return todos;
  });

  isAllTodosSelected = computed(() => this.todoService.todos().every(todo => todo.isCompleted));
  noTodosClass = computed(() => this.todoService.todos().length === 0);

  setEditingId(editingId: string | null): void {
    this.editingId = editingId;
  }

  toggleAllTodos(event: Event) {
    const target = event.target as HTMLInputElement;
    const requests$ = this.todoService.todos().map((todo) => {
      return this.todoFirebaseService.updateTodo(todo.id, {
        text: todo.text,
        isCompleted: target.checked
      })
    })
    forkJoin(requests$)
    .pipe(tap(() => this.todoService.toggleAllTodos(target.checked)))
    .subscribe()
  }

}
