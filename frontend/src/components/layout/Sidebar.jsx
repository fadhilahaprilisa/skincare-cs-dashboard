import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import Logo from "../ui/Logo";
import { useAuth } from "../../contexts/AuthContext";
import { useSidebar } from "../../context/SidebarContext";
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
  LogOut,
  PanelLeftClose,
  PanelLeftOpen
} from "lucide-react";

// NavItem with compact styling and collapsed tooltip
const NavItem = ({ to, icon: Icon, materialIcon, label, badge, isCollapsed }) => (
  <NavLink
    to={to}
    className={({ isActive }) =>
      `relative transition-all duration-200 group flex items-center ${
        isCollapsed
          ? `w-10 h-10 mx-auto justify-center rounded-xl ${
              isActive
                ? "bg-slate-100 text-slate-900 font-semibold"
                : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
            }`
          : `px-3 py-2 rounded-xl text-xs md:text-sm font-medium justify-between ${
              isActive
                ? "bg-slate-100 text-slate-900 font-semibold"
                : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
            }`
      }`
    }
  >
    {isCollapsed ? (
      <>
        {Icon ? (
          <Icon className="w-4 h-4 text-current shrink-0" />
        ) : (
          <span className="material-symbols-outlined text-[18px] text-current shrink-0">
            {materialIcon}
          </span>
        )}
        {/* Floating Tooltip when Collapsed */}
        <div className="absolute left-full ml-3 px-2.5 py-1.5 bg-slate-900 text-white text-xs font-medium rounded-lg shadow-xl whitespace-nowrap opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity z-50 flex items-center gap-1.5">
          <span>{label}</span>
          {badge && (
            <span className="px-1.5 py-0.2 rounded-full bg-slate-700 text-[10px] font-bold text-slate-200">
              {badge}
            </span>
          )}
        </div>
      </>
    ) : (
      <>
        <div className="flex items-center gap-3 min-w-0">
          {Icon ? (
            <Icon className="w-4 h-4 text-current shrink-0" />
          ) : (
            <span className="material-symbols-outlined text-[18px] text-current shrink-0">
              {materialIcon}
            </span>
          )}
          <span className="truncate tracking-tight">{label}</span>
        </div>
        {badge && (
          <span className="px-2 py-0.5 rounded-full bg-slate-200/70 text-slate-700 text-[10px] font-bold shrink-0">
            {badge}
          </span>
        )}
      </>
    )}
  </NavLink>
);

// ===== BRAND HEADER =====
const BrandHeader = ({ subtitle, isCollapsed, toggleSidebar }) => {
  if (isCollapsed) {
    return (
      <button
        type="button"
        onClick={toggleSidebar}
        className="p-1.5 rounded-xl hover:bg-slate-100 text-slate-600 transition-all cursor-pointer flex items-center justify-center group relative"
        title="Buka Sidebar (Expand)"
        aria-label="Expand Sidebar"
      >
        <div className="relative">
          <Logo size="sm" className="w-8 h-8 rounded-xl object-contain" />
          <span className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-slate-900 ring-2 ring-white"></span>
        </div>
        {/* Hover Hint Overlay */}
        <div className="absolute inset-0 bg-slate-900/10 rounded-xl opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
          <PanelLeftOpen className="w-4 h-4 text-slate-800" />
        </div>
      </button>
    );
  }

  return (
    <div className="flex items-center justify-between w-full">
      <div className="flex items-center gap-2.5 min-w-0">
        <div className="relative shrink-0">
          <Logo size="sm" className="w-8 h-8 rounded-xl object-contain" />
          <span className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-slate-900 ring-2 ring-white"></span>
        </div>
        <div className="flex flex-col min-w-0">
          <span className="font-display text-sm font-bold text-slate-900 tracking-tight leading-none truncate">
            Lumière Skin
          </span>
          <span className="text-[9px] font-semibold text-slate-500 uppercase tracking-[0.16em] mt-1 truncate">
            {subtitle}
          </span>
        </div>
      </div>
      <button
        type="button"
        onClick={toggleSidebar}
        className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer shrink-0"
        title="Tutup Sidebar (Minimize)"
        aria-label="Collapse Sidebar"
      >
        <PanelLeftClose className="w-4 h-4" />
      </button>
    </div>
  );
};

// ===== CS AGENT SIDEBAR =====
export const CSSidebar = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const { isCollapsed, toggleSidebar } = useSidebar();

  const handleLogout = (e) => {
    e.preventDefault();
    logout();
    navigate("/login");
  };

  return (
    <aside 
      className={`fixed left-0 top-0 h-full bg-white/95 backdrop-blur-2xl z-50 flex flex-col justify-between border-r border-slate-200/80 shadow-[4px_0_24px_rgba(15,23,42,0.03)] transition-all duration-300 ease-in-out ${
        isCollapsed ? "w-[72px]" : "w-64"
      }`}
    >
      <div className="flex flex-col">
        {/* Header (h-16 consistent slim height) */}
        <div className={`h-16 px-4 py-3 flex items-center border-b border-slate-200/80 ${isCollapsed ? "justify-center px-2" : "justify-between"}`}>
          <BrandHeader subtitle="Agent Portal" isCollapsed={isCollapsed} toggleSidebar={toggleSidebar} />
        </div>

        {/* Navigation Menu List */}
        <nav className={`flex flex-col py-4 ${isCollapsed ? "px-2 space-y-1.5" : "px-3 space-y-1"}`}>
          <NavItem to="/cs/dashboard" icon={LayoutDashboard} label="Dashboard" isCollapsed={isCollapsed} />
          <NavItem to="/cs/tickets" icon={Inbox} label="My Tickets" badge="24" isCollapsed={isCollapsed} />
          <NavItem to="/cs/new-complaint" icon={PlusCircle} label="New Complaint" isCollapsed={isCollapsed} />
          <NavItem to="/cs/ai-analysis" icon={BrainCircuit} label="AI Analysis" isCollapsed={isCollapsed} />
          <NavItem to="/cs/resolved" icon={CheckCircle2} label="Resolved" isCollapsed={isCollapsed} />
          <NavItem to="/cs/settings" icon={Settings} label="Settings" isCollapsed={isCollapsed} />
        </nav>
      </div>

      {/* Footer / Logout */}
      <div className={`border-t border-slate-100 ${isCollapsed ? "p-3 flex justify-center" : "p-3"}`}>
        {isCollapsed ? (
          <button
            onClick={handleLogout}
            className="w-10 h-10 rounded-xl flex items-center justify-center text-slate-600 hover:bg-rose-50 hover:text-rose-600 transition-all cursor-pointer relative group"
            title="Logout"
            aria-label="Logout"
          >
            <LogOut className="w-4 h-4" />
            <div className="absolute left-full ml-3 px-2.5 py-1.5 bg-slate-900 text-white text-xs font-medium rounded-lg shadow-xl whitespace-nowrap opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity z-50">
              Logout
            </div>
          </button>
        ) : (
          <button
            onClick={handleLogout}
            className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs text-slate-600 hover:bg-rose-50 hover:text-rose-600 transition-all w-full text-left cursor-pointer font-medium"
          >
            <LogOut className="w-4 h-4" />
            <span>Logout</span>
          </button>
        )}
      </div>
    </aside>
  );
};

// ===== ADMIN SIDEBAR =====
export const AdminSidebar = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const { isCollapsed, toggleSidebar } = useSidebar();

  const handleLogout = (e) => {
    e.preventDefault();
    logout();
    navigate("/login");
  };

  return (
    <aside 
      className={`fixed left-0 top-0 h-full bg-white/95 backdrop-blur-2xl z-50 flex flex-col justify-between border-r border-slate-200/80 shadow-[4px_0_24px_rgba(15,23,42,0.03)] transition-all duration-300 ease-in-out ${
        isCollapsed ? "w-[72px]" : "w-64"
      }`}
    >
      <div className="flex flex-col">
        {/* Header (h-16 consistent slim height) */}
        <div className={`h-16 px-4 py-3 flex items-center border-b border-slate-200/80 ${isCollapsed ? "justify-center px-2" : "justify-between"}`}>
          <BrandHeader subtitle="Admin Console" isCollapsed={isCollapsed} toggleSidebar={toggleSidebar} />
        </div>

        {/* Navigation Menu List */}
        <nav className={`flex flex-col py-4 ${isCollapsed ? "px-2 space-y-1.5" : "px-3 space-y-1"}`}>
          <NavItem to="/admin/dashboard" icon={LayoutDashboard} label="Dashboard" isCollapsed={isCollapsed} />
          <NavItem to="/admin/tickets" icon={Ticket} label="Tickets" badge="21" isCollapsed={isCollapsed} />
          <NavItem to="/admin/analytics" icon={BarChart3} label="Analytics" isCollapsed={isCollapsed} />
          <NavItem to="/admin/ai-insights" icon={BrainCircuit} label="AI Insights" isCollapsed={isCollapsed} />
          <NavItem to="/admin/cs-agents" icon={Users2} label="CS Agents" isCollapsed={isCollapsed} />
          <NavItem to="/admin/reports" icon={FileText} label="Reports" isCollapsed={isCollapsed} />
          <NavItem to="/admin/settings" icon={Settings} label="Settings" isCollapsed={isCollapsed} />
        </nav>
      </div>

      {/* Footer / Logout */}
      <div className={`border-t border-slate-100 ${isCollapsed ? "p-3 flex justify-center" : "p-3"}`}>
        {isCollapsed ? (
          <button
            onClick={handleLogout}
            className="w-10 h-10 rounded-xl flex items-center justify-center text-slate-600 hover:bg-rose-50 hover:text-rose-600 transition-all cursor-pointer relative group"
            title="Logout"
            aria-label="Logout"
          >
            <LogOut className="w-4 h-4" />
            <div className="absolute left-full ml-3 px-2.5 py-1.5 bg-slate-900 text-white text-xs font-medium rounded-lg shadow-xl whitespace-nowrap opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity z-50">
              Logout
            </div>
          </button>
        ) : (
          <button
            onClick={handleLogout}
            className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs text-slate-600 hover:bg-rose-50 hover:text-rose-600 transition-all w-full text-left cursor-pointer font-medium"
          >
            <LogOut className="w-4 h-4" />
            <span>Logout</span>
          </button>
        )}
      </div>
    </aside>
  );
};

export default CSSidebar;