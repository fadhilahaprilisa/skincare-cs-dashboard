import { useState } from "react";
import DashboardLayout from "../components/layout/DashboardLayout";
import Button from "../components/ui/Button";
import Input from "../components/ui/Input";
import avatarFemale from "../assets/avatar_female.jpg";
import avatarMale from "../assets/avatar_male.jpg";

const AdminSettingsPage = () => {
  const [profile, setProfile] = useState(() => {
    const saved = localStorage.getItem("user_profile_admin");
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        // ignore
      }
    }
    return {
      name: "Dr. Adrian Wicaksono",
      email: "admin@lumiereskin.id",
      role: "Admin & Head of Care",
      whatsapp: "+62 812-9843-1120",
      gender: "male", // default for Dr. Adrian Wicaksono
    };
  });

  const [notifications, setNotifications] = useState({
    email: true,
    sla_alert: true,
    ai_analysis: true,
    weekly_report: false,
  });

  const handleGenderChange = (newGender) => {
    setProfile((prev) => ({ ...prev, gender: newGender }));
  };

  // ===== HANDLER SIMPAN PERUBAHAN =====
  const handleSave = () => {
    localStorage.setItem("user_profile_admin", JSON.stringify(profile));
    localStorage.setItem(
      "user_settings_admin",
      JSON.stringify({
        notifications,
        savedAt: new Date().toISOString(),
      })
    );
    window.dispatchEvent(new Event("profile-updated"));
    alert("Profil dan pengaturan Admin berhasil disimpan!");
  };

  const currentAvatar = profile.gender === "female" ? avatarFemale : avatarMale;

  return (
    <DashboardLayout
      role="admin"
      topbarProps={{
        title: "Settings",
        subtitle: "Kelola profil dokter/admin, preferensi notifikasi, dan akun",
      }}
    >
      <div className="p-6 space-y-6 max-w-4xl">
        {/* Profile Card */}
        <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-[0_1px_3px_rgba(15,23,42,0.03),0_4px_12px_rgba(15,23,42,0.02)]">
          <div className="flex items-center justify-between mb-5">
            <div>
              <h3 className="text-base font-bold text-slate-900 tracking-tight">Profil Pengguna</h3>
              <p className="text-xs text-slate-500 mt-0.5">Identitas akun dan foto avatar yang tampil pada platform</p>
            </div>
            <span className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700 border border-slate-200">
              Admin
            </span>
          </div>

          <div className="flex flex-col sm:flex-row items-start gap-6">
            {/* Avatar with Dynamic Gender Switch */}
            <div className="flex flex-col items-center gap-3 shrink-0">
              <div className="relative w-24 h-24 rounded-full overflow-hidden border-2 border-slate-200 ring-4 ring-[#7C5CFF]/15 shadow-md">
                <img 
                  src={currentAvatar} 
                  alt={profile.name} 
                  className="w-full h-full object-cover transition-all duration-300"
                />
              </div>
              <span className="text-[11px] font-medium text-slate-500">
                {profile.gender === "female" ? "Foto Profil: Perempuan" : "Foto Profil: Laki-laki"}
              </span>
            </div>

            {/* Form Fields */}
            <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
              <Input 
                label="Nama Lengkap" 
                value={profile.name} 
                onChange={(e) => setProfile({ ...profile, name: e.target.value })}
              />
              <Input 
                label="Email" 
                value={profile.email} 
                onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                type="email" 
              />
              <Input 
                label="Role" 
                value={profile.role} 
                disabled 
              />
              <Input 
                label="WhatsApp" 
                value={profile.whatsapp} 
                onChange={(e) => setProfile({ ...profile, whatsapp: e.target.value })}
              />

              {/* Gender Selector */}
              <div className="md:col-span-2 flex flex-col gap-1.5 pt-1">
                <label className="text-xs font-semibold text-slate-700">Pilih Jenis Kelamin (Avatar Foto)</label>
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => handleGenderChange("male")}
                    className={`flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl border text-xs font-semibold transition-all cursor-pointer ${
                      profile.gender === "male"
                        ? "bg-[#141414] text-white border-[#141414] shadow-sm"
                        : "bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200"
                    }`}
                  >
                    <span className="material-symbols-outlined text-[16px]">male</span>
                    <span>Laki-laki (Pria)</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => handleGenderChange("female")}
                    className={`flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl border text-xs font-semibold transition-all cursor-pointer ${
                      profile.gender === "female"
                        ? "bg-[#141414] text-white border-[#141414] shadow-sm"
                        : "bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200"
                    }`}
                  >
                    <span className="material-symbols-outlined text-[16px]">female</span>
                    <span>Perempuan (Wanita)</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-end mt-6 pt-4 border-t border-slate-100">
            <Button variant="primary" size="sm" icon="save" onClick={handleSave}>
              Simpan Perubahan
            </Button>
          </div>
        </div>

        {/* Notifications */}
        <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-[0_1px_3px_rgba(15,23,42,0.03),0_4px_12px_rgba(15,23,42,0.02)]">
          <h3 className="text-base font-bold text-slate-900 tracking-tight mb-4">Notifikasi</h3>
          <div className="flex flex-col gap-3">
            {[
              { key: "email", label: "Email Notifications", desc: "Terima notifikasi via email untuk aktivitas penting" },
              { key: "sla_alert", label: "SLA Alert", desc: "Alert real-time saat tiket mendekati batas SLA" },
              { key: "ai_analysis", label: "AI Analysis Ready", desc: "Notifikasi saat AI selesai menganalisis tiket baru" },
              { key: "weekly_report", label: "Weekly Report", desc: "Ringkasan performa mingguan via email setiap Senin" },
            ].map((item) => (
              <label
                key={item.key}
                className="flex items-start justify-between p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 cursor-pointer hover:bg-slate-100/60 transition-colors"
              >
                <div className="flex flex-col">
                  <span className="text-xs font-semibold text-slate-900">{item.label}</span>
                  <span className="text-xs text-slate-500 mt-0.5">{item.desc}</span>
                </div>
                <input
                  type="checkbox"
                  checked={notifications[item.key]}
                  onChange={(e) =>
                    setNotifications({ ...notifications, [item.key]: e.target.checked })
                  }
                  className="w-4 h-4 mt-0.5 rounded border-slate-300 text-slate-900 focus:ring-0 cursor-pointer accent-slate-900"
                />
              </label>
            ))}
          </div>
        </div>

        {/* Danger Zone */}
        <div className="bg-white border border-red-200 rounded-2xl p-6 shadow-[0_1px_3px_rgba(15,23,42,0.03),0_4px_12px_rgba(15,23,42,0.02)]">
          <h3 className="text-base font-bold text-red-600 mb-1">Danger Zone</h3>
          <p className="text-xs text-slate-500 mb-4">
            Tindakan berikut tidak dapat dibatalkan. Pastikan kamu yakin sebelum melanjutkan.
          </p>
          <Button
            variant="destructive"
            size="sm"
            icon="logout"
            onClick={() => {
              if (confirm("Logout dari semua perangkat? Anda akan diarahkan ke halaman login.")) {
                localStorage.clear();
                window.location.href = "/login";
              }
            }}
          >
            Logout dari Semua Perangkat
          </Button>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default AdminSettingsPage;