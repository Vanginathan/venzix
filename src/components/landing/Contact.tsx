import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CheckCircle2, Phone, Mail, MapPin, MessageCircle } from "lucide-react";
import { toast } from "sonner";

const Contact = () => {
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    if (data.get("website")) return; // honeypot
    setSubmitting(true);
    await new Promise((r) => setTimeout(r, 900));
    setSubmitting(false);
    setDone(true);
    toast.success("Request sent! We'll reply within 24 hours.");
  };

  return (
    <section id="contact" className="py-20 md:py-28">
      <div className="container grid gap-12 lg:grid-cols-2">
        <div>
          <p className="text-sm font-semibold text-primary uppercase tracking-wider">Contact</p>
          <h2 className="mt-3 text-3xl md:text-4xl font-semibold text-surface-dark">
            Tell us about your project
          </h2>
          <p className="mt-4 text-muted-foreground max-w-md">
            Share a few details and we'll come back within 24 hours with a clear plan, timeline, and quote. No pressure, no spam.
          </p>

          <ul className="mt-8 space-y-4">
            <li className="flex items-start gap-3">
              <Phone className="h-5 w-5 text-primary mt-0.5" />
              <div>
                <div className="text-sm text-muted-foreground">Call us</div>
                <a href="tel:+919876543210" className="font-medium text-surface-dark hover:text-primary">+91 98765 43210</a>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <MessageCircle className="h-5 w-5 text-primary mt-0.5" />
              <div>
                <div className="text-sm text-muted-foreground">WhatsApp</div>
                <a href="https://wa.me/919876543210" target="_blank" rel="noreferrer" className="font-medium text-surface-dark hover:text-primary">Chat now</a>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <Mail className="h-5 w-5 text-primary mt-0.5" />
              <div>
                <div className="text-sm text-muted-foreground">Email</div>
                <a href="mailto:hello@devcraftstudio.com" className="font-medium text-surface-dark hover:text-primary">hello@devcraftstudio.com</a>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <MapPin className="h-5 w-5 text-primary mt-0.5" />
              <div>
                <div className="text-sm text-muted-foreground">Studio</div>
                <div className="font-medium text-surface-dark">4th Floor, Prestige Tower, Anna Salai, Chennai 600002</div>
              </div>
            </li>
          </ul>
        </div>

        <div className="bg-card border rounded-2xl p-6 md:p-8 shadow-card">
          {done ? (
            <div className="text-center py-12">
              <div className="mx-auto h-14 w-14 rounded-full bg-success/15 flex items-center justify-center">
                <CheckCircle2 className="h-7 w-7 text-success" />
              </div>
              <h3 className="mt-4 text-xl font-semibold text-surface-dark">Thanks — we got it!</h3>
              <p className="mt-2 text-muted-foreground">We'll reply within 24 hours with next steps.</p>
            </div>
          ) : (
            <form onSubmit={onSubmit} className="space-y-4">
              <input type="text" name="website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden />

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name">Full name *</Label>
                  <Input id="name" name="name" required aria-required className="mt-1.5" placeholder="Your name" />
                </div>
                <div>
                  <Label htmlFor="phone">Phone *</Label>
                  <Input id="phone" name="phone" type="tel" required aria-required className="mt-1.5" placeholder="+91 98765 43210" />
                </div>
              </div>

              <div>
                <Label htmlFor="email">Email *</Label>
                <Input id="email" name="email" type="email" required aria-required className="mt-1.5" placeholder="you@business.com" />
              </div>

              <div>
                <Label htmlFor="business">Business type</Label>
                <Select name="business">
                  <SelectTrigger id="business" className="mt-1.5"><SelectValue placeholder="Select one" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="retail">Retail Shop</SelectItem>
                    <SelectItem value="restaurant">Restaurant or Cafe</SelectItem>
                    <SelectItem value="healthcare">Healthcare or Clinic</SelectItem>
                    <SelectItem value="services">Professional Services</SelectItem>
                    <SelectItem value="ecommerce">E-commerce</SelectItem>
                    <SelectItem value="startup">Startup</SelectItem>
                    <SelectItem value="ngo">NGO or Education</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="message">Tell us about your project *</Label>
                <Textarea id="message" name="message" rows={4} required aria-required className="mt-1.5" placeholder="What are you building, and what does success look like?" />
              </div>

              <div>
                <Label htmlFor="source">How did you find us?</Label>
                <Select name="source">
                  <SelectTrigger id="source" className="mt-1.5"><SelectValue placeholder="Select one" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="google">Google Search</SelectItem>
                    <SelectItem value="maps">Google Maps</SelectItem>
                    <SelectItem value="instagram">Instagram</SelectItem>
                    <SelectItem value="facebook">Facebook</SelectItem>
                    <SelectItem value="referral">Referral from a friend</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Button type="submit" disabled={submitting} className="w-full h-12 text-base">
                {submitting ? "Sending..." : "Send My Request"}
              </Button>
              <p className="text-xs text-muted-foreground text-center">We reply within 24 hours. Your details stay private.</p>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};

export default Contact;
