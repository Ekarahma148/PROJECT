import { useEffect, useState } from "react";
import { Search, Plus, Pencil, Trash2, X, ClipboardX, Filter, Calendar, CheckCircle2, Clock, ShieldAlert, Layers } from "lucide-react";
import MainLayout from "../components/MainLayout";
import {
  getAllTask,
  deleteTask,
  createTask,
  updateTask,
} from "../services/taskService";

function TaskList() {
  const [tasks, setTasks] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [priorityFilter, setPriorityFilter] = useState("");

  const [form, setForm] = useState({
    idReq: null,
    titleReq: "",
    descriptionReq: "",
    deadlineReq: "",
    priorityReq: "MEDIUM",
    statusReq: "PENDING",
    userIdReq: null,
  });

  const loadData = async () => {
    try {
      const response = await getAllTask();
      const role = localStorage.getItem("role");

      if (role === "ADMIN") {
        setTasks(response.data.data || []);
      } else {
        const userId = localStorage.getItem("userId");
        const filteredTask = (response.data.data || []).filter(
          (task) => task.userIdRes == userId
        );
        setTasks(filteredTask);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const resetForm = () => {
    setForm({
      idReq: null,
      titleReq: "",
      descriptionReq: "",
      deadlineReq: "",
      priorityReq: "MEDIUM",
      statusReq: "PENDING",
      userIdReq: null,
    });
  };

  const handleSave = async (e) => {
  e.preventDefault();

  try {

    const payload = {
      ...form,
      userIdReq: Number(localStorage.getItem("userId")),
    };

    if (editMode) {
      await updateTask(payload);
      alert("Task berhasil diupdate");
    } else {
      await createTask(payload);
      alert("Task berhasil ditambah");
    }

    setShowModal(false);
    resetForm();
    loadData();

  } catch (error) {
    console.log(error);
    alert("Gagal menyimpan task");
  }
};

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Apakah Anda yakin ingin menghapus task ini?");
    if (!confirmDelete) return;

    try {
      await deleteTask(id);
      alert("Task berhasil dihapus");
      loadData();
    } catch (error) {
      console.log(error);
      alert("Gagal menghapus task");
    }
  };

  const handleEdit = (task) => {
    setEditMode(true);
    setShowModal(true);
    setForm({
      idReq: task.idRes,
      titleReq: task.titleRes,
      descriptionReq: task.descriptionRes,
      deadlineReq: task.deadlineRes?.replace("Z", "")?.slice(0, 16) || "",
      priorityReq: task.priorityRes,
      statusReq: task.statusRes,
      userIdReq: task.userIdRes,
    });
  };

 const handleAdd = () => {
  setEditMode(false);

  setForm({
    idReq: null,
    titleReq: "",
    descriptionReq: "",
    deadlineReq: "",
    priorityReq: "MEDIUM",
    statusReq: "PENDING",
    userIdReq: Number(localStorage.getItem("userId")),
  });

  setShowModal(true);
};

  const getStatusBadge = (status) => {
    switch (status) {
      case "COMPLETED":
      case "FINISH":
        return "bg-emerald-500/10 text-emerald-600 border-emerald-500/20";
      case "IN_PROGRESS":
        return "bg-blue-500/10 text-blue-600 border-blue-500/20";
      case "PENDING":
        return "bg-amber-500/10 text-amber-600 border-amber-500/20";
      default:
        return "bg-rose-500/10 text-rose-600 border-rose-500/20";
    }
  };

  const getPriorityBadge = (priority) => {
    switch (priority) {
      case "HIGH":
        return "bg-rose-600 text-white shadow-sm shadow-rose-600/20";
      case "MEDIUM":
        return "bg-amber-500 text-white shadow-sm shadow-amber-500/20";
      default:
        return "bg-teal-600 text-white shadow-sm shadow-teal-600/20";
    }
  };

  const filteredTasks = tasks.filter((task) => {
    const matchSearch = task.titleRes?.toLowerCase().includes(search.toLowerCase()) || 
                        task.descriptionRes?.toLowerCase().includes(search.toLowerCase());
    const matchStatus = !statusFilter || task.statusRes === statusFilter;
    const matchPriority = !priorityFilter || task.priorityRes === priorityFilter;
    return matchSearch && matchStatus && matchPriority;
  });

  const formatDate = (dateString) => {
    if (!dateString) return "-";
    const date = new Date(dateString);
    return date.toLocaleDateString("id-ID", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit"
    });
  };

  // Menghitung ringkasan data statis untuk Dashboard Mini
  const countStatus = (status) => tasks.filter(t => t.statusRes === status).length;
  const countFinish = tasks.filter(t => t.statusRes === "FINISH" || t.statusRes === "COMPLETED").length;

  return (
    <MainLayout>
      <div className="p-8 bg-slate-100 min-h-screen text-slate-800">
        
        {/* PREMIUM HEADER: Berwarna Gelap & Sinkron dengan Sidebar */}
        <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 rounded-3xl p-8 shadow-xl shadow-indigo-950/10 mb-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 relative overflow-hidden border border-slate-800">
          <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none"></div>
          <div className="relative z-10">
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-indigo-500/10 backdrop-blur-md border border-indigo-500/20 rounded-xl text-indigo-400">
                <Layers size={22} />
              </div>
              <h1 className="text-3xl font-black text-white tracking-tight">My Workspace</h1>
            </div>
            <p className="text-indigo-200/60 text-sm mt-2 max-w-xl">
              Pusat kendali produktivitas Anda. Kelola urutan tugas, pantau tenggat waktu, dan selesaikan project tepat waktu.
            </p>
          </div>
          <button
            onClick={handleAdd}
            className="relative z-10 flex items-center gap-2 bg-gradient-to-r from-indigo-500 to-violet-600 hover:from-indigo-400 hover:to-violet-500 active:scale-[0.98] text-white px-6 py-3 rounded-xl font-bold text-sm shadow-lg shadow-indigo-500/20 transition-all border border-indigo-400/20"
          >
            <Plus size={18} className="stroke-[3]" />
            Tambah Task Baru
          </button>
        </div>

        {/* TOOLBAR & SEARCH PANEL */}
        <div className="bg-slate-200/60 rounded-2xl p-3.5 mb-6 flex flex-col md:flex-row gap-4 items-center border border-slate-300/40">
          {/* Search Input */}
          <div className="relative w-full md:flex-1">
            <Search size={18} className="absolute left-4 top-3.5 text-slate-400" />
            <input
              type="text"
              placeholder="Cari nama atau deskripsi tugas..."
              className="w-full border border-slate-300 rounded-xl pl-12 pr-4 py-3 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-600 transition-all placeholder-slate-400 font-medium shadow-sm"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          {/* Filter Dropdowns */}
          <div className="flex w-full md:w-auto gap-3">
            <div className="flex items-center gap-2 bg-slate-800 text-slate-100 px-4 py-3 rounded-xl text-xs font-bold uppercase tracking-wider border border-slate-700 shadow-sm">
              <Filter size={14} />
              <span>Saring</span>
            </div>

            <select
              className="flex-1 md:flex-none border border-slate-300 rounded-xl px-4 py-3 bg-white text-sm font-bold text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-600 transition-all cursor-pointer min-w-[145px] shadow-sm"
              onChange={(e) => setStatusFilter(e.target.value)}
              value={statusFilter}
            >
              <option value="">Semua Status</option>
              <option value="PENDING"> PENDING</option>
              <option value="IN_PROGRESS"> IN PROGRESS</option>
              <option value="FINISH">FINISH</option>
            </select>

            <select
              className="flex-1 md:flex-none border border-slate-300 rounded-xl px-4 py-3 bg-white text-sm font-bold text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-600 transition-all cursor-pointer min-w-[145px] shadow-sm"
              onChange={(e) => setPriorityFilter(e.target.value)}
              value={priorityFilter}
            >
              <option value="">Semua Prioritas</option>
              <option value="HIGH"> HIGH</option>
              <option value="MEDIUM"> MEDIUM</option>
              <option value="LOW"> LOW</option>
            </select>
          </div>
        </div>

        {/* WORKSPACE MAIN CONTAINER */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-md overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-900 text-slate-200 font-bold text-xs uppercase tracking-wider border-b border-slate-800">
                  <th className="px-6 py-4.5">Nama Tugas</th>
                  <th className="px-6 py-4.5">Prioritas</th>
                  <th className="px-6 py-4.5">Status Progress</th>
                  <th className="px-6 py-4.5">Tenggat Waktu (Deadline)</th>
                  <th className="px-6 py-4.5 text-center">Aksi</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-100 text-sm">
                {filteredTasks.length === 0 ? (
                  /* COLORED EMPTY STATE */
                  <tr>
                    <td colSpan="5" className="text-center py-20 bg-slate-50/50 px-4">
                      <div className="flex flex-col items-center max-w-sm mx-auto">
                        <div className="h-16 w-16 bg-gradient-to-tr from-indigo-500/10 to-violet-500/10 text-indigo-600 rounded-2xl flex items-center justify-center border border-indigo-100 shadow-inner mb-4">
                          <ClipboardX size={32} className="stroke-[1.8]" />
                        </div>
                        <h3 className="text-lg font-black text-slate-900">Workspace Anda Bersih</h3>
                        <p className="text-slate-500 text-xs mt-1.5 text-center leading-relaxed font-medium">
                          Tidak ada data tugas yang cocok atau tersimpan di sistem. Buat entri baru menggunakan tombol di atas!
                        </p>
                      </div>
                    </td>
                  </tr>
                ) : (
                  filteredTasks.map((task) => (
                    <tr key={task.idRes} className="hover:bg-indigo-50/20 transition-colors group">
                      <td className="px-6 py-5 font-bold text-slate-900 max-w-xs truncate">
                        {task.titleRes}
                        <span className="block font-medium text-xs text-slate-400 truncate mt-1">
                          {task.descriptionRes || "Tanpa deskripsi tambahan"}
                        </span>
                      </td>
                      <td className="px-6 py-5">
                        <span className={`px-3 py-1 rounded-lg text-[11px] font-black tracking-wider border border-transparent uppercase ${getPriorityBadge(task.priorityRes)}`}>
                          {task.priorityRes}
                        </span>
                      </td>
                      <td className="px-6 py-5">
                        <span className={`px-3 py-1 rounded-full text-xs font-bold border ${getStatusBadge(task.statusRes)}`}>
                          ● {task.statusRes}
                        </span>
                      </td>
                      <td className="px-6 py-5 text-slate-600 font-bold">
                        <div className="flex items-center gap-2">
                          <Calendar size={14} className="text-slate-400" />
                          <span>{formatDate(task.deadlineRes)}</span>
                        </div>
                      </td>
                      <td className="px-6 py-5">
                        <div className="flex justify-center gap-2">
                          <button
                            onClick={() => handleEdit(task)}
                            className="p-2 text-slate-500 hover:text-indigo-600 hover:bg-indigo-50 border border-slate-200 hover:border-indigo-200 rounded-xl shadow-sm hover:shadow-indigo-100 transition-all bg-white"
                            title="Edit Tugas"
                          >
                            <Pencil size={15} className="stroke-[2.5]" />
                          </button>
                          <button
                            onClick={() => handleDelete(task.idRes)}
                            className="p-2 text-slate-500 hover:text-rose-600 hover:bg-rose-50 border border-slate-200 hover:border-rose-200 rounded-xl shadow-sm hover:shadow-rose-100 transition-all bg-white"
                            title="Hapus Tugas"
                          >
                            <Trash2 size={15} className="stroke-[2.5]" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* JENDELA MODAL INPUT FORM */}
      {showModal && (
        <div className="fixed inset-0 bg-slate-950/60 backdrop-blur-md flex items-center justify-center z-50 p-4 animate-fade-in">
          <div className="bg-white rounded-3xl shadow-2xl border border-slate-100 w-full max-w-md overflow-hidden flex flex-col transform transition-all">
            
            {/* Modal Header */}
            <div className="flex justify-between items-center px-6 py-5 border-b border-slate-100 bg-slate-900 text-white">
              <div>
                <h2 className="text-lg font-black tracking-tight">
                  {editMode ? "Perbarui Detail Tugas" : "Buat Tugas Baru"}
                </h2>
                <p className="text-slate-400 text-xs mt-0.5">Isi instruksi kerja dengan lengkap.</p>
              </div>
              <button 
                onClick={() => setShowModal(false)}
                className="text-slate-400 hover:text-white p-1.5 rounded-xl hover:bg-slate-800 transition-colors"
              >
                <X size={18} />
              </button>
            </div>

            {/* Modal Form */}
            <form onSubmit={handleSave} className="p-6 space-y-4">
              <div>
                <label className="block text-[11px] font-black text-slate-400 uppercase tracking-wider mb-1.5">Judul Tugas</label>
                <input
                  type="text"
                  placeholder="Contoh: Membuat Desain Database"
                  className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-600 transition-all font-medium bg-slate-50"
                  value={form.titleReq}
                  onChange={(e) => setForm({ ...form, titleReq: e.target.value })}
                  required
                />
              </div>

              <div>
                <label className="block text-[11px] font-black text-slate-400 uppercase tracking-wider mb-1.5">Deskripsi Lengkap</label>
                <textarea
                  placeholder="Tulis instruksi tambahan di sini..."
                  rows="3"
                  className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-600 transition-all resize-none font-medium bg-slate-50"
                  value={form.descriptionReq}
                  onChange={(e) => setForm({ ...form, descriptionReq: e.target.value })}
                />
              </div>

              <div>
                <label className="block text-[11px] font-black text-slate-400 uppercase tracking-wider mb-1.5">Batas Waktu (Deadline)</label>
                <input
                  type="datetime-local"
                  className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-600 transition-all font-bold text-slate-700 bg-slate-50"
                  value={form.deadlineReq}
                  onChange={(e) => setForm({ ...form, deadlineReq: e.target.value })}
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-black text-slate-400 uppercase tracking-wider mb-1.5">Tingkat Prioritas</label>
                  <select
                    className="w-full border border-slate-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-600 transition-all bg-white cursor-pointer font-bold text-slate-700 shadow-sm"
                    value={form.priorityReq}
                    onChange={(e) => setForm({ ...form, priorityReq: e.target.value })}
                  >
                    <option value="HIGH">🔴 HIGH</option>
                    <option value="MEDIUM">🟡 MEDIUM</option>
                    <option value="LOW">🟢 LOW</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-black text-slate-400 uppercase tracking-wider mb-1.5">Status Saat Ini</label>
                  <select
                    className="w-full border border-slate-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-600 transition-all bg-white cursor-pointer font-bold text-slate-700 shadow-sm"
                    value={form.statusReq}
                    onChange={(e) => setForm({ ...form, statusReq: e.target.value })}
                  >
                    <option value="PENDING">⏳ PENDING</option>
                    <option value="IN_PROGRESS">⚡ IN PROGRESS</option>
                    <option value="FINISH">✅ FINISH</option>
                  </select>
                </div>
              </div>

              {/* Modal Actions */}
              <div className="flex justify-end gap-3 pt-5 border-t border-slate-100 mt-4">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2.5 border border-slate-200 text-slate-500 font-bold text-sm rounded-xl hover:bg-slate-50 transition-colors"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-bold text-sm rounded-xl transition-all shadow-md shadow-slate-900/10"
                >
                  Simpan Tugas
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </MainLayout>
  );
}

export default TaskList;