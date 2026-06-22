import { useEffect, useState } from "react";
import axios from "axios";
import {
  Search,
  Trash2,
  Calendar,
  Layers,
  Activity,
  User as UserIcon,
  Loader2,
  AlertCircle,
  Hash,
  Download
} from "lucide-react";
import {
  downloadExcel
} from "../../services/excelService";
import AdminLayout from "../../components/AdminLayout";

function AdminTaskMonitoring() {
  const [tasks, setTasks] = useState([]);
  const [search, setSearch] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const API = import.meta.env.VITE_API;

  const loadTasks = async () => {
    try {
      setIsLoading(true);
      const res = await axios.get(`${API}/taskSvc/tasks/getAllTask`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      const taskData = res.data.data || [];

      const taskWithUser = await Promise.all(
        taskData.map(async (task) => {
          try {
            const userRes = await axios.get(
              `${API}/userSvc/users/id/${task.userIdRes}`,
            );

            return {
              ...task,
              fullname: userRes.data.data.fullnameRes,
              username: userRes.data.data.usernameRes,
            };
          } catch {
            return {
              ...task,
              fullname: "-",
              username: "-",
            };
          }
        }),
      );

      setTasks(taskWithUser);
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Apakah Anda yakin ingin menghapus tugas ini?")) {
      return;
    }
    try {
      await axios.delete(`${API}/taskSvc/tasks/deleteTask`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        data: {
          idReq: id,
        },
      });

      loadTasks();
    } catch (err) {
      console.log(err);
    }
  };

  const handleDownloadExcel = async () => {
  try {
    const response = await downloadExcel();

    const url = window.URL.createObjectURL(
      new Blob([response.data])
    );

    const link = document.createElement("a");

    link.href = url;
    link.download = "data_task.xlsx";

    document.body.appendChild(link);

    link.click();

    link.remove();
  } catch (error) {
    console.log(error);
    alert("Gagal download excel");
  }
};


  useEffect(() => {
    loadTasks();
  }, []);

  const filteredTasks = tasks.filter((task) =>
    task.titleRes?.toLowerCase().includes(search.toLowerCase()),
  );
  const totalPages = Math.ceil(filteredTasks.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedTasks = filteredTasks.slice(startIndex, endIndex);

  const getPriorityStyle = (priority) => {
    switch (priority?.toUpperCase()) {
      case "HIGH":
        return "bg-rose-500/20 border-rose-500/40 text-rose-300 font-bold";
      case "MEDIUM":
        return "bg-amber-500/20 border-amber-500/40 text-amber-300 font-medium";
      case "LOW":
        return "bg-emerald-500/20 border-emerald-500/40 text-emerald-300 font-medium";
      default:
        return "bg-slate-700 border-slate-600 text-slate-300";
    }
  };

  const getStatusStyle = (status) => {
    switch (status?.toUpperCase()) {
      case "COMPLETED":
      case "FINISH":
        return "bg-emerald-600/30 text-emerald-400 border border-emerald-500/30 font-semibold";
      case "IN_PROGRESS":
        return "bg-indigo-600/30 text-indigo-400 border border-indigo-500/30 font-semibold";
      case "PENDING":
        return "bg-slate-600/50 text-slate-300 border border-slate-500/30";
      default:
        return "bg-slate-600/50 text-slate-300";
    }
  };

  return (
    <AdminLayout>
      <div className="p-4 sm:p-6 lg:p-8 bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-950 min-h-screen space-y-6 text-slate-100">
        {/* Card Header Utama */}
        <div className="p-6 bg-slate-800/40 backdrop-blur-md rounded-2xl border border-slate-700/50 flex flex-col xl:flex-row xl:items-center xl:justify-between gap-6 shadow-xl">
          <div className="space-y-1">
            <h1 className="text-2xl font-black tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400 flex items-center gap-2">
              <span className="w-3 h-6 bg-indigo-500 rounded-full inline-block shadow-lg shadow-indigo-500/50"></span>
              Task Monitoring Dashboard
            </h1>
            <p className="text-slate-400 text-xs font-medium">
              Panel kendali pusat manajemen tugas dan alokasi resource pengguna
              harian.
            </p>
          </div>

          {/* Toolbar Kontrol: Pencarian & Excel Panel */}
          <div className="flex flex-col md:flex-row items-stretch md:items-center gap-4 w-full xl:w-auto">
            {/* Input Search Berwarna Gelap */}
            <div className="relative w-full md:max-w-xs">
              <Search
                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-indigo-400 pointer-events-none"
                size={18}
              />
              <input
                type="text"
                placeholder="Cari judul tugas..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-11 pr-4 py-2.5 text-sm bg-slate-900/60 text-slate-100 border border-slate-700 rounded-xl placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-400 transition-all shadow-inner"
              />
            </div>

            {/* Kelompok Aksi Excel Integratif */}
            <div className="grid grid-cols-1 sm:grid-cols-3 md:flex items-center gap-2.5 w-full md:w-auto">
              <button
                onClick={handleDownloadExcel}
                className="flex items-center justify-center gap-2 px-4 py-2.5 bg-emerald-600/20 hover:bg-emerald-600 text-emerald-300 hover:text-white rounded-xl text-xs font-bold border border-emerald-500/30 shadow-lg shadow-emerald-950/20 transition-all duration-200 active:scale-95"
              >
                <Download size={15} />
                <span>Export Excel</span>
              </button>
            </div>
          </div>
        </div>

        {/* Wrapper Tabel */}
        <div className="bg-slate-900/50 backdrop-blur-sm rounded-2xl border border-slate-800 shadow-2xl overflow-hidden">
          <div className="overflow-x-auto backend-scroll">
            {isLoading ? (
              <div className="py-24 flex flex-col items-center justify-center gap-3 text-slate-400">
                <Loader2 className="animate-spin text-indigo-400" size={40} />
                <p className="text-sm font-semibold tracking-wider animate-pulse text-indigo-300">
                  Menghubungkan repositori tugas...
                </p>
              </div>
            ) : filteredTasks.length === 0 ? (
              <div className="py-20 flex flex-col items-center justify-center gap-2 text-slate-500">
                <AlertCircle size={44} className="text-slate-600" />
                <p className="text-sm font-medium">
                  Tidak ada kecocokan data tugas dalam database.
                </p>
              </div>
            ) : (
              <table className="w-full text-left table-auto min-w-[900px]">
                <thead>
                  <tr className="bg-slate-800/80 border-b border-slate-700 text-indigo-300 font-bold text-xs uppercase tracking-widest">
                    <th className="p-4 pl-6">
                      <div className="flex items-center gap-1">
                        <Hash size={14} /> ID
                      </div>
                    </th>
                    <th className="p-4">
                      <div className="flex items-center gap-1.5">
                        <UserIcon size={14} /> Penanggung Jawab
                      </div>
                    </th>
                    <th className="p-4">Judul Tugas</th>
                    <th className="p-4">
                      <div className="flex items-center gap-1.5">
                        <Layers size={14} /> Prioritas
                      </div>
                    </th>
                    <th className="p-4">
                      <div className="flex items-center gap-1.5">
                        <Activity size={14} /> Status
                      </div>
                    </th>
                    <th className="p-4">
                      <div className="flex items-center gap-1.5">
                        <Calendar size={14} /> Batas Waktu
                      </div>
                    </th>
                    <th className="p-4 pr-6 text-center">Opsi Manajemen</th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-slate-800/60 text-sm">
                  {paginatedTasks.map((task) => (
                    <tr
                      key={task.idRes}
                      className="hover:bg-indigo-950/40 odd:bg-slate-900/30 even:bg-slate-800/20 transition-all duration-150 group"
                    >
                      <td className="p-4 pl-6 font-mono text-xs font-bold text-indigo-400">
                        #{task.idRes}
                      </td>

                      <td className="p-4">
                        <div className="flex flex-col">
                          <span className="font-bold text-slate-200 group-hover:text-indigo-300 transition-colors">
                            {task.fullname === "-"
                              ? "Unassigned"
                              : task.fullname}
                          </span>
                          <span className="text-xs text-slate-500 font-medium">
                            {task.username === "-"
                              ? "@none"
                              : `@${task.username}`}
                          </span>
                        </div>
                      </td>

                      <td className="p-4 font-medium text-slate-300 max-w-xs truncate group-hover:text-white">
                        {task.titleRes}
                      </td>

                      <td className="p-4">
                        <span
                          className={`inline-flex items-center px-2.5 py-1 text-xs border rounded-lg capitalize tracking-wide ${getPriorityStyle(task.priorityRes)}`}
                        >
                          {task.priorityRes?.toLowerCase()}
                        </span>
                      </td>

                      <td className="p-4">
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 text-xs rounded-full border capitalize ${getStatusStyle(task.statusRes)}`}
                        >
                          {task.statusRes?.toLowerCase().replace("_", " ")}
                        </span>
                      </td>

                      <td className="p-4 text-xs text-slate-400 font-medium whitespace-nowrap">
                        {new Date(task.deadlineRes).toLocaleDateString(
                          "id-ID",
                          {
                            day: "2-digit",
                            month: "short",
                            year: "numeric",
                            hour: "2-digit",
                            minute: "2-digit",
                          },
                        )}
                      </td>

                      <td className="p-4 pr-6 text-center">
                        <button
                          onClick={() => handleDelete(task.idRes)}
                          className="inline-flex items-center justify-center gap-1.5 bg-rose-950/40 text-rose-400 hover:bg-rose-600 hover:text-white px-3 py-1.5 rounded-xl border border-rose-900/50 transition-all duration-200 shadow-md active:scale-95 text-xs font-bold"
                        >
                          <Trash2 size={13} />
                          Hapus Task
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}

            {/* Komponen Navigasi Halaman */}
            <div className="flex items-center justify-between px-6 py-4 border-t border-slate-800 bg-slate-900/60">
              <p className="text-xs text-slate-400">
                Menampilkan {filteredTasks.length === 0 ? 0 : startIndex + 1}
                {" - "}
                {Math.min(endIndex, filteredTasks.length)} dari{" "}
                {filteredTasks.length} data
              </p>

              <div className="flex items-center gap-2">
                <button
                  onClick={() =>
                    setCurrentPage((prev) => Math.max(prev - 1, 1))
                  }
                  disabled={currentPage === 1}
                  className="px-3 py-1.5 rounded-lg bg-slate-800 text-slate-300 disabled:opacity-30 disabled:cursor-not-allowed text-xs font-bold transition-colors hover:bg-slate-700"
                >
                  Prev
                </button>

                <span className="text-xs font-mono text-slate-400 px-2">
                  {currentPage} / {totalPages || 1}
                </span>

                <button
                  onClick={() =>
                    setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                  }
                  disabled={currentPage === totalPages || totalPages === 0}
                  className="px-3 py-1.5 rounded-lg bg-slate-800 text-slate-300 disabled:opacity-30 disabled:cursor-not-allowed text-xs font-bold transition-colors hover:bg-slate-700"
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}

export default AdminTaskMonitoring;
