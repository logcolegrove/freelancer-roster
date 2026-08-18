/**
 * ============================================================
 * SUPABASE CLIENT — single shared instance
 * ============================================================
 *
 * This used to live inline in FreelancerRoster.jsx. It moved here because
 * AuthGate.jsx and FreelancerRoster.jsx must use the SAME client object.
 *
 * Why that matters: when you sign in, the login token is stored on the
 * client instance. Data queries only get past the database's security
 * rules if they carry that token. Two separate client instances would
 * mean the login happens on one and the queries go out on the other --
 * so every read would come back empty and you'd have no idea why.
 *
 * Do not create another createClient() call anywhere else in the app.
 */

import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = process.env.REACT_APP_SUPABASE_URL || "";
const SUPABASE_KEY = process.env.REACT_APP_SUPABASE_ANON_KEY || "";

export const supabase =
  SUPABASE_URL && SUPABASE_KEY
    ? createClient(SUPABASE_URL, SUPABASE_KEY, {
        auth: {
          persistSession: true,      // stay signed in across refreshes
          autoRefreshToken: true,    // renew quietly before expiry
          detectSessionInUrl: true,  // required for magic links to work
        },
      })
    : null;

// True when the environment variables are missing entirely -- lets AuthGate
// show a clear "not configured" message instead of a blank white screen.
export const isConfigured = Boolean(SUPABASE_URL && SUPABASE_KEY);
