import { useEffect, useState } from "react";
import {
  Search,
  Plus,
  Pencil,
  Trash2,
  X,
  ClipboardX,
  Calendar,
  Layers,
  ChevronLeft,
  ChevronRight,
  Download,
  FileSpreadsheet,
  Upload,
  Loader2,
} from "lucide-react";
import MainLayout from "../../components/MainLayout";
import {
  getTasks,
  deleteTask,
  createTask,
  updateTask,
} from "../../services/taskService";
import {downloadMyTask,downloadTemplate,uploadExcel} from "../../services/excelService";

function TaskList() {
  const [tasks, setTasks] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  // State Filter & Search
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [priorityFilter, setPriorityFilter] = useState("");

  // State Pagination
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(5);
  const [totalPages, setTotalPages] = useState(0);

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
      const userId = Number(localStorage.getItem("userId"));
      const response = await getTasks(
        userId,
        page,
        size,
        search,
        statusFilter,
        priorityFilter,
      );

      const pageData = response.data?.data?.content || [];
      setTasks(pageData);
      setTotalPages(response.data?.data?.totalPages || 0);
    } catch (error) {
      console.error("Gagal memuat data task:", error);
    }
  };

  useEffect(() => {
    loadData();
  }, [page, size, search, statusFilter, priorityFilter]);

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
    const confirmDelete = window.confirm(
      "Apakah Anda yakin ingin menghapus task ini?",
    );
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

  // HANDLER EXCEL LOGIC
  const handleExportExcel = async () => {
    try {
      const userId = Number(localStorage.getItem("userId"));
      const response = await downloadMyTask(
        userId,
        search,
        statusFilter,
        priorityFilter,
      );

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute(
        "download",
        `Tasks_Report_${new Date().toISOString().slice(0, 10)}.xlsx`,
      );
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      console.error(error);
      alert("Gagal mengekspor data Excel");
    }
  };

  const handleDownloadTemplate = async () => {
    try {
      const response = await downloadTemplate();
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "Template_Import_Task.xlsx");
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      console.error(error);
      alert("Gagal mengunduh template");
    }
  };

  const handleImportExcel = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);
    formData.append("userId", Number(localStorage.getItem("userId")));

    try {
      setIsUploading(true);
      await uploadExcel(formData);
      alert("Upload Excel berhasil!");
      loadData();
    } catch (error) {
      console.error(error);
      alert("Upload Excel gagal. Pastikan format kolom sesuai template.");
    } finally {
      setIsUploading(false);
      e.target.value = ""; // Reset input file
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case "COMPLETED":
      case "FINISH":
        return "bg-emerald-50 border-emerald-200 text-emerald-700";
      case "IN_PROGRESS":
        return "bg-blue-50 border-blue-200 text-blue-700";
      case "PENDING":
        return "bg-amber-50 border-amber-200 text-amber-700";
      default:
        return "bg-rose-50 border-rose-200 text-rose-700";
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

  const formatDate = (dateString) => {
    if (!dateString) return "-";
    const date = new Date(dateString);
    return date.toLocaleDateString("id-ID", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <MainLayout>
      <div className="p-4 sm:p-6 lg:p-8 bg-slate-50 min-h-screen text-slate-800">
        {/* PREMIUM HEADER */}
        <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 rounded-2xl md:rounded-3xl p-6 sm:p-8 shadow-xl shadow-indigo-950/5 mb-6 md:mb-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 relative overflow-hidden border border-slate-800">
          <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none"></div>
          <div className="relative z-10">
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-indigo-500/10 backdrop-blur-md border border-indigo-500/20 rounded-xl text-indigo-400">
                <Layers size={20} />
              </div>
              <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                My Workspace
              </h1>
            </div>
            <p className="text-indigo-200/60 text-xs sm:text-sm mt-2 max-w-xl">
              Pusat kendali produktivitas Anda. Kelola urutan tugas, pantau
              tenggat waktu, dan selesaikan project tepat waktu.
            </p>
          </div>
          <button
            onClick={handleAdd}
            className="relative z-10 w-full sm:w-auto flex items-center justify-center gap-2 bg-gradient-to-r from-indigo-500 to-violet-600 hover:from-indigo-400 hover:to-violet-500 active:scale-[0.98] text-white px-5 py-3 rounded-xl font-bold text-sm shadow-lg shadow-indigo-500/20 transition-all border border-indigo-400/20"
          >
            <Plus size={18} className="stroke-[3]" />
            Tambah Task Baru
          </button>
        </div>

        {/* TOOLBAR, SEARCH PANEL & EXCEL ACTIONS */}
        <div className="bg-slate-200/50 rounded-2xl p-3 mb-6 flex flex-col lg:flex-row gap-3 items-center border border-slate-300/30">
          {/* Search Input */}
          <div className="relative w-full lg:flex-1">
            <Search
              size={18}
              className="absolute left-4 top-3.5 text-slate-400"
            />
            <input
              type="text"
              placeholder="Cari nama atau deskripsi tugas..."
              className="w-full border border-slate-200 rounded-xl pl-12 pr-4 py-3 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-600 transition-all placeholder-slate-400 font-medium shadow-sm"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(0);
              }}
            />
          </div>

          {/* Filter Dropdowns & Excel Buttons */}
          <div className="flex flex-col md:flex-row w-full lg:w-auto gap-3 items-stretch md:items-center">
            {/* Dropdown Filters */}
            <div className="grid grid-cols-2 gap-3 sm:flex">
              <select
                className="w-full sm:w-[150px] border border-slate-200 rounded-xl px-3 py-3 bg-white text-sm font-bold text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-600 transition-all cursor-pointer shadow-sm"
                onChange={(e) => {
                  setStatusFilter(e.target.value);
                  setPage(0);
                }}
                value={statusFilter}
              >
                <option value="">Semua Status</option>
                <option value="PENDING">PENDING</option>
                <option value="IN_PROGRESS">IN PROGRESS</option>
                <option value="FINISH">FINISH</option>
              </select>

              <select
                className="w-full sm:w-[150px] border border-slate-200 rounded-xl px-3 py-3 bg-white text-sm font-bold text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-600 transition-all cursor-pointer shadow-sm"
                onChange={(e) => {
                  setPriorityFilter(e.target.value);
                  setPage(0);
                }}
                value={priorityFilter}
              >
                <option value="">Semua Prioritas</option>
                <option value="HIGH">HIGH</option>
                <option value="MEDIUM">MEDIUM</option>
                <option value="LOW">LOW</option>
              </select>
            </div>

            {/* Excel Actions Group */}
            <div className="flex flex-wrap sm:flex-nowrap gap-2">
              <button
                onClick={handleExportExcel}
                className="flex-1 sm:flex-none flex items-center justify-center gap-1.5 bg-emerald-600 hover:bg-emerald-700 active:scale-[0.98] text-white px-3.5 py-3 rounded-xl font-bold text-xs transition-all border border-emerald-500/20 shadow-sm"
                title="Export data ke berkas Excel"
              >
                <Download size={14} />
                Export Excel
              </button>

              <button
                onClick={handleDownloadTemplate}
                className="flex-1 sm:flex-none flex items-center justify-center gap-1.5 bg-slate-800 hover:bg-slate-700 active:scale-[0.98] text-slate-100 px-3.5 py-3 rounded-xl font-bold text-xs transition-all border border-slate-700 shadow-sm"
                title="Download form standar kosong"
              >
                <FileSpreadsheet size={14} />
                Template
              </button>

              <label
                className={`flex-1 sm:flex-none flex items-center justify-center gap-1.5 px-3.5 py-3 rounded-xl font-bold text-xs transition-all shadow-sm cursor-pointer border ${
                  isUploading
                    ? "bg-indigo-100 text-indigo-400 border-indigo-200 pointer-events-none"
                    : "bg-indigo-600 hover:bg-indigo-700 text-white border-indigo-500/20"
                }`}
              >
                {isUploading ? (
                  <>
                    <Loader2 size={14} className="animate-spin" />
                    Uploading...
                  </>
                ) : (
                  <>
                    <Upload size={14} />
                    Import Excel
                  </>
                )}
                <input
                  type="file"
                  accept=".xlsx"
                  className="hidden"
                  onChange={handleImportExcel}
                  disabled={isUploading}
                />
              </label>
            </div>
          </div>
        </div>

        {/* WORKSPACE MAIN CONTAINER */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          {tasks.length === 0 ? (
            <div className="text-center py-16 sm:py-20 px-4">
              <div className="flex flex-col items-center max-w-sm mx-auto">
                <div className="h-16 w-16 bg-gradient-to-tr from-indigo-500/10 to-violet-500/10 text-indigo-600 rounded-2xl flex items-center justify-center border border-indigo-100 shadow-inner mb-4">
                  <ClipboardX size={32} className="stroke-[1.8]" />
                </div>
                <h3 className="text-lg font-black text-slate-900">
                  Workspace Anda Bersih
                </h3>
                <p className="text-slate-500 text-xs mt-1.5 text-center leading-relaxed font-medium">
                  Tidak ada data tugas yang cocok atau tersimpan di sistem. Buat
                  entri baru menggunakan tombol di atas!
                </p>
              </div>
            </div>
          ) : (
            <>
              {/* DESKTOP VIEW: HTML Table */}
              <div className="hidden md:block overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-900 text-slate-200 font-bold text-xs uppercase tracking-wider border-b border-slate-800">
                      <th className="px-6 py-4">Nama Tugas</th>
                      <th className="px-6 py-4">Prioritas</th>
                      <th className="px-6 py-4">Status Progress</th>
                      <th className="px-6 py-4">Tenggat Waktu</th>
                      <th className="px-6 py-4 text-center">Aksi</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-sm">
                    {tasks.map((task) => (
                      <tr
                        key={task.idRes}
                        className="hover:bg-slate-50/80 transition-colors group"
                      >
                        <td className="px-6 py-4.5 font-bold text-slate-900 max-w-xs truncate">
                          {task.titleRes}
                          <span className="block font-medium text-xs text-slate-400 truncate mt-1">
                            {task.descriptionRes || "Tanpa deskripsi tambahan"}
                          </span>
                        </td>
                        <td className="px-6 py-4.5">
                          <span
                            className={`px-2.5 py-1 rounded-lg text-[10px] font-black tracking-wider uppercase ${getPriorityBadge(task.priorityRes)}`}
                          >
                            {task.priorityRes}
                          </span>
                        </td>
                        <td className="px-6 py-4.5">
                          <span
                            className={`px-2.5 py-1 rounded-md text-xs font-bold border ${getStatusBadge(task.statusRes)}`}
                          >
                            {task.statusRes}
                          </span>
                        </td>
                        <td className="px-6 py-4.5 text-slate-600 font-bold">
                          <div className="flex items-center gap-2 text-xs">
                            <Calendar size={14} className="text-slate-400" />
                            <span>{formatDate(task.deadlineRes)}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4.5">
                          <div className="flex justify-center gap-1.5">
                            <button
                              onClick={() => handleEdit(task)}
                              className="p-2 text-slate-500 hover:text-indigo-600 hover:bg-indigo-50 border border-slate-200 rounded-xl transition-all"
                              title="Edit Tugas"
                            >
                              <Pencil size={14} className="stroke-[2.5]" />
                            </button>
                            <button
                              onClick={() => handleDelete(task.idRes)}
                              className="p-2 text-slate-500 hover:text-rose-600 hover:bg-rose-50 border border-slate-200 rounded-xl transition-all"
                              title="Hapus Tugas"
                            >
                              <Trash2 size={14} className="stroke-[2.5]" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* MOBILE VIEW: Responsive Cards Layout */}
              <div className="grid grid-cols-1 gap-4 p-4 md:hidden bg-slate-50/50">
                {tasks.map((task) => (
                  <div
                    key={task.idRes}
                    className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm space-y-4"
                  >
                    <div className="flex justify-between items-start gap-2">
                      <div className="space-y-1 min-w-0">
                        <h4 className="font-bold text-slate-900 text-sm break-words">
                          {task.titleRes}
                        </h4>
                        <p className="text-xs text-slate-400 line-clamp-2">
                          {task.descriptionRes || "Tanpa deskripsi tambahan"}
                        </p>
                      </div>
                      <span
                        className={`flex-shrink-0 px-2 py-0.5 rounded-md text-[9px] font-black tracking-wider uppercase ${getPriorityBadge(task.priorityRes)}`}
                      >
                        {task.priorityRes}
                      </span>
                    </div>

                    <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-slate-100">
                      <div className="space-y-1">
                        <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-wide">
                          Status
                        </span>
                        <span
                          className={`inline-block px-2.5 py-0.5 rounded-md text-[11px] font-bold border ${getStatusBadge(task.statusRes)}`}
                        >
                          {task.statusRes}
                        </span>
                      </div>

                      <div className="space-y-1">
                        <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-wide">
                          Deadline
                        </span>
                        <div className="flex items-center gap-1.5 text-xs text-slate-600 font-bold">
                          <Calendar size={13} className="text-slate-400" />
                          <span>{formatDate(task.deadlineRes)}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-2 pt-1">
                      <button
                        onClick={() => handleEdit(task)}
                        className="flex-1 flex items-center justify-center gap-1.5 py-2 text-xs bg-slate-50 hover:bg-indigo-50 border border-slate-200 hover:border-indigo-200 text-slate-600 hover:text-indigo-600 rounded-lg font-bold transition-all"
                      >
                        <Pencil size={13} />
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(task.idRes)}
                        className="flex-1 flex items-center justify-center gap-1.5 py-2 text-xs bg-slate-50 hover:bg-rose-50 border border-slate-200 hover:border-rose-200 text-slate-600 hover:text-rose-600 rounded-lg font-bold transition-all"
                      >
                        <Trash2 size={13} />
                        Hapus
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* CONTROLLER COMPONENT: PAGINATION NAVIGATION */}
              <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="text-xs font-semibold text-slate-500">
                  Halaman <span className="text-slate-800">{page + 1}</span>{" "}
                  dari <span className="text-slate-800">{totalPages || 1}</span>
                </div>
                <div className="flex gap-2 w-full sm:w-auto">
                  <button
                    onClick={() => setPage((prev) => Math.max(prev - 1, 0))}
                    disabled={page === 0}
                    className="flex-1 sm:flex-none flex items-center justify-center gap-1 px-4 py-2 text-xs font-bold border border-slate-200 rounded-xl bg-white hover:bg-slate-50 text-slate-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                  >
                    <ChevronLeft size={14} /> Previous
                  </button>
                  <button
                    onClick={() =>
                      setPage((prev) => Math.min(prev + 1, totalPages - 1))
                    }
                    disabled={page >= totalPages - 1}
                    className="flex-1 sm:flex-none flex items-center justify-center gap-1 px-4 py-2 text-xs font-bold border border-slate-200 rounded-xl bg-white hover:bg-slate-50 text-slate-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                  >
                    Next <ChevronRight size={14} />
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>

      {/* JENDELA MODAL INPUT FORM */}
      {showModal && (
        <div className="fixed inset-0 bg-slate-950/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fade-in">
          <div className="bg-white rounded-2xl shadow-2xl border border-slate-100 w-full max-w-md overflow-hidden flex flex-col max-h-[90vh] transform transition-all">
            {/* Modal Header */}
            <div className="flex justify-between items-center px-5 py-4 border-b border-slate-100 bg-slate-900 text-white flex-shrink-0">
              <div>
                <h2 className="text-md sm:text-lg font-black tracking-tight">
                  {editMode ? "Perbarui Detail Tugas" : "Buat Tugas Baru"}
                </h2>
                <p className="text-slate-400 text-[11px] sm:text-xs mt-0.5">
                  Isi instruksi kerja dengan lengkap.
                </p>
              </div>
              <button
                onClick={() => setShowModal(false)}
                className="text-slate-400 hover:text-white p-1.5 rounded-xl hover:bg-slate-800 transition-colors"
              >
                <X size={18} />
              </button>
            </div>

            {/* Modal Form */}
            <form
              onSubmit={handleSave}
              className="p-5 space-y-4 overflow-y-auto"
            >
              <div>
                <label className="block text-[10px] font-black text-slate-400 uppercase tracking-wider mb-1.5">
                  Judul Tugas
                </label>
                <input
                  type="text"
                  placeholder="Contoh: Membuat Desain Database"
                  className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-600 transition-all font-medium bg-slate-50"
                  value={form.titleReq}
                  onChange={(e) =>
                    setForm({ ...form, titleReq: e.target.value })
                  }
                  required
                />
              </div>

              <div>
                <label className="block text-[10px] font-black text-slate-400 uppercase tracking-wider mb-1.5">
                  Deskripsi Lengkap
                </label>
                <textarea
                  placeholder="Tulis instruksi tambahan di sini..."
                  rows="3"
                  className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-600 transition-all resize-none font-medium bg-slate-50"
                  value={form.descriptionReq}
                  onChange={(e) =>
                    setForm({ ...form, descriptionReq: e.target.value })
                  }
                />
              </div>

              <div>
                <label className="block text-[10px] font-black text-slate-400 uppercase tracking-wider mb-1.5">
                  Batas Waktu (Deadline)
                </label>
                <input
                  type="datetime-local"
                  className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-600 transition-all font-bold text-slate-700 bg-slate-50"
                  value={form.deadlineReq}
                  onChange={(e) =>
                    setForm({ ...form, deadlineReq: e.target.value })
                  }
                  required
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-black text-slate-400 uppercase tracking-wider mb-1.5">
                    Tingkat Prioritas
                  </label>
                  <select
                    className="w-full border border-slate-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-600 transition-all bg-white cursor-pointer font-bold text-slate-700 shadow-sm"
                    value={form.priorityReq}
                    onChange={(e) =>
                      setForm({ ...form, priorityReq: e.target.value })
                    }
                  >
                    <option value="HIGH"> HIGH</option>
                    <option value="MEDIUM">MEDIUM</option>
                    <option value="LOW"> LOW</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[10px] font-black text-slate-400 uppercase tracking-wider mb-1.5">
                    Status Saat Ini
                  </label>
                  <select
                    className="w-full border border-slate-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-600 transition-all bg-white cursor-pointer font-bold text-slate-700 shadow-sm"
                    value={form.statusReq}
                    onChange={(e) =>
                      setForm({ ...form, statusReq: e.target.value })
                    }
                  >
                    <option value="PENDING">PENDING</option>
                    <option value="IN_PROGRESS">IN PROGRESS</option>
                    <option value="FINISH">FINISH</option>
                  </select>
                </div>
              </div>

              {/* Modal Actions */}
              <div className="flex flex-col-reverse sm:flex-row justify-end gap-2.5 pt-4 border-t border-slate-100 mt-4 flex-shrink-0">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="w-full sm:w-auto px-4 py-2.5 border border-slate-200 text-slate-500 font-bold text-sm rounded-xl hover:bg-slate-50 transition-colors"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="w-full sm:w-auto px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-bold text-sm rounded-xl transition-all shadow-md shadow-slate-900/10"
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
