import { createClient, SupabaseClient } from "@supabase/supabase-js";

const supabaseURL = process.env.SUPABASE_URL || "";
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY || "";

const supabase: SupabaseClient = createClient(supabaseURL, supabaseAnonKey);

export default supabase;
