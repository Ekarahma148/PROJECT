import {
  ClipboardList,
  CheckCircle,
  Clock,
  AlertTriangle,
  Plus,
  ArrowRight,
  Calendar,
} from "lucide-react";
import MainLayout from "../components/MainLayout";
import { useEffect, useState } from "react";
import { getAllTask } from "../services/taskService";
function Dashboard() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const response = await getAllTask();

      const allTasks = response.data.data;

      const userId = Number(localStorage.getItem("userId"));

      const filteredTasks = allTasks.filter(
        (task) => task.userIdRes === userId,
      );

      setTasks(filteredTasks);
    } catch (error) {
      console.log(error);
    }
  };
  const now = new Date();

  const summary = {
    total: tasks.length,

    completed: tasks.filter((t) => t.statusRes === "COMPLETED").length,

    pending: tasks.filter(
      (t) => t.statusRes === "PENDING" || t.statusRes === "IN_PROGRESS",
    ).length,

    overdue: tasks.filter(
      (t) => new Date(t.deadlineRes) < now && t.statusRes !== "COMPLETED",
    ).length,
  };

  const recentTasks = [...tasks]
    .sort((a, b) => new Date(a.deadlineRes) - new Date(b.deadlineRes))
    .slice(0, 5);
  const username = localStorage.getItem("username") || "eka3";

  // Hitung persentase penyelesaian untuk progress bar
  const completionRate =
    summary.total > 0
      ? Math.round((summary.completed / summary.total) * 100)
      : 0;

  return (
    <MainLayout>
      <div className="min-h-screen bg-slate-50 text-slate-800">
        {/* Header Section */}
        <div className="bg-white border-b border-slate-200">
          <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
                Dashboard
              </h1>
              <p className="text-slate-500 text-sm mt-1">
                Pantau perkembangan tugas dan tenggat waktu Anda secara
                real-time.
              </p>
            </div>
            {/* Quick Action Button */}
            <button className="inline-flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-medium px-4 py-2.5 rounded-xl shadow-sm shadow-indigo-100 transition-all text-sm active:scale-95 self-start sm:self-center">
              <Plus size={18} />
              Tambah Tugas
            </button>
          </div>
        </div>

        {/* Content Section */}
        <div className="max-w-7xl mx-auto p-6 space-y-8">
          {/* Welcome Card */}
          <div className="bg-gradient-to-r from-indigo-900 to-slate-900 rounded-2xl shadow-md p-6 text-white border border-indigo-950/20 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div className="max-w-2xl">
              <h2 className="text-xl font-bold tracking-wide">
                Halo, {username}!
              </h2>
              <p className="text-indigo-200 text-sm mt-2 leading-relaxed">
                Selamat datang kembali di{" "}
                <span className="font-semibold text-white">
                  Task Management & Reminder System
                </span>
                . Mari selesaikan agenda Anda hari ini dan tingkatkan
                produktivitas!
              </p>
            </div>
            {/* Mini Progress Tracker di Welcome Card */}
            <div className="bg-white/10 p-4 rounded-xl backdrop-blur-sm min-w-[200px]">
              <div className="flex justify-between text-xs font-semibold text-indigo-200 mb-1">
                <span>Task Selesai</span>
                <span>{completionRate}%</span>
              </div>
              <div className="w-full bg-white/20 h-2 rounded-full overflow-hidden">
                <div
                  className="bg-emerald-400 h-full transition-all duration-500"
                  style={{ width: `${completionRate}%` }}
                ></div>
              </div>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Total Task */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 flex items-center justify-between hover:shadow-md transition-shadow duration-200">
              <div>
                <p className="text-sm font-medium text-slate-400 uppercase tracking-wider">
                  Total Task
                </p>
                <h3 className="text-3xl font-bold text-slate-800 mt-1">
                  {summary.total}
                </h3>
              </div>
              <div className="p-3 rounded-xl bg-indigo-50 text-indigo-600">
                <ClipboardList size={28} />
              </div>
            </div>

            {/* Completed */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 flex items-center justify-between hover:shadow-md transition-shadow duration-200">
              <div>
                <p className="text-sm font-medium text-slate-400 uppercase tracking-wider">
                  Completed
                </p>
                <h3 className="text-3xl font-bold text-slate-800 mt-1">
                  {summary.completed}
                </h3>
              </div>
              <div className="p-3 rounded-xl bg-emerald-50 text-emerald-600">
                <CheckCircle size={28} />
              </div>
            </div>

            {/* Pending */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 flex items-center justify-between hover:shadow-md transition-shadow duration-200">
              <div>
                <p className="text-sm font-medium text-slate-400 uppercase tracking-wider">
                  Pending
                </p>
                <h3 className="text-3xl font-bold text-slate-800 mt-1">
                  {summary.pending}
                </h3>
              </div>
              <div className="p-3 rounded-xl bg-amber-50 text-amber-600">
                <Clock size={28} />
              </div>
            </div>

            {/* Overdue */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 flex items-center justify-between hover:shadow-md transition-shadow duration-200">
              <div>
                <p className="text-sm font-medium text-slate-400 uppercase tracking-wider">
                  Overdue
                </p>
                <h3 className="text-3xl font-bold text-slate-800 mt-1">
                  {summary.overdue}
                </h3>
              </div>
              <div className="p-3 rounded-xl bg-rose-50 text-rose-600">
                <AlertTriangle size={28} />
              </div>
            </div>
          </div>

          {/* New Section: Recent Tasks & Activity */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Recent Tasks List */}
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 lg:col-span-2 space-y-4">
              <div className="flex justify-between items-center mb-2">
                <div>
                  <h3 className="text-lg font-bold text-slate-900">
                    Tugas Penting Terbaru
                  </h3>
                  <p className="text-slate-400 text-xs">
                    Daftar agenda terdekat yang perlu Anda perhatikan.
                  </p>
                </div>
                <button className="text-sm font-semibold text-indigo-600 hover:text-indigo-700 flex items-center gap-1 transition-colors">
                  Lihat Semua <ArrowRight size={16} />
                </button>
              </div>

              <div className="divide-y divide-slate-100">
                {recentTasks.map((task) => {
                  const isOverdue =
                    new Date(task.deadlineRes) < new Date() &&
                    task.statusRes !== "COMPLETED";

                  return (
                    <div
                      key={task.idRes}
                      className="py-4 flex items-center justify-between gap-4 first:pt-0 last:pb-0"
                    >
                      <div className="space-y-1">
                        <p className="font-semibold text-slate-800 text-sm sm:text-base">
                          {task.titleRes}
                        </p>

                        <div className="flex items-center gap-4 text-xs text-slate-400">
                          <span className="flex items-center gap-1">
                            <Calendar size={12} />
                            {new Date(task.deadlineRes).toLocaleString("id-ID")}
                          </span>

                          <span
                            className={`px-2 py-0.5 rounded-md font-medium text-[10px]
            ${
              task.priorityRes === "HIGH"
                ? "bg-rose-50 text-rose-600"
                : task.priorityRes === "MEDIUM"
                  ? "bg-amber-50 text-amber-600"
                  : "bg-emerald-50 text-emerald-600"
            }`}
                          >
                            {task.priorityRes}
                          </span>
                        </div>
                      </div>

                      <div>
                        {task.statusRes === "COMPLETED" && (
                          <span className="bg-emerald-50 text-emerald-700 text-xs font-semibold px-3 py-1 rounded-full border border-emerald-100">
                            Selesai
                          </span>
                        )}

                        {task.statusRes === "PENDING" && (
                          <span className="bg-amber-50 text-amber-700 text-xs font-semibold px-3 py-1 rounded-full border border-amber-100">
                            Pending
                          </span>
                        )}

                        {task.statusRes === "IN_PROGRESS" && (
                          <span className="bg-blue-50 text-blue-700 text-xs font-semibold px-3 py-1 rounded-full border border-blue-100">
                            Progress
                          </span>
                        )}

                        {isOverdue && (
                          <span className="bg-rose-50 text-rose-700 text-xs font-semibold px-3 py-1 rounded-full border border-rose-100">
                            Terlambat
                          </span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Productivity Tips / Mini Summary */}
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 flex flex-col justify-between space-y-6">
              <div className="space-y-2">
                <h3 className="text-lg font-bold text-slate-900">
                  Tips Produktivitas{" "}
                </h3>
                <p className="text-slate-500 text-sm leading-relaxed">
                  Selesaikan tugas yang memiliki status{" "}
                  <span className="text-rose-600 font-semibold">Overdue</span>{" "}
                  terlebih dahulu untuk menghindari penumpukan beban kerja di
                  akhir pekan.
                </p>
              </div>
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-100 text-center">
                <p className="text-xs text-slate-400 font-medium uppercase tracking-wider">
                  Fokus Hari Ini
                </p>
                <p className="text-xl font-extrabold text-indigo-950 mt-1">
                  Selesaikan 2 Tugas
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}

export default Dashboard;
