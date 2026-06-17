import { useState } from "react";
import { User, Lock, Loader2, CheckSquare } from "lucide-react";
import { loginJwt, getUserByUsername } from "../services/authService";

function Login() {
  const [form, setForm] = useState({
    usernameReq: "",
    passwordReq: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const loginResponse = await loginJwt(form);
      localStorage.setItem("token", loginResponse.data);

      const userResponse = await getUserByUsername(form.usernameReq);
      localStorage.setItem("userId", userResponse.data.idRes);
      localStorage.setItem("username", userResponse.data.usernameRes);
      localStorage.setItem("role", userResponse.data.roleRes);

      alert("Login Berhasil");
      if (userResponse.data.roleRes === "ADMIN") {
        window.location.href = "/admin";
      } else {
        window.location.href = "/dashboard";
      }
    } catch (error) {
      console.log(error);
      alert("Login Gagal");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex bg-slate-950 font-sans">
      {/* SISI KIRI: Form Login Clean & Elegan */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-12 bg-slate-900">
        <div className="w-full max-w-md space-y-8">
          <div>
            <h2 className="text-3xl font-extrabold text-white tracking-tight">Selamat Datang</h2>
            <p className="text-slate-400 text-sm mt-2">Silakan masuk ke akun Task Manager Anda</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Username */}
            <div className="space-y-2">
              <label className="text-xs font-semibold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                <User size={13} className="text-indigo-500" /> Username
              </label>
              <input
                type="text"
                placeholder="Masukkan username Anda"
                value={form.usernameReq}
                onChange={(e) => setForm({ ...form, usernameReq: e.target.value })}
                className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all text-sm"
                required
                disabled={isLoading}
              />
            </div>

            {/* Password */}
            <div className="space-y-2">
              <label className="text-xs font-semibold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                <Lock size={13} className="text-indigo-500" /> Password
              </label>
              <input
                type="password"
                placeholder="••••••••"
                value={form.passwordReq}
                onChange={(e) => setForm({ ...form, passwordReq: e.target.value })}
                className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all text-sm"
                required
                disabled={isLoading}
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3.5 bg-indigo-600 hover:bg-indigo-500 active:scale-[0.99] disabled:opacity-50 text-white font-semibold rounded-xl shadow-lg shadow-indigo-600/20 transition-all flex items-center justify-center gap-2 text-sm"
            >
              {isLoading ? (
                <>
                  <Loader2 className="animate-spin" size={18} />
                  Memproses...
                </>
              ) : (
                "Masuk Sekarang"
              )}
            </button>
          </form>

          <p className="text-center text-sm text-slate-500">
            Belum punya akun?{" "}
            <a href="/register" className="text-indigo-400 hover:text-indigo-300 font-semibold transition-colors">
              Daftar sekarang
            </a>
          </p>
        </div>
      </div>

      {/* SISI KANAN: Panel Motivasi / Visual Terstruktur */}
      <div className="hidden lg:flex lg:w-1/2 relative bg-gradient-to-br from-indigo-950 via-slate-900 to-slate-950 p-12 flex-col justify-between overflow-hidden border-l border-slate-800">
        <div className="absolute right-0 top-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl"></div>
        
        <div className="relative flex items-center gap-2.5">
          <div className="p-2 bg-indigo-600 rounded-xl text-white">
            <CheckSquare size={20} />
          </div>
          <span className="text-lg font-bold text-white tracking-wide">TaskManager.io</span>
        </div>

        <div className="relative my-auto space-y-4 max-w-md">
          <h2 className="text-4xl font-bold text-white leading-tight">
            Kelola Tugas, Raih Produktivitas Maksimal.
          </h2>
          <p className="text-slate-400 leading-relaxed">
            Atur prioritas harian Anda dengan antarmuka manajemen terpadu. Pantau progres kerja dan selesaikan tenggat waktu proyek lebih efisien.
          </p>
        </div>

        <p className="relative text-xs text-slate-600">
          &copy; 2026 Seluruh hak cipta dilindungi.
        </p>
      </div>
    </div>
  );
}

export default Login;