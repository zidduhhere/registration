import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseSecretKey = import.meta.env.VITE_SUPABASE_SECRET_KEY
// Admin client with service role key for privileged operations
export const adminSupabase = createClient(supabaseUrl, supabaseSecretKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
});
