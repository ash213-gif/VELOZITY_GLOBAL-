import { useTaskStore } from "../Store/Taskstore";
import { Filter } from "../features/Filter";
import { useState } from "react";

type ColumnId = "inreview" | "onprogress" | "todo" | "done";

export default function Kanban() {
  const data = useTaskStore((state) => state.data);
  const updateTaskStatusById = useTaskStore(
    (state) => state.updateTaskStatusById
  );
  const { status, priority } = Filter();

  const [draggingId, setDraggingId] = useState<string | null>(null);

  const filteredData = data.filter((t) => {
    const matchesStatus = !status || t.status === status;
    const matchesPriority = !priority || t.priority === priority;
    return matchesStatus && matchesPriority;
  });

  const getColumnTasks = (status: ColumnId) =>
    filteredData.filter((t) => t.status === status);

  // Card drag start
  const handleDragStart = (id: string) => {
    setDraggingId(id);
  };

  // Allow drop
  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  // Drop on column
  const handleDrop = (col: ColumnId) => {
    if (!draggingId) return;
    updateTaskStatusById(draggingId, col);
    setDraggingId(null);
  };

  const renderCard = (task, extraClasses = "") => (
    <div
      key={task.id}
      draggable
      onDragStart={() => handleDragStart(task.id)}
      className={
        "bg-white p-4 rounded-lg shadow-sm border min-h-[80px] flex flex-col justify-between cursor-move transition-shadow hover:shadow-md " +
        extraClasses
      }
    >
      <h3 className="font-semibold text-gray-800 line-clamp-2">
        {task.title}
      </h3>
      <div className="flex justify-between items-center mt-2 pt-1 border-t border-gray-100">
        <span className="text-xs font-medium px-2 py-1 bg-gray-100 rounded text-gray-600">
          {task.user}
        </span>
        <span
          className={`text-xs font-bold px-2 py-1 rounded ${
            task.priority === "high"
              ? "bg-red-100 text-red-600"
              : task.priority === "medium"
              ? "bg-yellow-100 text-yellow-800"
              : "bg-blue-100 text-blue-600"
          }`}
        >
          {task.priority}
        </span>
      </div>
    </div>
  );

  return (
    <div className="p-2 w-full bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-8 text-gray-800">Kanban Board</h1>

      <div className="flex overflow-x-auto max-w-full pb-4 gap-4 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
        {/* In Review */}
        <div
          className="bg-gray-100 p-4 rounded-xl shadow-sm min-w-[320px] max-w-[320px] max-h-[110vh] flex-shrink-0"
          onDragOver={handleDragOver}
          onDrop={() => handleDrop("inreview")}
        >
          <h2 className="font-bold text-md mb-4 text-gray-700 flex justify-between items-center sticky top-0 bg-gray-100 z-20 pb-2">
            In Review
            <span className="bg-gray-200 text-gray-600 px-3 py-1 rounded-full text-xs">
              {getColumnTasks("inreview").length}
            </span>
          </h2>
          <div className="max-h-[calc(100vh-120px)] overflow-y-auto scrollbar-thin scrollbar-track-gray-100 hover:scrollbar-thumb-gray-300">
            <div className="space-y-3">
              {getColumnTasks("inreview").map((task) => renderCard(task))}
            </div>
          </div>
        </div>

        {/* In Progress */}
        <div
          className="bg-blue-50 p-4 rounded-xl shadow-sm min-w-[320px] max-w-[320px] max-h-[110vh] flex-shrink-0"
          onDragOver={handleDragOver}
          onDrop={() => handleDrop("onprogress")}
        >
          <h2 className="font-bold text-lg mb-4 text-blue-800 flex justify-between items-center sticky top-0 bg-blue-50 z-20 pb-2">
            In Progress
            <span className="bg-blue-100 text-blue-600 px-2 py-1 rounded-full text-xs">
              {getColumnTasks("onprogress").length}
            </span>
          </h2>
          <div className="max-h-[calc(100vh-120px)] overflow-y-auto scrollbar-thin scrollbar-thumb-blue-400 scrollbar-track-blue-100 hover:scrollbar-thumb-blue-500">
            <div className="space-y-3">
              {getColumnTasks("onprogress").map((task) => renderCard(task))}
            </div>
          </div>
        </div>

        {/* To Do */}
        <div
          className="bg-red-50 p-4 rounded-xl shadow-sm min-w-[320px] max-w-[320px] max-h-[110vh] flex-shrink-0"
          onDragOver={handleDragOver}
          onDrop={() => handleDrop("todo")}
        >
          <h2 className="font-bold text-lg mb-4 text-red-800 flex justify-between items-center sticky top-0 bg-red-50 z-20 pb-2">
            To Do
            <span className="bg-green-100 text-green-600 px-2 py-1 rounded-full text-xs">
              {getColumnTasks("todo").length}
            </span>
          </h2>
          <div className="max-h-[calc(100vh-120px)] overflow-y-auto scrollbar-thin scrollbar-thumb-blue-400 scrollbar-track-blue-100 hover:scrollbar-thumb-blue-500">
            <div className="space-y-3">
              {getColumnTasks("todo").map((task) => renderCard(task))}
            </div>
          </div>
        </div>

        {/* Done */}
        <div
          className="bg-green-50 p-4 rounded-xl shadow-sm min-w-[320px] max-w-[320px] max-h-[110vh] flex-shrink-0"
          onDragOver={handleDragOver}
          onDrop={() => handleDrop("done")}
        >
          <h2 className="font-bold text-lg mb-4 text-green-800 flex justify-between items-center sticky top-0 bg-green-50 z-20 pb-2">
            Done
            <span className="bg-green-100 text-green-600 px-2 py-1 rounded-full text-xs">
              {getColumnTasks("done").length}
            </span>
          </h2>
          <div className="max-h-[calc(100vh-120px)] overflow-y-auto scrollbar-thin scrollbar-thumb-green-400 scrollbar-track-green-100 hover:scrollbar-thumb-green-500">
            <div className="space-y-3">
              {getColumnTasks("done").map((task) =>
                renderCard(task, "opacity-75 line-through")
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
