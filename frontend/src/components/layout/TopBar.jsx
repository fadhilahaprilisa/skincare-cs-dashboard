import React, { useState, useEffect } from "react";
import { currentUser } from "../../data/mockData";
import avatarFemale from "../../assets/avatar_female.jpg";
import avatarMale from "../../assets/avatar_male.jpg";
import { Search, Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";

export const TopBar = ({ 
  title, 
  subtitle, 
  role = "cs",
  showSearch = true, 
  showInputButton = false,
  rightContent = null,
}) => {
  const navigate = useNavigate();
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
    <header className="fixed top-0 left-72 right-0 h-20 bg-white/90 backdrop-blur-xl border-b border-slate-200/80 z-40 flex items-center justify-between px-6 transition-all">
      {/* Title Section */}
      <div className="flex flex-col">
        <h1 className="text-xl font-bold text-slate-900 tracking-tight">{title}</h1>
        {subtitle && (
          <p className="text-xs text-slate-500 mt-0.5">{subtitle}</p>
        )}
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-3.5">
        {showSearch && (
          <div className="relative flex items-center">
            <Search className="w-4 h-4 absolute left-3.5 text-slate-400 pointer-events-none" />
            <input
              className="w-64 lg:w-72 bg-slate-100/80 border border-slate-200 pl-10 pr-3.5 py-2 rounded-full text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:bg-white focus:border-slate-400 transition-all"
              placeholder="Cari tiket, pelanggan, atau SKU..."
              type="text"
            />
          </div>
        )}

        {showInputButton && (
          <button 
            onClick={() => navigate(role === "admin" ? "/admin/new-complaint" : "/cs/new-complaint")}
            className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#141414] text-white text-xs md:text-sm font-medium hover:bg-[#2B2B2B] active:bg-[#0A0A0A] transition-colors cursor-pointer shadow-none"
          >
            <Plus className="w-4 h-4" />
            <span>Input Keluhan</span>
          </button>
        )}

        {rightContent}

        {/* User Profile with Dynamic Gender Avatar */}
        <div className="flex items-center gap-3 pl-3 border-l border-slate-200">
          <div className="relative w-9 h-9 rounded-full overflow-hidden ring-2 ring-[#7C5CFF]/30 shadow-sm shrink-0">
            <img 
              src={avatarSrc} 
              alt={displayName} 
              className="w-full h-full object-cover"
            />
          </div>
          <div className="hidden xl:flex flex-col text-left">
            <span className="text-xs font-semibold text-[#1E1B4B] leading-none">
              {displayName}
            </span>
            <span className="text-[11px] text-[#7C5CFF] font-medium leading-tight mt-1">
              {baseUser.roleLabel}
            </span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default TopBar;