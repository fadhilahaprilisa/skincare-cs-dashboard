import React, { createContext, useContext, useState, useCallback, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { 
  CheckCircle2, 
  AlertTriangle, 
  XCircle, 
  Info, 
  Loader2, 
  Copy, 
  Sparkles, 
  X 
} from "lucide-react";

const ToastContext = createContext(null);

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);
  const timersRef = useRef({});

  // Auto-dismiss helper with pause/resume capability
  const startTimer = useCallback((id, duration = 4000) => {
    if (duration <= 0) return;
    if (timersRef.current[id]) clearTimeout(timersRef.current[id].timerId);
    
    const startTime = Date.now();
    const timerId = setTimeout(() => {
      dismissToast(id);
    }, duration);

    timersRef.current[id] = { timerId, remaining: duration, startTime };
  }, []);

  const pauseTimer = useCallback((id) => {
    const entry = timersRef.current[id];
    if (!entry) return;
    clearTimeout(entry.timerId);
    const elapsed = Date.now() - entry.startTime;
    entry.remaining = Math.max(1000, entry.remaining - elapsed);
  }, []);

  const resumeTimer = useCallback((id) => {
    const entry = timersRef.current[id];
    if (!entry) return;
    startTimer(id, entry.remaining);
  }, [startTimer]);

  const dismissToast = useCallback((id) => {
    if (timersRef.current[id]) {
      clearTimeout(timersRef.current[id].timerId);
      delete timersRef.current[id];
    }
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  /**
   * toast(options | title):
   * options: {
   *   id?: string,
   *   type?: 'success' | 'loading' | 'error' | 'warning' | 'info' | 'copy',
   *   title: string,
   *   description?: string,
   *   duration?: number (default: 4000ms),
   *   action?: { label: string, onClick: () => void },
   * }
   */
  const showToast = useCallback((options) => {
    const id = options.id || `toast-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`;
    const duration = options.duration !== undefined ? options.duration : (options.type === "loading" ? 0 : 4000);

    const toastItem = {
      id,
      type: options.type || "info",
      title: typeof options === "string" ? options : options.title,
      description: options.description,
      action: options.action,
      duration,
    };

    setToasts((prev) => {
      const existingIdx = prev.findIndex((t) => t.id === id);
      if (existingIdx > -1) {
        const updated = [...prev];
        updated[existingIdx] = toastItem;
        return updated;
      }
      // Limit to 4 visible toasts max for clean screen estate
      return [...prev.slice(-3), toastItem];
    });

    if (duration > 0) {
      startTimer(id, duration);
    }

    return id;
  }, [startTimer]);

  // Convenience helper methods
  const toast = useCallback((title, opts = {}) => {
    return showToast({ title, ...opts });
  }, [showToast]);

  toast.success = (title, opts = {}) => showToast({ type: "success", title, ...opts });
  toast.error = (title, opts = {}) => showToast({ type: "error", title, ...opts });
  toast.loading = (title, opts = {}) => showToast({ type: "loading", title, duration: 0, ...opts });
  toast.info = (title, opts = {}) => showToast({ type: "info", title, ...opts });
  toast.warning = (title, opts = {}) => showToast({ type: "warning", title, ...opts });
  toast.copy = (title, opts = {}) => showToast({ type: "copy", title, ...opts });
  toast.dismiss = dismissToast;

  return (
    <ToastContext.Provider value={toast}>
      {children}
      {/* Toast Floating Container - Top-Right Desktop Screen Estate */}
      <div 
        aria-live="polite"
        className="fixed top-6 right-6 z-[9999] flex flex-col gap-2.5 max-w-sm w-full pointer-events-none"
      >
        <AnimatePresence mode="popLayout">
          {toasts.map((item) => (
            <ToastItem
              key={item.id}
              toast={item}
              onDismiss={() => dismissToast(item.id)}
              onMouseEnter={() => pauseTimer(item.id)}
              onMouseLeave={() => resumeTimer(item.id)}
            />
          ))}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
};

// 5-Element Anatomy Toast Item Component
const ToastItem = ({ toast, onDismiss, onMouseEnter, onMouseLeave }) => {
  const getIcon = () => {
    switch (toast.type) {
      case "success":
        return (
          <div className="w-8 h-8 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 flex items-center justify-center shrink-0">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          </div>
        );
      case "loading":
        return (
          <div className="w-8 h-8 rounded-xl bg-slate-900/10 border border-slate-900/20 text-slate-800 flex items-center justify-center shrink-0">
            <Loader2 className="w-4 h-4 text-slate-800 animate-spin" />
          </div>
        );
      case "error":
        return (
          <div className="w-8 h-8 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-600 flex items-center justify-center shrink-0">
            <XCircle className="w-4 h-4 text-rose-600" />
          </div>
        );
      case "warning":
        return (
          <div className="w-8 h-8 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-600 flex items-center justify-center shrink-0">
            <AlertTriangle className="w-4 h-4 text-amber-600" />
          </div>
        );
      case "copy":
        return (
          <div className="w-8 h-8 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-600 flex items-center justify-center shrink-0">
            <Copy className="w-4 h-4 text-indigo-600" />
          </div>
        );
      case "info":
      default:
        return (
          <div className="w-8 h-8 rounded-xl bg-[#7C5CFF]/10 border border-[#7C5CFF]/20 text-[#7C5CFF] flex items-center justify-center shrink-0">
            <Sparkles className="w-4 h-4 text-[#7C5CFF]" />
          </div>
        );
    }
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: -16, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -10, scale: 0.95 }}
      transition={{ type: "spring", stiffness: 400, damping: 30 }}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      className="pointer-events-auto w-full bg-white/95 backdrop-blur-md rounded-2xl border border-slate-200/80 shadow-[0_12px_32px_rgba(15,23,42,0.08)] px-4 py-3 flex items-center gap-3.5 transition-all group"
    >
      {/* 2. Supporting Icon */}
      {getIcon()}

      {/* 3. Supporting Text */}
      <div className="flex-1 min-w-0">
        <h4 className="text-xs md:text-sm font-semibold text-slate-900 leading-tight truncate">
          {toast.title}
        </h4>
        {toast.description && (
          <p className="text-[11px] text-slate-500 mt-0.5 leading-snug line-clamp-2">
            {toast.description}
          </p>
        )}
      </div>

      {/* 4. Action Button (Optional) */}
      {toast.action && (
        <button
          type="button"
          onClick={() => {
            if (toast.action.onClick) toast.action.onClick();
            onDismiss();
          }}
          className="text-xs font-semibold text-slate-900 hover:text-slate-700 underline underline-offset-2 shrink-0 cursor-pointer active:scale-95 transition-transform"
        >
          {toast.action.label}
        </button>
      )}

      {/* 5. Close Button / Dismiss Icon */}
      <button
        type="button"
        onClick={onDismiss}
        className="p-1 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors shrink-0 cursor-pointer"
        aria-label="Tutup notifikasi"
      >
        <X className="w-3.5 h-3.5" />
      </button>
    </motion.div>
  );
};
