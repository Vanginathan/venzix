// src/pages/Admin.tsx
// Route: /admin  (add to your router — see instructions below)
// Protected by a simple password gate so it isn't public.

import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

const ADMIN_PASS = import.meta.env.VITE_ADMIN_PASSWORD ?? "venzix2026";

type Lead = {
  id: string;
  created_at: string;
  name: string;
  phone: string;
  email: string;
  website: string | null;
  project_type: string;
  budget: string | null;
  message: string | null;
};

const fmt = (iso: string) =>
  new Date(iso).toLocaleString("en-IN", {
    day: "2-digit", month: "short", year: "numeric",
    hour: "2-digit", minute: "2-digit",
  });

export default function Admin() {
  const [authed, setAuthed]   = useState(false);
  const [pass, setPass]       = useState("");
  const [leads, setLeads]     = useState<Lead[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError]     = useState<string | null>(null);

  // ── auth ────────────────────────────────────────────────
  const login = (e: React.FormEvent) => {
    e.preventDefault();
    if (pass === ADMIN_PASS) {
      setAuthed(true);
    } else {
      setError("Wrong password.");
    }
  };

  // ── fetch leads ─────────────────────────────────────────
  useEffect(() => {
    if (!authed) return;
    setLoading(true);
    supabase
      .from("contact_submissions")
      .select("*")
      .order("created_at", { ascending: false })
      .then(({ data, error: err }) => {
        if (err) setError(err.message);
        else setLeads((data as Lead[]) ?? []);
        setLoading(false);
      });
  }, [authed]);

  // ── password gate ────────────────────────────────────────
  if (!authed) {
    return (
      <div className="min-h-screen bg-surface flex items-center justify-center">
        <form onSubmit={login} className="bg-white border border-line rounded-lg p-8 w-full max-w-sm space-y-4 shadow-sm">
          <h1 className="font-heading font-bold text-xl text-ink">Admin — Venzix Leads</h1>
          <input
            type="password"
            value={pass}
            onChange={(e) => setPass(e.target.value)}
            placeholder="Enter password"
            className="w-full rounded-md border border-line px-4 py-3 font-body text-[15px] text-ink focus:outline-none focus:border-ink"
            autoFocus
          />
          {error && <p className="text-sm text-destructive">{error}</p>}
          <button
            type="submit"
            className="w-full rounded-md bg-ink text-white py-3 font-heading font-semibold text-[14px] hover:bg-primary-hover"
          >
            Sign in
          </button>
        </form>
      </div>
    );
  }

  // ── leads table ──────────────────────────────────────────
  return (
    <div className="min-h-screen bg-surface">
      <header className="bg-white border-b border-line px-6 py-4 flex items-center justify-between">
        <div>
          <span className="font-heading font-bold text-lg text-ink">Venzix — Leads</span>
          <span className="ml-3 rounded-pill bg-ink text-white px-3 py-0.5 font-body text-[12px]">
            {leads.length} total
          </span>
        </div>
        <button
          onClick={() => setAuthed(false)}
          className="font-body text-[13px] text-mute hover:text-ink transition-colors"
        >
          Sign out
        </button>
      </header>

      <main className="p-6">
        {loading && <p className="font-body text-[15px] text-mute">Loading…</p>}
        {error   && <p className="font-body text-[14px] text-destructive">{error}</p>}

        {!loading && leads.length === 0 && (
          <p className="font-body text-[15px] text-mute">No leads yet.</p>
        )}

        {!loading && leads.length > 0 && (
          <div className="overflow-x-auto rounded-lg border border-line bg-white shadow-sm">
            <table className="w-full text-left font-body text-[14px]">
              <thead className="border-b border-line bg-surface">
                <tr>
                  {["Date", "Name", "Phone", "Email", "Project", "Budget", "Website", "Message"].map((h) => (
                    <th key={h} className="px-4 py-3 font-heading font-semibold text-[13px] text-ink/60 whitespace-nowrap">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-line">
                {leads.map((l) => (
                  <tr key={l.id} className="hover:bg-surface transition-colors">
                    <td className="px-4 py-3 text-mute whitespace-nowrap">{fmt(l.created_at)}</td>
                    <td className="px-4 py-3 font-semibold text-ink whitespace-nowrap">{l.name}</td>
                    <td className="px-4 py-3 text-ink whitespace-nowrap">
                      <a href={`tel:${l.phone}`} className="hover:underline">{l.phone}</a>
                    </td>
                    <td className="px-4 py-3 text-ink">
                      <a href={`mailto:${l.email}`} className="hover:underline">{l.email}</a>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <span className="rounded-pill bg-surface border border-line px-2 py-0.5 text-[12px]">
                        {l.project_type}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-mute whitespace-nowrap">{l.budget ?? "—"}</td>
                    <td className="px-4 py-3">
                      {l.website
                        ? <a href={l.website} target="_blank" rel="noopener noreferrer" className="text-ink underline hover:opacity-70 max-w-[120px] truncate block">{l.website}</a>
                        : <span className="text-mute">—</span>}
                    </td>
                    <td className="px-4 py-3 text-mute max-w-[220px]">
                      <p className="line-clamp-2">{l.message ?? "—"}</p>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </main>
    </div>
  );
}