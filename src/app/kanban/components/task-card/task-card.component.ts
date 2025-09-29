import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { Task } from '../../store/state';

@Component({
  selector: 'app-task-card',
  standalone: true,
  imports: [CommonModule, FormsModule, DragDropModule],
  templateUrl: './task-card.component.html',
  styleUrls: ['./task-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TaskCardComponent {
  @Input() task!: Task;
  @Output() updateTitle = new EventEmitter<{ taskId: string; title: string }>();
  @Output() delete = new EventEmitter<string>();

  editing = false;
  draftTitle = '';

  startEdit() { this.editing = true; this.draftTitle = this.task.title; }
  save() {
    const title = this.draftTitle.trim();
    if (title && title !== this.task.title) this.updateTitle.emit({ taskId: this.task.id, title });
    this.editing = false;
  }
  cancel() { this.editing = false; }
  doDelete() { this.delete.emit(this.task.id); }
}
