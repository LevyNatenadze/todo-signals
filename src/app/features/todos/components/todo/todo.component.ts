import { Component, ElementRef, inject, input, OnChanges, OnInit, output, SimpleChanges, ViewChild } from '@angular/core';
import { TodoInterface } from '../../types/todo.interface';
import { CommonModule } from '@angular/common';
import { TodoService } from '../../services/todo.service';
import { TodosFirebaseService } from '../../services/todos-firebase.service';
import { tap } from 'rxjs';

@Component({
  selector: 'app-todo',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './todo.component.html',
})
export class TodoComponent implements OnInit, OnChanges {
  todo = input.required<TodoInterface>();
  isEditing = input.required<boolean>();
  setEditingId = output<string | null>();
  todoService = inject(TodoService);
  todoFirebaseService = inject(TodosFirebaseService);
  editingText: string = '';

  @ViewChild('inputText') inputText?: ElementRef;

  ngOnInit(): void {
      this.editingText = this.todo().text;
  }

  ngOnChanges(changes: SimpleChanges): void {
      if(changes['isEditing'].currentValue) {
        setTimeout(() => {
          this.inputText?.nativeElement.focus();
        });
      }
  }

  changeText(event: Event) {
    const target = event.target as HTMLInputElement;
    this.editingText = target.value;
  }

  changeTodo() {
    const dataToUpdate = {
      text: this.editingText,
      isCompleted: this.todo().isCompleted
    }
    this.todoFirebaseService.updateTodo(this.todo().id, dataToUpdate)
    .pipe(
      tap(() => {
        this.todoService.editTodo(this.todo().id, this.editingText);
      })
    )
    .subscribe()
    this.setEditingId.emit(null) 
  }
 
  setTodoInEditMode() {
    this.setEditingId.emit(this.todo().id);
  }

  removeTodo() {
    this.todoFirebaseService.removeTodo(this.todo().id)
    .pipe(
      tap(() => this.todoService.deleteTodo(this.todo().id))
    ).subscribe();
  }

  toggleTodo() {
    const dataToUpdate = {
      text: this.todo().text,
      isCompleted: !this.todo().isCompleted
    };
    this.todoFirebaseService.updateTodo(this.todo().id, dataToUpdate)
    .pipe(tap(() => this.todoService.toggleTodo(this.todo().id)))
    .subscribe();
  }


}
