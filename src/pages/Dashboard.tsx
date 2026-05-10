// src/pages/Dashboard.tsx
// Venzix — Advanced Lead Management Dashboard
// Design system: Syne headings, DM Sans body, ink/mute/line palette

import { useEffect, useState, useMemo, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import {
  LogOut, Search, Download, RefreshCw, ChevronUp, ChevronDown,
  Phone, Mail, Users, TrendingUp, Calendar, Clock,
  Filter, CheckCircle, Circle, XCircle, AlertCircle,
  ExternalLink, ChevronLeft, ChevronRight, Eye, SlidersHorizontal,
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/use-auth";
import { toast } from "@/hooks/use-toast";

// ── Types ────────────────────────────────────────────────────
import { createPortal } from "react-dom";
type Status = "new" | "contacted" | "converted" | "closed";

type Lead = {
  id: string;
  created_at: string;
  name: string;
  email: string;
  phone: string;
  website: string | null;
  project_type: string;
  budget: string | null;
  message: string | null;
  status: Status;
  notes: string | null;
};

type SortKey = "created_at" | "name" | "status" | "project_type";
type SortDir = "asc" | "desc";

// ── Constants ─────────────────────────────────────────────────
const STATUS_CONFIG: Record<Status, { label: string; color: string; bg: string; icon: React.ReactNode }> = {
  new:       { label: "New",       color: "text-blue-700",  bg: "bg-blue-50 border-blue-200",   icon: <Circle className="h-3 w-3" /> },
  contacted: { label: "Contacted", color: "text-amber-700", bg: "bg-amber-50 border-amber-200", icon: <AlertCircle className="h-3 w-3" /> },
  converted: { label: "Converted", color: "text-green-700", bg: "bg-green-50 border-green-200", icon: <CheckCircle className="h-3 w-3" /> },
  closed:    { label: "Closed",    color: "text-gray-500",  bg: "bg-gray-50 border-gray-200",   icon: <XCircle className="h-3 w-3" /> },
};

const PAGE_SIZE = 10;

// ── Helpers ───────────────────────────────────────────────────
const fmt = (iso: string) => {
  const d = new Date(iso);
  return {
    date: d.toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" }),
    time: d.toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit", hour12: true }),
  };
};

const isToday = (iso: string) => {
  const d = new Date(iso);
  const n = new Date();
  return d.getDate() === n.getDate() && d.getMonth() === n.getMonth() && d.getFullYear() === n.getFullYear();
};

const isThisWeek = (iso: string) => {
  const d = new Date(iso);
  const now = new Date();
  const start = new Date(now); start.setDate(now.getDate() - now.getDay());
  start.setHours(0, 0, 0, 0);
  return d >= start;
};

const isThisMonth = (iso: string) => {
  const d = new Date(iso);
  const n = new Date();
  return d.getMonth() === n.getMonth() && d.getFullYear() === n.getFullYear();
};

const toCSV = (leads: Lead[]) => {
  const headers = ["ID","Name","Email","Phone","Website","Project Type","Budget","Message","Status","Notes","Submitted At"];
  const rows = leads.map((l) => [
    l.id, l.name, l.email, l.phone, l.website ?? "",
    l.project_type, l.budget ?? "", (l.message ?? "").replace(/,/g, ";"),
    l.status, (l.notes ?? "").replace(/,/g, ";"),
    new Date(l.created_at).toLocaleString("en-IN"),
  ]);
  return [headers, ...rows].map((r) => r.join(",")).join("\n");
};

// ── Main Component ────────────────────────────────────────────
const Dashboard = () => {
  const { user, isAdmin, loading: authLoading, signOut } = useAuth();
  const navigate = useNavigate();

  const [leads, setLeads]           = useState<Lead[]>([]);
  const [fetching, setFetching]     = useState(true);
  const [search, setSearch]         = useState("");
  const [statusFilter, setStatus]   = useState<Status | "all">("all");
  const [sortKey, setSortKey]       = useState<SortKey>("created_at");
  const [sortDir, setSortDir]       = useState<SortDir>("desc");
  const [page, setPage]             = useState(1);
  const [updatingId, setUpdating]   = useState<string | null>(null);
  const [expandedId, setExpanded]   = useState<string | null>(null);
  const [openDropdown, setDropdown] = useState<string | null>(null);

  // Auth guard
  useEffect(() => {
    if (!authLoading && !user) navigate("/auth", { replace: true });
  }, [user, authLoading, navigate]);

  // Fetch leads
  const fetchLeads = async () => {
    setFetching(true);
    const { data, error } = await supabase
      .from("contact_submissions")
      .select("*")
      .order("created_at", { ascending: false });
    setFetching(false);
    if (error) {
      toast({ title: "Failed to load leads", description: error.message, variant: "destructive" });
      return;
    }
    setLeads((data as Lead[]) ?? []);
  };

  useEffect(() => { if (!authLoading && user && isAdmin) fetchLeads(); }, [authLoading, user, isAdmin]);

  // Stats
  const stats = useMemo(() => ({
    total:     leads.length,
    today:     leads.filter((l) => isToday(l.created_at)).length,
    week:      leads.filter((l) => isThisWeek(l.created_at)).length,
    month:     leads.filter((l) => isThisMonth(l.created_at)).length,
    new:       leads.filter((l) => l.status === "new").length,
    converted: leads.filter((l) => l.status === "converted").length,
  }), [leads]);

  // Filter + sort + paginate
  const filtered = useMemo(() => {
    let out = [...leads];
    if (statusFilter !== "all") out = out.filter((l) => l.status === statusFilter);
    if (search.trim()) {
      const q = search.toLowerCase();
      out = out.filter((l) =>
        l.name.toLowerCase().includes(q) ||
        l.email.toLowerCase().includes(q) ||
        l.phone.includes(q) ||
        (l.project_type ?? "").toLowerCase().includes(q) ||
        (l.message ?? "").toLowerCase().includes(q)
      );
    }
    out.sort((a, b) => {
      const av = a[sortKey] ?? "";
      const bv = b[sortKey] ?? "";
      const cmp = av < bv ? -1 : av > bv ? 1 : 0;
      return sortDir === "asc" ? cmp : -cmp;
    });
    return out;
  }, [leads, statusFilter, search, sortKey, sortDir]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const paginated  = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const toggleSort = (key: SortKey) => {
    if (sortKey === key) setSortDir((d) => d === "asc" ? "desc" : "asc");
    else { setSortKey(key); setSortDir("desc"); }
    setPage(1);
  };

  // Update status
  const updateStatus = async (id: string, status: Status) => {
    setUpdating(id);
    setDropdown(null);
    const { error } = await supabase
      .from("contact_submissions")
      .update({ status })
      .eq("id", id);
    setUpdating(null);
    if (error) {
      toast({ title: "Update failed", description: error.message, variant: "destructive" });
      return;
    }
    setLeads((prev) => prev.map((l) => l.id === id ? { ...l, status } : l));
    toast({ title: "Status updated", description: `Lead marked as ${status}` });
  };

  // Export CSV
  const exportCSV = () => {
    const blob = new Blob([toCSV(filtered)], { type: "text/csv" });
    const url  = URL.createObjectURL(blob);
    const a    = document.createElement("a");
    a.href = url;
    a.download = `venzix-leads-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
    toast({ title: "Exported", description: `${filtered.length} leads downloaded as CSV` });
  };

  const handleSignOut = async () => { await signOut(); navigate("/auth", { replace: true }); };

  // Close dropdown on outside click
  useEffect(() => {
    const fn = () => setDropdown(null);
    document.addEventListener("click", fn);
    return () => document.removeEventListener("click", fn);
  }, []);

  // ── Access denied ─────────────────────────────────────────
  if (!authLoading && user && !isAdmin) {
    return (
      <div className="min-h-screen bg-surface flex items-center justify-center">
        <div className="text-center max-w-sm">
          <div className="mx-auto h-16 w-16 rounded-full bg-ink flex items-center justify-center mb-4">
            <XCircle className="h-8 w-8 text-white" />
          </div>
          <h2 className="font-heading font-bold text-2xl text-ink">Access Denied</h2>
          <p className="mt-2 font-body text-[15px] text-mute">You don't have admin access to this dashboard.</p>
          <button
            onClick={handleSignOut}
            className="mt-6 inline-flex items-center gap-2 rounded-lg bg-ink text-white px-6 h-11 font-heading font-semibold text-[14px] hover:bg-primary-hover transition-colors"
          >
            <LogOut className="h-4 w-4" /> Sign out
          </button>
        </div>
      </div>
    );
  }

  if (authLoading || fetching) {
    return (
      <div className="min-h-screen bg-surface flex items-center justify-center">
        <div className="text-center">
          <div className="h-10 w-10 border-2 border-ink border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="mt-4 font-body text-[14px] text-mute">Loading dashboard…</p>
        </div>
      </div>
    );
  }

  // ── Main render ───────────────────────────────────────────
  return (
    <div className="min-h-screen bg-surface font-body">

      {/* ── Top navbar ── */}
      <header className="sticky top-0 z-30 bg-white border-b border-line shadow-nav">
        <div className="max-w-[1400px] mx-auto px-6 h-16 flex items-center justify-between gap-4">

          {/* Logo + title */}
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 rounded-lg bg-ink flex items-center justify-center">
              <span className="font-heading font-bold text-white text-[13px]">V</span>
            </div>
            <div>
              <div className="font-heading font-bold text-[15px] text-ink leading-none">Venzix</div>
              <div className="font-body text-[11px] text-mute leading-none mt-0.5">Lead Management</div>
            </div>
          </div>

          {/* Right actions */}
          <div className="flex items-center gap-3">
            <span className="hidden sm:block font-body text-[13px] text-mute">{user?.email}</span>
            <button
              onClick={fetchLeads}
              className="flex items-center gap-1.5 rounded-lg border border-line bg-white px-3 h-9 font-body text-[13px] text-body hover:border-ink hover:text-ink transition-colors"
            >
              <RefreshCw className="h-3.5 w-3.5" />
              Refresh
            </button>
            <button
              onClick={handleSignOut}
              className="flex items-center gap-1.5 rounded-lg bg-ink text-white px-3 h-9 font-body text-[13px] font-medium hover:bg-primary-hover transition-colors"
            >
              <LogOut className="h-3.5 w-3.5" />
              Sign out
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-[1400px] mx-auto px-4 sm:px-6 py-8 space-y-6">

        {/* ── Page title ── */}
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="font-body text-[12px] uppercase tracking-[0.16em] text-mute">Overview</p>
            <h1 className="mt-1 font-heading font-bold text-2xl md:text-3xl text-ink">Lead Dashboard</h1>
          </div>
          <button
            onClick={exportCSV}
            className="flex items-center gap-2 rounded-lg bg-ink text-white px-5 h-10 font-heading font-semibold text-[13px] hover:bg-primary-hover transition-colors shadow-md"
          >
            <Download className="h-4 w-4" />
            Export CSV ({filtered.length})
          </button>
        </div>

        {/* ── Stat cards ── */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {[
            { label: "Total Leads",  value: stats.total,     icon: <Users className="h-4 w-4" />,       accent: "border-l-ink" },
            { label: "New",          value: stats.new,        icon: <Circle className="h-4 w-4" />,      accent: "border-l-blue-500" },
            { label: "Converted",    value: stats.converted,  icon: <CheckCircle className="h-4 w-4" />, accent: "border-l-green-500" },
            { label: "Today",        value: stats.today,      icon: <Clock className="h-4 w-4" />,       accent: "border-l-amber-500" },
            { label: "This Week",    value: stats.week,       icon: <TrendingUp className="h-4 w-4" />,  accent: "border-l-purple-500" },
            { label: "This Month",   value: stats.month,      icon: <Calendar className="h-4 w-4" />,    accent: "border-l-rose-500" },
          ].map((s) => (
            <div
              key={s.label}
              className={`bg-white rounded-lg border border-line border-l-4 ${s.accent} p-4 flex flex-col gap-2`}
            >
              <div className="flex items-center justify-between text-mute">
                <span className="font-body text-[11px] uppercase tracking-wider">{s.label}</span>
                {s.icon}
              </div>
              <div className="font-heading font-bold text-[28px] text-ink leading-none">{s.value}</div>
            </div>
          ))}
        </div>

        {/* ── Filters bar ── */}
        <div className="bg-white rounded-lg border border-line p-4 flex flex-wrap gap-3 items-center">

          {/* Search */}
          <div className="relative flex-1 min-w-[200px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-mute pointer-events-none" />
            <input
              type="text"
              value={search}
              onChange={(e) => { setSearch(e.target.value); setPage(1); }}
              placeholder="Search by name, email, phone, project..."
              className="w-full pl-9 pr-4 py-2.5 rounded-lg border border-line font-body text-[14px] text-ink placeholder:text-mute/60 focus:outline-none focus:border-ink transition-colors"
            />
          </div>

          {/* Status filter tabs */}
          <div className="flex items-center gap-1 bg-surface rounded-lg p-1 border border-line">
            <SlidersHorizontal className="h-3.5 w-3.5 text-mute ml-1.5 mr-0.5" />
            {(["all", "new", "contacted", "converted", "closed"] as const).map((s) => {
              const count = s === "all" ? leads.length : leads.filter((l) => l.status === s).length;
              return (
                <button
                  key={s}
                  onClick={() => { setStatus(s); setPage(1); }}
                  className={[
                    "px-3 py-1.5 rounded-md font-body text-[13px] font-medium transition-colors capitalize",
                    statusFilter === s
                      ? "bg-ink text-white shadow-sm"
                      : "text-mute hover:text-ink",
                  ].join(" ")}
                >
                  {s === "all" ? "All" : STATUS_CONFIG[s].label} ({count})
                </button>
              );
            })}
          </div>
        </div>

        {/* ── Table ── */}
        <div className="bg-white rounded-lg border border-line overflow-hidden">

          {/* Table header */}
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-line bg-surface">
                  {[
                    { key: null,           label: "#",           w: "w-12" },
                    { key: "name",         label: "Name",        w: "min-w-[160px]" },
                    { key: null,           label: "Contact",     w: "min-w-[200px]" },
                    { key: "project_type", label: "Project",     w: "min-w-[130px]" },
                    { key: null,           label: "Budget",      w: "min-w-[110px]" },
                    { key: "created_at",   label: "Submitted",   w: "min-w-[130px]" },
                    { key: "status",       label: "Status",      w: "min-w-[130px]" },
                    { key: null,           label: "Actions",     w: "w-28" },
                  ].map((col) => (
                    <th
                      key={col.label}
                      className={`${col.w} px-4 py-3 font-body text-[11px] font-semibold uppercase tracking-wider text-mute`}
                    >
                      {col.key ? (
                        <button
                          onClick={() => toggleSort(col.key as SortKey)}
                          className="flex items-center gap-1 hover:text-ink transition-colors"
                        >
                          {col.label}
                          <span className="flex flex-col">
                            <ChevronUp className={`h-2.5 w-2.5 ${sortKey === col.key && sortDir === "asc" ? "text-ink" : "text-line"}`} />
                            <ChevronDown className={`h-2.5 w-2.5 -mt-1 ${sortKey === col.key && sortDir === "desc" ? "text-ink" : "text-line"}`} />
                          </span>
                        </button>
                      ) : col.label}
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody className="divide-y divide-line">
                {paginated.length === 0 ? (
                  <tr>
                    <td colSpan={8} className="py-16 text-center">
                      <Filter className="h-8 w-8 text-line mx-auto mb-3" />
                      <p className="font-body text-[14px] text-mute">No leads found</p>
                    </td>
                  </tr>
                ) : paginated.map((lead, idx) => {
                  const { date, time } = fmt(lead.created_at);
                  const sc = STATUS_CONFIG[lead.status];
                  const rowNum = (page - 1) * PAGE_SIZE + idx + 1;
                  const isExpanded = expandedId === lead.id;

                  return (
                    <>
                      <tr
                        key={lead.id}
                        className={`hover:bg-surface/60 transition-colors ${isExpanded ? "bg-surface/40" : ""}`}
                      >
                        {/* # */}
                        <td className="px-4 py-4">
                          <span className="font-body text-[13px] text-mute">#{rowNum}</span>
                        </td>

                        {/* Name */}
                        <td className="px-4 py-4">
                          <div className="font-body font-medium text-[14px] text-ink leading-tight">{lead.name}</div>
                          {lead.website && (
                            <a
                              href={lead.website}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1 font-body text-[11px] text-mute hover:text-ink transition-colors mt-0.5"
                            >
                              <ExternalLink className="h-3 w-3" />
                              {lead.website.replace(/^https?:\/\//, "")}
                            </a>
                          )}
                        </td>

                        {/* Contact */}
                        <td className="px-4 py-4">
                          <a
                            href={`tel:${lead.phone}`}
                            className="flex items-center gap-1.5 font-body text-[13px] text-body hover:text-ink transition-colors"
                          >
                            <Phone className="h-3.5 w-3.5 text-mute shrink-0" />
                            {lead.phone}
                          </a>
                          <a
                            href={`mailto:${lead.email}`}
                            className="flex items-center gap-1.5 font-body text-[12px] text-mute hover:text-ink transition-colors mt-1"
                          >
                            <Mail className="h-3 w-3 shrink-0" />
                            {lead.email}
                          </a>
                        </td>

                        {/* Project */}
                        <td className="px-4 py-4">
                          <span className="inline-block rounded-md bg-surface border border-line px-2.5 py-1 font-body text-[12px] text-body">
                            {lead.project_type}
                          </span>
                        </td>

                        {/* Budget */}
                        <td className="px-4 py-4">
                          <span className="font-body text-[13px] text-body">{lead.budget ?? "—"}</span>
                        </td>

                        {/* Date */}
                        <td className="px-4 py-4">
                          <div className="font-body text-[13px] text-ink">{date}</div>
                          <div className="font-body text-[11px] text-mute mt-0.5">{time}</div>
                        </td>

                        {/* Status dropdown — portal to escape overflow:hidden */}
                        <td className="px-4 py-4">
                          <StatusDropdown
                            lead={lead}
                            isOpen={openDropdown === lead.id}
                            isUpdating={updatingId === lead.id}
                            onToggle={(e) => {
                              e.stopPropagation();
                              setDropdown(openDropdown === lead.id ? null : lead.id);
                            }}
                            onSelect={(s) => updateStatus(lead.id, s)}
                          />
                        </td>

                        {/* Actions */}
                        <td className="px-4 py-4">
                          <div className="flex items-center gap-2">
                            <a
                              href={`https://wa.me/${lead.phone.replace(/\D/g, "")}?text=${encodeURIComponent(`Hi ${lead.name}, this is Venzix regarding your website inquiry.`)}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="h-8 w-8 flex items-center justify-center rounded-lg bg-[#25D366]/10 text-[#25D366] hover:bg-[#25D366] hover:text-white transition-colors"
                              title="WhatsApp"
                            >
                              <Phone className="h-3.5 w-3.5" />
                            </a>
                            <a
                              href={`mailto:${lead.email}`}
                              className="h-8 w-8 flex items-center justify-center rounded-lg bg-surface border border-line text-mute hover:border-ink hover:text-ink transition-colors"
                              title="Send email"
                            >
                              <Mail className="h-3.5 w-3.5" />
                            </a>
                            <button
                              onClick={() => setExpanded(isExpanded ? null : lead.id)}
                              className="h-8 w-8 flex items-center justify-center rounded-lg bg-surface border border-line text-mute hover:border-ink hover:text-ink transition-colors"
                              title="View details"
                            >
                              <Eye className="h-3.5 w-3.5" />
                            </button>
                          </div>
                        </td>
                      </tr>

                      {/* Expanded row */}
                      {isExpanded && (
                        <tr key={`${lead.id}-exp`} className="bg-surface/50">
                          <td colSpan={8} className="px-6 py-4">
                            <div className="grid md:grid-cols-2 gap-4">
                              <div>
                                <p className="font-body text-[11px] uppercase tracking-wider text-mute mb-1.5">Message</p>
                                <p className="font-body text-[14px] text-ink leading-relaxed bg-white border border-line rounded-lg p-3">
                                  {lead.message ?? <span className="text-mute italic">No message provided</span>}
                                </p>
                              </div>
                              <NotesEditor lead={lead} onSave={(notes) => setLeads((prev) => prev.map((l) => l.id === lead.id ? { ...l, notes } : l))} />
                            </div>
                          </td>
                        </tr>
                      )}
                    </>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="border-t border-line px-4 py-3 flex flex-wrap items-center justify-between gap-3 bg-surface/40">
            <p className="font-body text-[13px] text-mute">
              Showing {Math.min((page - 1) * PAGE_SIZE + 1, filtered.length)}–{Math.min(page * PAGE_SIZE, filtered.length)} of {filtered.length} leads
            </p>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
                className="h-8 w-8 flex items-center justify-center rounded-lg border border-line bg-white text-mute hover:border-ink hover:text-ink disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1)
                .filter((p) => p === 1 || p === totalPages || Math.abs(p - page) <= 1)
                .map((p, i, arr) => (
                  <>
                    {i > 0 && arr[i - 1] !== p - 1 && (
                      <span key={`dots-${p}`} className="font-body text-[13px] text-mute px-1">…</span>
                    )}
                    <button
                      key={p}
                      onClick={() => setPage(p)}
                      className={[
                        "h-8 min-w-[32px] px-2 rounded-lg font-body text-[13px] font-medium transition-colors",
                        page === p
                          ? "bg-ink text-white"
                          : "border border-line bg-white text-body hover:border-ink hover:text-ink",
                      ].join(" ")}
                    >
                      {p}
                    </button>
                  </>
                ))}
              <button
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
                className="h-8 w-8 flex items-center justify-center rounded-lg border border-line bg-white text-mute hover:border-ink hover:text-ink disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

// ── Status Dropdown — portal-based to escape overflow:hidden ─
const StatusDropdown = ({
  lead,
  isOpen,
  isUpdating,
  onToggle,
  onSelect,
}: {
  lead: Lead;
  isOpen: boolean;
  isUpdating: boolean;
  onToggle: (e: React.MouseEvent) => void;
  onSelect: (s: Status) => void;
}) => {
  const btnRef = useRef<HTMLButtonElement>(null);
  const [coords, setCoords] = useState({ top: 0, left: 0, width: 0 });
  const sc = STATUS_CONFIG[lead.status];

  const recalc = useCallback(() => {
    if (!btnRef.current) return;
    const r = btnRef.current.getBoundingClientRect();
    setCoords({ top: r.bottom + window.scrollY + 4, left: r.left + window.scrollX, width: r.width });
  }, []);

  useEffect(() => {
    if (isOpen) recalc();
  }, [isOpen, recalc]);

  return (
    <div className="relative inline-block">
      <button
        ref={btnRef}
        disabled={isUpdating}
        onClick={(e) => { recalc(); onToggle(e); }}
        className={[
          "inline-flex items-center gap-1.5 rounded-md border px-2.5 py-1.5 font-body text-[12px] font-medium transition-colors whitespace-nowrap",
          sc.bg, sc.color,
          isUpdating ? "opacity-50 cursor-wait" : "cursor-pointer hover:opacity-80",
        ].join(" ")}
      >
        {isUpdating
          ? <div className="h-3 w-3 border border-current border-t-transparent rounded-full animate-spin" />
          : sc.icon}
        {sc.label}
        <ChevronDown className="h-3 w-3 ml-0.5" />
      </button>

      {isOpen && createPortal(
        <div
          style={{
            position: "absolute",
            top: coords.top,
            left: coords.left,
            minWidth: Math.max(coords.width, 150),
            zIndex: 9999,
          }}
          className="bg-white border border-line rounded-lg shadow-xl overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          {(Object.entries(STATUS_CONFIG) as [Status, typeof STATUS_CONFIG[Status]][]).map(([s, cfg]) => (
            <button
              key={s}
              onClick={() => onSelect(s)}
              className={[
                "w-full flex items-center gap-2 px-3 py-2.5 font-body text-[13px] hover:bg-surface transition-colors",
                lead.status === s ? "font-semibold text-ink bg-surface/50" : "text-body",
              ].join(" ")}
            >
              <span className={cfg.color}>{cfg.icon}</span>
              {cfg.label}
              {lead.status === s && <CheckCircle className="h-3 w-3 ml-auto text-ink" />}
            </button>
          ))}
        </div>,
        document.body
      )}
    </div>
  );
};

// ── Notes Editor sub-component ───────────────────────────────
const NotesEditor = ({ lead, onSave }: { lead: Lead; onSave: (notes: string) => void }) => {
  const [notes, setNotes]       = useState(lead.notes ?? "");
  const [saving, setSaving]     = useState(false);
  const [saved, setSaved]       = useState(false);

  const save = async () => {
    setSaving(true);
    const { error } = await supabase
      .from("contact_submissions")
      .update({ notes })
      .eq("id", lead.id);
    setSaving(false);
    if (error) {
      toast({ title: "Failed to save notes", description: error.message, variant: "destructive" });
      return;
    }
    onSave(notes);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div>
      <p className="font-body text-[11px] uppercase tracking-wider text-mute mb-1.5">Internal Notes</p>
      <textarea
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
        rows={3}
        placeholder="Add notes about this lead..."
        className="w-full rounded-lg border border-line bg-white px-3 py-2.5 font-body text-[14px] text-ink placeholder:text-mute/60 focus:outline-none focus:border-ink transition-colors resize-none"
      />
      <button
        onClick={save}
        disabled={saving}
        className={[
          "mt-2 inline-flex items-center gap-1.5 rounded-lg px-4 h-8 font-body text-[13px] font-medium transition-colors",
          saved
            ? "bg-green-50 border border-green-300 text-green-700"
            : "bg-ink text-white hover:bg-primary-hover",
        ].join(" ")}
      >
        {saving ? (
          <><div className="h-3 w-3 border border-current border-t-transparent rounded-full animate-spin" /> Saving…</>
        ) : saved ? (
          <><CheckCircle className="h-3.5 w-3.5" /> Saved</>
        ) : "Save notes"}
      </button>
    </div>
  );
};

export default Dashboard;