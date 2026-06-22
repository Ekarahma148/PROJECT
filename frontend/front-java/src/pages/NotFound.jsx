import { Link } from "react-router-dom";
import { Compass, MoveLeft } from "lucide-react";

function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-950 text-slate-100 p-4 relative overflow-hidden">
      {/* Efek Pendaran Cahaya di Background */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-72 h-72 bg-indigo-500/10 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="text-center space-y-6 max-w-md z-10">
        {/* Icon Kompas Animasi */}
        <div className="inline-flex p-4 rounded-3xl bg-slate-800/40 border border-slate-700/50 backdrop-blur-md text-indigo-400 shadow-xl mb-2 animate-bounce">
          <Compass size={48} strokeWidth={1.5} />
        </div>

        {/* Kode Error Neon */}
        <h1 className="text-8xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-indigo-300 via-indigo-400 to-slate-600 select-none drop-shadow-[0_10px_10px_rgba(99,102,241,0.15)]">
          404
        </h1>

        {/* Pesan Kesalahan */}
        <div className="space-y-2">
          <h2 className="text-xl font-bold tracking-wide text-slate-200">
            Halaman Tidak Ditemukan
          </h2>
          <p className="text-slate-400 text-sm max-w-xs mx-auto leading-relaxed">
            Maaf, tautan yang Anda tuju mungkin salah, telah kedaluwarsa, atau
            dipindahkan oleh admin sistem.
          </p>
        </div>

        {/* Tombol Navigasi Kembali */}
        <div className="pt-2">
          <Link
            to="/login"
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-bold text-sm shadow-lg shadow-indigo-600/20 hover:shadow-indigo-600/40 border border-indigo-500/30 transition-all duration-200 hover:-translate-y-0.5 active:scale-95 group"
          >
            <MoveLeft
              size={16}
              className="group-hover:-translate-x-1 transition-transform"
            />
            Kembali ke Beranda
          </Link>
        </div>
      </div>
    </div>
  );
}

export default NotFound;
