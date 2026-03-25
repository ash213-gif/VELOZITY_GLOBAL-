# Project Dashboard (Velozity Global Assessment)

A React-based Task Management Dashboard featuring Kanban, Table, and Timeline views
 

## 🧠 State Management Decision

I chose **Zustand** for state management.
*   **Justification:** It provides a lightweight, hook-based API that simplifies global state access without the boilerplate of Redux or Context providers.
*   **Implementation:** The `useliveUser` store manages the main `Task[]` array. It exposes actions like `addTask` and `updateStatus`, which allows components like `Table` and `Top` to interact with data seamlessly. This was particularly useful for the "Real-time" simulation, allowing the store to handle frequent updates without triggering unnecessary re-renders in unrelated components.



## 🖱️ Drag-and-Drop Approach

*   **Strategy:** Utilized the HTML5 Drag and Drop API for the Kanban board to maintain native accessibility and reduce bundle size.
*   **Logic:** The `onDragStart` event captures the task ID. `onDragOver` allows dropping by preventing default behavior. Finally, `onDrop` triggers a state update in the Zustand store to change the task's status or priority based on the destination column.


### Drag Placeholder & Layout Shift

Handling the drag placeholder without layout shift was critical for a polished feel. I achieved this by calculating the `offsetHeight` of the item being dragged during `onDragStart`. When hovering over a drop zone, instead of relying on the browser's default displacement, I inject a "ghost" element with that exact height and a transparent background/dashed border. This forces the surrounding items to slide out of the way smoothly, reserving space for the potential drop and preventing the column layout from collapsing or jumping abruptly.

