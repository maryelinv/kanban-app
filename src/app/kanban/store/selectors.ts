import { createFeatureSelector, createSelector } from '@ngrx/store';
import { KanbanState, Task } from './state';
import { KANBAN_FEATURE_KEY } from './reducer';

export const selectKanbanState = createFeatureSelector<KanbanState>(KANBAN_FEATURE_KEY);

export const selectAllTasks = createSelector(selectKanbanState, s => s.tasks);

export const selectTasksByStatus = (status: Task['status']) =>
  createSelector(selectAllTasks, tasks => tasks.filter(t => t.status === status));

export const selectTaskById = (taskId: string) =>
  createSelector(selectAllTasks, tasks => tasks.find(t => t.id === taskId));

export const selectTaskLoading = (taskId: string) =>
  createSelector(selectTaskById(taskId), task => !!task?.loadingPriority);
