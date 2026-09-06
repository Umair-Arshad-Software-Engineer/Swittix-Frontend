import { useCallback, useEffect, useState } from 'react';
import { useAdminAuth, API_BASE } from '../context/AdminAuthContext';

const STATUS_OPTIONS = ['new', 'reviewing', 'contacted', 'closed'];
const CONTACT_STATUS_OPTIONS = ['new', 'contacted', 'closed'];
const STATUS_COLORS = {
  new: '#3B82F6',
  reviewing: '#F59E0B',
  contacted: '#22D3EE',
  closed: '#5B677E',
};

function StatusBadge({ status }) {
  const color = STATUS_COLORS[status] || '#93A0B8';
  return (
    <span
      className="rounded-full px-2.5 py-1 text-[11px] font-bold uppercase tracking-wide"
      style={{ color, background: `${color}1A` }}
    >
      {status}
    </span>
  );
}

function Field({ label, value }) {
  if (!value) return null;
  return (
    <div>
      <p className="text-[11px] font-bold uppercase tracking-wide text-[#5B677E]">{label}</p>
      <p className="mt-1 text-sm text-[#F3F6FB]">{value}</p>
    </div>
  );
}

function TagList({ label, items }) {
  if (!Array.isArray(items) || items.length === 0) return null;
  return (
    <div className="mt-4">
      <p className="text-[11px] font-bold uppercase tracking-wide text-[#5B677E]">{label}</p>
      <div className="mt-1.5 flex flex-wrap gap-1.5">
        {items.map((item) => (
          <span
            key={item}
            className="rounded-full border border-[#1A2233] px-2.5 py-1 text-xs text-[#93A0B8]"
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}

/** Small pill toggle at the top of the dashboard for switching data sets. */
function TabButton({ label, count, active, onClick }) {
  return (
    <button
      onClick={onClick}
      className="rounded-lg px-4 py-2 text-sm font-semibold transition-colors"
      style={{
        color: active ? '#F3F6FB' : '#93A0B8',
        background: active ? '#1A2233' : 'transparent',
      }}
    >
      {label}
      {typeof count === 'number' && (
        <span className="ml-2 text-xs font-bold text-[#5B677E]">{count}</span>
      )}
    </button>
  );
}

function DetailDrawer({ request, onClose, onStatusChange }) {
  if (!request) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      <div className="absolute inset-0 bg-black/60" onClick={onClose} />
      <div className="relative flex h-full w-full max-w-[480px] flex-col overflow-y-auto border-l border-[#1A2233] bg-[#0A0E17] p-6">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-lg font-extrabold text-[#F3F6FB]">{request.fullName}</p>
            <p className="text-sm text-[#93A0B8]">{request.email}</p>
          </div>
          <button onClick={onClose} className="text-[#93A0B8] transition-colors hover:text-[#F3F6FB]">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
              <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        <div className="mt-5 flex items-center gap-2">
          <StatusBadge status={request.status} />
          <select
            value={request.status}
            onChange={(e) => onStatusChange(request.id, e.target.value)}
            className="rounded-md border border-[#1A2233] bg-[#05070C] px-2 py-1 text-xs text-[#F3F6FB]"
          >
            {STATUS_OPTIONS.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>

        <div className="mt-6 grid grid-cols-2 gap-4">
          <Field label="Phone" value={request.phone} />
          <Field label="Company" value={request.company} />
          <Field label="Project Type" value={request.projectType} />
          <Field label="Budget" value={request.budget} />
          <Field label="Timeline" value={request.timeline} />
          <Field label="Existing System" value={request.hasExistingSystem} />
        </div>

        <TagList label="Platforms" items={request.platforms} />
        <TagList label="Tech Preferences" items={request.techPreferences} />

        <div className="mt-5">
          <p className="text-[11px] font-bold uppercase tracking-wide text-[#5B677E]">Description</p>
          <p className="mt-1.5 whitespace-pre-line text-sm leading-relaxed text-[#93A0B8]">
            {request.description}
          </p>
        </div>

        {request.goals && (
          <div className="mt-5">
            <p className="text-[11px] font-bold uppercase tracking-wide text-[#5B677E]">Goals</p>
            <p className="mt-1.5 whitespace-pre-line text-sm leading-relaxed text-[#93A0B8]">
              {request.goals}
            </p>
          </div>
        )}

        {request.referenceLinks && (
          <div className="mt-5">
            <p className="text-[11px] font-bold uppercase tracking-wide text-[#5B677E]">
              Reference Links
            </p>
            <p className="mt-1.5 whitespace-pre-line text-sm leading-relaxed text-[#6FA0FF]">
              {request.referenceLinks}
            </p>
          </div>
        )}

        {Array.isArray(request.files) && request.files.length > 0 && (
          <div className="mt-5">
            <p className="text-[11px] font-bold uppercase tracking-wide text-[#5B677E]">
              Attachments
            </p>
            <div className="mt-1.5 flex flex-col gap-1.5">
              {request.files.map((f, i) => {
                const relPath = typeof f?.relativePath === 'string' ? f.relativePath.replace(/\\/g, '/') : null;
                return (
                  <a
                    key={f?.id ?? i}
                    href={relPath ? `${API_BASE}/uploads/${relPath}` : '#'}
                    target="_blank"
                    rel="noreferrer"
                    className="truncate text-sm text-[#6FA0FF] hover:underline"
                  >
                    {f?.originalName || 'Attachment'}
                  </a>
                );
              })}
            </div>
          </div>
        )}

        <p className="mt-6 text-xs text-[#5B677E]">
          Submitted {new Date(request.createdAt).toLocaleString()}
        </p>
      </div>
    </div>
  );
}

/** Lighter drawer for contact messages — just name, phone, description, status. */
function ContactDetailDrawer({ message, onClose, onStatusChange }) {
  if (!message) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      <div className="absolute inset-0 bg-black/60" onClick={onClose} />
      <div className="relative flex h-full w-full max-w-[480px] flex-col overflow-y-auto border-l border-[#1A2233] bg-[#0A0E17] p-6">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-lg font-extrabold text-[#F3F6FB]">{message.fullName}</p>
            <p className="text-sm text-[#93A0B8]">{message.phone}</p>
          </div>
          <button onClick={onClose} className="text-[#93A0B8] transition-colors hover:text-[#F3F6FB]">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
              <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        <div className="mt-5 flex items-center gap-2">
          <StatusBadge status={message.status} />
          <select
            value={message.status}
            onChange={(e) => onStatusChange(message.id, e.target.value)}
            className="rounded-md border border-[#1A2233] bg-[#05070C] px-2 py-1 text-xs text-[#F3F6FB]"
          >
            {CONTACT_STATUS_OPTIONS.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>

        <div className="mt-5">
          <p className="text-[11px] font-bold uppercase tracking-wide text-[#5B677E]">Message</p>
          <p className="mt-1.5 whitespace-pre-line text-sm leading-relaxed text-[#93A0B8]">
            {message.description}
          </p>
        </div>

        <p className="mt-6 text-xs text-[#5B677E]">
          Submitted {new Date(message.createdAt).toLocaleString()}
        </p>
      </div>
    </div>
  );
}

export function AdminDashboard() {
  const { token, admin, logout } = useAdminAuth();
  const [view, setView] = useState('projects'); // 'projects' | 'contacts'

  // ---- Project requests state ----
  const [requests, setRequests] = useState([]);
  const [pagination, setPagination] = useState({ page: 1, totalPages: 1, total: 0 });
  const [statusFilter, setStatusFilter] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selected, setSelected] = useState(null);

  // ---- Contact messages state ----
  const [contacts, setContacts] = useState([]);
  const [contactPagination, setContactPagination] = useState({ page: 1, totalPages: 1, total: 0 });
  const [contactStatusFilter, setContactStatusFilter] = useState('');
  const [contactLoading, setContactLoading] = useState(true);
  const [contactError, setContactError] = useState('');
  const [selectedContact, setSelectedContact] = useState(null);

  const fetchRequests = useCallback(
    async (page = 1) => {
      setLoading(true);
      setError('');
      try {
        const params = new URLSearchParams({ page: String(page), limit: '20' });
        if (statusFilter) params.set('status', statusFilter);

        const res = await fetch(`${API_BASE}/api/project-requests?${params}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (res.status === 401) {
          logout();
          return;
        }

        const json = await res.json();
        if (!json.success) throw new Error(json.message || 'Failed to load requests.');

        setRequests(json.data);
        setPagination(json.pagination);
      } catch (err) {
        setError(err.message || 'Failed to load requests.');
      } finally {
        setLoading(false);
      }
    },
    [statusFilter, token, logout]
  );

  const fetchContacts = useCallback(
    async (page = 1) => {
      setContactLoading(true);
      setContactError('');
      try {
        const params = new URLSearchParams({ page: String(page), limit: '20' });
        if (contactStatusFilter) params.set('status', contactStatusFilter);

        const res = await fetch(`${API_BASE}/api/contact-messages?${params}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (res.status === 401) {
          logout();
          return;
        }

        const json = await res.json();
        if (!json.success) throw new Error(json.message || 'Failed to load contact messages.');

        setContacts(json.data);
        setContactPagination(json.pagination);
      } catch (err) {
        setContactError(err.message || 'Failed to load contact messages.');
      } finally {
        setContactLoading(false);
      }
    },
    [contactStatusFilter, token, logout]
  );

  useEffect(() => {
    fetchRequests(1);
  }, [fetchRequests]);

  useEffect(() => {
    fetchContacts(1);
  }, [fetchContacts]);

  const handleStatusChange = async (id, status) => {
    try {
      const res = await fetch(`${API_BASE}/api/project-requests/${id}/status`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ status }),
      });
      const json = await res.json();
      if (!json.success) throw new Error(json.message);

      setRequests((rs) => rs.map((r) => (r.id === id ? { ...r, status } : r)));
      setSelected((s) => (s && s.id === id ? { ...s, status } : s));
    } catch (err) {
      alert(err.message || 'Failed to update status.');
    }
  };

  const handleContactStatusChange = async (id, status) => {
    try {
      const res = await fetch(`${API_BASE}/api/contact-messages/${id}/status`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ status }),
      });
      const json = await res.json();
      if (!json.success) throw new Error(json.message);

      setContacts((cs) => cs.map((c) => (c.id === id ? { ...c, status } : c)));
      setSelectedContact((s) => (s && s.id === id ? { ...s, status } : s));
    } catch (err) {
      alert(err.message || 'Failed to update status.');
    }
  };

  return (
    <div className="min-h-screen bg-[#05070C] px-5 py-8 sm:px-10">
      <div className="mx-auto max-w-[1200px]">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-2xl font-extrabold text-[#F3F6FB]">
              {view === 'projects' ? 'Project Requests' : 'Contact Messages'}
            </p>
            <p className="mt-1 text-sm text-[#5B677E]">
              {view === 'projects' ? pagination.total : contactPagination.total} total
              {admin ? ` · signed in as ${admin.email}` : ''}
            </p>
          </div>
          <button
            onClick={logout}
            className="rounded-lg border border-[#1A2233] px-3.5 py-2 text-sm font-semibold text-[#93A0B8] transition-colors hover:text-[#F3F6FB]"
          >
            Sign Out
          </button>
        </div>

        {/* Tab switcher */}
        <div className="mt-6 flex w-fit gap-1 rounded-xl border border-[#1A2233] bg-[#0A0E17] p-1">
          <TabButton
            label="Project Requests"
            count={pagination.total}
            active={view === 'projects'}
            onClick={() => setView('projects')}
          />
          <TabButton
            label="Contact Messages"
            count={contactPagination.total}
            active={view === 'contacts'}
            onClick={() => setView('contacts')}
          />
        </div>

        {view === 'projects' ? (
          <>
            <div className="mt-5 flex justify-end">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="rounded-lg border border-[#1A2233] bg-[#0A0E17] px-3 py-2 text-sm text-[#F3F6FB]"
              >
                <option value="">All statuses</option>
                {STATUS_OPTIONS.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </div>

            <div className="mt-4 overflow-hidden rounded-2xl border border-[#1A2233]">
              <div className="overflow-x-auto">
                <table className="w-full min-w-[720px] text-left text-sm">
                  <thead>
                    <tr className="border-b border-[#1A2233] bg-[#0A0E17] text-xs font-bold uppercase tracking-wide text-[#5B677E]">
                      <th className="px-4 py-3">Name</th>
                      <th className="px-4 py-3">Project Type</th>
                      <th className="px-4 py-3">Budget</th>
                      <th className="px-4 py-3">Status</th>
                      <th className="px-4 py-3">Submitted</th>
                    </tr>
                  </thead>
                  <tbody>
                    {requests.map((r) => (
                      <tr
                        key={r.id}
                        onClick={() => setSelected(r)}
                        className="cursor-pointer border-b border-[#1A2233] bg-[#05070C] transition-colors hover:bg-[#0A0E17]"
                      >
                        <td className="px-4 py-3.5">
                          <p className="font-semibold text-[#F3F6FB]">{r.fullName}</p>
                          <p className="text-xs text-[#5B677E]">{r.email}</p>
                        </td>
                        <td className="px-4 py-3.5 text-[#93A0B8]">{r.projectType}</td>
                        <td className="px-4 py-3.5 text-[#93A0B8]">{r.budget || '—'}</td>
                        <td className="px-4 py-3.5">
                          <StatusBadge status={r.status} />
                        </td>
                        <td className="px-4 py-3.5 text-[#5B677E]">
                          {new Date(r.createdAt).toLocaleDateString()}
                        </td>
                      </tr>
                    ))}
                    {!loading && requests.length === 0 && (
                      <tr>
                        <td colSpan={5} className="px-4 py-10 text-center text-[#5B677E]">
                          No project requests yet.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            {loading && <p className="mt-4 text-sm text-[#5B677E]">Loading…</p>}
            {error && <p className="mt-4 text-sm font-semibold text-[#EF4444]">{error}</p>}

            {pagination.totalPages > 1 && (
              <div className="mt-5 flex items-center justify-center gap-2">
                {Array.from({ length: pagination.totalPages }, (_, i) => i + 1).map((p) => (
                  <button
                    key={p}
                    onClick={() => fetchRequests(p)}
                    className={`h-8 w-8 rounded-lg text-xs font-bold transition-colors ${
                      p === pagination.page
                        ? 'bg-[#2F6FED] text-white'
                        : 'bg-[#0A0E17] text-[#93A0B8] hover:text-[#F3F6FB]'
                    }`}
                  >
                    {p}
                  </button>
                ))}
              </div>
            )}
          </>
        ) : (
          <>
            <div className="mt-5 flex justify-end">
              <select
                value={contactStatusFilter}
                onChange={(e) => setContactStatusFilter(e.target.value)}
                className="rounded-lg border border-[#1A2233] bg-[#0A0E17] px-3 py-2 text-sm text-[#F3F6FB]"
              >
                <option value="">All statuses</option>
                {CONTACT_STATUS_OPTIONS.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </div>

            <div className="mt-4 overflow-hidden rounded-2xl border border-[#1A2233]">
              <div className="overflow-x-auto">
                <table className="w-full min-w-[720px] text-left text-sm">
                  <thead>
                    <tr className="border-b border-[#1A2233] bg-[#0A0E17] text-xs font-bold uppercase tracking-wide text-[#5B677E]">
                      <th className="px-4 py-3">Name</th>
                      <th className="px-4 py-3">Phone</th>
                      <th className="px-4 py-3">Message</th>
                      <th className="px-4 py-3">Status</th>
                      <th className="px-4 py-3">Submitted</th>
                    </tr>
                  </thead>
                  <tbody>
                    {contacts.map((c) => (
                      <tr
                        key={c.id}
                        onClick={() => setSelectedContact(c)}
                        className="cursor-pointer border-b border-[#1A2233] bg-[#05070C] transition-colors hover:bg-[#0A0E17]"
                      >
                        <td className="px-4 py-3.5 font-semibold text-[#F3F6FB]">{c.fullName}</td>
                        <td className="px-4 py-3.5 text-[#93A0B8]">{c.phone}</td>
                        <td className="max-w-[320px] truncate px-4 py-3.5 text-[#93A0B8]">
                          {c.description}
                        </td>
                        <td className="px-4 py-3.5">
                          <StatusBadge status={c.status} />
                        </td>
                        <td className="px-4 py-3.5 text-[#5B677E]">
                          {new Date(c.createdAt).toLocaleDateString()}
                        </td>
                      </tr>
                    ))}
                    {!contactLoading && contacts.length === 0 && (
                      <tr>
                        <td colSpan={5} className="px-4 py-10 text-center text-[#5B677E]">
                          No contact messages yet.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            {contactLoading && <p className="mt-4 text-sm text-[#5B677E]">Loading…</p>}
            {contactError && <p className="mt-4 text-sm font-semibold text-[#EF4444]">{contactError}</p>}

            {contactPagination.totalPages > 1 && (
              <div className="mt-5 flex items-center justify-center gap-2">
                {Array.from({ length: contactPagination.totalPages }, (_, i) => i + 1).map((p) => (
                  <button
                    key={p}
                    onClick={() => fetchContacts(p)}
                    className={`h-8 w-8 rounded-lg text-xs font-bold transition-colors ${
                      p === contactPagination.page
                        ? 'bg-[#2F6FED] text-white'
                        : 'bg-[#0A0E17] text-[#93A0B8] hover:text-[#F3F6FB]'
                    }`}
                  >
                    {p}
                  </button>
                ))}
              </div>
            )}
          </>
        )}
      </div>

      <DetailDrawer
        request={selected}
        onClose={() => setSelected(null)}
        onStatusChange={handleStatusChange}
      />
      <ContactDetailDrawer
        message={selectedContact}
        onClose={() => setSelectedContact(null)}
        onStatusChange={handleContactStatusChange}
      />
    </div>
  );
}