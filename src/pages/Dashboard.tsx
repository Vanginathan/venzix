import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { LogOut, Search, MessageCircle } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/use-auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/hooks/use-toast";

type Lead = {
  id: string;
  name: string;
  email: string;
  phone: string;
  website: string | null;
  project_type: string;
  budget: string | null;
  message: string | null;
  status: string;
  notes: string | null;
  created_at: string;
  updated_at: string;
};

const STATUSES = ["new", "in_progress", "closed"] as const;

const statusLabel = (s: string) =>
  s === "new" ? "New" : s === "in_progress" ? "In Progress" : "Closed";

const statusVariant = (s: string): "default" | "secondary" | "outline" =>
  s === "new" ? "default" : s === "in_progress" ? "secondary" : "outline";

const Dashboard = () => {
  const { user, isAdmin, loading, signOut } = useAuth();
  const navigate = useNavigate();
  const [leads, setLeads] = useState<Lead[]>([]);
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<Lead | null>(null);
  const [savingNotes, setSavingNotes] = useState(false);
  const [noteDraft, setNoteDraft] = useState("");

  useEffect(() => {
    if (!loading && !user) navigate("/auth", { replace: true });
  }, [user, loading, navigate]);

  const fetchLeads = async () => {
    const { data, error } = await supabase
      .from("contact_submissions")
      .select("*")
      .order("created_at", { ascending: false });
    if (error) {
      toast({ title: "Failed to load leads", description: error.message, variant: "destructive" });
      return;
    }
    setLeads((data as Lead[]) || []);
  };

  useEffect(() => {
    if (user && isAdmin) fetchLeads();
  }, [user, isAdmin]);

  useEffect(() => {
    if (selected) setNoteDraft(selected.notes || "");
  }, [selected]);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return leads;
    return leads.filter(
      (l) => l.name.toLowerCase().includes(q) || l.email.toLowerCase().includes(q)
    );
  }, [leads, search]);

  const counts = useMemo(
    () => ({
      total: leads.length,
      new: leads.filter((l) => l.status === "new").length,
      closed: leads.filter((l) => l.status === "closed").length,
    }),
    [leads]
  );

  const updateStatus = async (id: string, status: string) => {
    const { error } = await supabase.from("contact_submissions").update({ status }).eq("id", id);
    if (error) {
      toast({ title: "Update failed", description: error.message, variant: "destructive" });
      return;
    }
    setLeads((prev) => prev.map((l) => (l.id === id ? { ...l, status } : l)));
    setSelected((s) => (s && s.id === id ? { ...s, status } : s));
  };

  const saveNotes = async () => {
    if (!selected) return;
    setSavingNotes(true);
    const { error } = await supabase
      .from("contact_submissions")
      .update({ notes: noteDraft })
      .eq("id", selected.id);
    setSavingNotes(false);
    if (error) {
      toast({ title: "Save failed", description: error.message, variant: "destructive" });
      return;
    }
    setLeads((prev) => prev.map((l) => (l.id === selected.id ? { ...l, notes: noteDraft } : l)));
    setSelected({ ...selected, notes: noteDraft });
    toast({ title: "Notes saved" });
  };

  const whatsappLink = (phone: string, name: string) => {
    const clean = phone.replace(/[^\d]/g, "");
    const msg = encodeURIComponent(`Hi ${name}, thanks for reaching out!`);
    return `https://wa.me/${clean}?text=${msg}`;
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  if (!user) return null;
  if (!isAdmin) {
    return (
      <main className="min-h-screen flex items-center justify-center p-4">
        <Card className="p-8 max-w-md text-center">
          <h1 className="text-xl font-bold mb-2">Access Denied</h1>
          <p className="text-muted-foreground mb-4">You don't have admin access to this dashboard.</p>
          <Button onClick={() => signOut().then(() => navigate("/auth"))}>Sign out</Button>
        </Card>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-muted/20">
      <header className="bg-background border-b">
        <div className="container flex items-center justify-between h-16">
          <h1 className="text-lg font-bold">Leads Dashboard</h1>
          <Button variant="outline" size="sm" onClick={() => signOut().then(() => navigate("/auth"))}>
            <LogOut className="w-4 h-4" /> Logout
          </Button>
        </div>
      </header>

      <div className="container py-6 space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Card className="p-4">
            <div className="text-sm text-muted-foreground">Total Leads</div>
            <div className="text-3xl font-bold">{counts.total}</div>
          </Card>
          <Card className="p-4">
            <div className="text-sm text-muted-foreground">New</div>
            <div className="text-3xl font-bold">{counts.new}</div>
          </Card>
          <Card className="p-4">
            <div className="text-sm text-muted-foreground">Closed</div>
            <div className="text-3xl font-bold">{counts.closed}</div>
          </Card>
        </div>

        <Card className="p-4">
          <div className="relative mb-4">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search by name or email..."
              className="pl-9"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left border-b">
                  <th className="py-2 px-2">Name</th>
                  <th className="py-2 px-2">Email</th>
                  <th className="py-2 px-2">Phone</th>
                  <th className="py-2 px-2">Message</th>
                  <th className="py-2 px-2">Date</th>
                  <th className="py-2 px-2">Status</th>
                </tr>
              </thead>
              <tbody>
                {filtered.length === 0 && (
                  <tr><td colSpan={6} className="py-6 text-center text-muted-foreground">No leads found.</td></tr>
                )}
                {filtered.map((l) => (
                  <tr
                    key={l.id}
                    onClick={() => setSelected(l)}
                    className={`border-b cursor-pointer hover:bg-muted/40 transition-colors ${l.status === "new" ? "font-semibold" : ""}`}
                  >
                    <td className="py-3 px-2">{l.name}</td>
                    <td className="py-3 px-2">{l.email}</td>
                    <td className="py-3 px-2">{l.phone}</td>
                    <td className="py-3 px-2 max-w-[240px] truncate">{l.message}</td>
                    <td className="py-3 px-2 whitespace-nowrap">{new Date(l.created_at).toLocaleString()}</td>
                    <td className="py-3 px-2">
                      <Badge variant={statusVariant(l.status)}>{statusLabel(l.status)}</Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>

      <Sheet open={!!selected} onOpenChange={(o) => !o && setSelected(null)}>
        <SheetContent className="w-full sm:max-w-lg overflow-y-auto">
          {selected && (
            <>
              <SheetHeader>
                <SheetTitle>{selected.name}</SheetTitle>
              </SheetHeader>
              <div className="space-y-4 mt-6 text-sm">
                <div><span className="text-muted-foreground">Email:</span> {selected.email}</div>
                <div><span className="text-muted-foreground">Phone:</span> {selected.phone}</div>
                {selected.website && <div><span className="text-muted-foreground">Website:</span> {selected.website}</div>}
                <div><span className="text-muted-foreground">Project:</span> {selected.project_type}</div>
                {selected.budget && <div><span className="text-muted-foreground">Budget:</span> {selected.budget}</div>}
                <div><span className="text-muted-foreground">Submitted:</span> {new Date(selected.created_at).toLocaleString()}</div>
                <div>
                  <div className="text-muted-foreground mb-1">Message</div>
                  <div className="rounded-md bg-muted p-3 whitespace-pre-wrap">{selected.message || "—"}</div>
                </div>

                <div>
                  <div className="text-muted-foreground mb-1">Status</div>
                  <Select value={selected.status} onValueChange={(v) => updateStatus(selected.id, v)}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      {STATUSES.map((s) => (
                        <SelectItem key={s} value={s}>{statusLabel(s)}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <div className="text-muted-foreground mb-1">Notes</div>
                  <Textarea value={noteDraft} onChange={(e) => setNoteDraft(e.target.value)} rows={4} />
                  <Button onClick={saveNotes} disabled={savingNotes} size="sm" className="mt-2">
                    {savingNotes ? "Saving..." : "Save notes"}
                  </Button>
                </div>

                <Button asChild className="w-full bg-[#25D366] hover:bg-[#1fb955] text-white">
                  <a href={whatsappLink(selected.phone, selected.name)} target="_blank" rel="noopener noreferrer">
                    <MessageCircle className="w-4 h-4" /> Reply on WhatsApp
                  </a>
                </Button>
              </div>
            </>
          )}
        </SheetContent>
      </Sheet>
    </main>
  );
};

export default Dashboard;