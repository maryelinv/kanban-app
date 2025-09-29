import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as A from './actions';
import { KanbanService } from '../services/kanban.service';
import { catchError, concatMap, map, of } from 'rxjs';

function generateId(): string {
  return 't_' + Date.now().toString(36) + Math.random().toString(36).slice(2, 7);
}

@Injectable()
export class KanbanEffects {

  private readonly actions$ = inject(Actions);
  private readonly service = inject(KanbanService);

  addTask$ = createEffect(() =>
    this.actions$.pipe(
      ofType(A.addTask),
      map(({ title }) =>
        A.addTaskConfirmed({
          task: { id: generateId(), title, status: 'todo', loadingPriority: true },
        })
      )
    )
  );

  addTaskThenFetch$ = createEffect(() =>
    this.actions$.pipe(
      ofType(A.addTaskConfirmed),
      map(({ task }) => A.fetchPriority({ taskId: task.id }))
    )
  );

  fetchPriority$ = createEffect(() =>
    this.actions$.pipe(
      ofType(A.fetchPriority),
      concatMap(({ taskId }) =>
        this.service.getSuggestedPriority('').pipe(
          map((priority) => A.fetchPrioritySuccess({ taskId, priority })),
          catchError((err) =>
            of(A.fetchPriorityFailure({ taskId, error: err?.message ?? 'Unknown error' }))
          )
        )
      )
    )
  );
}
