import { useState } from "react";
import { User, Mail, Tag, Lock, Loader2, Sparkles } from "lucide-react";
import { registerUser } from "../../services/userService";

function Register() {
  const [form, setForm] = useState({
    fullnameReq: "",
    emailReq: "",
    usernameReq: "",
    passwordReq: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await registerUser(form);
      alert("Register Berhasil");
      window.location.href = "/login";
    } catch (error) {
      alert("Register Gagal");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex bg-slate-950 font-sans">
      <div className="hidden lg:flex lg:w-1/2 relative bg-gradient-to-tr from-slate-950 via-slate-900 to-indigo-950 p-12 flex-col justify-between overflow-hidden border-r border-slate-800">
        <div className="absolute -left-10 -top-10 w-85 h-85 bg-indigo-500/10 rounded-full blur-3xl"></div>

        <div className="relative flex items-center gap-2.5">
          <div className="p-2 bg-indigo-600 rounded-xl text-white">
            <Sparkles size={20} />
          </div>
          <span className="text-lg font-bold text-white tracking-wide">TaskManager.io</span>
        </div>

        <div className="relative my-auto space-y-5 max-w-md">
          <h2 className="text-4xl font-extrabold text-white leading-tight tracking-tight">
            Mulailah Mengontrol Waktu Anda.
          </h2>
          <p className="text-slate-400 leading-relaxed">
            Bergabunglah bersama ribuan profesional lainnya untuk menyusun, menjadwalkan, dan mengeksekusi rencana kerja harian Anda tanpa hambatan.
          </p>
          
          <div className="space-y-3 pt-4 border-t border-slate-800/60">
            <div className="flex items-center gap-3 text-sm text-slate-300">
              <span className="w-1.5 h-1.5 bg-indigo-500 rounded-full"></span> Workspace Personal Responsif
            </div>
            <div className="flex items-center gap-3 text-sm text-slate-300">
              <span className="w-1.5 h-1.5 bg-indigo-500 rounded-full"></span> Klasifikasi Prioritas Pintar
            </div>
          </div>
        </div>

        <p className="relative text-xs text-slate-600">
          &copy; 2026 Platform Manajemen Tugas Pintar.
        </p>
      </div>

      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-12 bg-slate-900 overflow-y-auto">
        <div className="w-full max-w-md space-y-6 my-auto py-8">
          <div>
            <h2 className="text-3xl font-bold text-white tracking-tight">Buat Akun</h2>
            <p className="text-slate-400 text-sm mt-1.5">Mulai kelola tugas Anda dengan lebih terstruktur</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Nama Lengkap */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                <User size={13} className="text-indigo-500" /> Nama Lengkap
              </label>
              <input
                type="text"
                placeholder="John Doe"
                value={form.fullnameReq}
                onChange={(e) => setForm({ ...form, fullnameReq: e.target.value })}
                className="w-full px-4 py-2.5 bg-slate-800/50 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all text-sm"
                required
                disabled={isLoading}
              />
            </div>

            {/* Email */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                <Mail size={13} className="text-indigo-500" /> Email Address
              </label>
              <input
                type="email"
                placeholder="nama@email.com"
                value={form.emailReq}
                onChange={(e) => setForm({ ...form, emailReq: e.target.value })}
                className="w-full px-4 py-2.5 bg-slate-800/50 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all text-sm"
                required
                disabled={isLoading}
              />
            </div>

            {/* Username */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                <Tag size={13} className="text-indigo-500" /> Username
              </label>
              <input
                type="text"
                placeholder="johndoe123"
                value={form.usernameReq}
                onChange={(e) => setForm({ ...form, usernameReq: e.target.value })}
                className="w-full px-4 py-2.5 bg-slate-800/50 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all text-sm"
                required
                disabled={isLoading}
              />
            </div>

            {/* Password */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                <Lock size={13} className="text-indigo-500" /> Password
              </label>
              <input
                type="password"
                placeholder="••••••••"
                value={form.passwordReq}
                onChange={(e) => setForm({ ...form, passwordReq: e.target.value })}
                className="w-full px-4 py-2.5 bg-slate-800/50 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all text-sm"
                required
                disabled={isLoading}
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 bg-indigo-600 hover:bg-indigo-500 active:scale-[0.99] disabled:opacity-50 text-white font-semibold rounded-xl shadow-lg shadow-indigo-600/20 transition-all flex items-center justify-center gap-2 text-sm mt-3"
            >
              {isLoading ? (
                <>
                  <Loader2 className="animate-spin" size={18} />
                  Mendaftarkan...
                </>
              ) : (
                "Daftar Akun"
              )}
            </button>
          </form>

          <p className="text-center text-sm text-slate-500 pt-2">
            Sudah punya akun?{" "}
            <a href="/login" className="text-indigo-400 hover:text-indigo-300 font-semibold transition-colors">
              Masuk disini
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Register;