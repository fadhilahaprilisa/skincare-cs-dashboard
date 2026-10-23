import { NavLink, useNavigate } from "react-router-dom";
import Logo from "../ui/Logo";
import { useAuth } from "../../contexts/AuthContext";
import { 
  LayoutDashboard, 
  Inbox, 
  PlusCircle, 
  BrainCircuit, 
  CheckCircle2, 
  Settings, 
  Ticket, 
  BarChart3, 
  Users2, 
  FileText, 
  LogOut
} from "lucide-react";

// NavItem with clean Mobbin active styling
const NavItem = ({ to, icon: Icon, materialIcon, label, badge }) => (
  <NavLink
    to={to}
    className={({ isActive }) =>
      `flex items-center justify-between px-3.5 py-2.5 rounded-xl transition-all duration-200 group ${
        isActive
          ? "bg-slate-100 text-slate-900 font-semibold border-l-2 border-slate-900"
          : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
      }`
    }
  >
    <div className="flex items-center gap-3">
      {Icon ? (
        <Icon className="w-[18px] h-[18px] shrink-0 text-slate-500 group-hover:text-slate-900 transition-colors" />
      ) : (
        <span className="material-symbols-outlined text-[18px] text-slate-500 group-hover:text-slate-900">{materialIcon}</span>
      )}
      <span className="text-xs sm:text-sm tracking-tight">{label}</span>
    </div>
    {badge && (
      <span className="px-2 py-0.5 rounded-full bg-slate-200/70 text-slate-700 text-[10px] font-bold">
        {badge}
      </span>
    )}
  </NavLink>
);

// ===== BRAND HEADER =====
const BrandHeader = ({ subtitle }) => (
  <div className="flex items-center gap-3">
    <div className="relative">
      <Logo size="md" />
      <span className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-slate-900"></span>
    </div>
    <div className="flex flex-col">
      <span className="font-display text-base font-bold text-slate-900 tracking-tight leading-none">
        Lumière Skin
      </span>
      <span className="text-[10px] font-semibold text-slate-500 uppercase tracking-[0.18em] mt-1">
        {subtitle}
      </span>
    </div>
  </div>
);

// ===== CS AGENT SIDEBAR =====
export const CSSidebar = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleLogout = (e) => {
    e.preventDefault();
    logout();
    navigate("/login");
  };

  return (
    <aside className="fixed left-0 top-0 h-full w-72 bg-white/90 backdrop-blur-2xl z-50 flex flex-col justify-between border-r border-violet-100/80 shadow-[4px_0_30px_rgba(124,92,255,0.06)]">
      <div className="flex flex-col">
        <div className="h-20 px-6 flex items-center border-b border-violet-100/70">
          <BrandHeader subtitle="Agent Portal" />
        </div>

        <nav className="flex flex-col gap-1 px-3 py-4">
          <NavItem to="/cs/dashboard" icon={LayoutDashboard} label="Dashboard" />
          <NavItem to="/cs/tickets" icon={Inbox} label="My Tickets" badge="24" />
          <NavItem to="/cs/new-complaint" icon={PlusCircle} label="New Complaint" />
          <NavItem to="/cs/ai-analysis" icon={BrainCircuit} label="AI Analysis" />
          <NavItem to="/cs/resolved" icon={CheckCircle2} label="Resolved" />
          <NavItem to="/cs/settings" icon={Settings} label="Settings" />
        </nav>
      </div>

      <div className="p-4 border-t border-slate-100">
        <button
          onClick={handleLogout}
          className="flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl text-xs text-slate-600 hover:bg-rose-50 hover:text-rose-600 transition-all w-full text-left cursor-pointer font-medium"
        >
          <LogOut className="w-4 h-4" />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
};

// ===== ADMIN SIDEBAR =====
export const AdminSidebar = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleLogout = (e) => {
    e.preventDefault();
    logout();
    navigate("/login");
  };

  return (
    <aside className="fixed left-0 top-0 h-full w-72 bg-white/90 backdrop-blur-2xl z-50 flex flex-col justify-between border-r border-slate-200/80 shadow-[4px_0_30px_rgba(15,23,42,0.03)]">
      <div className="flex flex-col">
        <div className="h-20 px-6 flex items-center border-b border-slate-100">
          <BrandHeader subtitle="Admin Console" />
        </div>

        <nav className="flex flex-col gap-1 px-3 py-4">
          <NavItem to="/admin/dashboard" icon={LayoutDashboard} label="Dashboard" />
          <NavItem to="/admin/tickets" icon={Ticket} label="Tickets" badge="21" />
          <NavItem to="/admin/analytics" icon={BarChart3} label="Analytics" />
          <NavItem to="/admin/ai-insights" icon={BrainCircuit} label="AI Insights" />
          <NavItem to="/admin/cs-agents" icon={Users2} label="CS Agents" />
          <NavItem to="/admin/reports" icon={FileText} label="Reports" />
          <NavItem to="/admin/settings" icon={Settings} label="Settings" />
        </nav>
      </div>

      <div className="p-4 border-t border-slate-100">
        <button
          onClick={handleLogout}
          className="flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl text-xs text-slate-600 hover:bg-rose-50 hover:text-rose-600 transition-all w-full text-left cursor-pointer font-medium"
        >
          <LogOut className="w-4 h-4" />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
};

export default CSSidebar;