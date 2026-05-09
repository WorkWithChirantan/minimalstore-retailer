import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://zsvghgohrxlhfbwzoldn.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpzdmdoZ29ocnhsaGZid3pvbGRuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzc5OTM3MzQsImV4cCI6MjA5MzU2OTczNH0.pgVm39eMD7Pf1dlN4sHQwMs2PMBd3ewnJPHZ8AYltWM';

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true,
  },
});
