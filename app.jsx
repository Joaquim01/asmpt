// Main shell — wraps everything in <StoreProvider> so every screen reads
// from the central store. No app data is passed via props.
const { useState: useS, useEffect: useE } = React;

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "sidebar": "expanded",
  "accent": "#dc2626"
}/*EDITMODE-END*/;

const NAV = [
  { id: "dashboard", label: "Dashboard", section: "1", num: "01", desc: "Overview" },
  { id: "inventory", label: "Inventar", section: "1", num: "02", desc: "Applications" },
  { id: "scoring",   label: "Bewertung", section: "2", num: "03", desc: "6 Bewertungsmodelle" },
  { id: "heatmap",   label: "Heatmap", section: "2", num: "04", desc: "Decision matrix" },
  { id: "questionnaires", label: "Questionnaires", section: "2", num: "05", desc: "Field surveys & AI" },
  { id: "scor",      label: "SCOR map", section: "3", num: "06", desc: "Plan · Source · Make…" },
  { id: "migration", label: "Migration", section: "3", num: "07", desc: "AWS · Cloud", soon: true },
  { id: "settings",  label: "Settings", section: "4", num: "08", desc: "Users · governance" },
];

function Shell() {
  const [route, setRoute] = useS("dashboard");
  const [openApp, setOpenApp] = useS(null);
  const [t, setTweak] = window.useTweaks ? window.useTweaks(TWEAK_DEFAULTS) : [TWEAK_DEFAULTS, () => {}];
  const collapsed = t.sidebar === "icons";

  useE(() => {
    document.documentElement.style.setProperty("--accent", t.accent);
  }, [t.accent]);

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "#fafbfc" }}>
      <Sidebar route={route} setRoute={setRoute} collapsed={collapsed} />
      <main style={{ flex: 1, minWidth: 0 }}>
        <TopBar route={route} onOpen={setOpenApp} />
        {route === "dashboard" && <Dashboard onOpen={setOpenApp} />}
        {route === "inventory" && <Inventory onOpen={setOpenApp} />}
        {route === "scoring"   && <Bewertung onOpen={setOpenApp} />}
        {route === "heatmap"   && <Heatmap onOpen={setOpenApp} />}
        {route === "questionnaires" && <Questionnaires onOpenApp={setOpenApp} />}
        {route === "scor"      && <ScorMap onOpen={setOpenApp} />}
        {route === "settings"  && <Settings />}
        {route === "migration" && <SoonScreen />}
      </main>
      {openApp && <AppDetail app={openApp} onClose={() => setOpenApp(null)} onNavigate={setOpenApp} />}
      {window.TweaksPanel && (
        <window.TweaksPanel title="Tweaks">
          <window.TweakSection title="Layout">
            <window.TweakRadio label="Sidebar" value={t.sidebar} onChange={v => setTweak("sidebar", v)} options={[{value:"expanded",label:"Expanded"},{value:"icons",label:"Icons"}]} />
          </window.TweakSection>
          <window.TweakSection title="Accent">
            <window.TweakColor label="Brand red" value={t.accent} onChange={v => setTweak("accent", v)} options={["#dc2626","#b91c1c","#e11d48","#0f172a"]} />
          </window.TweakSection>
        </window.TweaksPanel>
      )}
    </div>
  );
}

function Sidebar({ route, setRoute, collapsed }) {
  const { currentUser, state } = useStore();
  const w = collapsed ? 76 : 256;
  const groups = [
    { id: "1", label: "OPERATE" },
    { id: "2", label: "ASSESS" },
    { id: "3", label: "TRANSFORM" },
    { id: "4", label: "ADMIN" },
  ];
  return (
    <aside style={{
      width: w, flexShrink: 0, background: "#0f172a", color: "#fff",
      display: "flex", flexDirection: "column",
      position: "sticky", top: 0, height: "100vh", overflow: "auto",
      transition: "width .2s ease",
    }}>
      <div style={{ padding: collapsed ? "22px 14px" : "26px 24px", borderBottom: "1px solid rgba(255,255,255,.08)" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <span style={{ width: 28, height: 28, background: "var(--accent)", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "var(--font-display)", fontSize: 18, fontWeight: 700, color: "#fff", letterSpacing: "-0.02em" }}>A</span>
          {!collapsed && (
            <div style={{ lineHeight: 1.1 }}>
              <div style={{ fontFamily: "var(--font-display)", fontSize: 18, fontWeight: 600, letterSpacing: "-0.01em" }}>Artéfact</div>
              <div style={{ fontFamily: "var(--font-mono)", fontSize: 9.5, color: "#94a3b8", letterSpacing: ".14em", marginTop: 2 }}>SCM · ARCHITECTURE</div>
            </div>
          )}
        </div>
      </div>
      <nav style={{ flex: 1, padding: "16px 0" }}>
        {groups.map(g => (
          <div key={g.id} style={{ marginBottom: 18 }}>
            {!collapsed && (
              <div style={{ padding: "0 24px", fontFamily: "var(--font-mono)", fontSize: 9, color: "#64748b", letterSpacing: ".22em", fontWeight: 700, marginBottom: 8 }}>{g.label}</div>
            )}
            {NAV.filter(n => n.section === g.id).map(n => {
              const sel = route === n.id;
              return (
                <button key={n.id} onClick={() => !n.soon && setRoute(n.id)} disabled={n.soon}
                  style={{
                    width: "100%", display: "flex", alignItems: "center", gap: 12,
                    padding: collapsed ? "10px 14px" : "9px 24px",
                    border: "none", background: sel ? "rgba(220,38,38,.18)" : "transparent",
                    borderLeft: sel ? "2px solid var(--accent)" : "2px solid transparent",
                    color: sel ? "#fff" : (n.soon ? "#475569" : "#cbd5e1"),
                    cursor: n.soon ? "default" : "pointer", textAlign: "left",
                    fontFamily: "inherit", justifyContent: collapsed ? "center" : "flex-start",
                  }}
                  onMouseEnter={e => !n.soon && !sel && (e.currentTarget.style.background = "rgba(255,255,255,.04)")}
                  onMouseLeave={e => !sel && (e.currentTarget.style.background = "transparent")}>
                  <span style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: sel ? "var(--accent)" : "#64748b", fontWeight: 700, letterSpacing: ".08em" }}>{n.num}</span>
                  {!collapsed && (
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: 13.5, fontWeight: sel ? 600 : 500, letterSpacing: "-0.005em" }}>{n.label}</div>
                      <div style={{ fontFamily: "var(--font-mono)", fontSize: 9.5, color: "#64748b", letterSpacing: ".06em", marginTop: 1 }}>
                        {n.desc}{n.soon && " · soon"}
                      </div>
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        ))}
      </nav>
      {!collapsed && (
        <div style={{ padding: "16px 20px", borderTop: "1px solid rgba(255,255,255,.08)" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <span style={{ width: 32, height: 32, background: "var(--accent)", color: "#fff", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "var(--font-mono)", fontSize: 11, fontWeight: 700 }}>
              {currentUser.name.split(" ").map(p => p[0]).join("").slice(0, 2)}
            </span>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: 12, fontWeight: 500, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{currentUser.name}</div>
              <div style={{ fontFamily: "var(--font-mono)", fontSize: 9.5, color: "var(--accent)", letterSpacing: ".1em", fontWeight: 600 }}>{currentUser.role.toUpperCase()}</div>
            </div>
          </div>
        </div>
      )}
    </aside>
  );
}

function TopBar({ route, onOpen }) {
  const { state } = useStore();
  const [q, setQ] = useS("");
  const [open, setOpen] = useS(false);
  const results = q.length > 1 ? state.apps.filter(a =>
    a.name.toLowerCase().includes(q.toLowerCase()) ||
    (a.provider || "").toLowerCase().includes(q.toLowerCase())
  ).slice(0, 8) : [];
  const labels = {
    dashboard: ["Dashboard", "Portfolio overview"],
    inventory: ["Inventar", "Application catalogue"],
    scoring: ["Bewertung", "TIME · BVA · Cloud"],
    heatmap: ["Heatmap", "Decision matrix"],
    questionnaires: ["Questionnaires", "Field surveys & AI analyst"],
    scor: ["SCOR map", "Plan · Source · Make · Deliver · Return"],
    migration: ["Migration", "AWS transformation"],
    settings: ["Settings", "Users · roles · config"],
  };
  const [main, sub] = labels[route] || ["", ""];
  return (
    <header style={{ position: "sticky", top: 0, zIndex: 50, background: "rgba(250,251,252,.92)", backdropFilter: "blur(8px)", borderBottom: "1px solid #e2e8f0", padding: "14px 40px", display: "flex", alignItems: "center", gap: 24 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
        <span style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: "#94a3b8", letterSpacing: ".18em" }}>SMT / IT-A</span>
        <span style={{ color: "#cbd5e1" }}>/</span>
        <span style={{ fontFamily: "var(--font-display)", fontSize: 16, fontWeight: 600, color: "#0f172a", letterSpacing: "-0.01em" }}>{main}</span>
        <span style={{ fontFamily: "var(--font-mono)", fontSize: 10.5, color: "#94a3b8", letterSpacing: ".06em" }}>· {sub}</span>
      </div>
      <div style={{ flex: 1, position: "relative", maxWidth: 480, marginLeft: "auto" }}>
        <input value={q} onChange={e => { setQ(e.target.value); setOpen(true); }} onFocus={() => setOpen(true)} onBlur={() => setTimeout(() => setOpen(false), 200)}
          placeholder="Search application, owner, provider…"
          style={{ width: "100%", padding: "8px 12px 8px 32px", fontFamily: "var(--font-sans)", fontSize: 13, border: "1px solid #cbd5e1", background: "#fff", color: "#0f172a", borderRadius: 0 }} />
        <span style={{ position: "absolute", left: 10, top: "50%", transform: "translateY(-50%)", color: "#94a3b8", fontSize: 14 }}>⌕</span>
        {open && results.length > 0 && (
          <div style={{ position: "absolute", top: "100%", left: 0, right: 0, marginTop: 4, background: "#fff", border: "1px solid #cbd5e1", boxShadow: "0 12px 32px rgba(15,23,42,.12)", zIndex: 100 }}>
            {results.map(r => (
              <button key={r.id} onMouseDown={() => { onOpen(r); setQ(""); setOpen(false); }}
                style={{ display: "block", width: "100%", padding: "10px 14px", textAlign: "left", border: "none", background: "#fff", cursor: "pointer", borderBottom: "1px solid #f1f5f9", fontFamily: "inherit" }}
                onMouseEnter={e => e.currentTarget.style.background = "#fef2f2"}
                onMouseLeave={e => e.currentTarget.style.background = "#fff"}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ fontSize: 13, color: "#0f172a", fontWeight: 500 }}>{r.name}</span>
                  <span style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: "#94a3b8" }}>{r.id}</span>
                </div>
                <div style={{ fontSize: 11, color: "#94a3b8", marginTop: 2 }}>{r.provider} · {(r.processes || []).join(", ")} · {r.scor_domain}</div>
              </button>
            ))}
          </div>
        )}
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <span style={{ fontFamily: "var(--font-mono)", fontSize: 10.5, color: "#64748b", letterSpacing: ".06em" }}>v5.0 · {state.apps.length} apps</span>
        <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#16a34a" }} title="Store connected" />
      </div>
    </header>
  );
}

function SoonScreen() {
  return (
    <div style={{ padding: "120px 40px", textAlign: "center", maxWidth: 720, margin: "0 auto" }}>
      <div style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "#dc2626", letterSpacing: ".18em", fontWeight: 600 }}>PLANNED · v5.1</div>
      <h1 style={{ fontFamily: "var(--font-display)", fontSize: 56, fontWeight: 400, marginTop: 14, letterSpacing: "-0.035em", color: "#0f172a" }}>Migration tracker</h1>
      <p style={{ marginTop: 12, fontSize: 15, color: "#475569", lineHeight: 1.55 }}>
        AWS / Cloud transition per application — Ist vs Soll, 7R path, blockers and timelines. The 7R field already exists on each application (editable in detail flyout).
      </p>
    </div>
  );
}

// ─── Root ─────────────────────────────────────────────────────────────────────
// If URL hash is #r=<token>, render the standalone Respond view instead.
function Root() {
  const [hash, setHash] = useS(window.location.hash);
  useE(() => {
    function onHash() { setHash(window.location.hash); }
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);
  const m = hash.match(/^#r=(.+)/);
  if (m) return <Respond token={m[1]} />;
  return <Shell />;
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <StoreProvider>
    <Root />
  </StoreProvider>
);
