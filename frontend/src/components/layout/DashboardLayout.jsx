import { CSSidebar, AdminSidebar } from "./Sidebar";
import TopBar from "./TopBar";

export const DashboardLayout = ({ 
  role = "cs", 
  topbarProps = {}, 
  children 
}) => {
  const Sidebar = role === "admin" ? AdminSidebar : CSSidebar;

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <Sidebar />
      <div className="pl-72">
        <TopBar role={role} {...topbarProps} />  {/* <-- role dikirim ke TopBar */}
        <main className="pt-20 min-h-screen bg-[#F8FAFC]">
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;