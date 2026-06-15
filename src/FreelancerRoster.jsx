/**
 * ============================================================
 * FREELANCER & AGENCY ROSTER — with AI Recommendation Engine
 * StoryMatch-style list view with drag-reorder, resize, filters
 * ============================================================
 */

import { useState, useMemo, useRef, useEffect, useCallback } from "react";
import { createClient } from "@supabase/supabase-js";
import {
  Search, X, Sparkles, ChevronDown, ChevronUp, ExternalLink,
  Mic, MicOff, Send, ArrowLeft, Copy, Check,
  AlertCircle, LayoutGrid, ChevronRight, Plus,
  XCircle, ChevronsUpDown, HelpCircle, Palette, Video,
  Camera, Wand2, Zap, Clock, MessageCircle, MoreHorizontal, Star,
  ArrowUp, ArrowDown, EyeOff, Filter, Pencil, Trash2, GripVertical,
} from "lucide-react";

const STARTER_ROSTER = [
  {
    id: 1, name: "Sari Miller", email: "sarijones1@gmail.com",
    website: "https://sarimillerdesign.com", location: "Missoula, MT",
    categories: ["design", "animation"],
    skills: ["graphic design", "presentation design", "ebook design", "one-pager design", "static ad design", "social ads", "brand identity", "motion graphics", "web design", "Figma", "After Effects", "Illustrator", "InDesign", "PowerPoint"],
    bestAt: ["Figma Templates & Ebooks", "Static Ad Design", "Presentation Design"],
    tier: "PRO", trust: "TRUSTED", price: 2,
    speed: "standard", responsiveness: "very", approvedVendor: true, star: true,
    notes: "Emmy award-winning designer based in Missoula. Worked with B2B/SaaS clients including Cisco, Microsoft, and Slack. Highest output and quality on the roster.",
  },
  {
    id: 2, name: "Beth Paulsen", email: "beth@paulsenstudio.com",
    website: "https://paulsenstudio.com", location: "Los Angeles, CA",
    categories: ["design"],
    skills: ["brand identity", "brand refresh", "sales enablement design", "ebook design", "one-pager design", "case study design", "event design", "tradeshow graphics", "social ads", "presentation design", "graphic design", "Figma", "Illustrator", "InDesign"],
    bestAt: ["B2B SaaS Brand Design", "Sales Enablement Collateral", "Event & Tradeshow Design"],
    tier: "PRO", trust: "TRUSTED", price: 2,
    speed: "standard", responsiveness: "very", approvedVendor: true,
    notes: "B2B SaaS brand designer in LA. Strategic thinker who treats design as a growth lever. Strong portfolio with software and tech companies.",
  },
  {
    id: 3, name: "RTW Photography", email: "bookings@ridethewave.co",
    website: "https://ridethewave.co", location: "Orlando, FL",
    categories: ["photo", "video"],
    skills: ["event photography", "corporate photography", "headshots", "video production", "event videography", "drone", "livestreaming"],
    bestAt: ["Event Photography", "Corporate Event Videography"],
    tier: "PRO", trust: "TRUSTED", price: 2,
    speed: "standard", responsiveness: "neutral", approvedVendor: true,
    notes: "Full-service event photo and video team based in Orlando. Travels for corporate events. Reliable for conferences and large gatherings.",
  },
  {
    id: 4, name: "Austen Diamond", email: "info@austendiamond.com",
    website: "https://austendiamond.com", location: "Salt Lake City, UT",
    categories: ["photo"],
    skills: ["commercial photography", "editorial photography", "lifestyle photography", "portrait photography", "product photography"],
    bestAt: ["Commercial & Product Photography", "Editorial Photography"],
    tier: "PRO", trust: "TRUSTED", price: 2,
    speed: "fast", responsiveness: "neutral", approvedVendor: true,
    notes: "Commercial and editorial photographer based in Salt Lake City. Strong with both product and lifestyle work. Clean, polished aesthetic.",
  },
  {
    id: 5, name: "Alan (alan_art)", email: "Contact via Fiverr",
    website: "https://pro.fiverr.com/inbox/alan_art", location: "Kyrgyzstan",
    categories: ["animation"],
    skills: ["2D motion graphics", "Lottie animation", "After Effects", "explainer animation", "logo animation"],
    bestAt: ["2D Motion Graphics", "Lottie Animations"],
    tier: "BUDGET", trust: "TRUSTED", price: 1,
    speed: "fast", responsiveness: "slow", approvedVendor: true,
    notes: "Fiverr freelancer specializing in motion graphics and Lottie animations. Solid quality at budget price point. Communication can be slow due to time zone.",
  },
  {
    id: 6, name: "Mark Santos (markksantos)", email: "Contact via Fiverr",
    website: "https://pro.fiverr.com/inbox/markksantos", location: "United States",
    categories: ["video"],
    skills: ["video editing", "YouTube editing", "podcast editing", "thumbnail design", "social video"],
    bestAt: ["Video Editing", "YouTube Thumbnails"],
    tier: "BUDGET", trust: "PROVING", price: 1,
    speed: "fast", responsiveness: "neutral", approvedVendor: true,
    notes: "Fiverr video editor. Quality is low — barely a step above AI-generated output. Use only for very simple, low-stakes work.",
  },
  {
    id: 7, name: "Melissa Harlow (melissaharlowvo)", email: "Contact via Fiverr",
    website: "https://pro.fiverr.com/inbox/melissaharlowvo", location: "United States",
    categories: ["other"],
    skills: ["voiceover", "commercial voiceover", "narration", "e-learning", "explainer video VO"],
    bestAt: ["Commercial Voiceover", "Explainer Video Narration"],
    tier: "MID", trust: "PROVING", price: 2,
    speed: "fast", responsiveness: "neutral", approvedVendor: true,
    notes: "US-based female voiceover artist. Good for commercial and explainer narration. Quick turnaround on Fiverr.",
  },
  {
    id: 8, name: "Jessica (jessona)", email: "Contact via Fiverr",
    website: "https://pro.fiverr.com/inbox/jessona", location: "United Kingdom",
    categories: ["other"],
    skills: ["voiceover", "British accent", "narration", "commercial voiceover"],
    bestAt: ["British Accent Voiceover"],
    tier: "MID", trust: "PROVING", price: 3,
    speed: "fast", responsiveness: "slow", approvedVendor: true,
    notes: "British female voiceover artist based in the UK. Use when a British accent is specifically needed.",
  },
  {
    id: 9, name: "Vidico", email: "hello@vidico.com",
    website: "https://vidico.com", location: "Melbourne / New York",
    categories: ["video", "animation"],
    skills: ["explainer videos", "brand films", "product video", "animation", "motion graphics", "scriptwriting", "production"],
    bestAt: ["Explainer Videos for SaaS", "Full-Service Brand Films"],
    tier: "ELITE", trust: "NEW", price: 4,
    speed: "standard", responsiveness: "neutral", approvedVendor: false,
    notes: "Full-service creative production agency with offices in Melbourne and New York. Clients include Spotify, Square, Vimeo, Cisco. Premium pricing — agency-level work.",
  },
  {
    id: 10, name: "Explainly", email: "hello@explainly.com",
    website: "https://www.explainly.com", location: "Sausalito, CA",
    categories: ["animation"],
    skills: ["2D animation", "3D animation", "explainer videos", "mixed media animation", "motion graphics", "scriptwriting", "Lottie animation", "localization"],
    bestAt: ["Animated Explainer Videos", "2D & 3D Animation"],
    tier: "ELITE", trust: "NEW", price: 4,
    speed: "standard", responsiveness: "neutral", approvedVendor: false,
    notes: "Award-winning animation and explainer video agency. Offices across the US and London. Clients include Uber, Amazon, Google, JP Morgan, and HubSpot. End-to-end service from scripting to delivery. Premium pricing.",
  },
  {
    id: 11, name: "QLO Agency", email: "hello@qlo.agency",
    website: "https://www.qlo.agency", location: "Los Angeles, CA",
    categories: ["design", "animation"],
    skills: ["brand identity", "logo design", "brand guidelines", "UX/UI design", "web design", "advertising design", "packaging", "2D animation", "3D animation", "motion graphics", "product prototyping"],
    bestAt: ["Brand Identity & Strategy", "UX/UI Design"],
    tier: "ELITE", trust: "NEW", price: 4,
    speed: "standard", responsiveness: "neutral", approvedVendor: false,
    notes: "LA-based creative branding and design studio. Full-service from logo to web dev to animation. Strong art direction and visual identity work.",
  },
  {
    id: 12, name: "Ross McLane", email: "mclane.ross@gmail.com",
    website: "https://www.rossmclane.com", location: "Seacoast, NH",
    categories: ["photo", "video"],
    skills: ["video editing", "testimonial videos", "photography", "videography", "lifestyle photography", "travel photography", "portrait photography", "corporate photography", "content strategy"],
    bestAt: ["Video Editing", "Testimonial Videos"],
    tier: "MID", trust: "TRUSTED", price: 2,
    speed: "standard", responsiveness: "neutral", approvedVendor: true,
    notes: "Travel and active lifestyle photographer/videographer. Also does content strategy. Creative, edgy style. Has shot corporate executive portraits for Randstad.",
  },
  {
    id: 13, name: "Meridian Media", email: "dustin@meridianmediapa.com",
    website: "https://www.meridianmediapa.com", location: "Pittsburgh, PA",
    categories: ["video", "photo"],
    skills: ["video production", "corporate video", "event videography", "drone", "aerial video", "education video", "testimonial videos", "photography", "live streaming", "motion graphics", "color grading", "scriptwriting"],
    bestAt: ["Corporate Video Production", "Event Videography"],
    tier: "PRO", trust: "TRUSTED", price: 3,
    speed: "standard", responsiveness: "neutral", approvedVendor: true,
    notes: "Pittsburgh-based video production company. Also covers Philadelphia and Lancaster. Has done work for GivingData (GDConnect event videos). Strong with education, corporate, and drone content. FAA certified drone pilots.",
  },
  {
    id: 14, name: "Nexus Marketing", email: "anna.little@nexusmarketing.com",
    website: "https://nexusmarketing.com", location: "United States",
    categories: ["video"],
    skills: ["webinar clipping", "short-form video", "social video", "video editing", "branded bumpers", "webinar production", "content strategy"],
    bestAt: ["Webinar Clipping", "Social Video Content"],
    tier: "PRO", trust: "TRUSTED", price: 2,
    speed: "standard", responsiveness: "neutral", approvedVendor: true,
    notes: "B2B marketing agency specializing in turning webinar footage into branded short-form video clips for social media. Also does webinar production, content strategy, and design. Strong with mission-driven brands.",
  },
  {
    id: 15, name: "Tiffany Lee", email: "lee.tiffany40@gmail.com",
    website: "", location: "TBD",
    categories: ["design"],
    skills: ["social ad design", "document design", "graphic design", "presentation design"],
    bestAt: ["Social Ad Design", "Document Design"],
    tier: "MID", trust: "PROVING", price: 2,
    speed: "standard", responsiveness: "neutral", approvedVendor: true,
    notes: "Designer specializing in social ads and document design. Referred by Sari Miller.",
  },
  {
    id: 16, name: "Blue Barn Creative", email: "Carlos@bluebarncreative.com",
    website: "https://bluebarncreative.com", location: "San Diego, CA",
    categories: ["video"],
    skills: ["video production", "brand films", "commercials", "event videography", "documentary", "scriptwriting", "cinematography", "live streaming", "photography"],
    bestAt: ["Brand Videos & Commercials", "Event Videography"],
    tier: "PRO", trust: "TRUSTED", price: 4,
    speed: "standard", responsiveness: "neutral", approvedVendor: true,
    notes: "9x Emmy-winning boutique video production agency in San Diego. Founded by three TV industry veterans. Clients include Victorinox Swiss Army, Summer Fridays, and SyFy Channel. Boutique feel with agency-level polish.",
  },
  {
    id: 17, name: "Concentric Design", email: "hello@concentric.design",
    website: "https://www.concentric.design", location: "Chicago, IL + Boulder, CO",
    categories: ["design", "animation"],
    skills: ["brand identity", "brand strategy", "brand positioning", "naming", "creative direction", "visual identity", "web design", "print design", "editorial design", "presentation design", "packaging", "environmental signage", "illustration", "animation", "copywriting", "photography", "video production", "social media", "SEO", "marketing design support"],
    bestAt: ["Brand Strategy & Identity", "Web Design", "Print & Editorial Design"],
    tier: "ELITE", trust: "PROVING", price: 4,
    speed: "standard", responsiveness: "neutral", approvedVendor: true,
    notes: "Chicago + Boulder branding and digital studio founded by Blair Hannah and Jeff Meador. Full-service: brand strategy, identity, web, print, packaging, animation. Strong nonprofit experience plus enterprise clients including United Airlines, Hertz, Norwegian Cruise Line, Paylocity, Teach For America, and University of Chicago. Small studio model that assembles specialist collaborators per project, so pricing is more flexible than a typical firm of their caliber. Good fit for foundation/nonprofit clients given their portfolio.",
  },
];

const TIER = {
  BUDGET: { label: "Low", desc: "Low-cost, cost-driven. Good for simple, low-stakes work." },
  MID:    { label: "Mid",    desc: "Solid professional, good value. Reliable for standard projects." },
  PRO:    { label: "Pro",    desc: "Experienced, polished output. Can handle complex or visible work." },
  ELITE:  { label: "Elite",  desc: "Agency-level, premium work. For high-stakes, flagship projects." },
};
const TRUST = {
  NEW:     { label: "New",     color: "#5a6160", bg: "#eef0ef", desc: "Never used. No working history yet." },
  PROVING: { label: "Proving", color: "#5a6160", bg: "#eef0ef", desc: "Used once or twice. Still evaluating fit and reliability." },
  TRUSTED: { label: "Trusted", color: "#065f46", bg: "#ecfdf5", desc: "Proven partner. Consistently delivers — a go-to for their specialty." },
};
const PRICE_DESC = { 1: "Budget-friendly. Best for simple or low-stakes work.", 2: "Moderate. Good value for solid professional output.", 3: "Higher-end. Reflects experience and polished quality.", 4: "Premium. Agency-level pricing for flagship work." };
const SPEED = {
  fast:     { label: "Fast",     color: "#007377", desc: "Quick turnaround. Can deliver under tight timelines." },
  standard: { label: "Standard", color: "#9ca3af", desc: "Normal delivery pace. Plan for typical lead times." },
  slow:     { label: "Slower",   color: "#9ca3af", desc: "Takes more time. Book well in advance." },
};
const RESPONSIVENESS = {
  very:    { label: "Very responsive", color: "#065f46", bg: "#ecfdf5" },
  neutral: { label: "Neutral",         color: "#9ca3af", bg: "#f4f4f5" },
  slow:    { label: "Slow",            color: "#b45309", bg: "#fef3c7" },
};
const CATS = [
  { key: "all", label: "All", icon: LayoutGrid },
  { key: "design", label: "Design", icon: Palette },
  { key: "video", label: "Video", icon: Video },
  { key: "photo", label: "Photo", icon: Camera },
  { key: "animation", label: "Animation", icon: Wand2 },
  { key: "other", label: "Other", icon: MoreHorizontal },
];
const TIER_ORDER = { BUDGET: 0, MID: 1, PRO: 2, ELITE: 3 };
const TRUST_ORDER = { NEW: 0, PROVING: 1, TRUSTED: 2 };
const C = { teal: "#007377", green: "#97D700", navy: "#002631", body: "#53565A", rule: "#e8efee", bg: "#f6f9f8", white: "#ffffff", hover: "#f9fbfa" };

// ─── Column definitions (StoryMatch-style descriptors) ───
const COLUMNS = [
  { key: "name",           label: "Name",      defaultWidth: 240, minWidth: 180, sortable: true,  hideable: false, pinned: true },
  { key: "email",          label: "Contact",   defaultWidth: 220, minWidth: 160, sortable: true,  hideable: true },
  { key: "bestAt",         label: "Best At",   defaultWidth: 220, minWidth: 140, sortable: false, hideable: true },
  { key: "tier",           label: "Tier",      defaultWidth: 90,  minWidth: 70,  sortable: true,  hideable: true, hasQuickFilter: true, options: TIER },
  { key: "trust",          label: "Trust",     defaultWidth: 100, minWidth: 80,  sortable: true,  hideable: true, hasQuickFilter: true, options: TRUST },
  { key: "price",          label: "Price",     defaultWidth: 80,  minWidth: 60,  sortable: true,  hideable: true },
  { key: "speed",          label: "Speed",     defaultWidth: 100, minWidth: 80,  sortable: true,  hideable: true, hasQuickFilter: true, options: SPEED },
  { key: "responsiveness", label: "Comms",     defaultWidth: 120, minWidth: 90,  sortable: true,  hideable: true, hasQuickFilter: true, options: RESPONSIVENESS },
  { key: "approvedVendor", label: "In System", defaultWidth: 110, minWidth: 90,  sortable: true,  hideable: true, hasQuickFilter: true },
  { key: "location",       label: "Location",  defaultWidth: 140, minWidth: 100, sortable: true,  hideable: true },
  { key: "category",       label: "Category",  defaultWidth: 130, minWidth: 100, sortable: false, hideable: true, hasQuickFilter: true, options: { design: { label: "Design" }, video: { label: "Video" }, photo: { label: "Photo" }, animation: { label: "Animation" }, other: { label: "Other" } } },
  { key: "skills",         label: "Skills",    defaultWidth: 260, minWidth: 140, sortable: false, hideable: true },
  { key: "notes",          label: "Notes",     defaultWidth: 280, minWidth: 160, sortable: false, hideable: true },
];

const DEFAULT_VISIBLE = ["name", "email", "bestAt", "tier", "trust", "price", "speed", "approvedVendor"];

// Skill groupings for the filters modal — organize the long flat skills list into meaningful groups
const SKILL_GROUPS = [
  { label: "Video & Film", skills: ["video production", "video editing", "brand films", "commercials", "documentary", "testimonial videos", "corporate video", "event videography", "scriptwriting", "cinematography", "post-production", "color grading", "live streaming"] },
  { label: "Photo", skills: ["photography", "commercial photography", "editorial photography", "portrait photography", "lifestyle photography", "travel photography", "corporate photography", "product photography", "event photography", "headshots"] },
  { label: "Animation & Motion", skills: ["motion graphics", "2D animation", "3D animation", "2D motion graphics", "logo animation", "explainer animation", "Lottie animation", "kinetic typography", "mixed media animation", "explainer videos"] },
  { label: "Design", skills: ["graphic design", "brand identity", "brand refresh", "brand guidelines", "logo design", "presentation design", "ebook design", "one-pager design", "case study design", "document design", "static ad design", "social ad design", "social ads", "social media graphics", "sales enablement design", "event design", "tradeshow graphics", "advertising design", "packaging", "print", "web design", "UX/UI design"] },
  { label: "Drone & Aerial", skills: ["drone", "aerial video", "aerial photography", "FAA certified", "FPV"] },
  { label: "Voiceover & Audio", skills: ["voiceover", "narration", "commercial voiceover", "British accent", "explainer video VO", "e-learning", "audio editing", "sound design"] },
  { label: "Social & Short-Form", skills: ["webinar clipping", "short-form video", "social video", "branded bumpers", "YouTube editing", "thumbnail design", "podcast editing"] },
  { label: "Software & Tools", skills: ["Figma", "After Effects", "Illustrator", "InDesign", "Premiere Pro", "DaVinci Resolve", "Cinema 4D", "Lightroom", "Capture One", "PowerPoint"] },
];
const LS = {
  roster:   "freelancer-roster.v2.roster",
  widths:   "freelancer-roster.v2.widths",
  hidden:   "freelancer-roster.v2.hidden",
  order:    "freelancer-roster.v2.order",
  customOrder: "freelancer-roster.v2.customOrder",
  savedView: "freelancer-roster.v2.savedView",
};

// ─── Supabase setup ───
const SUPABASE_URL = process.env.REACT_APP_SUPABASE_URL || "";
const SUPABASE_KEY = process.env.REACT_APP_SUPABASE_ANON_KEY || "";
const supabase = SUPABASE_URL && SUPABASE_KEY ? createClient(SUPABASE_URL, SUPABASE_KEY) : null;

// In-memory cache mirroring the data we've fetched from Supabase. The component
// reads synchronously from this so React state initializers stay fast. Writes
// update both the cache and Supabase (debounced).
const _cache = {};
const _saveTimers = {};

// Pre-load all keys from Supabase into the cache on app start.
// Returns a Promise that resolves once data is hydrated.
async function hydrateFromSupabase() {
  if (!supabase) return;
  try {
    const { data, error } = await supabase.from("roster_data").select("key, value");
    if (error) { console.error("Supabase load error:", error); return; }
    (data || []).forEach(row => { _cache[row.key] = row.value; });
  } catch (e) {
    console.error("Supabase hydrate failed:", e);
  }
}

function loadLS(key, fallback) {
  if (_cache[key] !== undefined) return _cache[key];
  return fallback;
}

function saveLS(key, value) {
  _cache[key] = value;
  if (!supabase) return;
  // Debounce: coalesce rapid writes (e.g. during drag) into one network call.
  if (_saveTimers[key]) clearTimeout(_saveTimers[key]);
  _saveTimers[key] = setTimeout(async () => {
    try {
      const { error } = await supabase
        .from("roster_data")
        .upsert({ key, value }, { onConflict: "key" });
      if (error) console.error(`Supabase save error for ${key}:`, error);
    } catch (e) {
      console.error("Supabase save failed:", e);
    }
  }, 300);
}

export default function FreelancerRosterWrapper() {
  const [hydrated, setHydrated] = useState(false);
  useEffect(() => {
    let cancelled = false;
    hydrateFromSupabase().finally(() => { if (!cancelled) setHydrated(true); });
    return () => { cancelled = true; };
  }, []);
  if (!hydrated) {
    return (
      <div style={{ fontFamily: "'Lato', sans-serif", background: "#f6f9f8", color: "#002631", minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <link href="https://fonts.googleapis.com/css2?family=Lato:ital,wght@0,300;0,400;0,700;0,900;1,400&display=swap" rel="stylesheet" />
        <div style={{ textAlign: "center" }}>
          <div style={{ fontSize: 14, color: "#9ca3af", marginBottom: 8 }}>Loading roster…</div>
        </div>
      </div>
    );
  }
  return <FreelancerRoster />;
}

function FreelancerRoster() {
  /* ── core state ───────────────────────────────────────── */
  const [mode, setMode] = useState("browse");
  const [roster, setRoster] = useState(() => loadLS(LS.roster, STARTER_ROSTER));
  const [showInfo, setShowInfo] = useState(false);

  /* ── list view state ─────────────────────────────────── */
  // The "saved view" is the canonical source of truth for column layout.
  // Read it first and use it to seed widths/order/hidden if it exists.
  const _savedView = loadLS(LS.savedView, null);
  const [columnOrder, setColumnOrder] = useState(() => {
    const source = _savedView?.columnOrder || loadLS(LS.order, null);
    if (source && Array.isArray(source)) {
      const validKeys = COLUMNS.map(c => c.key);
      const cleaned = source.filter(k => validKeys.includes(k));
      const missing = validKeys.filter(k => !cleaned.includes(k));
      return [...cleaned, ...missing];
    }
    return COLUMNS.map(c => c.key);
  });
  const [hidden, setHidden] = useState(() => {
    const source = _savedView?.hidden || loadLS(LS.hidden, null);
    if (source && Array.isArray(source)) return new Set(source);
    // No saved data — fall back to defaults
    return new Set(COLUMNS.filter(c => !DEFAULT_VISIBLE.includes(c.key) && c.hideable).map(c => c.key));
  });
  const [widths, setWidths] = useState(() => {
    const source = _savedView?.widths || loadLS(LS.widths, {});
    const result = {};
    COLUMNS.forEach(c => { result[c.key] = source[c.key] || c.defaultWidth; });
    return result;
  });
  const [customRowOrder, setCustomRowOrder] = useState(() => loadLS(LS.customOrder, null));
  const [savedView, setSavedView] = useState(() => _savedView);

  /* ── sort/filter/search state ─────────────────────────── */
  const [sortKey, setSortKey] = useState("custom"); // 'custom' = superstar-first then alpha
  const [sortDir, setSortDir] = useState("asc");
  const [filters, setFilters] = useState({}); // { tier: ['PRO'], trust: ['TRUSTED'], ... }
  const [search, setSearch] = useState("");
  const [searchOpen, setSearchOpen] = useState(false);
  const [showFiltersModal, setShowFiltersModal] = useState(false);

  /* ── ui state ─────────────────────────────────────────── */
  const [openHeaderMenu, setOpenHeaderMenu] = useState(null);
  const [openHeaderMenuRect, setOpenHeaderMenuRect] = useState(null);
  const [sortTriggerRect, setSortTriggerRect] = useState(null);
  const [colPanelTriggerRect, setColPanelTriggerRect] = useState(null);
  const [sortDrop, setSortDrop] = useState(false);
  const [openColPanel, setOpenColPanel] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [addingNew, setAddingNew] = useState(false);
  const [colDrag, setColDrag] = useState(null);
  const [rowDrag, setRowDrag] = useState(null);
  const [copiedId, setCopiedId] = useState(null);
  const [showToast, setShowToast] = useState(false);
  const [tooltip, setTooltip] = useState(null); // {text, x, y}
  const headerCellRefs = useRef(new Map());
  const rowRefs = useRef(new Map());
  const rowDragJustEnded = useRef(false);
  const searchInputRef = useRef(null);

  /* ── AI state ─────────────────────────────────────────── */
  const apiKey = process.env.REACT_APP_API_KEY || "YOUR_API_KEY_HERE";
  const [aiPrompt, setAiPrompt] = useState("");
  const [aiMessages, setAiMessages] = useState([]);
  const [aiLoading, setAiLoading] = useState(false);
  const [aiError, setAiError] = useState(null);
  const [expandedRecs, setExpandedRecs] = useState({});
  const [isListening, setIsListening] = useState(false);
  const recogRef = useRef(null);

  /* ── persistence effects ─────────────────────────────── */
  useEffect(() => saveLS(LS.roster, roster), [roster]);
  useEffect(() => {
    if (!openHeaderMenu && !openColPanel && !sortDrop) return;
    const onDocClick = (e) => {
      if (e.target.closest(".lv-header-menu") || e.target.closest(".lv-col-panel") || e.target.closest(".lv-h-menu-trigger") || e.target.closest(".lv-col-panel-trigger") || e.target.closest(".lv-sort-dropdown") || e.target.closest(".lv-sort-trigger")) return;
      setOpenHeaderMenu(null);
      setOpenHeaderMenuRect(null);
      setOpenColPanel(false);
      setSortDrop(false);
    };
    document.addEventListener("mousedown", onDocClick);
    return () => document.removeEventListener("mousedown", onDocClick);
  }, [openHeaderMenu, openColPanel, sortDrop]);
  useEffect(() => saveLS(LS.order, columnOrder), [columnOrder]);
  useEffect(() => saveLS(LS.hidden, [...hidden]), [hidden]);
  useEffect(() => saveLS(LS.widths, widths), [widths]);
  useEffect(() => { if (customRowOrder) saveLS(LS.customOrder, customRowOrder); }, [customRowOrder]);

  /* ── focus search input when opened ───────────────────── */
  useEffect(() => {
    if (searchOpen && searchInputRef.current) searchInputRef.current.focus();
  }, [searchOpen]);

  /* ── global tooltip system ────────────────────────────── */
  useEffect(() => {
    let measureEl = null;
    let activeTip = null; // currently-hovered tip element
    const onEnter = (e) => {
      const tip = e.target.closest && e.target.closest(".tip");
      if (!tip) return;
      // If we're already showing this tip, don't recompute
      if (tip === activeTip) return;
      activeTip = tip;
      const text = tip.getAttribute("data-tip");
      if (!text) return;
      const r = tip.getBoundingClientRect();
      // Create a hidden measuring element to compute tooltip size
      if (!measureEl) {
        measureEl = document.createElement("div");
        measureEl.style.cssText = "position:fixed;visibility:hidden;pointer-events:none;padding:8px 12px;font-size:12px;font-family:'Lato',sans-serif;max-width:260px;width:max-content;line-height:1.45;";
        document.body.appendChild(measureEl);
      }
      measureEl.textContent = text;
      const tooltipW = measureEl.offsetWidth;
      const tooltipH = measureEl.offsetHeight;
      let cx = r.left + r.width / 2 - tooltipW / 2;
      cx = Math.max(8, Math.min(cx, window.innerWidth - tooltipW - 8));
      let cy = r.top - tooltipH - 8;
      if (cy < 8) {
        cy = r.bottom + 8;
        if (cy + tooltipH > window.innerHeight - 8) {
          cy = Math.max(8, window.innerHeight - tooltipH - 8);
        }
      }
      setTooltip({ text, x: cx, y: cy });
    };
    // Whenever the mouse moves, check if we've left the active tip
    const onMove = (e) => {
      if (!activeTip) return;
      const stillInsideTip = e.target.closest && e.target.closest(".tip") === activeTip;
      if (!stillInsideTip) {
        activeTip = null;
        setTooltip(null);
      }
    };
    document.addEventListener("mouseover", onEnter, true);
    document.addEventListener("mousemove", onMove, true);
    return () => {
      document.removeEventListener("mouseover", onEnter, true);
      document.removeEventListener("mousemove", onMove, true);
      if (measureEl && measureEl.parentNode) measureEl.parentNode.removeChild(measureEl);
    };
  }, []);

  /* ── derived: visible columns ─────────────────────────── */
  const visibleColumns = useMemo(() => {
    return columnOrder
      .filter(k => !hidden.has(k))
      .map(k => COLUMNS.find(c => c.key === k))
      .filter(Boolean);
  }, [columnOrder, hidden]);

  const gridTemplate = useMemo(() => {
    return visibleColumns.map(c => `${widths[c.key]}px`).join(" ");
  }, [visibleColumns, widths]);

  /* ── derived: filtered + sorted rows ──────────────────── */
  const rows = useMemo(() => {
    let r = [...roster];

    // search
    const q = search.trim().toLowerCase();
    if (q) {
      r = r.filter(p =>
        p.name.toLowerCase().includes(q) ||
        p.email.toLowerCase().includes(q) ||
        (p.skills || []).some(s => s.toLowerCase().includes(q)) ||
        (p.bestAt || []).some(b => b.toLowerCase().includes(q)) ||
        (p.location || "").toLowerCase().includes(q) ||
        (p.notes || "").toLowerCase().includes(q)
      );
    }

    // filters
    for (const [key, values] of Object.entries(filters)) {
      if (!values || !values.length) continue;
      r = r.filter(p => {
        if (key === "approvedVendor") return values.includes(p.approvedVendor ? "yes" : "no");
        if (key === "category") return values.some(v => (p.categories || []).includes(v));
        if (key === "skills") return values.some(v => (p.skills || []).some(s => s.toLowerCase() === v.toLowerCase()));
        if (key === "star") return values.includes(p.star ? "yes" : "no");
        return values.includes(p[key]);
      });
    }

    // sort
    if (sortKey === "custom") {
      // If we have a custom row order, apply it; otherwise stars-first then alpha
      if (customRowOrder && customRowOrder.length) {
        const idx = id => { const i = customRowOrder.indexOf(id); return i === -1 ? 99999 : i; };
        r.sort((a, b) => idx(a.id) - idx(b.id));
      } else {
        r.sort((a, b) => {
          if (a.star && !b.star) return -1;
          if (!a.star && b.star) return 1;
          return a.name.localeCompare(b.name);
        });
      }
    } else {
      r.sort((a, b) => {
        let va = a[sortKey], vb = b[sortKey];
        if (sortKey === "tier") { va = TIER_ORDER[va]; vb = TIER_ORDER[vb]; }
        if (sortKey === "trust") { va = TRUST_ORDER[va]; vb = TRUST_ORDER[vb]; }
        if (sortKey === "speed") { const so = { fast: 0, standard: 1, slow: 2 }; va = so[va]; vb = so[vb]; }
        if (sortKey === "responsiveness") { const ro = { very: 0, neutral: 1, slow: 2 }; va = ro[va]; vb = ro[vb]; }
        if (sortKey === "approvedVendor") { va = a.approvedVendor ? 1 : 0; vb = b.approvedVendor ? 1 : 0; }
        if (typeof va === "string") va = va.toLowerCase();
        if (typeof vb === "string") vb = vb.toLowerCase();
        if (va == null) va = "";
        if (vb == null) vb = "";
        if (va < vb) return sortDir === "asc" ? -1 : 1;
        if (va > vb) return sortDir === "asc" ? 1 : -1;
        // Stars always float within ties
        if (a.star && !b.star) return -1;
        if (!a.star && b.star) return 1;
        return 0;
      });
    }

    return r;
  }, [roster, search, filters, sortKey, sortDir, customRowOrder]);

  /* ── active filter count ──────────────────────────────── */
  const activeFilterCount = useMemo(() => {
    let n = 0;
    for (const vals of Object.values(filters)) n += (vals || []).length;
    return n;
  }, [filters]);

  // Detect if the current view differs from the saved default
  const viewChanged = useMemo(() => {
    if (!savedView) {
      // No saved view yet — show "Save view" if user has customized anything
      const defaultWidths = Object.fromEntries(COLUMNS.map(c => [c.key, c.defaultWidth]));
      const defaultOrder = COLUMNS.map(c => c.key);
      const defaultHidden = COLUMNS.filter(c => !DEFAULT_VISIBLE.includes(c.key) && c.hideable).map(c => c.key);
      const widthsChanged = COLUMNS.some(c => widths[c.key] !== c.defaultWidth);
      const orderChanged = JSON.stringify(columnOrder) !== JSON.stringify(defaultOrder);
      const hiddenChanged = JSON.stringify([...hidden].sort()) !== JSON.stringify(defaultHidden.sort());
      return widthsChanged || orderChanged || hiddenChanged;
    }
    return (
      JSON.stringify(widths) !== JSON.stringify(savedView.widths) ||
      JSON.stringify(columnOrder) !== JSON.stringify(savedView.columnOrder) ||
      JSON.stringify([...hidden].sort()) !== JSON.stringify([...(savedView.hidden || [])].sort())
    );
  }, [savedView, widths, columnOrder, hidden]);

  const saveCurrentView = () => {
    const view = { widths, columnOrder, hidden: [...hidden] };
    setSavedView(view);
    saveLS(LS.savedView, view);
  };
  const resetView = () => {
    if (savedView) {
      setWidths(savedView.widths);
      setColumnOrder(savedView.columnOrder);
      setHidden(new Set(savedView.hidden || []));
    } else {
      const defaultWidths = Object.fromEntries(COLUMNS.map(c => [c.key, c.defaultWidth]));
      setWidths(defaultWidths);
      setColumnOrder(COLUMNS.map(c => c.key));
      setHidden(new Set(COLUMNS.filter(c => !DEFAULT_VISIBLE.includes(c.key) && c.hideable).map(c => c.key)));
    }
  };

  /* ── column drag-reorder ──────────────────────────────── */
  const beginColumnDrag = (key, e) => {
    const col = COLUMNS.find(c => c.key === key);
    if (!col || col.pinned) return;
    if (e.target.closest(".lv-h-resize")) return;
    if (e.target.closest(".lv-h-menu-trigger")) return;
    if (e.target.closest(".lv-header-menu")) return;
    if (e.target.closest(".lv-col-panel")) return;
    if (e.target.closest(".lv-col-panel-trigger")) return;
    const reorderableKeys = columnOrder.filter(k => {
      if (hidden.has(k)) return false;
      const c = COLUMNS.find(c => c.key === k);
      return c && !c.pinned;
    });
    const fromIdx = reorderableKeys.indexOf(key);
    if (fromIdx === -1) return;
    const startX = e.clientX;
    let started = false;
    let lastTargetIdx = fromIdx;

    const onMove = (ev) => {
      const dx = ev.clientX - startX;
      if (!started) {
        if (Math.abs(dx) < 5) return;
        started = true;
        setOpenHeaderMenu(null);
        document.body.classList.add("lv-is-dragging");
      }
      let target = reorderableKeys.length - 1;
      for (let i = 0; i < reorderableKeys.length; i++) {
        if (reorderableKeys[i] === key) continue;
        const el = headerCellRefs.current.get(reorderableKeys[i]);
        if (!el) continue;
        const r = el.getBoundingClientRect();
        if (ev.clientX < r.left + r.width / 2) { target = i; break; }
      }
      if (target > fromIdx) target -= 1;
      lastTargetIdx = target;
      setColDrag({ key, fromIdx, targetIdx: target, pointerX: ev.clientX, startX });
    };
    const onUp = () => {
      document.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerup", onUp);
      document.body.classList.remove("lv-is-dragging");
      if (started && lastTargetIdx !== fromIdx) {
        const next = [...reorderableKeys];
        const [m] = next.splice(fromIdx, 1);
        next.splice(lastTargetIdx, 0, m);
        const pinnedKeys = columnOrder.filter(k => {
          const c = COLUMNS.find(c => c.key === k);
          return c && c.pinned;
        });
        const hiddenInOrder = columnOrder.filter(k => hidden.has(k));
        setColumnOrder([...pinnedKeys, ...next, ...hiddenInOrder]);
      }
      setColDrag(null);
    };
    document.addEventListener("pointermove", onMove);
    document.addEventListener("pointerup", onUp);
  };

  /* ── column resize ────────────────────────────────────── */
  const beginResize = (key, e) => {
    e.stopPropagation();
    e.preventDefault();
    const col = COLUMNS.find(c => c.key === key);
    if (!col) return;
    const startX = e.clientX;
    const startW = widths[key] || col.defaultWidth;
    const onMove = (ev) => {
      const next = Math.max(col.minWidth, startW + (ev.clientX - startX));
      setWidths(w => ({ ...w, [key]: next }));
    };
    const onUp = () => {
      document.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerup", onUp);
    };
    document.addEventListener("pointermove", onMove);
    document.addEventListener("pointerup", onUp);
  };

  /* ── row drag-reorder ─────────────────────────────────── */
  const beginRowDrag = (rowId, e) => {
    // Don't start drag (or trigger click) for actual interactive controls
    if (e.target.closest("a[href]")) return;
    if (e.target.closest(".lv-row-icon-hover")) return;
    if (e.target.closest("button, select, input, textarea, .lv-cell-skills-pill")) return;
    const orderedIds = rows.map(r => r.id);
    const fromIdx = orderedIds.indexOf(rowId);
    if (fromIdx === -1) return;
    const startY = e.clientY;
    let started = false;
    let lastTargetIdx = fromIdx;

    const onMove = (ev) => {
      const dy = ev.clientY - startY;
      if (!started) {
        if (Math.abs(dy) < 5) return;
        started = true;
        document.body.classList.add("lv-is-dragging");
      }
      let target = orderedIds.length - 1;
      for (let i = 0; i < orderedIds.length; i++) {
        if (orderedIds[i] === rowId) continue;
        const el = rowRefs.current.get(orderedIds[i]);
        if (!el) continue;
        const r = el.getBoundingClientRect();
        if (ev.clientY < r.top + r.height / 2) { target = i; break; }
      }
      if (target > fromIdx) target -= 1;
      lastTargetIdx = target;
      setRowDrag({ id: rowId, fromIdx, targetIdx: target, pointerY: ev.clientY, startY });
    };
    const onUp = () => {
      document.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerup", onUp);
      document.body.classList.remove("lv-is-dragging");
      if (started && lastTargetIdx !== fromIdx) {
        // Actual drag — reorder
        const next = [...orderedIds];
        const [m] = next.splice(fromIdx, 1);
        next.splice(lastTargetIdx, 0, m);
        setCustomRowOrder(next);
        setSortKey("custom");
        rowDragJustEnded.current = true;
        setTimeout(() => { rowDragJustEnded.current = false; }, 150);
      } else if (!started) {
        // No movement — treat as click, open the edit drawer
        setEditingId(rowId);
      }
      setRowDrag(null);
    };
    document.addEventListener("pointermove", onMove);
    document.addEventListener("pointerup", onUp);
  };

  /* ── helpers ─────────────────────────────────────────── */
  const copyEmail = (id, email) => {
    if (email && !email.toLowerCase().includes("fiverr")) {
      navigator.clipboard.writeText(email);
      setCopiedId(id);
      setShowToast(true);
      setTimeout(() => { setCopiedId(null); setShowToast(false); }, 1500);
    }
  };
  const toggleHidden = (key) => {
    setHidden(prev => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key); else next.add(key);
      return next;
    });
  };
  const applySort = (key, dir) => {
    setSortKey(key);
    setSortDir(dir);
    setOpenHeaderMenu(null);
    setOpenHeaderMenuRect(null);
  };
  const toggleFilterValue = (field, value) => {
    setFilters(prev => {
      const cur = prev[field] || [];
      const next = cur.includes(value) ? cur.filter(v => v !== value) : [...cur, value];
      const newFilters = { ...prev, [field]: next };
      if (!next.length) delete newFilters[field];
      return newFilters;
    });
  };
  const clearAllFilters = () => { setFilters({}); setSearch(""); };
  const deleteFreelancer = (id) => {
    setRoster(r => r.filter(p => p.id !== id));
    if (customRowOrder) setCustomRowOrder(customRowOrder.filter(rid => rid !== id));
  };
  const saveFreelancer = (data, isNew) => {
    if (isNew) {
      const nextId = Math.max(0, ...roster.map(r => r.id)) + 1;
      setRoster([{ ...data, id: nextId }, ...roster]);
      setAddingNew(false);
    } else {
      setRoster(roster.map(r => r.id === data.id ? data : r));
      setEditingId(null);
    }
  };

  /* ── voice input ─────────────────────────────────────── */
  const toggleListening = () => {
    if (isListening && recogRef.current) { recogRef.current.stop(); return; }
    const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SR) { alert("Voice input requires Chrome browser."); return; }
    const r = new SR();
    r.continuous = false; r.interimResults = true; r.lang = "en-US";
    r.onresult = (e) => { const t = Array.from(e.results).map(x => x[0].transcript).join(""); setAiPrompt(t); };
    r.onend = () => setIsListening(false);
    r.onerror = () => setIsListening(false);
    r.start();
    setIsListening(true);
    recogRef.current = r;
  };

  /* ── AI submit ───────────────────────────────────────── */
  const submitAi = async () => {
    const q = aiPrompt.trim();
    if (!q || aiLoading) return;
    if (!apiKey || apiKey === "YOUR_API_KEY_HERE") {
      setAiError("API key not configured. Contact logan.colegrove@foundant.com for setup.");
      return;
    }
    const newMessages = [...aiMessages, { role: "user", content: q }];
    setAiMessages(newMessages);
    setAiPrompt("");
    setAiLoading(true);
    setAiError(null);
    try {
      const ctx = roster.map(p => ({
        name: p.name, email: p.email, website: p.website, location: p.location,
        categories: p.categories, skills: p.skills, bestAt: p.bestAt,
        tier: p.tier, trust: p.trust, price: p.price, speed: p.speed,
        responsiveness: p.responsiveness, approvedVendor: p.approvedVendor,
        star: p.star, notes: p.notes,
      }));
      const res = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json", "x-api-key": apiKey, "anthropic-version": "2023-06-01", "anthropic-dangerous-direct-browser-access": "true" },
        body: JSON.stringify({ model: "claude-sonnet-4-20250514", max_tokens: 1500,
          system: `You are a quick, practical creative operations advisor at Foundant Technologies. Your job is to point people to the right freelancer or agency from the roster — fast.

KEY PRINCIPLE: Recommend first, ask questions later. Users just want to be pointed in the right direction. The freelancer will handle the details.

BEHAVIOR:
- Default to giving 2–3 recommendations immediately. More options = better, because if one person is unavailable the user has backups ready.
- Only ask a clarifying question if the request is genuinely ambiguous in a way that would change WHO you recommend (e.g. "I need an ad" — video ad vs print ad would be totally different people). If it wouldn't change the recommendation, just recommend.
- Things like "what platform?" or "is this a one-off?" or "do you have brand assets?" are NOT your problem — that's between the user and the freelancer. Don't ask.
- Keep responses short and direct. No over-explaining.

RECOMMENDING:
- You can ONLY recommend people from the ROSTER below — never invent people.
- When recommending, respond with ONLY the JSON object — no text before or after. Put all context inside the JSON fields. Format: { "recommendations": [{ "name": "...", "reasoning": "...", "caveats": "..." }] } — aim for 2–3 entries. No markdown fences.
- ALWAYS show recommendations even if the fit isn't perfect. Explain the gap in caveats. Only skip if the request is completely outside creative/multimedia (e.g. legal, IT support).
- If nobody on the roster is remotely close, recommend the nearest option anyway with honest caveats, and mention reaching out to logan.colegrove@foundant.com to get a specialist added.
- Prefer "star" freelancers when relevant — these are Foundant's go-to partners.
- Note when someone is already approved in Foundant's vendor system (approvedVendor: true) — means no onboarding needed.

ROSTER:
${JSON.stringify(ctx, null, 2)}`,
          messages: newMessages.map(m => ({ role: m.role, content: m.content })),
        }),
      });
      if (!res.ok) { const e = await res.json().catch(() => ({})); throw new Error(e?.error?.message || `API ${res.status}`); }
      const data = await res.json();
      const text = data.content.map(c => c.text || "").join("");
      let recs = null;
      let extraText = null;
      try {
        const clean = text.replace(/```json|```/g, "").trim();
        const parsed = JSON.parse(clean);
        if (parsed.recommendations) recs = parsed.recommendations;
      } catch {
        try {
          const jsonMatch = text.match(/\{[\s\S]*"recommendations"[\s\S]*\}/);
          if (jsonMatch) {
            const parsed = JSON.parse(jsonMatch[0]);
            if (parsed.recommendations) {
              recs = parsed.recommendations;
              const before = text.slice(0, text.indexOf(jsonMatch[0])).trim();
              const after = text.slice(text.indexOf(jsonMatch[0]) + jsonMatch[0].length).trim();
              extraText = [before, after].filter(Boolean).join(" ");
            }
          }
        } catch {}
      }
      setAiMessages(prev => [...prev, { role: "assistant", content: text, recommendations: recs, extraText }]);
    } catch (e) { setAiError(e.message); } finally { setAiLoading(false); }
  };

  /* ── tiny components ─────────────────────────────────── */
  const Tip = ({ text, children }) => <span className="tip" data-tip={text} style={{ position: "relative", display: "inline-flex" }}>{children}</span>;
  const TierBadge = ({ tier }) => <Tip text={TIER[tier]?.desc || ""}><span style={{ display: "inline-block", fontSize: 12, fontWeight: 600, padding: "3px 9px", borderRadius: 4, color: "#5a6160", background: "#eef0ef", cursor: "help", letterSpacing: "0.01em" }}>{TIER[tier]?.label || tier}</span></Tip>;
  const TrustBadge = ({ trust }) => { const t = TRUST[trust] || {}; return <Tip text={t.desc || ""}><span style={{ display: "inline-block", fontSize: 12, fontWeight: 600, padding: "3px 9px", borderRadius: 4, color: t.color, background: t.bg, cursor: "help", letterSpacing: "0.01em" }}>{t.label || trust}</span></Tip>; };
  const Price = ({ level }) => <Tip text={PRICE_DESC[level]}><span style={{ fontSize: 14, letterSpacing: -0.5, cursor: "help" }}>{[1,2,3,4].map(i => <span key={i} style={{ color: i <= level ? C.navy : "#d4d8d7", fontWeight: i <= level ? 900 : 400 }}>$</span>)}</span></Tip>;
  const SpeedBadge = ({ level }) => { const s = SPEED[level] || {}; return <Tip text={s.desc || ""}><span style={{ display: "inline-flex", alignItems: "center", gap: 4, fontSize: 12, fontWeight: 600, color: s.color, cursor: "help" }}>{level === "fast" ? <Zap size={12} /> : <Clock size={12} />}{s.label}</span></Tip>; };
  const RespBadge = ({ level }) => { if (!level || level === "neutral") return <span style={{ color: "#c8cecd", fontSize: 13 }}>—</span>; const r = RESPONSIVENESS[level]; return <span style={{ display: "inline-block", fontSize: 12, fontWeight: 600, padding: "3px 9px", borderRadius: 4, color: r.color, background: r.bg, letterSpacing: "0.01em" }}>{r.label}</span>; };

  const sortItemStyle = (active) => ({ all: "unset", cursor: "pointer", display: "flex", alignItems: "center", gap: 8, width: "100%", padding: "8px 14px", fontSize: 13, color: active ? C.teal : C.body, fontWeight: active ? 700 : 400, background: active ? C.bg : "transparent", boxSizing: "border-box" });
  const pillStyle = (variant) => {
    // emphasized = used for Best At (same color as Tier badge)
    if (variant === "teal" || variant === "emphasized") return { fontSize: 11, fontWeight: 600, padding: "2px 8px", borderRadius: 4, background: "#eef0ef", color: "#5a6160", whiteSpace: "nowrap", letterSpacing: "0.01em" };
    return { fontSize: 11, fontWeight: 500, padding: "2px 8px", borderRadius: 4, background: "#f3f4f6", color: "#6b7280", whiteSpace: "nowrap", letterSpacing: "0.01em" };
  };

  /* ── cell renderer ───────────────────────────────────── */
  const renderCell = (col, p) => {
    switch (col.key) {
      case "name":
        return (
          <div style={{ display: "flex", alignItems: "center", gap: 8, minWidth: 0, overflow: "hidden" }}>
            {p.star && <Tip text="Superstar — top recommendation."><Star size={15} fill="#059669" color="#059669" style={{ flexShrink: 0, cursor: "help" }} /></Tip>}
            <a href={p.website || undefined} target="_blank" rel="noopener noreferrer" onPointerDown={e => e.stopPropagation()} onClick={e => e.stopPropagation()} style={{ fontWeight: 700, fontSize: 14, color: C.navy, textDecoration: "none", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", display: "flex", alignItems: "center", gap: 6 }}>
              {p.name}
              {p.website && <Tip text="Open website in new tab"><span className="lv-row-icon-hover" style={{ display: "inline-flex", padding: 4, borderRadius: 4, color: "#6b7280", background: "#f3f4f6", flexShrink: 0 }}><ExternalLink size={12} /></span></Tip>}
            </a>
          </div>
        );
      case "email":
        return (
          <div style={{ display: "flex", alignItems: "center", gap: 6, minWidth: 0 }}>
            <span style={{ fontSize: 13, color: C.navy, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{p.email}</span>
            {!p.email.toLowerCase().includes("fiverr") && (
              <Tip text={copiedId === p.id ? "Copied!" : "Copy email"}>
                <button onPointerDown={e => e.stopPropagation()} onClick={(e) => { e.stopPropagation(); copyEmail(p.id, p.email); }} className="lv-row-icon-hover" style={{ all: "unset", cursor: "pointer", flexShrink: 0, display: "inline-flex", padding: 4, borderRadius: 4, color: copiedId === p.id ? "#fff" : "#6b7280", background: copiedId === p.id ? "#059669" : "#f3f4f6" }}>
                  {copiedId === p.id ? <Check size={12} /> : <Copy size={12} />}
                </button>
              </Tip>
            )}
          </div>
        );
      case "bestAt":
        return <div style={{ display: "flex", flexWrap: "wrap", gap: 4 }}>{(p.bestAt || []).map(b => <span key={b} style={pillStyle("teal")}>{b}</span>)}</div>;
      case "tier": return <TierBadge tier={p.tier} />;
      case "trust": return <TrustBadge trust={p.trust} />;
      case "price": return <Price level={p.price} />;
      case "speed": return <SpeedBadge level={p.speed} />;
      case "responsiveness": return <RespBadge level={p.responsiveness} />;
      case "approvedVendor":
        return p.approvedVendor
          ? <Tip text="Cleared by risk/compliance, bank info on file"><span style={{ fontSize: 12, fontWeight: 700, color: "#059669", display: "inline-flex", alignItems: "center", gap: 4, cursor: "help" }}><Check size={13} />Approved</span></Tip>
          : <Tip text="Still needs compliance review and payment setup"><span style={{ fontSize: 12, color: "#9ca3af", cursor: "help" }}>Needs setup</span></Tip>;
      case "location": return <span style={{ fontSize: 13, color: C.body, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{p.location || "—"}</span>;
      case "category":
        return <div style={{ display: "flex", flexWrap: "wrap", gap: 4 }}>{(p.categories || []).map(c => <span key={c} style={{ ...pillStyle("gray"), textTransform: "capitalize" }}>{c}</span>)}</div>;
      case "skills":
        return <div style={{ display: "flex", flexWrap: "wrap", gap: 4, overflow: "hidden", maxHeight: 60 }}>{(p.skills || []).slice(0, 6).map(s => <span key={s} className="lv-cell-skills-pill" style={pillStyle("gray")}>{s}</span>)}{p.skills && p.skills.length > 6 && <span style={{ fontSize: 11, color: "#9ca3af", alignSelf: "center" }}>+{p.skills.length - 6}</span>}</div>;
      case "notes":
        return <span style={{ fontSize: 13, color: C.body, lineHeight: 1.45, overflow: "hidden", display: "-webkit-box", WebkitLineClamp: 3, WebkitBoxOrient: "vertical" }}>{p.notes || "—"}</span>;
      default: return null;
    }
  };

  /* ── render ──────────────────────────────────────────── */
  return (
    <div style={{ fontFamily: "'Lato', sans-serif", background: C.bg, color: C.navy, minHeight: "100vh" }}>
      <link href="https://fonts.googleapis.com/css2?family=Lato:ital,wght@0,300;0,400;0,700;0,900;1,400&display=swap" rel="stylesheet" />
      <style>{`
        .tip { cursor: help; }
        .toast { position: fixed; bottom: 24px; left: 50%; transform: translateX(-50%); background: #002631; color: #fff; padding: 10px 16px; border-radius: 6px; font-size: 13px; display: flex; align-items: center; gap: 6px; z-index: 9999; box-shadow: 0 4px 16px rgba(0,0,0,0.2); }
        body.lv-is-dragging * { user-select: none !important; cursor: grabbing !important; }
        .lv-row:hover { background: ${C.hover} !important; }
        .lv-row:hover .lv-row-actions { opacity: 1; }
        .lv-row-actions { opacity: 0; transition: opacity 0.15s; }
        .lv-row-icon-hover { opacity: 0 !important; transition: opacity 0.15s, background 0.15s; }
        .lv-row:hover .lv-row-icon-hover { opacity: 1 !important; }
        .lv-row-icon-hover:hover { background: #e5e7eb !important; }
        .lv-h-resize { position: absolute; right: 0; top: 0; bottom: 0; width: 6px; cursor: col-resize; z-index: 5; }
        .lv-h-resize:hover { background: ${C.teal}; opacity: 0.4; }
        .lv-h-cell { position: relative; transition: background 0.12s; }
        .lv-h-cell:hover { background: #eef2f1; }
      `}</style>

      <div style={{ maxWidth: 1440, margin: "0 auto", background: C.white, minHeight: "100vh", boxShadow: "0 0 40px rgba(0,38,49,0.04)" }}>

        {/* ── Header ──────────────────────────────────── */}
        <header style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 32px", height: 64, borderBottom: `1px solid ${C.rule}`, background: C.white, position: "sticky", top: 0, zIndex: 50 }}>
          <div style={{ display: "flex", alignItems: "baseline", gap: 12 }}>
            <span style={{ fontWeight: 900, fontSize: 22, color: C.navy, letterSpacing: "-0.02em" }}>Foundant's Freelancer & Agency Roster</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
            {[["browse", LayoutGrid, "Browse"], ["ai", Sparkles, "Recommend"]].map(([m, Icon, lbl]) => (
              <button key={m} onClick={() => { setMode(m); if (m === "browse") setAiMessages([]); }}
                style={{ display: "flex", alignItems: "center", gap: 6, padding: "7px 16px", fontSize: 13, fontWeight: 700, borderRadius: 5, border: `1px solid ${C.rule}`, cursor: "pointer", background: mode === m ? C.navy : C.white, color: mode === m ? "#fff" : C.body }}><Icon size={14} />{lbl}</button>
            ))}
            <div style={{ width: 1, height: 22, background: C.rule, margin: "0 6px" }} />
            <button onClick={() => setShowInfo(true)} style={{ display: "flex", padding: 8, borderRadius: 5, border: `1px solid ${C.rule}`, cursor: "pointer", background: C.white, color: "#9ca3af" }} title="About & field reference"><HelpCircle size={16} /></button>
          </div>
        </header>

        {/* ── Browse / List View ────────────────────────── */}
        {mode === "browse" && (
          <div>
            {/* Toolbar */}
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "12px 32px", borderBottom: `1px solid ${C.rule}`, gap: 12, background: C.white }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <button onClick={() => setShowFiltersModal(true)} style={{ display: "flex", alignItems: "center", gap: 5, padding: "6px 12px", fontSize: 13, fontWeight: 600, borderRadius: 5, border: `1px solid ${C.rule}`, background: activeFilterCount ? "#ecfafa" : C.white, color: activeFilterCount ? C.teal : C.body, cursor: "pointer" }}>
                  <Filter size={13} />Filters{activeFilterCount > 0 && <span style={{ background: C.teal, color: "#fff", borderRadius: 99, padding: "0 6px", fontSize: 11, marginLeft: 2 }}>{activeFilterCount}</span>}
                </button>
                <div style={{ position: "relative" }}>
                  <button className="lv-sort-trigger" onClick={(e) => { e.stopPropagation(); setSortDrop(!sortDrop); }} style={{ display: "flex", alignItems: "center", gap: 5, padding: "6px 12px", fontSize: 13, fontWeight: 600, borderRadius: 5, border: `1px solid ${C.rule}`, background: C.white, color: C.body, cursor: "pointer" }}>
                    <ChevronsUpDown size={13} style={{ color: "#9ca3af" }} />
                    Sort: <span style={{ color: C.navy, fontWeight: 700 }}>{sortKey === "custom" ? "Custom" : `${COLUMNS.find(c => c.key === sortKey)?.label || sortKey} ${sortDir === "asc" ? "↑" : "↓"}`}</span>
                    <ChevronDown size={12} style={{ color: "#9ca3af", opacity: 0.6 }} />
                  </button>
                  {sortDrop && (
                    <div className="lv-sort-dropdown" onClick={e => e.stopPropagation()} style={{ position: "absolute", top: "calc(100% + 4px)", left: 0, background: C.white, border: `1px solid ${C.rule}`, borderRadius: 6, boxShadow: "0 8px 24px rgba(0,38,49,0.12)", zIndex: 100, minWidth: 240, padding: "6px 0" }}>
                      <div style={{ padding: "6px 14px", fontSize: 11, color: "#9ca3af", fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase" }}>Sort order</div>
                      <button onClick={() => { setSortKey("custom"); setSortDrop(false); }} style={sortItemStyle(sortKey === "custom")}>
                        {sortKey === "custom" ? <Check size={13} color={C.teal} /> : <span style={{ width: 13 }} />}
                        Default <span style={{ marginLeft: 4, fontSize: 11, color: "#9ca3af" }}>(stars first)</span>
                      </button>
                      {sortKey !== "custom" && (
                        <>
                          <button onClick={() => { setSortDir("asc"); setSortDrop(false); }} style={sortItemStyle(sortDir === "asc")}>
                            {sortDir === "asc" ? <Check size={13} color={C.teal} /> : <ArrowUp size={13} style={{ color: "#9ca3af" }} />}
                            Ascending {COLUMNS.find(c => c.key === sortKey)?.label && <span style={{ marginLeft: 4, fontSize: 11, color: "#9ca3af" }}>by {COLUMNS.find(c => c.key === sortKey).label}</span>}
                          </button>
                          <button onClick={() => { setSortDir("desc"); setSortDrop(false); }} style={sortItemStyle(sortDir === "desc")}>
                            {sortDir === "desc" ? <Check size={13} color={C.teal} /> : <ArrowDown size={13} style={{ color: "#9ca3af" }} />}
                            Descending {COLUMNS.find(c => c.key === sortKey)?.label && <span style={{ marginLeft: 4, fontSize: 11, color: "#9ca3af" }}>by {COLUMNS.find(c => c.key === sortKey).label}</span>}
                          </button>
                        </>
                      )}
                      {sortKey === "custom" && (
                        <div style={{ padding: "8px 14px", fontSize: 11, color: "#9ca3af", fontStyle: "italic" }}>To sort by a column, click that column's header.</div>
                      )}
                    </div>
                  )}
                </div>
                {viewChanged && (
                  <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 12, color: "#9ca3af" }}>
                    <span style={{ fontStyle: "italic" }}>Unsaved layout</span>
                    <button onClick={saveCurrentView} style={{ all: "unset", cursor: "pointer", color: C.teal, fontWeight: 600, fontSize: 12 }}>Save view</button>
                    <span style={{ color: "#d4d8d7" }}>·</span>
                    <button onClick={resetView} style={{ all: "unset", cursor: "pointer", color: "#9ca3af", fontSize: 12 }}>Reset</button>
                  </div>
                )}
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                <div style={{ position: "relative" }}>
                  <button
                    className="lv-col-panel-trigger tip"
                    data-tip="Show/hide columns"
                    onClick={(e) => { e.stopPropagation(); setOpenColPanel(!openColPanel); }}
                    style={{ display: "flex", alignItems: "center", padding: 8, borderRadius: 5, border: `1px solid ${C.rule}`, cursor: "pointer", background: openColPanel ? C.bg : C.white, color: C.body }}
                  >
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 3h18v18H3z"/><path d="M9 3v18"/><path d="M15 3v18"/></svg>
                  </button>
                  {openColPanel && (
                    <div className="lv-col-panel" onClick={e => e.stopPropagation()} style={{ position: "absolute", top: "calc(100% + 6px)", right: 0, background: C.white, border: `1px solid ${C.rule}`, borderRadius: 6, boxShadow: "0 8px 24px rgba(0,38,49,0.12)", zIndex: 100, minWidth: 240, padding: "8px 0" }}>
                      <div style={{ padding: "4px 14px 8px", fontSize: 11, color: "#9ca3af", fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase" }}>Columns</div>
                      {COLUMNS.filter(c => c.hideable).map(c => {
                        const visible = !hidden.has(c.key);
                        return (
                          <button key={c.key} onClick={() => toggleHidden(c.key)} style={{ all: "unset", cursor: "pointer", display: "flex", alignItems: "center", gap: 10, width: "100%", padding: "8px 14px", fontSize: 13, color: C.body, boxSizing: "border-box" }}>
                            <span style={{ width: 16, height: 16, border: `1.5px solid ${visible ? C.teal : "#d4d8d7"}`, borderRadius: 3, background: visible ? C.teal : "transparent", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>{visible && <Check size={11} color="#fff" />}</span>
                            {c.label}
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>
                {searchOpen ? (
                  <div style={{ display: "flex", alignItems: "center", gap: 4, background: C.bg, borderRadius: 5, padding: "4px 8px", border: `1px solid ${C.rule}` }}>
                    <Search size={14} style={{ color: "#9ca3af" }} />
                    <input ref={searchInputRef} value={search} onChange={e => setSearch(e.target.value)} onBlur={() => { if (!search) setSearchOpen(false); }} placeholder="Search…" style={{ all: "unset", fontSize: 13, color: C.navy, width: 200, fontFamily: "inherit" }} />
                    {search && <button onClick={() => { setSearch(""); setSearchOpen(false); }} style={{ all: "unset", cursor: "pointer", display: "flex", color: "#9ca3af" }}><X size={13} /></button>}
                  </div>
                ) : (
                  <button onClick={() => setSearchOpen(true)} style={{ display: "flex", padding: 8, borderRadius: 5, border: `1px solid ${C.rule}`, cursor: "pointer", background: C.white, color: C.body }} title="Search">
                    <Search size={15} />
                  </button>
                )}
                <button onClick={() => setAddingNew(true)} style={{ display: "flex", alignItems: "center", gap: 5, padding: "7px 14px", fontSize: 13, fontWeight: 700, borderRadius: 5, border: "none", background: C.teal, color: "#fff", cursor: "pointer" }}>
                  <Plus size={14} />Add
                </button>
              </div>
            </div>

            {/* List view */}
            <div style={{ overflowX: "auto", overflowY: "visible" }}>
              <div style={{ minWidth: "fit-content" }}>

                {/* Header row */}
                <div style={{ display: "grid", gridTemplateColumns: gridTemplate, background: "#fafbfb", borderBottom: `1px solid ${C.rule}`, position: "relative", zIndex: 30 }}>
                  {visibleColumns.map((col, i) => {
                    const isDragged = colDrag?.key === col.key;
                    const reorderableIdx = visibleColumns.filter(c => !c.pinned).findIndex(c => c.key === col.key);
                    let translateX = 0;
                    if (colDrag && !col.pinned && !isDragged) {
                      const { fromIdx, targetIdx } = colDrag;
                      if (fromIdx < targetIdx && reorderableIdx > fromIdx && reorderableIdx <= targetIdx) translateX = -(widths[colDrag.key] || 0);
                      if (fromIdx > targetIdx && reorderableIdx >= targetIdx && reorderableIdx < fromIdx) translateX = (widths[colDrag.key] || 0);
                    }
                    return (
                      <div
                        key={col.key}
                        ref={el => { if (el) headerCellRefs.current.set(col.key, el); }}
                        className="lv-h-cell"
                        onPointerDown={(e) => beginColumnDrag(col.key, e)}
                        style={{
                          padding: "12px 14px",
                          fontSize: 11, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase",
                          color: sortKey === col.key ? C.teal : "#9ca3af",
                          cursor: col.pinned ? "default" : "grab",
                          display: "flex", alignItems: "center", justifyContent: "space-between",
                          transform: `translateX(${translateX}px)`,
                          transition: colDrag ? "transform 0.18s cubic-bezier(0.2, 0, 0.13, 1.5)" : "none",
                          background: isDragged ? "#ecfafa" : (openHeaderMenu === col.key ? "#eef2f1" : "transparent"),
                          boxShadow: isDragged ? "0 6px 18px rgba(0,38,49,0.18), 0 0 0 2px #007377" : "none",
                          zIndex: isDragged ? 20 : 1,
                          position: "relative",
                        }}
                      >
                        <button
                          className="lv-h-menu-trigger"
                          onClick={(e) => {
                            e.stopPropagation();
                            if (openHeaderMenu === col.key) {
                              setOpenHeaderMenu(null);
                              setOpenHeaderMenuRect(null);
                            } else {
                              // Find the header cell element to anchor against
                              const cellEl = headerCellRefs.current.get(col.key);
                              if (cellEl) setOpenHeaderMenuRect(cellEl.getBoundingClientRect());
                              setOpenHeaderMenu(col.key);
                            }
                          }}
                          style={{ all: "unset", cursor: "pointer", display: "flex", alignItems: "center", gap: 4, flex: 1, minWidth: 0 }}
                        >
                          <span style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{col.label}</span>
                          {sortKey === col.key && (sortDir === "asc" ? <ArrowUp size={11} /> : <ArrowDown size={11} />)}
                          <ChevronDown size={11} style={{ opacity: 0.4 }} />
                        </button>

                        {/* Resize handle */}
                        <div className="lv-h-resize" onPointerDown={(e) => beginResize(col.key, e)} />
                      </div>
                    );
                  })}
                </div>

                {/* Rows */}
                {rows.map((p, rowIdx) => {
                  const isDragged = rowDrag?.id === p.id;
                  const showDropIndicator = rowDrag && !isDragged;
                  // Calculate drop indicator position
                  let dropIndicatorAbove = false;
                  let dropIndicatorBelow = false;
                  if (showDropIndicator) {
                    const { fromIdx, targetIdx } = rowDrag;
                    // Find this row's index in the visible rows
                    const myIdx = rows.findIndex(r => r.id === p.id);
                    // Adjust: when dragging from fromIdx to targetIdx, the indicator goes between targetIdx and targetIdx+1
                    let visualTarget = targetIdx;
                    if (fromIdx > targetIdx) {
                      // dragging up
                      if (myIdx === visualTarget) dropIndicatorAbove = true;
                    } else {
                      // dragging down
                      if (myIdx === visualTarget + 1) dropIndicatorAbove = true;
                    }
                  }
                  return (
                    <div
                      key={p.id}
                      ref={el => { if (el) rowRefs.current.set(p.id, el); }}
                      onPointerDown={(e) => beginRowDrag(p.id, e)}
                      className="lv-row"
                      style={{
                        display: "grid", gridTemplateColumns: gridTemplate,
                        borderBottom: `1px solid ${C.rule}`,
                        background: isDragged ? "#ecfafa" : C.white,
                        opacity: isDragged ? 0.85 : 1,
                        position: "relative",
                        boxShadow: isDragged ? "0 8px 24px rgba(0,38,49,0.18), 0 0 0 2px #007377" : "none",
                        zIndex: isDragged ? 10 : 1,
                        borderTop: dropIndicatorAbove ? `3px solid ${C.teal}` : "1px solid transparent",
                        transition: isDragged ? "none" : "background 0.15s",
                        cursor: "pointer",
                      }}
                    >
                      {visibleColumns.map((col) => (
                        <div key={col.key} style={{ padding: "12px 14px", display: "flex", alignItems: "center", minWidth: 0, overflow: "hidden", position: "relative" }}>
                          {renderCell(col, p)}
                        </div>
                      ))}
                    </div>
                  );
                })}
                {rows.length === 0 && (
                  <div style={{ padding: 60, textAlign: "center", color: "#9ca3af", fontSize: 14 }}>
                    No freelancers match your filters.
                    {(activeFilterCount > 0 || search) && <div style={{ marginTop: 8 }}><button onClick={clearAllFilters} style={{ all: "unset", cursor: "pointer", color: C.teal, fontWeight: 600 }}>Clear filters</button></div>}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* ── AI Recommend mode ─────────────────────────── */}
        {mode === "ai" && <AiPanel
          aiMessages={aiMessages} aiPrompt={aiPrompt} setAiPrompt={setAiPrompt}
          aiLoading={aiLoading} aiError={aiError} setAiError={setAiError}
          submitAi={submitAi}
          roster={roster} copiedId={copiedId} copyEmail={copyEmail}
          expandedRecs={expandedRecs} setExpandedRecs={setExpandedRecs}
          Tip={Tip} TierBadge={TierBadge} TrustBadge={TrustBadge} Price={Price} SpeedBadge={SpeedBadge}
        />}
      </div>

      {/* Filters modal */}
      {showFiltersModal && <FiltersModal filters={filters} setFilters={setFilters} onClose={() => setShowFiltersModal(false)} />}

      {/* Info modal */}
      {showInfo && <InfoModal onClose={() => setShowInfo(false)} />}

      {/* Toast */}
      {/* Tooltip - rendered at top level to escape any transform/overflow */}
      {tooltip && (
        <div style={{
          position: "fixed", left: tooltip.x, top: tooltip.y,
          background: "#002631", color: "#fff",
          padding: "8px 12px", borderRadius: 6,
          fontSize: 12, fontWeight: 400, lineHeight: 1.45,
          maxWidth: 260, width: "max-content",
          pointerEvents: "none", zIndex: 9999,
          boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
          letterSpacing: "normal", textTransform: "none",
          fontFamily: "'Lato', sans-serif",
        }}>{tooltip.text}</div>
      )}

      {/* Header menu — fixed position popover */}
      {openHeaderMenu && openHeaderMenuRect && (() => {
        const col = COLUMNS.find(c => c.key === openHeaderMenu);
        if (!col) return null;
        const menuWidth = 220;
        const rightOverflow = (openHeaderMenuRect.left + menuWidth) > window.innerWidth - 12;
        const left = rightOverflow ? Math.max(12, openHeaderMenuRect.right - menuWidth) : openHeaderMenuRect.left;
        const top = openHeaderMenuRect.bottom + 4;
        return (
          <div className="lv-header-menu" onClick={e => e.stopPropagation()} style={{ position: "fixed", top, left, background: C.white, border: `1px solid ${C.rule}`, borderRadius: 6, boxShadow: "0 8px 24px rgba(0,38,49,0.16)", zIndex: 9000, minWidth: menuWidth, padding: "4px 0", textTransform: "none", letterSpacing: "normal", maxHeight: `calc(100vh - ${top + 20}px)`, overflowY: "auto" }}>
            {col.sortable && (
              <>
                <button onClick={() => applySort(col.key, "asc")} style={{ all: "unset", cursor: "pointer", display: "flex", alignItems: "center", gap: 8, width: "100%", padding: "8px 12px", fontSize: 13, color: C.body, fontWeight: 400, boxSizing: "border-box" }}><ArrowUp size={13} />Sort ascending</button>
                <button onClick={() => applySort(col.key, "desc")} style={{ all: "unset", cursor: "pointer", display: "flex", alignItems: "center", gap: 8, width: "100%", padding: "8px 12px", fontSize: 13, color: C.body, fontWeight: 400, boxSizing: "border-box" }}><ArrowDown size={13} />Sort descending</button>
              </>
            )}
            {col.hasQuickFilter && col.options && (
              <>
                {col.sortable && <div style={{ height: 1, background: C.rule, margin: "4px 0" }} />}
                <div style={{ padding: "6px 12px", fontSize: 11, color: "#9ca3af", fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase" }}>Show only</div>
                {Object.entries(col.options).map(([k, v]) => {
                  const active = (filters[col.key] || []).includes(k);
                  return (
                    <button key={k} onClick={() => toggleFilterValue(col.key, k)} style={{ all: "unset", cursor: "pointer", display: "flex", alignItems: "center", gap: 8, width: "100%", padding: "8px 12px", fontSize: 13, color: active ? C.teal : C.body, fontWeight: active ? 700 : 400, background: active ? C.bg : "transparent", boxSizing: "border-box" }}>
                      <span style={{ width: 14, height: 14, border: `1.5px solid ${active ? C.teal : "#d4d8d7"}`, borderRadius: 3, background: active ? C.teal : "transparent", display: "flex", alignItems: "center", justifyContent: "center" }}>{active && <Check size={10} color="#fff" />}</span>
                      {v.label}
                    </button>
                  );
                })}
              </>
            )}
            {col.key === "approvedVendor" && (
              <>
                <div style={{ height: 1, background: C.rule, margin: "4px 0" }} />
                <div style={{ padding: "6px 12px", fontSize: 11, color: "#9ca3af", fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase" }}>Show only</div>
                {[["yes", "Approved"], ["no", "Needs setup"]].map(([k, lbl]) => {
                  const active = (filters.approvedVendor || []).includes(k);
                  return (
                    <button key={k} onClick={() => toggleFilterValue("approvedVendor", k)} style={{ all: "unset", cursor: "pointer", display: "flex", alignItems: "center", gap: 8, width: "100%", padding: "8px 12px", fontSize: 13, color: active ? C.teal : C.body, fontWeight: active ? 700 : 400, background: active ? C.bg : "transparent", boxSizing: "border-box" }}>
                      <span style={{ width: 14, height: 14, border: `1.5px solid ${active ? C.teal : "#d4d8d7"}`, borderRadius: 3, background: active ? C.teal : "transparent", display: "flex", alignItems: "center", justifyContent: "center" }}>{active && <Check size={10} color="#fff" />}</span>
                      {lbl}
                    </button>
                  );
                })}
              </>
            )}
            {col.hideable && (
              <>
                <div style={{ height: 1, background: C.rule, margin: "4px 0" }} />
                <button onClick={() => { toggleHidden(col.key); setOpenHeaderMenu(null); setOpenHeaderMenuRect(null); }} style={{ all: "unset", cursor: "pointer", display: "flex", alignItems: "center", gap: 8, width: "100%", padding: "8px 12px", fontSize: 13, color: C.body, fontWeight: 400, boxSizing: "border-box" }}><EyeOff size={13} />Hide column</button>
              </>
            )}
          </div>
        );
      })()}

      {/* Edit / Add drawer */}
      {(editingId || addingNew) && (
        <EditDrawer
          initial={addingNew ? null : roster.find(r => r.id === editingId)}
          onSave={(d) => saveFreelancer(d, addingNew)}
          onCancel={() => { setEditingId(null); setAddingNew(false); }}
          onDelete={deleteFreelancer}
        />
      )}

      {showToast && <div className="toast"><Check size={12} />Email copied</div>}
    </div>
  );
}

/* ── Edit/Add Right-Side Drawer ────────────────────────── */
function EditDrawer({ initial, onSave, onCancel, onDelete }) {
  const blank = { name: "", email: "", website: "", location: "", categories: [], skills: [], bestAt: [], tier: "MID", trust: "NEW", price: 2, speed: "standard", responsiveness: "neutral", approvedVendor: false, star: false, notes: "" };
  const [form, setForm] = useState(initial || blank);
  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));
  const parseList = (s) => s.split(",").map(x => x.trim()).filter(Boolean);
  const isNew = !initial;

  // ESC to close
  useEffect(() => {
    const onKey = (e) => { if (e.key === "Escape") onCancel(); };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [onCancel]);

  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 1000, fontFamily: "'Lato', sans-serif" }}>
      {/* Backdrop */}
      <div onClick={onCancel} style={{ position: "absolute", inset: 0, background: "rgba(15, 23, 42, 0.25)", backdropFilter: "blur(4px)", WebkitBackdropFilter: "blur(4px)" }} />
      {/* Drawer */}
      <div style={{
        position: "absolute", top: 0, right: 0, bottom: 0, width: "min(560px, 100vw)",
        background: "#fff", boxShadow: "-12px 0 40px rgba(0,38,49,0.15)",
        display: "flex", flexDirection: "column",
        animation: "drawerSlide 0.2s ease-out",
      }}>
        <style>{`@keyframes drawerSlide { from { transform: translateX(100%); } to { transform: translateX(0); } }`}</style>

        {/* Header */}
        <div style={{ padding: "20px 24px", borderBottom: "1px solid #e8efee", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div>
            <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: "#9ca3af", marginBottom: 2 }}>{isNew ? "Add new" : "Edit"}</div>
            <h2 style={{ margin: 0, fontSize: 18, fontWeight: 900, color: "#002631" }}>{isNew ? "New freelancer or agency" : (form.name || "Untitled")}</h2>
          </div>
          <button onClick={onCancel} style={{ all: "unset", cursor: "pointer", color: "#9ca3af", padding: 6 }}><X size={20} /></button>
        </div>

        {/* Body — scrollable */}
        <div style={{ flex: 1, overflowY: "auto", padding: "20px 24px" }}>
          <Section title="Basics">
            <Field label="Name *">
              <input value={form.name} onChange={e => set("name", e.target.value)} placeholder="e.g. Sari Miller" style={inputS} />
            </Field>
            <Field label="Email or contact">
              <input value={form.email} onChange={e => set("email", e.target.value)} placeholder="email@example.com or 'Contact via Fiverr'" style={inputS} />
            </Field>
            <Field label="Website">
              <input value={form.website} onChange={e => set("website", e.target.value)} placeholder="https://..." style={inputS} />
            </Field>
            <Field label="Location">
              <input value={form.location} onChange={e => set("location", e.target.value)} placeholder="City, State" style={inputS} />
            </Field>
          </Section>

          <Section title="Specialty">
            <Field label="Categories" hint="Pick all that apply">
              <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                {["design", "video", "photo", "animation", "other"].map(cat => {
                  const active = (form.categories || []).includes(cat);
                  return (
                    <button key={cat} onClick={() => set("categories", active ? form.categories.filter(c => c !== cat) : [...(form.categories || []), cat])} style={{ all: "unset", cursor: "pointer", padding: "5px 11px", fontSize: 12, fontWeight: 600, borderRadius: 99, border: `1px solid ${active ? "#007377" : "#e8efee"}`, background: active ? "#ecfafa" : "#fff", color: active ? "#007377" : "#53565A", textTransform: "capitalize" }}>{cat}</button>
                  );
                })}
              </div>
            </Field>
            <Field label="Best at" hint="Comma-separated. These are the headline specialties shown on cards.">
              <input value={(form.bestAt || []).join(", ")} onChange={e => set("bestAt", parseList(e.target.value))} placeholder="e.g. Brand Identity, Presentation Design" style={inputS} />
            </Field>
            <Field label="Skills" hint="Comma-separated. Full skill list for filtering and search.">
              <textarea value={(form.skills || []).join(", ")} onChange={e => set("skills", parseList(e.target.value))} placeholder="e.g. Figma, After Effects, brand design, motion graphics" style={{ ...inputS, minHeight: 60, fontFamily: "inherit", resize: "vertical" }} />
            </Field>
          </Section>

          <Section title="Ratings">
            <FieldRow>
              <Field label="Tier" half>
                <select value={form.tier} onChange={e => set("tier", e.target.value)} style={selS}>
                  <option value="BUDGET">Low</option><option value="MID">Mid</option><option value="PRO">Pro</option><option value="ELITE">Elite</option>
                </select>
              </Field>
              <Field label="Trust" half>
                <select value={form.trust} onChange={e => set("trust", e.target.value)} style={selS}>
                  <option value="NEW">New</option><option value="PROVING">Proving</option><option value="TRUSTED">Trusted</option>
                </select>
              </Field>
            </FieldRow>
            <FieldRow>
              <Field label="Price" half>
                <select value={form.price} onChange={e => set("price", Number(e.target.value))} style={selS}>
                  <option value={1}>$ — Budget</option><option value={2}>$$ — Moderate</option><option value={3}>$$$ — Higher-end</option><option value={4}>$$$$ — Premium</option>
                </select>
              </Field>
              <Field label="Speed" half>
                <select value={form.speed} onChange={e => set("speed", e.target.value)} style={selS}>
                  <option value="fast">Fast</option><option value="standard">Standard</option><option value="slow">Slow</option>
                </select>
              </Field>
            </FieldRow>
            <Field label="Communication style">
              <select value={form.responsiveness} onChange={e => set("responsiveness", e.target.value)} style={selS}>
                <option value="very">Very responsive</option><option value="neutral">Neutral</option><option value="slow">Slow</option>
              </select>
            </Field>
          </Section>

          <Section title="Status">
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              <label style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13, color: "#53565A", cursor: "pointer" }}>
                <input type="checkbox" checked={form.approvedVendor} onChange={e => set("approvedVendor", e.target.checked)} />
                <strong>In our vendor system</strong> — risk/compliance cleared, bank info on file
              </label>
              <label style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13, color: "#53565A", cursor: "pointer" }}>
                <input type="checkbox" checked={form.star || false} onChange={e => set("star", e.target.checked)} />
                <strong>Superstar</strong> ⭐ — top-tier recommendation, floats to top
              </label>
            </div>
          </Section>

          <Section title="Notes">
            <Field label="Internal notes" hint="Context, caveats, who referred them, etc.">
              <textarea value={form.notes || ""} onChange={e => set("notes", e.target.value)} placeholder="Anything else worth knowing…" style={{ ...inputS, minHeight: 80, fontFamily: "inherit", resize: "vertical" }} />
            </Field>
          </Section>

          {!isNew && onDelete && (
            <Section title="Danger zone">
              <button onClick={() => { if (window.confirm(`Delete ${form.name}? This cannot be undone.`)) { onDelete(initial.id); onCancel(); } }} style={{ display: "flex", alignItems: "center", gap: 6, padding: "9px 14px", fontSize: 13, fontWeight: 600, background: "#fff", color: "#dc2626", border: "1px solid #fecaca", borderRadius: 5, cursor: "pointer" }}>
                <Trash2 size={13} />Delete this freelancer
              </button>
            </Section>
          )}
        </div>

        {/* Footer */}
        <div style={{ padding: "16px 24px", borderTop: "1px solid #e8efee", display: "flex", justifyContent: "flex-end", gap: 8, background: "#fafbfb" }}>
          <button onClick={onCancel} style={{ padding: "9px 18px", fontSize: 13, fontWeight: 600, background: "#fff", color: "#53565A", border: "1px solid #e8efee", borderRadius: 5, cursor: "pointer" }}>Cancel</button>
          <button onClick={() => { if (!form.name.trim()) { alert("Name is required"); return; } onSave(form); }} style={{ padding: "9px 20px", fontSize: 13, fontWeight: 700, background: "#007377", color: "#fff", border: "none", borderRadius: 5, cursor: "pointer" }}>{isNew ? "Add freelancer" : "Save changes"}</button>
        </div>
      </div>
    </div>
  );
}
const Section = ({ title, children }) => <div style={{ marginBottom: 24 }}><div style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: "#007377", marginBottom: 12, paddingBottom: 6, borderBottom: "1px solid #e8efee" }}>{title}</div>{children}</div>;
const Field = ({ label, hint, half, children }) => <div style={{ marginBottom: 14, flex: half ? 1 : "auto", minWidth: 0 }}><label style={{ display: "block", fontSize: 12, fontWeight: 700, color: "#53565A", marginBottom: 5 }}>{label}</label>{hint && <div style={{ fontSize: 11, color: "#9ca3af", marginBottom: 5 }}>{hint}</div>}{children}</div>;
const FieldRow = ({ children }) => <div style={{ display: "flex", gap: 12 }}>{children}</div>;
const inputS = { padding: "8px 11px", fontSize: 13, border: "1px solid #e8efee", borderRadius: 5, fontFamily: "inherit", outline: "none", background: "#fff", color: "#002631", width: "100%", boxSizing: "border-box" };
const selS = { padding: "8px 11px", fontSize: 13, border: "1px solid #e8efee", borderRadius: 5, fontFamily: "inherit", background: "#fff", color: "#002631", textTransform: "none", letterSpacing: "normal", fontWeight: 400, width: "100%", boxSizing: "border-box" };

/* ── Filters Modal (Rippling-style 3-column) ──────────── */
function FiltersModal({ filters, setFilters, onClose }) {
  // Build complete list of filterable fields - columns + special ones
  const FILTER_FIELDS = [
    { key: "category", label: "Category", options: { design: "Design", video: "Video", photo: "Photo", animation: "Animation", other: "Other" } },
    { key: "tier", label: "Tier", options: Object.fromEntries(Object.entries(TIER).map(([k, v]) => [k, v.label])) },
    { key: "trust", label: "Trust", options: Object.fromEntries(Object.entries(TRUST).map(([k, v]) => [k, v.label])) },
    { key: "speed", label: "Speed", options: Object.fromEntries(Object.entries(SPEED).map(([k, v]) => [k, v.label])) },
    { key: "responsiveness", label: "Comms", options: Object.fromEntries(Object.entries(RESPONSIVENESS).map(([k, v]) => [k, v.label])) },
    { key: "approvedVendor", label: "In System", options: { yes: "Approved", no: "Needs setup" } },
    { key: "star", label: "Superstar only", options: { yes: "Superstars only" } },
    { key: "skills", label: "Skills & Tools", isSkills: true },
  ];
  const [activeField, setActiveField] = useState(FILTER_FIELDS[0].key);

  const allSelected = Object.entries(filters).flatMap(([field, vals]) =>
    (vals || []).map(v => ({ field, value: v }))
  );
  const fieldLabel = (key) => FILTER_FIELDS.find(f => f.key === key)?.label || key;
  const valueLabel = (field, value) => {
    const f = FILTER_FIELDS.find(f => f.key === field);
    if (f?.options?.[value]) return f.options[value];
    return value;
  };
  const toggleVal = (field, value) => {
    setFilters(prev => {
      const cur = prev[field] || [];
      const next = cur.includes(value) ? cur.filter(v => v !== value) : [...cur, value];
      const newFilters = { ...prev, [field]: next };
      if (!next.length) delete newFilters[field];
      return newFilters;
    });
  };
  const activeFieldDef = FILTER_FIELDS.find(f => f.key === activeField);

  return (
    <div onClick={onClose} style={{ position: "fixed", inset: 0, background: "rgba(15, 23, 42, 0.25)", backdropFilter: "blur(4px)", WebkitBackdropFilter: "blur(4px)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1000, padding: 20, fontFamily: "'Lato', sans-serif" }}>
      <div onClick={e => e.stopPropagation()} style={{ background: "#fff", borderRadius: 8, width: "100%", maxWidth: 980, maxHeight: "85vh", display: "flex", flexDirection: "column", overflow: "hidden", boxShadow: "0 12px 48px rgba(0,38,49,0.2)" }}>
        <div style={{ padding: "16px 20px", borderBottom: "1px solid #e8efee", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <h2 style={{ margin: 0, fontSize: 16, fontWeight: 700, color: "#002631" }}>Filters</h2>
          <button onClick={onClose} style={{ all: "unset", cursor: "pointer", color: "#9ca3af", display: "flex" }}><X size={18} /></button>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "200px 1fr 260px", flex: 1, minHeight: 400, overflow: "hidden" }}>
          {/* Left rail */}
          <div style={{ borderRight: "1px solid #e8efee", overflowY: "auto", background: "#f6f9f8" }}>
            {FILTER_FIELDS.map(f => {
              const count = filters[f.key]?.length || 0;
              return (
                <button key={f.key} onClick={() => setActiveField(f.key)} style={{ all: "unset", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "space-between", width: "100%", padding: "11px 16px", fontSize: 13, color: activeField === f.key ? "#007377" : "#53565A", fontWeight: activeField === f.key ? 700 : 400, background: activeField === f.key ? "#fff" : "transparent", borderLeft: activeField === f.key ? "3px solid #007377" : "3px solid transparent", boxSizing: "border-box" }}>
                  <span>{f.label}</span>
                  {count > 0 && <span style={{ background: "#007377", color: "#fff", fontSize: 10, padding: "1px 6px", borderRadius: 99, fontWeight: 700 }}>{count}</span>}
                </button>
              );
            })}
          </div>
          {/* Middle pane */}
          <div style={{ padding: 20, overflowY: "auto" }}>
            <div style={{ fontSize: 11, color: "#9ca3af", fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: 12 }}>{fieldLabel(activeField)}</div>
            {activeFieldDef?.isSkills ? (
              <div>
                {SKILL_GROUPS.map(group => (
                  <div key={group.label} style={{ marginBottom: 18 }}>
                    <div style={{ fontSize: 11, fontWeight: 700, color: "#007377", letterSpacing: "0.04em", textTransform: "uppercase", marginBottom: 8 }}>{group.label}</div>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                      {group.skills.map(skill => {
                        const active = (filters.skills || []).includes(skill);
                        return (
                          <button key={skill} onClick={() => toggleVal("skills", skill)} style={{ all: "unset", cursor: "pointer", padding: "5px 11px", fontSize: 12, fontWeight: active ? 700 : 500, borderRadius: 99, border: `1px solid ${active ? "#007377" : "#e8efee"}`, background: active ? "#ecfafa" : "#fff", color: active ? "#007377" : "#53565A" }}>{skill}</button>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div>
                {Object.entries(activeFieldDef?.options || {}).map(([k, lbl]) => {
                  const active = (filters[activeField] || []).includes(k);
                  return (
                    <button key={k} onClick={() => toggleVal(activeField, k)} style={{ all: "unset", cursor: "pointer", display: "flex", alignItems: "center", gap: 10, width: "100%", padding: "9px 0", fontSize: 13, color: active ? "#007377" : "#53565A", fontWeight: active ? 700 : 400, boxSizing: "border-box" }}>
                      <span style={{ width: 16, height: 16, border: `1.5px solid ${active ? "#007377" : "#d4d8d7"}`, borderRadius: 3, background: active ? "#007377" : "transparent", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>{active && <Check size={11} color="#fff" />}</span>
                      {lbl}
                    </button>
                  );
                })}
              </div>
            )}
          </div>
          {/* Right pane: all selected pills */}
          <div style={{ borderLeft: "1px solid #e8efee", padding: 16, overflowY: "auto", background: "#fafbfb" }}>
            <div style={{ fontSize: 11, color: "#9ca3af", fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: 10 }}>Active filters ({allSelected.length})</div>
            {allSelected.length === 0 && <div style={{ fontSize: 12, color: "#b0b5b4", fontStyle: "italic" }}>None selected</div>}
            <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
              {allSelected.map(({ field, value }) => (
                <div key={`${field}-${value}`} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 6, padding: "5px 9px", background: "#ecfafa", borderRadius: 4 }}>
                  <span style={{ fontSize: 11, color: "#007377", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}><span style={{ opacity: 0.7 }}>{fieldLabel(field)}:</span> <strong>{valueLabel(field, value)}</strong></span>
                  <button onClick={() => toggleVal(field, value)} style={{ all: "unset", cursor: "pointer", color: "#007377", display: "flex", flexShrink: 0 }}><X size={12} /></button>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div style={{ padding: "12px 20px", borderTop: "1px solid #e8efee", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <button onClick={() => setFilters({})} style={{ all: "unset", cursor: "pointer", fontSize: 13, color: "#9ca3af", fontWeight: 600 }}>Clear all</button>
          <button onClick={onClose} style={{ padding: "9px 22px", fontSize: 13, fontWeight: 700, background: "#007377", color: "#fff", border: "none", borderRadius: 5, cursor: "pointer" }}>Done</button>
        </div>
      </div>
    </div>
  );
}

/* ── Info Modal ────────────────────────────────────────── */
function InfoModal({ onClose }) {
  return (
    <div onClick={onClose} style={{ position: "fixed", inset: 0, background: "rgba(15, 23, 42, 0.25)", backdropFilter: "blur(4px)", WebkitBackdropFilter: "blur(4px)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1000, padding: 20, fontFamily: "'Lato', sans-serif" }}>
      <div onClick={e => e.stopPropagation()} style={{ background: "#fff", borderRadius: 8, width: "100%", maxWidth: 600, maxHeight: "80vh", overflowY: "auto", boxShadow: "0 12px 48px rgba(0,38,49,0.2)" }}>
        <div style={{ padding: "16px 20px", borderBottom: "1px solid #e8efee", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <h2 style={{ margin: 0, fontSize: 16, fontWeight: 700, color: "#002631" }}>About</h2>
          <button onClick={onClose} style={{ all: "unset", cursor: "pointer", color: "#9ca3af", display: "flex" }}><X size={18} /></button>
        </div>
        <div style={{ padding: 20 }}>
          <Sect title="About this tool">
            <p style={{ fontSize: 13, color: "#53565A", lineHeight: 1.6, marginTop: 0, marginBottom: 10 }}>
              This is Foundant's internal directory of multimedia and creative partners — designers, animators, photographers, videographers, voiceover artists, and full-service agencies we work with or are evaluating.
            </p>
            <p style={{ fontSize: 13, color: "#53565A", lineHeight: 1.6, marginTop: 0, marginBottom: 10 }}>
              Use <strong style={{ color: "#002631" }}>Browse</strong> to search and filter the roster directly. Use <strong style={{ color: "#002631" }}>Recommend</strong> to describe a project and get AI-powered partner recommendations.
            </p>
            <p style={{ fontSize: 13, color: "#b45309", lineHeight: 1.6, marginTop: 0, marginBottom: 10, padding: "8px 12px", background: "#fef3c7", borderRadius: 4, border: "1px solid #fde68a" }}>
              <strong>Confidential — internal use only.</strong> Do not share this directory or its contents outside Foundant.
            </p>
            <p style={{ fontSize: 13, color: "#53565A", lineHeight: 1.6, marginTop: 0, marginBottom: 0 }}>
              Have feedback, questions, or want to add a partner? Email <a href="mailto:logan.colegrove@foundant.com" style={{ color: "#007377", textDecoration: "none", fontWeight: 600 }}>logan.colegrove@foundant.com</a>.
            </p>
          </Sect>
          <Sect title="Tier">{Object.entries(TIER).map(([k, v]) => <Row key={k} k={v.label} v={v.desc} />)}</Sect>
          <Sect title="Trust">{Object.entries(TRUST).map(([k, v]) => <Row key={k} k={v.label} v={v.desc} />)}</Sect>
          <Sect title="Price">{Object.entries(PRICE_DESC).map(([k, v]) => <Row key={k} k={"$".repeat(Number(k))} v={v} />)}</Sect>
          <Sect title="Speed">{Object.entries(SPEED).map(([k, v]) => <Row key={k} k={v.label} v={v.desc} />)}</Sect>
        </div>
      </div>
    </div>
  );
}
const Sect = ({ title, children }) => <div style={{ marginBottom: 18 }}><div style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: "#007377", marginBottom: 6 }}>{title}</div>{children}</div>;
const Row = ({ k, v }) => <div style={{ fontSize: 13, color: "#53565A", marginBottom: 4 }}><strong style={{ color: "#002631" }}>{k}</strong> — {v}</div>;

/* ── AI Recommend Panel ────────────────────────────────── */
function AiPanel({ aiMessages, aiPrompt, setAiPrompt, aiLoading, aiError, setAiError, submitAi, roster, copiedId, copyEmail, expandedRecs, setExpandedRecs, Tip, TierBadge, TrustBadge, Price, SpeedBadge }) {
  const QUICK_STARTS = [
    { icon: Video, text: "Testimonial video" },
    { icon: Sparkles, text: "Webinar clips or editing" },
    { icon: LayoutGrid, text: "Google display ad" },
    { icon: Camera, text: "Event or headshot photography" },
    { icon: Palette, text: "Signage & backdrop design" },
    { icon: ChevronRight, text: "Blog post template" },
    { icon: Wand2, text: "Thumbnail design" },
    { icon: LayoutGrid, text: "PowerPoint deck design" },
    { icon: MessageCircle, text: "Something else" },
  ];
  const isEmpty = aiMessages.length === 0;
  return (
    <div style={{ display: "flex", flexDirection: "column", height: "calc(100vh - 64px)" }}>
      {isEmpty ? (
        <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "0 24px", maxWidth: 720, margin: "0 auto" }}>
          <h1 style={{ fontSize: 22, fontWeight: 900, color: "#002631", marginBottom: 8, textAlign: "center" }}>What are you working on?</h1>
          <p style={{ fontSize: 14, color: "#9ca3af", marginBottom: 24, textAlign: "center" }}>Tell us about your project and we'll recommend the right partners from our roster.</p>
          <div style={{ width: "100%", marginBottom: 20 }}>
            <PromptInput aiPrompt={aiPrompt} setAiPrompt={setAiPrompt} aiLoading={aiLoading} submitAi={submitAi} />
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, width: "100%" }}>
            {QUICK_STARTS.map(({ icon: Icon, text }) => (
              <button key={text} onClick={() => { setAiPrompt(text); }} style={{ all: "unset", cursor: "pointer", display: "flex", alignItems: "center", gap: 8, padding: "10px 14px", border: "1px solid #e8efee", borderRadius: 6, fontSize: 13, color: "#53565A", background: "#fff" }}><Icon size={14} style={{ color: "#9ca3af" }} />{text}</button>
            ))}
          </div>
        </div>
      ) : (
        <>
          <div style={{ flex: 1, overflowY: "auto", padding: "20px 24px" }}>
            <div style={{ maxWidth: 720, margin: "0 auto" }}>
              {aiMessages.map((msg, i) => (
                <div key={i} style={{ marginBottom: 16 }}>
                  {msg.role === "user" ? (
                    <div style={{ display: "flex", justifyContent: "flex-end" }}>
                      <div style={{ background: "#002631", color: "#fff", padding: "10px 14px", borderRadius: 14, maxWidth: "75%", fontSize: 14, lineHeight: 1.5 }}>{msg.content}</div>
                    </div>
                  ) : (
                    <div>
                      {msg.recommendations ? (
                        <>
                          {msg.extraText && <div style={{ background: "#f6f9f8", padding: "10px 14px", borderRadius: 14, fontSize: 14, marginBottom: 12, color: "#53565A" }}>{msg.extraText}</div>}
                          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                            {msg.recommendations.map((rec, j) => {
                              const m = roster.find(r => r.name.toLowerCase() === rec.name?.toLowerCase());
                              const recKey = `${i}-${j}`;
                              const isExpanded = expandedRecs[recKey];
                              return (
                                <div key={j} style={{ padding: "16px 18px", borderRadius: 6, border: "1px solid #e8efee", background: "#f6f9f8" }}>
                                  <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 6 }}>
                                    <span style={{ width: 22, height: 22, borderRadius: 99, background: "#ecfafa", color: "#007377", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 900 }}>{j + 1}</span>
                                    {m?.star && <Star size={14} fill="#059669" color="#059669" />}
                                    <a href={m?.website} target="_blank" rel="noopener noreferrer" style={{ fontWeight: 900, fontSize: 16, color: "#002631", textDecoration: "none", display: "flex", alignItems: "center", gap: 4 }}>
                                      {rec.name}<ExternalLink size={11} style={{ color: "#d4d8d7" }} />
                                    </a>
                                  </div>
                                  {m && <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 8, flexWrap: "wrap" }}>
                                    <TierBadge tier={m.tier} /><TrustBadge trust={m.trust} />
                                    <span style={{ width: 1, height: 12, background: "#e8efee" }} />
                                    <Price level={m.price} /><SpeedBadge level={m.speed} />
                                    <span style={{ width: 1, height: 12, background: "#e8efee" }} />
                                    {m.approvedVendor
                                      ? <span style={{ fontSize: 12, fontWeight: 700, color: "#059669", display: "inline-flex", alignItems: "center", gap: 3 }}><Check size={12} />Approved</span>
                                      : <span style={{ fontSize: 12, color: "#b0b5b4" }}>Needs setup</span>}
                                  </div>}
                                  {m && <div style={{ display: "flex", alignItems: "center", gap: 5, marginBottom: 10 }}>
                                    <span style={{ fontSize: 13, color: "#002631" }}>{m.email}</span>
                                    {!m.email.toLowerCase().includes("fiverr") && <button onClick={() => copyEmail(m.id, m.email)} style={{ all: "unset", cursor: "pointer", color: copiedId === m.id ? "#059669" : "#c8cecd" }}>{copiedId === m.id ? <Check size={13} /> : <Copy size={13} />}</button>}
                                  </div>}
                                  <p style={{ fontSize: 14, color: "#53565A", lineHeight: 1.65, marginBottom: rec.caveats ? 8 : 0 }}>{rec.reasoning}</p>
                                  {rec.caveats && <p style={{ fontSize: 12, fontStyle: "italic", color: "#9ca3af", paddingLeft: 8, borderLeft: "2px solid #e8efee", marginBottom: 0 }}>⚠ {rec.caveats}</p>}
                                  {m && <div style={{ marginTop: 10, borderTop: "1px solid #e8efee", paddingTop: 8 }}>
                                    <button onClick={() => setExpandedRecs(p => ({ ...p, [recKey]: !p[recKey] }))} style={{ all: "unset", cursor: "pointer", fontSize: 12, color: "#9ca3af", display: "flex", alignItems: "center", gap: 3 }}>
                                      {isExpanded ? <ChevronUp size={12} /> : <ChevronDown size={12} />}Skills & details
                                    </button>
                                    {isExpanded && <div style={{ display: "flex", flexWrap: "wrap", gap: 3, marginTop: 8 }}>
                                      {m.skills.map(s => <span key={s} style={{ fontSize: 11, padding: "2px 7px", borderRadius: 3, background: "#eef0ef", color: "#71717a" }}>{s}</span>)}
                                      {m.notes && <p style={{ fontSize: 12, fontStyle: "italic", color: "#9ca3af", lineHeight: 1.5, marginTop: 6, paddingLeft: 8, borderLeft: "2px solid #e8efee", width: "100%" }}>{m.notes}</p>}
                                    </div>}
                                  </div>}
                                </div>
                              );
                            })}
                          </div>
                        </>
                      ) : (
                        <div style={{ background: "#f6f9f8", padding: "10px 14px", borderRadius: 14, fontSize: 14, lineHeight: 1.5, color: "#53565A" }}>{msg.content}</div>
                      )}
                    </div>
                  )}
                </div>
              ))}
              {aiLoading && <div style={{ fontSize: 13, color: "#9ca3af", padding: "10px 14px" }}>Thinking…</div>}
              {aiError && <div style={{ background: "#fef2f2", color: "#991b1b", padding: "10px 14px", borderRadius: 6, fontSize: 13, display: "flex", alignItems: "center", gap: 6 }}><AlertCircle size={14} />{aiError}<button onClick={() => setAiError(null)} style={{ marginLeft: "auto", all: "unset", cursor: "pointer" }}><X size={14} /></button></div>}
            </div>
          </div>
          <div style={{ borderTop: "1px solid #e8efee", padding: "12px 24px", background: "#fff" }}>
            <div style={{ maxWidth: 720, margin: "0 auto" }}>
              <PromptInput aiPrompt={aiPrompt} setAiPrompt={setAiPrompt} aiLoading={aiLoading} submitAi={submitAi} />
            </div>
          </div>
        </>
      )}
    </div>
  );
}

function PromptInput({ aiPrompt, setAiPrompt, aiLoading, submitAi }) {
  const [focused, setFocused] = useState(false);
  return (
    <div style={{
      display: "flex", alignItems: "flex-end", gap: 8,
      border: `1px solid ${focused ? "#007377" : "#e8efee"}`,
      borderRadius: 10, padding: "10px 12px", background: "#fff",
      boxShadow: focused ? "0 0 0 3px rgba(0,115,119,0.08)" : "0 1px 3px rgba(0,38,49,0.04)",
      transition: "border-color 0.15s, box-shadow 0.15s",
    }}>
      <textarea
        value={aiPrompt}
        onChange={e => setAiPrompt(e.target.value)}
        onKeyDown={e => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); submitAi(); } }}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        placeholder="Describe your project..."
        rows={1}
        style={{
          flex: 1, minWidth: 0, all: "unset", fontSize: 14, color: "#002631", fontFamily: "inherit",
          lineHeight: 1.4, padding: "4px 2px", resize: "none", overflowY: "auto", maxHeight: 120,
          display: "block", width: "100%",
        }}
      />
      <button onClick={submitAi} disabled={aiLoading || !aiPrompt.trim()} style={{
        all: "unset", cursor: aiLoading || !aiPrompt.trim() ? "not-allowed" : "pointer",
        padding: "7px 14px",
        background: aiLoading || !aiPrompt.trim() ? "#d4d8d7" : "#007377",
        color: "#fff", borderRadius: 6, fontSize: 13, fontWeight: 700,
        display: "flex", alignItems: "center", gap: 5,
        transition: "background 0.15s",
        flexShrink: 0,
      }}>{aiLoading ? "..." : <><Send size={13} />Send</>}</button>
    </div>
  );
}
