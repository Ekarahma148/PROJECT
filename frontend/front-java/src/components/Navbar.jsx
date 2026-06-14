import {
  LayoutDashboard,
  ClipboardList,
  User,
  LogOut,
} from "lucide-react";

import { Link } from "react-router-dom";

function Navbar() {
  return (
    <aside className="w-64 bg-slate-900 text-white min-h-screen">

      <div className="p-6 border-b border-slate-700">

        <h1 className="text-2xl font-bold">
          Task Manager
        </h1>

      </div>

      <nav className="p-4">

        <Link
          to="/dashboard"
          className="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-800"
        >
          <LayoutDashboard size={20} />
          Dashboard
        </Link>

        <Link
          to="/tasks"
          className="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-800"
        >
          <ClipboardList size={20} />
          My Tasks
        </Link>

        <Link
          to="/profile"
          className="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-800"
        >
          <User size={20} />
          Profile
        </Link>

        <button
          className="w-full mt-5 flex items-center gap-3 p-3 rounded-lg hover:bg-red-600"
        >
          <LogOut size={20} />
          Logout
        </button>

      </nav>

    </aside>
  );
}

export default Navbar;