import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DragDropModule, CdkDragDrop } from '@angular/cdk/drag-drop';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Task } from '../../store/state';
import * as Sel from '../../store/selectors';
import * as Act from '../../store/actions';
import { TaskCardComponent } from '../task-card/task-card.component';

@Component({
  selector: 'app-kanban-board',
  standalone: true,
  imports: [CommonModule, FormsModule, DragDropModule, TaskCardComponent],
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BoardComponent {
  todo$!: Observable<Task[]>;
  inProgress$!: Observable<Task[]>;
  done$!: Observable<Task[]>;
  newTitle = '';

  constructor(private readonly store: Store) {
    this.todo$ = this.store.select(Sel.selectTasksByStatus('todo'));
    this.inProgress$ = this.store.select(Sel.selectTasksByStatus('in-progress'));
    this.done$ = this.store.select(Sel.selectTasksByStatus('done'));
  }

  addTask() {
    const title = this.newTitle.trim();
    if (!title) return;
    this.store.dispatch(Act.addTask({ title }));
    this.newTitle = '';
  }

  drop(event: CdkDragDrop<Task[]>, target: Task['status']) {
    const task: Task | undefined = event.item.data as Task | undefined;
    if (!task || task.status === target) return;
    this.store.dispatch(Act.updateTaskStatus({ taskId: task.id, status: target }));
  }

  updateTitle(ev: { taskId: string; title: string }) { this.store.dispatch(Act.updateTask(ev)); }
  delete(taskId: string) { this.store.dispatch(Act.deleteTask({ taskId })); }
}
