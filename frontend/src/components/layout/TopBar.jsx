import React, { useState, useEffect } from "react";
import { currentUser } from "../../data/mockData";
import avatarFemale from "../../assets/avatar_female.jpg";
import avatarMale from "../../assets/avatar_male.jpg";
import { Search, Plus, PanelLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useSidebar } from "../../context/SidebarContext";

export const TopBar = ({ 
  title, 
  subtitle, 
  role = "cs",
  showSearch = true, 
  showInputButton = false,
  rightContent = null,
}) => {
  const navigate = useNavigate();
  const { isCollapsed, toggleSidebar } = useSidebar();
  const baseUser = role === "admin" ? currentUser.admin : currentUser.cs;

  // State to hold profile and gender (persisted in localStorage)
  const [profile, setProfile] = useState(() => {
    const storageKey = role === "admin" ? "user_profile_admin" : "user_profile_cs";
    const saved = localStorage.getItem(storageKey);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        // ignore
      }
    }
    return {
      name: baseUser.name,
      gender: role === "admin" ? "male" : "female",
    };
  });

  // Listen for real-time profile updates from settings page
  useEffect(() => {
    const handleProfileUpdate = () => {
      const storageKey = role === "admin" ? "user_profile_admin" : "user_profile_cs";
      const saved = localStorage.getItem(storageKey);
      if (saved) {
        try {
          setProfile(JSON.parse(saved));
        } catch (e) {
          // ignore
        }
      }
    };

    window.addEventListener("profile-updated", handleProfileUpdate);
    return () => window.removeEventListener("profile-updated", handleProfileUpdate);
  }, [role]);

  const displayName = profile?.name || baseUser.name;
  const gender = profile?.gender || (role === "admin" ? "male" : "female");
  const avatarSrc = gender === "male" ? avatarMale : avatarFemale;

  return (
    <header 
      className={`fixed top-0 right-0 h-16 bg-white/80 backdrop-blur-md border-b border-slate-200/80 z-40 flex items-center justify-between px-6 transition-all duration-300 ease-in-out ${
        isCollapsed ? "left-[72px]" : "left-64"
      }`}
    >
      {/* Title Section with Compact Typography */}
      <div className="flex items-center gap-3 min-w-0">
        <button
          type="button"
          onClick={toggleSidebar}
          className="lg:hidden p-1.5 -ml-2 rounded-lg text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition-colors"
          title="Toggle Sidebar"
          aria-label="Toggle Sidebar"
        >
          <PanelLeft className="w-4 h-4" />
        </button>

        <div className="flex flex-col min-w-0">
          <h1 className="text-sm md:text-base font-semibold text-slate-900 leading-tight truncate">
            {title}
          </h1>
          {subtitle && (
            <p className="text-xs text-slate-500 leading-normal truncate max-w-md hidden sm:block mt-0.5">
              {subtitle}
            </p>
          )}
        </div>
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-3">
        {showSearch && (
          <div className="relative flex items-center">
            <Search className="w-3.5 h-3.5 absolute left-3 text-slate-400 pointer-events-none" />
            <input
              className="h-9 w-52 sm:w-60 lg:w-72 bg-slate-100/80 border border-slate-200 pl-9 pr-3.5 py-1.5 rounded-full text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:bg-white focus:border-slate-400 transition-all"
              placeholder="Cari tiket, pelanggan, atau SKU..."
              type="text"
            />
          </div>
        )}

        {showInputButton && (
          <button 
            onClick={() => navigate(role === "admin" ? "/admin/new-complaint" : "/cs/new-complaint")}
            className="h-9 flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#141414] text-white text-xs font-medium hover:bg-[#2B2B2B] active:bg-[#0A0A0A] transition-colors cursor-pointer shadow-none shrink-0"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Input Keluhan</span>
          </button>
        )}

        {rightContent}

        {/* User Profile with Dynamic Gender Avatar */}
        <div className="flex items-center gap-2.5 pl-3 border-l border-slate-200 shrink-0">
          <div className="relative w-8 h-8 rounded-full overflow-hidden ring-2 ring-[#7C5CFF]/25 shadow-xs shrink-0">
            <img 
              src={avatarSrc} 
              alt={displayName} 
              className="w-full h-full object-cover"
            />
          </div>
          <div className="hidden xl:flex flex-col text-left">
            <span className="text-xs font-semibold text-slate-900 leading-tight truncate max-w-[120px]">
              {displayName}
            </span>
            <span className="text-[10px] text-[#7C5CFF] font-medium leading-tight mt-0.5">
              {baseUser.roleLabel}
            </span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default TopBar;