import { Component, inject } from '@angular/core';
import { TodoService } from '../../services/todo.service';
import { TodosFirebaseService } from '../../services/todos-firebase.service';
import { tap } from 'rxjs';

@Component({
  selector: 'app-todos-header',
  standalone: true,
  imports: [],
  templateUrl: './header.component.html',
})
export class HeaderComponent {
  todoService = inject(TodoService);
  todoFirebaseService = inject(TodosFirebaseService);
  text: string = '';

  changeText(event: Event) {
    const target = event.target as HTMLInputElement;
    this.text = target.value;
  }

  addTodo() {
    if(this.text !== '') {
      this.todoFirebaseService.addTodo(this.text).pipe(
        tap((addedTodoId) => {
          this.todoService.addTodo(this.text, addedTodoId);
          this.text = ''
        })
      )
      .subscribe()
    }
  }
}
