// AdminAuthContext.jsx
import { createContext, useCallback, useContext, useEffect, useState } from 'react';

const AdminAuthContext = createContext(null);
const TOKEN_KEY = 'swittix_admin_token';

// When using Vite proxy, we can use relative URLs
export const API_BASE = ''; // Use empty string for relative URLs

export function AdminAuthProvider({ children }) {
  const [token, setToken] = useState(() => localStorage.getItem(TOKEN_KEY));
  const [admin, setAdmin] = useState(null);
  const [checking, setChecking] = useState(true);

  const logout = useCallback(() => {
    localStorage.removeItem(TOKEN_KEY);
    setToken(null);
    setAdmin(null);
  }, []);

  useEffect(() => {
    if (!token) {
      setChecking(false);
      return;
    }
    let cancelled = false;

    (async () => {
      try {
        // Use relative URL - proxy will handle it
        const res = await fetch('/api/auth/me', {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!res.ok) throw new Error('Invalid session');
        const json = await res.json();
        if (!cancelled) setAdmin(json.data);
      } catch {
        if (!cancelled) logout();
      } finally {
        if (!cancelled) setChecking(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [token, logout]);

  const login = async (email, password) => {
    try {
      // Use relative URL - proxy will handle it
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      
      const json = await res.json();
      
      if (!res.ok || !json.success) {
        throw new Error(json.message || 'Login failed.');
      }
      
      localStorage.setItem(TOKEN_KEY, json.data.token);
      setToken(json.data.token);
      setAdmin(json.data.admin);
      return json.data.admin;
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  };

  return (
    <AdminAuthContext.Provider value={{ token, admin, checking, login, logout }}>
      {children}
    </AdminAuthContext.Provider>
  );
}

export function useAdminAuth() {
  const ctx = useContext(AdminAuthContext);
  if (!ctx) throw new Error('useAdminAuth must be used within AdminAuthProvider');
  return ctx;
}