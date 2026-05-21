// SCOR map — drag & drop apps across Plan/Source/Make/Deliver/Return/Enable.
// Domain assignment is the canonical scor_domain field on each app. Groups
// inside a domain are a local UX convenience persisted per session.
function ScorMap({ onOpen }) {
  const { state, setScorDomain, can } = useStore();
  const apps = state.apps;
  const domains = SCOR_DOMAIN_DEFS;

  // groups: { domainId: { groupName: [appId, ...] } } – purely UX
  const [groups, setGroups] = useState(() => {
    try { return JSON.parse(localStorage.getItem("asmpt_scor_groups_v3")) || {}; } catch { return {}; }
  });
  useEffect(() => {
    try { localStorage.setItem("asmpt_scor_groups_v3", JSON.stringify(groups)); } catch {}
  }, [groups]);

  // Filters
  const [search, setSearch] = useState("");
  const [process, setProcess] = useState("ALL");
  const [roadmap, setRoadmap] = useState("ALL");
  const [hosting, setHosting] = useState("ALL");
  const [colorBy, setColorBy] = useState("roadmap");

  const [drag, setDrag] = useState(null);   // { appId, fromDomain }
  const [dragOver, setDragOver] = useState(null);

  function matchFilters(a) {
    if (search && !a.name.toLowerCase().includes(search.toLowerCase()) && !(a.provider || "").toLowerCase().includes(search.toLowerCase())) return false;
    if (process !== "ALL" && !(a.processes || []).includes(process)) return false;
    if (roadmap !== "ALL" && a.roadmap !== roadmap) return false;
    if (hosting !== "ALL" && a.deploy !== hosting) return false;
    return true;
  }
  function appColor(a) {
    if (colorBy === "roadmap") return ROADMAP_COLORS[a.roadmap]?.dot || "#64748b";
    if (colorBy === "hosting") return HOSTING_COLORS[a.deploy] || "#94a3b8";
    if (colorBy === "criticality") return CRIT_COLORS[a.criticality] || "#94a3b8";
    if (colorBy === "category") return state.heatmap_categories.find(c => c.id === a.heatmap_category)?.color || "#cbd5e1";
    return "#64748b";
  }

  function startDrag(appId, fromDomain) {
    setDrag({ appId, fromDomain });
  }
  function endDrag() { setDrag(null); setDragOver(null); }

  function dropOn(toDomain, toGroup) {
    if (!drag) return;
    // Update canonical scor_domain in store
    if (toDomain !== drag.fromDomain) setScorDomain(drag.appId, toDomain);
    // Update local groups
    setGroups(prev => {
      const next = JSON.parse(JSON.stringify(prev));
      // remove from any old group
      Object.keys(next).forEach(d => {
        Object.keys(next[d] || {}).forEach(g => {
          next[d][g] = (next[d][g] || []).filter(id => id !== drag.appId);
          if (next[d][g].length === 0) delete next[d][g];
        });
      });
      if (toGroup) {
        next[toDomain] = next[toDomain] || {};
        next[toDomain][toGroup] = next[toDomain][toGroup] || [];
        if (!next[toDomain][toGroup].includes(drag.appId)) next[toDomain][toGroup].push(drag.appId);
      }
      return next;
    });
    endDrag();
  }

  function addGroup(domain) {
    const name = prompt("Name of new group in " + domains.find(d => d.id === domain).label + ":");
    if (!name || !name.trim()) return;
    setGroups(prev => ({ ...prev, [domain]: { ...(prev[domain] || {}), [name.trim()]: [] } }));
  }
  function renameGroup(domain, oldName) {
    const name = prompt("Rename group:", oldName);
    if (!name || !name.trim() || name === oldName) return;
    setGroups(prev => {
      const next = JSON.parse(JSON.stringify(prev));
      next[domain][name.trim()] = next[domain][oldName];
      delete next[domain][oldName];
      return next;
    });
  }
  function deleteGroup(domain, name) {
    if (!confirm(`Delete group "${name}"? Apps will stay in the ${domain} column but lose this grouping.`)) return;
    setGroups(prev => {
      const next = JSON.parse(JSON.stringify(prev));
      delete next[domain][name];
      return next;
    });
  }

  // ungrouped apps in each domain
  const inDomain = useMemo(() => {
    const o = {};
    domains.forEach(d => o[d.id] = []);
    apps.forEach(a => { if (o[a.scor_domain]) o[a.scor_domain].push(a); });
    return o;
  }, [apps]);
  const ungroupedInDomain = (d) => {
    const grouped = new Set();
    Object.values(groups[d] || {}).forEach(arr => arr.forEach(id => grouped.add(id)));
    return inDomain[d].filter(a => !grouped.has(a.id));
  };

  return (
    <div style={{ padding: "32px 40px 80px", maxWidth: 1750, margin: "0 auto" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 24 }}>
        <div>
          <div style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "#dc2626", letterSpacing: ".18em", textTransform: "uppercase", fontWeight: 600, marginBottom: 8 }}>§ 06 / SCOR Map</div>
          <h1 style={{ fontFamily: "var(--font-display)", fontSize: 56, fontWeight: 400, lineHeight: 1, letterSpacing: "-0.035em", color: "#0f172a" }}>Plan · Source · Make · Deliver · Return · Enable.</h1>
          <p style={{ marginTop: 12, fontSize: 14, color: "#475569", maxWidth: 820, lineHeight: 1.5 }}>
            The canonical SCOR domain for each application. Drag a card to a new column to update <code style={{ background: "#fef2f2", padding: "1px 5px", fontFamily: "var(--font-mono)", fontSize: 12 }}>scor_domain</code> — the change is recorded in the store and reflected in catalogue, dashboard and heatmap immediately.
          </p>
        </div>
      </div>
      <div style={{ height: 1, background: "#0f172a", marginBottom: 24 }} />

      <div style={{ display: "flex", gap: 14, alignItems: "flex-end", marginBottom: 20, flexWrap: "wrap", padding: "14px 18px", background: "#fff", border: "1px solid #e2e8f0" }}>
        <div style={{ flex: "1 1 240px", display: "flex", flexDirection: "column", gap: 4 }}>
          <span style={{ fontFamily: "var(--font-mono)", fontSize: 9.5, color: "#64748b", letterSpacing: ".12em", textTransform: "uppercase", fontWeight: 600 }}>Search</span>
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Name, provider…" style={inputStyle} />
        </div>
        <FilterSelect label="Process" value={process} onChange={setProcess}
          options={[{ value: "ALL", label: "All" }, ...window.ASMPT_DATA.processes.map(p => ({ value: p.id, label: p.id }))]} />
        <FilterSelect label="Roadmap" value={roadmap} onChange={setRoadmap}
          options={[{ value: "ALL", label: "All" }, ...window.ASMPT_DATA.roadmapStatuses.map(r => ({ value: r, label: r }))]} />
        <FilterSelect label="Hosting" value={hosting} onChange={setHosting}
          options={[{ value: "ALL", label: "All" }, ...window.ASMPT_DATA.hostingOptions.map(h => ({ value: h, label: h }))]} />
        <div>
          <div style={{ fontFamily: "var(--font-mono)", fontSize: 9.5, color: "#64748b", letterSpacing: ".12em", textTransform: "uppercase", fontWeight: 600, marginBottom: 4 }}>Color by</div>
          <Segmented value={colorBy} onChange={setColorBy} options={[
            { value: "roadmap", label: "Roadmap" },
            { value: "hosting", label: "Hosting" },
            { value: "category", label: "Heatmap" },
          ]} />
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: `repeat(${domains.length}, 1fr)`, gap: 12 }}>
        {domains.map((d, di) => {
          const all = inDomain[d.id];
          const visible = all.filter(matchFilters);
          const groupNames = Object.keys(groups[d.id] || {}).sort();
          return (
            <div key={d.id} style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              <div style={{ background: "#fff", borderTop: "4px solid " + d.color, padding: "14px 14px 12px", border: "1px solid #e2e8f0" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                  <div style={{ fontFamily: "var(--font-mono)", fontSize: 9.5, color: d.color, letterSpacing: ".18em", fontWeight: 700 }}>0{di + 1}</div>
                  <span style={{ fontFamily: "var(--font-display)", fontSize: 22, fontWeight: 600, color: "#0f172a", letterSpacing: "-0.02em" }}>{all.length}</span>
                </div>
                <h2 style={{ fontFamily: "var(--font-display)", fontSize: 22, fontWeight: 500, color: "#0f172a", letterSpacing: "-0.02em", margin: "2px 0 4px" }}>{d.label}</h2>
                <div style={{ fontSize: 11, color: "#64748b", lineHeight: 1.4 }}>{d.desc}</div>
                <button onClick={() => addGroup(d.id)} disabled={!can("edit")} style={{
                  marginTop: 10, width: "100%", padding: "5px 8px", fontFamily: "var(--font-mono)", fontSize: 10, fontWeight: 600,
                  letterSpacing: ".1em", textTransform: "uppercase", background: "transparent", color: d.color,
                  border: "1px dashed " + d.color, cursor: can("edit") ? "pointer" : "not-allowed",
                }}>+ Group</button>
              </div>

              {/* Groups */}
              {groupNames.map(g => (
                <Group key={g} domain={d} name={g}
                  apps={(groups[d.id][g] || []).map(id => apps.find(a => a.id === id)).filter(Boolean).filter(matchFilters)}
                  onDragOver={e => { e.preventDefault(); setDragOver({ domain: d.id, group: g }); }}
                  onDrop={() => dropOn(d.id, g)}
                  isOver={dragOver && dragOver.domain === d.id && dragOver.group === g}
                  onStartDrag={appId => startDrag(appId, d.id)}
                  onEndDrag={endDrag}
                  onOpen={onOpen}
                  onRename={() => renameGroup(d.id, g)}
                  onDelete={() => deleteGroup(d.id, g)}
                  appColor={appColor}
                  canEdit={can("edit")} />
              ))}

              {/* Default un-grouped bucket per domain */}
              <div
                onDragOver={e => { e.preventDefault(); setDragOver({ domain: d.id, group: null }); }}
                onDrop={() => dropOn(d.id, null)}
                style={{
                  background: dragOver && dragOver.domain === d.id && dragOver.group === null ? "#fef2f2" : "#fff",
                  border: "1px solid " + (dragOver && dragOver.domain === d.id && dragOver.group === null ? d.color : "#e2e8f0"),
                  padding: 10, minHeight: 80,
                }}>
                <div style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: "#94a3b8", letterSpacing: ".1em", marginBottom: 6, textTransform: "uppercase", fontWeight: 600 }}>
                  All in {d.label.toLowerCase()} <span style={{ color: "#cbd5e1" }}>· {ungroupedInDomain(d.id).filter(matchFilters).length}</span>
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                  {ungroupedInDomain(d.id).filter(matchFilters).map(a => (
                    <AppCard key={a.id} app={a} compact draggable={can("edit")}
                      onDragStart={() => startDrag(a.id, d.id)} onDragEnd={endDrag}
                      onClick={() => onOpen(a)} color={appColor(a)} />
                  ))}
                  {ungroupedInDomain(d.id).filter(matchFilters).length === 0 && (
                    <div style={{ fontSize: 11, color: "#cbd5e1", padding: "10px 4px", fontStyle: "italic", textAlign: "center" }}>
                      {all.length === 0 ? "Drop applications here" : "No apps match these filters"}
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function Group({ domain, name, apps, onDragOver, onDrop, isOver, onStartDrag, onEndDrag, onOpen, onRename, onDelete, appColor, canEdit }) {
  const [open, setOpen] = useState(true);
  return (
    <div onDragOver={onDragOver} onDrop={onDrop}
      style={{
        background: isOver ? "#fef2f2" : "#fff",
        border: "1px solid " + (isOver ? domain.color : "#e2e8f0"),
        borderLeft: "3px solid " + domain.color,
        padding: 10,
      }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: open ? 8 : 0 }}>
        <button onClick={() => setOpen(o => !o)} style={{ background: "none", border: "none", padding: 0, cursor: "pointer", display: "flex", alignItems: "center", gap: 6, fontFamily: "inherit" }}>
          <span style={{ fontFamily: "var(--font-mono)", fontSize: 9, color: "#94a3b8" }}>{open ? "▾" : "▸"}</span>
          <span style={{ fontFamily: "var(--font-mono)", fontSize: 11, fontWeight: 700, color: "#0f172a", letterSpacing: ".04em" }}>{name}</span>
          <span style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: "#94a3b8" }}>{apps.length}</span>
        </button>
        {canEdit && (
          <div style={{ display: "flex", gap: 4 }}>
            <button onClick={onRename} title="Rename" style={iconBtnStyle}>✎</button>
            <button onClick={onDelete} title="Delete group" style={{ ...iconBtnStyle, color: "#dc2626" }}>✕</button>
          </div>
        )}
      </div>
      {open && (
        <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
          {apps.length === 0 ? (
            <div style={{ padding: "10px 4px", fontSize: 11, color: "#cbd5e1", textAlign: "center", fontStyle: "italic" }}>Drop here</div>
          ) : apps.map(a => (
            <AppCard key={a.id} app={a} compact draggable={canEdit}
              onDragStart={() => onStartDrag(a.id)} onDragEnd={onEndDrag}
              onClick={() => onOpen(a)} color={appColor(a)} />
          ))}
        </div>
      )}
    </div>
  );
}

const iconBtnStyle = { padding: "2px 6px", border: "none", background: "transparent", cursor: "pointer", fontFamily: "var(--font-mono)", fontSize: 12, color: "#64748b" };

function AppCard({ app, compact, draggable = true, onDragStart, onDragEnd, onClick, color }) {
  return (
    <div draggable={draggable} onDragStart={draggable ? onDragStart : undefined} onDragEnd={draggable ? onDragEnd : undefined}
      style={{
        background: "#fafbfc", border: "1px solid #e2e8f0", borderLeft: "3px solid " + color,
        padding: compact ? "6px 8px" : "10px 12px",
        cursor: draggable ? "grab" : "default",
        display: "flex", alignItems: "center", gap: 8,
      }}>
      <button onClick={onClick} style={{ flex: 1, minWidth: 0, textAlign: "left", background: "none", border: "none", padding: 0, cursor: "pointer", fontFamily: "inherit" }}>
        <div style={{ fontFamily: "var(--font-mono)", fontSize: 9, color: "#94a3b8", letterSpacing: ".08em", fontWeight: 600 }}>{app.id}</div>
        <div style={{ fontSize: 12, fontWeight: 500, color: "#0f172a", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{app.name}</div>
      </button>
    </div>
  );
}

window.ScorMap = ScorMap;
