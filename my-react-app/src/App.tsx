import React from "react";
import Table from "./view/Table";
import Kanban from "./view/Kanban";
import TimeLine from "./view/TimeLine";
import { FilterButtons } from "./features/FilterButton";
import { Routes, Route, Link } from "react-router-dom";

export default function App() {
  return (
    <>
      <div className="flex items-center gap-1 bg-gray-50 px-3 py-2 rounded-lg border border-gray-200 shadow-sm mb-4">
  <Link
    to="/kanban"
    className="text-xs font-medium px-3 py-1.5 rounded-md transition-all
      hover:bg-gray-200 hover:text-gray-800
      text-gray-600"
  >
    Kanban
  </Link>
  <Link
    to="/table"
    className="text-xs font-medium px-3 py-1.5 rounded-md transition-all
      hover:bg-gray-200 hover:text-gray-800
      text-gray-600"
  >
    Table
  </Link>
  <Link
    to="/timeline"
    className="text-xs font-medium px-3 py-1.5 rounded-md transition-all
      hover:bg-gray-200 hover:text-gray-800
      text-gray-600"
  >
    Timeline
  </Link>
</div>

      <FilterButtons />

      <Routes>
        
        <Route path="/kanban" element={<Kanban />} />
        <Route path="/table" element={<Table />} />
        <Route path="/timeline" element={<TimeLine />} />
      </Routes>
    </>
  );
}
