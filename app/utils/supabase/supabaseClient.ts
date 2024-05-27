// supabaseClient.ts
import { createClient, SupabaseClient } from '@supabase/supabase-js'
import { Database } from '@/app/types/supabase';

// Ensure that the environment variables are defined
const supabaseUrl: string = process.env.NEXT_PUBLIC_SUPABASE_URL as string;
const supabaseAnonKey: string = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string;

// Initialize the Supabase client
const supabase: SupabaseClient = createClient<Database>(supabaseUrl, supabaseAnonKey);

export default supabase;