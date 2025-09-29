# Mini-Kanban (Trello-style) App

This project consists of a **standalone Angular + NgRx** implementation of a
mini-Kanban board used for the coding assessment.

## 🏗️ Architecture Decisions

### Standalone Components
* The project was created with the **Angular CLI standalone** option.
* `BoardComponent` and `TaskCardComponent` are declared with
  `standalone: true` and imported directly in the router.
* Routing uses `provideRouter` and lazy `loadComponent`.

### State Management
* Global state is managed with **NgRx** using the modern provider API:
  ```ts
  provideStore(),
  provideState(KANBAN_FEATURE_KEY, kanbanReducer),
  provideEffects([KanbanEffects])

* Store slice: `KanbanState` keeps a flat array of `Task` objects.
* Effects handle:

  * Generating a unique ID on `addTask`.
  * Triggering the mock AI priority call.
  * Dispatching success/failure actions.

### UI & Interactions

* **Angular CDK DragDrop** provides Trello-style card movement.
* Tasks can be added, renamed (inline edit), dragged across columns,
  or deleted.
* Each card shows a loading spinner until the AI priority arrives or an
  error badge if it fails.

---

## 🤖 AI-Assisted Sections

I used AI tools (ChatGPT) to accelerate repetitive boilerplate while
retaining control of the design:

| Area                      | How AI Helped                                                                          | My Refinement                                                                                                                        |
| ------------------------- | -------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------ |
| **NgRx Boilerplate**      | Generated initial actions, reducer, selectors, and effect templates.                   | Reviewed naming, ensured strict typing, added unit tests, and refactored to `inject()` to avoid constructor timing issues.           |
| **CDK DragDrop**          | Provided example drop-list markup and `CdkDragDrop` handler.                           | Adjusted for strict null checks, added `[cdkDropListConnectedTo]` and null-coalescing (`?? []`) to satisfy Angular strict templates. |
| **Standalone Conversion** | Suggested provider syntax (`provideStore`, `provideEffects`) and lazy `loadComponent`. | Verified runtime wiring and updated `app.config.ts` to match CLI output.                                                                   |

### Example Prompts Used

* “Generate NgRx actions/reducer/selectors for a Task[] state in Angular.”
* “Angular CDK drag drop between 3 columns with NgRx update.”
* “Convert an NgRx module setup to standalone provideStore/provideEffects.”

---

## ✅ Validation & Testing

### Manual Testing

* Added, edited, dragged, and deleted tasks in all columns.
* Verified spinner → priority badge → error badge flows.
* Checked that state persists correctly across actions.

### Unit Tests

* `reducer.spec.ts` – confirms tasks are added and priority updates
  toggle the loading flag correctly.
* `selectors.spec.ts` – validates `selectTasksByStatus` filtering.

Both tests pass with `ng test`.

---

## 🗂️ Submission Notes

* Feature lives entirely under **`src/app/kanban/`**.
* Integrates into a standalone Angular app via
  `main.ts` NgRx providers and a lazy route in `app.routes.ts`.

