import { useEffect, useState } from "react";

import { Search, Plus, Pencil, Trash2 } from "lucide-react";

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
        setTasks(response.data.data);
      } else {
        const userId = localStorage.getItem("userId");

        const filteredTask = response.data.data.filter(
          (task) => task.userIdRes == userId,
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

  const handleSave = async () => {
    try {
      if (editMode) {
        await updateTask(form);

        alert("Task berhasil diupdate");
      } else {
        await createTask(form);

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
    const confirmDelete = window.confirm("Yakin hapus task?");

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
      deadlineReq: task.deadlineRes?.replace("Z", "")?.slice(0, 16),
      priorityReq: task.priorityRes,
      statusReq: task.statusRes,
      userIdReq: task.userIdRes,
    });
  };

  const handleAdd = () => {
    setEditMode(false);

    resetForm();

    setShowModal(true);
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case "COMPLETED":
      case "FINISH":
        return "bg-green-100 text-green-700";

      case "IN_PROGRESS":
        return "bg-blue-100 text-blue-700";

      case "PENDING":
        return "bg-yellow-100 text-yellow-700";

      default:
        return "bg-red-100 text-red-700";
    }
  };

  const getPriorityBadge = (priority) => {
    switch (priority) {
      case "HIGH":
        return "bg-red-100 text-red-700";

      case "MEDIUM":
        return "bg-yellow-100 text-yellow-700";

      default:
        return "bg-green-100 text-green-700";
    }
  };

  const filteredTasks = tasks.filter((task) => {
    const matchSearch = task.titleRes
      ?.toLowerCase()
      .includes(search.toLowerCase());

    const matchStatus = !statusFilter || task.statusRes === statusFilter;

    const matchPriority =
      !priorityFilter || task.priorityRes === priorityFilter;

    return matchSearch && matchStatus && matchPriority;
  });

  return (
    <MainLayout>
      <div className="p-6">
        <div className="bg-white rounded-xl shadow p-6">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h1 className="text-3xl font-bold">Task List</h1>

              <p className="text-gray-500">Kelola semua tugas Anda</p>
            </div>

            <button
              onClick={handleAdd}
              className="flex items-center gap-2 bg-slate-900 text-white px-4 py-2 rounded-lg"
            >
              <Plus size={18} />
              Add Task
            </button>
          </div>

          <div className="flex gap-4 mb-6">
            <div className="relative w-full">
              <Search
                size={18}
                className="absolute left-3 top-3 text-gray-400"
              />

              <input
                type="text"
                placeholder="Cari task..."
                className="w-full border rounded-lg pl-10 p-2"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>

            <select
              className="border rounded-lg px-3"
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="">All Status</option>

              <option value="PENDING">PENDING</option>

              <option value="IN_PROGRESS">IN_PROGRESS</option>

              <option value="FINISH">FINISH</option>
            </select>

            <select
              className="border rounded-lg px-3"
              onChange={(e) => setPriorityFilter(e.target.value)}
            >
              <option value="">All Priority</option>

              <option value="HIGH">HIGH</option>

              <option value="MEDIUM">MEDIUM</option>

              <option value="LOW">LOW</option>
            </select>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3">Title</th>

                  <th className="text-left py-3">Priority</th>

                  <th className="text-left py-3">Status</th>

                  <th className="text-left py-3">Deadline</th>

                  <th className="text-center py-3">Action</th>
                </tr>
              </thead>

              <tbody>
                {filteredTasks.map((task) => (
                  <tr key={task.idRes} className="border-b hover:bg-gray-50">
                    <td className="py-4">{task.titleRes}</td>

                    <td>
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-medium ${getPriorityBadge(
                          task.priorityRes,
                        )}`}
                      >
                        {task.priorityRes}
                      </span>
                    </td>

                    <td>
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusBadge(
                          task.statusRes,
                        )}`}
                      >
                        {task.statusRes}
                      </span>
                    </td>

                    <td>{task.deadlineRes}</td>

                    <td>
                      <div className="flex justify-center gap-3">
                        <button
                          onClick={() => handleEdit(task)}
                          className="text-blue-600"
                        >
                          <Pencil size={18} />
                        </button>

                        <button
                          onClick={() => handleDelete(task.idRes)}
                          className="text-red-600"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-[500px]">
            <h2 className="text-2xl font-bold mb-4">
              {editMode ? "Edit Task" : "Tambah Task"}
            </h2>

            <input
              type="text"
              placeholder="Title"
              className="border p-2 w-full mb-3"
              value={form.titleReq}
              onChange={(e) =>
                setForm({
                  ...form,
                  titleReq: e.target.value,
                })
              }
            />

            <textarea
              placeholder="Description"
              className="border p-2 w-full mb-3"
              value={form.descriptionReq}
              onChange={(e) =>
                setForm({
                  ...form,
                  descriptionReq: e.target.value,
                })
              }
            />

            <input
              type="datetime-local"
              className="border p-2 w-full mb-3"
              value={form.deadlineReq}
              onChange={(e) =>
                setForm({
                  ...form,
                  deadlineReq: e.target.value,
                })
              }
            />

            <select
              className="border p-2 w-full mb-3"
              value={form.priorityReq}
              onChange={(e) =>
                setForm({
                  ...form,
                  priorityReq: e.target.value,
                })
              }
            >
              <option value="HIGH">HIGH</option>

              <option value="MEDIUM">MEDIUM</option>

              <option value="LOW">LOW</option>
            </select>

            <select
              className="border p-2 w-full mb-3"
              value={form.statusReq}
              onChange={(e) =>
                setForm({
                  ...form,
                  statusReq: e.target.value,
                })
              }
            >
              <option value="PENDING">PENDING</option>

              <option value="IN_PROGRESS">IN_PROGRESS</option>

              <option value="FINISH">FINISH</option>
            </select>

            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowModal(false)}
                className="bg-gray-500 text-white px-4 py-2 rounded"
              >
                Batal
              </button>

              <button
                onClick={handleSave}
                className="bg-blue-600 text-white px-4 py-2 rounded"
              >
                Simpan
              </button>
            </div>
          </div>
        </div>
      )}
    </MainLayout>
  );
}

export default TaskList;
