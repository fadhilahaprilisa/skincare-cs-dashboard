import { NavLink, useNavigate } from "react-router-dom";
import { currentUser } from "../../data/mockData";

const Logo = () => (
  <div className="flex items-center gap-3">
    <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-brand-cyan to-brand-violet flex items-center justify-center shadow-cyan-glow">
      <span className="material-symbols-outlined text-white text-[20px]">spa</span>
    </div>
    <div className="flex flex-col">
      <span className="text-headline-sm text-primary font-bold tracking-tight leading-none">
        Lumière Skin
      </span>
      <span className="text-label-sm text-primary-fixed-dim uppercase tracking-widest mt-0.5">
        Agent Portal
      </span>
    </div>
  </div>
);

const NavItem = ({ to, icon, label, badge }) => (
  <NavLink
    to={to}
    className={({ isActive }) =>
      `flex items-center justify-between px-3 py-2 rounded-lg transition-all group ${
        isActive
          ? "bg-primary-container text-on-primary-container font-bold shadow-cyan-glow"
          : "text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface"
      }`
    }
  >
    <div className="flex items-center gap-3">
      <span className="material-symbols-outlined text-[20px]">{icon}</span>
      <span className="text-headline-sm">{label}</span>
    </div>
    {badge && (
      <span className="px-1.5 py-0.5 rounded-full bg-surface-container-highest text-primary-fixed-dim text-label-sm">
        {badge}
      </span>
    )}
  </NavLink>
);

// ===== CS AGENT SIDEBAR =====
export const CSSidebar = () => {
  return (
    <aside className="fixed left-0 top-0 h-full w-72 bg-surface-container-lowest z-50 flex flex-col justify-between border-r border-outline-variant/20">
      <div className="flex flex-col">
        <div className="h-20 px-6 flex items-center">
          <Logo />
        </div>

        <nav className="flex flex-col gap-1 px-4 py-2">
          <NavItem to="/cs/dashboard" icon="dashboard" label="Dashboard" />
          <NavItem to="/cs/tickets" icon="inbox" label="My Tickets" badge="24" />
          <NavItem to="/cs/new-complaint" icon="add_circle" label="New Complaint" />
          <NavItem to="/cs/ai-analysis" icon="psychology" label="AI Analysis" />
          <NavItem to="/cs/resolved" icon="task_alt" label="Resolved" />
          <NavItem to="/cs/settings" icon="tune" label="Settings" />
        </nav>
      </div>

      <div className="p-4 flex flex-col gap-3">
        {/* Status Widget */}
        <div className="p-3 rounded-lg bg-surface-container flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="material-symbols-outlined text-primary-fixed-dim text-[20px]">
              verified_user
            </span>
            <div className="flex flex-col">
              <span className="text-label-sm text-on-surface">Triage AI v2.4</span>
              <span className="text-body-sm text-on-surface-variant">SLA Guard Active</span>
            </div>
          </div>
          <span className="w-2 h-2 rounded-full bg-primary-container shadow-cyan-glow"></span>
        </div>

        <NavLink
          to="/login"
          className="flex items-center gap-3 px-3 py-2 rounded-lg text-on-surface-variant hover:bg-error-container hover:text-on-error-container transition-all"
        >
          <span className="material-symbols-outlined text-[20px]">logout</span>
          <span className="text-headline-sm">Logout</span>
        </NavLink>
      </div>
    </aside>
  );
};

// ===== ADMIN SIDEBAR =====
export const AdminSidebar = () => {
  return (
    <aside className="fixed left-0 top-0 h-full w-72 bg-surface-container-low z-50 flex flex-col justify-between border-r border-outline-variant/20">
      <div className="flex flex-col">
        <div className="h-20 px-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-brand-cyan to-brand-violet flex items-center justify-center shadow-cyan-glow">
              <span className="material-symbols-outlined text-white text-[20px]">spa</span>
            </div>
            <div className="flex flex-col">
              <span className="text-headline-sm text-primary font-bold tracking-tight leading-none">
                Lumière Skin
              </span>
              <span className="text-label-sm text-primary-fixed-dim uppercase tracking-widest mt-0.5">
                Admin Console
              </span>
            </div>
          </div>
        </div>

        <nav className="flex flex-col gap-1 px-4 py-2">
          <NavItem to="/admin/dashboard" icon="dashboard" label="Dashboard" />
          <NavItem to="/admin/tickets" icon="confirmation_number" label="Tickets" badge="21" />
          <NavItem to="/admin/analytics" icon="analytics" label="Analytics" />
          <NavItem to="/admin/ai-insights" icon="psychology" label="AI Insights" />
          <NavItem to="/admin/cs-agents" icon="support_agent" label="CS Agents" />
          <NavItem to="/admin/reports" icon="description" label="Reports" />
          <NavItem to="/admin/settings" icon="settings" label="Settings" />
        </nav>
      </div>

      <div className="p-4 flex flex-col gap-3">
        <div className="p-3 rounded-lg bg-surface-container flex items-center gap-3">
          <span className="w-2 h-2 rounded-full bg-primary-container shadow-cyan-glow animate-pulse"></span>
          <div className="flex flex-col">
            <span className="text-label-sm text-primary">Lumière Neural v2.4</span>
            <span className="text-body-sm text-on-surface-variant">Engine Active</span>
          </div>
        </div>

        <NavLink
          to="/login"
          className="flex items-center gap-3 px-3 py-2 rounded-lg text-on-surface-variant hover:bg-error-container hover:text-on-error-container transition-all"
        >
          <span className="material-symbols-outlined text-[20px]">logout</span>
          <span className="text-headline-sm">Logout</span>
        </NavLink>
      </div>
    </aside>
  );
};

export default CSSidebar;