import { ShieldAlert, MoveLeft } from "lucide-react";
import { Link } from "react-router-dom";

function Forbidden() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-slate-900 via-rose-950/20 to-slate-950 text-slate-100 p-4 relative overflow-hidden">
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-80 h-80 bg-rose-500/5 rounded-full blur-[140px] pointer-events-none"></div>

      <div className="text-center space-y-6 max-w-md z-10">
        <div className="inline-flex p-4 rounded-3xl bg-slate-800/40 border border-rose-900/40 backdrop-blur-md text-rose-400 shadow-2xl shadow-rose-950/20 mb-2">
          <ShieldAlert size={48} strokeWidth={1.5} className="animate-pulse" />
        </div>

        {/* Kode Akses */}
        <h1 className="text-8xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-rose-300 via-rose-400 to-slate-600 select-none drop-shadow-[0_10px_10px_rgba(244,63,94,0.15)]">
          403
        </h1>

        {/* Pesan Kesalahan */}
        <div className="space-y-2">
          <h2 className="text-xl font-bold tracking-wide text-slate-200">
            Akses Ditolak (Forbidden)
          </h2>
          <p className="text-slate-600 text-sm max-w-xs mx-auto leading-relaxed">
            Akun Anda tidak memiliki otoritas tingkat tinggi yang diperlukan
            untuk melihat pangkalan data di halaman ini.
          </p>
        </div>

        {/* Tombol Navigasi Kembali */}
        <div className="pt-2">
          <Link
            to="/login"
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-rose-600 to-rose-700 text-white rounded-xl font-bold text-sm shadow-lg shadow-rose-600/10 hover:shadow-rose-600/30 border border-rose-500/30 transition-all duration-200 hover:-translate-y-0.5 active:scale-95 group"
          >
            <MoveLeft
              size={16}
              className="group-hover:-translate-x-1 transition-transform"
            />
            Kembali ke Login
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Forbidden;
