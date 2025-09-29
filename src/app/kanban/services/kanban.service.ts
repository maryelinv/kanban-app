import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';

export type Priority = 'High' | 'Medium' | 'Low';

@Injectable({ providedIn: 'root' })
export class KanbanService {
  getSuggestedPriority(_title: string): Observable<Priority> {
    const priorities: Priority[] = ['High', 'Medium', 'Low'];

    const shouldError = Math.random() < 0.15;

    if (shouldError) return throwError(() => new Error('AI service failed'));

    const latency = 500 + Math.floor(Math.random() * 400);
    const value = priorities[Math.floor(Math.random() * priorities.length)];

    return new Observable<Priority>(sub => {
      const t = setTimeout(() => { sub.next(value); sub.complete(); }, latency);
      return () => clearTimeout(t);
    });
  }
}
