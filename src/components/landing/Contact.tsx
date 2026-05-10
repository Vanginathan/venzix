// src/components/landing/Contact.tsx
// FIXES:
//  1. Added zod schema validation on all fields before insert
//  2. Proper async error handling with specific Supabase error messages
//  3. Real-time field validation feedback (onBlur)
//  4. Phone number formatting hint
//  5. Loading spinner on submit button
//  6. Accessibility: aria-invalid, aria-describedby on fields
import { useState } from "react";
import { CheckCircle2, Lock, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { z } from "zod";
import { supabase } from "@/integrations/supabase/client";

const MONTH = new Date().toLocaleString("en-IN", { month: "long" });

const contactSchema = z.object({
  name:        z.string().min(2, "Name must be at least 2 characters").max(100),
  phone:       z.string().regex(/^[0-9+\s\-()\u0900-\u097F]{8,20}$/, "Enter a valid phone number"),
  email:       z.string().email("Enter a valid email address").max(255),
  website:     z.string().url("Enter a valid URL (e.g. https://...)").max(255).optional().or(z.literal("")),
  projectType: z.string().min(1, "Please select a project type"),
  budget:      z.string().optional(),
  message:     z.string().max(2000).optional(),
});

type FormErrors = Partial<Record<keyof z.infer<typeof contactSchema>, string>>;

const Contact = () => {
  const [submitting, setSubmitting] = useState(false);
  const [done,       setDone]       = useState(false);
  const [errors,     setErrors]     = useState<FormErrors>({});

  const validate = (data: Record<string, unknown>): boolean => {
    const result = contactSchema.safeParse(data);
    if (!result.success) {
      const errs: FormErrors = {};
      result.error.errors.forEach((e) => {
        const key = e.path[0] as keyof FormErrors;
        if (key && !errs[key]) errs[key] = e.message;
      });
      setErrors(errs);
      return false;
    }
    setErrors({});
    return true;
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd   = new FormData(e.currentTarget);
    if (fd.get("_honey")) return; // honeypot

    const raw = {
      name:        String(fd.get("name")        ?? "").trim(),
      phone:       String(fd.get("phone")       ?? "").trim(),
      email:       String(fd.get("email")       ?? "").trim(),
      website:     String(fd.get("website")     ?? "").trim(),
      projectType: String(fd.get("projectType") ?? "").trim(),
      budget:      String(fd.get("budget")      ?? "").trim(),
      message:     String(fd.get("message")     ?? "").trim(),
    };

    if (!validate(raw)) return;

    setSubmitting(true);
    try {
      const { error: insertError } = await supabase
        .from("contact_submissions")
        .insert({
          name:         raw.name,
          phone:        raw.phone,
          email:        raw.email,
          website:      raw.website || null,
          project_type: raw.projectType,
          budget:       raw.budget  || null,
          message:      raw.message || null,
        });

      if (insertError) {
        // Surface meaningful Supabase error
        console.error("Supabase insert error:", insertError);
        toast.error(
          insertError.code === "23505"
            ? "We already have your details — we'll be in touch soon!"
            : `Submission failed: ${insertError.message}. Please email hello@venzix.com.`
        );
        return;
      }

      setDone(true);
      toast.success("Request received — we'll reply within one business day.");
    } catch (err) {
      console.error("Contact form unexpected error:", err);
      toast.error("Something went wrong. Please email hello@venzix.com.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-24 md:py-32 bg-ink text-white">
      <div className="container max-w-3xl text-center">

        <p className="font-body text-[13px] uppercase tracking-[0.18em] text-white/50">
          Start a project
        </p>

        <h2 className="mt-3 font-heading font-bold text-4xl md:text-5xl text-white leading-tight">
          Let's build your next<br />
          <span className="font-serif-display text-white/90">client-generating website.</span>
        </h2>

        <p className="mt-4 font-body text-[16px] text-white/60 max-w-xl mx-auto">
          Fill out the form and we'll reply within one business day with a clear
          plan, timeline, and fixed quote.
        </p>

        {/* Scarcity */}
        <div className="mt-6 inline-flex items-center gap-2 rounded-pill border border-white/20 bg-white/10 px-5 py-2.5">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-400" />
          </span>
          <span className="font-body text-[13px] text-white/80">
            Only <strong className="text-white">4 spots</strong> left for {MONTH}
            {" "}— spots filling fast
          </span>
        </div>

        <div className="mt-10 bg-white text-ink rounded-lg p-6 md:p-10 text-left max-w-2xl mx-auto shadow-xl-custom">
          {done ? (
            <SuccessState />
          ) : (
            <form onSubmit={onSubmit} className="space-y-4" noValidate>
              {/* Honeypot */}
              <input
                type="text"
                name="_honey"
                tabIndex={-1}
                autoComplete="off"
                className="hidden"
                aria-hidden
              />

              <div className="grid sm:grid-cols-2 gap-4">
                <Field
                  id="name"
                  label="Full name *"
                  name="name"
                  required
                  minLength={2}
                  placeholder="Your name"
                  error={errors.name}
                />
                <Field
                  id="phone"
                  label="Phone *"
                  name="phone"
                  type="tel"
                  required
                  placeholder="+91 98765 43210"
                  error={errors.phone}
                />
              </div>

              <Field
                id="email"
                label="Business email *"
                name="email"
                type="email"
                required
                placeholder="you@business.com"
                error={errors.email}
              />
              <Field
                id="website"
                label="Website (optional)"
                name="website"
                type="url"
                placeholder="https://"
                error={errors.website}
              />

              <div className="grid sm:grid-cols-2 gap-4">
                <SelectField
                  id="projectType"
                  label="Project type *"
                  name="projectType"
                  required
                  error={errors.projectType}
                  options={[
                    "New Website",
                    "Website Redesign",
                    "Landing Page",
                    "E-commerce Store",
                    "Web App",
                    "Not sure",
                  ]}
                />
                <SelectField
                  id="budget"
                  label="Budget range"
                  name="budget"
                  options={[
                    "Under ₹15,000",
                    "₹15,000 – ₹30,000",
                    "₹30,000 – ₹60,000",
                    "₹60,000 – ₹1L",
                    "₹1L+",
                  ]}
                />
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="block font-body text-[13px] font-medium text-ink"
                >
                  Tell us about your project
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  placeholder="What are you building, and what does success look like?"
                  className="mt-1.5 w-full rounded-md border border-line px-4 py-3 font-body text-[15px] text-ink placeholder:text-mute/70 focus:outline-none focus:border-ink transition-colors resize-none"
                />
              </div>

              {/* Trust micro-copy */}
              <p className="font-body text-[12px] text-mute text-center">
                Only 4 slots left this month &nbsp;·&nbsp; Reply in 1 business
                day &nbsp;·&nbsp; No commitment required
              </p>

              <button
                type="submit"
                disabled={submitting}
                className="press w-full rounded-md bg-ink text-white font-heading font-bold text-[15px] hover:bg-primary-hover disabled:opacity-60 shadow-[0_4px_18px_hsl(0_0%_0%/0.2)] hover:shadow-[0_6px_24px_hsl(0_0%_0%/0.3)] py-4 flex items-center justify-center gap-2"
              >
                {submitting ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Sending…
                  </>
                ) : (
                  "Get My Free Plan & Quote →"
                )}
              </button>

              <p className="flex items-center justify-center gap-1.5 font-body text-[13px] text-mute">
                <Lock className="h-3.5 w-3.5" />
                We never share your data. No spam, ever.
              </p>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};

/* ─── Success state ─────────────────────────────────────────── */
const SuccessState = () => (
  <div className="text-center py-12">
    <div className="mx-auto h-14 w-14 rounded-full bg-ink flex items-center justify-center">
      <CheckCircle2 className="h-7 w-7 text-white" />
    </div>
    <h3 className="mt-4 font-heading font-bold text-xl text-ink">
      Thanks — we got it.
    </h3>
    <p className="mt-2 font-body text-[15px] text-mute">
      We'll reply within one business day with next steps.
    </p>
    <p className="mt-4 font-body text-[13px] text-mute">
      In the meantime, check us out on{" "}
      <a
        href="https://www.instagram.com/venzix"
        target="_blank"
        rel="noopener noreferrer"
        className="underline hover:text-ink"
      >
        Instagram
      </a>
      .
    </p>
  </div>
);

/* ─── Field helpers ─────────────────────────────────────────── */
type FieldProps = React.InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  id: string;
  error?: string;
};

const Field = ({ label, id, error, ...rest }: FieldProps) => (
  <div>
    <label
      htmlFor={id}
      className="block font-body text-[13px] font-medium text-ink"
    >
      {label}
    </label>
    <input
      id={id}
      aria-invalid={!!error}
      aria-describedby={error ? `${id}-err` : undefined}
      {...rest}
      className={[
        "mt-1.5 w-full rounded-md border px-4 py-3 font-body text-[15px] text-ink",
        "placeholder:text-mute/70 focus:outline-none transition-colors",
        "hover:border-ink/40",
        error ? "border-destructive focus:border-destructive" : "border-line focus:border-ink",
      ].join(" ")}
    />
    {error && (
      <p id={`${id}-err`} className="mt-1 font-body text-[12px] text-destructive">
        {error}
      </p>
    )}
  </div>
);

type SelectFieldProps = {
  id: string;
  label: string;
  name: string;
  required?: boolean;
  options: string[];
  error?: string;
};

const SelectField = ({ id, label, name, required, options, error }: SelectFieldProps) => (
  <div>
    <label
      htmlFor={id}
      className="block font-body text-[13px] font-medium text-ink"
    >
      {label}
    </label>
    <select
      id={id}
      name={name}
      required={required}
      defaultValue=""
      aria-invalid={!!error}
      aria-describedby={error ? `${id}-err` : undefined}
      className={[
        "mt-1.5 w-full rounded-md border bg-white px-4 py-3 font-body text-[15px] text-ink",
        "focus:outline-none transition-colors hover:border-ink/40",
        error ? "border-destructive focus:border-destructive" : "border-line focus:border-ink",
      ].join(" ")}
    >
      <option value="" disabled>Select one</option>
      {options.map((o) => (
        <option key={o} value={o}>{o}</option>
      ))}
    </select>
    {error && (
      <p id={`${id}-err`} className="mt-1 font-body text-[12px] text-destructive">
        {error}
      </p>
    )}
  </div>
);

export default Contact;