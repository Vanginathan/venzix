// src/pages/Auth.tsx
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import { Eye, EyeOff, Loader2, Lock, Mail, Shield, TrendingUp, Users, Zap } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/use-auth";
import { toast } from "@/hooks/use-toast";

const schema = z.object({
  email: z.string().trim().email().max(255),
  password: z.string().min(6).max(128),
});

const Auth = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail]           = useState("");
  const [password, setPassword]     = useState("");
  const [showPass, setShowPass]     = useState(false);
  const [remember, setRemember]     = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [fieldErr, setFieldErr]     = useState<{ email?: string; password?: string }>({});

  useEffect(() => {
    if (!loading && user) navigate("/dashboard", { replace: true });
  }, [user, loading, navigate]);

  const validate = () => {
    const parsed = schema.safeParse({ email, password });
    if (!parsed.success) {
      const errs: { email?: string; password?: string } = {};
      parsed.error.errors.forEach((e) => {
        const k = e.path[0] as "email" | "password";
        if (!errs[k]) errs[k] = e.message;
      });
      setFieldErr(errs);
      return false;
    }
    setFieldErr({});
    return true;
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setSubmitting(true);
    const { error } = await supabase.auth.signInWithPassword({ email: email.trim(), password });
    setSubmitting(false);
    if (error) {
      toast({ title: "Login failed", description: error.message, variant: "destructive" });
      return;
    }
    navigate("/dashboard", { replace: true });
  };

  return (
    <div className="min-h-screen flex">

      {/* ── LEFT PANEL — branding ────────────────────────── */}
      <div className="hidden lg:flex lg:w-[52%] relative bg-ink flex-col justify-between p-12 overflow-hidden">

        {/* Grid pattern */}
        <div
          aria-hidden
          className="absolute inset-0 opacity-[0.07]"
          style={{
            backgroundImage: `linear-gradient(white 1px, transparent 1px),
                              linear-gradient(90deg, white 1px, transparent 1px)`,
            backgroundSize: "48px 48px",
          }}
        />

        {/* Glow orbs */}
        <div aria-hidden className="absolute top-[-120px] left-[-80px] w-[420px] h-[420px] rounded-full bg-white/5 blur-3xl" />
        <div aria-hidden className="absolute bottom-[-80px] right-[-60px] w-[320px] h-[320px] rounded-full bg-amber-400/10 blur-3xl" />

        {/* Logo */}
        <div className="relative z-10">
          <span className="font-heading font-bold text-2xl text-white tracking-tight">Venzix</span>
          <span className="ml-2 text-[11px] font-body text-white/40 uppercase tracking-widest">Admin</span>
        </div>

        {/* Centre copy */}
        <div className="relative z-10">
          <div className="inline-flex items-center gap-2 rounded-pill border border-white/20 bg-white/10 px-3 py-1 mb-6">
            <span className="relative flex h-1.5 w-1.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-amber-400" />
            </span>
            <span className="font-body text-[11px] text-white/70">Live dashboard</span>
          </div>

          <h1 className="font-heading font-bold text-[2.8rem] leading-[1.05] text-white tracking-tight">
            Your leads,<br />
            <span className="text-white/50">your growth.</span>
          </h1>
          <p className="mt-4 font-body text-[15px] text-white/50 max-w-sm leading-relaxed">
            Every form submission, every client inquiry — tracked, managed, and converted from one place.
          </p>

          {/* Stats */}
          <div className="mt-10 grid grid-cols-3 gap-4">
            {[
              { icon: <Users className="h-4 w-4" />, label: "Total leads", val: "All in one place" },
              { icon: <TrendingUp className="h-4 w-4" />, label: "Conversion", val: "Track status" },
              { icon: <Zap className="h-4 w-4" />, label: "Response", val: "1 business day" },
            ].map((s) => (
              <div key={s.label} className="rounded-lg border border-white/10 bg-white/5 p-4">
                <div className="text-white/40">{s.icon}</div>
                <div className="mt-2 font-heading font-semibold text-[13px] text-white">{s.val}</div>
                <div className="mt-0.5 font-body text-[11px] text-white/40">{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="relative z-10 flex items-center gap-2">
          <Shield className="h-3.5 w-3.5 text-white/30" />
          <span className="font-body text-[12px] text-white/30">
            Secured by Supabase Auth · End-to-end encrypted
          </span>
        </div>
      </div>

      {/* ── RIGHT PANEL — form ───────────────────────────── */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 py-12 bg-white">

        {/* Mobile logo */}
        <div className="lg:hidden mb-10 text-center">
          <span className="font-heading font-bold text-2xl text-ink">Venzix</span>
          <span className="block font-body text-[13px] text-mute mt-1">Admin Portal</span>
        </div>

        <div className="w-full max-w-[400px]">

          {/* Heading */}
          <div className="mb-8">
            <div className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-ink mb-4">
              <Lock className="h-5 w-5 text-white" />
            </div>
            <h2 className="font-heading font-bold text-[1.75rem] text-ink leading-tight">
              Welcome back
            </h2>
            <p className="mt-1 font-body text-[14px] text-mute">
              Sign in to your Venzix admin dashboard
            </p>
          </div>

          {/* Form */}
          <form onSubmit={onSubmit} className="space-y-5" noValidate>

            {/* Email */}
            <div>
              <label htmlFor="email" className="block font-body text-[13px] font-medium text-ink mb-1.5">
                Email address
              </label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-mute pointer-events-none" />
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@venzix.com"
                  autoComplete="email"
                  required
                  className={[
                    "w-full pl-10 pr-4 py-3 rounded-lg border font-body text-[14px] text-ink",
                    "placeholder:text-mute/50 focus:outline-none transition-colors",
                    fieldErr.email
                      ? "border-red-400 focus:border-red-500"
                      : "border-line focus:border-ink",
                  ].join(" ")}
                />
              </div>
              {fieldErr.email && (
                <p className="mt-1 font-body text-[12px] text-red-500">{fieldErr.email}</p>
              )}
            </div>

            {/* Password */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label htmlFor="password" className="font-body text-[13px] font-medium text-ink">
                  Password
                </label>
              </div>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-mute pointer-events-none" />
                <input
                  id="password"
                  type={showPass ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  autoComplete="current-password"
                  required
                  className={[
                    "w-full pl-10 pr-11 py-3 rounded-lg border font-body text-[14px] text-ink",
                    "placeholder:text-mute/50 focus:outline-none transition-colors",
                    fieldErr.password
                      ? "border-red-400 focus:border-red-500"
                      : "border-line focus:border-ink",
                  ].join(" ")}
                />
                <button
                  type="button"
                  onClick={() => setShowPass((v) => !v)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-mute hover:text-ink transition-colors"
                  aria-label={showPass ? "Hide password" : "Show password"}
                >
                  {showPass ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
              {fieldErr.password && (
                <p className="mt-1 font-body text-[12px] text-red-500">{fieldErr.password}</p>
              )}
            </div>

            {/* Remember me */}
            <div className="flex items-center gap-2">
              <input
                id="remember"
                type="checkbox"
                checked={remember}
                onChange={(e) => setRemember(e.target.checked)}
                className="h-4 w-4 rounded border-line accent-ink"
              />
              <label htmlFor="remember" className="font-body text-[13px] text-body cursor-pointer">
                Keep me signed in
              </label>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={submitting}
              className="w-full flex items-center justify-center gap-2 rounded-lg bg-ink text-white h-12 font-heading font-semibold text-[15px] hover:bg-primary-hover disabled:opacity-60 transition-colors shadow-[0_4px_18px_hsl(0_0%_0%/0.18)] hover:shadow-[0_6px_24px_hsl(0_0%_0%/0.25)]"
            >
              {submitting ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Signing in…
                </>
              ) : (
                "Sign in to dashboard"
              )}
            </button>
          </form>

          {/* Security note */}
          <div className="mt-8 flex items-center gap-2 justify-center">
            <Shield className="h-3.5 w-3.5 text-mute" />
            <span className="font-body text-[12px] text-mute">
              Admin-only access · Secured by Supabase
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;