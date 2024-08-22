import { Component, ElementRef, inject, input, OnChanges, OnInit, output, SimpleChanges, ViewChild } from '@angular/core';
import { TodoInterface } from '../../types/todo.interface';
import { CommonModule } from '@angular/common';
import { TodoService } from '../../services/todo.service';

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
    this.todoService.editTodo(this.todo().id, this.editingText);
    this.setEditingId.emit(null)
  }
 
  setTodoInEditMode() {
    this.setEditingId.emit(this.todo().id);
  }

  removeTodo() {
    this.todoService.deleteTodo(this.todo().id);
  }

  toggleTodo() {
    this.todoService.toggleTodo(this.todo().id);
  }


}
