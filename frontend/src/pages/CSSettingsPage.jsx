import { useState } from "react";
import DashboardLayout from "../components/layout/DashboardLayout";
import Card from "../components/ui/Card";
import Button from "../components/ui/Button";
import Input from "../components/ui/Input";

const CSSettingsPage = () => {
  const [notifications, setNotifications] = useState({
    email: true,
    sla_alert: true,
    ai_analysis: true,
    weekly_report: false,
  });

  return (
    <DashboardLayout
      role="cs"
      topbarProps={{
        title: "Settings",
        subtitle: "Pengaturan akun dan preferensi",
      }}
    >
      <div className="p-6 space-y-6 max-w-4xl">
        <div>
          <h1 className="text-headline-lg text-primary font-bold tracking-tight">Settings</h1>
          <p className="text-body-sm text-on-surface-variant mt-1">
            Kelola profil, preferensi notifikasi, dan pengaturan akun
          </p>
        </div>

        {/* Profile */}
        <Card tier="base" className="p-6">
          <h3 className="text-headline-sm text-primary font-semibold mb-4">Profile</h3>
          <div className="flex flex-col md:flex-row items-start gap-6">
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-brand-violet to-brand-cyan flex items-center justify-center text-white text-display-lg font-bold">
              SP
            </div>
            <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
              <Input label="Nama Lengkap" defaultValue="Sarah Pramudita" />
              <Input label="Email" defaultValue="sarah@lumiereskin.id" type="email" />
              <Input label="Role" defaultValue="CS Agent" disabled />
              <Input label="WhatsApp" defaultValue="+62 812-XXXX-XXXX" />
            </div>
          </div>
          <div className="flex justify-end mt-4 pt-4 border-t border-outline-variant/30">
            <Button variant="primary" size="sm" icon="save">Simpan Perubahan</Button>
          </div>
        </Card>

        {/* Notifications */}
        <Card tier="base" className="p-6">
          <h3 className="text-headline-sm text-primary font-semibold mb-4">Notifikasi</h3>
          <div className="flex flex-col gap-3">
            {[
              { key: "email", label: "Email Notifications", desc: "Terima notifikasi via email untuk aktivitas penting" },
              { key: "sla_alert", label: "SLA Alert", desc: "Alert real-time saat tiket mendekati batas SLA" },
              { key: "ai_analysis", label: "AI Analysis Ready", desc: "Notifikasi saat AI selesai menganalisis tiket baru" },
              { key: "weekly_report", label: "Weekly Report", desc: "Ringkasan performa mingguan via email setiap Senin" },
            ].map((item) => (
              <label
                key={item.key}
                className="flex items-start justify-between p-3 rounded-lg bg-surface-container cursor-pointer hover:bg-surface-container-high transition-colors"
              >
                <div className="flex flex-col">
                  <span className="text-body-md text-primary font-medium">{item.label}</span>
                  <span className="text-body-sm text-on-surface-variant">{item.desc}</span>
                </div>
                <input
                  type="checkbox"
                  checked={notifications[item.key]}
                  onChange={(e) =>
                    setNotifications({ ...notifications, [item.key]: e.target.checked })
                  }
                  className="w-5 h-5 mt-1 rounded bg-surface-container-lowest border-outline-variant text-brand-cyan focus:ring-0 cursor-pointer"
                />
              </label>
            ))}
          </div>
        </Card>

        {/* Danger Zone */}
        <Card tier="base" className="p-6 border border-error/30">
          <h3 className="text-headline-sm text-error font-semibold mb-2">Danger Zone</h3>
          <p className="text-body-sm text-on-surface-variant mb-4">
            Tindakan berikut tidak dapat dibatalkan. Pastikan kamu yakin sebelum melanjutkan.
          </p>
          <Button variant="destructive" size="sm" icon="logout">
            Logout dari Semua Perangkat
          </Button>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default CSSettingsPage;