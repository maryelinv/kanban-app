import { selectTasksByStatus } from './selectors';
import { KanbanState } from './state';

describe('selectors', () => {
  const state: KanbanState = {
    tasks: [
      { id: '1', title: 'A', status: 'todo', loadingPriority: false },
      { id: '2', title: 'B', status: 'in-progress', loadingPriority: false },
      { id: '3', title: 'C', status: 'done', loadingPriority: false },
      { id: '4', title: 'D', status: 'todo', loadingPriority: false },
    ]
  };

  it('filters by status', () => {
    const sel = selectTasksByStatus('todo');
    const result = sel.projector(state.tasks);
    expect(result.map(t => t.id)).toEqual(['1', '4']);
  });
});
