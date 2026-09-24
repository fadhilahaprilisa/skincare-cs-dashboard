import { Routes, Route, Navigate } from 'react-router-dom';
import DashboardLayout from './components/layout/DashboardLayout';
import LoginPage from './pages/LoginPage';
import AdminDashboard from './pages/AdminDashboard';
import CSDashboard from './pages/CSDashboard';

// Placeholder pages — akan diisi di Fase 3-6
const Placeholder = ({ title }) => (
  <div className="p-8">
    <div className="bg-surface-container-low rounded-xl p-12 text-center border border-outline-variant/30">
      <span className="material-symbols-outlined text-primary-container text-[64px] mb-4">
        construction
      </span>
      <h1 className="text-headline-lg text-primary font-bold">{title}</h1>
      <p className="text-body-md text-on-surface-variant mt-2">
        Halaman ini akan diimplementasikan pada fase berikutnya.
      </p>
    </div>
  </div>
);

function App() {
  return (
    <Routes>
      {/* ===== LOGIN ===== */}
      <Route path="/login" element={<LoginPage />} />

      {/* ===== CS AGENT ROUTES ===== */}
      <Route path="/cs/dashboard" element={<CSDashboard />} />
      <Route path="/cs/tickets" element={
        <DashboardLayout role="cs" topbarProps={{ title: "My Tickets", subtitle: "Antrean terverifikasi dan riwayat interaksi harian", showInputButton: true }}>
          <Placeholder title="My Tickets" />
        </DashboardLayout>
      } />
      <Route path="/cs/new-complaint" element={
        <DashboardLayout role="cs" topbarProps={{ title: "Input Keluhan Customer", subtitle: "Catat keluhan customer untuk dianalisis AI" }}>
          <Placeholder title="Input Complaint" />
        </DashboardLayout>
      } />
      <Route path="/cs/ai-analysis" element={
        <DashboardLayout role="cs" topbarProps={{ title: "AI Analysis", subtitle: "Analisis keluhan customer dengan bantuan AI" }}>
          <Placeholder title="AI Analysis" />
        </DashboardLayout>
      } />
      <Route path="/cs/tickets/:ticketId" element={
        <DashboardLayout role="cs" topbarProps={{ title: "Detail Tiket", subtitle: "Review keluhan customer dan tindakan penanganan" }}>
          <Placeholder title="Ticket Detail" />
        </DashboardLayout>
      } />
      <Route path="/cs/resolved" element={
        <DashboardLayout role="cs" topbarProps={{ title: "Resolved Tickets", subtitle: "Riwayat tiket yang sudah diselesaikan" }}>
          <Placeholder title="Resolved Tickets" />
        </DashboardLayout>
      } />
      <Route path="/cs/settings" element={
        <DashboardLayout role="cs" topbarProps={{ title: "Settings", subtitle: "Pengaturan akun dan preferensi" }}>
          <Placeholder title="CS Settings" />
        </DashboardLayout>
      } />

      {/* ===== ADMIN ROUTES ===== */}
      <Route path="/admin/dashboard" element={<AdminDashboard />} />
      <Route path="/admin/analytics" element={
        <DashboardLayout role="admin" topbarProps={{ title: "Complaint Analytics", subtitle: "Analisis pola keluhan, produk, sentiment, dan performa CS" }}>
          <Placeholder title="Admin Analytics" />
        </DashboardLayout>
      } />
      <Route path="/admin/ai-insights" element={
        <DashboardLayout role="admin" topbarProps={{ title: "AI Insights", subtitle: "Temuan pola keluhan berbasis AI" }}>
          <Placeholder title="AI Insights" />
        </DashboardLayout>
      } />
      <Route path="/admin/tickets" element={
        <DashboardLayout role="admin" topbarProps={{ title: "Tickets", subtitle: "Monitoring semua tiket customer service" }}>
          <Placeholder title="Admin Tickets" />
        </DashboardLayout>
      } />
      <Route path="/admin/cs-agents" element={
        <DashboardLayout role="admin" topbarProps={{ title: "CS Agents", subtitle: "Monitoring performa tim CS" }}>
          <Placeholder title="CS Agents" />
        </DashboardLayout>
      } />
      <Route path="/admin/reports" element={
        <DashboardLayout role="admin" topbarProps={{ title: "Reports", subtitle: "Laporan dan export data" }}>
          <Placeholder title="Reports" />
        </DashboardLayout>
      } />
      <Route path="/admin/settings" element={
        <DashboardLayout role="admin" topbarProps={{ title: "Settings", subtitle: "Pengaturan sistem dan preferensi" }}>
          <Placeholder title="Admin Settings" />
        </DashboardLayout>
      } />

      {/* ===== DEFAULT REDIRECT ===== */}
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}

export default App;