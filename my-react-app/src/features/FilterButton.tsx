import { Filter } from "./Filter";

export const FilterButtons = () => {
  const { status, priority, setStatus, setPriority } = Filter();

  const isActiveStatus = (value) => status === value;
  const isActivePriority = (value) => priority === value;

  return (
    <div className="bg-white border-b border-gray-200 px-4 py-3">
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <span className="font-semibold text-sm uppercase tracking-wider text-gray-600">
          VELOZITY GLOBAL SOLUTIONS
        </span>
      </div>

      {/* Status filters */}
      <div className="flex flex-wrap items-center gap-1.5 mb-3">
        <span className="text-xs text-gray-500 font-medium mr-2 whitespace-nowrap">
          By Status:
        </span>

        <button
          onClick={() => setStatus("done")}
          className={`text-xs px-3 py-1.5 rounded-full border transition-all
            ${isActiveStatus("done")
              ? "bg-green-100 border-green-300 text-green-800"
              : "bg-gray-50 border-gray-200 text-gray-600 hover:bg-gray-100"}`}
        >
          Done
        </button>

        <button
          onClick={() => setStatus("onprogress")}
          className={`text-xs px-3 py-1.5 rounded-full border transition-all
            ${isActiveStatus("onprogress")
              ? "bg-blue-100 border-blue-300 text-blue-800"
              : "bg-gray-50 border-gray-200 text-gray-600 hover:bg-gray-100"}`}
        >
          In Progress
        </button>

        <button
          onClick={() => setStatus("inreview")}
          className={`text-xs px-3 py-1.5 rounded-full border transition-all
            ${isActiveStatus("inreview")
              ? "bg-yellow-100 border-yellow-300 text-yellow-800"
              : "bg-gray-50 border-gray-200 text-gray-600 hover:bg-gray-100"}`}
        >
          In Review
        </button>

        <button
          onClick={() => setStatus("todo")}
          className={`text-xs px-3 py-1.5 rounded-full border transition-all
            ${isActiveStatus("todo")
              ? "bg-purple-100 border-purple-300 text-purple-800"
              : "bg-gray-50 border-gray-200 text-gray-600 hover:bg-gray-100"}`}
        >
          To Do
        </button>

        {/* <button
          onClick={() => {
            setStatus(null);      // remove ?status
            setPriority(null);    // remove ?priority
          }}
          className="text-xs px-3 py-1.5 rounded-full border border-gray-300 text-gray-600 hover:bg-gray-100 hover:border-gray-400 transition-all"
        >
          Clear
        </button> */}
      </div>

      {/* Priority filters */}
      <div className="flex flex-wrap items-center gap-1.5">
        <span className="text-xs font-medium text-gray-500 mr-2">By Priority:</span>

        <button
          onClick={() => setPriority("low")}
          className={`text-xs px-3 py-1.5 rounded-full border transition-all
            ${isActivePriority("low")
              ? "bg-green-100 border-green-300 text-green-800"
              : "bg-gray-50 border-gray-200 text-gray-600 hover:bg-gray-100"}`}
        >
          Low
        </button>
        <button
          onClick={() => setPriority("medium")}
          className={`text-xs px-3 py-1.5 rounded-full border transition-all
            ${isActivePriority("medium")
              ? "bg-yellow-100 border-yellow-300 text-yellow-800"
              : "bg-gray-50 border-gray-200 text-gray-600 hover:bg-gray-100"}`}
        >
          Medium
        </button>
        <button
          onClick={() => setPriority("high")}
          className={`text-xs px-3 py-1.5 rounded-full border transition-all
            ${isActivePriority("high")
              ? "bg-red-100 border-red-300 text-red-800"
              : "bg-gray-50 border-gray-200 text-gray-600 hover:bg-gray-100"}`}
        >
          High
        </button>
        
      </div>
    </div>
  );
};
