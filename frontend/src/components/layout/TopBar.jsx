import { currentUser } from "../../data/mockData";

export const TopBar = ({ 
  title, 
  subtitle, 
  role = "cs",  // <-- TAMBAHAN: prop role
  showSearch = true, 
  showInputButton = false,
  rightContent = null,
}) => {
  const user = role === "admin" ? currentUser.admin : currentUser.cs;

  return (
    <header className="fixed top-0 left-72 right-0 h-20 bg-surface/85 backdrop-blur-xl border-b border-outline-variant/20 z-40 flex items-center justify-between px-6">
      {/* Title Section */}
      <div className="flex flex-col">
        <h1 className="text-headline-md text-on-surface font-semibold">{title}</h1>
        {subtitle && (
          <p className="text-body-sm text-on-surface-variant">{subtitle}</p>
        )}
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-4">
        {showSearch && (
          <div className="relative flex items-center">
            <span className="material-symbols-outlined absolute left-3 text-on-surface-variant text-[18px] pointer-events-none">
              search
            </span>
            <input
              className="w-72 bg-surface-container pl-10 pr-3 py-2 rounded-lg text-body-sm text-on-surface placeholder:text-on-surface-variant/60 focus:outline-none focus:ring-1 focus:ring-primary-container transition-all"
              placeholder="Cari tiket, pelanggan, atau SKU..."
              type="text"
            />
          </div>
        )}

        {showInputButton && (
          <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary-container text-on-primary-container text-headline-sm hover:brightness-105 shadow-cyan-glow transition-all">
            <span className="material-symbols-outlined text-[18px]">add</span>
            Input Keluhan Customer
          </button>
        )}

        {rightContent}

        {/* Notifications */}
        <div className="relative flex items-center justify-center p-2 rounded-lg hover:bg-surface-container-high transition-colors cursor-pointer">
          <span className="material-symbols-outlined text-on-surface-variant text-[20px]">
            notifications
          </span>
          <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-error ring-2 ring-surface"></span>
        </div>

        {/* User Profile - sekarang dinamis! */}
        <div className="flex items-center gap-3 pl-3 border-l border-outline-variant/30">
          <div className="w-9 h-9 rounded-full bg-gradient-to-br from-brand-violet to-brand-cyan flex items-center justify-center text-white text-label-md font-bold">
            {user.initials}
          </div>
          <div className="hidden xl:flex flex-col text-left">
            <span className="text-label-md text-on-surface font-semibold leading-none">
              {user.name}
            </span>
            <span className="text-label-sm text-on-surface-variant leading-tight mt-0.5">
              {user.roleLabel}
            </span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default TopBar;