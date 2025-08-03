import { createClient, SupabaseClient } from "@supabase/supabase-js";
import { getAuth } from "@clerk/nextjs/server";
import { NextApiRequest } from "next";

const supabaseURL = process.env.SUPABASE_URL || "";
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY || "";

export function createSupabaseClient(request: NextApiRequest): SupabaseClient {
  const { getToken } = getAuth(request);

  return createClient(supabaseURL, supabaseAnonKey, {
    accessToken: async () => getToken() ?? null,
  });
}
