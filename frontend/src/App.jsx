import { Routes, Route, Navigate } from 'react-router-dom';
import DashboardLayout from './components/layout/DashboardLayout';
import LoginPage from './pages/LoginPage';
import UnauthorizedPage from './pages/UnauthorizedPage';
import ProtectedRoute from './components/auth/ProtectedRoute';

// CS Pages
import CSDashboard from './pages/CSDashboard';
import TicketDetailPage from './pages/TicketDetailPage';
import InputComplaintPage from './pages/InputComplaintPage';
import MyTicketsPage from './pages/MyTicketsPage';
import AIAnalysisPage from './pages/AIAnalysisPage';
import ResolvedTicketsPage from './pages/ResolvedTicketsPage';
import CSSettingsPage from './pages/CSSettingsPage';

// Admin Pages
import AdminDashboard from './pages/AdminDashboard';
import AdminAnalyticsPage from './pages/AdminAnalyticsPage';
import AIInsightsPage from './pages/AIInsightsPage';
import AdminTicketsPage from './pages/AdminTicketsPage';
import CSAgentsPage from './pages/CSAgentsPage';
import ReportsPage from './pages/ReportsPage';
import AdminSettingsPage from './pages/AdminSettingsPage';

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
      {/* ===== PUBLIC ===== */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/unauthorized" element={<UnauthorizedPage />} />

      {/* ===== CS AGENT ROUTES (only role: cs) ===== */}
      <Route path="/cs/dashboard" element={
        <ProtectedRoute allowedRoles={["cs"]}>
          <CSDashboard />
        </ProtectedRoute>
      } />
      <Route path="/cs/tickets" element={
        <ProtectedRoute allowedRoles={["cs"]}>
          <MyTicketsPage />
        </ProtectedRoute>
      } />
      <Route path="/cs/tickets/:ticketId" element={
        <ProtectedRoute allowedRoles={["cs"]}>
          <TicketDetailPage />
        </ProtectedRoute>
      } />
      <Route path="/cs/new-complaint" element={
        <ProtectedRoute allowedRoles={["cs"]}>
          <InputComplaintPage />
        </ProtectedRoute>
      } />
      <Route path="/cs/ai-analysis" element={
        <ProtectedRoute allowedRoles={["cs"]}>
          <AIAnalysisPage />
        </ProtectedRoute>
      } />
      <Route path="/cs/ai-analysis/:ticketId" element={
        <ProtectedRoute allowedRoles={["cs"]}>
          <AIAnalysisPage />
        </ProtectedRoute>
      } />
      <Route path="/cs/resolved" element={
        <ProtectedRoute allowedRoles={["cs"]}>
          <ResolvedTicketsPage />
        </ProtectedRoute>
      } />
      <Route path="/cs/settings" element={
        <ProtectedRoute allowedRoles={["cs"]}>
          <CSSettingsPage />
        </ProtectedRoute>
      } />

      {/* ===== ADMIN ROUTES (only role: admin) ===== */}
      <Route path="/admin/dashboard" element={
        <ProtectedRoute allowedRoles={["admin"]}>
          <AdminDashboard />
        </ProtectedRoute>
      } />
      <Route path="/admin/analytics" element={
        <ProtectedRoute allowedRoles={["admin"]}>
          <AdminAnalyticsPage />
        </ProtectedRoute>
      } />
      <Route path="/admin/ai-insights" element={
        <ProtectedRoute allowedRoles={["admin"]}>
          <AIInsightsPage />
        </ProtectedRoute>
      } />
      <Route path="/admin/tickets" element={
        <ProtectedRoute allowedRoles={["admin"]}>
          <AdminTicketsPage />
        </ProtectedRoute>
      } />
      <Route path="/admin/cs-agents" element={
        <ProtectedRoute allowedRoles={["admin"]}>
          <CSAgentsPage />
        </ProtectedRoute>
      } />
      <Route path="/admin/reports" element={
        <ProtectedRoute allowedRoles={["admin"]}>
          <ReportsPage />
        </ProtectedRoute>
      } />
      <Route path="/admin/settings" element={
        <ProtectedRoute allowedRoles={["admin"]}>
          <AdminSettingsPage />
        </ProtectedRoute>
      } />

      {/* ===== DEFAULT REDIRECT ===== */}
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}

export default App;