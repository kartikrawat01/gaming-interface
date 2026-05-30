const SUPABASE_URL = "https://johfiuwwcryicgplnqew.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpvaGZpdXd3Y3J5aWNncGxucWV3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzgxNDI3MjksImV4cCI6MjA5MzcxODcyOX0.hwuCeWXZOzVJKh5y__rkTiEnxvOiVPaqe7CdqCIRMmU"

window.supabaseClient =
  window.supabase.createClient(
    SUPABASE_URL,
    SUPABASE_ANON_KEY,
    {
    auth: {
      persistSession: true,
      storageKey: 'sb-session',
      storage: window.localStorage,
      autoRefreshToken: true,
      detectSessionInUrl: true
    }
  }
  );

window.sb =
  window.supabaseClient;