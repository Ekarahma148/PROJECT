import { useEffect, useState } from "react";
import axios from "axios";
import {
  Search,
  Trash2,
  ShieldCheck,
  Mail,
  Loader2,
  Users,
  Hash
} from "lucide-react";
import AdminLayout from "../components/AdminLayout";

function AdminUsers() {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const API = import.meta.env.VITE_USER_API;

  const loadUsers = async () => {
    try {
      setIsLoading(true);
      const res = await axios.get(`${API}/users/getAllUser`);
      setUsers(res.data.data || []);
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  const deleteUser = async (id) => {
    if (
      !confirm(
        "Apakah Anda yakin ingin menghapus pengguna ini? Semua data terkait mungkin ikut terhapus.",
      )
    )
      return;

    try {
      await axios.delete(`${API}/users/deleteUser`, {
        data: {
          idReq: id,
        },
      });

      loadUsers();
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const filteredUsers = users.filter((u) =>
    u.usernameRes?.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <AdminLayout>
      <div className="p-4 sm:p-6 lg:p-8 bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-950 min-h-screen space-y-6 text-slate-100">
        
        {/* Header Kontrol Panel (Glassmorphism Tint) */}
        <div className="p-6 bg-slate-800/40 backdrop-blur-md rounded-2xl border border-slate-700/50 flex flex-col md:flex-row md:items-center md:justify-between gap-4 shadow-xl">
          <div className="space-y-1">
            <h1 className="text-2xl font-black tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400 flex items-center gap-2">
              <span className="w-3 h-6 bg-indigo-500 rounded-full inline-block shadow-lg shadow-indigo-500/50"></span>
              User Management
            </h1>
            <p className="text-slate-400 text-xs font-medium">
              Kelola hak akses akun, kredensial, dan daftar pengguna sistem terdaftar.
            </p>
          </div>

          {/* Pencarian Input Gelap */}
          <div className="relative max-w-sm w-full">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-indigo-400" size={18} />
            <input
              type="text"
              placeholder="Cari username pengguna..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-11 pr-4 py-2.5 text-sm bg-slate-900/60 text-slate-100 border border-slate-700 rounded-xl placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-400 transition-all shadow-inner"
            />
          </div>
        </div>

        {/* Wrapper Tabel Semitransparan */}
        <div className="bg-slate-900/50 backdrop-blur-sm rounded-2xl border border-slate-800 shadow-2xl overflow-hidden">
          <div className="overflow-x-auto">
            {isLoading ? (
              <div className="py-24 flex flex-col items-center justify-center gap-3 text-slate-400">
                <Loader2 className="animate-spin text-indigo-400" size={40} />
                <p className="text-sm font-semibold tracking-wider animate-pulse text-indigo-300">Menyelaraskan data pengguna...</p>
              </div>
            ) : filteredUsers.length === 0 ? (
              <div className="py-20 flex flex-col items-center justify-center gap-2 text-slate-500">
                <Users size={44} className="text-slate-600" />
                <p className="text-sm font-medium">Tidak ada data pengguna yang ditemukan.</p>
              </div>
            ) : (
              <table className="w-full text-left table-auto min-w-[850px]">
                <thead>
                  <tr className="bg-slate-800/80 border-b border-slate-700 text-indigo-300 font-bold text-xs uppercase tracking-widest">
                    <th className="p-4 pl-6 w-24"><div className="flex items-center gap-1"><Hash size={14} /> User ID</div></th>
                    <th className="p-4">Nama Lengkap</th>
                    <th className="p-4">Username</th>
                    <th className="p-4"><div className="flex items-center gap-1.5"><Mail size={14} /> Email Kontrak</div></th>
                    <th className="p-4">Level Otoritas</th>
                    <th className="p-4 pr-6 text-center">Tindakan Keamanan</th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-slate-800/60 text-sm">
                  {filteredUsers.map((user) => {
                    const isSystemAdmin = user.roleRes?.toUpperCase() === "ADMIN";
                    return (
                      <tr
                        key={user.idRes}
                        className="hover:bg-indigo-950/40 odd:bg-slate-900/30 even:bg-slate-800/20 transition-all duration-150 group"
                      >
                        {/* ID Pengguna */}
                        <td className="p-4 pl-6 font-mono text-xs font-bold text-indigo-400">
                          #{user.idRes}
                        </td>

                        {/* Nama Lengkap + Avatar Box */}
                        <td className="p-4">
                          <div className="flex items-center gap-3">
                            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-500 to-purple-500 p-0.5 shadow-md flex-shrink-0">
                              <div className="w-full h-full rounded-[10px] bg-slate-900 flex items-center justify-center text-indigo-400 font-black text-xs">
                                {user.fullnameRes?.charAt(0).toUpperCase()}
                              </div>
                            </div>
                            <span className="font-bold text-slate-200 group-hover:text-indigo-300 transition-colors">
                              {user.fullnameRes}
                            </span>
                          </div>
                        </td>

                        {/* Username */}
                        <td className="p-4 font-medium text-slate-400 group-hover:text-white">
                          @{user.usernameRes}
                        </td>

                        {/* Alamat Email */}
                        <td className="p-4 text-slate-400 font-medium">
                          {user.emailRes}
                        </td>

                        {/* Badge Role (High Contrast Dark Mode) */}
                        <td className="p-4">
                          <span
                            className={`inline-flex items-center gap-1 px-2.5 py-1 text-xs font-bold border rounded-lg uppercase tracking-wider ${
                              isSystemAdmin
                                ? "bg-indigo-500/20 border-indigo-500/40 text-indigo-300 shadow-sm"
                                : "bg-blue-500/10 border-blue-500/30 text-blue-400"
                            }`}
                          >
                            {isSystemAdmin && <ShieldCheck size={12} />}
                            {user.roleRes}
                          </span>
                        </td>

                        {/* Tombol Hapus Akun Neon-Edge */}
                        <td className="p-4 pr-6 text-center">
                          <button
                            onClick={() => deleteUser(user.idRes)}
                            className="inline-flex items-center justify-center gap-1.5 bg-rose-950/40 text-rose-400 hover:bg-rose-600 hover:text-white px-3 py-1.5 rounded-xl border border-rose-900/50 transition-all duration-200 shadow-md active:scale-95 text-xs font-bold"
                          >
                            <Trash2 size={13} />
                            Hapus User
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            )}
          </div>
        </div>

      </div>
    </AdminLayout>
  );
}

export default AdminUsers;