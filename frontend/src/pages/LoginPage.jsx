import { useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import Logo from "../components/ui/Logo";
import Button from "../components/ui/Button";
import Input from "../components/ui/Input";
import AccentHeading from "../components/ui/AccentHeading";
import { useAuth } from "../contexts/AuthContext";
import { Shield, MessageSquare, Sparkles, Eye, EyeOff, ShieldCheck } from "lucide-react";

const LoginPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login, isLoading, error: authError } = useAuth();

  const [role, setRole] = useState("admin");
  const [email, setEmail] = useState("admin@lumiereskin.id");
  const [password, setPassword] = useState("admin123");
  const [showPassword, setShowPassword] = useState(false);
  const [localError, setLocalError] = useState(null);

  const handleRoleChange = (newRole) => {
    setRole(newRole);
    if (newRole === "admin") {
      setEmail("admin@lumiereskin.id");
      setPassword("admin123");
    } else {
      setEmail("sarah@lumiereskin.id");
      setPassword("cs123");
    }
    setLocalError(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLocalError(null);

    if (!email.trim() || !password.trim()) {
      setLocalError("Email dan password wajib diisi");
      return;
    }

    try {
      const user = await login(email, password, role);
      const from = location.state?.from?.pathname;
      const defaultPath = user.role === "admin" ? "/admin/dashboard" : "/cs/dashboard";
      navigate(from || defaultPath, { replace: true });
    } catch (err) {
      setLocalError(err.message);
    }
  };

  const displayError = localError || authError;

  return (
    <main className="w-full h-screen h-[100dvh] flex flex-col lg:flex-row bg-[#FDFBF9] text-[#1E1B4B] selection:bg-[#EC4899]/20 selection:text-[#1E1B4B] relative overflow-hidden font-sans">
      {/* Background Pastel Mesh Orbs */}
      <div 
        className="absolute -top-32 -left-32 w-[600px] h-[600px] bg-gradient-to-br from-[#E0F2FE]/80 via-[#FCE7F3]/70 to-[#E9D5FF]/60 rounded-full blur-[100px] pointer-events-none"
        aria-hidden="true"
      />
      <div 
        className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-gradient-to-tl from-[#E9D5FF]/50 to-[#FCE7F3]/50 rounded-full blur-[90px] pointer-events-none"
        aria-hidden="true"
      />

      {/* ===== LEFT: BRANDING SHOWCASE ===== */}
      <section className="w-full lg:w-1/2 h-full flex flex-col justify-between p-6 sm:p-8 lg:p-10 border-b lg:border-b-0 lg:border-r border-slate-200/80 relative z-10 bg-gradient-to-b from-[#FFF0F5]/40 via-transparent to-transparent overflow-hidden">
        <header className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3 group">
            <div className="relative">
              <Logo size="md" />
              <span className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-slate-900"></span>
            </div>
            <div>
              <span className="font-display text-base font-bold tracking-tight text-[#1E1B4B] block leading-none">
                Lumière Skin
              </span>
              <span className="text-[10px] tracking-[0.2em] text-[#7C5CFF] font-semibold uppercase mt-0.5 block">
                AI Complaint Intelligence
              </span>
            </div>
          </Link>
        </header>

        <div className="my-auto py-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/90 border border-slate-200 text-[10px] font-semibold text-slate-800 uppercase tracking-wider mb-3 shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-slate-900" />
            <span>AI-Assisted Complaint Workspace</span>
          </div>

          <AccentHeading
            roman="Smarter Customer Care,"
            italic="Powered by Skincare AI"
            subtitle="Kelola keluhan pelanggan, pahami pola formulasi produk, dan bantu tim CS memberikan respons cepat, tepat sasaran, dan solutif."
            align="left"
            size="md"
          />

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-5 pt-4 border-t border-slate-200/80">
            {/* Box 1: AI Assistant */}
            <div className="p-3.5 rounded-2xl bg-white border border-slate-200/80 shadow-[0_1px_3px_rgba(15,23,42,0.03),0_4px_12px_rgba(15,23,42,0.02)] flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <div className="w-7 h-7 rounded-lg bg-slate-100 border border-slate-200/80 flex items-center justify-center text-slate-800">
                    <Sparkles className="w-3.5 h-3.5 text-slate-900" />
                  </div>
                  <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 font-semibold text-[9px] border border-emerald-200">
                    ACTIVE
                  </span>
                </div>
                <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider block mb-0.5">
                  AI Assistant
                </span>
                <h4 className="text-xs font-bold text-slate-900 leading-snug">
                  Triase Keluhan Otomatis
                </h4>
                <p className="text-[11px] text-slate-500 mt-0.5 leading-relaxed">
                  Deteksi kategori & draf respon otomatis
                </p>
              </div>
            </div>

            {/* Box 2: Deteksi Tren */}
            <div className="p-3.5 rounded-2xl bg-white border border-slate-200/80 shadow-[0_1px_3px_rgba(15,23,42,0.03),0_4px_12px_rgba(15,23,42,0.02)] flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <div className="w-7 h-7 rounded-lg bg-slate-100 border border-slate-200/80 flex items-center justify-center text-slate-800">
                    <Shield className="w-3.5 h-3.5 text-slate-900" />
                  </div>
                  <span className="px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 font-semibold text-[9px] border border-slate-200">
                    BATCH SKU
                  </span>
                </div>
                <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider block mb-0.5">
                  Deteksi Tren
                </span>
                <h4 className="text-xs font-bold text-slate-900 leading-snug">
                  Analisis Pola Produk
                </h4>
                <p className="text-[11px] text-slate-500 mt-0.5 leading-relaxed">
                  Identifikasi lonjakan tiket batch kemasan
                </p>
              </div>
            </div>

            {/* Box 3: Efisiensi SLA */}
            <div className="p-3.5 rounded-2xl bg-white border border-slate-200/80 shadow-[0_1px_3px_rgba(15,23,42,0.03),0_4px_12px_rgba(15,23,42,0.02)] flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <div className="w-7 h-7 rounded-lg bg-slate-100 border border-slate-200/80 flex items-center justify-center text-slate-800">
                    <ShieldCheck className="w-3.5 h-3.5 text-slate-900" />
                  </div>
                  <span className="px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 font-semibold text-[9px] border border-slate-200">
                    82% TUNTAS
                  </span>
                </div>
                <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider block mb-0.5">
                  Efisiensi SLA
                </span>
                <div className="flex items-baseline gap-1 my-0.5">
                  <span className="text-xl font-bold tracking-tight text-slate-900">
                    45
                  </span>
                  <span className="text-[11px] text-slate-500 font-medium">Menit</span>
                </div>
                <p className="text-[11px] text-slate-500 leading-relaxed">
                  Rata-rata Penanganan Tiket
                </p>
              </div>
            </div>
          </div>
        </div>

        <footer className="pt-3 border-t border-slate-200/70 flex flex-wrap items-center gap-y-2 gap-x-5 text-[11px] text-[#64748B]">
          <div className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#7C5CFF]"></span>
            Enkripsi Data SSL/TLS
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#EC4899]"></span>
            BPOM SOP Standard
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#06B6D4]"></span>
            Human-in-the-Loop Safe
          </div>
        </footer>
      </section>

      {/* ===== RIGHT: AUTH FORM ===== */}
      <section className="w-full lg:w-1/2 h-full flex items-center justify-center p-4 sm:p-6 lg:p-8 relative z-10 overflow-hidden">
        <div className="w-full max-w-[420px] p-5 md:p-6 rounded-3xl bg-white/90 backdrop-blur-2xl border border-white shadow-[0_16px_40px_rgba(15,23,42,0.06)]">
          <div className="flex items-center justify-between mb-2">
            <span className="px-2.5 py-0.5 rounded-full bg-slate-100 border border-slate-200 text-[10px] font-semibold tracking-wider text-slate-700 uppercase">
              Portal Internal
            </span>
            <div className="flex items-center gap-1.5 text-[11px] text-slate-500">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_6px_#10B981]"></span>
              <span>SSO Active</span>
            </div>
          </div>

          <h2 className="text-2xl font-serif font-bold text-[#1E1B4B] tracking-tight mb-0.5">
            Selamat Datang
          </h2>
          <p className="text-xs text-[#64748B] mb-3">
            Masuk ke ekosistem kecerdasan layanan Lumière Skin
          </p>

          {/* Error Alert */}
          {displayError && (
            <div className="p-2.5 mb-2.5 rounded-xl bg-red-50 border border-red-200 flex items-start gap-2 text-red-600 text-xs">
              <span className="material-symbols-outlined text-[16px] shrink-0 mt-0.5">error</span>
              <span>{displayError}</span>
            </div>
          )}

          {/* Role Switcher */}
          <div className="mb-2.5">
            <label className="block text-[10px] font-semibold text-[#64748B] uppercase tracking-wider mb-1">
              Pilih Peran Akun
            </label>
            <div className="grid grid-cols-2 gap-1.5 p-1 bg-slate-100/80 rounded-xl border border-slate-200/80">
              <button
                type="button"
                onClick={() => handleRoleChange("admin")}
                className={`flex items-center justify-center gap-1.5 py-1.5 px-3 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                  role === "admin"
                    ? "bg-white text-slate-900 shadow-xs border border-slate-200"
                    : "text-slate-500 hover:text-slate-900"
                }`}
              >
                <Shield className="w-3.5 h-3.5 text-slate-800" />
                <span>Admin / Lead</span>
              </button>
              <button
                type="button"
                onClick={() => handleRoleChange("cs")}
                className={`flex items-center justify-center gap-1.5 py-1.5 px-3 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                  role === "cs"
                    ? "bg-white text-slate-900 shadow-xs border border-slate-200"
                    : "text-slate-500 hover:text-slate-900"
                }`}
              >
                <MessageSquare className="w-3.5 h-3.5 text-slate-800" />
                <span>CS Agent</span>
              </button>
            </div>
          </div>

          <div className="p-2.5 mb-3 rounded-xl bg-slate-50 border border-slate-200/80 text-xs">
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-lg bg-white text-slate-900 border border-slate-200 flex items-center justify-center shrink-0">
                {role === "admin" ? <Shield className="w-3.5 h-3.5" /> : <MessageSquare className="w-3.5 h-3.5" />}
              </div>
              <div>
                <p className="font-semibold text-slate-900 text-xs leading-none">
                  Login sebagai {role === "admin" ? "Brand Admin & Lead" : "CS Agent Support"}
                </p>
                <p className="text-slate-500 text-[11px] mt-0.5 leading-snug">
                  {role === "admin"
                    ? "Akses monitoring analitik komplain & pola batch formula."
                    : "Kelola antrean tiket, triase komplain AI, dan respon SOP."}
                </p>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-2.5">
            <div>
              <label className="text-[11px] font-semibold text-slate-800 block mb-1">
                Email Perusahaan
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="nama@lumiereskin.id"
                disabled={isLoading}
                required
                className="w-full bg-white border border-slate-200 rounded-xl py-2 px-3.5 text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-slate-900 focus:ring-1 focus:ring-slate-900/10 transition-all"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-[11px] font-semibold text-slate-800">Kata Sandi</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  disabled={isLoading}
                  className="w-full bg-white border border-slate-200 rounded-xl py-2 pl-3.5 pr-10 text-xs text-slate-900 focus:outline-none focus:border-slate-900 focus:ring-1 focus:ring-slate-900/10 transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700 transition-colors cursor-pointer"
                  tabIndex={-1}
                >
                  {showPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between pt-0.5 text-[11px]">
              <label className="flex items-center gap-1.5 cursor-pointer select-none">
                <input
                  type="checkbox"
                  defaultChecked
                  className="w-3.5 h-3.5 rounded border-slate-300 text-slate-900 focus:ring-0"
                />
                <span className="text-slate-500">Ingat sesi saya (7 Hari)</span>
              </label>
              <a className="text-slate-700 hover:underline font-medium" href="#">
                Lupa kata sandi?
              </a>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-[#141414] hover:bg-[#2B2B2B] active:bg-[#0A0A0A] text-white rounded-full py-2.5 text-xs sm:text-sm font-medium transition-colors cursor-pointer mt-1 shadow-none disabled:bg-slate-100 disabled:text-slate-400"
            >
              {isLoading ? "Memproses..." : `Masuk sebagai ${role === "admin" ? "Admin" : "CS Agent"}`}
            </button>
          </form>

          {/* Demo Credentials Hint */}
          <div className="mt-3 p-2.5 rounded-xl bg-slate-50 border border-slate-200/80 text-[11px]">
            <div className="flex items-start gap-2">
              <Sparkles className="w-3.5 h-3.5 text-slate-700 shrink-0 mt-0.5" />
              <div className="text-slate-600 leading-snug">
                <strong className="text-slate-900 font-semibold">Kredensial Demo:</strong>{" "}
                Admin: <code className="text-slate-900 font-mono">admin@lumiereskin.id</code> / <code className="text-slate-900 font-mono">admin123</code> • CS: <code className="text-slate-900 font-mono">sarah@lumiereskin.id</code> / <code className="text-slate-900 font-mono">cs123</code>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default LoginPage;