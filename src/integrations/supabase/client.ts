// src/integrations/supabase/client.ts
// CRITICAL FIX: URL must be the base project URL, NOT the REST endpoint.
// Old: https://ixyxfrhcyekqramrfqgj.supabase.co/rest/v1/  ← WRONG (causes silent failures)
// New: https://ixyxfrhcyekqramrfqgj.supabase.co           ← CORRECT

import { createClient } from "@supabase/supabase-js";
import type { Database } from "./types";

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
  throw new Error(
    "Missing Supabase env vars. Set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in your .env file."
  );
}

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: {
    storage: localStorage,
    persistSession: true,
    autoRefreshToken: true,
  },
});