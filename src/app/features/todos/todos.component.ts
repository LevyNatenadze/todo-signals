import { Component, inject, OnInit } from '@angular/core';
import { HeaderComponent } from './components/header/header.component';
import { MainComponent } from './components/main/main.component';
import { FooterComponent } from './components/footer/footer.component';
import { TodoService } from './services/todo.service';
import { TodosFirebaseService } from './services/todos-firebase.service';
import { pipe, tap } from 'rxjs';

@Component({
  selector: 'app-todos',
  standalone: true,
  imports: [HeaderComponent, MainComponent, FooterComponent],
  templateUrl: './todos.component.html',
})
export class TodosComponent implements OnInit {
  todoService = inject(TodoService);
  todosFirebaseService = inject(TodosFirebaseService);

  ngOnInit(): void {
    this.todosFirebaseService.getTodos()
    .pipe(
      tap(todos => this.todoService.todos.set(todos))
    )
    .subscribe();
  }

}
