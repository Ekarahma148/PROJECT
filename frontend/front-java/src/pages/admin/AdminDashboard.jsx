import {
  ClipboardList,
  Users,
  CheckCircle,
  Clock,
  AlertTriangle,
  Loader2,
  TrendingUp,
  Calendar,
} from "lucide-react";
import { useEffect, useState } from "react";
import { getAllTask } from "../../services/taskService";
import { getAllUser } from "../../services/userService";
import AdminLayout from "../../components/AdminLayout";

function AdminDashboard() {
  const [summary, setSummary] = useState({
    totalUser: 0,
    totalTask: 0,
    completed: 0,
    pending: 0,
    overdue: 0,
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadDashboard();
  }, []);

  const loadDashboard = async () => {
    try {
      setIsLoading(true);
      const userResponse = await getAllUser();
      const taskResponse = await getAllTask();

      const users = userResponse.data.data || [];
      const tasks = taskResponse.data.data || [];
      const now = new Date();

      setSummary({
        totalUser: users.length,
        totalTask: tasks.length,
        completed: tasks.filter((t) => t.statusRes === "COMPLETED"|| t.statusRes === "FINISH").length,
        pending: tasks.filter(
          (t) => t.statusRes === "PENDING" || t.statusRes === "IN_PROGRESS",
        ).length,
        overdue: tasks.filter(
          (t) => new Date(t.deadlineRes) < now && t.statusRes !== "COMPLETED" && t.statusRes !== "FINISH",
        ).length,
      });
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const formattedDate = new Date().toLocaleDateString("id-ID", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  if (isLoading) {
    return (
      <AdminLayout>
        <div className="min-h-screen flex flex-col items-center justify-center gap-3 bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-950 text-slate-400">
          <Loader2 className="animate-spin text-indigo-400" size={40} />
          <p className="text-sm font-semibold tracking-wider animate-pulse text-indigo-300">
            Memuat ringkasan data...
          </p>
        </div>
      </AdminLayout>
    );
  }

  const statCards = [
    {
      title: "Total User",
      value: summary.totalUser,
      icon: Users,
      colorClass: "text-indigo-400 bg-indigo-500/10 border-indigo-500/30",
      desc: "Pengguna terdaftar",
    },
    {
      title: "Total Task",
      value: summary.totalTask,
      icon: ClipboardList,
      colorClass: "text-sky-400 bg-sky-500/10 border-sky-500/30",
      desc: "Akumulasi tugas",
    },
    {
      title: "Completed",
      value: summary.completed,
      icon: CheckCircle,
      colorClass: "text-emerald-400 bg-emerald-500/10 border-emerald-500/30",
      desc: "Selesai tepat waktu",
    },
    {
      title: "Pending",
      value: summary.pending,
      icon: Clock,
      colorClass: "text-amber-400 bg-amber-500/10 border-amber-500/30",
      desc: "Dalam pengerjaan",
    },
    {
      title: "Overdue",
      value: summary.overdue,
      icon: AlertTriangle,
      colorClass: `text-rose-400 bg-rose-500/10 border-rose-500/30 ${summary.overdue > 0 ? "animate-pulse" : ""}`,
      desc: "Melewati tenggat",
    },
  ];
  const completionRate =
    summary.totalTask > 0
      ? Math.round((summary.completed / summary.totalTask) * 100)
      : 0;

  const overdueRate =
    summary.totalTask > 0
      ? Math.round((summary.overdue / summary.totalTask) * 100)
      : 0;
  return (
    <AdminLayout>
      <div className="p-4 sm:p-6 lg:p-8 space-y-8 bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-950 min-h-screen text-slate-100">
        {/* Welcome Banner Section (Glassmorphism Tint) */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-slate-800/40 backdrop-blur-md p-6 rounded-2xl border border-slate-700/50 shadow-xl">
          <div className="space-y-1">
            <h1 className="text-2xl sm:text-3xl font-black tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">
              Admin Dashboard
            </h1>
            <p className="text-slate-400 text-sm">
              Pantau seluruh aktivitas proyek, produktivitas tim, dan status
              tugas secara terpusat.
            </p>
          </div>

          {/* Tanggal Widget */}
          <div className="flex items-center gap-2.5 px-4 py-2 bg-slate-900/60 border border-slate-700 rounded-xl text-slate-300 text-xs font-semibold self-start sm:self-center shadow-inner">
            <Calendar size={15} className="text-indigo-400" />
            <span>{formattedDate}</span>
          </div>
        </div>

        {/* Grid Container Statistik Utama */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5">
          {statCards.map((card, index) => {
            const IconComponent = card.icon;
            return (
              <div
                key={index}
                className="bg-slate-900/40 backdrop-blur-sm rounded-2xl border border-slate-800/80 p-5 shadow-lg hover:shadow-indigo-500/5 transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between group"
              >
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                      {card.title}
                    </p>
                    <p className="text-3xl font-black text-slate-100 tracking-tight transition-transform duration-300 group-hover:scale-105 origin-left">
                      {card.value}
                    </p>
                  </div>

                  {/* Wrapper Icon Berwarna */}
                  <div
                    className={`p-3 rounded-xl border ${card.colorClass} shadow-sm transition-transform duration-300 group-hover:rotate-6`}
                  >
                    <IconComponent size={24} strokeWidth={2.5} />
                  </div>
                </div>

                {/* Subtitle kecil di bawah data */}
                <div className="mt-5 pt-3 border-t border-slate-800/60 flex items-center justify-between text-[11px] text-slate-500 font-medium">
                  <span>{card.desc}</span>
                  <TrendingUp
                    size={12}
                    className="text-slate-600 group-hover:text-slate-400 transition-colors"
                  />
                </div>
              </div>
            );
          })}
        </div>

        {/* Status Konten Grafik Placeholder */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Completion Rate */}
          <div className="bg-slate-900/40 backdrop-blur-sm rounded-2xl border border-slate-800 p-6">
            <h3 className="text-lg font-bold mb-5">Completion Rate</h3>

            <div className="flex justify-between mb-2 text-sm">
              <span>Selesai</span>
              <span>{completionRate}%</span>
            </div>

            <div className="w-full h-4 bg-slate-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-emerald-500"
                style={{
                  width: `${completionRate}%`,
                }}
              />
            </div>

            <div className="mt-4 text-slate-400 text-sm">
              {summary.completed} dari {summary.totalTask} task telah
              diselesaikan
            </div>
          </div>

          {/* Task Statistics */}
          <div className="bg-slate-900/40 backdrop-blur-sm rounded-2xl border border-slate-800 p-6">
            <h3 className="text-lg font-bold mb-5">Task Statistics</h3>

            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Completed</span>
                  <span>{summary.completed}</span>
                </div>

                <div className="h-3 bg-slate-800 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-emerald-500"
                    style={{
                      width: `${
                        summary.totalTask
                          ? (summary.completed / summary.totalTask) * 100
                          : 0
                      }%`,
                    }}
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Pending</span>
                  <span>{summary.pending}</span>
                </div>

                <div className="h-3 bg-slate-800 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-amber-500"
                    style={{
                      width: `${
                        summary.totalTask
                          ? (summary.pending / summary.totalTask) * 100
                          : 0
                      }%`,
                    }}
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Overdue</span>
                  <span>{summary.overdue}</span>
                </div>

                <div className="h-3 bg-slate-800 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-rose-500"
                    style={{
                      width: `${
                        summary.totalTask
                          ? (summary.overdue / summary.totalTask) * 100
                          : 0
                      }%`,
                    }}
                  />
                </div>
              </div>
            </div>

            <div className="mt-5 text-sm text-slate-400">
              Tingkat keterlambatan:
              <span className="text-rose-400 font-bold ml-2">
                {overdueRate}%
              </span>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}

export default AdminDashboard;
