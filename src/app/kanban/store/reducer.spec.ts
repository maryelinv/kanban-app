import { kanbanReducer } from './reducer';
import * as A from './actions';
import { initialState, Task } from './state';

describe('kanbanReducer', () => {
  it('adds task', () => {
    const task: Task = { id: 't1', title: 'Test', status: 'todo', loadingPriority: true };
    const state = kanbanReducer(initialState, A.addTaskConfirmed({ task }));
    expect(state.tasks.length).toBe(1);
    expect(state.tasks[0].title).toBe('Test');
  });

  it('sets priority on success', () => {
    const start = kanbanReducer(initialState, A.addTaskConfirmed({
      task: { id: 't2', title: 'X', status: 'todo', loadingPriority: true }
    }));
    const next = kanbanReducer(start, A.fetchPrioritySuccess({ taskId: 't2', priority: 'High' }));
    expect(next.tasks[0].priority).toBe('High');
    expect(next.tasks[0].loadingPriority).toBeFalse();
  });
});
