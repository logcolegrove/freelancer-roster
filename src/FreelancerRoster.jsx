/**
 * ============================================================
 * FREELANCER & AGENCY ROSTER — with AI Recommendation Engine
 * ============================================================
 *
 * HOW TO ADD A NEW ENTRY:
 * Add a new object to the ROSTER array below.
 * "categories" determines which tab(s) the entry appears under.
 * Valid categories: "design", "video", "photo", "animation"
 *
 * {
 *   id: 7,
 *   name: "Jane Smith",
 *   email: "jane@janesmith.com",
 *   website: "https://janesmith.com",
 *   location: "Denver, CO",
 *   categories: ["photo", "video"],
 *   skills: ["photography", "retouching", "Lightroom"],  // include tools
 *   bestAt: ["Portrait Photography"],
 *   tier: "PRO",              // BUDGET | MID | PRO | ELITE
 *   trust: "TRUSTED",         // NEW | PROVING | TRUSTED
 *   price: 3,                 // 1–4 ($ to $$$$)
 *   speed: "standard",        // "fast" | "standard" | "slow"
 *   responsiveness: "very",   // "very" | "neutral" | "slow"
 *   approvedVendor: true,
 *   star: true,               // optional — marks as a go-to / recommended freelancer
 *   notes: "Great eye for natural light."
 * }
 *
 * ============================================================
 */

const ROSTER = [
  {
    id: 1, name: "Sari Miller", email: "sarijones1@gmail.com",
    website: "https://sarimillerdesign.com", location: "Missoula, MT",
    categories: ["design", "animation"],
    skills: ["graphic design", "presentation design", "ebook design", "one-pager design", "static ad design", "social ads", "brand identity", "motion graphics", "web design", "Figma", "After Effects", "Illustrator", "InDesign", "PowerPoint"],
    bestAt: ["Figma Templates & Ebooks", "Static Ad Design", "Presentation Design"],
    tier: "PRO", trust: "TRUSTED", price: 2,
    speed: "standard", responsiveness: "very", approvedVendor: true, star: true,
    notes: "Emmy award-winning designer. Excels at B2B/SaaS visual storytelling — ebooks, one-pagers, presentations, social ads. Strong brand identity chops. Also does motion graphics. Corporate background with clients like Cisco, Valimail, Cloudera.",
  },
  {
    id: 2, name: "Beth Paulsen", email: "beth@paulsenstudio.com",
    website: "https://www.paulsenstudio.com", location: "Los Angeles, CA",
    categories: ["design"],
    skills: ["brand identity", "brand refresh", "sales enablement design", "ebook design", "one-pager design", "case study design", "event design", "tradeshow graphics", "social ads", "presentation design", "graphic design", "Figma", "Illustrator", "InDesign"],
    bestAt: ["B2B SaaS Brand Design", "Sales Enablement Collateral", "Event & Tradeshow Design"],
    tier: "PRO", trust: "TRUSTED", price: 2,
    speed: "standard", responsiveness: "very", approvedVendor: true,
    notes: "Conversion-focused B2B SaaS brand designer. Specializes in brand refreshes, sales collateral, and event design for tech companies. Strong strategic thinker — treats design as a growth lever, not just aesthetics.",
  },
  {
    id: 3, name: "RTW Photography", email: "bookings@ridethewave.co",
    website: "https://ridethewave.co", location: "Orlando, FL",
    categories: ["photo", "video"],
    skills: ["event photography", "corporate photography", "videography", "event videography", "branding photography", "headshots", "photo booth", "lifestyle photography"],
    bestAt: ["Event Photography", "Corporate Event Videography"],
    tier: "PRO", trust: "TRUSTED", price: 2,
    speed: "standard", responsiveness: "neutral", approvedVendor: true,
    notes: "Full-service photo/video team based in Orlando. Covers events across Orlando, Tampa, Atlanta, Miami, and Las Vegas. Clients include Google and BET. Has own 4,000 sq ft studio. Good for conferences and corporate events.",
  },
  {
    id: 4, name: "Austen Diamond", email: "info@austendiamond.com",
    website: "https://austendiamond.com", location: "Salt Lake City, UT",
    categories: ["photo"],
    skills: ["commercial photography", "product photography", "editorial photography", "headshots", "brand photography", "lifestyle photography", "lighting", "Lightroom"],
    bestAt: ["Commercial & Product Photography", "Editorial Photography"],
    tier: "PRO", trust: "TRUSTED", price: 2,
    speed: "fast", responsiveness: "neutral", approvedVendor: true,
    notes: "Story-driven commercial photographer based in SLC. Clients include Visit Salt Lake and Utah Office of Tourism. Strong at product lighting and editorial work. Also runs Product Video Course but photo is his core strength.",
  },
  {
    id: 5, name: "Alan (alan_art)", email: "Contact via Fiverr",
    website: "https://pro.fiverr.com/inbox/alan_art", location: "Kyrgyzstan",
    categories: ["animation"],
    skills: ["motion graphics", "2D animation", "Lottie animation", "illustration", "After Effects", "Illustrator"],
    bestAt: ["2D Motion Graphics", "Lottie Animations"],
    tier: "BUDGET", trust: "TRUSTED", price: 1,
    speed: "fast", responsiveness: "slow", approvedVendor: true,
    notes: "Fiverr freelancer. Good for quick, budget-friendly animations and Lottie web animations. Timezone can slow revisions — send very clear briefs. All communication through Fiverr.",
  },
  {
    id: 6, name: "Mark Santos (markksantos)", email: "Contact via Fiverr",
    website: "https://pro.fiverr.com/inbox/markksantos", location: "United States",
    categories: ["video"],
    skills: ["video editing", "YouTube editing", "corporate video editing", "short-form video", "social media video", "thumbnail design", "Premiere Pro"],
    bestAt: ["Video Editing", "YouTube Thumbnails"],
    tier: "BUDGET", trust: "PROVING", price: 1,
    speed: "fast", responsiveness: "neutral", approvedVendor: true,
    notes: "Fiverr freelancer. Cheap and fast but quality is low — barely a step above AI-generated output. Fine for quick-and-dirty edits or placeholder thumbnails. Don't use for projects where quality matters. All communication through Fiverr.",
  },
  {
    id: 7, name: "Melissa Harlow (melissaharlowvo)", email: "Contact via Fiverr",
    website: "https://pro.fiverr.com/inbox/melissaharlowvo", location: "United States",
    categories: ["other"],
    skills: ["voiceover", "narration", "commercial VO", "explainer video VO", "e-learning", "corporate narration", "Source Connect"],
    bestAt: ["Commercial Voiceover", "Explainer Video Narration"],
    tier: "MID", trust: "PROVING", price: 2,
    speed: "fast", responsiveness: "neutral", approvedVendor: true,
    notes: "Fiverr freelancer. Natural, warm US female voice. NAVA member. Usually delivers within 24 hours. Good for explainer videos and corporate narration. All communication through Fiverr.",
  },
  {
    id: 8, name: "Jessica (jessona)", email: "Contact via Fiverr",
    website: "https://pro.fiverr.com/inbox/jessona", location: "United Kingdom",
    categories: ["other"],
    skills: ["voiceover", "narration", "British accent VO", "Nigerian accent VO", "commercial VO", "corporate narration", "e-learning"],
    bestAt: ["British Accent Voiceover"],
    tier: "MID", trust: "PROVING", price: 3,
    speed: "fast", responsiveness: "slow", approvedVendor: true,
    notes: "Fiverr freelancer. Female voiceover with authentic British accent. Top Rated with 600+ reviews. Good option when you need a non-American voice. All communication through Fiverr.",
  },
  {
    id: 9, name: "Vidico", email: "hello@vidico.com",
    website: "https://vidico.com", location: "Melbourne / New York",
    categories: ["video", "animation"],
    skills: ["explainer videos", "brand films", "product video", "app video", "motion graphics", "2D animation", "3D animation", "ad creative", "social video", "short-form video", "live-action", "scriptwriting", "post-production"],
    bestAt: ["Explainer Videos for SaaS", "Full-Service Brand Films"],
    tier: "ELITE", trust: "NEW", price: 4,
    speed: "standard", responsiveness: "neutral", approvedVendor: false,
    notes: "Full-service creative production agency for tech brands. Offices in Melbourne, Sydney, and New York. Clients include Spotify, Square, TikTok, and Zendesk. Premium pricing but flagship-quality output. 4.9 stars across 100+ reviews.",
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
];

/**
 * SKILL_GROUPS — Organized categories for the filter panel.
 * When adding new skills to roster entries, add them here too
 * so they appear in the grouped filter.
 */
const SKILL_GROUPS = [
  { label: "Video & Film", skills: ["video editing", "video production", "color grading", "sound design", "brand films", "documentary", "scriptwriting", "post-production", "conference production", "live streaming"] },
  { label: "Photo", skills: ["photography", "portrait", "commercial", "product photography", "lifestyle", "retouching"] },
  { label: "Animation & Motion", skills: ["motion graphics", "logo animation", "kinetic typography", "social media graphics"] },
  { label: "Design", skills: ["brand design", "graphic design", "presentation design", "social media templates", "print", "packaging"] },
  { label: "Drone & Aerial", skills: ["drone", "aerial photography", "aerial video", "FPV", "photogrammetry", "Part 107"] },
  { label: "Software & Tools", skills: ["Premiere Pro", "DaVinci Resolve", "After Effects", "Cinema 4D", "Figma", "Illustrator", "InDesign", "Lightroom", "Capture One", "DJI", "Litchi", "Audacity", "Pro Tools"] },
  { label: "Other", skills: ["voiceover", "narration", "commercial VO", "e-learning", "character voices", "audio editing"] },
];

import { useState, useMemo, useRef, useCallback } from "react";
import {
  Search, X, Sparkles, ChevronDown, ChevronUp, ExternalLink,
  Mic, MicOff, Send, ArrowLeft, Copy, Check,
  AlertCircle, LayoutGrid, ChevronRight,
  XCircle, ChevronsUpDown, HelpCircle, Palette, Video,
  Camera, Wand2, Zap, Clock, MessageCircle, MoreHorizontal, Star
} from "lucide-react";

const TIER = {
  BUDGET: { label: "Budget", desc: "Fiverr-level, cost-driven. Good for simple, low-stakes work." },
  MID:    { label: "Mid",    desc: "Solid professional, good value. Reliable for standard projects." },
  PRO:    { label: "Pro",    desc: "Experienced, polished output. Can handle complex or visible work." },
  ELITE:  { label: "Elite",  desc: "Agency-level, premium work. For high-stakes, flagship projects." },
};
const TRUST = {
  NEW:     { label: "New",     color: "#9ca3af", bg: "#f4f4f5", desc: "Never used. No working history yet." },
  PROVING: { label: "Proving", color: "#9ca3af", bg: "#f4f4f5", desc: "Used once or twice. Still evaluating fit and reliability." },
  TRUSTED: { label: "Trusted", color: "#065f46", bg: "#ecfdf5", desc: "Proven partner. Consistently delivers — a go-to for their specialty." },
};
const PRICE_DESC = { 1: "Budget-friendly. Best for simple or low-stakes work.", 2: "Moderate. Good value for solid professional output.", 3: "Higher-end. Reflects experience and polished quality.", 4: "Premium. Agency-level pricing for flagship work." };
const SPEED = {
  fast:     { label: "Fast",     color: "#007377", desc: "Quick turnaround. Can deliver under tight timelines." },
  standard: { label: "Standard", color: "#9ca3af", desc: "Normal delivery pace. Plan for typical lead times." },
  slow:     { label: "Slower",   color: "#9ca3af", desc: "Takes more time. Book well in advance." },
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
const C = { teal: "#007377", green: "#97D700", navy: "#002631", body: "#53565A", rule: "#e8efee", bg: "#f6f9f8", white: "#ffffff" };

export default function FreelancerRoster() {
  const [mode, setMode] = useState("browse");
  const [category, setCategory] = useState("all");
  const [search, setSearch] = useState("");
  const [activeSkills, setActiveSkills] = useState([]);
  const [tierFilter, setTierFilter] = useState(null);
  const [trustFilter, setTrustFilter] = useState(null);
  const [starOnly, setStarOnly] = useState(false);
  const [sortBy, setSortBy] = useState("name");
  const [expandedRows, setExpandedRows] = useState({});
  const [expandedRecs, setExpandedRecs] = useState({});
  const [roster] = useState(ROSTER);
  const [aiPrompt, setAiPrompt] = useState("");
  const [aiMessages, setAiMessages] = useState([]);  // { role, content, recommendations? }
  const [aiLoading, setAiLoading] = useState(false);
  const [aiError, setAiError] = useState(null);
  // ⬇️ PASTE YOUR ANTHROPIC API KEY BETWEEN THE QUOTES BELOW ⬇️
  const apiKey = "YOUR_API_KEY_HERE";
  // ⬆️ Get one at https://console.anthropic.com/settings/keys ⬆️
  const [isListening, setIsListening] = useState(false);
  const [showSkills, setShowSkills] = useState(false);
  const [showInfo, setShowInfo] = useState(false);
  const [copiedId, setCopiedId] = useState(null);
  const [showToast, setShowToast] = useState(false);
  const [tierDrop, setTierDrop] = useState(false);
  const [trustDrop, setTrustDrop] = useState(false);
  const recognitionRef = useRef(null);

  const filtered = useMemo(() => {
    let list = [...roster];
    if (category !== "all") list = list.filter(r => r.categories.includes(category));
    if (search) { const q = search.toLowerCase(); list = list.filter(r => r.name.toLowerCase().includes(q) || r.email.toLowerCase().includes(q) || r.location.toLowerCase().includes(q) || r.skills.some(s => s.toLowerCase().includes(q)) || (r.notes && r.notes.toLowerCase().includes(q))); }
    if (activeSkills.length) list = list.filter(r => activeSkills.some(s => r.skills.includes(s)));
    if (tierFilter) list = list.filter(r => r.tier === tierFilter);
    if (trustFilter) list = list.filter(r => r.trust === trustFilter);
    if (starOnly) list = list.filter(r => r.star);
    list.sort((a, b) => {
      // Superstars always float to top
      if (a.star && !b.star) return -1;
      if (!a.star && b.star) return 1;
      // Then sort by selected criteria
      if (sortBy === "name") return a.name.localeCompare(b.name);
      if (sortBy === "price") return a.price - b.price;
      if (sortBy === "tier") return TIER_ORDER[b.tier] - TIER_ORDER[a.tier];
      if (sortBy === "trust") return TRUST_ORDER[b.trust] - TRUST_ORDER[a.trust];
      return 0;
    });
    return list;
  }, [roster, category, search, activeSkills, tierFilter, trustFilter, starOnly, sortBy]);

  const activeCount = activeSkills.length;
  const hasFilters = search || activeCount || tierFilter || trustFilter || starOnly;
  const clearAll = () => { setSearch(""); setActiveSkills([]); setTierFilter(null); setTrustFilter(null); setStarOnly(false); };
  const toggleSkill = sk => setActiveSkills(p => p.includes(sk) ? p.filter(s => s !== sk) : [...p, sk]);
  const toggleRow = id => setExpandedRows(p => ({ ...p, [id]: !p[id] }));
  const copyEmail = (id, email) => {
    const onSuccess = () => { setCopiedId(id); setShowToast(true); setTimeout(() => setCopiedId(null), 1500); setTimeout(() => setShowToast(false), 1600); };
    const fallback = () => { const ta = document.createElement("textarea"); ta.value = email; ta.style.position = "fixed"; ta.style.left = "-9999px"; document.body.appendChild(ta); ta.select(); document.execCommand("copy"); document.body.removeChild(ta); onSuccess(); };
    if (navigator.clipboard?.writeText) { navigator.clipboard.writeText(email).then(onSuccess).catch(fallback); } else { fallback(); }
  };


  const toggleVoice = useCallback(() => {
    if (!("webkitSpeechRecognition" in window || "SpeechRecognition" in window)) { setAiError("Speech recognition not supported."); return; }
    if (isListening) { recognitionRef.current?.stop(); setIsListening(false); return; }
    const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
    const r = new SR(); r.continuous = true; r.interimResults = true;
    r.onresult = e => { let t = ""; for (let i = 0; i < e.results.length; i++) t += e.results[i][0].transcript; setAiPrompt(t); };
    r.onerror = () => setIsListening(false); r.onend = () => setIsListening(false);
    recognitionRef.current = r; r.start(); setIsListening(true);
  }, [isListening]);

  const submitAI = async () => {
    if (!apiKey || apiKey === "YOUR_API_KEY_HERE") { setAiError("API key not configured. Contact logan.colegrove@foundant.com for setup."); return; }
    if (!aiPrompt.trim()) return;
    const userMsg = aiPrompt.trim();
    setAiPrompt("");
    const newMessages = [...aiMessages, { role: "user", content: userMsg }];
    setAiMessages(newMessages);
    setAiLoading(true); setAiError(null);
    const ctx = roster.map(r => ({ name: r.name, email: r.email, location: r.location, categories: r.categories, skills: r.skills, bestAt: r.bestAt, tier: r.tier, trust: r.trust, price: "$".repeat(r.price), speed: r.speed, responsiveness: r.responsiveness, approvedVendor: r.approvedVendor, notes: r.notes, star: r.star || false }));
    try {
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
      // Try to extract JSON recommendations — could be pure JSON or JSON embedded in text
      let recs = null;
      let extraText = null;
      try {
        // First try: pure JSON response
        const clean = text.replace(/```json|```/g, "").trim();
        const parsed = JSON.parse(clean);
        if (parsed.recommendations) recs = parsed.recommendations;
      } catch {
        // Second try: JSON embedded in surrounding text — find the { } block
        try {
          const jsonMatch = text.match(/\{[\s\S]*"recommendations"[\s\S]*\}/);
          if (jsonMatch) {
            const parsed = JSON.parse(jsonMatch[0]);
            if (parsed.recommendations) {
              recs = parsed.recommendations;
              // Capture any text before/after the JSON as context
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
  const Tip = ({ text, children }) => <span className="tip" style={{ position: "relative", display: "inline-flex" }}>{children}<span className="tip-text">{text}</span></span>;

  const TierBadge = ({ tier }) => <Tip text={TIER[tier].desc}><span style={{ display: "inline-block", fontSize: 12, fontWeight: 700, letterSpacing: "0.04em", padding: "3px 8px", borderRadius: 3, color: "#71717a", background: "#f4f4f5", cursor: "help" }}>{TIER[tier].label}</span></Tip>;
  const TrustBadge = ({ trust }) => { const t = TRUST[trust]; return <Tip text={t.desc}><span style={{ display: "inline-block", fontSize: 12, fontWeight: 700, letterSpacing: "0.04em", padding: "3px 8px", borderRadius: 3, color: t.color, background: t.bg, cursor: "help" }}>{t.label}</span></Tip>; };
  const Price = ({ level }) => <Tip text={PRICE_DESC[level]}><span style={{ fontSize: 15, letterSpacing: -0.5, cursor: "help" }}>{[1,2,3,4].map(i => <span key={i} style={{ color: i <= level ? C.navy : "#d4d8d7", fontWeight: i <= level ? 900 : 400 }}>$</span>)}</span></Tip>;
  const SpeedBadge = ({ level }) => { const s = SPEED[level]; return <Tip text={s.desc}><span style={{ display: "inline-flex", alignItems: "center", gap: 3, fontSize: 12, fontWeight: 600, color: s.color, cursor: "help" }}>{level === "fast" ? <Zap size={12} /> : <Clock size={12} />}{s.label}</span></Tip>; };

  const FilterHeader = ({ label, tooltip, options, activeValue, onSelect, isOpen, onToggle }) => (
    <div style={{ position: "relative" }}>
      <Tip text={tooltip}><button onClick={onToggle} style={{ all: "unset", cursor: "pointer", display: "flex", alignItems: "center", gap: 3, fontSize: 10, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: activeValue ? C.teal : "#9ca3af" }}>
        {label}<ChevronDown size={10} style={{ opacity: 0.5, transform: isOpen ? "rotate(180deg)" : "none", transition: "transform 0.15s" }} />
        {activeValue && <span style={{ width: 5, height: 5, borderRadius: 99, background: C.teal }} />}
      </button></Tip>
      {isOpen && (
        <div style={{ position: "absolute", top: "calc(100% + 6px)", left: -4, background: C.white, border: `1px solid ${C.rule}`, borderRadius: 6, boxShadow: "0 8px 24px rgba(0,38,49,0.08)", zIndex: 100, minWidth: 150, padding: "4px 0" }}>
          <button onClick={() => { onSelect(null); onToggle(); }} style={{ all: "unset", cursor: "pointer", display: "block", width: "100%", padding: "6px 12px", fontSize: 11, color: !activeValue ? C.teal : C.body, fontWeight: !activeValue ? 700 : 400, background: !activeValue ? C.bg : "transparent" }}>All</button>
          {Object.entries(options).map(([k, v]) => (
            <Tip key={k} text={v.desc}><button onClick={() => { onSelect(activeValue === k ? null : k); onToggle(); }}
              style={{ all: "unset", cursor: "pointer", display: "block", width: "100%", padding: "6px 12px", fontSize: 11, color: activeValue === k ? C.teal : C.body, fontWeight: activeValue === k ? 700 : 400, background: activeValue === k ? C.bg : "transparent" }}>{v.label}</button></Tip>
          ))}
        </div>
      )}
    </div>
  );
  const ThBtn = ({ children, k }) => <button onClick={() => setSortBy(k)} style={{ all: "unset", cursor: "pointer", display: "flex", alignItems: "center", gap: 3, fontSize: 10, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: sortBy === k ? C.teal : "#9ca3af" }}>{children}<ChevronsUpDown size={10} style={{ opacity: sortBy === k ? 1 : 0.25 }} /></button>;

  const grid = "minmax(0, 2fr) minmax(0, 1.3fr) minmax(0, 1fr) 72px 80px 60px 72px 84px";
  const closeDrop = () => { setTierDrop(false); setTrustDrop(false); };

  return (
    <div style={{ fontFamily: "'Lato', sans-serif", background: C.bg, color: C.navy, minHeight: "100vh" }} onClick={closeDrop}>
      <div style={{ maxWidth: 1320, margin: "0 auto", background: C.white, minHeight: "100vh", boxShadow: "0 0 40px rgba(0,38,49,0.04)" }}>
      <link href="https://fonts.googleapis.com/css2?family=Lato:ital,wght@0,300;0,400;0,700;0,900;1,400&display=swap" rel="stylesheet" />
      <style>{`
        @keyframes spin{to{transform:rotate(360deg)}}
        .rr:hover{background:#f8fafa !important}
        ::selection{background:#b1e4e3}
        .tip{position:relative}
        .tip .tip-text{visibility:hidden;opacity:0;position:absolute;bottom:calc(100% + 8px);left:50%;transform:translateX(-50%);background:#002631;color:#e2e8f0;font-size:11px;font-weight:400;line-height:1.5;padding:6px 10px;border-radius:5px;white-space:normal;width:max-content;max-width:220px;z-index:999;pointer-events:none;transition:opacity 0.15s,visibility 0.15s;box-shadow:0 4px 12px rgba(0,38,49,0.15);letter-spacing:0;text-transform:none;font-style:normal}
        .tip .tip-text::after{content:'';position:absolute;top:100%;left:50%;transform:translateX(-50%);border:5px solid transparent;border-top-color:#002631}
        .tip:hover .tip-text{visibility:visible;opacity:1}
        .tip-left .tip-text{left:0 !important;right:auto !important;transform:none !important}
        .tip-left .tip-text::after{left:12px !important;transform:none !important}
        .tip-right .tip-text{left:auto !important;right:0 !important;transform:none !important}
        .tip-right .tip-text::after{left:auto !important;right:12px !important;transform:none !important}
        @keyframes toastIn{0%{opacity:0;transform:translateY(6px)}100%{opacity:1;transform:translateY(0)}}
        @keyframes toastOut{0%{opacity:1}100%{opacity:0}}
        .toast{position:fixed;bottom:24px;left:50%;transform:translateX(-50%);background:#002631;color:#fff;font-size:12px;font-weight:700;padding:8px 16px;border-radius:6px;z-index:999;box-shadow:0 4px 16px rgba(0,38,49,0.18);animation:toastIn 0.2s ease,toastOut 0.3s ease 1.2s forwards;pointer-events:none;display:flex;align-items:center;gap:6px}
      `}</style>

      <div style={{ height: 3, background: `linear-gradient(90deg, ${C.teal}, #2CCCD3, #84BD00, ${C.green})` }} />

      {/* header */}
      <header style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 32px", height: 64, borderBottom: `1px solid ${C.rule}`, background: C.white, position: "sticky", top: 0, zIndex: 50 }}>
        <div style={{ display: "flex", alignItems: "baseline", gap: 12 }}>
          <span style={{ fontWeight: 900, fontSize: 22, color: C.navy, letterSpacing: "-0.02em" }}>Foundant's Freelancer & Agency Roster</span>
          <span style={{ fontSize: 14, color: "#b0b5b4", fontWeight: 400, letterSpacing: "0.01em" }}>Internal directory of our multimedia & creative partners</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          {[["browse", LayoutGrid, "Browse"], ["ai", Sparkles, "Recommend"]].map(([m, Icon, lbl]) => (
            <button key={m} onClick={() => { setMode(m); if (m === "browse") setAiMessages([]); }}
              style={{ display: "flex", alignItems: "center", gap: 6, padding: "7px 16px", fontSize: 13, fontWeight: 700, borderRadius: 5, border: `1px solid ${C.rule}`, cursor: "pointer", background: mode === m ? C.navy : C.white, color: mode === m ? "#fff" : C.body, transition: "all 0.15s" }}><Icon size={14} />{lbl}</button>
          ))}
          <div style={{ width: 1, height: 22, background: C.rule, margin: "0 6px" }} />
          <button onClick={e => { e.stopPropagation(); setShowInfo(true); }} style={{ display: "flex", alignItems: "center", padding: 8, borderRadius: 5, border: `1px solid ${C.rule}`, cursor: "pointer", background: C.white, color: "#9ca3af" }} title="Field reference"><HelpCircle size={16} /></button>
        </div>
      </header>

      {/* ═══ INFO MODAL ═══ */}
      {showInfo && (
        <div style={{ position: "fixed", inset: 0, zIndex: 200, display: "flex", alignItems: "center", justifyContent: "center" }} onClick={() => setShowInfo(false)}>
          <div style={{ position: "absolute", inset: 0, background: "rgba(0,38,49,0.2)", backdropFilter: "blur(2px)" }} />
          <div onClick={e => e.stopPropagation()} style={{ position: "relative", background: C.white, borderRadius: 10, maxWidth: 480, width: "90%", maxHeight: "80vh", overflow: "auto", padding: "28px 32px", boxShadow: "0 20px 60px rgba(0,38,49,0.1)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
              <h2 style={{ fontWeight: 900, fontSize: 16, color: C.navy }}>About This Tool</h2>
              <button onClick={() => setShowInfo(false)} style={{ all: "unset", cursor: "pointer", color: "#9ca3af" }}><X size={16} /></button>
            </div>
            <div style={{ marginBottom: 24, paddingBottom: 20, borderBottom: `1px solid ${C.rule}` }}>
              <p style={{ fontSize: 13, color: C.body, lineHeight: 1.7, marginBottom: 10 }}>This is your go-to directory for finding the right freelancer or agency for a project. Browse by category, filter by skill, or use the AI recommender to describe what you need and get a ranked match.</p>
              <p style={{ fontSize: 12, color: "#9ca3af", lineHeight: 1.65 }}><strong style={{ color: C.body }}>Getting the most out of it:</strong> Start with a category tab to narrow by discipline, then scan "Best At" to find the right specialty. Check "In System" before reaching out — if they're already approved, you can skip vendor onboarding. Use Recommend when you have a specific brief.</p>
            </div>
            <h3 style={{ fontWeight: 900, fontSize: 14, color: C.navy, marginBottom: 16 }}>Field Reference</h3>
            <IS t="Tier — Quality & Capability">{Object.entries(TIER).map(([k, v]) => <IR key={k}><TierBadge tier={k} /><span>{v.desc}</span></IR>)}</IS>
            <IS t="Trust — Relationship Status">{Object.entries(TRUST).map(([k, v]) => <IR key={k}><TrustBadge trust={k} /><span>{v.desc}</span></IR>)}</IS>
            <IS t="Price — Relative Cost">{Object.entries(PRICE_DESC).map(([k, v]) => <IR key={k}><span style={{ fontWeight: 900, color: C.navy, minWidth: 36 }}>{"$".repeat(Number(k))}</span><span>{v}</span></IR>)}</IS>
            <IS t="Speed — Project Delivery Pace">{Object.entries(SPEED).map(([k, v]) => <IR key={k}><SpeedBadge level={k} /><span>{v.desc}</span></IR>)}</IS>
            <IS t="Responsiveness — Communication (in Details)">
              <IR><span style={{ fontSize: 10, fontWeight: 700, color: "#059669", minWidth: 100 }}>Very responsive</span><span>Quick to reply, easy to get ahold of.</span></IR>
              <IR><span style={{ fontSize: 10, fontWeight: 700, color: "#d97706", minWidth: 100 }}>Slower comms</span><span>May need follow-ups. Plan for lag time.</span></IR>
            </IS>
            <IS t="In System — Vendor Onboarding" last>
              <p style={{ fontSize: 12, color: "#53565A", lineHeight: 1.6 }}><strong style={{ color: "#059669" }}>Approved</strong> = Cleared by risk/compliance, bank info on file — ready to engage.<br /><br /><strong style={{ color: "#b0b5b4" }}>Needs setup</strong> = Still needs compliance review and payment setup.</p>
            </IS>
            <div style={{ marginTop: 24, paddingTop: 18, borderTop: `1px solid ${C.rule}`, fontSize: 12, color: "#9ca3af", lineHeight: 1.6 }}>
              Questions, corrections, or have someone to add to this directory?<br />
              Reach out to <a href="mailto:logan.colegrove@foundant.com" style={{ color: C.teal, fontWeight: 700, textDecoration: "none" }}>logan.colegrove@foundant.com</a>
            </div>
          </div>
        </div>
      )}

      {/* ═══ BROWSE ═══ */}
      {mode === "browse" && (
        <>
          {/* category tabs */}
          <div style={{ display: "flex", alignItems: "center", gap: 0, padding: "0 24px", borderBottom: `1px solid ${C.rule}` }}>
            {CATS.map(({ key, label, icon: Icon }) => (
              <button key={key} onClick={() => setCategory(key)}
                style={{ display: "flex", alignItems: "center", gap: 6, padding: "13px 20px", fontSize: 14, fontWeight: 700, color: category === key ? C.teal : "#9ca3af", background: "none", border: "none", borderBottom: category === key ? `2px solid ${C.teal}` : "2px solid transparent", cursor: "pointer", marginBottom: -1 }}><Icon size={16} />{label}</button>
            ))}
            <div style={{ flex: 1 }} />
            <span style={{ fontSize: 11, color: "#9ca3af" }}>{filtered.length}<span style={{ color: "#d4d8d7" }}> / {roster.length}</span></span>
          </div>

          {/* toolbar */}
          <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: 8, padding: "8px 24px", borderBottom: `1px solid ${C.rule}`, background: C.bg }}>
            <div style={{ position: "relative", flex: "1 1 180px", maxWidth: 280 }}>
              <Search size={13} style={{ position: "absolute", left: 9, top: "50%", transform: "translateY(-50%)", color: "#9ca3af" }} />
              <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search name, email, location, skills…"
                style={{ width: "100%", padding: "6px 10px 6px 30px", border: `1px solid ${C.rule}`, borderRadius: 5, fontSize: 12, color: C.navy, background: C.white, outline: "none" }} />
              {search && <button onClick={() => setSearch("")} style={{ all: "unset", cursor: "pointer", position: "absolute", right: 7, top: "50%", transform: "translateY(-50%)", color: "#9ca3af" }}><X size={12} /></button>}
            </div>
            {hasFilters && <button onClick={clearAll} style={{ all: "unset", cursor: "pointer", display: "flex", alignItems: "center", gap: 3, fontSize: 10, fontWeight: 700, color: "#dc2626" }}><XCircle size={11} />Clear filters</button>}
            <button onClick={() => setStarOnly(!starOnly)}
              style={{ marginLeft: "auto", fontSize: 11, fontWeight: 700, padding: "5px 10px", borderRadius: 4, border: `1px solid ${starOnly ? "#059669" : C.rule}`, cursor: "pointer", background: starOnly ? "#ecfdf5" : C.white, color: starOnly ? "#059669" : "#9ca3af", display: "flex", alignItems: "center", gap: 4, transition: "all 0.12s" }}>
              <Star size={12} fill={starOnly ? "#059669" : "none"} color={starOnly ? "#059669" : "currentColor"} />Superstars only
            </button>
            <button onClick={() => setShowSkills(!showSkills)}
              style={{ fontSize: 11, fontWeight: 600, padding: "5px 10px", borderRadius: 4, border: `1px solid ${showSkills ? C.teal : C.rule}`, cursor: "pointer", background: showSkills ? "#ecfafa" : C.white, color: showSkills ? C.teal : C.body, display: "flex", alignItems: "center", gap: 4 }}>
              Skills & Tools {activeCount > 0 && <span style={{ background: C.teal, color: "#fff", fontSize: 9, fontWeight: 900, padding: "1px 5px", borderRadius: 99 }}>{activeCount}</span>}
              <ChevronDown size={10} />
            </button>
          </div>

          {/* ── GROUPED SKILLS PANEL ────────────────────── */}
          {showSkills && (
            <div style={{ borderBottom: `1px solid ${C.rule}`, background: C.white }}>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: 0 }}>
                {SKILL_GROUPS.map(group => (
                  <div key={group.label} style={{ padding: "14px 20px", borderRight: `1px solid ${C.rule}`, borderBottom: `1px solid ${C.rule}` }}>
                    <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: "#9ca3af", marginBottom: 8 }}>{group.label}</div>
                    <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
                      {group.skills.map(sk => {
                        const on = activeSkills.includes(sk);
                        const exists = roster.some(r => r.skills.includes(sk));
                        if (!exists) return null;
                        return (
                          <button key={sk} onClick={() => toggleSkill(sk)}
                            style={{ all: "unset", cursor: "pointer", display: "flex", alignItems: "center", gap: 6, padding: "4px 6px", borderRadius: 4, fontSize: 12, color: on ? C.teal : C.body, fontWeight: on ? 700 : 400, background: on ? "#ecfafa" : "transparent", transition: "all 0.1s" }}>
                            <span style={{ width: 14, height: 14, borderRadius: 3, border: `1.5px solid ${on ? C.teal : "#d4d8d7"}`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, background: on ? C.teal : "transparent", transition: "all 0.1s" }}>
                              {on && <Check size={9} color="#fff" strokeWidth={3} />}
                            </span>
                            {sk}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
              {activeCount > 0 && (
                <div style={{ padding: "8px 20px", borderTop: `1px solid ${C.rule}`, background: C.bg, display: "flex", alignItems: "center", gap: 6 }}>
                  <span style={{ fontSize: 11, color: "#9ca3af" }}>{activeCount} filter{activeCount > 1 ? "s" : ""} active</span>
                  <button onClick={() => setActiveSkills([])} style={{ all: "unset", cursor: "pointer", fontSize: 11, fontWeight: 700, color: "#dc2626", display: "flex", alignItems: "center", gap: 3 }}><XCircle size={11} />Clear skills</button>
                </div>
              )}
            </div>
          )}

          {/* table header */}
          <div style={{ display: "grid", gridTemplateColumns: grid, padding: "10px 32px", borderBottom: `2px solid ${C.rule}`, background: C.bg, position: "sticky", top: 64, zIndex: 40, alignItems: "center" }}>
            <ThBtn k="name">Name</ThBtn>
            <span style={{ fontSize: 12, fontWeight: 700, letterSpacing: "0.1em", color: "#9ca3af" }}>EMAIL</span>
            <span style={{ fontSize: 12, fontWeight: 700, letterSpacing: "0.1em", color: "#9ca3af" }}>BEST AT</span>
            <div onClick={e => e.stopPropagation()}><FilterHeader label="Tier" tooltip="Overall quality and capability level" options={TIER} activeValue={tierFilter} onSelect={setTierFilter} isOpen={tierDrop} onToggle={() => { setTierDrop(!tierDrop); setTrustDrop(false); }} /></div>
            <div onClick={e => e.stopPropagation()}><FilterHeader label="Trust" tooltip="How established our working relationship is" options={TRUST} activeValue={trustFilter} onSelect={setTrustFilter} isOpen={trustDrop} onToggle={() => { setTrustDrop(!trustDrop); setTierDrop(false); }} /></div>
            <ThBtn k="price">Price</ThBtn>
            <Tip text="How quickly they typically deliver projects"><span style={{ fontSize: 12, fontWeight: 700, letterSpacing: "0.1em", color: "#9ca3af", cursor: "help" }}>SPEED</span></Tip>
            <span className="tip tip-right" style={{ position: "relative", display: "inline-flex" }}><span style={{ fontSize: 12, fontWeight: 700, letterSpacing: "0.1em", color: "#9ca3af", cursor: "help" }}>IN SYSTEM</span><span className="tip-text">Cleared by risk/compliance with bank info on file</span></span>
          </div>

          {/* rows */}
          {filtered.map(p => (
            <div key={p.id} className="rr" style={{ display: "grid", gridTemplateColumns: grid, padding: "14px 32px", borderBottom: "1px solid #f4f5f4", background: C.white, alignItems: "start", transition: "background 0.1s" }}>
              <div style={{ minWidth: 0 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 3 }}>
                  {p.star && <span className="tip tip-left" style={{ position: "relative", display: "inline-flex" }}><Star size={14} fill="#059669" color="#059669" style={{ flexShrink: 0, cursor: "help" }} /><span className="tip-text">Superstar — Top recommendation based on quality, value, and ease of working together.</span></span>}
                  <a href={p.website} target="_blank" rel="noopener noreferrer" style={{ fontWeight: 900, fontSize: 15, color: C.navy, textDecoration: "none", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", display: "flex", alignItems: "center", gap: 5 }}>{p.name}<ExternalLink size={12} style={{ color: "#d4d8d7", flexShrink: 0 }} /></a>
                </div>
                <div style={{ fontSize: 13, color: "#9ca3af", marginBottom: 5 }}>{p.location}</div>
                <button onClick={() => toggleRow(p.id)} style={{ all: "unset", cursor: "pointer", fontSize: 12, color: "#9ca3af", display: "flex", alignItems: "center", gap: 3 }}>
                  {expandedRows[p.id] ? <ChevronUp size={12} /> : <ChevronDown size={12} />}Details
                </button>
                {expandedRows[p.id] && (
                  <div style={{ marginTop: 6 }}>
                    {p.responsiveness !== "neutral" && <div style={{ marginBottom: 8 }}>
                      {p.responsiveness === "very"
                        ? <span style={{ fontSize: 10, fontWeight: 700, color: "#059669", background: "#ecfdf5", padding: "2px 8px", borderRadius: 3, display: "inline-flex", alignItems: "center", gap: 3 }}><MessageCircle size={10} />Very responsive</span>
                        : <span style={{ fontSize: 10, fontWeight: 700, color: "#d97706", background: "#fef9ec", padding: "2px 8px", borderRadius: 3, display: "inline-flex", alignItems: "center", gap: 3 }}><MessageCircle size={10} />Slower comms</span>}
                    </div>}
                    {p.notes && (
                      <div style={{ marginBottom: 8 }}>
                        <div style={{ fontSize: 9, fontWeight: 700, letterSpacing: "0.1em", color: "#b0b5b4", marginBottom: 3, textTransform: "uppercase" }}>Notes</div>
                        <p style={{ fontSize: 11, fontStyle: "italic", color: "#9ca3af", paddingLeft: 8, borderLeft: `2px solid ${C.rule}`, lineHeight: 1.55 }}>{p.notes}</p>
                      </div>
                    )}
                    <div>
                      <div style={{ fontSize: 9, fontWeight: 700, letterSpacing: "0.1em", color: "#b0b5b4", marginBottom: 4, textTransform: "uppercase" }}>Skills & Tools</div>
                      <div style={{ display: "flex", flexWrap: "wrap", gap: 3 }}>
                        {p.skills.map(s => <span key={s} style={{ fontSize: 10, padding: "1px 6px", borderRadius: 3, background: "#f4f5f4", color: "#71717a" }}>{s}</span>)}
                      </div>
                    </div>
                  </div>
                )}
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 5, paddingTop: 1, minWidth: 0 }}>
                <span style={{ fontSize: 14, color: C.navy, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{p.email}</span>
                <button onClick={() => copyEmail(p.id, p.email)} style={{ all: "unset", cursor: "pointer", flexShrink: 0, display: "flex", alignItems: "center", padding: 2, borderRadius: 3, color: copiedId === p.id ? "#059669" : "#c8cecd", transition: "color 0.15s" }}>{copiedId === p.id ? <Check size={14} /> : <Copy size={14} />}</button>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 4, paddingTop: 2, paddingLeft: 4 }}>{p.bestAt.map(b => <span key={b} style={{ fontSize: 13, fontWeight: 700, color: C.body, lineHeight: 1.3 }}>{b}</span>)}</div>
              <div><TierBadge tier={p.tier} /></div>
              <div><TrustBadge trust={p.trust} /></div>
              <div><Price level={p.price} /></div>
              <div><SpeedBadge level={p.speed} /></div>
              <div>{p.approvedVendor
                ? <span className="tip tip-right" style={{ position: "relative", display: "inline-flex" }}><span style={{ fontSize: 12, fontWeight: 700, color: "#059669", display: "flex", alignItems: "center", gap: 3, cursor: "help" }}><Check size={12} />Approved</span><span className="tip-text">Cleared by risk/compliance, bank info on file — ready to engage</span></span>
                : <span className="tip tip-right" style={{ position: "relative", display: "inline-flex" }}><span style={{ fontSize: 12, color: "#b0b5b4", cursor: "help" }}>Needs setup</span><span className="tip-text">Still needs compliance review and payment setup</span></span>}</div>
            </div>
          ))}
          {filtered.length === 0 && <div style={{ textAlign: "center", padding: "52px 20px" }}><p style={{ fontSize: 13, color: "#9ca3af" }}>No results match your filters.</p><button onClick={clearAll} style={{ all: "unset", cursor: "pointer", fontSize: 12, color: C.teal, marginTop: 8, textDecoration: "underline" }}>Clear all</button></div>}
        </>
      )}

      {/* ═══ AI MODE ═══ */}
      {mode === "ai" && (
        <div style={{ maxWidth: 620, margin: "0 auto", padding: aiMessages.length ? "24px 24px 130px" : "0 24px", minHeight: "calc(100vh - 60px)", display: "flex", flexDirection: "column" }}>

          {aiMessages.length === 0 ? (
            /* ── EMPTY STATE: centered input + quick prompts ── */
            <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "40px 0" }}>
              <Sparkles size={22} style={{ color: C.teal, marginBottom: 10 }} />
              <h2 style={{ fontWeight: 900, fontSize: 20, color: C.navy, marginBottom: 6 }}>What are you working on?</h2>
              <p style={{ fontSize: 13, color: "#9ca3af", lineHeight: 1.6, maxWidth: 440, textAlign: "center", marginBottom: 24 }}>
                Tell us about your project and we’ll recommend the best freelancer or agency from our roster — with reasoning, pricing, and contact info.
              </p>

              <div style={{ width: "100%", maxWidth: 480, marginBottom: 24 }}>
                <div style={{ position: "relative", borderRadius: 8 }}>
                  <textarea value={aiPrompt} onChange={e => setAiPrompt(e.target.value)} rows={3}
                    placeholder={"e.g. I need an animated Google display ad designed in the next two weeks"}
                    onKeyDown={e => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); submitAI(); } }}
                    style={{ width: "100%", padding: "14px 16px", paddingRight: 90, border: `1px solid ${C.rule}`, borderRadius: 8, fontSize: 14, color: C.navy, resize: "none", lineHeight: 1.55, background: C.white, outline: "none", fontFamily: "'Lato', sans-serif", boxShadow: "0 2px 8px rgba(0,38,49,0.04)" }} />
                  <div style={{ position: "absolute", bottom: 10, right: 12, display: "flex", gap: 4 }}>
                    <button onClick={toggleVoice} style={{ padding: 6, borderRadius: 5, border: `1px solid ${C.rule}`, cursor: "pointer", background: isListening ? "#fef2f2" : C.white, color: isListening ? "#dc2626" : "#9ca3af", display: "flex", alignItems: "center" }}>{isListening ? <MicOff size={14} /> : <Mic size={14} />}</button>
                    <button onClick={submitAI} disabled={aiLoading || !aiPrompt.trim()}
                      style={{ padding: "6px 14px", borderRadius: 5, border: "none", cursor: aiPrompt.trim() && !aiLoading ? "pointer" : "not-allowed", background: aiPrompt.trim() && !aiLoading ? C.teal : "#e0e4e3", color: "#fff", display: "flex", alignItems: "center", gap: 5, fontSize: 12, fontWeight: 700 }}>
                      {aiLoading ? <span style={{ width: 13, height: 13, border: "2px solid rgba(255,255,255,0.3)", borderTopColor: "#fff", borderRadius: 99, display: "inline-block", animation: "spin 0.6s linear infinite" }} /> : <Send size={13} />}
                    </button>
                  </div>
                </div>
                {aiError && <div style={{ marginTop: 8, padding: "6px 10px", borderRadius: 5, background: "#fef2f2", border: "1px solid #fecaca", fontSize: 11, color: "#991b1b" }}><AlertCircle size={11} style={{ display: "inline", verticalAlign: -1, marginRight: 4 }} />{aiError}</div>}
              </div>

              {/* quick-start prompts — 2 column grid */}
              <div style={{ width: "100%", maxWidth: 480 }}>
                <p style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "#b0b5b4", marginBottom: 10, textAlign: "center" }}>Or pick a starting point</p>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 6 }}>
                  {[
                    { icon: Video, text: "Testimonial video" },
                    { icon: Wand2, text: "Webinar clips or editing" },
                    { icon: Palette, text: "Google display ad" },
                    { icon: Camera, text: "Event or headshot photography" },
                    { icon: LayoutGrid, text: "Signage & backdrop design" },
                    { icon: ExternalLink, text: "Blog post template" },
                    { icon: Sparkles, text: "Thumbnail design" },
                    { icon: HelpCircle, text: "PowerPoint deck design" },
                    { icon: Search, text: "Something else" },
                  ].map(({ icon: Icon, text }) => (
                    <button key={text} onClick={() => { setAiPrompt(text === "Something else" ? "" : "I need " + text.toLowerCase()); if (text === "Something else") document.querySelector("textarea")?.focus(); }}
                      style={{ all: "unset", cursor: "pointer", fontSize: 12, padding: "10px 12px", borderRadius: 6, border: `1px solid ${C.rule}`, color: C.body, background: C.white, lineHeight: 1.4, transition: "all 0.12s", display: "flex", alignItems: "center", gap: 8 }}
                      onMouseEnter={e => { e.currentTarget.style.borderColor = C.teal; e.currentTarget.style.background = "#f8fafa"; }}
                      onMouseLeave={e => { e.currentTarget.style.borderColor = C.rule; e.currentTarget.style.background = C.white; }}>
                      <Icon size={14} style={{ color: "#9ca3af", flexShrink: 0 }} />
                      <span>{text}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            /* ── CONVERSATION ── */
            <>
              <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 12, marginBottom: 16 }}>
                {aiMessages.map((msg, i) => (
                  <div key={i}>
                    {msg.role === "user" ? (
                      <div style={{ display: "flex", justifyContent: "flex-end" }}>
                        <div style={{ background: C.navy, color: "#e2e8f0", fontSize: 13, padding: "10px 14px", borderRadius: "12px 12px 2px 12px", maxWidth: "85%", lineHeight: 1.55 }}>{msg.content}</div>
                      </div>
                    ) : msg.recommendations ? (
                      <div>
                        {msg.extraText && (
                          <div style={{ display: "flex", justifyContent: "flex-start", marginBottom: 10 }}>
                            <div style={{ background: C.bg, color: C.body, fontSize: 13, padding: "10px 14px", borderRadius: "12px 12px 12px 2px", maxWidth: "85%", lineHeight: 1.6, border: `1px solid ${C.rule}` }}>{msg.extraText}</div>
                          </div>
                        )}
                        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                          {msg.recommendations.map((rec, j) => {
                            const m = roster.find(r => r.name.toLowerCase() === rec.name?.toLowerCase());
                            const recKey = `${i}-${j}`;
                            const isExpanded = expandedRecs[recKey];
                            return (
                              <div key={j} style={{ padding: "16px 18px", borderRadius: 6, border: `1px solid ${C.rule}`, background: C.bg }}>
                                {/* name row */}
                                <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 6 }}>
                                  <span style={{ width: 22, height: 22, borderRadius: 99, background: "#ecfafa", color: C.teal, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 900, flexShrink: 0 }}>{j + 1}</span>
                                  {m?.star && <Tip text="Superstar — Top recommendation based on quality, value, and ease of working together."><Star size={14} fill="#059669" color="#059669" style={{ flexShrink: 0, cursor: "help" }} /></Tip>}
                                  <a href={m?.website} target="_blank" rel="noopener noreferrer" style={{ fontWeight: 900, fontSize: 16, color: C.navy, textDecoration: "none", display: "flex", alignItems: "center", gap: 4 }}>
                                    {rec.name}<ExternalLink size={11} style={{ color: "#d4d8d7" }} />
                                  </a>
                                </div>
                                {/* badges row */}
                                {m && <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 8, flexWrap: "wrap" }}>
                                  <TierBadge tier={m.tier} /><TrustBadge trust={m.trust} />
                                  <span style={{ width: 1, height: 12, background: C.rule }} />
                                  <Price level={m.price} /><SpeedBadge level={m.speed} />
                                  <span style={{ width: 1, height: 12, background: C.rule }} />
                                  {m.approvedVendor
                                    ? <span style={{ fontSize: 12, fontWeight: 700, color: "#059669", display: "inline-flex", alignItems: "center", gap: 3 }}><Check size={12} />Approved</span>
                                    : <span style={{ fontSize: 12, color: "#b0b5b4" }}>Needs setup</span>}
                                </div>}
                                {/* email */}
                                {m && <div style={{ display: "flex", alignItems: "center", gap: 5, marginBottom: 10 }}>
                                  <span style={{ fontSize: 13, color: C.navy }}>{m.email}</span>
                                  <button onClick={() => copyEmail(m.id, m.email)} style={{ all: "unset", cursor: "pointer", color: copiedId === m.id ? "#059669" : "#c8cecd" }}>{copiedId === m.id ? <Check size={13} /> : <Copy size={13} />}</button>
                                </div>}
                                {/* AI reasoning — the star of the card */}
                                <p style={{ fontSize: 14, color: C.body, lineHeight: 1.65, marginBottom: rec.caveats ? 8 : 0 }}>{rec.reasoning}</p>
                                {rec.caveats && <p style={{ fontSize: 12, fontStyle: "italic", color: "#9ca3af", paddingLeft: 8, borderLeft: `2px solid ${C.rule}`, marginBottom: 0 }}>⚠ {rec.caveats}</p>}
                                {/* expandable details */}
                                {m && <div style={{ marginTop: 10, borderTop: `1px solid ${C.rule}`, paddingTop: 8 }}>
                                  <button onClick={() => setExpandedRecs(p => ({ ...p, [recKey]: !p[recKey] }))} style={{ all: "unset", cursor: "pointer", fontSize: 12, color: "#9ca3af", display: "flex", alignItems: "center", gap: 3 }}>
                                    {isExpanded ? <ChevronUp size={12} /> : <ChevronDown size={12} />}Skills & details
                                  </button>
                                  {isExpanded && <div style={{ display: "flex", flexWrap: "wrap", gap: 3, marginTop: 8 }}>
                                    {m.skills.map(s => <span key={s} style={{ fontSize: 11, padding: "2px 7px", borderRadius: 3, background: "#eef0ef", color: "#71717a" }}>{s}</span>)}
                                    {m.notes && <p style={{ fontSize: 12, fontStyle: "italic", color: "#9ca3af", lineHeight: 1.5, marginTop: 6, paddingLeft: 8, borderLeft: `2px solid ${C.rule}`, width: "100%" }}>{m.notes}</p>}
                                  </div>}
                                </div>}
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    ) : (
                      <div style={{ display: "flex", justifyContent: "flex-start" }}>
                        <div style={{ background: C.bg, color: C.body, fontSize: 13, padding: "10px 14px", borderRadius: "12px 12px 12px 2px", maxWidth: "85%", lineHeight: 1.6, border: `1px solid ${C.rule}` }}>{msg.content}</div>
                      </div>
                    )}
                  </div>
                ))}
                {aiLoading && (
                  <div style={{ display: "flex", justifyContent: "flex-start" }}>
                    <div style={{ background: C.bg, padding: "10px 14px", borderRadius: "12px 12px 12px 2px", border: `1px solid ${C.rule}`, display: "flex", alignItems: "center", gap: 6, fontSize: 12, color: "#9ca3af" }}>
                      <span style={{ width: 13, height: 13, border: "2px solid #dde3e2", borderTopColor: C.teal, borderRadius: 99, display: "inline-block", animation: "spin 0.6s linear infinite" }} />Thinking…
                    </div>
                  </div>
                )}
              </div>

              <div style={{ position: "fixed", bottom: 0, left: 0, right: 0, background: C.white, borderTop: `1px solid ${C.rule}`, padding: "10px 24px 8px", zIndex: 50 }}>
                <div style={{ maxWidth: 620, margin: "0 auto" }}>
                  <div style={{ position: "relative", borderRadius: 6 }}>
                    <textarea value={aiPrompt} onChange={e => setAiPrompt(e.target.value)} rows={1}
                      placeholder="Reply or add more details…"
                      onKeyDown={e => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); submitAI(); } }}
                      style={{ width: "100%", padding: "10px 14px", paddingRight: 56, border: `1px solid ${C.rule}`, borderRadius: 6, fontSize: 13, color: C.navy, resize: "none", lineHeight: 1.5, background: C.bg, outline: "none", fontFamily: "'Lato', sans-serif" }} />
                    <div style={{ position: "absolute", bottom: 7, right: 10, display: "flex", gap: 4 }}>
                      <button onClick={submitAI} disabled={aiLoading || !aiPrompt.trim()}
                        style={{ padding: "5px 10px", borderRadius: 4, border: "none", cursor: aiPrompt.trim() && !aiLoading ? "pointer" : "not-allowed", background: aiPrompt.trim() && !aiLoading ? C.teal : "#e0e4e3", color: "#fff", display: "flex", alignItems: "center" }}><Send size={13} /></button>
                    </div>
                  </div>
                  {aiError && <div style={{ marginTop: 4, padding: "5px 10px", borderRadius: 5, background: "#fef2f2", border: "1px solid #fecaca", fontSize: 11, color: "#991b1b" }}><AlertCircle size={11} style={{ display: "inline", verticalAlign: -1, marginRight: 4 }} />{aiError}</div>}
                  <div style={{ display: "flex", justifyContent: "center", gap: 12, marginTop: 5 }}>
                    <button onClick={() => { setAiMessages([]); setAiPrompt(""); }} style={{ all: "unset", cursor: "pointer", fontSize: 10, color: "#9ca3af", display: "flex", alignItems: "center", gap: 3 }}><ArrowLeft size={10} />Start over</button>
                    <button onClick={() => { setMode("browse"); setAiMessages([]); }} style={{ all: "unset", cursor: "pointer", fontSize: 10, color: C.teal, display: "flex", alignItems: "center", gap: 3 }}><LayoutGrid size={10} />Browse roster</button>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      )}

      {showToast && <div className="toast"><Check size={12} />Email copied</div>}
      </div>
    </div>
  );
}

function IS({ t, children, last }) { return <div style={{ marginBottom: last ? 0 : 20 }}><h3 style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "#007377", marginBottom: 8 }}>{t}</h3>{children}</div>; }
function IR({ children }) { return <div style={{ display: "flex", alignItems: "baseline", gap: 8, marginBottom: 5, fontSize: 12, color: "#53565A", lineHeight: 1.5 }}>{children}</div>; }
