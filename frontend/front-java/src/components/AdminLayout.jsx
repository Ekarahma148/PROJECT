import { Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  ClipboardList,
  LogOut,
  Shield,
} from "lucide-react";

function AdminLayout({ children }) {
  const location = useLocation();

  const username =
    localStorage.getItem("username");

  const logout = () => {
    localStorage.clear();
    window.location.href = "/admin/login";
  };

  const menuClass = (path) =>
    `flex items-center gap-3 px-4 py-3 rounded-lg transition ${
      location.pathname === path
        ? "bg-indigo-600 text-white"
        : "text-slate-300 hover:bg-slate-800 hover:text-white"
    }`;

  return (
    <div className="flex min-h-screen bg-slate-100">

      {/* Sidebar */}
      <aside className="w-64 bg-slate-900 text-white flex flex-col">

        {/* Logo */}
        <div className="p-6 border-b border-slate-800">

          <div className="flex items-center gap-3">

            <div className="bg-indigo-600 p-2 rounded-lg">
              <Shield size={22} />
            </div>

            <div>
              <h1 className="font-bold text-lg">
                Admin Panel
              </h1>

              <p className="text-xs text-slate-400">
                Task Management
              </p>
            </div>

          </div>

        </div>

        {/* User */}
        <div className="p-6 border-b border-slate-800">

          <p className="text-slate-400 text-xs">
            LOGIN SEBAGAI
          </p>

          <p className="font-semibold mt-1">
            {username}
          </p>

        </div>

        {/* Menu */}
        <nav className="flex-1 p-4 space-y-2">

          <Link
            to="/admin/dashboard"
            className={menuClass("/admin/dashboard")}
          >
            <LayoutDashboard size={18} />
            Dashboard
          </Link>

          <Link
            to="/admin/users"
            className={menuClass("/admin/users")}
          >
            <Users size={18} />
            User Management
          </Link>

          <Link
            to="/admin/tasks"
            className={menuClass("/admin/tasks")}
          >
            <ClipboardList size={18} />
            Task Monitoring
          </Link>

        </nav>

        {/* Logout */}
        <div className="p-4 border-t border-slate-800">

          <button
            onClick={logout}
            className="flex items-center gap-3 w-full px-4 py-3 rounded-lg text-red-400 hover:bg-red-500 hover:text-white transition"
          >
            <LogOut size={18} />
            Logout
          </button>

        </div>

      </aside>

      {/* Content */}
      <main className="flex-1 overflow-y-auto">
        <div>
          {children}
        </div>

      </main>

    </div>
  );
}

export default AdminLayout;