import { createReducer, on } from '@ngrx/store';
import { initialState, KanbanState } from './state';
import * as A from './actions';

export const KANBAN_FEATURE_KEY = 'kanban';

export const kanbanReducer = createReducer<KanbanState>(
  initialState,
  on(A.addTaskConfirmed, (state, { task }) => ({ ...state, tasks: [task, ...state.tasks] })),
  on(A.updateTask, (state, { taskId, title }) => ({
    ...state, tasks: state.tasks.map(t => t.id === taskId ? { ...t, title } : t)
  })),
  on(A.updateTaskStatus, (state, { taskId, status }) => ({
    ...state, tasks: state.tasks.map(t => t.id === taskId ? { ...t, status } : t)
  })),
  on(A.deleteTask, (state, { taskId }) => ({ ...state, tasks: state.tasks.filter(t => t.id !== taskId) })),
  on(A.fetchPriority, (state, { taskId }) => ({
    ...state, tasks: state.tasks.map(t => t.id === taskId ? { ...t, loadingPriority: true, errorPriority: undefined } : t)
  })),
  on(A.fetchPrioritySuccess, (state, { taskId, priority }) => ({
    ...state, tasks: state.tasks.map(t => t.id === taskId ? { ...t, priority, loadingPriority: false, errorPriority: undefined } : t)
  })),
  on(A.fetchPriorityFailure, (state, { taskId, error }) => ({
    ...state, tasks: state.tasks.map(t => t.id === taskId ? { ...t, loadingPriority: false, errorPriority: error } : t)
  })),
);
