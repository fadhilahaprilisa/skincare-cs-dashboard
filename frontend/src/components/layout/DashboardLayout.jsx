import { CSSidebar, AdminSidebar } from "./Sidebar";
import TopBar from "./TopBar";

export const DashboardLayout = ({ 
  role = "cs", 
  topbarProps = {}, 
  children 
}) => {
  const Sidebar = role === "admin" ? AdminSidebar : CSSidebar;

  return (
    <div className="min-h-screen bg-surface">
      <Sidebar />
      <div className="pl-72">
        <TopBar role={role} {...topbarProps} />  {/* <-- role dikirim ke TopBar */}
        <main className="pt-20 min-h-screen">
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;