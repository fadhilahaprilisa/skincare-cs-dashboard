import { Routes, Route, Navigate } from 'react-router-dom';
import DashboardLayout from './components/layout/DashboardLayout';
import LoginPage from './pages/LoginPage';
import AdminDashboard from './pages/AdminDashboard';
import CSDashboard from './pages/CSDashboard';
import TicketDetailPage from './pages/TicketDetailPage';
import InputComplaintPage from './pages/InputComplaintPage';
import MyTicketsPage from './pages/MyTicketsPage';
import AIAnalysisPage from './pages/AIAnalysisPage';
import AdminAnalyticsPage from './pages/AdminAnalyticsPage';
import AIInsightsPage from './pages/AIInsightsPage';
import ResolvedTicketsPage from './pages/ResolvedTicketsPage';
import AdminTicketsPage from './pages/AdminTicketsPage';
import CSAgentsPage from './pages/CSAgentsPage';
import ReportsPage from './pages/ReportsPage';
import CSSettingsPage from './pages/CSSettingsPage';
import AdminSettingsPage from './pages/AdminSettingsPage';

// Placeholder pages — akan diisi di Fase 4-6
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
      <Route path="/cs/tickets" element={<MyTicketsPage />} />
      <Route path="/cs/tickets/:ticketId" element={<TicketDetailPage />} />
      <Route path="/cs/new-complaint" element={<InputComplaintPage />} />
      <Route path="/cs/ai-analysis" element={<AIAnalysisPage />} />
<Route path="/cs/ai-analysis/:ticketId" element={<AIAnalysisPage />} />
      <Route path="/cs/resolved" element={<ResolvedTicketsPage />} />
<Route path="/cs/settings" element={<CSSettingsPage />} />


      {/* ===== ADMIN ROUTES ===== */}
      <Route path="/admin/dashboard" element={<AdminDashboard />} />
      <Route path="/admin/analytics" element={<AdminAnalyticsPage />} />
      <Route path="/admin/ai-insights" element={<AIInsightsPage />} />
      <Route path="/admin/tickets" element={<AdminTicketsPage />} />
<Route path="/admin/cs-agents" element={<CSAgentsPage />} />
      <Route path="/admin/reports" element={<ReportsPage />} />
<Route path="/admin/settings" element={<AdminSettingsPage />} />

      {/* ===== DEFAULT REDIRECT ===== */}
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}

export default App;