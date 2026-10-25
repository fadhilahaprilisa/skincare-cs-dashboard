import React from 'react';

const DashboardLayout = ({ children }) => {
  return (
    <div className="min-h-screen bg-bg-primary">
      {/* Header dengan gradient biru-ungu */}
      <header className="bg-gradient-to-r from-blue-700 to-purple-700 shadow-lg py-4 px-6 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-wide">✨ Lumière Skin</h1>
          <p className="text-xs text-blue-100 mt-0.5 font-light tracking-wider">
            Nuansa premium, berkesan bersinar dan sehat
          </p>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-sm text-blue-100">Welcome, Admin</span>
          <div className="w-8 h-8 rounded-full bg-white/20 border-2 border-white/40 flex items-center justify-center text-white font-semibold">
            A
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-6">
        {children}
      </main>
    </div>
  );
};

export default DashboardLayout;