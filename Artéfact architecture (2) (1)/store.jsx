// ===========================================================================
// CENTRAL STORE — Single Source of Truth for Artéfact
// ===========================================================================
// All app data, sites, users, roles, scoring weights, heatmap categories and
// audit log live here. Every view in the app reads from this store via the
// useStore() hook. Mutations go through the typed action functions which
// (a) update React state, (b) persist to localStorage, (c) write to the audit
// log. There are no hard-coded application records anywhere else.
// ===========================================================================

const { createContext, useContext, useState, useEffect, useMemo, useCallback, useRef } = React;

const STORAGE_KEY = "asmpt_artefact_store_v5";
const SCHEMA_VERSION = 5;

// ─── Shared storage helper ──────────────────────────────────────────────────
// Wraps Claude artifact `window.storage` (shared:true so any user opening the
// artefact reads/writes the same keys). If unavailable (preview/dev), falls
// back to a localStorage-prefixed namespace so the same code path works.
const SHARED_AVAILABLE = typeof window !== "undefined" && !!window.storage;
const sharedStore = {
  available: SHARED_AVAILABLE,
  async set(key, value) {
    const json = typeof value === "string" ? value : JSON.stringify(value);
    if (SHARED_AVAILABLE) {
      try { await window.storage.set(key, json, true); return true; }
      catch (e) { console.warn("shared set failed", key, e); /* fall through */ }
    }
    try { localStorage.setItem("shared:" + key, json); return true; } catch { return false; }
  },
  async get(key) {
    if (SHARED_AVAILABLE) {
      try {
        const v = await window.storage.get(key, true);
        if (v == null) return null;
        try { return JSON.parse(v); } catch { return v; }
      } catch (e) { console.warn("shared get failed", key, e); }
    }
    try {
      const v = localStorage.getItem("shared:" + key);
      if (v == null) return null;
      try { return JSON.parse(v); } catch { return v; }
    } catch { return null; }
  },
  async delete(key) {
    if (SHARED_AVAILABLE) {
      try { if (window.storage.delete) await window.storage.delete(key, true); }
      catch (e) { console.warn("shared delete failed", key, e); }
    }
    try { localStorage.removeItem("shared:" + key); } catch {}
  },
};
// Index of questionnaires that exist in shared storage. Each entry: { id, updated_at }.
const SHARED_INDEX_KEY = "questionnaire-index";
const sharedKey = {
  q:        id => `questionnaire:${id}`,
  resp:     id => `responses:${id}`,
};

// ─── Default reference data ──────────────────────────────────────────────────
const DEFAULT_SITES = [
  { id: "MUC", name: "Munich",     region: "DE", color: "#1e40af" },
  { id: "UK",  name: "United Kingdom", region: "GB", color: "#dc2626" },
  { id: "SGP", name: "Singapore",  region: "SG", color: "#0f766e" },
  { id: "MAL", name: "Malaysia",   region: "MY", color: "#7e22ce" },
];
const SCOR_DOMAIN_DEFS = [
  { id: "PLAN",    label: "Plan",    desc: "Demand, supply, capacity planning", color: "#2563eb" },
  { id: "SOURCE",  label: "Source",  desc: "Procurement, supplier management", color: "#0891b2" },
  { id: "MAKE",    label: "Make",    desc: "Production, manufacturing, quality", color: "#dc2626" },
  { id: "DELIVER", label: "Deliver", desc: "Order, warehouse, transport, delivery", color: "#16a34a" },
  { id: "RETURN",  label: "Return",  desc: "Reverse logistics, RMA", color: "#ca8a04" },
  { id: "ENABLE",  label: "Enable",  desc: "IT, HR, Finance, governance", color: "#7c3aed" },
];
const EA_LAYERS = ["Business", "Application", "Data", "Technology"];
const DEFAULT_USERS = [
  { id: "u1", name: "Feuerecker, Manuela", email: "manuela.feuerecker@asmpt.com", role: "Admin", sites: ["MUC","UK","SGP","MAL"], active: true },
  { id: "u2", name: "Gantz, Matthias",     email: "matthias.gantz@asmpt.com",     role: "Editor", sites: ["MUC"], active: true },
  { id: "u3", name: "Bliem, Thomas",       email: "thomas.bliem@asmpt.com",       role: "Editor", sites: ["MUC","SGP"], active: true },
  { id: "u4", name: "Viewer, Read-only",   email: "viewer@asmpt.com",             role: "Viewer", sites: ["MUC"], active: true },
];
const DEFAULT_HEATMAP_CATEGORIES = [
  { id: "quick_win", label: "Quick Win", color: "#16a34a", desc: "High value, low effort" },
  { id: "strategic", label: "Strategic", color: "#2563eb", desc: "High value, high effort" },
  { id: "low_prio",  label: "Low Priority", color: "#94a3b8", desc: "Low value, low effort" },
  { id: "avoid",     label: "Avoid",     color: "#dc2626", desc: "Low value, high effort" },
];
const DEFAULT_BVA_WEIGHTS = { business: 0.35, cost: 0.20, risk: 0.25, technical: 0.20 };

// ─── Seed app migration ──────────────────────────────────────────────────────
// Takes legacy ASMPT_DATA.apps and folds them into the unified schema.
function inferScorDomain(app) {
  const n = (app.name + " " + (app.description || "")).toLowerCase();
  if (/\bplan(ning)?|forecast|s&op|demand|capacity|schedul/.test(n)) return "PLAN";
  if (/procure|sourcing|supplier|purchas|ariba|rfq|vendor/.test(n)) return "SOURCE";
  if (/manufactur|production|mes|shop ?floor|machine|quality|qms|qa\/qc|nx\b|cad|cam|pads|teamcenter|opcenter/.test(n)) return "MAKE";
  if (/warehouse|wms|logistic|transport|tms|deliver|ship|order|oms|sales|customer|crm|distributor/.test(n)) return "DELIVER";
  if (/return|rma|service|warrant|repair|reverse/.test(n)) return "RETURN";
  // Process-based fallback
  if (app.processes && app.processes.includes("SCM")) return "SOURCE";
  if (app.processes && app.processes.includes("PLM")) return "MAKE";
  if (app.processes && app.processes.includes("CRM")) return "DELIVER";
  return "ENABLE";
}
function inferSites(app) {
  // ASMPT scope = all 4 sites; SMT = primary Munich; otherwise Munich
  if (app.users_scope.includes("ASMPT")) return ["MUC","UK","SGP","MAL"];
  if (app.users_scope.includes("SMT")) return ["MUC"];
  return ["MUC"];
}
function migrateApp(a) {
  const now = new Date().toISOString();
  return {
    id: a.id_str || ("APP-" + String(a.id).padStart(3, "0")),
    legacy_id: a.id,
    name: a.name,
    scor_domain: inferScorDomain(a),
    ea_layer: a.processes.includes("CF") ? "Business" : "Application",
    // Overview
    description: a.description || "",
    provider: a.provider || "",
    version: a.version || "",
    setup_type: a.setup_type || "",
    deploy: a.hosting || "On premise",
    num_users: a.num_users || null,
    link: a.link || "",
    doc_link: a.doc_link || "",
    security: a.security || "",
    // People
    owners: a.owners || [],
    it_contact: a.it_contact || [],
    users_scope: a.users_scope || [],
    processes: a.processes || [],
    // Roadmap
    roadmap: a.future_roadmap || "Sustain",
    itil: a.itil || "",
    last_release: a.last_release || null,
    next_release: a.next_release || null,
    retirement: a.retirement || null,
    successor: a.successor || "",
    // Scoring
    scoring: {
      time: null, // assigned later when user uses TIME quadrant
      pace: null,
      pace_layer: null, // SoR | SoD | SoI
      // Per-domain functional coverage 0..3
      scor_process: { PLAN: 0, SOURCE: 0, MAKE: 0, DELIVER: 0, RETURN: 0, ENABLE: 0 },
      // Value × Complexity matrix
      wert_complexity: { value: 3, complexity: 3, quadrant: null, notes: "" },
      // TCO / TVO
      tco_tvo: { tco_total: null, tvo_score: null, business_case: "", decision_date: null, status: "Draft" },
      // Cloud readiness — legacy single value retained for back-compat
      cloud_readiness: { ist: a.cloud_readiness_ist || 1, soll: a.cloud_readiness_soll || 3 },
      // New: per-TOGAF-layer readiness (Business / Information / Application / Technology)
      cloud_readiness_layers: {
        layer_I:   { ist: Math.round((a.cloud_readiness_ist || 2) * 18), soll: Math.round((a.cloud_readiness_soll || 4) * 20) },
        layer_II:  { ist: Math.round((a.cloud_readiness_ist || 2) * 16), soll: Math.round((a.cloud_readiness_soll || 4) * 19) },
        layer_III: { ist: Math.round((a.cloud_readiness_ist || 2) * 14), soll: Math.round((a.cloud_readiness_soll || 4) * 18) },
        layer_IV:  { ist: Math.round((a.cloud_readiness_ist || 2) * 12), soll: Math.round((a.cloud_readiness_soll || 4) * 18) },
      },
      bva: a.bva || { business: 50, cost: 50, risk: 50, technical: 50 },
      scor_maturity: a.scor_maturity || 2,
      // Free-text justifications written by users while scoring
      notes: { time: "", pace: "", wert: "", cloud: "" },
    },
    time_x: a.time_x || 50,
    time_y: a.time_y || 50,
    // Heatmap
    heatmap_category: null,
    // Migration
    aws_migration: a.aws_migration || "",
    migration_7r: null,
    // Sites
    sites: inferSites(a),
    // Dependencies
    dependencies: a.integrated_to || [],
    // Meta
    ai_relevant: !!a.ai_relevant,
    criticality: a.criticality || "Medium",
    notes: a.notes || "",
    cost: a.cost || "",
    // Audit
    created_at: a.modified || now,
    updated_at: a.modified || now,
    updated_by: a.modified_by || "Feuerecker, Manuela",
  };
}

// ─── State assembly ──────────────────────────────────────────────────────────
function buildInitialState() {
  const seedApps = (window.ASMPT_DATA?.apps || []).map(migrateApp);
  return {
    version: SCHEMA_VERSION,
    apps: seedApps,
    sites: DEFAULT_SITES,
    scor_domains: SCOR_DOMAIN_DEFS,
    ea_layers: EA_LAYERS,
    users: DEFAULT_USERS,
    current_user_id: "u1",
    heatmap_categories: DEFAULT_HEATMAP_CATEGORIES,
    heatmap_axes: { x: "cloud_readiness_ist", y: "bva_score" },
    bva_weights: DEFAULT_BVA_WEIGHTS,
    cloud_thresholds: { warn: 2.5, ok: 3.5 },
    audit_log: [{ ts: new Date().toISOString(), user: "system", action: "init", target: "store", details: `Seeded ${seedApps.length} applications` }],
    questionnaires: [],
    ai_analyses: [],
  };
}
function loadState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return buildInitialState();
    const parsed = JSON.parse(raw);
    if (parsed.version !== SCHEMA_VERSION) return buildInitialState();
    return parsed;
  } catch (e) {
    console.warn("Store load failed, reseeding", e);
    return buildInitialState();
  }
}

// ─── Context ─────────────────────────────────────────────────────────────────
const StoreCtx = createContext(null);

function StoreProvider({ children }) {
  const [state, setState] = useState(loadState);

  // Persist on every change
  useEffect(() => {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(state)); } catch (e) { console.warn("persist failed", e); }
  }, [state]);

  // ─── Shared-storage hydration ─────────────────────────────────────────────
  // On mount, pull every questionnaire + its responses from shared storage and
  // merge into the local state. Local-only questionnaires (not yet pushed to
  // shared) are preserved. After hydration we set `sharedHydrated=true` so the
  // Respond view can render instead of showing a loading state.
  const [sharedHydrated, setSharedHydrated] = useState(false);
  const lastSharedSnapshot = useRef({});  // qId -> stringified responses[] (debounce key)
  const lastQSnapshot = useRef({});       // qId -> stringified questionnaire  (debounce key)

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const index = await sharedStore.get(SHARED_INDEX_KEY) || [];
        const remoteQs = [];
        for (const entry of index) {
          const qId = typeof entry === "string" ? entry : entry?.id;
          if (!qId) continue;
          const q = await sharedStore.get(sharedKey.q(qId));
          if (!q) continue;
          const responses = (await sharedStore.get(sharedKey.resp(qId))) || [];
          remoteQs.push({ ...q, responses });
        }
        if (cancelled) return;
        if (remoteQs.length > 0) {
          setState(s => {
            const byId = new Map((s.questionnaires || []).map(q => [q.id, q]));
            remoteQs.forEach(rq => {
              const local = byId.get(rq.id);
              if (!local) { byId.set(rq.id, rq); return; }
              // Pick whichever was updated last; merge responses (union by id)
              const localTs = local.updated_at || local.created_at || "";
              const remoteTs = rq.updated_at || rq.created_at || "";
              const base = remoteTs > localTs ? rq : local;
              const respIds = new Set((base.responses || []).map(r => r.id));
              const mergedResponses = [...(base.responses || [])];
              [...(local.responses || []), ...(rq.responses || [])].forEach(r => {
                if (!respIds.has(r.id)) { mergedResponses.push(r); respIds.add(r.id); }
              });
              byId.set(rq.id, { ...base, responses: mergedResponses });
            });
            return { ...s, questionnaires: [...byId.values()] };
          });
        }
      } catch (e) {
        console.warn("shared hydration failed", e);
      } finally {
        if (!cancelled) setSharedHydrated(true);
      }
    })();
    return () => { cancelled = true; };
  }, []);

  // ─── Mirror questionnaires + responses to shared storage ──────────────────
  useEffect(() => {
    if (!sharedHydrated) return;  // don't mirror until we've hydrated
    (async () => {
      const qs = state.questionnaires || [];
      // Detect changed questionnaires + responses since last snapshot, write deltas
      for (const q of qs) {
        const { responses, ...meta } = q;
        const metaJson = JSON.stringify(meta);
        if (lastQSnapshot.current[q.id] !== metaJson) {
          lastQSnapshot.current[q.id] = metaJson;
          await sharedStore.set(sharedKey.q(q.id), meta);
        }
        const respJson = JSON.stringify(responses || []);
        if (lastSharedSnapshot.current[q.id] !== respJson) {
          lastSharedSnapshot.current[q.id] = respJson;
          await sharedStore.set(sharedKey.resp(q.id), responses || []);
        }
      }
      // Rebuild index
      const index = qs.map(q => ({ id: q.id, updated_at: q.updated_at || q.created_at || "" }));
      await sharedStore.set(SHARED_INDEX_KEY, index);
      // Garbage-collect deleted questionnaires: any id in lastQSnapshot.current
      // not present anymore → delete from shared.
      const known = new Set(qs.map(q => q.id));
      for (const id of Object.keys(lastQSnapshot.current)) {
        if (!known.has(id)) {
          delete lastQSnapshot.current[id];
          delete lastSharedSnapshot.current[id];
          await sharedStore.delete(sharedKey.q(id));
          await sharedStore.delete(sharedKey.resp(id));
        }
      }
    })();
  }, [state.questionnaires, sharedHydrated]);

  // ─── Poll shared storage for new responses (30 s + on focus) ──────────────
  useEffect(() => {
    if (!sharedHydrated) return;
    let stop = false;
    async function refresh() {
      if (stop) return;
      try {
        const qs = state.questionnaires || [];
        let mutated = false;
        const updates = {};
        for (const q of qs) {
          const remoteResponses = (await sharedStore.get(sharedKey.resp(q.id))) || [];
          const localIds = new Set((q.responses || []).map(r => r.id));
          const newOnes = remoteResponses.filter(r => !localIds.has(r.id));
          if (newOnes.length > 0) {
            updates[q.id] = newOnes;
            mutated = true;
          }
        }
        if (mutated && !stop) {
          setState(s => ({
            ...s,
            questionnaires: (s.questionnaires || []).map(q => {
              const add = updates[q.id];
              if (!add || add.length === 0) return q;
              const have = new Set((q.responses || []).map(r => r.id));
              const merged = [...(q.responses || []), ...add.filter(r => !have.has(r.id))];
              // Mark associated recipients as responded
              const respByRcp = new Set(merged.map(r => r.recipient_id));
              const recipients = (q.recipients || []).map(r =>
                respByRcp.has(r.id) && !r.responded
                  ? { ...r, responded: true, responded_at: new Date().toISOString() }
                  : r
              );
              return { ...q, responses: merged, recipients };
            }),
          }));
        }
      } catch (e) { console.warn("poll failed", e); }
    }
    const interval = setInterval(refresh, 30000);
    function onFocus() { refresh(); }
    window.addEventListener("focus", onFocus);
    document.addEventListener("visibilitychange", () => { if (!document.hidden) refresh(); });
    return () => { stop = true; clearInterval(interval); window.removeEventListener("focus", onFocus); };
  }, [sharedHydrated, (state.questionnaires || []).map(q => q.id).join("|")]);

  const currentUser = state.users.find(u => u.id === state.current_user_id) || state.users[0];

  // ─── Audit helper ──────────────────────────────────────────────────────────
  function logEntry(action, target, details = "") {
    return { ts: new Date().toISOString(), user: currentUser?.name || "anonymous", action, target, details };
  }

  // ─── Permission helper ─────────────────────────────────────────────────────
  function can(action, app) {
    const u = currentUser;
    if (!u || !u.active) return false;
    if (u.role === "Admin") return true;
    if (u.role === "Viewer") return false;
    if (u.role === "Editor") {
      if (action === "delete") return false;          // editors cannot hard-delete
      if (action === "settings") return false;        // editors cannot manage users/roles
      if (action === "edit" && app) {                 // editors can only edit apps in their site(s)
        return app.sites.some(s => u.sites.includes(s));
      }
      return true;
    }
    return false;
  }

  // ─── Mutations ─────────────────────────────────────────────────────────────
  const actions = useMemo(() => ({
    addApp(partial) {
      const now = new Date().toISOString();
      const nextId = "APP-" + String(Math.max(0, ...state.apps.map(a => parseInt((a.id || "APP-0").split("-")[1]) || 0)) + 1).padStart(3, "0");
      const newApp = {
        id: nextId,
        name: "Untitled application",
        scor_domain: "ENABLE",
        ea_layer: "Application",
        description: "", provider: "", version: "", setup_type: "Configured",
        deploy: "Cloud", num_users: null, link: "", doc_link: "", security: "",
        owners: [], it_contact: [], users_scope: [], processes: [],
        roadmap: "Introduction", itil: "Requirements",
        last_release: null, next_release: null, retirement: null, successor: "",
        scoring: { time: null, pace: null, pace_layer: null,
          scor_process: { PLAN: 0, SOURCE: 0, MAKE: 0, DELIVER: 0, RETURN: 0, ENABLE: 0 },
          wert_complexity: { value: 3, complexity: 3, quadrant: null, notes: "" },
          tco_tvo: { tco_total: null, tvo_score: null, business_case: "", decision_date: null, status: "Draft" },
          cloud_readiness: { ist: 2, soll: 3 },
          cloud_readiness_layers: { layer_I: { ist: 35, soll: 70 }, layer_II: { ist: 35, soll: 70 }, layer_III: { ist: 35, soll: 70 }, layer_IV: { ist: 35, soll: 70 } },
          bva: { business: 50, cost: 50, risk: 50, technical: 50 },
          scor_maturity: 2, notes: { time: "", pace: "", wert: "", cloud: "" } },
        time_x: 50, time_y: 50,
        heatmap_category: null,
        aws_migration: "", migration_7r: null,
        sites: ["MUC"], dependencies: [],
        ai_relevant: false, criticality: "Medium", notes: "", cost: "",
        created_at: now, updated_at: now, updated_by: currentUser?.name || "system",
        ...partial,
      };
      setState(s => ({
        ...s,
        apps: [...s.apps, newApp],
        audit_log: [logEntry("create", newApp.id, newApp.name), ...s.audit_log].slice(0, 500),
      }));
      return newApp;
    },
    updateApp(id, patch) {
      setState(s => ({
        ...s,
        apps: s.apps.map(a => a.id === id ? { ...a, ...patch, updated_at: new Date().toISOString(), updated_by: currentUser?.name || "system" } : a),
        audit_log: [logEntry("update", id, Object.keys(patch).join(", ")), ...s.audit_log].slice(0, 500),
      }));
    },
    updateScoring(id, scoringPatch) {
      setState(s => ({
        ...s,
        apps: s.apps.map(a => a.id === id ? { ...a, scoring: { ...a.scoring, ...scoringPatch }, updated_at: new Date().toISOString(), updated_by: currentUser?.name || "system" } : a),
        audit_log: [logEntry("score", id, Object.keys(scoringPatch).join(", ")), ...s.audit_log].slice(0, 500),
      }));
    },
    setHeatmapCategory(id, categoryId) {
      setState(s => ({
        ...s,
        apps: s.apps.map(a => a.id === id ? { ...a, heatmap_category: categoryId, updated_at: new Date().toISOString(), updated_by: currentUser?.name || "system" } : a),
        audit_log: [logEntry("heatmap", id, "category=" + (categoryId || "cleared")), ...s.audit_log].slice(0, 500),
      }));
    },
    setScorDomain(id, domainId) {
      setState(s => ({
        ...s,
        apps: s.apps.map(a => a.id === id ? { ...a, scor_domain: domainId, updated_at: new Date().toISOString(), updated_by: currentUser?.name || "system" } : a),
        audit_log: [logEntry("scor", id, "domain=" + domainId), ...s.audit_log].slice(0, 500),
      }));
    },
    // Generic: set a value at a dotted path inside an app (e.g. "scoring.bva.business")
    setAppField(id, path, value) {
      setState(s => ({
        ...s,
        apps: s.apps.map(a => {
          if (a.id !== id) return a;
          const next = JSON.parse(JSON.stringify(a));
          const parts = path.split(".");
          let cur = next;
          for (let i = 0; i < parts.length - 1; i++) {
            if (cur[parts[i]] == null || typeof cur[parts[i]] !== "object") cur[parts[i]] = {};
            cur = cur[parts[i]];
          }
          cur[parts[parts.length - 1]] = value;
          next.updated_at = new Date().toISOString();
          next.updated_by = currentUser?.name || "system";
          return next;
        }),
        audit_log: [logEntry("field", id, path + "=" + (typeof value === "object" ? "…" : value)), ...s.audit_log].slice(0, 500),
      }));
    },
    deleteApp(id) {
      const app = state.apps.find(a => a.id === id);
      setState(s => ({
        ...s,
        apps: s.apps.filter(a => a.id !== id),
        audit_log: [logEntry("delete", id, app?.name || ""), ...s.audit_log].slice(0, 500),
      }));
    },
    // Sites
    addSite(site) {
      setState(s => ({ ...s, sites: [...s.sites, site], audit_log: [logEntry("site:add", site.id, site.name), ...s.audit_log].slice(0,500) }));
    },
    deleteSite(id) {
      setState(s => ({ ...s, sites: s.sites.filter(x => x.id !== id), audit_log: [logEntry("site:del", id, ""), ...s.audit_log].slice(0,500) }));
    },
    // Users
    addUser(user) {
      const id = "u" + (state.users.length + 1) + "_" + Date.now().toString(36);
      const u = { id, active: true, sites: ["MUC"], role: "Viewer", ...user };
      setState(s => ({ ...s, users: [...s.users, u], audit_log: [logEntry("user:add", id, u.name), ...s.audit_log].slice(0,500) }));
    },
    updateUser(id, patch) {
      setState(s => ({ ...s, users: s.users.map(u => u.id === id ? { ...u, ...patch } : u), audit_log: [logEntry("user:upd", id, Object.keys(patch).join(",")), ...s.audit_log].slice(0,500) }));
    },
    deleteUser(id) {
      setState(s => ({ ...s, users: s.users.filter(u => u.id !== id), audit_log: [logEntry("user:del", id, ""), ...s.audit_log].slice(0,500) }));
    },
    setCurrentUser(id) {
      setState(s => ({ ...s, current_user_id: id }));
    },
    // Heatmap categories
    setHeatmapCategories(cats) {
      setState(s => ({ ...s, heatmap_categories: cats, audit_log: [logEntry("heatmap:cfg", "categories", ""), ...s.audit_log].slice(0,500) }));
    },
    setHeatmapAxes(axes) {
      setState(s => ({ ...s, heatmap_axes: axes }));
    },
    // Weights
    setBvaWeights(w) {
      setState(s => ({ ...s, bva_weights: w, audit_log: [logEntry("bva:weights", "weights", JSON.stringify(w)), ...s.audit_log].slice(0,500) }));
    },
    // ─── Questionnaires ────────────────────────────────────────────────────
    addQuestionnaire(q) {
      const id = "Q-" + Date.now().toString(36).toUpperCase();
      const now = new Date().toISOString();
      const created = {
        id, title: "Untitled questionnaire", description: "", lang: "EN", template: "custom",
        target_apps: [], questions: [], recipients: [], responses: [],
        anonymous: false, status: "draft", created_at: now, deadline: null,
        created_by: currentUser?.name || "system",
        ...q,
      };
      setState(s => ({ ...s, questionnaires: [...(s.questionnaires || []), created], audit_log: [logEntry("q:add", id, created.title), ...s.audit_log].slice(0,500) }));
      return created;
    },
    updateQuestionnaire(id, patch) {
      setState(s => ({ ...s, questionnaires: (s.questionnaires || []).map(q => q.id === id ? { ...q, ...patch } : q),
        audit_log: [logEntry("q:upd", id, Object.keys(patch).join(",")), ...s.audit_log].slice(0,500) }));
    },
    deleteQuestionnaire(id) {
      setState(s => ({ ...s, questionnaires: (s.questionnaires || []).filter(q => q.id !== id),
        audit_log: [logEntry("q:del", id, ""), ...s.audit_log].slice(0,500) }));
    },
    // Import a payload produced by the standalone HTML survey. Payload shape:
    //   { questionnaire_id, respondent: { name, site, email?, department? },
    //     submitted_at, responses: [{ app_id|null, answers }] }
    // Creates one "imported" recipient (re-used if a previous import from the
    // same name+site exists) and appends each entry to questionnaire.responses.
    importResponse(payload) {
      const qId = payload.questionnaire_id;
      const r = payload.respondent || {};
      const name = (r.name || "Anonymous").trim();
      const site = r.site || "?";
      const subAt = payload.submitted_at || new Date().toISOString();
      let recipientId = null;
      let createdCount = 0;
      setState(s => {
        const qs = (s.questionnaires || []).map(q => {
          if (q.id !== qId) return q;
          // Find or create the imported recipient
          let recipient = (q.recipients || []).find(x => x.imported && x.name === name && x.site === site);
          let recipients = q.recipients || [];
          if (!recipient) {
            recipient = {
              id: "rcp_imp_" + Date.now().toString(36) + Math.random().toString(36).slice(2, 6),
              name, email: r.email || "", site, department: r.department || "External",
              imported: true, responded: true, responded_at: subAt, token: null,
            };
            recipients = [...recipients, recipient];
          } else {
            recipients = recipients.map(x => x.id === recipient.id ? { ...x, responded: true, responded_at: subAt } : x);
          }
          recipientId = recipient.id;
          // Append one response row per (app_id, answers) entry
          const entries = Array.isArray(payload.responses) && payload.responses.length > 0
            ? payload.responses
            : [{ app_id: null, answers: payload.answers || {} }];
          const newResponses = entries.map((e, i) => ({
            id: "R-imp-" + Date.now().toString(36) + "-" + i,
            recipient_id: recipient.id,
            app_id: e.app_id || null,
            answers: e.answers || {},
            submitted_at: subAt,
            imported: true,
          }));
          createdCount = newResponses.length;
          return { ...q, recipients, responses: [...(q.responses || []), ...newResponses] };
        });
        return { ...s, questionnaires: qs,
          audit_log: [logEntry("q:import", qId, `respondent=${name} site=${site} rows=${createdCount}`), ...s.audit_log].slice(0,500) };
      });
      return { ok: true, recipientId, count: createdCount };
    },
    // Submit a response (from the standalone respond view OR from inline)
    submitResponse(qId, recipientId, appId, answers) {
      setState(s => {
        const qs = (s.questionnaires || []).map(q => {
          if (q.id !== qId) return q;
          const resp = { id: "R-" + Date.now().toString(36), recipient_id: recipientId, app_id: appId, answers, submitted_at: new Date().toISOString() };
          const recipients = (q.recipients || []).map(r => r.id === recipientId ? { ...r, responded: true, responded_at: new Date().toISOString() } : r);
          return { ...q, responses: [...(q.responses || []), resp], recipients };
        });
        return { ...s, questionnaires: qs,
          audit_log: [logEntry("q:response", qId, "recipient=" + recipientId + (appId ? " app=" + appId : "")), ...s.audit_log].slice(0,500) };
      });
    },
    // ─── AI analyses ───────────────────────────────────────────────────────
    addAiAnalysis(a) {
      const id = "AI-" + Date.now().toString(36).toUpperCase();
      const created = { id, created_at: new Date().toISOString(), by: currentUser?.name || "system", applied: false, ...a };
      setState(s => ({ ...s, ai_analyses: [...(s.ai_analyses || []), created],
        audit_log: [logEntry("ai:add", id, "q=" + (a.questionnaire_id || "?")), ...s.audit_log].slice(0,500) }));
      return created;
    },
    markAnalysisApplied(id, appliedIds) {
      setState(s => ({ ...s, ai_analyses: (s.ai_analyses || []).map(a => a.id === id ? { ...a, applied: true, applied_to: appliedIds, applied_at: new Date().toISOString() } : a),
        audit_log: [logEntry("ai:apply", id, (appliedIds || []).join(",")), ...s.audit_log].slice(0,500) }));
    },
    deleteAiAnalysis(id) {
      setState(s => ({ ...s, ai_analyses: (s.ai_analyses || []).filter(a => a.id !== id),
        audit_log: [logEntry("ai:del", id, ""), ...s.audit_log].slice(0,500) }));
    },
    // Import/Export
    exportJson() {
      return JSON.stringify(state, null, 2);
    },
    importJson(json) {
      try {
        const parsed = JSON.parse(json);
        if (!parsed.apps) throw new Error("Invalid file: no apps[]");
        setState({ ...parsed, version: SCHEMA_VERSION, audit_log: [logEntry("import", "store", `${parsed.apps.length} apps`), ...state.audit_log].slice(0,500) });
        return { ok: true, count: parsed.apps.length };
      } catch (e) {
        return { ok: false, error: e.message };
      }
    },
    resetStore() {
      try { localStorage.removeItem(STORAGE_KEY); } catch {}
      setState(buildInitialState());
    },
  }), [state, currentUser]);

  const value = { state, ...actions, currentUser, can, sharedHydrated, sharedAvailable: SHARED_AVAILABLE };
  return React.createElement(StoreCtx.Provider, { value }, children);
}

function useStore() {
  const v = useContext(StoreCtx);
  if (!v) throw new Error("useStore must be used inside <StoreProvider>");
  return v;
}

// Convenience hooks
function useApps() { return useStore().state.apps; }
function useSites() { return useStore().state.sites; }
function useCurrentUser() { return useStore().currentUser; }

Object.assign(window, {
  StoreProvider, useStore, useApps, useSites, useCurrentUser,
  SCOR_DOMAIN_DEFS, EA_LAYERS, DEFAULT_HEATMAP_CATEGORIES,
});
