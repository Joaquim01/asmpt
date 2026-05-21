// Shared UI primitives for ASMPT SCM tool
const { useState, useEffect, useRef, useMemo, useCallback } = React;

// ============ COLOR TOKENS ============
const ROADMAP_COLORS = {
  Growth:       { bg: "#dcfce7", fg: "#14532d", dot: "#16a34a", desc: "Strategic growth" },
  Introduction: { bg: "#e0f2fe", fg: "#075985", dot: "#0284c7", desc: "Newly introduced" },
  Sustain:      { bg: "#f1f5f9", fg: "#334155", dot: "#64748b", desc: "Maintain as-is" },
  Replace:      { bg: "#fed7aa", fg: "#7c2d12", dot: "#ea580c", desc: "Plan replacement" },
  Discontinue:  { bg: "#fee2e2", fg: "#7f1d1d", dot: "#dc2626", desc: "Phase out" },
};
const CRIT_COLORS = {
  Critical: "#dc2626",
  High:     "#ea580c",
  Medium:   "#ca8a04",
  Low:      "#64748b",
};
const HOSTING_COLORS = {
  "On premise": "#475569",
  "Cloud":      "#0284c7",
  "Hybrid":     "#7c3aed",
};
const PROCESS_COLORS = {
  PLM: "#2563eb",
  SCM: "#059669",
  CF:  "#d97706",
  CRM: "#be185d",
};
const SCOPE_COLORS = {
  ASMPT: "#dc2626", SMT: "#1e40af", PLS: "#0f766e", PRS: "#7e22ce", SEMI: "#0891b2",
  Enabler: "#475569", Customer: "#16a34a", Distributor: "#ca8a04", Supplier: "#be185d",
};
const ITIL_COLORS = {
  Operational: "#16a34a", Released: "#0284c7", Test: "#ca8a04",
  Approved: "#7c3aed", Requirements: "#64748b", Retired: "#94a3b8",
};

// ============ BADGE ============
function StatusBadge({ status, kind = "roadmap", size = "sm" }) {
  let bg = "#f1f5f9", fg = "#334155", dot = "#94a3b8";
  if (kind === "roadmap" && ROADMAP_COLORS[status]) {
    ({ bg, fg, dot } = ROADMAP_COLORS[status]);
  } else if (kind === "crit") {
    fg = "#fff"; bg = CRIT_COLORS[status] || "#64748b"; dot = "transparent";
  } else if (kind === "host") {
    fg = HOSTING_COLORS[status] || "#475569"; bg = "transparent";
    return (
      <span style={{
        display: "inline-flex", alignItems: "center", gap: 6,
        fontFamily: "var(--font-mono)", fontSize: 11, fontWeight: 500,
        color: fg, letterSpacing: ".04em",
      }}>
        <span style={{ width: 6, height: 6, borderRadius: 1, background: fg }} />
        {status}
      </span>
    );
  } else if (kind === "process") {
    fg = "#fff"; bg = PROCESS_COLORS[status] || "#64748b";
  } else if (kind === "itil") {
    bg = "transparent"; fg = ITIL_COLORS[status] || "#475569"; dot = ITIL_COLORS[status] || "#94a3b8";
  } else if (kind === "setup") {
    bg = "#f1f5f9"; fg = "#0f172a"; dot = "transparent";
  }
  if (!status) return null;
  const padY = size === "sm" ? 2 : 4;
  const padX = size === "sm" ? 7 : 10;
  const fs = size === "sm" ? 10.5 : 12;
  return (
    <span style={{
      display: "inline-flex", alignItems: "center", gap: 5,
      padding: `${padY}px ${padX}px`, background: bg, color: fg,
      fontFamily: "var(--font-mono)", fontSize: fs, fontWeight: 600,
      letterSpacing: ".06em", textTransform: "uppercase", borderRadius: 2,
      whiteSpace: "nowrap",
    }}>
      {dot !== "transparent" && (
        <span style={{ width: 6, height: 6, borderRadius: "50%", background: dot }} />
      )}
      {status}
    </span>
  );
}

// ============ PROCESS PILLS ============
function ProcessPills({ processes }) {
  if (!processes || processes.length === 0) return <span style={{ color: "#cbd5e1", fontSize: 11 }}>—</span>;
  return (
    <div style={{ display: "flex", gap: 4, flexWrap: "wrap" }}>
      {processes.map(p => (
        <span key={p} title={p} style={{
          fontFamily: "var(--font-mono)", fontSize: 10, fontWeight: 700,
          padding: "2px 6px", color: "#fff", background: PROCESS_COLORS[p] || "#64748b",
          letterSpacing: ".06em", borderRadius: 2,
        }}>{p}</span>
      ))}
    </div>
  );
}

function ScopePills({ scopes, max = 3 }) {
  if (!scopes || scopes.length === 0) return <span style={{ color: "#cbd5e1", fontSize: 11 }}>—</span>;
  const shown = scopes.slice(0, max);
  const extra = scopes.length - max;
  return (
    <div style={{ display: "flex", gap: 3, alignItems: "center", flexWrap: "wrap" }}>
      {shown.map(s => (
        <span key={s} title={s} style={{
          fontFamily: "var(--font-mono)", fontSize: 9.5, fontWeight: 700,
          padding: "2px 5px", color: SCOPE_COLORS[s] || "#475569",
          background: "transparent", border: "1px solid " + (SCOPE_COLORS[s] || "#cbd5e1"),
          letterSpacing: ".06em",
        }}>{s}</span>
      ))}
      {extra > 0 && <span style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: "#94a3b8" }}>+{extra}</span>}
    </div>
  );
}

// ============ SCORE BAR ============
function ScoreBar({ value, max = 100, color = "#dc2626", showValue = true, width = 80, height = 6 }) {
  const pct = Math.max(0, Math.min(100, (value / max) * 100));
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
      <div style={{ width, height, background: "#f1f5f9", borderRadius: 1, overflow: "hidden" }}>
        <div style={{ width: pct + "%", height: "100%", background: color }} />
      </div>
      {showValue && (
        <span style={{ fontFamily: "var(--font-mono)", fontSize: 11, fontWeight: 600, color: "#0f172a", minWidth: 26, textAlign: "right" }}>
          {Math.round(value * 10) / 10}
        </span>
      )}
    </div>
  );
}

// ============ ROADMAP DIAL ============
// Visualizes Future Roadmap as a labelled status indicator
function RoadmapDial({ status, compact = false }) {
  const c = ROADMAP_COLORS[status] || ROADMAP_COLORS.Sustain;
  return (
    <span style={{
      display: "inline-flex", alignItems: "center", gap: 8,
      padding: compact ? "3px 8px" : "5px 10px",
      background: c.bg, color: c.fg,
      fontFamily: "var(--font-mono)", fontSize: compact ? 10 : 11, fontWeight: 700,
      letterSpacing: ".08em", textTransform: "uppercase",
    }}>
      <span style={{ width: 8, height: 8, borderRadius: "50%", background: c.dot }} />
      {status}
    </span>
  );
}

function MaturityDots({ value, max = 5 }) {
  return (
    <div style={{ display: "flex", gap: 3 }}>
      {Array.from({ length: max }).map((_, i) => (
        <span key={i} style={{
          width: 8, height: 8, borderRadius: "50%",
          background: i < value ? "#0f172a" : "transparent",
          border: "1.5px solid " + (i < value ? "#0f172a" : "#cbd5e1"),
        }} />
      ))}
    </div>
  );
}

// ============ KPI CARD ============
function KPICard({ label, value, sub, accent, big = false, align = "left" }) {
  return (
    <div style={{
      background: "#fff",
      border: "1px solid #e2e8f0",
      padding: big ? "28px 28px" : "20px 22px",
      display: "flex", flexDirection: "column", justifyContent: "space-between",
      minHeight: big ? 160 : 120,
      textAlign: align,
    }}>
      <div style={{
        fontFamily: "var(--font-mono)", fontSize: 10.5, fontWeight: 600,
        color: "#64748b", letterSpacing: ".12em", textTransform: "uppercase",
      }}>{label}</div>
      <div style={{
        fontFamily: "var(--font-display)",
        fontSize: big ? 60 : 36, fontWeight: 600,
        color: accent || "#0f172a",
        lineHeight: 1, marginTop: 18, letterSpacing: "-0.03em",
        fontFeatureSettings: '"tnum" 1',
      }}>{value}</div>
      {sub && (
        <div style={{ marginTop: 10, fontSize: 12, color: "#64748b" }}>{sub}</div>
      )}
    </div>
  );
}

function Segmented({ options, value, onChange }) {
  return (
    <div style={{ display: "inline-flex", border: "1px solid #cbd5e1", background: "#fff" }}>
      {options.map(o => {
        const sel = o.value === value;
        return (
          <button key={o.value} onClick={() => onChange(o.value)}
            style={{
              padding: "6px 14px", border: "none", cursor: "pointer",
              fontFamily: "var(--font-mono)", fontSize: 11, fontWeight: 600,
              letterSpacing: ".06em", textTransform: "uppercase",
              background: sel ? "#0f172a" : "#fff",
              color: sel ? "#fff" : "#475569",
              borderRight: "1px solid #cbd5e1",
            }}>{o.label}</button>
        );
      })}
    </div>
  );
}

// ============ HOOKS ============
function useFilters(apps) {
  const [search, setSearch] = useState("");
  const [process, setProcess] = useState("ALL");
  const [roadmap, setRoadmap] = useState("ALL");
  const [scope, setScope] = useState("ALL");
  const [hosting, setHosting] = useState("ALL");
  const [setup, setSetup] = useState("ALL");
  const [itil, setItil] = useState("ALL");
  const [scor, setScor] = useState("ALL");
  const [sort, setSort] = useState({ key: "name", dir: "asc" });

  const filtered = useMemo(() => {
    let r = apps.filter(a => {
      if (search) {
        const q = search.toLowerCase();
        if (!(a.name.toLowerCase().includes(q) ||
              (a.id || "").toLowerCase().includes(q) ||
              (a.provider || "").toLowerCase().includes(q) ||
              (a.description || "").toLowerCase().includes(q) ||
              (a.it_contact || []).some(c => c.toLowerCase().includes(q)) ||
              (a.owners || []).some(c => c.toLowerCase().includes(q)))) return false;
      }
      if (process !== "ALL" && !(a.processes || []).includes(process)) return false;
      const rm = a.roadmap || a.future_roadmap;
      if (roadmap !== "ALL" && rm !== roadmap) return false;
      if (scope !== "ALL" && !(a.users_scope || []).includes(scope)) return false;
      const host = a.deploy || a.hosting;
      if (hosting !== "ALL" && host !== hosting) return false;
      if (setup !== "ALL" && a.setup_type !== setup) return false;
      if (itil !== "ALL" && a.itil !== itil) return false;
      if (scor !== "ALL" && a.scor_domain !== scor) return false;
      return true;
    });
    r = [...r].sort((a, b) => {
      let va = a[sort.key], vb = b[sort.key];
      if (va == null) va = "";
      if (vb == null) vb = "";
      if (Array.isArray(va)) va = va[0] || "";
      if (Array.isArray(vb)) vb = vb[0] || "";
      if (va < vb) return sort.dir === "asc" ? -1 : 1;
      if (va > vb) return sort.dir === "asc" ? 1 : -1;
      return 0;
    });
    return r;
  }, [apps, search, process, roadmap, scope, hosting, setup, itil, scor, sort]);

  return {
    state: { search, process, roadmap, scope, hosting, setup, itil, scor, sort },
    set: { setSearch, setProcess, setRoadmap, setScope, setHosting, setSetup, setItil, setScor, setSort },
    filtered,
    reset() {
      setSearch(""); setProcess("ALL"); setRoadmap("ALL"); setScope("ALL");
      setHosting("ALL"); setSetup("ALL"); setItil("ALL"); setScor("ALL");
    },
  };
}

function FilterSelect({ label, value, onChange, options }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
      <span style={{ fontFamily: "var(--font-mono)", fontSize: 9.5, color: "#64748b", letterSpacing: ".12em", textTransform: "uppercase", fontWeight: 600 }}>
        {label}
      </span>
      <select value={value} onChange={e => onChange(e.target.value)}
        style={{
          fontFamily: "var(--font-sans)", fontSize: 13, padding: "6px 8px",
          border: "1px solid #cbd5e1", background: "#fff", color: "#0f172a",
          minWidth: 130, appearance: "none",
          backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='6' viewBox='0 0 10 6'%3E%3Cpath fill='%23475569' d='M0 0l5 6 5-6z'/%3E%3C/svg%3E\")",
          backgroundRepeat: "no-repeat", backgroundPosition: "right 10px center",
          paddingRight: 24, borderRadius: 0,
        }}>
        {options.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
      </select>
    </div>
  );
}

// Get initials from "Last, First" or "First Last"
function initials(name) {
  if (!name) return "?";
  const parts = name.replace(",", "").split(/\s+/).filter(Boolean);
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  // If "Last, First" → use first letter of last + first of first; original parts[0] is last
  return (parts[0][0] + parts[1][0]).toUpperCase();
}

function OwnerChip({ name, role }) {
  if (!name) return null;
  return (
    <div style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "4px 10px 4px 4px", border: "1px solid #e2e8f0", background: "#fff" }}>
      <span style={{
        width: 22, height: 22, borderRadius: "50%", background: "#0f172a", color: "#fff",
        display: "inline-flex", alignItems: "center", justifyContent: "center",
        fontFamily: "var(--font-mono)", fontSize: 9.5, fontWeight: 700,
      }}>{initials(name)}</span>
      <span style={{ fontSize: 12, color: "#0f172a", fontWeight: 500 }}>{name}</span>
      {role && <span style={{ fontFamily: "var(--font-mono)", fontSize: 9, color: "#94a3b8", letterSpacing: ".1em", textTransform: "uppercase", marginLeft: 2 }}>{role}</span>}
    </div>
  );
}

Object.assign(window, {
  StatusBadge, ProcessPills, ScopePills, ScoreBar, RoadmapDial, MaturityDots,
  KPICard, Segmented, useFilters, FilterSelect, OwnerChip, initials,
  ROADMAP_COLORS, CRIT_COLORS, HOSTING_COLORS, PROCESS_COLORS, SCOPE_COLORS, ITIL_COLORS,
});
