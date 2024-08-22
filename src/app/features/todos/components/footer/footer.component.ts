import { CommonModule } from '@angular/common';
import { Component, computed, inject } from '@angular/core';
import { TodoService } from '../../services/todo.service';
import { FilterEnum } from '../../types/filter.enum';

@Component({
  selector: 'app-todos-footer',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './footer.component.html',
})
export class FooterComponent {
  todoService = inject(TodoService);
  filter = this.todoService.filters;
  filterEnum = FilterEnum;

  activeCount = computed(() => {
    return this.todoService.todos()
    .filter(todo => !todo.isCompleted).length;
  });

  noTodosClass = computed(() => this.todoService.todos().length === 0);

  todoItemsLeft = computed(() => 
    `item${this.activeCount() !== 1 ? 's' : ''} left`)

  changeFilter(event: Event, filterName: FilterEnum) {
    event.preventDefault();
    this.todoService.changeFilter(filterName);
  }

}
