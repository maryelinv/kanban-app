import { createAction, props } from '@ngrx/store';
import { Task } from './state';

export const addTask = createAction('[Kanban] Add Task', props<{ title: string }>());

export const addTaskConfirmed = createAction('[Kanban] Add Task Confirmed', props<{ task: Task }>());

export const updateTask = createAction('[Kanban] Update Task Title', props<{ taskId: string; title: string }>());

export const updateTaskStatus = createAction('[Kanban] Update Task Status', props<{ taskId: string; status: 'todo' | 'in-progress' | 'done' }>());

export const deleteTask = createAction('[Kanban] Delete Task', props<{ taskId: string }>());

export const fetchPriority = createAction('[Kanban AI] Fetch Priority', props<{ taskId: string }>());
export const fetchPrioritySuccess = createAction('[Kanban AI] Fetch Priority Success', props<{ taskId: string; priority: 'High' | 'Medium' | 'Low' }>());

export const fetchPriorityFailure = createAction('[Kanban AI] Fetch Priority Failure', props<{ taskId: string; error: string }>());
