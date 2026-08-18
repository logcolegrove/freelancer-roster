/**
 * ============================================================
 * AUTH GATE — sign-in wall + viewer/editor roles
 * ============================================================
 *
 * Wraps the roster so nothing renders until someone is signed in and their
 * role is known.
 *
 * Roles come from the database, not from here:
 *   - a row in roster_members  -> viewer | editor | admin
 *   - no row, @foundant.com    -> viewer (implicit)
 *   - anything else            -> none (no access)
 *
 * This file decides what to SHOW. The database decides what's ALLOWED.
 * Those are deliberately separate -- someone can bypass this UI entirely
 * by calling the API directly, and the database policies are what stop
 * them. Never treat a check in this file as the security boundary.
 *
 * Sign-in is by email magic link today. Switching to Microsoft later means
 * changing one function (see signInWithMicrosoft at the bottom).
 */

import { createContext, useContext, useEffect, useState, useCallback } from "react";
import { supabase, isConfigured } from "./supabaseClient";

const ALLOWED_DOMAIN = "foundant.com";

/* ============================================================
   Module-level edit flag
   ============================================================
   saveLS() in FreelancerRoster.jsx is a plain function, not a React
   component, so it cannot read context. This mirror variable lets it ask
   "may this user write?" from anywhere.

   It is a convenience, NOT a security control. Anyone can flip it in a
   browser console. The database policies are the real gate. */

let _canEdit = false;
export function canEditNow() {
  return _canEdit;
}

/* ============================================================
   Context
   ============================================================ */

const AuthContext = createContext({
  session: null,
  email: null,
  role: "none",
  canEdit: false,
  isAdmin: false,
  signOut: () => {},
});

export function useAuth() {
  return useContext(AuthContext);
}

/* ============================================================
   Role lookup
   ============================================================ */

async function resolveRole(session) {
  const email = (session?.user?.email || "").toLowerCase().trim();
  if (!email) return { email: null, role: "none" };

  // An explicit membership row wins. maybeSingle() returns null rather than
  // erroring when there's no row, which is the normal case for viewers.
  const { data, error } = await supabase
    .from("roster_members")
    .select("role")
    .eq("email", email)
    .maybeSingle();

  if (error) {
    // Don't fail open. If we can't read the role, assume least privilege.
    console.error("Role lookup failed:", error);
    return { email, role: email.endsWith("@" + ALLOWED_DOMAIN) ? "viewer" : "none" };
  }

  if (data?.role) return { email, role: data.role };
  return { email, role: email.endsWith("@" + ALLOWED_DOMAIN) ? "viewer" : "none" };
}

/* ============================================================
   Main gate
   ============================================================ */

export default function AuthGate({ children }) {
  const [status, setStatus] = useState("loading"); // loading | signedOut | ready
  const [session, setSession] = useState(null);
  const [email, setEmail] = useState(null);
  const [role, setRole] = useState("none");

  const applySession = useCallback(async (nextSession) => {
    if (!nextSession) {
      _canEdit = false;
      setSession(null);
      setEmail(null);
      setRole("none");
      setStatus("signedOut");
      return;
    }
    const { email: e, role: r } = await resolveRole(nextSession);
    _canEdit = r === "editor" || r === "admin";
    setSession(nextSession);
    setEmail(e);
    setRole(r);
    setStatus("ready");
  }, []);

  useEffect(() => {
    if (!isConfigured) {
      setStatus("unconfigured");
      return;
    }
    let cancelled = false;

    supabase.auth.getSession().then(({ data }) => {
      if (!cancelled) applySession(data?.session || null);
    });

    // Fires on sign-in, sign-out, and token refresh. Also how the magic-link
    // return trip gets picked up.
    const { data: sub } = supabase.auth.onAuthStateChange((_event, s) => {
      if (!cancelled) applySession(s);
    });

    return () => {
      cancelled = true;
      sub?.subscription?.unsubscribe();
    };
  }, [applySession]);

  const signOut = useCallback(async () => {
    _canEdit = false;
    await supabase.auth.signOut();
    // Full reload clears the in-memory roster cache. Without this, the next
    // person to sign in on this browser would briefly see cached data.
    window.location.reload();
  }, []);

  if (status === "unconfigured") return <Shell><Message title="Not configured" body="Supabase environment variables are missing. Check REACT_APP_SUPABASE_URL and REACT_APP_SUPABASE_ANON_KEY in your Vercel project settings." /></Shell>;
  if (status === "loading")      return <Shell><div style={S.muted}>Loading…</div></Shell>;
  if (status === "signedOut")    return <Shell><SignIn /></Shell>;

  if (role === "none") {
    return (
      <Shell>
        <Message
          title="No access"
          body={`${email} isn't able to view this roster. It's limited to Foundant accounts. If you think that's wrong, contact Logan.`}
          action={<button style={S.linkBtn} onClick={signOut}>Sign out</button>}
        />
      </Shell>
    );
  }

  return (
    <AuthContext.Provider
      value={{ session, email, role, canEdit: _canEdit, isAdmin: role === "admin", signOut }}
    >
      {children}
    </AuthContext.Provider>
  );
}

/* ============================================================
   Sign-in screen
   ============================================================ */

function SignIn() {
  const [addr, setAddr] = useState("");
  const [state, setState] = useState("idle"); // idle | sending | sent | error
  const [errMsg, setErrMsg] = useState("");

  const send = async (e) => {
    e?.preventDefault();
    const clean = addr.trim().toLowerCase();

    if (!clean.endsWith("@" + ALLOWED_DOMAIN)) {
      setState("error");
      setErrMsg(`Please use your @${ALLOWED_DOMAIN} email address.`);
      return;
    }

    setState("sending");
    const { error } = await supabase.auth.signInWithOtp({
      email: clean,
      options: { emailRedirectTo: window.location.origin },
    });

    if (error) {
      setState("error");
      // Supabase's own wording here is opaque, and rate limiting is the
      // overwhelmingly likely cause on the free plan.
      setErrMsg(
        /rate|limit|seconds/i.test(error.message)
          ? "Too many requests. Wait a minute and try again."
          : error.message
      );
      return;
    }
    setState("sent");
  };

  if (state === "sent") {
    return (
      <Message
        title="Check your email"
        body={`We sent a sign-in link to ${addr.trim().toLowerCase()}. Open it on this device. The link expires in about an hour.`}
        action={<button style={S.linkBtn} onClick={() => setState("idle")}>Use a different address</button>}
      />
    );
  }

  return (
    <form onSubmit={send} style={{ width: 340, textAlign: "left" }}>
      <div style={S.title}>Foundant's Freelancer &amp; Agency Roster</div>
      <div style={{ ...S.muted, marginBottom: 22 }}>
        Sign in with your Foundant email to continue.
      </div>

      <label style={S.label}>Work email</label>
      <input
        type="email"
        required
        autoFocus
        value={addr}
        onChange={(e) => { setAddr(e.target.value); if (state === "error") setState("idle"); }}
        placeholder={`you@${ALLOWED_DOMAIN}`}
        style={S.input}
      />

      {state === "error" && <div style={S.error}>{errMsg}</div>}

      <button type="submit" disabled={state === "sending"} style={{ ...S.primaryBtn, opacity: state === "sending" ? 0.6 : 1 }}>
        {state === "sending" ? "Sending…" : "Email me a sign-in link"}
      </button>

      <div style={{ ...S.muted, fontSize: 12, marginTop: 14 }}>
        No password needed — we'll email you a link that signs you in.
      </div>
    </form>
  );
}

/* ============================================================
   Header badge — shows who you are and your access level
   ============================================================ */

export function UserBadge() {
  const { email, role, signOut } = useAuth();
  const [open, setOpen] = useState(false);

  const label = role === "viewer" ? "View only" : role === "editor" ? "Editor" : "Admin";

  return (
    <div style={{ position: "relative", display: "flex", alignItems: "center", gap: 8 }}>
      {role === "viewer" && (
        <span
          className="tip"
          data-tip="You can browse and search. Contact Logan for edit access."
          style={S.pill}
        >
          {label}
        </span>
      )}
      <button
        onClick={() => setOpen((o) => !o)}
        title={email || ""}
        style={S.avatar}
      >
        {(email || "?").charAt(0).toUpperCase()}
      </button>

      {open && (
        <>
          <div style={S.scrim} onClick={() => setOpen(false)} />
          <div style={S.menu}>
            <div style={{ fontSize: 12, color: "#53565A", wordBreak: "break-all", marginBottom: 2 }}>{email}</div>
            <div style={{ fontSize: 11, color: "#9ca3af", marginBottom: 10 }}>{label}</div>
            <button style={S.menuBtn} onClick={signOut}>Sign out</button>
          </div>
        </>
      )}
    </div>
  );
}

/* ============================================================
   Presentation bits
   ============================================================ */

function Shell({ children }) {
  return (
    <div style={S.shell}>
      <link href="https://fonts.googleapis.com/css2?family=Lato:ital,wght@0,300;0,400;0,700;0,900;1,400&display=swap" rel="stylesheet" />
      <div style={S.card}>{children}</div>
    </div>
  );
}

function Message({ title, body, action }) {
  return (
    <div style={{ width: 340, textAlign: "left" }}>
      <div style={S.title}>{title}</div>
      <div style={{ ...S.muted, marginBottom: action ? 18 : 0 }}>{body}</div>
      {action}
    </div>
  );
}

/* Palette matches FreelancerRoster.jsx: navy #002631, teal #007377,
   background #f6f9f8, rule #e8efee. */
const S = {
  shell: {
    fontFamily: "'Lato', sans-serif",
    background: "#f6f9f8",
    color: "#002631",
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
  },
  card: {
    background: "#fff",
    border: "1px solid #e8efee",
    borderRadius: 8,
    padding: "34px 32px",
    boxShadow: "0 1px 3px rgba(0,38,49,0.06)",
  },
  title: { fontWeight: 900, fontSize: 20, letterSpacing: "-0.02em", marginBottom: 8, lineHeight: 1.25 },
  muted: { fontSize: 13, color: "#53565A", lineHeight: 1.55 },
  label: { display: "block", fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.04em", color: "#53565A", marginBottom: 6 },
  input: { width: "100%", boxSizing: "border-box", padding: "10px 12px", fontSize: 14, fontFamily: "inherit", color: "#002631", background: "#fff", border: "1px solid #e8efee", borderRadius: 5, outline: "none", marginBottom: 14 },
  primaryBtn: { width: "100%", padding: "11px 18px", fontSize: 13, fontWeight: 700, fontFamily: "inherit", background: "#007377", color: "#fff", border: "none", borderRadius: 5, cursor: "pointer" },
  linkBtn: { padding: 0, fontSize: 13, fontWeight: 600, fontFamily: "inherit", background: "none", color: "#007377", border: "none", cursor: "pointer", textDecoration: "underline" },
  error: { fontSize: 12.5, color: "#dc2626", marginBottom: 12, lineHeight: 1.5 },
  pill: { fontSize: 11, fontWeight: 700, letterSpacing: "0.03em", textTransform: "uppercase", color: "#53565A", background: "#f1f5f4", border: "1px solid #e8efee", borderRadius: 4, padding: "4px 8px", cursor: "default" },
  avatar: { width: 30, height: 30, borderRadius: "50%", border: "1px solid #e8efee", background: "#002631", color: "#fff", fontSize: 12, fontWeight: 700, fontFamily: "inherit", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", padding: 0 },
  scrim: { position: "fixed", inset: 0, zIndex: 60 },
  menu: { position: "absolute", top: 38, right: 0, zIndex: 61, background: "#fff", border: "1px solid #e8efee", borderRadius: 6, padding: 12, minWidth: 190, boxShadow: "0 8px 24px rgba(0,38,49,0.12)" },
  menuBtn: { width: "100%", padding: "7px 10px", fontSize: 12.5, fontWeight: 600, fontFamily: "inherit", background: "#fff", color: "#002631", border: "1px solid #e8efee", borderRadius: 5, cursor: "pointer", textAlign: "left" },
};

/* ============================================================
   FOR LATER — Microsoft sign-in
   ============================================================
   Once IT has created the Entra app registration and it's configured in
   Supabase, swap the magic-link form for a single button calling this.
   Everything else -- roles, policies, the badge -- stays exactly the same.

   export async function signInWithMicrosoft() {
     return supabase.auth.signInWithOAuth({
       provider: "azure",
       options: { scopes: "openid profile email", redirectTo: window.location.origin },
     });
   }
*/
