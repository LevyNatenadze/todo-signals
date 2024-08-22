import { Component, inject } from '@angular/core';
import { TodoService } from '../../services/todo.service';

@Component({
  selector: 'app-todos-header',
  standalone: true,
  imports: [],
  templateUrl: './header.component.html',
})
export class HeaderComponent {
  todoService = inject(TodoService);
  text: string = '';

  changeText(event: Event) {
    const target = event.target as HTMLInputElement;
    this.text = target.value;
  }

  addTodo() {
    this.todoService.addTodo(this.text);
    this.text = ''
  }

}
