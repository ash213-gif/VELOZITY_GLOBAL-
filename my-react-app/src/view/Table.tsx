import { useEffect } from "react";
import { useliveUser } from "../Store/LiveUser";
import { Filter } from "../features/Filter";
import type { Task, Status } from "../Data/Data";

export default function Table() {
  const data = useliveUser((state) => state.data);
  const updateStatus = useliveUser((state) => state.updateStatus);
  const addTask = useliveUser((state) => state.addTask);
  const removeTask = useliveUser((state) => state.removeuser);

  const { status, priority } = Filter();

  // Apply same filter as Kanban
  const filteredData: Task[] = data.filter((t) => {
    const matchesStatus = !status || t.status === status;
    const matchesPriority = !priority || t.priority === priority;
    return matchesStatus && matchesPriority;
  });

  useEffect(() => {
    const interval = setInterval(() => {
      addTask();
      addTask();
      removeTask();
    }, 9000);
    return () => clearInterval(interval);
  }, [addTask, removeTask]);

  return (
    <div className="w-full p-2 bg-gradient-to-br from-slate-50 to-blue-50 min-h-screen">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-2">
            Task Dashboard
          </h2>
          <p className="text-gray-600">Track your team's progress</p>
        </div>

        {/* Responsive Table Container with Scroll */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden max-h-[90vh]">
          <div className="overflow-x-auto max-h-[80vh] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100 hover:scrollbar-thumb-gray-400">
            <table className="w-full min-w-[800px]">
              {/* Header */}
              <thead className="sticky top-0 bg-gradient-to-r from-indigo-600 to-purple-600 z-10">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-white uppercase tracking-wider">
                    User
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-white uppercase tracking-wider">
                    Title
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-white uppercase tracking-wider">
                    Priority
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-white uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-white uppercase tracking-wider">
                    Due Date
                  </th>
                </tr>
              </thead>

              {/* Body */}
              <tbody className="divide-y divide-gray-200">
                {filteredData.map((task, index) => (
                  <tr
                    key={task.id}
                    className="hover:bg-gray-50 transition-all duration-200 border-b border-gray-100 last:border-b-0"
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-400 to-indigo-500 flex items-center justify-center text-white font-semibold text-sm mr-3">
                          {task.user.charAt(0).toUpperCase()}
                        </div>
                        <span className="text-sm font-medium text-gray-900">
                          {task.user}
                        </span>
                      </div>
                    </td>

                    <td className="px-6 py-4">
                      <div className="text-sm font-medium text-gray-900 max-w-md truncate">
                        {task.title}
                      </div>
                    </td>

                    {/* Priority Badge */}
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`inline-flex px-2.5 py-1 rounded-full text-xs font-semibold ${
                          task.priority === "high"
                            ? "bg-red-100 text-red-800"
                            : task.priority === "medium"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-green-100 text-green-800"
                        }`}
                      >
                        {task.priority.toUpperCase()}
                      </span>
                    </td>

                    {/* Status select */}
                    <td className="px-6 py-4 whitespace-nowrap">
                      <select
                        value={task.status}
                        onChange={(e) =>
                          updateStatus(index, e.target.value as Status)
                        }
                        className="inline-flex px-2.5 py-1 rounded-full text-xs font-semibold border-none focus:ring-2 focus:ring-indigo-500 cursor-pointer bg-gray-100 text-gray-800 ring-1 ring-inset ring-gray-200"
                      >
                        {/* values must match Status union exactly */}
                        <option value="todo">⏳ Pending</option>
                        <option value="onprogress">⏳ In Progress</option>
                        <option value="done">✅ Done</option>
                        <option value="inreview">🔍 In Review</option>
                      </select>
                    </td>

                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      <div
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          new Date(task.dueDate) < new Date()
                            ? "bg-red-100 text-red-800"
                            : new Date(task.dueDate) <=
                              new Date(Date.now() + 3 * 24 * 60 * 60 * 1000)
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-green-100 text-green-800"
                        }`}
                      >
                        {new Date(task.dueDate).toLocaleDateString()}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-200">
            <div className="text-2xl font-bold text-indigo-600">
              {data.filter((t) => t.status === "done").length}
            </div>
            <div className="text-gray-600">Completed</div>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-200">
            <div className="text-2xl font-bold text-yellow-600">
              {data.filter((t) => t.status === "onprogress").length}
            </div>
            <div className="text-gray-600">In Progress</div>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-200">
            <div className="text-2xl font-bold text-gray-600">
              {data.filter((t) => t.status === "inreview").length}
            </div>
            <div className="text-gray-600">In Review</div>
          </div>
        </div>
      </div>
    </div>
  );
}
