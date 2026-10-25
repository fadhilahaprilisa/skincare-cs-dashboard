import { useNavigate } from "react-router-dom";
import Card from "../components/ui/Card";
import Button from "../components/ui/Button";
import { useAuth } from "../contexts/AuthContext";

const UnauthorizedPage = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleGoBack = () => {
    const path = user?.role === "admin" ? "/admin/dashboard" : "/cs/dashboard";
    navigate(path);
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-surface flex items-center justify-center p-6">
      <Card tier="base" className="p-12 max-w-lg text-center">
        <span className="material-symbols-outlined text-[#FF4D4D] text-[80px] mb-4">
          lock_person
        </span>
        <h1 className="text-headline-lg text-primary font-bold">
          Akses Ditolak
        </h1>
        <p className="text-body-md text-on-surface-variant mt-3">
          Kamu tidak memiliki izin untuk mengakses halaman ini. Role kamu saat ini:{" "}
          <strong className="text-brand-cyan">{user?.role_label || user?.role}</strong>
        </p>
        <div className="flex items-center justify-center gap-3 mt-6">
          <Button variant="secondary" size="md" icon="arrow_back" onClick={handleGoBack}>
            Kembali ke Dashboard
          </Button>
          <Button variant="primary" size="md" icon="logout" onClick={handleLogout}>
            Logout
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default UnauthorizedPage;