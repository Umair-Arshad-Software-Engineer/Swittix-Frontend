// src/admin/AdminLogin.jsx
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAdminAuth } from '../context/AdminAuthContext';

export function AdminLogin() {
  const { login, token } = useAdminAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (token) {
      navigate('/admin', { replace: true });
    }
  }, [token, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSubmitting(true);
    try {
      await login(email, password);
      navigate('/admin', { replace: true });
    } catch (err) {
      console.error('Login error:', err);
      setError(err.message || 'Login failed.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#05070C] px-5">
      <div className="w-full max-w-[400px] rounded-2xl border border-[#1A2233] bg-[#0A0E17] p-8 shadow-2xl">
        <p className="text-center text-lg font-extrabold tracking-tight text-[#F3F6FB]">
          SWITTIX ADMIN
        </p>
        <p className="mt-1 text-center text-sm text-[#5B677E]">
          Sign in to view project requests
        </p>

        <form onSubmit={handleSubmit} className="mt-7 flex flex-col gap-4">
          <div>
            <label className="mb-1.5 block text-xs font-bold text-[#93A0B8]">Email</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="username"
              className="w-full rounded-lg border border-[#1A2233] bg-[#05070C] px-3.5 py-2.5 text-sm text-[#F3F6FB] outline-none transition-colors focus:border-[#2F6FED]"
              placeholder="you@swittix.com"
            />
          </div>
          <div>
            <label className="mb-1.5 block text-xs font-bold text-[#93A0B8]">Password</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
              className="w-full rounded-lg border border-[#1A2233] bg-[#05070C] px-3.5 py-2.5 text-sm text-[#F3F6FB] outline-none transition-colors focus:border-[#2F6FED]"
              placeholder="••••••••"
            />
          </div>

          {error && <p className="text-xs font-semibold text-[#EF4444]">{error}</p>}

          <button
            type="submit"
            disabled={submitting}
            className="mt-2 rounded-lg py-3 text-sm font-bold text-white transition-opacity disabled:opacity-60"
            style={{ background: 'linear-gradient(to bottom right,#2F6FED,#1B3E99)' }}
          >
            {submitting ? 'Signing in…' : 'Sign In'}
          </button>
        </form>
      </div>
    </div>
  );
}