import { useEffect, useState } from "react";
import { User, Mail, Shield, Tag, Loader2, Lock } from "lucide-react";
import MainLayout from "../../components/MainLayout";
import {getUserByUsername} from "../../services/authService";
import {deleteUser, updateUser} from "../../services/userService";
function Profile() {
  const [user, setUser] = useState(null);
  const [isEdit, setIsEdit] = useState(false);

  const [form, setForm] = useState({
    fullnameReq: "",
    emailReq: "",
  });

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    try {
      const username = localStorage.getItem("username");

      const response = await getUserByUsername(username);

      setUser(response.data);

      setForm({
        fullnameReq: response.data.fullnameRes,
        emailReq: response.data.emailRes,
      });
    } catch (error) {
      console.log(error);
    }
  };
  const handleUpdate = async () => {
    try {
      await updateUser({
        idReq: user.idRes,

        fullnameReq: form.fullnameReq,

        emailReq: form.emailReq,

        usernameReq: user.usernameRes,

        roleReq: user.roleRes,

        passwordReq: user.passwordRes,
      });

      alert("Profil berhasil diperbarui");

      setIsEdit(false);

      loadProfile();
    } catch (error) {
      console.log(error);

      alert("Gagal update profil");
    }
  };
  const handleDelete = async () => {
    const confirmDelete = window.confirm("Yakin ingin menghapus akun?");

    if (!confirmDelete) return;

    try {
      await deleteUser(user.idRes);

      alert("Akun berhasil dihapus");

      localStorage.clear();

      window.location.href = "/login";
    } catch (error) {
      console.log(error);

      alert("Gagal menghapus akun");
    }
  };
  // Modern Skeleton Loader saat status data masih memuat
  if (!user) {
    return (
      <MainLayout>
        <div className="min-h-screen bg-slate-50 flex items-center justify-center">
          <div className="flex flex-col items-center gap-3 text-slate-500">
            <Loader2 className="animate-spin text-indigo-600" size={40} />
            <p className="text-sm font-medium tracking-wide animate-pulse">
              Memuat data profil...
            </p>
          </div>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="min-h-screen bg-slate-50 text-slate-800 py-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto space-y-6">
          {/* Header Card dengan Background Gradient */}
          <div className="relative bg-gradient-to-r from-indigo-900 to-slate-900 rounded-3xl shadow-xl shadow-indigo-950/10 p-8 text-white overflow-hidden border border-indigo-950/20">
            <div className="absolute -right-10 -top-10 w-40 h-40 bg-white/5 rounded-full blur-2xl pointer-events-none"></div>
            <div className="absolute -left-10 -bottom-10 w-40 h-40 bg-indigo-500/10 rounded-full blur-2xl pointer-events-none"></div>

            <div className="relative flex flex-col sm:flex-row items-center gap-6 text-center sm:text-left">
              {/* Avatar */}
              <div className="w-24 h-24 rounded-2xl bg-gradient-to-tr from-indigo-500 to-purple-500 p-1 shadow-inner flex-shrink-0">
                <div className="w-full h-full rounded-xl bg-slate-900 flex items-center justify-center text-white text-3xl font-extrabold tracking-wider">
                  {user.fullnameRes?.charAt(0).toUpperCase()}
                </div>
              </div>

              <div className="space-y-1.5 flex-1">
                <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3">
                  <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
                    {user.fullnameRes}
                  </h1>
                  <span className="inline-flex items-center gap-1 bg-indigo-500/20 text-indigo-300 text-xs font-semibold px-2.5 py-1 rounded-md border border-indigo-500/30 uppercase tracking-wide">
                    <Shield size={12} />
                    {user.roleRes}
                  </span>
                </div>
                <p className="text-indigo-200/80 text-sm font-medium">
                  @{user.usernameRes}
                </p>
                <p className="text-indigo-300 text-xs pt-1 flex items-center justify-center sm:justify-start gap-1">
                  Akun Task Management System Aktif
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 sm:p-8 space-y-8">
            <div className="border-b border-slate-100 pb-4">
              <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                <span className="w-2.5 h-5 bg-indigo-600 rounded-full inline-block"></span>
                Informasi Pribadi
              </h2>
              <p className="text-slate-400 text-xs mt-1 ml-4">
                Detail akun Anda yang terintegrasi di dalam sistem database
                kami.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Full Name */}
              <div className="space-y-2">
                <label className="text-xs font-bold tracking-wider text-slate-400 uppercase flex items-center gap-1.5">
                  <User size={14} className="text-indigo-500" /> Full Name
                </label>
                <div className="relative group">
                  <div className="w-full bg-slate-50/60 border-l-4 border-l-indigo-500 border-y border-r border-slate-200 rounded-r-xl rounded-l-md px-4 py-3.5 text-sm font-semibold text-slate-800 shadow-sm transition-all group-hover:bg-indigo-50/20 group-hover:border-slate-300 flex justify-between items-center">
                    {isEdit ? (
                      <input
                        value={form.fullnameReq}
                        onChange={(e) =>
                          setForm({
                            ...form,
                            fullnameReq: e.target.value,
                          })
                        }
                        className="w-full bg-transparent outline-none"/>
                    ) : (
                      <span>{user.fullnameRes}</span>
                    )}
                    <Lock size={14} className="text-slate-300" />
                  </div>
                </div>
              </div>

              {/* Username */}
              <div className="space-y-2">
                <label className="text-xs font-bold tracking-wider text-slate-400 uppercase flex items-center gap-1.5">
                  <Tag size={14} className="text-indigo-500" /> Username
                </label>
                <div className="relative group">
                  <div className="w-full bg-slate-50/60 border-l-4 border-l-purple-500 border-y border-r border-slate-200 rounded-r-xl rounded-l-md px-4 py-3.5 text-sm font-semibold text-slate-800 shadow-sm transition-all group-hover:bg-purple-50/20 group-hover:border-slate-300 flex justify-between items-center">
                    <span className="text-slate-500 font-normal">
                      @
                      <span className="font-semibold text-slate-800">
                        {user.usernameRes}
                      </span>
                    </span>
                    <Lock size={14} className="text-slate-300" />
                  </div>
                </div>
              </div>

              {/* Email Address */}
              <div className="space-y-2 sm:col-span-2">
                <label className="text-xs font-bold tracking-wider text-slate-400 uppercase flex items-center gap-1.5">
                  <Mail size={14} className="text-indigo-500" /> Email Address
                </label>
                <div className="relative group">
                  <div className="w-full bg-slate-50/60 border-l-4 border-l-sky-500 border-y border-r border-slate-200 rounded-r-xl rounded-l-md px-4 py-3.5 text-sm font-semibold text-slate-800 shadow-sm transition-all group-hover:bg-sky-50/20 group-hover:border-slate-300 flex justify-between items-center">
                    {isEdit ? (
                      <input
                        type="email"
                        value={form.emailReq}
                        onChange={(e) =>
                          setForm({
                            ...form,
                            emailReq: e.target.value,
                          })
                        }
                        className="w-full bg-transparent outline-none"/>
                    ) : (
                      <span>{user.emailRes}</span>
                    )}{" "}
                    <Lock size={14} className="text-slate-300" />
                  </div>
                </div>
              </div>

              {/* Hak Akses Sistem (Role Card Custom) */}
              <div className="space-y-2 sm:col-span-2 pt-2">
                <label className="text-xs font-bold tracking-wider text-slate-400 uppercase flex items-center gap-1.5">
                  <Shield size={14} className="text-indigo-500" /> Hak Akses
                  Sistem
                </label>
                <div className="w-full bg-gradient-to-r from-indigo-50 to-purple-50/40 border border-indigo-100 rounded-2xl p-4 flex items-center justify-between shadow-sm">
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 rounded-xl bg-white text-indigo-600 shadow-sm border border-indigo-100">
                      <Shield size={20} />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-indigo-950 capitalize">
                        {user.roleRes?.toLowerCase()} Account
                      </p>
                      <p className="text-[11px] text-indigo-500 font-medium">
                        Memiliki wewenang penuh untuk mengakses workspace
                        personal.
                      </p>
                    </div>
                  </div>
                  <span className="bg-indigo-600 text-white font-bold text-[10px] px-2.5 py-1 rounded-full uppercase tracking-wider">
                    Verified
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="flex gap-3 justify-end">
            {!isEdit ? (
              <button
                onClick={() => setIsEdit(true)}
                className="px-5 py-2.5 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700">
                Edit Profil
              </button>
            ) : (
              <>
                <button
                  onClick={handleUpdate}
                  className="px-5 py-2.5 bg-emerald-600 text-white rounded-xl hover:bg-emerald-700">
                  Simpan
                </button>

                <button
                  onClick={() => setIsEdit(false)}
                  className="px-5 py-2.5 bg-slate-500 text-white rounded-xl hover:bg-slate-600">
                  Batal
                </button>
              </>
            )}

            <button
              onClick={handleDelete}
              className="px-5 py-2.5 bg-rose-500 text-white rounded-xl hover:bg-rose-700">
              Hapus Akun
            </button>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}

export default Profile;
