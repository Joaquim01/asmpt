// Scoring — TIME quadrant connected to the central store. Dragging an app
// updates its time_x/time_y AND derives scoring.time → persists everywhere.
function Scoring({ onOpen }) {
  const { state, updateApp, can } = useStore();
  const apps = state.apps;
  const [process, setProcess] = useState("ALL");
  const [scor, setScor] = useState("ALL");
  const [hover, setHover] = useState(null);
  const [selected, setSelected] = useState(null);
  const [draggedId, setDraggedId] = useState(null);
  const plotRef = useRef(null);

  const filtered = useMemo(() => apps.filter(a => {
    if (process !== "ALL" && !(a.processes || []).includes(process)) return false;
    if (scor !== "ALL" && a.scor_domain !== scor) return false;
    return true;
  }), [apps, process, scor]);

  function deriveTime(x, y) {
    if (x >= 50 && y >= 50) return "Invest";
    if (x < 50 && y >= 50) return "Migrate";
    if (x < 50 && y < 50) return "Tolerate";
    return "Eliminate";
  }
  function onMouseDown(e, app) {
    if (!can("edit", app)) return;
    e.preventDefault();
    setDraggedId(app.id);
    setSelected(app);
  }
  useEffect(() => {
    if (!draggedId) return;
    function onMove(e) {
      const rect = plotRef.current.getBoundingClientRect();
      const x = Math.max(2, Math.min(98, ((e.clientX - rect.left) / rect.width) * 100));
      const y = Math.max(2, Math.min(98, 100 - ((e.clientY - rect.top) / rect.height) * 100));
      updateApp(draggedId, { time_x: x, time_y: y, scoring: { ...apps.find(a => a.id === draggedId).scoring, time: deriveTime(x, y) } });
    }
    function onUp() { setDraggedId(null); }
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onUp);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", onUp);
    };
  }, [draggedId, apps]);

  const quad = useMemo(() => {
    const q = { Tolerate: [], Invest: [], Migrate: [], Eliminate: [] };
    filtered.forEach(a => {
      const t = deriveTime(a.time_x ?? 50, a.time_y ?? 50);
      q[t].push(a);
    });
    return q;
  }, [filtered]);

  return (
    <div style={{ padding: "32px 40px 80px", maxWidth: 1700, margin: "0 auto" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 24 }}>
        <div>
          <div style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "#dc2626", letterSpacing: ".18em", textTransform: "uppercase", fontWeight: 600, marginBottom: 8 }}>§ 03 / Bewertung</div>
          <h1 style={{ fontFamily: "var(--font-display)", fontSize: 56, fontWeight: 400, lineHeight: 1, letterSpacing: "-0.035em", color: "#0f172a" }}>TIME quadrant assessment.</h1>
          <p style={{ marginTop: 12, fontSize: 14, color: "#475569", maxWidth: 820, lineHeight: 1.5 }}>
            <strong>Tolerate · Invest · Migrate · Eliminate</strong>. Drag any application to score it. The matrix position and the derived TIME label are written to the central store.
          </p>
        </div>
        <div style={{ display: "flex", gap: 12 }}>
          <FilterSelect label="Process" value={process} onChange={setProcess}
            options={[{ value: "ALL", label: "All" }, ...window.ASMPT_DATA.processes.map(p => ({ value: p.id, label: p.id }))]} />
          <FilterSelect label="SCOR" value={scor} onChange={setScor}
            options={[{ value: "ALL", label: "All" }, ...SCOR_DOMAIN_DEFS.map(d => ({ value: d.id, label: d.label }))]} />
        </div>
      </div>
      <div style={{ height: 1, background: "#0f172a", marginBottom: 32 }} />

      <div style={{ display: "grid", gridTemplateColumns: "1fr 360px", gap: 32 }}>
        <div style={{ background: "#fff", border: "1px solid #e2e8f0", padding: 28 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 18 }}>
            <h3 style={{ fontFamily: "var(--font-display)", fontSize: 22, fontWeight: 500, letterSpacing: "-0.02em", color: "#0f172a" }}>TIME matrix</h3>
            <span style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "#64748b" }}>{filtered.length} apps · drag to re-score</span>
          </div>
          <div style={{ display: "flex" }}>
            <div style={{ width: 24, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <span style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: "#64748b", letterSpacing: ".18em", transform: "rotate(-90deg)", whiteSpace: "nowrap", fontWeight: 600 }}>BUSINESS VALUE →</span>
            </div>
            <div ref={plotRef} style={{ position: "relative", flex: 1, aspectRatio: "1 / 0.78", background: "#fafbfc", border: "1px solid #cbd5e1", overflow: "hidden", userSelect: "none", cursor: draggedId ? "grabbing" : "default" }}>
              <div style={{ position: "absolute", left: 0, top: 0, width: "50%", height: "50%", background: "rgba(234,88,12,.05)" }} />
              <div style={{ position: "absolute", left: "50%", top: 0, width: "50%", height: "50%", background: "rgba(22,163,74,.05)" }} />
              <div style={{ position: "absolute", left: 0, top: "50%", width: "50%", height: "50%", background: "rgba(100,116,139,.04)" }} />
              <div style={{ position: "absolute", left: "50%", top: "50%", width: "50%", height: "50%", background: "rgba(220,38,38,.05)" }} />
              {[25, 50, 75].map(p => (
                <React.Fragment key={p}>
                  <div style={{ position: "absolute", left: p + "%", top: 0, width: 1, height: "100%", background: p === 50 ? "#0f172a" : "#e2e8f0" }} />
                  <div style={{ position: "absolute", top: p + "%", left: 0, height: 1, width: "100%", background: p === 50 ? "#0f172a" : "#e2e8f0" }} />
                </React.Fragment>
              ))}
              <QLabel pos={{ top: 14, left: 14 }} label="MIGRATE" sub="High value, low fit" color="#ea580c" />
              <QLabel pos={{ top: 14, right: 14 }} label="INVEST" sub="High value, high fit" color="#16a34a" align="right" />
              <QLabel pos={{ bottom: 14, left: 14 }} label="TOLERATE" sub="Low value, low fit" color="#64748b" />
              <QLabel pos={{ bottom: 14, right: 14 }} label="ELIMINATE" sub="Low value, high fit" color="#dc2626" align="right" />
              {filtered.map(a => {
                const x = a.time_x ?? 50, y = a.time_y ?? 50;
                const c = ROADMAP_COLORS[a.roadmap]?.dot || "#64748b";
                const isHover = hover && hover.id === a.id;
                const isSel = selected && selected.id === a.id;
                const r = isHover || isSel ? 11 : 7;
                return (
                  <div key={a.id}
                    onMouseDown={e => onMouseDown(e, a)}
                    onMouseEnter={() => setHover(a)}
                    onMouseLeave={() => setHover(null)}
                    style={{
                      position: "absolute", left: `calc(${x}% - ${r}px)`, top: `calc(${100 - y}% - ${r}px)`,
                      width: r * 2, height: r * 2, borderRadius: "50%",
                      background: c, border: "2px solid #fff",
                      boxShadow: isSel ? "0 0 0 2px #0f172a" : isHover ? "0 0 0 2px " + c + "55" : "0 1px 3px rgba(0,0,0,.2)",
                      cursor: can("edit", a) ? (draggedId === a.id ? "grabbing" : "grab") : "default",
                      zIndex: isSel ? 10 : isHover ? 9 : 1,
                    }} />
                );
              })}
              {hover && (() => {
                const x = hover.time_x ?? 50, y = hover.time_y ?? 50;
                return (
                  <div style={{
                    position: "absolute", left: `calc(${x}% + 14px)`, top: `calc(${100 - y}% - 8px)`,
                    background: "#0f172a", color: "#fff", padding: "8px 12px", fontSize: 12, zIndex: 20, pointerEvents: "none", maxWidth: 260,
                  }}>
                    <div style={{ fontFamily: "var(--font-mono)", fontSize: 9, color: "#fca5a5", letterSpacing: ".12em", fontWeight: 600 }}>{hover.id} · {hover.roadmap}</div>
                    <div style={{ fontWeight: 500, marginTop: 2 }}>{hover.name}</div>
                  </div>
                );
              })()}
            </div>
          </div>
          <div style={{ display: "flex", justifyContent: "center", marginTop: 12, fontFamily: "var(--font-mono)", fontSize: 10, color: "#64748b", letterSpacing: ".18em", fontWeight: 600 }}>
            TECHNICAL FIT →
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div style={{ background: "#fff", border: "1px solid #e2e8f0", padding: 22 }}>
            <h4 style={{ fontFamily: "var(--font-mono)", fontSize: 10.5, color: "#64748b", letterSpacing: ".14em", textTransform: "uppercase", fontWeight: 600, marginBottom: 14 }}>Distribution</h4>
            {[{ k: "Invest", c: "#16a34a" }, { k: "Migrate", c: "#ea580c" }, { k: "Tolerate", c: "#64748b" }, { k: "Eliminate", c: "#dc2626" }].map(q => (
              <div key={q.k} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "10px 0", borderBottom: "1px dotted #cbd5e1" }}>
                <span style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <span style={{ width: 10, height: 10, borderRadius: "50%", background: q.c }} />
                  <span style={{ fontFamily: "var(--font-mono)", fontSize: 11, fontWeight: 700, letterSpacing: ".06em", color: "#0f172a" }}>{q.k.toUpperCase()}</span>
                </span>
                <span style={{ fontFamily: "var(--font-display)", fontSize: 22, fontWeight: 600, color: "#0f172a" }}>{quad[q.k].length}</span>
              </div>
            ))}
          </div>
          {selected ? (
            <div style={{ background: "#0f172a", color: "#fff", padding: 22 }}>
              <div style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: "#fca5a5", letterSpacing: ".15em", fontWeight: 700 }}>{selected.id} · SELECTED</div>
              <h4 style={{ fontFamily: "var(--font-display)", fontSize: 24, fontWeight: 500, marginTop: 6, letterSpacing: "-0.02em" }}>{selected.name}</h4>
              <p style={{ fontSize: 12, color: "#cbd5e1", marginTop: 6, lineHeight: 1.5 }}>{(selected.description || "").slice(0, 140)}{(selected.description || "").length > 140 ? "…" : ""}</p>
              <button onClick={() => onOpen(selected)} style={{ marginTop: 16, padding: "8px 14px", fontFamily: "var(--font-mono)", fontSize: 11, fontWeight: 600, letterSpacing: ".08em", textTransform: "uppercase", background: "#dc2626", color: "#fff", border: "none", cursor: "pointer", width: "100%" }}>Open full detail →</button>
            </div>
          ) : (
            <div style={{ background: "#fff", border: "1px dashed #cbd5e1", padding: 24, textAlign: "center", color: "#94a3b8", fontSize: 13 }}>Click any point to inspect it.</div>
          )}
          <div style={{ background: "#fff", border: "1px solid #e2e8f0", padding: 22 }}>
            <h4 style={{ fontFamily: "var(--font-mono)", fontSize: 10.5, color: "#64748b", letterSpacing: ".14em", textTransform: "uppercase", fontWeight: 600, marginBottom: 14 }}>Color = roadmap</h4>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {["Growth","Introduction","Sustain","Replace","Discontinue"].map(s => (
                <div key={s} style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <span style={{ width: 12, height: 12, borderRadius: "50%", background: ROADMAP_COLORS[s].dot, border: "2px solid #fff", boxShadow: "0 0 0 1px " + ROADMAP_COLORS[s].dot }} />
                  <span style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "#0f172a", fontWeight: 600, letterSpacing: ".04em" }}>{s}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function QLabel({ pos, label, sub, color, align = "left" }) {
  return (
    <div style={{ position: "absolute", ...pos, textAlign: align, pointerEvents: "none" }}>
      <div style={{ fontFamily: "var(--font-mono)", fontSize: 10, fontWeight: 700, letterSpacing: ".18em", color }}>{label}</div>
      <div style={{ fontFamily: "var(--font-display)", fontSize: 11, color: "#64748b", marginTop: 2 }}>{sub}</div>
    </div>
  );
}

window.Scoring = Scoring;
