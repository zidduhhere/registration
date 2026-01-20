import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;
const supabaseServiceKey = import.meta.env.VITE_SUPABASE_SECRET_KEY;
const isDebugMode = import.meta.env.VITE_DEBUG_MODE === 'true';

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Service role client for admin operations (debug mode only)
export const supabaseAdmin = isDebugMode && supabaseServiceKey 
  ? createClient(supabaseUrl, supabaseServiceKey, {
      auth: {
        autoRefreshToken: false,
        persistSession: false
      }
    })
  : null;

export { isDebugMode };
