import { useEffect } from "react";
import {
  differenceInDays,
  format,
  startOfMonth,
  endOfMonth,
} from "date-fns";
import { useTaskStore } from "../Store/Taskstore";
import type { Task } from "../Data/Data";

import { useliveUser } from "../Store/LiveUser";
import { Filter } from "../features/Filter";

const PRIORITY_COLORS: Record<Task["priority"], string> = {
  high: "#ef4444",
  medium: "#eab308",
  low: "#22c55e",
};

function formatDueDate(
  dueDate: Date
): {
  label: string;
  isOverdue: boolean;
  daysOverdue?: number;
} {
  const due = new Date(dueDate);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  due.setHours(0, 0, 0, 0);

  const diffDays = differenceInDays(due, today);

  if (diffDays === 0) return { label: "Due Today", isOverdue: false };
  if (diffDays < -7)
    return {
      label: `${Math.abs(diffDays)}d overdue`,
      isOverdue: true,
      daysOverdue: Math.abs(diffDays),
    };
  if (diffDays < 0) return { label: format(due, "MMM d"), isOverdue: true };
  return { label: format(due, "MMM d"), isOverdue: false };
}

function TaskBar(props: {
  task: Task;
  monthStart: Date;
  totalDays: number;
}) {
  const { task, monthStart, totalDays } = props;

  const start = task.createdAt
    ? new Date(task.createdAt)
    : new Date(task.dueDate);
  const end = new Date(task.dueDate);

  const leftPercent =
    (differenceInDays(start, monthStart) / totalDays) * 100;
  const widthPercent = Math.max(
    ((differenceInDays(end, start) + 1) / totalDays) * 100,
    100 / totalDays
  );

  const { label, isOverdue } = formatDueDate(task.dueDate);

  return (
    <div className="relative h-8 mb-1 overflow-hidden">
      <div
        className="absolute h-7 rounded-full flex items-center px-2 text-xs text-white font-medium overflow-hidden whitespace-nowrap"
        style={{
          left: `${leftPercent}%`,
          width: `${widthPercent}%`,
          backgroundColor: PRIORITY_COLORS[task.priority],
          opacity: isOverdue ? 0.7 : 1,
        }}
        title={`${task.title} — ${label}`}
      >
        {task.title}
      </div>
    </div>
  );
}

export default function TimeLine() {
  const data = useTaskStore((state) => state.data) ?? [];
  const { status, priority } = Filter();
  const addTask = useliveUser((state) => state.addTask);
  const removeTask = useliveUser((state) => state.removeuser);

  useEffect(() => {
    const interval = setInterval(() => {
      addTask();
      addTask();
      removeTask();
    }, 7000);
    return () => clearInterval(interval);
  }, [addTask, removeTask]);

  const tasks: Task[] = data.filter((t) => {
    const matchesStatus = !status || t.status === status;
    const matchesPriority = !priority || t.priority === priority;
    return matchesStatus && matchesPriority;
  });

  const monthStart = startOfMonth(new Date());
  const monthEnd = endOfMonth(new Date());
  const totalDays = differenceInDays(monthEnd, monthStart) + 1;

  const todayOffset =
    (differenceInDays(new Date(), monthStart) / totalDays) * 100;

  const dayLabels = Array.from({ length: totalDays }, (_, i) => {
    const d = new Date(monthStart);
    d.setDate(i + 1);
    return format(d, "d");
  });

  return (
    <div className="relative w-full overflow-x-auto p-4">
      <h2 className="text-lg font-semibold mb-4">Timeline</h2>

      {/* Day header */}
      <div className="relative flex border-b border-gray-200 mb-2 pb-1">
        {dayLabels.map((label, i) => (
          <div
            key={i}
            className="flex-1 text-center text-xs text-gray-400 select-none"
          >
            {label}
          </div>
        ))}
      </div>

      {/* Task rows */}
      <div className="relative">
        {tasks.length === 0 && (
          <p className="text-sm text-gray-400 py-8 text-center">
            No tasks this month.
          </p>
        )}

        {tasks.map((task) => (
          <TaskBar
            key={task.id}
            task={task}
            monthStart={monthStart}
            totalDays={totalDays}
          />
        ))}

        {/* Today line */}
        <div
          className="absolute top-0 bottom-0 w-0.5 bg-red-500 z-10 pointer-events-none"
          style={{ left: `${todayOffset}%` }}
        />
      </div>
    </div>
  );
}
