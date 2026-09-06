import { Navigate } from 'react-router-dom';
import { useAdminAuth } from '../context/AdminAuthContext';

export function ProtectedRoute({ children }) {
  const { token, checking } = useAdminAuth();

  if (checking) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#05070C] text-sm text-[#5B677E]">
        Checking session…
      </div>
    );
  }

  if (!token) {
    return <Navigate to="/admin/login" replace />;
  }

  return children;
}