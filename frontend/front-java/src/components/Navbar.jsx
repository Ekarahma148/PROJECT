import {
  LayoutDashboard,
  ClipboardList,
  User,
  LogOut,
} from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";

function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    if (confirm("Apakah Anda yakin ingin keluar?")) {
      localStorage.clear();
      window.location.href = "/login";
    }
  };

  // Fungsi pembantu untuk mengatur styling menu yang aktif secara dinamis
  const getMenuClass = (path) => {
    const basePath = "flex items-center gap-3.5 px-4 py-3 rounded-xl font-medium text-sm transition-all duration-200 group";
    const isActive = location.pathname === path;
    
    return isActive
      ? `${basePath} bg-indigo-600 text-white shadow-lg shadow-indigo-600/20`
      : `${basePath} text-slate-400 hover:bg-slate-800/60 hover:text-white`;
  };

  return (
    <aside className="w-66 bg-slate-950 text-white min-h-screen flex flex-col justify-between border-r border-slate-900/50">
      
      {/* Bagian Atas: Logo & Navigasi */}
      <div>
        {/* Header / Brand */}
        <div className="p-6 border-b border-slate-900 flex items-center gap-3">
          <div className="h-9 w-9 bg-gradient-to-tr from-indigo-600 to-violet-500 rounded-xl flex items-center justify-center shadow-md shadow-indigo-500/20">
            <ClipboardList size={20} className="text-white" />
          </div>
          <h1 className="text-xl font-bold tracking-wide bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent">
            Task Manager
          </h1>
        </div>

        {/* Menu Navigasi */}
        <nav className="p-4 space-y-2">
          <Link to="/dashboard" className={getMenuClass("/dashboard")}>
            <LayoutDashboard size={18} className="group-hover:scale-110 transition-transform" />
            <span>Dashboard</span>
          </Link>

          <Link to="/tasks" className={getMenuClass("/tasks")}>
            <ClipboardList size={18} className="group-hover:scale-110 transition-transform" />
            <span>My Tasks</span>
          </Link>

          <Link to="/profile" className={getMenuClass("/profile")}>
            <User size={18} className="group-hover:scale-110 transition-transform" />
            <span>Profile</span>
          </Link>
        </nav>
      </div>

      {/* Bagian Bawah: Tombol Logout */}
      <div className="p-4 border-t border-slate-900">
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3.5 px-4 py-3 rounded-xl font-medium text-sm text-rose-400 hover:bg-rose-500/10 hover:text-rose-300 transition-all duration-200 group"
        >
          <LogOut size={18} className="group-hover:translate-x-0.5 transition-transform" />
          <span>Logout</span>
        </button>
      </div>

    </aside>
  );
}

export default Navbar;