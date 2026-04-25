import { useState } from "react";
import { CheckCircle2 } from "lucide-react";
import { toast } from "sonner";

/**
 * Lead capture — dark section with white form card.
 * Honeypot for spam, inline success state, no redirect.
 */
const Contact = () => {
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    const fd = new FormData(e.currentTarget);
    if (fd.get("_honey")) return; // silent honeypot
    setSubmitting(true);
    try {
      // Replace endpoint at deploy time
      // await fetch("https://formspree.io/f/REPLACE_WITH_YOUR_ID", { ... });
      await new Promise((r) => setTimeout(r, 800));
      setDone(true);
      toast.success("Request received — we’ll reply within one business day.");
    } catch {
      setError("Something went wrong. Please try again or email hello@devcraftstudio.com.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-24 md:py-32 bg-ink text-white">
      <div className="container max-w-3xl text-center">
        <p className="font-body text-[13px] uppercase tracking-[0.18em] text-white/50">Start a project</p>
        <h2 className="mt-3 font-display text-4xl md:text-5xl text-white leading-tight">
          Let us build your next client-generating website.
        </h2>
        <p className="mt-4 font-body text-[16px] text-white/60 max-w-xl mx-auto">
          Fill out the form and we’ll reply within one business day with a clear plan, timeline, and quote.
        </p>

        <div className="mt-12 bg-white text-ink rounded-lg p-6 md:p-10 text-left max-w-2xl mx-auto">
          {done ? (
            <div className="text-center py-12">
              <div className="mx-auto h-14 w-14 rounded-full bg-ink flex items-center justify-center">
                <CheckCircle2 className="h-7 w-7 text-white" />
              </div>
              <h3 className="mt-4 font-heading font-bold text-xl text-ink">Thanks — we got it.</h3>
              <p className="mt-2 font-body text-[15px] text-mute">
                We’ll reply within one business day with next steps.
              </p>
            </div>
          ) : (
            <form onSubmit={onSubmit} className="space-y-4">
              <input type="text" name="_honey" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden />

              <div className="grid sm:grid-cols-2 gap-4">
                <Field id="name" label="Full name *" name="name" required minLength={2} placeholder="Your name" />
                <Field id="phone" label="Phone *" name="phone" type="tel" required placeholder="+91 98765 43210" pattern="[0-9+\s\-()]{8,}" />
              </div>

              <Field id="email" label="Business email *" name="email" type="email" required placeholder="you@business.com" />
              <Field id="website" label="Website (optional)" name="website" type="url" placeholder="https://" />

              <div className="grid sm:grid-cols-2 gap-4">
                <Select id="projectType" label="Project type *" name="projectType" required options={[
                  "New Website", "Redesign", "Landing Page", "Google Business Setup", "Not sure",
                ]} />
                <Select id="budget" label="Budget range" name="budget" options={[
                  "Under ₹25,000", "₹25,000 – ₹60,000", "₹60,000 – ₹1.5L", "₹1.5L+",
                ]} />
              </div>

              <div>
                <label htmlFor="message" className="block font-body text-[13px] font-medium text-ink">
                  Tell us about your project
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  placeholder="What are you building, and what does success look like?"
                  className="mt-1.5 w-full rounded-md border border-line px-4 py-3 font-body text-[15px] text-ink placeholder:text-mute/70 focus:outline-none focus:border-ink"
                />
              </div>

              {error && <p className="text-sm text-destructive">{error}</p>}

              <button
                type="submit"
                disabled={submitting}
                className="w-full h-12 rounded-md bg-ink text-white font-heading font-bold text-[15px] transition-base hover:bg-primary-hover disabled:opacity-60"
              >
                {submitting ? "Sending…" : "Send My Project Details"}
              </button>
              <p className="text-center font-body text-[13px] text-mute">
                We never share your data. No spam, ever.
              </p>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};

/* ---------- small field helpers ---------- */

type FieldProps = React.InputHTMLAttributes<HTMLInputElement> & { label: string; id: string };
const Field = ({ label, id, ...rest }: FieldProps) => (
  <div>
    <label htmlFor={id} className="block font-body text-[13px] font-medium text-ink">
      {label}
    </label>
    <input
      id={id}
      {...rest}
      className="mt-1.5 w-full rounded-md border border-line px-4 py-3 font-body text-[15px] text-ink placeholder:text-mute/70 focus:outline-none focus:border-ink"
    />
  </div>
);

type SelectProps = { id: string; label: string; name: string; required?: boolean; options: string[] };
const Select = ({ id, label, name, required, options }: SelectProps) => (
  <div>
    <label htmlFor={id} className="block font-body text-[13px] font-medium text-ink">
      {label}
    </label>
    <select
      id={id}
      name={name}
      required={required}
      defaultValue=""
      className="mt-1.5 w-full rounded-md border border-line bg-white px-4 py-3 font-body text-[15px] text-ink focus:outline-none focus:border-ink"
    >
      <option value="" disabled>Select one</option>
      {options.map((o) => (
        <option key={o} value={o}>{o}</option>
      ))}
    </select>
  </div>
);

export default Contact;