import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Logo from "../components/ui/Logo";
import Button from "../components/ui/Button";
import Input from "../components/ui/Input";

const LoginPage = () => {
  const navigate = useNavigate();
  const [role, setRole] = useState("admin");
  const [email, setEmail] = useState("admin@lumiereskin.id");
  const [password, setPassword] = useState("secretPassword123");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleRoleChange = (newRole) => {
    setRole(newRole);
    setEmail(newRole === "admin" ? "admin@lumiereskin.id" : "sarah@lumiereskin.id");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      navigate(role === "admin" ? "/admin/dashboard" : "/cs/dashboard");
    }, 600);
  };

  return (
    <main className="w-full min-h-screen flex flex-col lg:flex-row bg-ambient-radial">
      {/* ===== LEFT: BRANDING SHOWCASE ===== */}
      <section className="w-full lg:w-1/2 min-h-screen flex flex-col justify-between p-8 sm:p-12 lg:p-16 border-b lg:border-b-0 lg:border-r border-outline-variant/40 relative overflow-hidden">
        <div aria-hidden="true" className="absolute -top-32 -left-32 w-96 h-96 bg-brand-violet/20 rounded-full blur-3xl pointer-events-none"></div>
        <div aria-hidden="true" className="absolute top-1/2 left-1/3 w-[500px] h-[500px] bg-brand-cyan/5 rounded-full blur-[120px] pointer-events-none"></div>

        {/* Header */}
        <header className="relative z-10 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Logo size="lg" />
            <div>
              <span className="text-headline-sm font-bold tracking-tight text-primary block leading-none">Lumière Skin</span>
              <span className="text-label-sm tracking-widest text-primary-fixed-dim font-semibold uppercase mt-1 block">
                AI Complaint Intelligence
              </span>
            </div>
          </div>
          <div className="hidden sm:inline-flex items-center gap-2 px-3 py-1 rounded-full bg-surface-container border border-outline-variant text-label-sm text-on-surface-variant">
            <span className="w-2 h-2 rounded-full bg-brand-cyan animate-pulse"></span>
            <span>Intelligence Platform v2.4</span>
          </div>
        </header>

        {/* Center Hero */}
        <div className="my-10 lg:my-0 relative z-10">
          <span className="inline-block text-label-sm font-bold tracking-[0.2em] text-brand-cyan uppercase mb-3">
            AI-ASSISTED COMPLAINT WORKSPACE
          </span>
          <h1 className="text-headline-lg-mobile sm:text-headline-lg lg:text-display-lg font-bold text-primary tracking-tight leading-tight">
            Smarter Customer Care with AI
          </h1>
          <p className="text-body-lg text-on-surface-variant max-w-lg mt-4 leading-relaxed">
            Kelola keluhan pelanggan, pahami pola masalah, dan bantu tim CS memberikan respons cepat, tepat sasaran, dan solutif.
          </p>

          {/* 3 Metric Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 mt-8 pt-6 border-t border-outline-variant/40 relative">
            <div className="p-3.5 rounded-xl bg-surface-container/80 border border-outline-variant backdrop-blur-sm">
              <div className="flex items-center justify-between text-label-sm text-on-surface-variant mb-1.5">
                <span className="flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-brand-cyan text-[14px]">bolt</span>
                  AI Assistant
                </span>
                <span className="px-1.5 py-0.5 rounded bg-[#2ED573]/10 text-[#2ED573] font-semibold text-[9px] border border-[#2ED573]/30">
                  ACTIVE
                </span>
              </div>
              <p className="text-headline-sm font-semibold text-primary leading-tight mt-1">Triase Keluhan Otomatis</p>
              <p className="text-label-sm text-on-surface-variant mt-1">Deteksi kategori & draf respon otomatis</p>
            </div>

            <div className="p-3.5 rounded-xl bg-surface-container/80 border border-outline-variant backdrop-blur-sm">
              <div className="flex items-center justify-between text-label-sm text-on-surface-variant mb-1.5">
                <span className="flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-[#FFC048] text-[14px]">warning</span>
                  Deteksi Tren
                </span>
                <span className="px-1.5 py-0.5 rounded bg-brand-cyan/10 text-brand-cyan font-semibold text-[9px] border border-brand-cyan/30">
                  POLA PRODUK
                </span>
              </div>
              <p className="text-headline-sm font-semibold text-primary leading-tight mt-1">Analisis Pola Produk</p>
              <p className="text-label-sm text-on-surface-variant mt-1">Identifikasi lonjakan tiket SKU & kemasan</p>
            </div>

            <div className="p-3.5 rounded-xl bg-surface-container/80 border border-outline-variant backdrop-blur-sm">
              <div className="flex items-center justify-between text-label-sm text-on-surface-variant mb-1.5">
                <span className="flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-brand-cyan text-[14px]">schedule</span>
                  Resolusi Cepat
                </span>
                <span className="px-1.5 py-0.5 rounded bg-brand-cyan/10 text-brand-cyan font-bold text-[9px] border border-brand-cyan/30">
                  EFISIENSI SLA
                </span>
              </div>
              <p className="text-headline-md font-bold text-primary tracking-tight">4.5 <span className="text-body-sm font-normal text-on-surface-variant">Jam</span></p>
              <p className="text-label-sm text-on-surface-variant mt-1">Rata-rata Penanganan Tiket</p>
            </div>
          </div>
        </div>

        {/* Footer Trust Badges */}
        <footer className="relative z-10 pt-6 border-t border-outline-variant/40 flex flex-wrap items-center gap-y-3 gap-x-6 text-label-sm text-on-surface-variant">
          <div className="flex items-center gap-1.5">
            <span className="material-symbols-outlined text-brand-cyan text-[16px]">shield</span>
            Enkripsi Data SSL/TLS
          </div>
          <div className="flex items-center gap-1.5">
            <span className="material-symbols-outlined text-brand-cyan text-[16px]">description</span>
            ISO/IEC 27001 Ready
          </div>
          <div className="flex items-center gap-1.5">
            <span className="material-symbols-outlined text-brand-cyan text-[16px]">forum</span>
            Omnichannel WA & E-Commerce
          </div>
        </footer>
      </section>

      {/* ===== RIGHT: AUTH FORM ===== */}
      <section className="w-full lg:w-1/2 min-h-screen flex items-center justify-center p-6 sm:p-10 lg:p-14 bg-surface relative">
        <div aria-hidden="true" className="absolute w-80 h-80 bg-brand-cyan/10 rounded-full blur-[100px] pointer-events-none"></div>

        <div className="w-full max-w-md p-7 sm:p-9 rounded-2xl bg-surface-container border border-outline-variant shadow-2xl relative z-10">
          {/* SSO Status */}
          <div className="flex items-center justify-between mb-4">
            <span className="px-2.5 py-1 rounded bg-surface-container-high border border-outline-variant text-label-sm font-bold tracking-wider text-brand-cyan uppercase">
              Portal Internal
            </span>
            <div className="flex items-center gap-1.5 text-label-sm text-on-surface-variant">
              <span className="w-2 h-2 rounded-full bg-[#2ED573]"></span>
              <span>SSO Active</span>
            </div>
          </div>

          <h2 className="text-headline-lg font-bold text-primary tracking-tight">Welcome back</h2>
          <p className="text-body-sm text-on-surface-variant mt-1 mb-6">
            Masuk ke ekosistem kecerdasan layanan Lumière Skin
          </p>

          {/* Role Selector */}
          <div className="mb-4">
            <label className="block text-label-sm font-semibold text-on-surface-variant uppercase tracking-wider mb-2">
              Pilih Peran Akun
            </label>
            <div className="grid grid-cols-2 gap-2 p-1 bg-surface-container-lowest rounded-xl border border-outline-variant">
              <button
                type="button"
                onClick={() => handleRoleChange("admin")}
                className={`flex items-center justify-center gap-2 py-2.5 px-3 rounded-lg text-label-md font-semibold transition-all ${
                  role === "admin"
                    ? "bg-surface-container-high text-primary border border-outline-variant/80 shadow"
                    : "text-on-surface-variant hover:text-primary"
                }`}
              >
                <span className="material-symbols-outlined text-brand-cyan text-[16px]">shield</span>
                Admin
              </button>
              <button
                type="button"
                onClick={() => handleRoleChange("cs")}
                className={`flex items-center justify-center gap-2 py-2.5 px-3 rounded-lg text-label-md font-semibold transition-all ${
                  role === "cs"
                    ? "bg-surface-container-high text-primary border border-outline-variant/80 shadow"
                    : "text-on-surface-variant hover:text-primary"
                }`}
              >
                <span className="material-symbols-outlined text-brand-violet text-[16px]">forum</span>
                CS Agent
              </button>
            </div>
          </div>

          {/* Role Context Box */}
          <div className="p-3.5 mb-5 rounded-xl bg-surface-container-high border border-outline-variant">
            <div className="flex items-start gap-3">
              <div className="p-2 rounded-lg bg-surface-container-lowest text-brand-cyan border border-outline-variant mt-0.5">
                <span className="material-symbols-outlined text-[16px]">
                  {role === "admin" ? "shield" : "forum"}
                </span>
              </div>
              <div>
                <p className="text-label-md font-semibold text-primary">
                  Login sebagai {role === "admin" ? "Admin" : "CS Agent"}
                </p>
                <p className="text-label-sm text-on-surface-variant mt-0.5 leading-snug">
                  {role === "admin"
                    ? "Akses pemantauan keluhan pelanggan, analitik kategori komplain, eskalasi prioritas, dan konfigurasi asisten respons."
                    : "Kelola antrean tiket, triase komplain bot otomatis, dan beri respons presisi dengan saran AI."}
                </p>
                <span className="inline-block mt-2 text-label-sm font-medium text-brand-cyan">
                  Target: {role === "admin" ? "Dashboard Manajemen Operasional & AI" : "Dashboard Layanan & Triase CS"}
                </span>
              </div>
            </div>
          </div>

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              label="Email Perusahaan"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="nama@lumiereskin.id"
              icon="mail"
              required
            />

            <div className="flex flex-col gap-1.5">
              <label className="text-label-md text-on-surface">Kata Sandi</label>
              <div className="relative">
                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant text-[18px] pointer-events-none">
                  lock
                </span>
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="w-full bg-surface-container-lowest border border-outline-variant rounded-lg py-2.5 pl-10 pr-10 text-body-md text-on-surface focus:outline-none focus:border-brand-cyan focus:ring-2 focus:ring-brand-cyan/20 transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-on-surface-variant hover:text-primary transition-colors"
                >
                  <span className="material-symbols-outlined text-[18px]">
                    {showPassword ? "visibility_off" : "visibility"}
                  </span>
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between pt-1">
              <label className="flex items-center gap-2 cursor-pointer select-none">
                <input
                  type="checkbox"
                  defaultChecked
                  className="w-4 h-4 rounded bg-surface-container-lowest border-outline-variant text-brand-cyan focus:ring-0"
                />
                <span className="text-label-sm text-on-surface-variant">Ingat sesi saya (14 Hari)</span>
              </label>
              <a className="text-label-sm text-on-surface-variant hover:text-brand-cyan transition-colors" href="#">
                Lupa kata sandi?
              </a>
            </div>

            <Button
              type="submit"
              variant="primary"
              size="lg"
              icon={isLoading ? "progress_activity" : "arrow_forward"}
              className="w-full mt-2"
              disabled={isLoading}
            >
              {isLoading ? "Memproses..." : `Masuk sebagai ${role === "admin" ? "Admin" : "CS Agent"}`}
            </Button>
          </form>

          {/* Footnote */}
          <div className="mt-6 pt-5 border-t border-outline-variant/40 text-center space-y-2">
            <div className="flex items-center justify-center gap-1.5 text-label-sm text-on-surface-variant">
              <span className="material-symbols-outlined text-brand-cyan text-[14px]">shield</span>
              <span>Lumière Complaint Intelligence Platform • Akses Terotentikasi</span>
            </div>
            <p className="text-label-sm text-on-surface-variant/60">
              Memerlukan akses tiket atau otorisasi tim baru?{" "}
              <a className="text-brand-cyan hover:underline font-medium" href="#">
                Hubungi IT Security & Lead CS
              </a>
            </p>
          </div>
        </div>
      </section>
    </main>
  );
};

export default LoginPage;