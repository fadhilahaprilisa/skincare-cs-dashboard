import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

/**
 * ProtectedRoute — Guard untuk halaman yang butuh login.
 * 
 * @param {string[]} allowedRoles - Optional. ["admin"] atau ["cs"]. Kalau kosong, semua role boleh.
 */
export const ProtectedRoute = ({ children, allowedRoles = [] }) => {
  const { user, isAuthenticated } = useAuth();
  const location = useLocation();

  // Belum login → redirect ke login
  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Role tidak sesuai → redirect ke dashboard yang benar
  if (allowedRoles.length > 0 && !allowedRoles.includes(user.role)) {
    const redirectPath = user.role === "admin" ? "/admin/dashboard" : "/cs/dashboard";
    return <Navigate to={redirectPath} replace />;
  }

  return children;
};

export default ProtectedRoute;