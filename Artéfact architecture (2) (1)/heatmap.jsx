// HEATMAP — interactive decision tool.
// • Points are draggable directly on the plot. Drag updates the underlying
//   store fields mapped to the current axes (B1).
// • Drop on a category card categorises the app — it then VANISHES from the
//   plot and shows up in the card; click × in the card to re-surface (B2).
// • Axis presets quickly load TIME / Wert-Komplexität / Cloud / SCOR / TCO/TVO (B4).

function Heatmap({ onOpen }) {
  const { state, setAppField, setHeatmapCategory, can } = useStore();
  const apps = state.apps;
  const cats = state.heatmap_categories;
  const [preset, setPreset] = useState("time");
  const [axisX, setAxisX] = useState(AXIS_PRESETS[0].x);
  const [axisY, setAxisY] = useState(AXIS_PRESETS[0].y);
  const [colorBy, setColorBy] = useState("roadmap");
  const [search, setSearch] = useState("");
  const [scorFilter, setScorFilter] = useState("ALL");
  const [hover, setHover] = useState(null);
  const [drag, setDrag] = useState(null); // { id, x, y, overCat }
  const [confirmCat, setConfirmCat] = useState(null); // { app, catId }
  const plotRef = useRef(null);
  const dragInfo = useRef(null);

  // Load a preset
  function loadPreset(id) {
    setPreset(id);
    const p = AXIS_PRESETS.find(x => x.id === id);
    if (p) { setAxisX(p.x); setAxisY(p.y); }
  }
  // Manual axis changes deselect the preset chip
  function pickAxis(side, val) {
    if (side === "x") setAxisX(val); else setAxisY(val);
    const p = AXIS_PRESETS.find(p => (side === "x" ? p.x : p.y) === val);
    setPreset(p ? p.id : "custom");
  }

  const xDef = AXES[axisX], yDef = AXES[axisY];
  const activePreset = AXIS_PRESETS.find(p => p.id === preset);

  // Filtered set: respects search, SCOR filter, AND excludes categorised apps
  // (categorised ones live in the category cards — see B2 spec)
  const visible = useMemo(() => apps.filter(a => {
    if (a.heatmap_category) return false;
    if (search && !a.name.toLowerCase().includes(search.toLowerCase()) && !(a.provider || "").toLowerCase().includes(search.toLowerCase())) return false;
    if (scorFilter !== "ALL" && a.scor_domain !== scorFilter) return false;
    return true;
  }), [apps, search, scorFilter]);

  const w = state.bva_weights;
  function getXY(a) {
    const xv = xDef.get(a, w);
    const yv = yDef.get(a, w);
    return { xv, yv, x: (xv / xDef.max) * 100, y: (yv / yDef.max) * 100 };
  }

  function colorFor(a) {
    if (colorBy === "roadmap") return ROADMAP_COLORS[a.roadmap]?.dot || "#64748b";
    if (colorBy === "scor")    return SCOR_DOMAIN_DEFS.find(d => d.id === a.scor_domain)?.color || "#64748b";
    if (colorBy === "time") {
      const t = a.scoring.time;
      return t === "Tolerate" ? "#64748b" : t === "Invest" ? "#2563eb" : t === "Migrate" ? "#ca8a04" : t === "Eliminate" ? "#dc2626" : "#cbd5e1";
    }
    if (colorBy === "pace") {
      const p = a.scoring.pace_layer;
      return p === "SoR" ? "#1e3a8a" : p === "SoD" ? "#7c3aed" : p === "SoI" ? "#ea580c" : "#cbd5e1";
    }
    return "#64748b";
  }

  // ─── Drag: start on a point, move re-positions, drop persists / categorises
  function onPointDown(e, a) {
    if (!can("edit", a)) return;
    e.preventDefault();
    e.stopPropagation();
    const rect = plotRef.current.getBoundingClientRect();
    dragInfo.current = { id: a.id, rect, startedAt: Date.now() };
    const { x, y } = getXY(a);
    setDrag({ id: a.id, x, y, overCat: null });
  }

  useEffect(() => {
    if (!drag) return;
    function onMove(e) {
      const rect = dragInfo.current.rect;
      const x = Math.max(0, Math.min(100, ((e.clientX - rect.left) / rect.width) * 100));
      const y = Math.max(0, Math.min(100, 100 - ((e.clientY - rect.top) / rect.height) * 100));
      // Detect hover over category card (data-cat-id)
      const el = document.elementFromPoint(e.clientX, e.clientY);
      const card = el?.closest("[data-cat-id]");
      setDrag(d => ({ ...d, x, y, overCat: card?.dataset.catId || null }));
    }
    function onUp() {
      const d = drag;
      const a = apps.find(x => x.id === d.id);
      if (d.overCat && d.overCat !== "_none") {
        // Dropped on a category card — categorise. Ask for confirmation if axis is Wert preset.
        if (preset === "wert" && activePreset?.quadrants) {
          // auto-suggest based on quadrant
          setConfirmCat({ app: a, catId: d.overCat });
        } else {
          setHeatmapCategory(d.id, d.overCat);
        }
      } else if (d.overCat === "_none") {
        // explicit drop on "Unassigned" — do nothing (already there if uncategorised)
      } else if (Date.now() - dragInfo.current.startedAt > 120) {
        // Genuine drag on plot → persist new X/Y to underlying store fields
        if (xDef.editable && xDef.path) {
          const newX = clampToStep((d.x / 100) * xDef.max, xDef.step);
          setAppField(d.id, xDef.path(a), newX);
        }
        if (yDef.editable && yDef.path) {
          const newY = clampToStep((d.y / 100) * yDef.max, yDef.step);
          setAppField(d.id, yDef.path(a), newY);
        }
      } else {
        // click rather than drag → open detail
        onOpen(a);
      }
      setDrag(null);
      dragInfo.current = null;
    }
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onUp);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", onUp);
    };
  }, [drag, apps, xDef, yDef, preset, activePreset]);

  // Group categorised apps per category
  const byCat = useMemo(() => {
    const o = { _none: [] };
    cats.forEach(c => o[c.id] = []);
    apps.forEach(a => { if (a.heatmap_category && o[a.heatmap_category]) o[a.heatmap_category].push(a); });
    return o;
  }, [apps, cats]);

  return (
    <div style={{ padding: "32px 40px 80px", maxWidth: 1750, margin: "0 auto" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 24 }}>
        <div>
          <div style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "#dc2626", letterSpacing: ".18em", textTransform: "uppercase", fontWeight: 600, marginBottom: 8 }}>§ 04 / Heatmap</div>
          <h1 style={{ fontFamily: "var(--font-display)", fontSize: 56, fontWeight: 400, lineHeight: 1, letterSpacing: "-0.035em", color: "#0f172a" }}>Decision matrix.</h1>
          <p style={{ marginTop: 12, fontSize: 14, color: "#475569", maxWidth: 860, lineHeight: 1.5 }}>
            Drag any point <strong>on the plot</strong> to re-score it — coordinates persist to the matching store fields.
            Drop a point on a <strong>category card</strong> to file the decision; the point disappears from the plot until you remove it from the card.
          </p>
        </div>
      </div>
      <div style={{ height: 1, background: "#0f172a", marginBottom: 24 }} />

      {/* Presets */}
      <div style={{ display: "flex", gap: 6, marginBottom: 18, flexWrap: "wrap" }}>
        <span style={{ alignSelf: "center", fontFamily: "var(--font-mono)", fontSize: 9.5, color: "#64748b", letterSpacing: ".12em", textTransform: "uppercase", fontWeight: 600, marginRight: 8 }}>Preset</span>
        {AXIS_PRESETS.map(p => (
          <button key={p.id} onClick={() => loadPreset(p.id)}
            style={{ padding: "6px 12px", fontFamily: "var(--font-mono)", fontSize: 10.5, fontWeight: 600, letterSpacing: ".06em", textTransform: "uppercase",
              background: preset === p.id ? "#0f172a" : "#fff", color: preset === p.id ? "#fff" : "#0f172a",
              border: "1px solid " + (preset === p.id ? "#0f172a" : "#cbd5e1"), cursor: "pointer" }}>{p.label}</button>
        ))}
      </div>

      {/* Axis + filter toolbar */}
      <div style={{ display: "flex", gap: 14, alignItems: "flex-end", marginBottom: 20, flexWrap: "wrap", padding: "14px 18px", background: "#fff", border: "1px solid #e2e8f0" }}>
        <FilterSelect label="X axis" value={axisX} onChange={v => pickAxis("x", v)}
          options={Object.entries(AXES).map(([k, v]) => ({ value: k, label: v.label + (v.editable ? "" : " · read-only") }))} />
        <FilterSelect label="Y axis" value={axisY} onChange={v => pickAxis("y", v)}
          options={Object.entries(AXES).map(([k, v]) => ({ value: k, label: v.label + (v.editable ? "" : " · read-only") }))} />
        <FilterSelect label="Color by" value={colorBy} onChange={setColorBy}
          options={[{ value: "roadmap", label: "Roadmap" }, { value: "scor", label: "SCOR" }, { value: "time", label: "TIME" }, { value: "pace", label: "PACE" }]} />
        <FilterSelect label="SCOR" value={scorFilter} onChange={setScorFilter}
          options={[{ value: "ALL", label: "All" }, ...SCOR_DOMAIN_DEFS.map(d => ({ value: d.id, label: d.label }))]} />
        <div style={{ flex: "1 1 200px", display: "flex", flexDirection: "column", gap: 4 }}>
          <span style={{ fontFamily: "var(--font-mono)", fontSize: 9.5, color: "#64748b", letterSpacing: ".12em", textTransform: "uppercase", fontWeight: 600 }}>Search</span>
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Name or provider…" style={inputStyle} />
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 300px", gap: 24 }}>
        {/* PLOT */}
        <div style={{ background: "#fff", border: "1px solid #e2e8f0", padding: 28 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 18 }}>
            <h3 style={{ fontFamily: "var(--font-display)", fontSize: 22, fontWeight: 500, letterSpacing: "-0.02em" }}>
              {yDef.label} <span style={{ color: "#94a3b8" }}>×</span> {xDef.label}
            </h3>
            <span style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "#64748b" }}>
              {visible.length} on plot · {apps.length - visible.length} in cards
            </span>
          </div>
          <div style={{ display: "flex", alignItems: "stretch", gap: 12 }}>
            <div style={{ writingMode: "vertical-rl", transform: "rotate(180deg)", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "var(--font-mono)", fontSize: 10, color: "#64748b", letterSpacing: ".18em", whiteSpace: "nowrap", fontWeight: 600 }}>
              {yDef.label.toUpperCase()} →
            </div>
            <div ref={plotRef} style={{ position: "relative", flex: 1, aspectRatio: "1 / 0.78", background: "#fafbfc", border: "1px solid #cbd5e1", overflow: "hidden", userSelect: "none", cursor: drag ? "grabbing" : "default" }}>
              {/* Quadrant tinting & labels */}
              {activePreset?.quadrants ? activePreset.quadrants.map((q, i) => (
                <div key={i} style={{ position: "absolute", left: q.x + "%", top: (100 - q.y - 50) + "%", width: "50%", height: "50%", background: q.color + "10" }}>
                  <span style={{ position: "absolute", top: 10, left: 10, fontFamily: "var(--font-mono)", fontSize: 10, fontWeight: 700, letterSpacing: ".18em", color: q.color }}>{q.label}</span>
                </div>
              )) : null}
              {/* Gridlines */}
              {[25, 50, 75].map(p => (
                <React.Fragment key={p}>
                  <div style={{ position: "absolute", left: p + "%", top: 0, width: 1, height: "100%", background: p === 50 ? "#0f172a" : "#e2e8f0" }} />
                  <div style={{ position: "absolute", top: p + "%", left: 0, height: 1, width: "100%", background: p === 50 ? "#0f172a" : "#e2e8f0" }} />
                </React.Fragment>
              ))}
              {/* Threshold crosshair lines at 50% so user sees the quadrant split */}
              {activePreset?.quadrants && (
                <>
                  <div style={{ position: "absolute", left: "50%", top: 0, width: 1, height: "100%", background: "#0f172a", pointerEvents: "none" }} />
                  <div style={{ position: "absolute", top: "50%", left: 0, height: 1, width: "100%", background: "#0f172a", pointerEvents: "none" }} />
                </>
              )}
              {/* Live crosshair while dragging */}
              {drag && (
                <>
                  <div style={{ position: "absolute", left: drag.x + "%", top: 0, width: 1, height: "100%", background: "#dc2626", opacity: .6, pointerEvents: "none" }} />
                  <div style={{ position: "absolute", top: (100 - drag.y) + "%", left: 0, height: 1, width: "100%", background: "#dc2626", opacity: .6, pointerEvents: "none" }} />
                </>
              )}
              {/* Points */}
              {visible.map(a => {
                const live = drag && drag.id === a.id;
                const p = live ? { x: drag.x, y: drag.y, xv: (drag.x / 100) * xDef.max, yv: (drag.y / 100) * yDef.max } : getXY(a);
                const jit = live ? { x: 0, y: 0 } : jitterFor(a.id, 5);
                const r = (hover === a.id || live) ? 10 : 6.5;
                const c = colorFor(a);
                const transparent = drag && drag.id === a.id && drag.overCat;
                return (
                  <div key={a.id}
                    onMouseDown={e => onPointDown(e, a)}
                    onMouseEnter={() => setHover(a.id)}
                    onMouseLeave={() => setHover(null)}
                    style={{
                      position: "absolute",
                      left: `calc(${p.x}% - ${r}px + ${jit.x}px)`,
                      top: `calc(${100 - p.y}% - ${r}px + ${jit.y}px)`,
                      width: r * 2, height: r * 2, borderRadius: "50%",
                      background: c, border: "2px solid #fff",
                      opacity: transparent ? 0.45 : 1,
                      boxShadow: live ? "0 0 0 3px #dc2626, 0 4px 12px rgba(0,0,0,.25)" : hover === a.id ? "0 0 0 2px " + c + "55" : "0 1px 3px rgba(0,0,0,.2)",
                      cursor: can("edit", a) ? "grab" : "pointer",
                      zIndex: live ? 20 : hover === a.id ? 10 : 1,
                    }} />
                );
              })}
              {/* Drag tooltip */}
              {drag && (() => {
                const a = apps.find(x => x.id === drag.id);
                if (!a) return null;
                const xVal = (drag.x / 100) * xDef.max;
                const yVal = (drag.y / 100) * yDef.max;
                return (
                  <div style={{
                    position: "absolute", left: `calc(${drag.x}% + 14px)`, top: `calc(${100 - drag.y}% - 8px)`,
                    background: "#0f172a", color: "#fff", padding: "8px 12px", fontSize: 12, zIndex: 30, pointerEvents: "none", maxWidth: 280,
                  }}>
                    <div style={{ fontFamily: "var(--font-mono)", fontSize: 9, color: "#fca5a5", letterSpacing: ".12em", fontWeight: 600 }}>{a.id} · {drag.overCat && drag.overCat !== "_none" ? "→ DROP TO CATEGORISE" : "DRAGGING"}</div>
                    <div style={{ fontWeight: 500, marginTop: 2 }}>{a.name}</div>
                    <div style={{ fontSize: 11, color: "#94a3b8", marginTop: 6, fontFamily: "var(--font-mono)" }}>
                      {xDef.label}: <strong style={{ color: "#fff" }}>{formatVal(xVal, xDef)}</strong><br />
                      {yDef.label}: <strong style={{ color: "#fff" }}>{formatVal(yVal, yDef)}</strong>
                    </div>
                  </div>
                );
              })()}
              {/* Hover tooltip (no drag) */}
              {!drag && hover && (() => {
                const a = visible.find(x => x.id === hover);
                if (!a) return null;
                const p = getXY(a);
                return (
                  <div style={{
                    position: "absolute", left: `calc(${p.x}% + 14px)`, top: `calc(${100 - p.y}% - 8px)`,
                    background: "#0f172a", color: "#fff", padding: "8px 12px", fontSize: 12, zIndex: 30, pointerEvents: "none", maxWidth: 280,
                  }}>
                    <div style={{ fontFamily: "var(--font-mono)", fontSize: 9, color: "#fca5a5", letterSpacing: ".12em", fontWeight: 600 }}>{a.id} · {a.scor_domain}</div>
                    <div style={{ fontWeight: 500, marginTop: 2 }}>{a.name}</div>
                    <div style={{ fontSize: 11, color: "#94a3b8", marginTop: 4 }}>{xDef.label} {formatVal(p.xv, xDef)} · {yDef.label} {formatVal(p.yv, yDef)}</div>
                  </div>
                );
              })()}
            </div>
          </div>
          <div style={{ display: "flex", justifyContent: "center", marginTop: 10, fontFamily: "var(--font-mono)", fontSize: 10, color: "#64748b", letterSpacing: ".18em", fontWeight: 600 }}>
            {xDef.label.toUpperCase()} →
          </div>
          {(!xDef.editable || !yDef.editable) && (
            <div style={{ marginTop: 12, padding: "8px 12px", background: "#fef3c7", fontFamily: "var(--font-mono)", fontSize: 10.5, color: "#7c2d12", letterSpacing: ".04em" }}>
              ⚠ At least one axis is read-only — dragging will not persist coordinates. Pick editable axes to re-score apps directly on the plot.
            </div>
          )}
        </div>

        {/* Right column legend */}
        <div style={{ background: "#fff", border: "1px solid #e2e8f0", padding: 20, height: "fit-content" }}>
          <h4 style={{ fontFamily: "var(--font-mono)", fontSize: 10.5, color: "#64748b", letterSpacing: ".14em", textTransform: "uppercase", fontWeight: 600, marginBottom: 14 }}>Color by {colorBy}</h4>
          <Legend colorBy={colorBy} cats={cats} />
        </div>
      </div>

      {/* CATEGORY DROP CARDS */}
      <div style={{ marginTop: 28 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 14 }}>
          <div>
            <h3 style={{ fontFamily: "var(--font-display)", fontSize: 28, fontWeight: 500, letterSpacing: "-0.02em" }}>Decisions</h3>
            <p style={{ fontSize: 13, color: "#64748b", marginTop: 4 }}>
              Drag any point from the plot above onto a card. The app vanishes from the plot and lands here. Click <strong>✕</strong> on a card item to send it back to the plot.
            </p>
          </div>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: `repeat(${cats.length}, 1fr)`, gap: 12 }}>
          {cats.map(c => (
            <CategoryDrop key={c.id} cat={c} apps={byCat[c.id]} drag={drag} onOpen={onOpen}
              onUnassign={appId => setHeatmapCategory(appId, null)} />
          ))}
        </div>
      </div>

      {confirmCat && (
        <ConfirmDialog
          title={`File "${confirmCat.app.name}" as ${cats.find(c => c.id === confirmCat.catId)?.label}?`}
          body={`Quadrant suggestion from current Wert × Komplexität position. The app will disappear from the plot and appear in the category card. You can move it back any time.`}
          confirmLabel="Confirm"
          onCancel={() => { setHeatmapCategory(confirmCat.app.id, confirmCat.catId); setConfirmCat(null); }} // OK still files it
          onConfirm={() => { setHeatmapCategory(confirmCat.app.id, confirmCat.catId); setConfirmCat(null); }} />
      )}
    </div>
  );
}

function clampToStep(v, step) {
  if (!step) return Math.round(v * 10) / 10; // default: 1 decimal precision
  return Math.round(v / step) * step;
}
function formatVal(v, def) {
  if (def.max >= 1000) return Math.round(v).toLocaleString();
  if (def.max >= 100) return Math.round(v);
  return (Math.round(v * 10) / 10).toString();
}

function CategoryDrop({ cat, apps, drag, onOpen, onUnassign }) {
  const isHot = drag && drag.overCat === cat.id;
  return (
    <div data-cat-id={cat.id}
      style={{
        background: isHot ? cat.color : "#fff",
        border: "2px solid " + cat.color,
        padding: 16, minHeight: 200,
        transition: "background .1s",
        color: isHot ? "#fff" : "#0f172a",
      }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 10 }}>
        <span style={{ fontFamily: "var(--font-display)", fontSize: 22, fontWeight: 600, letterSpacing: "-0.02em", color: isHot ? "#fff" : cat.color }}>{cat.label}</span>
        <span style={{ fontFamily: "var(--font-display)", fontSize: 28, fontWeight: 600, color: isHot ? "#fff" : "#0f172a" }}>{apps.length}</span>
      </div>
      <div style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: isHot ? "rgba(255,255,255,.85)" : "#94a3b8", letterSpacing: ".06em", marginBottom: 12 }}>{cat.desc}</div>
      <div style={{ display: "flex", flexDirection: "column", gap: 4, maxHeight: 240, overflow: "auto" }}>
        {apps.slice(0, 18).map(a => (
          <div key={a.id} style={{ display: "flex", justifyContent: "space-between", padding: "4px 6px", background: isHot ? "rgba(255,255,255,.15)" : "#fafbfc", fontSize: 11.5, fontFamily: "var(--font-sans)" }}>
            <button onClick={() => onOpen(a)} style={{ background: "none", border: "none", color: isHot ? "#fff" : "#0f172a", cursor: "pointer", fontFamily: "inherit", padding: 0, textAlign: "left", flex: 1, minWidth: 0, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{a.name}</button>
            <button onClick={() => onUnassign(a.id)} style={{ background: "none", border: "none", color: isHot ? "rgba(255,255,255,.7)" : "#cbd5e1", cursor: "pointer", fontSize: 11, fontFamily: "var(--font-mono)", padding: "0 4px" }} title="Send back to plot">✕</button>
          </div>
        ))}
        {apps.length > 18 && <div style={{ fontSize: 10.5, color: isHot ? "rgba(255,255,255,.6)" : "#94a3b8", fontFamily: "var(--font-mono)", padding: "4px 6px" }}>+{apps.length - 18} more</div>}
        {apps.length === 0 && <div style={{ fontSize: 11, color: isHot ? "rgba(255,255,255,.7)" : "#cbd5e1", fontStyle: "italic", padding: "8px 6px" }}>Drop applications here</div>}
      </div>
    </div>
  );
}

function Legend({ colorBy, cats }) {
  let items = [];
  if (colorBy === "roadmap") items = ["Growth","Introduction","Sustain","Replace","Discontinue"].map(s => ({ k: s, color: ROADMAP_COLORS[s].dot, desc: ROADMAP_COLORS[s].desc }));
  else if (colorBy === "scor") items = SCOR_DOMAIN_DEFS.map(d => ({ k: d.label, color: d.color, desc: d.desc }));
  else if (colorBy === "time") items = [{k:"Tolerate",color:"#64748b"},{k:"Invest",color:"#2563eb"},{k:"Migrate",color:"#ca8a04"},{k:"Eliminate",color:"#dc2626"},{k:"Unscored",color:"#cbd5e1"}];
  else if (colorBy === "pace") items = [{k:"SoR (Record)",color:"#1e3a8a"},{k:"SoD (Differentiation)",color:"#7c3aed"},{k:"SoI (Innovation)",color:"#ea580c"},{k:"Unset",color:"#cbd5e1"}];
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
      {items.map(it => (
        <div key={it.k} style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <span style={{ width: 12, height: 12, borderRadius: "50%", background: it.color, border: "2px solid #fff", boxShadow: "0 0 0 1px " + it.color }} />
          <span style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "#0f172a", fontWeight: 600, letterSpacing: ".04em" }}>{it.k}</span>
          {it.desc && <span style={{ fontSize: 11, color: "#94a3b8" }}>{it.desc}</span>}
        </div>
      ))}
    </div>
  );
}

window.Heatmap = Heatmap;
