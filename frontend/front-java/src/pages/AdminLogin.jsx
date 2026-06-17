import { useState } from "react";
import { Shield, User, Lock, Loader2 } from "lucide-react";
import { loginJwt, getUserByUsername } from "../services/authService";

function AdminLogin() {
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

      if (userResponse.data.roleRes !== "ADMIN") {
        alert("Akun ini bukan admin");
        localStorage.clear();
        setIsLoading(false);
        return;
      }

      localStorage.setItem("userId", userResponse.data.idRes);
      localStorage.setItem("username", userResponse.data.usernameRes);
      localStorage.setItem("role", userResponse.data.roleRes);

      alert("Login Admin Berhasil");
      window.location.href = "/admin/dashboard";
    } catch (error) {
      console.log(error);
      alert("Login Admin Gagal");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex bg-slate-950 font-sans">
      {/* SISI KIRI: Brand & Kata-kata Estetik */}
      <div className="hidden lg:flex lg:w-1/2 relative bg-gradient-to-tr from-slate-900 via-slate-900 to-indigo-950 p-12 flex-col justify-between overflow-hidden border-r border-slate-800">
        <div className="absolute -right-20 -top-20 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl"></div>
        <div className="absolute -left-20 -bottom-20 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl"></div>

        {/* Logo / Brand */}
        <div className="relative flex items-center gap-3">
          <div className="p-2 bg-indigo-600 rounded-xl text-white shadow-lg shadow-indigo-600/30">
            <Shield size={24} />
          </div>
          <span className="text-xl font-bold text-white tracking-wider">Task Manager <span className="text-xs bg-indigo-500/20 text-indigo-400 px-2 py-0.5 rounded-md border border-indigo-500/30 ml-1 font-mono">CORE</span></span>
        </div>

        {/* Quotes / Heading Tengah */}
        <div className="relative my-auto space-y-4 max-w-md">
          <h1 className="text-4xl font-extrabold text-white tracking-tight leading-tight">
            Gerbang Kendali Otomasi Sistem.
          </h1>
          <p className="text-slate-400 text-base leading-relaxed">
            Silakan masuk menggunakan akun kredensial administrator Anda untuk memantau aktivitas server, performa task, dan manajemen pengguna secara real-time.
          </p>
        </div>

        {/* Footer Kiri */}
        <p className="relative text-xs text-slate-600">
          &copy; 2026 Task Management System. Secured Endpoint.
        </p>
      </div>

      {/* SISI KANAN: Form Login Clean & Profesional */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-12 bg-slate-900">
        <div className="w-full max-w-md space-y-8">
          <div>
            <h2 className="text-3xl font-bold text-white tracking-tight">Admin Portal</h2>
            <p className="text-slate-400 text-sm mt-2">Otorisasi administrator diperlukan untuk melanjutkan.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Username */}
            <div className="space-y-2">
              <label className="text-xs font-semibold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                <User size={13} className="text-indigo-500" /> Username
              </label>
              <input
                type="text"
                placeholder="Masukkan username admin"
                className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all text-sm"
                value={form.usernameReq}
                onChange={(e) => setForm({ ...form, usernameReq: e.target.value })}
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
                className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all text-sm"
                value={form.passwordReq}
                onChange={(e) => setForm({ ...form, passwordReq: e.target.value })}
                required
                disabled={isLoading}
              />
            </div>

            {/* Button Submit */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3.5 bg-indigo-600 hover:bg-indigo-500 active:scale-[0.99] disabled:opacity-50 text-white font-semibold rounded-xl shadow-lg shadow-indigo-600/20 transition-all flex items-center justify-center gap-2 text-sm mt-2"
            >
              {isLoading ? (
                <>
                  <Loader2 className="animate-spin" size={18} />
                  Memverifikasi...
                </>
              ) : (
                "Masuk Ke Dashboard"
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AdminLogin;