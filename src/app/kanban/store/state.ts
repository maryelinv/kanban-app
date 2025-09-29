export interface Task {
  id: string;
  title: string;
  status: 'todo' | 'in-progress' | 'done';
  priority?: 'High' | 'Medium' | 'Low';
  loadingPriority: boolean;
  errorPriority?: string;
}

export interface KanbanState {
  tasks: Task[];
}

export const initialState: KanbanState = { tasks: [] };
