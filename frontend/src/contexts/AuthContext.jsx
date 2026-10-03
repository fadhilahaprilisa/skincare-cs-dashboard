import { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { authAPI, getErrorMessage } from "../lib/api";
import { tokenStorage } from "../lib/auth";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => tokenStorage.getUser());
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // ===== VERIFY TOKEN SAAT LOAD (auto-login kalau token valid) =====
  useEffect(() => {
    const verifyToken = async () => {
      const token = tokenStorage.getToken();
      if (!token) return;

      try {
        setIsLoading(true);
        const userData = await authAPI.me();
        setUser(userData);
        tokenStorage.setUser(userData);
      } catch (err) {
        // Token invalid / expired → clear
        tokenStorage.clear();
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    };

    // Hanya verify kalau ada user di state tapi ingin refresh dari server
    if (user) verifyToken();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // ===== LOGIN =====
  const login = async (email, password, role) => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await authAPI.login(email, password, role);
      tokenStorage.setToken(data.access_token);
      tokenStorage.setUser(data.user);
      setUser(data.user);
      return data.user; // Return user untuk redirect logic
    } catch (err) {
      const message = getErrorMessage(err);
      setError(message);
      throw new Error(message);
    } finally {
      setIsLoading(false);
    }
  };

  // ===== LOGOUT =====
  const logout = () => {
    tokenStorage.clear();
    setUser(null);
    setError(null);
  };

  // ===== HELPERS =====
  const isAuthenticated = !!user;
  const isAdmin = user?.role === "admin";
  const isCS = user?.role === "cs";

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        error,
        login,
        logout,
        isAuthenticated,
        isAdmin,
        isCS,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
};