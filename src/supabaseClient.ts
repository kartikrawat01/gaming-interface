import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASEURL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASEANONKEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error(
    "❌ Supabase env vars missing! VITE_SUPABASEURL aur VITE_SUPABASEANONKEY set karo."
  );
}

// export const supabase = createClient(supabaseUrl, supabaseAnonKey);
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    storageKey: 'sb-session',      // ← same key jo public/supabaseClient.js use karta hai
    storage: window.localStorage,
    autoRefreshToken: true,
    detectSessionInUrl: true,
  }
});
