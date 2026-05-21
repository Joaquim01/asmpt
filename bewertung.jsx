// BEWERTUNGSMODELLE — 6 evaluation tools, all reading/writing the central store.
//   A1 SCOR Process Reference · A2 PACE · A3 TIME · A4 Wert × Komplexität
//   A5 TCO/TVO · A6 Cloud Readiness (4 TOGAF layers)
const MODELS = [
  { id: "scor",  num: "A1", label: "SCOR Process",     desc: "Functional coverage per domain · continuous" },
  { id: "pace",  num: "A2", label: "PACE Layered",     desc: "System of Record / Differentiation / Innovation · annual" },
  { id: "time",  num: "A3", label: "Gartner TIME",     desc: "Tolerate · Invest · Migrate · Eliminate · annual" },
  { id: "wert",  num: "A4", label: "Wert × Komplex.",  desc: "Value × Complexity · per migration phase" },
  { id: "tco",   num: "A5", label: "TCO / TVO",        desc: "Cost-of-ownership vs total value of ownership · per project" },
  { id: "cloud", num: "A6", label: "Cloud Readiness",  desc: "4 TOGAF layers · before each phase" },
];

function Bewertung({ onOpen }) {
  const [model, setModel] = useState("scor");
  const { state } = useStore();
  // Coverage stats for nav badges
  const coverage = useMemo(() => {
    const t = state.apps.length || 1;
    function pct(fn) { return Math.round(state.apps.filter(fn).length / t * 100); }
    return {
      scor:  pct(a => Object.values(a.scoring.scor_process || {}).some(v => v > 0)),
      pace:  pct(a => !!a.scoring.pace_layer),
      time:  pct(a => !!a.scoring.time),
      wert:  pct(a => a.scoring.wert_complexity && (a.scoring.wert_complexity.value !== 3 || a.scoring.wert_complexity.complexity !== 3)),
      tco:   pct(a => a.scoring.tco_tvo?.tco_total != null || a.scoring.tco_tvo?.tvo_score != null),
      cloud: pct(a => a.scoring.cloud_readiness_layers && a.scoring.cloud_readiness_layers.layer_I.ist > 0),
    };
  }, [state.apps]);

  return (
    <div style={{ padding: "32px 40px 80px", maxWidth: 1750, margin: "0 auto" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 24 }}>
        <div>
          <div style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "#dc2626", letterSpacing: ".18em", textTransform: "uppercase", fontWeight: 600, marginBottom: 8 }}>§ 03 / Bewertungsmodelle</div>
          <h1 style={{ fontFamily: "var(--font-display)", fontSize: 56, fontWeight: 400, lineHeight: 1, letterSpacing: "-0.035em", color: "#0f172a" }}>Six evaluation models, one source.</h1>
          <p style={{ marginTop: 12, fontSize: 14, color: "#475569", maxWidth: 820, lineHeight: 1.5 }}>
            Every score below writes back to the central store and is reflected immediately in the catalogue, heatmap and dashboard. Pick a model to start scoring.
          </p>
        </div>
      </div>
      <div style={{ height: 1, background: "#0f172a", marginBottom: 18 }} />

      {/* Model nav */}
      <div style={{ display: "grid", gridTemplateColumns: `repeat(${MODELS.length}, 1fr)`, gap: 10, marginBottom: 28 }}>
        {MODELS.map(m => {
          const sel = m.id === model;
          const pct = coverage[m.id];
          return (
            <button key={m.id} onClick={() => setModel(m.id)}
              style={{
                padding: "16px 18px", textAlign: "left", background: sel ? "#0f172a" : "#fff",
                color: sel ? "#fff" : "#0f172a", border: "1px solid " + (sel ? "#0f172a" : "#e2e8f0"),
                cursor: "pointer", fontFamily: "inherit",
              }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                <span style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: sel ? "#fca5a5" : "#dc2626", letterSpacing: ".18em", fontWeight: 700 }}>{m.num}</span>
                <span style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: sel ? "rgba(255,255,255,.6)" : "#94a3b8", fontWeight: 600, letterSpacing: ".06em" }}>{pct}% scored</span>
              </div>
              <div style={{ fontFamily: "var(--font-display)", fontSize: 18, fontWeight: 500, marginTop: 4, letterSpacing: "-0.01em" }}>{m.label}</div>
              <div style={{ fontSize: 11, color: sel ? "rgba(255,255,255,.65)" : "#94a3b8", marginTop: 4, fontFamily: "var(--font-mono)", letterSpacing: ".02em" }}>{m.desc}</div>
              <div style={{ marginTop: 10, height: 3, background: sel ? "rgba(255,255,255,.15)" : "#f1f5f9", overflow: "hidden" }}>
                <div style={{ width: pct + "%", height: 3, background: sel ? "#dc2626" : "#0f172a" }} />
              </div>
            </button>
          );
        })}
      </div>

      {model === "scor"  && <ScorModel onOpen={onOpen} />}
      {model === "pace"  && <PaceModel onOpen={onOpen} />}
      {model === "time"  && <TimeModel onOpen={onOpen} />}
      {model === "wert"  && <WertModel onOpen={onOpen} />}
      {model === "tco"   && <TcoModel onOpen={onOpen} />}
      {model === "cloud" && <CloudModel onOpen={onOpen} />}
    </div>
  );
}

const HEADER_STYLE = { fontFamily: "var(--font-display)", fontSize: 24, fontWeight: 500, letterSpacing: "-0.02em", color: "#0f172a" };
const EYEBROW = { fontFamily: "var(--font-mono)", fontSize: 10, color: "#dc2626", letterSpacing: ".18em", textTransform: "uppercase", fontWeight: 600 };

// ════════════════════════════════════════════════════════════════════════════
// A1 — SCOR Process Reference grid
// ════════════════════════════════════════════════════════════════════════════
const SCOR_LEVELS = [
  { v: 0, label: "None",      color: "#fff",    text: "#cbd5e1" },
  { v: 1, label: "Partial",   color: "#fef3c7", text: "#92400e" },
  { v: 2, label: "Supported", color: "#dcfce7", text: "#14532d" },
  { v: 3, label: "Optimized", color: "#16a34a", text: "#fff" },
];

function ScorModel({ onOpen }) {
  const { state, setAppField, can } = useStore();
  const [siteFilter, setSiteFilter] = useState("ALL");
  const [scorFilter, setScorFilter] = useState("ALL");
  const [search, setSearch] = useState("");
  const apps = useMemo(() => state.apps.filter(a => {
    if (siteFilter !== "ALL" && !(a.sites || []).includes(siteFilter)) return false;
    if (scorFilter !== "ALL" && a.scor_domain !== scorFilter) return false;
    if (search && !a.name.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  }), [state.apps, siteFilter, scorFilter, search]);

  const domainTotals = useMemo(() => {
    const t = {}; SCOR_DOMAIN_DEFS.forEach(d => t[d.id] = 0);
    apps.forEach(a => SCOR_DOMAIN_DEFS.forEach(d => t[d.id] += a.scoring.scor_process?.[d.id] || 0));
    return t;
  }, [apps]);

  function cycle(a, dId) {
    if (!can("edit", a)) return;
    const cur = a.scoring.scor_process?.[dId] || 0;
    setAppField(a.id, `scoring.scor_process.${dId}`, (cur + 1) % 4);
  }

  return (
    <div style={{ background: "#fff", border: "1px solid #e2e8f0", padding: 24 }}>
      <ModelHeader title="SCOR Process Reference" desc="Functional coverage of each application across the six SCOR domains. Click a cell to cycle 0 → 1 → 2 → 3."
        controls={<>
          <FilterSelect label="Site" value={siteFilter} onChange={setSiteFilter}
            options={[{ value: "ALL", label: "All sites" }, ...state.sites.map(s => ({ value: s.id, label: s.name }))]} />
          <FilterSelect label="SCOR" value={scorFilter} onChange={setScorFilter}
            options={[{ value: "ALL", label: "All" }, ...SCOR_DOMAIN_DEFS.map(d => ({ value: d.id, label: d.label }))]} />
          <SearchBox value={search} onChange={setSearch} />
          <CsvBtn onClick={() => csvFromMatrix(apps, "scor")} />
        </>} />
      {/* Legend */}
      <div style={{ display: "flex", gap: 14, marginBottom: 14, fontFamily: "var(--font-mono)", fontSize: 11 }}>
        {SCOR_LEVELS.map(l => (
          <span key={l.v} style={{ display: "inline-flex", alignItems: "center", gap: 8 }}>
            <span style={{ width: 18, height: 18, background: l.color, border: "1px solid #e2e8f0" }} />
            <span style={{ color: "#475569", fontWeight: 600 }}>{l.v} · {l.label}</span>
          </span>
        ))}
      </div>

      <div style={{ overflowX: "auto", maxHeight: 600, overflowY: "auto", border: "1px solid #e2e8f0" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontFamily: "var(--font-sans)", minWidth: 900 }}>
          <thead style={{ position: "sticky", top: 0, background: "#0f172a", color: "#fff", zIndex: 1 }}>
            <tr>
              <th style={{ ...thStyle, minWidth: 260, position: "sticky", left: 0, background: "#0f172a", zIndex: 2 }}>Application</th>
              {SCOR_DOMAIN_DEFS.map(d => (
                <th key={d.id} style={{ ...thStyle, textAlign: "center", borderTop: "3px solid " + d.color }}>
                  <div style={{ color: d.color, fontWeight: 700 }}>{d.id}</div>
                </th>
              ))}
              <th style={{ ...thStyle, textAlign: "right" }}>Σ</th>
            </tr>
          </thead>
          <tbody>
            {apps.map((a, i) => {
              const total = SCOR_DOMAIN_DEFS.reduce((s, d) => s + (a.scoring.scor_process?.[d.id] || 0), 0);
              return (
                <tr key={a.id} style={{ borderBottom: "1px solid #f1f5f9", background: i % 2 ? "#fafbfc" : "#fff" }}>
                  <td style={{ padding: "8px 12px", position: "sticky", left: 0, background: i % 2 ? "#fafbfc" : "#fff", borderRight: "1px solid #e2e8f0" }}>
                    <button onClick={() => onOpen(a)} style={{ background: "none", border: "none", textAlign: "left", padding: 0, cursor: "pointer", fontFamily: "inherit" }}>
                      <div style={{ fontFamily: "var(--font-mono)", fontSize: 9.5, color: "#94a3b8", letterSpacing: ".08em" }}>{a.id}</div>
                      <div style={{ fontSize: 13, fontWeight: 500, color: "#0f172a" }}>{a.name}</div>
                    </button>
                  </td>
                  {SCOR_DOMAIN_DEFS.map(d => {
                    const v = a.scoring.scor_process?.[d.id] || 0;
                    const lvl = SCOR_LEVELS[v];
                    return (
                      <td key={d.id} style={{ padding: 2, textAlign: "center" }}>
                        <button onClick={() => cycle(a, d.id)} disabled={!can("edit", a)}
                          style={{ width: "100%", minWidth: 60, height: 36, background: lvl.color, border: "1px solid #e2e8f0", color: lvl.text, fontFamily: "var(--font-mono)", fontSize: 14, fontWeight: 700, cursor: can("edit", a) ? "pointer" : "default" }}>{v}</button>
                      </td>
                    );
                  })}
                  <td style={{ padding: "8px 12px", textAlign: "right", fontFamily: "var(--font-mono)", fontWeight: 700, color: "#0f172a", fontSize: 13 }}>{total}</td>
                </tr>
              );
            })}
            <tr style={{ background: "#0f172a", color: "#fff" }}>
              <td style={{ padding: "10px 12px", fontFamily: "var(--font-mono)", fontSize: 10, letterSpacing: ".12em", fontWeight: 700, position: "sticky", left: 0, background: "#0f172a" }}>SATURATION</td>
              {SCOR_DOMAIN_DEFS.map(d => (
                <td key={d.id} style={{ padding: "10px 8px", textAlign: "center", fontFamily: "var(--font-mono)", fontWeight: 600, fontSize: 13 }}>{domainTotals[d.id]}</td>
              ))}
              <td style={{ padding: "10px 12px", textAlign: "right", fontFamily: "var(--font-mono)", fontWeight: 700, fontSize: 13 }}>{Object.values(domainTotals).reduce((s, v) => s + v, 0)}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ════════════════════════════════════════════════════════════════════════════
// A2 — PACE
// ════════════════════════════════════════════════════════════════════════════
const PACE_DEFS = [
  { id: "SoR", label: "System of Record",          color: "#1e3a8a", desc: "Stable, long-life, regulated" },
  { id: "SoD", label: "System of Differentiation", color: "#7c3aed", desc: "Tailored to competitive advantage" },
  { id: "SoI", label: "System of Innovation",      color: "#ea580c", desc: "Experimental, high change rate" },
];

function PaceModel({ onOpen }) {
  const { state, setAppField, can } = useStore();
  const [scorFilter, setScorFilter] = useState("ALL");
  const [search, setSearch] = useState("");
  const apps = useMemo(() => state.apps.filter(a => {
    if (scorFilter !== "ALL" && a.scor_domain !== scorFilter) return false;
    if (search && !a.name.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  }), [state.apps, scorFilter, search]);

  const dist = useMemo(() => {
    const o = { SoR: 0, SoD: 0, SoI: 0, _none: 0 };
    apps.forEach(a => { o[a.scoring.pace_layer || "_none"]++; });
    return o;
  }, [apps]);

  function setPace(a, p) {
    if (!can("edit", a)) return;
    setAppField(a.id, "scoring.pace_layer", a.scoring.pace_layer === p ? null : p);
  }

  return (
    <div style={{ background: "#fff", border: "1px solid #e2e8f0", padding: 24 }}>
      <ModelHeader title="PACE Layered Strategy"
        desc="Classify every application as System of Record, Differentiation, or Innovation — the framework guides change cadence and investment."
        controls={<>
          <FilterSelect label="SCOR" value={scorFilter} onChange={setScorFilter}
            options={[{ value: "ALL", label: "All" }, ...SCOR_DOMAIN_DEFS.map(d => ({ value: d.id, label: d.label }))]} />
          <SearchBox value={search} onChange={setSearch} />
          <CsvBtn onClick={() => csvFromMatrix(apps, "pace")} />
        </>} />

      <div style={{ display: "grid", gridTemplateColumns: "1.4fr 1fr", gap: 24 }}>
        {/* List */}
        <div style={{ display: "flex", flexDirection: "column", gap: 6, maxHeight: 640, overflow: "auto" }}>
          {apps.map(a => (
            <div key={a.id} style={{ display: "grid", gridTemplateColumns: "1fr auto", gap: 14, alignItems: "center", padding: "10px 14px", border: "1px solid #e2e8f0", background: "#fafbfc" }}>
              <button onClick={() => onOpen(a)} style={{ textAlign: "left", background: "none", border: "none", cursor: "pointer", padding: 0, fontFamily: "inherit" }}>
                <div style={{ fontFamily: "var(--font-mono)", fontSize: 9.5, color: "#94a3b8" }}>{a.id} · {a.scor_domain}</div>
                <div style={{ fontSize: 13, fontWeight: 500, color: "#0f172a" }}>{a.name}</div>
              </button>
              <div style={{ display: "flex", gap: 4 }}>
                {PACE_DEFS.map(p => {
                  const sel = a.scoring.pace_layer === p.id;
                  return (
                    <button key={p.id} onClick={() => setPace(a, p.id)} disabled={!can("edit", a)}
                      style={{ padding: "5px 10px", fontFamily: "var(--font-mono)", fontSize: 10, fontWeight: 700, letterSpacing: ".08em", background: sel ? p.color : "#fff", color: sel ? "#fff" : p.color, border: "1px solid " + p.color, cursor: can("edit", a) ? "pointer" : "default" }}
                      title={p.label}>{p.id}</button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
        {/* Donut + counts */}
        <div>
          <Donut data={[
            { v: dist.SoR, color: "#1e3a8a", label: "SoR" },
            { v: dist.SoD, color: "#7c3aed", label: "SoD" },
            { v: dist.SoI, color: "#ea580c", label: "SoI" },
            { v: dist._none, color: "#cbd5e1", label: "Unset" },
          ]} />
          <div style={{ marginTop: 18 }}>
            {[...PACE_DEFS, { id: "_none", label: "Unset", color: "#cbd5e1", desc: "Not classified" }].map(p => (
              <div key={p.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 0", borderBottom: "1px dotted #cbd5e1" }}>
                <span style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <span style={{ width: 10, height: 10, borderRadius: 1, background: p.color }} />
                  <div>
                    <div style={{ fontFamily: "var(--font-mono)", fontSize: 11, fontWeight: 700, letterSpacing: ".06em", color: "#0f172a" }}>{p.id} · {p.label}</div>
                    <div style={{ fontSize: 11, color: "#94a3b8" }}>{p.desc}</div>
                  </div>
                </span>
                <span style={{ fontFamily: "var(--font-display)", fontSize: 22, fontWeight: 600, color: "#0f172a" }}>{dist[p.id]}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function Donut({ data, size = 200, stroke = 28 }) {
  const total = data.reduce((s, d) => s + d.v, 0) || 1;
  const r = (size - stroke) / 2;
  const C = 2 * Math.PI * r;
  let offset = 0;
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} style={{ display: "block", margin: "0 auto" }}>
      <circle cx={size/2} cy={size/2} r={r} fill="none" stroke="#f1f5f9" strokeWidth={stroke} />
      {data.map((d, i) => {
        const len = (d.v / total) * C;
        const el = <circle key={i} cx={size/2} cy={size/2} r={r} fill="none" stroke={d.color} strokeWidth={stroke}
          strokeDasharray={`${len} ${C - len}`} strokeDashoffset={-offset} transform={`rotate(-90 ${size/2} ${size/2})`} />;
        offset += len;
        return el;
      })}
      <text x={size/2} y={size/2 - 4} textAnchor="middle" fontFamily="var(--font-display)" fontSize="28" fontWeight="600" fill="#0f172a">{total}</text>
      <text x={size/2} y={size/2 + 18} textAnchor="middle" fontFamily="var(--font-mono)" fontSize="10" fill="#94a3b8" letterSpacing=".15em">APPS</text>
    </svg>
  );
}

// ════════════════════════════════════════════════════════════════════════════
// A3 — TIME (continuous scatter; shared ScatterPlot)
// ════════════════════════════════════════════════════════════════════════════
function TimeModel({ onOpen }) {
  const { state, setAppField, can } = useStore();
  const [selected, setSelected] = useState(null);
  const [search, setSearch] = useState("");
  const apps = useMemo(() => state.apps.filter(a => !search || a.name.toLowerCase().includes(search.toLowerCase())), [state.apps, search]);

  function deriveTime(tech, val) {
    // tech & val on 1..5 scale, threshold 2.5
    if (tech >= 2.5 && val >= 2.5) return "Invest";
    if (tech < 2.5  && val >= 2.5) return "Migrate";
    if (tech < 2.5  && val < 2.5)  return "Tolerate";
    return "Eliminate";
  }
  // Live store update during drag
  function onDrag(a, tech, val) {
    setAppField(a.id, "scoring.bva.technical", Math.round(tech * 20 * 10) / 10);  // store as 0-100 with .1 precision
    setAppField(a.id, "scoring.bva.business",  Math.round(val  * 20 * 10) / 10);
    setAppField(a.id, "scoring.time", deriveTime(tech, val));
  }

  return (
    <div style={{ background: "#fff", border: "1px solid #e2e8f0", padding: 24 }}>
      <ModelHeader title="Gartner TIME"
        desc="Drag any application freely on the matrix. X = technical fit (1.0-5.0), Y = business value (1.0-5.0). Threshold is 2.5; quadrants are derived continuously."
        controls={<>
          <SearchBox value={search} onChange={setSearch} />
          <CsvBtn onClick={() => csvFromMatrix(state.apps, "time")} />
        </>} />
      <div style={{ display: "grid", gridTemplateColumns: "1fr 340px", gap: 24 }}>
        <ScatterPlot
          apps={apps}
          xMax={5} yMax={5}
          xLabel="Technical fit" yLabel="Business value"
          getX={a => Math.max(0.1, (a.scoring.bva.technical || 0) / 20)}
          getY={a => Math.max(0.1, (a.scoring.bva.business  || 0) / 20)}
          threshold={{ x: 2.5, y: 2.5 }}
          quadrants={[
            { x: 0,  y: 0,  w: 50, h: 50, color: "#ea580c", label: "MIGRATE",   label_x: 1.5, label_y: 2 },
            { x: 50, y: 0,  w: 50, h: 50, color: "#16a34a", label: "INVEST",    label_y: 2, label_right: 1.5, align: "right" },
            { x: 0,  y: 50, w: 50, h: 50, color: "#64748b", label: "TOLERATE",  label_x: 1.5, label_bottom: 4 },
            { x: 50, y: 50, w: 50, h: 50, color: "#dc2626", label: "ELIMINATE", label_right: 1.5, label_bottom: 4, align: "right" },
          ]}
          colorFor={a => ROADMAP_COLORS[a.roadmap]?.dot || "#64748b"}
          canDrag={a => can("edit", a)}
          onDrag={onDrag}
          onDragEnd={(a) => setSelected(a)}
          onClick={a => setSelected(a)}
          formatX={v => v.toFixed(2)} formatY={v => v.toFixed(2)}
          tooltipExtra={a => "Quadrant: " + (a.scoring.time || "—")}
        />
        {/* Justification panel */}
        <div style={{ border: "1px solid #e2e8f0", padding: 18, background: "#fff" }}>
          <h4 style={{ ...subH, marginBottom: 10 }}>Selection & notes</h4>
          {selected ? (
            <>
              <div style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: "#dc2626", letterSpacing: ".15em", fontWeight: 700 }}>{selected.id} · {selected.scoring.time || "UNSCORED"}</div>
              <div style={{ fontFamily: "var(--font-display)", fontSize: 22, fontWeight: 500, marginTop: 4, letterSpacing: "-0.02em" }}>{selected.name}</div>
              <div style={{ marginTop: 10, fontFamily: "var(--font-mono)", fontSize: 11, color: "#64748b" }}>
                tech <strong style={{ color: "#0f172a" }}>{((selected.scoring.bva.technical || 0) / 20).toFixed(2)}</strong> ·
                value <strong style={{ color: "#0f172a" }}>{((selected.scoring.bva.business || 0) / 20).toFixed(2)}</strong>
              </div>
              <textarea value={selected.scoring.notes?.time || ""} placeholder="Justification text…"
                onChange={e => setAppField(selected.id, "scoring.notes.time", e.target.value)}
                style={{ ...inputStyle, marginTop: 14, minHeight: 140, fontFamily: "var(--font-sans)", fontSize: 13 }} />
              <div style={{ marginTop: 14, display: "flex", gap: 8 }}>
                <button onClick={() => onOpen(selected)} style={primaryBtn}>Open detail →</button>
              </div>
            </>
          ) : (
            <p style={{ fontSize: 13, color: "#94a3b8" }}>Click or drag any point on the matrix to score it.</p>
          )}
        </div>
      </div>
    </div>
  );
}

function QLabel({ pos, label, color, align = "left" }) {
  return <div style={{ position: "absolute", ...pos, textAlign: align, pointerEvents: "none", fontFamily: "var(--font-mono)", fontSize: 10, fontWeight: 700, letterSpacing: ".18em", color }}>{label}</div>;
}

// ════════════════════════════════════════════════════════════════════════════
// A4 — Wert × Komplexität
// ════════════════════════════════════════════════════════════════════════════
function WertModel({ onOpen }) {
  const { state, setAppField, can } = useStore();
  const [phase, setPhase] = useState("ALL");
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState(null);
  // Determine phase from next_release / retirement year
  function appPhase(a) {
    const d = a.next_release || a.last_release || a.retirement;
    return d ? d.slice(0, 4) : "—";
  }
  const phases = useMemo(() => {
    const s = new Set();
    state.apps.forEach(a => { const p = appPhase(a); if (p !== "—") s.add(p); });
    return [...s].sort();
  }, [state.apps]);

  const phaseColor = { "2025": "#0891b2", "2026": "#16a34a", "2027": "#ca8a04", "2028": "#ea580c", "2030": "#dc2626" };
  function colorFor(a) { return phaseColor[appPhase(a)] || "#94a3b8"; }

  const apps = useMemo(() => state.apps.filter(a => {
    if (phase !== "ALL" && appPhase(a) !== phase) return false;
    if (search && !a.name.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  }), [state.apps, phase, search]);

  function quadrant(value, complexity) {
    // threshold at 2.5 (midpoint of 1..5 continuous scale)
    if (value >= 2.5 && complexity < 2.5)  return "QuickWin";
    if (value >= 2.5 && complexity >= 2.5) return "Strategic";
    if (value < 2.5  && complexity < 2.5)  return "LowPriority";
    return "Avoid";
  }
  function onDrag(a, complexity, value) {
    const q = quadrant(value, complexity);
    setAppField(a.id, "scoring.wert_complexity.value", Math.round(value * 10) / 10);
    setAppField(a.id, "scoring.wert_complexity.complexity", Math.round(complexity * 10) / 10);
    setAppField(a.id, "scoring.wert_complexity.quadrant", q);
  }

  return (
    <div style={{ background: "#fff", border: "1px solid #e2e8f0", padding: 24 }}>
      <ModelHeader title="Wert × Komplexität-Matrix"
        desc="Drag any application freely between Quick Win, Strategic, Low Priority and Avoid. Continuous 1.0-5.0 scale on both axes; threshold 2.5."
        controls={<>
          <FilterSelect label="Phase" value={phase} onChange={setPhase}
            options={[{ value: "ALL", label: "All phases" }, ...phases.map(p => ({ value: p, label: p }))]} />
          <SearchBox value={search} onChange={setSearch} />
          <CsvBtn onClick={() => csvFromMatrix(state.apps, "wert")} />
        </>} />
      <div style={{ display: "grid", gridTemplateColumns: "1fr 320px", gap: 24 }}>
        <ScatterPlot
          apps={apps}
          xMax={5} yMax={5}
          xLabel="Complexity" yLabel="Value"
          getX={a => (a.scoring.wert_complexity?.complexity ?? 3)}
          getY={a => (a.scoring.wert_complexity?.value ?? 3)}
          threshold={{ x: 2.5, y: 2.5 }}
          quadrants={[
            { x: 0,  y: 0,  w: 50, h: 50, color: "#16a34a", label: "QUICK WIN",    label_x: 1.5, label_y: 2 },
            { x: 50, y: 0,  w: 50, h: 50, color: "#2563eb", label: "STRATEGIC",    label_y: 2, label_right: 1.5, align: "right" },
            { x: 0,  y: 50, w: 50, h: 50, color: "#94a3b8", label: "LOW PRIORITY", label_x: 1.5, label_bottom: 4 },
            { x: 50, y: 50, w: 50, h: 50, color: "#dc2626", label: "AVOID",        label_right: 1.5, label_bottom: 4, align: "right" },
          ]}
          colorFor={colorFor}
          canDrag={a => can("edit", a)}
          onDrag={onDrag}
          onDragEnd={a => setSelected(a)}
          onClick={a => setSelected(a)}
          formatX={v => v.toFixed(2)} formatY={v => v.toFixed(2)}
          tooltipExtra={a => "Quadrant: " + (a.scoring.wert_complexity?.quadrant || "—")}
        />
        <div>
          {selected && (
            <div style={{ background: "#fff", border: "1px solid #e2e8f0", padding: 16, marginBottom: 12 }}>
              <div style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: "#dc2626", letterSpacing: ".15em", fontWeight: 700 }}>{selected.id} · {selected.scoring.wert_complexity?.quadrant || "—"}</div>
              <div style={{ fontFamily: "var(--font-display)", fontSize: 20, fontWeight: 500, marginTop: 4, letterSpacing: "-0.02em" }}>{selected.name}</div>
              <div style={{ marginTop: 10, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
                <div><div style={{ fontFamily: "var(--font-mono)", fontSize: 9, color: "#94a3b8", letterSpacing: ".12em" }}>VALUE</div><div style={{ fontFamily: "var(--font-display)", fontSize: 22, fontWeight: 600 }}>{(selected.scoring.wert_complexity?.value ?? 3).toFixed(1)}/5</div></div>
                <div><div style={{ fontFamily: "var(--font-mono)", fontSize: 9, color: "#94a3b8", letterSpacing: ".12em" }}>COMPLEXITY</div><div style={{ fontFamily: "var(--font-display)", fontSize: 22, fontWeight: 600 }}>{(selected.scoring.wert_complexity?.complexity ?? 3).toFixed(1)}/5</div></div>
              </div>
              <button onClick={() => onOpen(selected)} style={{ ...primaryBtn, marginTop: 12, width: "100%" }}>Open detail →</button>
            </div>
          )}
          <h4 style={{ ...subH, marginBottom: 10 }}>Phase legend</h4>
          {phases.map(p => (
            <div key={p} style={{ display: "flex", alignItems: "center", gap: 10, padding: "6px 0" }}>
              <span style={{ width: 10, height: 10, borderRadius: "50%", background: phaseColor[p] || "#94a3b8" }} />
              <span style={{ fontFamily: "var(--font-mono)", fontSize: 11, fontWeight: 600 }}>{p}</span>
              <span style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "#94a3b8", marginLeft: "auto" }}>{state.apps.filter(a => appPhase(a) === p).length} apps</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ════════════════════════════════════════════════════════════════════════════
// A5 — TCO / TVO
// ════════════════════════════════════════════════════════════════════════════
function TcoModel({ onOpen }) {
  const { state, setAppField, can } = useStore();
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("tco");
  const apps = useMemo(() => {
    let r = state.apps.filter(a => !search || a.name.toLowerCase().includes(search.toLowerCase()));
    r = [...r].sort((a, b) => {
      const av = a.scoring.tco_tvo?.[sort] || 0;
      const bv = b.scoring.tco_tvo?.[sort] || 0;
      return bv - av;
    });
    return r;
  }, [state.apps, search, sort]);

  const top20 = apps.filter(a => a.scoring.tco_tvo?.tco_total).slice(0, 20);
  const maxTco = Math.max(...top20.map(a => a.scoring.tco_tvo?.tco_total || 0), 1);

  return (
    <div style={{ background: "#fff", border: "1px solid #e2e8f0", padding: 24 }}>
      <ModelHeader title="TCO / TVO Analyse"
        desc="Total cost of ownership vs total value of ownership. Inline-edit any field. Top 20 apps by TCO appear in the bar chart."
        controls={<>
          <FilterSelect label="Sort by" value={sort} onChange={setSort}
            options={[{ value: "tco_total", label: "TCO" }, { value: "tvo_score", label: "TVO" }]} />
          <SearchBox value={search} onChange={setSearch} />
          <CsvBtn onClick={() => csvFromMatrix(state.apps, "tco")} />
        </>} />
      <div style={{ display: "grid", gridTemplateColumns: "1.4fr 1fr", gap: 24 }}>
        <div style={{ maxHeight: 640, overflow: "auto", border: "1px solid #e2e8f0" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontFamily: "var(--font-sans)" }}>
            <thead style={{ background: "#0f172a", color: "#fff", position: "sticky", top: 0 }}>
              <tr>
                <th style={{ ...thStyle, minWidth: 200 }}>App</th>
                <th style={thStyle}>TCO €</th>
                <th style={thStyle}>TVO</th>
                <th style={thStyle}>Status</th>
                <th style={thStyle}>Ratio</th>
              </tr>
            </thead>
            <tbody>
              {apps.map((a, i) => {
                const tco = a.scoring.tco_tvo?.tco_total || 0;
                const tvo = a.scoring.tco_tvo?.tvo_score || 0;
                const status = a.scoring.tco_tvo?.status || "Draft";
                const ratio = tco > 0 ? Math.round((tvo / (tco / 100000)) * 100) / 100 : null;
                return (
                  <tr key={a.id} style={{ borderBottom: "1px solid #f1f5f9", background: i % 2 ? "#fafbfc" : "#fff" }}>
                    <td style={{ padding: "8px 12px" }}>
                      <button onClick={() => onOpen(a)} style={{ background: "none", border: "none", padding: 0, textAlign: "left", cursor: "pointer", fontFamily: "inherit" }}>
                        <div style={{ fontFamily: "var(--font-mono)", fontSize: 9.5, color: "#94a3b8" }}>{a.id}</div>
                        <div style={{ fontSize: 13, fontWeight: 500, color: "#0f172a" }}>{a.name}</div>
                      </button>
                    </td>
                    <td style={{ padding: "6px 12px" }}>
                      <input type="number" value={tco || ""} placeholder="—" disabled={!can("edit", a)}
                        onChange={e => setAppField(a.id, "scoring.tco_tvo.tco_total", e.target.value ? parseFloat(e.target.value) : null)}
                        style={{ ...inputStyle, padding: "4px 6px", width: 110, fontFamily: "var(--font-mono)", fontSize: 12, textAlign: "right" }} />
                    </td>
                    <td style={{ padding: "6px 12px" }}>
                      <select value={tvo || ""} disabled={!can("edit", a)}
                        onChange={e => setAppField(a.id, "scoring.tco_tvo.tvo_score", e.target.value ? parseFloat(e.target.value) : null)}
                        style={{ ...inputStyle, padding: "4px 6px", width: 60, fontFamily: "var(--font-mono)", fontSize: 12 }}>
                        <option value="">—</option>
                        {[1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5].map(v => <option key={v}>{v}</option>)}
                      </select>
                    </td>
                    <td style={{ padding: "6px 12px" }}>
                      <select value={status} disabled={!can("edit", a)}
                        onChange={e => setAppField(a.id, "scoring.tco_tvo.status", e.target.value)}
                        style={{ ...inputStyle, padding: "4px 6px", fontSize: 11, fontFamily: "var(--font-mono)" }}>
                        <option>Draft</option><option>Validated</option><option>Approved</option>
                      </select>
                    </td>
                    <td style={{ padding: "6px 12px", fontFamily: "var(--font-mono)", fontSize: 12, color: ratio == null ? "#cbd5e1" : ratio > 5 ? "#16a34a" : ratio > 2 ? "#ca8a04" : "#dc2626", fontWeight: 600 }}>
                      {ratio == null ? "—" : ratio}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <div>
          <h4 style={{ ...subH, marginBottom: 10 }}>Top 20 by TCO</h4>
          {top20.length === 0 ? (
            <p style={{ fontSize: 13, color: "#94a3b8" }}>No TCO recorded yet.</p>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
              {top20.map(a => {
                const tco = a.scoring.tco_tvo?.tco_total || 0;
                const tvo = a.scoring.tco_tvo?.tvo_score || 0;
                return (
                  <div key={a.id}>
                    <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11, marginBottom: 2 }}>
                      <span style={{ fontWeight: 500 }}>{a.name}</span>
                      <span style={{ fontFamily: "var(--font-mono)", color: "#475569" }}>€{Math.round(tco / 1000)}k · {tvo}/5</span>
                    </div>
                    <div style={{ display: "flex", height: 12, gap: 1 }}>
                      <div style={{ width: (tco / maxTco * 100) + "%", background: "#0f172a", height: 12 }} />
                      <div style={{ width: ((tvo / 5) * (tco / maxTco) * 100) + "%", background: "#dc2626", height: 12 }} title={`TVO: ${tvo}/5`} />
                    </div>
                  </div>
                );
              })}
              <div style={{ marginTop: 14, display: "flex", gap: 14, fontFamily: "var(--font-mono)", fontSize: 10, color: "#64748b", letterSpacing: ".06em" }}>
                <span style={{ display: "flex", alignItems: "center", gap: 6 }}><span style={{ width: 14, height: 6, background: "#0f172a" }} />TCO</span>
                <span style={{ display: "flex", alignItems: "center", gap: 6 }}><span style={{ width: 14, height: 6, background: "#dc2626" }} />TVO weighting</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ════════════════════════════════════════════════════════════════════════════
// A6 — Cloud Readiness (4 TOGAF layers)
// ════════════════════════════════════════════════════════════════════════════
const LAYERS = [
  { id: "layer_I",   short: "I",   label: "Business" },
  { id: "layer_II",  short: "II",  label: "Information" },
  { id: "layer_III", short: "III", label: "Application" },
  { id: "layer_IV",  short: "IV",  label: "Technology" },
];
function CloudModel({ onOpen }) {
  const { state, setAppField, can } = useStore();
  const [scorFilter, setScorFilter] = useState("ALL");
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState(null);
  const apps = useMemo(() => state.apps.filter(a => {
    if (scorFilter !== "ALL" && a.scor_domain !== scorFilter) return false;
    if (search && !a.name.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  }), [state.apps, scorFilter, search]);

  function colorFor(delta) {
    if (delta == null || isNaN(delta)) return "#fafbfc";
    if (delta <= 0) return "#dcfce7";
    if (delta <= 15) return "#fef3c7";
    if (delta <= 35) return "#fed7aa";
    return "#fecaca";
  }
  // Alerts: layer_III ist < 40
  const alerts = apps.filter(a => (a.scoring.cloud_readiness_layers?.layer_III?.ist || 0) < 40 && a.future_roadmap !== "Discontinue");

  return (
    <div style={{ background: "#fff", border: "1px solid #e2e8f0", padding: 24 }}>
      <ModelHeader title="Cloud Readiness Assessment"
        desc="Ist vs Soll on the four TOGAF layers (Business, Information, Application, Technology). Click any cell to edit. Heatmap colours the gap Soll − Ist."
        controls={<>
          <FilterSelect label="SCOR" value={scorFilter} onChange={setScorFilter}
            options={[{ value: "ALL", label: "All" }, ...SCOR_DOMAIN_DEFS.map(d => ({ value: d.id, label: d.label }))]} />
          <SearchBox value={search} onChange={setSearch} />
          <CsvBtn onClick={() => csvFromMatrix(state.apps, "cloud")} />
        </>} />
      <div style={{ display: "grid", gridTemplateColumns: "1.4fr 1fr", gap: 24 }}>
        {/* Matrix */}
        <div style={{ maxHeight: 640, overflow: "auto", border: "1px solid #e2e8f0" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", minWidth: 700 }}>
            <thead style={{ background: "#0f172a", color: "#fff", position: "sticky", top: 0 }}>
              <tr>
                <th style={{ ...thStyle, minWidth: 220 }}>App</th>
                {LAYERS.map(l => <th key={l.id} style={{ ...thStyle, textAlign: "center" }}>{l.short}<div style={{ fontFamily: "var(--font-sans)", fontWeight: 400, fontSize: 9.5, color: "#cbd5e1", marginTop: 2 }}>{l.label}</div></th>)}
              </tr>
            </thead>
            <tbody>
              {apps.map((a, i) => (
                <tr key={a.id} style={{ borderBottom: "1px solid #f1f5f9", background: i % 2 ? "#fafbfc" : "#fff", cursor: "pointer" }} onClick={() => setSelected(a)}>
                  <td style={{ padding: "8px 12px" }}>
                    <div style={{ fontFamily: "var(--font-mono)", fontSize: 9.5, color: "#94a3b8" }}>{a.id}</div>
                    <div style={{ fontSize: 13, fontWeight: 500, color: "#0f172a" }}>{a.name}</div>
                  </td>
                  {LAYERS.map(l => {
                    const v = a.scoring.cloud_readiness_layers?.[l.id] || { ist: 0, soll: 0 };
                    const delta = v.soll - v.ist;
                    return (
                      <td key={l.id} style={{ padding: 2, textAlign: "center" }}>
                        <div style={{ background: colorFor(delta), padding: "6px 4px", fontFamily: "var(--font-mono)", fontSize: 11, color: "#0f172a" }}>
                          <div style={{ fontWeight: 700 }}>{v.ist}<span style={{ color: "#94a3b8" }}> → </span>{v.soll}</div>
                          <div style={{ fontSize: 9, color: "#475569", letterSpacing: ".06em" }}>Δ {delta > 0 ? "+" : ""}{delta}</div>
                        </div>
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {/* Right panel */}
        <div>
          {selected ? (
            <div style={{ background: "#fff", border: "1px solid #e2e8f0", padding: 18 }}>
              <div style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: "#dc2626", letterSpacing: ".15em", fontWeight: 700 }}>{selected.id}</div>
              <div style={{ fontFamily: "var(--font-display)", fontSize: 22, fontWeight: 500, marginTop: 4, letterSpacing: "-0.02em" }}>{selected.name}</div>
              <div style={{ marginTop: 18, display: "flex", flexDirection: "column", gap: 14 }}>
                {LAYERS.map(l => {
                  const v = selected.scoring.cloud_readiness_layers?.[l.id] || { ist: 0, soll: 0 };
                  return (
                    <div key={l.id}>
                      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                        <span style={{ fontFamily: "var(--font-mono)", fontSize: 11, fontWeight: 700, letterSpacing: ".06em" }}>{l.short} · {l.label}</span>
                        <span style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "#0f172a" }}>{v.ist}% <span style={{ color: "#94a3b8" }}>→</span> <span style={{ color: "#dc2626" }}>{v.soll}%</span></span>
                      </div>
                      <div style={{ position: "relative", height: 14, background: "#f1f5f9" }}>
                        <div style={{ position: "absolute", left: 0, top: 0, height: 14, width: v.soll + "%", background: "#fecaca" }} />
                        <div style={{ position: "absolute", left: 0, top: 4, height: 6, width: v.ist + "%", background: "#0f172a" }} />
                      </div>
                      {can("edit", selected) && (
                        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginTop: 6 }}>
                          <input type="range" min="0" max="100" value={v.ist} onChange={e => setAppField(selected.id, `scoring.cloud_readiness_layers.${l.id}.ist`, parseInt(e.target.value))} />
                          <input type="range" min="0" max="100" value={v.soll} onChange={e => setAppField(selected.id, `scoring.cloud_readiness_layers.${l.id}.soll`, parseInt(e.target.value))} />
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
              <button onClick={() => onOpen(selected)} style={{ ...primaryBtn, marginTop: 16, width: "100%" }}>Open detail →</button>
            </div>
          ) : (
            <div style={{ background: "#fafbfc", border: "1px dashed #cbd5e1", padding: 24, textAlign: "center", color: "#94a3b8", fontSize: 13 }}>
              Click any row to edit its 4-layer readiness.
            </div>
          )}
          {alerts.length > 0 && (
            <div style={{ marginTop: 14, background: "#fef2f2", border: "1px solid #fecaca", padding: 14 }}>
              <div style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: "#7f1d1d", fontWeight: 700, letterSpacing: ".15em" }}>⚠ {alerts.length} APPS</div>
              <div style={{ fontSize: 12, color: "#7f1d1d", marginTop: 4 }}>Application layer (III) below 40% Ist — migration risky.</div>
              <div style={{ marginTop: 10, display: "flex", flexDirection: "column", gap: 4 }}>
                {alerts.slice(0, 6).map(a => (
                  <button key={a.id} onClick={() => onOpen(a)} style={{ background: "none", border: "none", textAlign: "left", padding: "3px 0", fontSize: 12, color: "#7f1d1d", cursor: "pointer", fontFamily: "inherit", textDecoration: "underline" }}>
                    {a.name} <span style={{ fontFamily: "var(--font-mono)", fontSize: 10 }}>· III {a.scoring.cloud_readiness_layers?.layer_III?.ist || 0}%</span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── Shared helpers ─────────────────────────────────────────────────────────
function ModelHeader({ title, desc, controls }) {
  return (
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 18, gap: 24 }}>
      <div style={{ flex: 1 }}>
        <h3 style={HEADER_STYLE}>{title}</h3>
        <p style={{ fontSize: 13, color: "#64748b", marginTop: 4, maxWidth: 720, lineHeight: 1.5 }}>{desc}</p>
      </div>
      <div style={{ display: "flex", gap: 10, alignItems: "flex-end" }}>{controls}</div>
    </div>
  );
}
function SearchBox({ value, onChange }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
      <span style={{ fontFamily: "var(--font-mono)", fontSize: 9.5, color: "#64748b", letterSpacing: ".12em", textTransform: "uppercase", fontWeight: 600 }}>Search</span>
      <input value={value} onChange={e => onChange(e.target.value)} placeholder="Name…" style={{ ...inputStyle, minWidth: 180 }} />
    </div>
  );
}
function CsvBtn({ onClick }) {
  return <button onClick={onClick} style={ghostBtnSm}>↓ CSV</button>;
}
const thStyle = { textAlign: "left", padding: "10px 12px", fontFamily: "var(--font-mono)", fontSize: 10, fontWeight: 600, letterSpacing: ".12em", textTransform: "uppercase", whiteSpace: "nowrap" };

function csvFromMatrix(apps, model) {
  const rows = [];
  if (model === "scor") {
    rows.push(["id", "name", ...SCOR_DOMAIN_DEFS.map(d => d.id), "total"].join(","));
    apps.forEach(a => rows.push([a.id, csv(a.name), ...SCOR_DOMAIN_DEFS.map(d => a.scoring.scor_process?.[d.id] || 0),
      SCOR_DOMAIN_DEFS.reduce((s, d) => s + (a.scoring.scor_process?.[d.id] || 0), 0)].join(",")));
  } else if (model === "pace") {
    rows.push(["id", "name", "pace_layer"].join(","));
    apps.forEach(a => rows.push([a.id, csv(a.name), a.scoring.pace_layer || ""].join(",")));
  } else if (model === "time") {
    rows.push(["id", "name", "time", "tech", "value", "notes"].join(","));
    apps.forEach(a => rows.push([a.id, csv(a.name), a.scoring.time || "", a.scoring.bva.technical, a.scoring.bva.business, csv(a.scoring.notes?.time || "")].join(",")));
  } else if (model === "wert") {
    rows.push(["id", "name", "value", "complexity", "quadrant"].join(","));
    apps.forEach(a => { const w = a.scoring.wert_complexity || {}; rows.push([a.id, csv(a.name), w.value || "", w.complexity || "", w.quadrant || ""].join(",")); });
  } else if (model === "tco") {
    rows.push(["id", "name", "tco_total", "tvo_score", "status"].join(","));
    apps.forEach(a => { const t = a.scoring.tco_tvo || {}; rows.push([a.id, csv(a.name), t.tco_total || "", t.tvo_score || "", t.status || ""].join(",")); });
  } else if (model === "cloud") {
    rows.push(["id", "name", ...LAYERS.flatMap(l => [`${l.short}_ist`, `${l.short}_soll`])].join(","));
    apps.forEach(a => { const c = a.scoring.cloud_readiness_layers || {}; rows.push([a.id, csv(a.name), ...LAYERS.flatMap(l => [c[l.id]?.ist || 0, c[l.id]?.soll || 0])].join(",")); });
  }
  const blob = new Blob([rows.join("\n")], { type: "text/csv" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a"); a.href = url; a.download = `bewertung-${model}-${new Date().toISOString().slice(0,10)}.csv`; a.click();
  URL.revokeObjectURL(url);
}
function csv(s) { return `"${String(s || "").replace(/"/g, '""')}"`; }

window.Bewertung = Bewertung;
