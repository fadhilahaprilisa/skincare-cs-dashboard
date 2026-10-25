import { CSSidebar, AdminSidebar } from "./Sidebar";
import TopBar from "./TopBar";
import { useSidebar } from "../../context/SidebarContext";

export const DashboardLayout = ({ 
  role = "cs", 
  topbarProps = {}, 
  children 
}) => {
  const Sidebar = role === "admin" ? AdminSidebar : CSSidebar;
  const { isCollapsed } = useSidebar();

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <Sidebar />
      <div 
        className={`transition-all duration-300 ease-in-out ${
          isCollapsed ? "pl-[72px]" : "pl-64"
        }`}
      >
        <TopBar role={role} {...topbarProps} />
        <main className="pt-16 min-h-screen bg-[#F8FAFC]">
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;