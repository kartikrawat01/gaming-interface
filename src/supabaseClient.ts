import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://johfiuwwcryicgplnqew.supabase.co";
// const supabaseUrl= "https://gcihnknquhwcubcmfqry.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpvaGZpdXd3Y3J5aWNncGxucWV3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzgxNDI3MjksImV4cCI6MjA5MzcxODcyOX0.hwuCeWXZOzVJKh5y__rkTiEnxvOiVPaqe7CdqCIRMmU"

// const supabaseAnonKey="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdjaWhua25xdWh3Y3ViY21mcXJ5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzgwNjQ1NTUsImV4cCI6MjA5MzY0MDU1NX0.f8Ym24RWmI538sRtfm6TI-CNnHukOmfKvQ59qwOXzOU";
export const supabase = createClient(supabaseUrl, supabaseAnonKey);