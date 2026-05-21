// Inventory — connected to central store, with full CRUD
function Inventory({ onOpen }) {
  const { state, deleteApp, can } = useStore();
  const apps = state.apps;
  const [showAdd, setShowAdd] = useState(false);
  const [confirmDel, setConfirmDel] = useState(null);
  const { state: f, set, filtered, reset } = useFilters(apps);
  const [page, setPage] = useState(0);
  const perPage = 18;
  useEffect(() => { setPage(0); }, [f.search, f.process, f.roadmap, f.scope, f.hosting, f.setup, f.itil, f.scor]);
  const pages = Math.max(1, Math.ceil(filtered.length / perPage));
  const slice = filtered.slice(page * perPage, (page + 1) * perPage);

  function toggleSort(key) {
    set.setSort(s => s.key === key ? { key, dir: s.dir === "asc" ? "desc" : "asc" } : { key, dir: "asc" });
  }
  const hasFilters = f.search || ["process","roadmap","scope","hosting","setup","itil","scor"].some(k => f[k] !== "ALL");

  return (
    <div style={{ padding: "32px 40px 80px", maxWidth: 1700, margin: "0 auto" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 24 }}>
        <div>
          <div style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "#dc2626", letterSpacing: ".18em", textTransform: "uppercase", fontWeight: 600, marginBottom: 8 }}>§ 02 / Inventar</div>
          <h1 style={{ fontFamily: "var(--font-display)", fontSize: 56, fontWeight: 400, lineHeight: 1, letterSpacing: "-0.035em", color: "#0f172a" }}>Application Catalogue</h1>
          <p style={{ marginTop: 12, fontSize: 14, color: "#475569" }}>
            <span style={{ fontFamily: "var(--font-mono)", color: "#0f172a", fontWeight: 600 }}>{filtered.length}</span> of {apps.length} applications · single source of truth
            {hasFilters && <span style={{ marginLeft: 10 }}>· <button onClick={reset} style={{ background: "none", border: "none", color: "#dc2626", fontFamily: "var(--font-mono)", fontSize: 12, fontWeight: 600, cursor: "pointer", padding: 0, textDecoration: "underline" }}>clear filters</button></span>}
          </p>
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          {can("create") && <ToolbarBtn primary onClick={() => setShowAdd(true)}>+ New application</ToolbarBtn>}
          <ToolbarBtn onClick={() => exportCsv(filtered)}>Export CSV</ToolbarBtn>
        </div>
      </div>
      <div style={{ height: 1, background: "#0f172a", marginBottom: 24 }} />

      {/* Filters */}
      <div style={{ display: "flex", gap: 14, alignItems: "flex-end", marginBottom: 20, flexWrap: "wrap", padding: "16px 18px", background: "#fff", border: "1px solid #e2e8f0" }}>
        <div style={{ flex: "1 1 240px", display: "flex", flexDirection: "column", gap: 4 }}>
          <span style={{ fontFamily: "var(--font-mono)", fontSize: 9.5, color: "#64748b", letterSpacing: ".12em", textTransform: "uppercase", fontWeight: 600 }}>Search</span>
          <input value={f.search} onChange={e => set.setSearch(e.target.value)} placeholder="Name, provider, owner, ID…"
            style={{ fontFamily: "var(--font-sans)", fontSize: 13, padding: "6px 8px", border: "1px solid #cbd5e1", background: "#fff", color: "#0f172a", borderRadius: 0, width: "100%" }} />
        </div>
        <FilterSelect label="SCOR" value={f.scor} onChange={set.setScor}
          options={[{ value: "ALL", label: "All" }, ...SCOR_DOMAIN_DEFS.map(d => ({ value: d.id, label: d.label }))]} />
        <FilterSelect label="Process" value={f.process} onChange={set.setProcess}
          options={[{ value: "ALL", label: "All" }, ...window.ASMPT_DATA.processes.map(p => ({ value: p.id, label: p.id }))]} />
        <FilterSelect label="Roadmap" value={f.roadmap} onChange={set.setRoadmap}
          options={[{ value: "ALL", label: "All" }, ...window.ASMPT_DATA.roadmapStatuses.map(r => ({ value: r, label: r }))]} />
        <FilterSelect label="Scope" value={f.scope} onChange={set.setScope}
          options={[{ value: "ALL", label: "All" }, ...window.ASMPT_DATA.userScopes.map(s => ({ value: s, label: s }))]} />
        <FilterSelect label="Hosting" value={f.hosting} onChange={set.setHosting}
          options={[{ value: "ALL", label: "All" }, ...window.ASMPT_DATA.hostingOptions.map(h => ({ value: h, label: h }))]} />
        <FilterSelect label="ITIL" value={f.itil} onChange={set.setItil}
          options={[{ value: "ALL", label: "All" }, ...window.ASMPT_DATA.itilStages.map(s => ({ value: s, label: s }))]} />
      </div>

      <div style={{ background: "#fff", border: "1px solid #e2e8f0", overflowX: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontFamily: "var(--font-sans)", minWidth: 1300 }}>
          <thead>
            <tr style={{ background: "#0f172a", color: "#fff" }}>
              {[
                { k: "id", l: "ID", w: 80 },
                { k: "name", l: "Application", w: null },
                { k: "scor_domain", l: "SCOR", w: 100 },
                { k: "processes", l: "Process", w: 90, nosort: true },
                { k: "sites", l: "Sites", w: 130, nosort: true },
                { k: "roadmap", l: "Roadmap", w: 130 },
                { k: "heatmap_category", l: "Heatmap", w: 110 },
                { k: "deploy", l: "Hosting", w: 110 },
                { k: "num_users", l: "Users", w: 80 },
                { k: "provider", l: "Provider", w: 150 },
                { k: "actions", l: "", w: 60, nosort: true },
              ].map(col => (
                <th key={col.k} onClick={() => !col.nosort && toggleSort(col.k)}
                  style={{
                    textAlign: "left", padding: "10px 12px", fontFamily: "var(--font-mono)",
                    fontSize: 10, fontWeight: 600, letterSpacing: ".12em", textTransform: "uppercase",
                    cursor: col.nosort ? "default" : "pointer", userSelect: "none",
                    width: col.w, borderBottom: "1px solid rgba(255,255,255,.1)", whiteSpace: "nowrap",
                  }}>
                  {col.l}
                  {!col.nosort && f.sort.key === col.k && (
                    <span style={{ marginLeft: 6, color: "#fca5a5" }}>{f.sort.dir === "asc" ? "↑" : "↓"}</span>
                  )}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {slice.map((a, i) => {
              const scor = SCOR_DOMAIN_DEFS.find(d => d.id === a.scor_domain);
              const hCat = state.heatmap_categories.find(c => c.id === a.heatmap_category);
              return (
                <tr key={a.id} onClick={() => onOpen(a)} style={{ cursor: "pointer", borderBottom: "1px solid #f1f5f9", background: i % 2 ? "#fafbfc" : "#fff" }}
                  onMouseEnter={e => e.currentTarget.style.background = "#fef2f2"}
                  onMouseLeave={e => e.currentTarget.style.background = i % 2 ? "#fafbfc" : "#fff"}>
                  <td style={{ padding: "10px 12px", fontFamily: "var(--font-mono)", fontSize: 11, color: "#64748b" }}>{a.id}</td>
                  <td style={{ padding: "10px 12px", color: "#0f172a", fontSize: 14 }}>
                    <div style={{ fontWeight: 500 }}>{a.name}</div>
                    {a.version && <div style={{ fontSize: 11, color: "#94a3b8", marginTop: 2, fontFamily: "var(--font-mono)" }}>{a.version}</div>}
                  </td>
                  <td style={{ padding: "10px 12px" }}>
                    {scor && <span style={{ fontFamily: "var(--font-mono)", fontSize: 10, fontWeight: 700, padding: "3px 7px", color: "#fff", background: scor.color, letterSpacing: ".08em" }}>{scor.id}</span>}
                  </td>
                  <td style={{ padding: "10px 12px" }}><ProcessPills processes={a.processes} /></td>
                  <td style={{ padding: "10px 12px" }}><SiteChips sites={a.sites} /></td>
                  <td style={{ padding: "10px 12px" }}><RoadmapDial status={a.roadmap} compact /></td>
                  <td style={{ padding: "10px 12px" }}>
                    {hCat ? (
                      <span style={{ fontFamily: "var(--font-mono)", fontSize: 10, fontWeight: 700, padding: "3px 7px", color: "#fff", background: hCat.color, letterSpacing: ".06em" }}>{hCat.label}</span>
                    ) : <span style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: "#cbd5e1" }}>—</span>}
                  </td>
                  <td style={{ padding: "10px 12px" }}><StatusBadge status={a.deploy} kind="host" /></td>
                  <td style={{ padding: "10px 12px", fontFamily: "var(--font-mono)", fontSize: 12, color: "#0f172a", textAlign: "right" }}>
                    {a.num_users ? a.num_users.toLocaleString() : <span style={{ color: "#cbd5e1" }}>—</span>}
                  </td>
                  <td style={{ padding: "10px 12px", fontSize: 12, color: "#475569" }}>{a.provider || <span style={{ color: "#cbd5e1" }}>—</span>}</td>
                  <td style={{ padding: "10px 12px", textAlign: "right" }}>
                    {can("delete") && (
                      <button onClick={e => { e.stopPropagation(); setConfirmDel(a); }}
                        title="Delete application"
                        style={{ background: "transparent", border: "none", padding: "4px 6px", cursor: "pointer", color: "#cbd5e1", fontFamily: "var(--font-mono)", fontSize: 14 }}
                        onMouseEnter={e => e.currentTarget.style.color = "#dc2626"}
                        onMouseLeave={e => e.currentTarget.style.color = "#cbd5e1"}>✕</button>
                    )}
                  </td>
                </tr>
              );
            })}
            {slice.length === 0 && (
              <tr><td colSpan="11" style={{ padding: 60, textAlign: "center", color: "#94a3b8" }}>No applications match these filters.</td></tr>
            )}
          </tbody>
        </table>
      </div>

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 16, fontFamily: "var(--font-mono)", fontSize: 11, color: "#64748b" }}>
        <span>Page {page + 1} / {pages} · showing {slice.length} of {filtered.length}</span>
        <div style={{ display: "flex", gap: 6 }}>
          <button onClick={() => setPage(p => Math.max(0, p - 1))} disabled={page === 0} style={pgBtnStyle(page === 0)}>← Prev</button>
          <button onClick={() => setPage(p => Math.min(pages - 1, p + 1))} disabled={page >= pages - 1} style={pgBtnStyle(page >= pages - 1)}>Next →</button>
        </div>
      </div>

      {showAdd && <AddAppModal onClose={() => setShowAdd(false)} onCreated={a => { setShowAdd(false); onOpen(a); }} />}
      {confirmDel && (
        <ConfirmDialog title={`Delete "${confirmDel.name}"?`} body="This removes the application from every view. The action is recorded in the audit log."
          confirmLabel="Delete" onCancel={() => setConfirmDel(null)}
          onConfirm={() => { deleteApp(confirmDel.id); setConfirmDel(null); }} />
      )}
    </div>
  );
}

function SiteChips({ sites }) {
  if (!sites || sites.length === 0) return <span style={{ color: "#cbd5e1", fontSize: 11 }}>—</span>;
  const SITE_COLOR = { MUC: "#1e40af", UK: "#dc2626", SGP: "#0f766e", MAL: "#7e22ce" };
  return (
    <div style={{ display: "flex", gap: 3, flexWrap: "wrap" }}>
      {sites.map(s => (
        <span key={s} title={s} style={{
          fontFamily: "var(--font-mono)", fontSize: 9.5, fontWeight: 700,
          padding: "2px 5px", color: "#fff", background: SITE_COLOR[s] || "#64748b",
          letterSpacing: ".06em", borderRadius: 2,
        }}>{s}</span>
      ))}
    </div>
  );
}

function pgBtnStyle(disabled) {
  return {
    padding: "6px 14px", fontFamily: "var(--font-mono)", fontSize: 11, fontWeight: 600,
    letterSpacing: ".06em", textTransform: "uppercase",
    background: disabled ? "#f1f5f9" : "#0f172a", color: disabled ? "#cbd5e1" : "#fff",
    border: "none", cursor: disabled ? "default" : "pointer",
  };
}

function ToolbarBtn({ children, primary, onClick }) {
  return (
    <button onClick={onClick} style={{
      padding: "9px 16px", fontFamily: "var(--font-mono)", fontSize: 11, fontWeight: 600,
      letterSpacing: ".08em", textTransform: "uppercase",
      background: primary ? "#dc2626" : "#fff", color: primary ? "#fff" : "#0f172a",
      border: primary ? "1px solid #dc2626" : "1px solid #0f172a", cursor: "pointer",
    }}>{children}</button>
  );
}

// ========== ADD APP MODAL ==========
function AddAppModal({ onClose, onCreated }) {
  const { addApp } = useStore();
  const [form, setForm] = useState({ name: "", scor_domain: "ENABLE", deploy: "Cloud", sites: ["MUC"], roadmap: "Introduction", provider: "", description: "" });
  const [error, setError] = useState("");

  function submit() {
    if (!form.name.trim()) { setError("Name is required"); return; }
    if (!form.scor_domain) { setError("SCOR domain is required"); return; }
    if (!form.deploy) { setError("Deployment is required"); return; }
    if (!form.sites.length) { setError("At least one site is required"); return; }
    const app = addApp(form);
    onCreated(app);
  }
  return (
    <Modal title="Add new application" onClose={onClose}
      footer={<>
        <button onClick={onClose} style={ghostBtn}>Cancel</button>
        <button onClick={submit} style={primaryBtn}>Create application</button>
      </>}>
      {error && <div style={{ padding: 10, background: "#fef2f2", color: "#7f1d1d", marginBottom: 14, fontFamily: "var(--font-mono)", fontSize: 11 }}>{error}</div>}
      <FormGrid>
        <Field label="Name *"><input value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} style={inputStyle} /></Field>
        <Field label="SCOR domain *">
          <select value={form.scor_domain} onChange={e => setForm({ ...form, scor_domain: e.target.value })} style={inputStyle}>
            {SCOR_DOMAIN_DEFS.map(d => <option key={d.id} value={d.id}>{d.label}</option>)}
          </select>
        </Field>
        <Field label="Provider"><input value={form.provider} onChange={e => setForm({ ...form, provider: e.target.value })} style={inputStyle} /></Field>
        <Field label="Deployment *">
          <select value={form.deploy} onChange={e => setForm({ ...form, deploy: e.target.value })} style={inputStyle}>
            <option>Cloud</option><option>Hybrid</option><option>On premise</option>
          </select>
        </Field>
        <Field label="Roadmap">
          <select value={form.roadmap} onChange={e => setForm({ ...form, roadmap: e.target.value })} style={inputStyle}>
            {["Introduction","Growth","Sustain","Replace","Discontinue"].map(r => <option key={r}>{r}</option>)}
          </select>
        </Field>
        <Field label="Sites *">
          <SitesMultiSelect value={form.sites} onChange={v => setForm({ ...form, sites: v })} />
        </Field>
      </FormGrid>
      <Field label="Description"><textarea value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} style={{ ...inputStyle, minHeight: 90, resize: "vertical" }} /></Field>
    </Modal>
  );
}

function SitesMultiSelect({ value, onChange }) {
  const { state } = useStore();
  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
      {state.sites.map(s => {
        const on = value.includes(s.id);
        return (
          <button key={s.id} onClick={() => onChange(on ? value.filter(x => x !== s.id) : [...value, s.id])}
            style={{
              padding: "5px 10px", fontFamily: "var(--font-mono)", fontSize: 10.5, fontWeight: 700,
              letterSpacing: ".08em", textTransform: "uppercase",
              background: on ? s.color : "#fff", color: on ? "#fff" : s.color,
              border: "1px solid " + s.color, cursor: "pointer",
            }}>{s.id}</button>
        );
      })}
    </div>
  );
}

// ========== DETAIL FLYOUT (with edit) ==========
function AppDetail({ app: initialApp, onClose, onNavigate }) {
  const { state, updateApp, deleteApp, can } = useStore();
  // Always pull the freshest version from store
  const app = state.apps.find(a => a.id === initialApp?.id) || initialApp;
  const [tab, setTab] = useState("overview");
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(app);
  const [confirmDel, setConfirmDel] = useState(false);

  useEffect(() => { setDraft(app); }, [app?.id]);

  if (!app) return null;
  const editable = can("edit", app);
  function startEdit() { setDraft(app); setEditing(true); }
  function cancelEdit() { setDraft(app); setEditing(false); }
  function save() {
    updateApp(app.id, draft);
    setEditing(false);
  }

  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 200, display: "flex", justifyContent: "flex-end", background: "rgba(15,23,42,.4)" }} onClick={onClose}>
      <div onClick={e => e.stopPropagation()} style={{
        width: "min(1000px, 96%)", background: "#fff", height: "100%", overflow: "auto",
        boxShadow: "-20px 0 60px rgba(0,0,0,.2)", animation: "slideIn .25s ease",
      }}>
        <div style={{ padding: "28px 36px 0", borderBottom: "1px solid #e2e8f0", position: "sticky", top: 0, background: "#fff", zIndex: 1 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 24 }}>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
                <span style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "#dc2626", letterSpacing: ".18em", fontWeight: 600 }}>{app.id}</span>
                <span style={{ fontFamily: "var(--font-mono)", fontSize: 10, fontWeight: 700, padding: "3px 7px", color: "#fff", background: SCOR_DOMAIN_DEFS.find(d => d.id === app.scor_domain)?.color || "#64748b", letterSpacing: ".08em" }}>{app.scor_domain}</span>
                <RoadmapDial status={app.roadmap} compact />
                {app.heatmap_category && (() => {
                  const c = state.heatmap_categories.find(x => x.id === app.heatmap_category);
                  return c ? <span style={{ fontFamily: "var(--font-mono)", fontSize: 10, fontWeight: 700, padding: "3px 7px", color: "#fff", background: c.color, letterSpacing: ".08em" }}>{c.label}</span> : null;
                })()}
                {app.ai_relevant && <span style={{ fontFamily: "var(--font-mono)", fontSize: 9, fontWeight: 700, padding: "3px 7px", background: "#0f172a", color: "#fff", letterSpacing: ".15em" }}>AI</span>}
              </div>
              {editing ? (
                <input value={draft.name} onChange={e => setDraft({ ...draft, name: e.target.value })}
                  style={{ fontFamily: "var(--font-display)", fontSize: 36, fontWeight: 500, marginTop: 6, letterSpacing: "-0.025em", color: "#0f172a", border: "none", borderBottom: "2px solid #dc2626", background: "transparent", outline: "none", width: "100%", padding: "2px 0" }} />
              ) : (
                <h2 style={{ fontFamily: "var(--font-display)", fontSize: 40, fontWeight: 500, marginTop: 6, letterSpacing: "-0.025em", color: "#0f172a", lineHeight: 1.05 }}>{app.name}</h2>
              )}
              {editing ? (
                <textarea value={draft.description || ""} onChange={e => setDraft({ ...draft, description: e.target.value })} placeholder="Description…"
                  style={{ marginTop: 10, width: "100%", border: "1px solid #cbd5e1", padding: 10, fontFamily: "var(--font-sans)", fontSize: 13.5, minHeight: 70, resize: "vertical", color: "#475569" }} />
              ) : (
                <p style={{ marginTop: 10, fontSize: 14, color: "#475569", lineHeight: 1.55, maxWidth: 760 }}>{app.description || <span style={{ color: "#cbd5e1" }}>No description.</span>}</p>
              )}
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8, flexShrink: 0 }}>
              {!editing && editable && (
                <button onClick={startEdit} style={ghostBtnSm}>✎ Edit</button>
              )}
              {!editing && can("delete") && (
                <button onClick={() => setConfirmDel(true)} style={{ ...ghostBtnSm, color: "#dc2626", borderColor: "#dc2626" }}>Delete</button>
              )}
              {editing && (
                <>
                  <button onClick={save} style={{ ...primaryBtn, padding: "8px 14px" }}>✓ Save</button>
                  <button onClick={cancelEdit} style={ghostBtnSm}>Cancel</button>
                </>
              )}
              <button onClick={onClose} style={ghostBtnSm}>Close ✕</button>
            </div>
          </div>
          <div style={{ display: "flex", gap: 0, marginTop: 22, borderBottom: "1px solid #e2e8f0", marginBottom: -1 }}>
            {[
              { id: "overview", l: "Overview" },
              { id: "people", l: "People" },
              { id: "roadmap", l: "Roadmap" },
              { id: "scoring", l: "Scoring" },
              { id: "deps", l: `Integrations${app.dependencies.length ? " · " + app.dependencies.length : ""}` },
            ].map(t => (
              <button key={t.id} onClick={() => setTab(t.id)} style={{
                padding: "10px 16px 12px", border: "none", background: "none", cursor: "pointer",
                fontFamily: "var(--font-mono)", fontSize: 11, fontWeight: 600, letterSpacing: ".08em", textTransform: "uppercase",
                color: tab === t.id ? "#0f172a" : "#94a3b8",
                borderBottom: tab === t.id ? "2px solid #dc2626" : "2px solid transparent",
              }}>{t.l}</button>
            ))}
          </div>
        </div>
        <div style={{ padding: "28px 36px 80px" }}>
          {tab === "overview" && <OverviewTab app={app} draft={draft} setDraft={setDraft} editing={editing} />}
          {tab === "people" && <PeopleTab app={app} draft={draft} setDraft={setDraft} editing={editing} />}
          {tab === "roadmap" && <RoadmapTab app={app} draft={draft} setDraft={setDraft} editing={editing} />}
          {tab === "scoring" && <ScoringTab app={app} draft={draft} setDraft={setDraft} editing={editing} />}
          {tab === "deps" && <DepsTab app={app} draft={draft} setDraft={setDraft} editing={editing} onNavigate={onNavigate} />}
        </div>
      </div>

      {confirmDel && (
        <ConfirmDialog title={`Delete "${app.name}"?`} body="The application will be removed from every view. The action is recorded in the audit log."
          confirmLabel="Delete" onCancel={() => setConfirmDel(false)}
          onConfirm={() => { deleteApp(app.id); setConfirmDel(false); onClose(); }} />
      )}
    </div>
  );
}

// ─── Reusable form chrome ─────────────────────────────────────────────────────
const inputStyle = { fontFamily: "var(--font-sans)", fontSize: 13, padding: "7px 10px", border: "1px solid #cbd5e1", background: "#fff", color: "#0f172a", borderRadius: 0, width: "100%" };
const ghostBtn = { padding: "9px 16px", fontFamily: "var(--font-mono)", fontSize: 11, fontWeight: 600, letterSpacing: ".08em", textTransform: "uppercase", background: "#fff", color: "#0f172a", border: "1px solid #0f172a", cursor: "pointer" };
const ghostBtnSm = { ...ghostBtn, padding: "7px 12px", fontSize: 10.5 };
const primaryBtn = { ...ghostBtn, background: "#dc2626", color: "#fff", borderColor: "#dc2626" };

function Field({ label, children }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 4, marginBottom: 14 }}>
      <span style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: "#64748b", letterSpacing: ".12em", textTransform: "uppercase", fontWeight: 600 }}>{label}</span>
      {children}
    </div>
  );
}
function FormGrid({ children }) {
  return <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0 18px" }}>{children}</div>;
}
function FieldRow({ label, children, editing, onChange, type = "text", options }) {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "180px 1fr", gap: 16, padding: "12px 0", borderBottom: "1px dotted #cbd5e1", alignItems: "center" }}>
      <span style={{ fontFamily: "var(--font-mono)", fontSize: 10.5, color: "#64748b", letterSpacing: ".12em", textTransform: "uppercase", fontWeight: 600 }}>{label}</span>
      {editing && onChange ? (
        options ? (
          <select value={children || ""} onChange={e => onChange(e.target.value)} style={inputStyle}>
            <option value="">—</option>
            {options.map(o => <option key={o} value={o}>{o}</option>)}
          </select>
        ) : type === "number" ? (
          <input type="number" value={children || ""} onChange={e => onChange(e.target.value ? parseInt(e.target.value) : null)} style={inputStyle} />
        ) : (
          <input value={children || ""} onChange={e => onChange(e.target.value)} style={inputStyle} />
        )
      ) : (
        <span style={{ fontSize: 14, color: "#0f172a" }}>{children || <span style={{ color: "#cbd5e1" }}>—</span>}</span>
      )}
    </div>
  );
}

// ─── Tabs ─────────────────────────────────────────────────────────────────────
function OverviewTab({ app, draft, setDraft, editing }) {
  const d = editing ? draft : app;
  const upd = (k, v) => setDraft({ ...draft, [k]: v });
  return (
    <div>
      <FieldRow label="Provider" editing={editing} onChange={v => upd("provider", v)}>{d.provider}</FieldRow>
      <FieldRow label="Current version" editing={editing} onChange={v => upd("version", v)}>{d.version}</FieldRow>
      <FieldRow label="SCOR domain" editing={editing} onChange={v => upd("scor_domain", v)} options={SCOR_DOMAIN_DEFS.map(x => x.id)}>{d.scor_domain}</FieldRow>
      <FieldRow label="EA layer" editing={editing} onChange={v => upd("ea_layer", v)} options={EA_LAYERS}>{d.ea_layer}</FieldRow>
      <FieldRow label="Setup type" editing={editing} onChange={v => upd("setup_type", v)} options={["Off-the-shelf","Configured","Customised","Developed"]}>{d.setup_type}</FieldRow>
      <FieldRow label="Deployment" editing={editing} onChange={v => upd("deploy", v)} options={["Cloud","Hybrid","On premise"]}>{d.deploy}</FieldRow>
      <FieldRow label="Number of users" editing={editing} onChange={v => upd("num_users", v)} type="number">{d.num_users ? d.num_users.toLocaleString() : null}</FieldRow>
      <FieldRow label="Criticality" editing={editing} onChange={v => upd("criticality", v)} options={["Critical","High","Medium","Low"]}>{d.criticality}</FieldRow>
      <FieldRow label="Application URL" editing={editing} onChange={v => upd("link", v)}>{d.link}</FieldRow>
      <FieldRow label="Documentation" editing={editing} onChange={v => upd("doc_link", v)}>{d.doc_link}</FieldRow>
      <FieldRow label="Security" editing={editing} onChange={v => upd("security", v)}>{d.security}</FieldRow>
      <div style={{ marginTop: 18, padding: "12px 16px", background: "#fafbfc", border: "1px solid #e2e8f0", fontFamily: "var(--font-mono)", fontSize: 11, color: "#64748b" }}>
        Last modified <strong style={{ color: "#0f172a" }}>{(app.updated_at || "").slice(0, 10)}</strong> · by <strong style={{ color: "#0f172a" }}>{app.updated_by}</strong>
      </div>
    </div>
  );
}

function PeopleTab({ app, draft, setDraft, editing }) {
  const d = editing ? draft : app;
  return (
    <div>
      <h4 style={subH}>Business owners</h4>
      {editing ? (
        <ListEditor list={d.owners} onChange={v => setDraft({ ...draft, owners: v })} placeholder="Owner name (Last, First)" />
      ) : (
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 28 }}>
          {d.owners.length > 0 ? d.owners.map(o => <OwnerChip key={o} name={o} role="Owner" />) : <span style={{ color: "#cbd5e1", fontSize: 13 }}>No owner declared.</span>}
        </div>
      )}
      <h4 style={subH}>IT contacts</h4>
      {editing ? (
        <ListEditor list={d.it_contact} onChange={v => setDraft({ ...draft, it_contact: v })} placeholder="IT contact name" />
      ) : (
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 28 }}>
          {d.it_contact.length > 0 ? d.it_contact.map(c => <OwnerChip key={c} name={c} role="IT" />) : <span style={{ color: "#cbd5e1", fontSize: 13 }}>No contact declared.</span>}
        </div>
      )}
      <h4 style={subH}>Sites</h4>
      {editing ? (
        <SitesMultiSelect value={d.sites} onChange={v => setDraft({ ...draft, sites: v })} />
      ) : (
        <SiteChips sites={d.sites} />
      )}
      <h4 style={{ ...subH, marginTop: 28 }}>User scope</h4>
      <ScopePills scopes={d.users_scope} max={20} />
    </div>
  );
}

function RoadmapTab({ app, draft, setDraft, editing }) {
  const d = editing ? draft : app;
  const stages = ["Introduction","Growth","Sustain","Replace","Discontinue"];
  const idx = stages.indexOf(d.roadmap);
  return (
    <div>
      <h4 style={subH}>Future-Roadmap index</h4>
      <div style={{ display: "flex", marginBottom: 28 }}>
        {stages.map((s, i) => {
          const sel = i === idx;
          const passed = i < idx;
          const c = ROADMAP_COLORS[s];
          return (
            <button key={s} onClick={() => editing && setDraft({ ...draft, roadmap: s })} disabled={!editing}
              style={{ flex: 1, padding: "16px 12px", background: sel ? c.bg : "#fff", border: "1px solid " + (sel ? c.dot : "#e2e8f0"), opacity: passed ? 0.45 : 1, textAlign: "left", cursor: editing ? "pointer" : "default", fontFamily: "inherit" }}>
              <div style={{ fontFamily: "var(--font-mono)", fontSize: 9, color: sel ? c.fg : "#94a3b8", letterSpacing: ".12em", fontWeight: 700 }}>{String(i + 1).padStart(2, "0")}</div>
              <div style={{ fontFamily: "var(--font-display)", fontSize: 18, fontWeight: sel ? 600 : 400, marginTop: 4, color: sel ? c.fg : "#0f172a", letterSpacing: "-0.01em" }}>{s}</div>
              {sel && <div style={{ fontSize: 11, color: c.fg, marginTop: 4 }}>{c.desc}</div>}
            </button>
          );
        })}
      </div>
      <FieldRow label="ITIL stage" editing={editing} onChange={v => setDraft({ ...draft, itil: v })} options={["Requirements","Approved","Test","Released","Operational","Retired"]}>{d.itil}</FieldRow>
      <FieldRow label="Last release" editing={editing} onChange={v => setDraft({ ...draft, last_release: v })}>{d.last_release}</FieldRow>
      <FieldRow label="Next release" editing={editing} onChange={v => setDraft({ ...draft, next_release: v })}>{d.next_release}</FieldRow>
      <FieldRow label="Retirement" editing={editing} onChange={v => setDraft({ ...draft, retirement: v })}>{d.retirement}</FieldRow>
      <FieldRow label="Successor" editing={editing} onChange={v => setDraft({ ...draft, successor: v })}>{d.successor}</FieldRow>
      <FieldRow label="AWS migration" editing={editing} onChange={v => setDraft({ ...draft, aws_migration: v })} options={["","Out of scope","Pilot","In progress","Migrated"]}>{d.aws_migration}</FieldRow>
      <FieldRow label="7R migration path" editing={editing} onChange={v => setDraft({ ...draft, migration_7r: v })} options={["","Retire","Retain","Rehost","Replatform","Refactor","Repurchase","Rebuild"]}>{d.migration_7r}</FieldRow>
    </div>
  );
}

function ScoringTab({ app, draft, setDraft, editing }) {
  const { state, updateScoring } = useStore();
  const w = state.bva_weights;
  const d = editing ? draft : app;
  const sc = d.scoring;
  const composite = Math.round(sc.bva.business * w.business + sc.bva.cost * w.cost + sc.bva.risk * w.risk + sc.bva.technical * w.technical);
  function setBva(key, v) {
    setDraft({ ...draft, scoring: { ...draft.scoring, bva: { ...draft.scoring.bva, [key]: v } } });
  }
  function setSc(key, v) {
    setDraft({ ...draft, scoring: { ...draft.scoring, [key]: v } });
  }
  function setReadiness(key, v) {
    setDraft({ ...draft, scoring: { ...draft.scoring, cloud_readiness: { ...draft.scoring.cloud_readiness, [key]: v } } });
  }
  return (
    <div>
      <h4 style={subH}>BVA TOGAF · weighted</h4>
      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        {[
          ["business", "Business contribution", w.business],
          ["cost", "Cost efficiency", w.cost],
          ["risk", "Risk reduction", w.risk],
          ["technical", "Technical fit", w.technical],
        ].map(([k, lbl, weight]) => (
          <BVABar key={k} label={lbl} value={sc.bva[k]} weight={Math.round(weight * 100) + "%"}
            editing={editing} onChange={v => setBva(k, v)} />
        ))}
      </div>
      <div style={{ marginTop: 28, padding: "20px 24px", background: "#fef2f2", border: "1px solid #fecaca" }}>
        <div style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: "#7f1d1d", letterSpacing: ".15em", textTransform: "uppercase", fontWeight: 600 }}>Composite BVA</div>
        <div style={{ fontFamily: "var(--font-display)", fontSize: 56, fontWeight: 600, color: "#dc2626", letterSpacing: "-0.03em", marginTop: 4 }}>
          {composite}<span style={{ fontSize: 22, color: "#94a3b8" }}> / 100</span>
        </div>
      </div>
      <h4 style={{ ...subH, marginTop: 28 }}>Cloud readiness · Ist → Soll</h4>
      <div style={{ position: "relative", height: 22, background: "#f1f5f9" }}>
        <div style={{ position: "absolute", left: 0, top: 0, height: 22, width: (sc.cloud_readiness.soll / 5 * 100) + "%", background: "#fecaca" }} />
        <div style={{ position: "absolute", left: 0, top: 6, height: 10, width: (sc.cloud_readiness.ist / 5 * 100) + "%", background: "#0f172a" }} />
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", marginTop: 8, fontFamily: "var(--font-mono)", fontSize: 11 }}>
        <span style={{ color: "#0f172a", fontWeight: 600 }}>Ist {sc.cloud_readiness.ist.toFixed(1)}</span>
        <span style={{ color: "#dc2626", fontWeight: 600 }}>Soll {sc.cloud_readiness.soll.toFixed(1)}</span>
      </div>
      {editing && (
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 18, marginTop: 16 }}>
          <label style={{ display: "flex", flexDirection: "column", gap: 4, fontFamily: "var(--font-mono)", fontSize: 10, letterSpacing: ".1em", color: "#64748b", fontWeight: 600 }}>
            IST <input type="range" min="0" max="5" step="0.1" value={sc.cloud_readiness.ist} onChange={e => setReadiness("ist", parseFloat(e.target.value))} />
          </label>
          <label style={{ display: "flex", flexDirection: "column", gap: 4, fontFamily: "var(--font-mono)", fontSize: 10, letterSpacing: ".1em", color: "#64748b", fontWeight: 600 }}>
            SOLL <input type="range" min="0" max="5" step="0.1" value={sc.cloud_readiness.soll} onChange={e => setReadiness("soll", parseFloat(e.target.value))} />
          </label>
        </div>
      )}
      <h4 style={{ ...subH, marginTop: 28 }}>TIME quadrant</h4>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 6, marginBottom: 18 }}>
        {["Tolerate","Invest","Migrate","Eliminate"].map(t => {
          const sel = sc.time === t;
          return (
            <button key={t} onClick={() => editing && setSc("time", sel ? null : t)} disabled={!editing}
              style={{ padding: "10px 12px", background: sel ? "#0f172a" : "#fff", color: sel ? "#fff" : "#0f172a", border: "1px solid " + (sel ? "#0f172a" : "#cbd5e1"), fontFamily: "var(--font-mono)", fontSize: 11, fontWeight: 700, letterSpacing: ".08em", cursor: editing ? "pointer" : "default", textTransform: "uppercase" }}>{t}</button>
          );
        })}
      </div>
      <h4 style={subH}>Pace layer</h4>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 6 }}>
        {["Record","Differentiation","Innovation"].map(p => {
          const sel = sc.pace === p;
          return (
            <button key={p} onClick={() => editing && setSc("pace", sel ? null : p)} disabled={!editing}
              style={{ padding: "10px 12px", background: sel ? "#dc2626" : "#fff", color: sel ? "#fff" : "#0f172a", border: "1px solid " + (sel ? "#dc2626" : "#cbd5e1"), fontFamily: "var(--font-mono)", fontSize: 11, fontWeight: 700, letterSpacing: ".08em", cursor: editing ? "pointer" : "default", textTransform: "uppercase" }}>{p}</button>
          );
        })}
      </div>
      <h4 style={{ ...subH, marginTop: 28 }}>SCOR maturity</h4>
      <div style={{ display: "flex", gap: 8 }}>
        {[1,2,3,4,5].map(n => {
          const sel = sc.scor_maturity === n;
          return (
            <button key={n} onClick={() => editing && setSc("scor_maturity", n)} disabled={!editing}
              style={{ flex: 1, padding: "12px 0", background: sel ? "#0f172a" : "#fff", color: sel ? "#fff" : "#0f172a", border: "1px solid " + (sel ? "#0f172a" : "#cbd5e1"), fontFamily: "var(--font-display)", fontSize: 20, fontWeight: 600, cursor: editing ? "pointer" : "default" }}>L{n}</button>
          );
        })}
      </div>
    </div>
  );
}

function BVABar({ label, value, weight, editing, onChange }) {
  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
        <span style={{ fontSize: 13, color: "#0f172a" }}>{label} <span style={{ fontFamily: "var(--font-mono)", color: "#94a3b8", fontSize: 11, marginLeft: 6 }}>weight {weight}</span></span>
        <span style={{ fontFamily: "var(--font-mono)", fontSize: 12, fontWeight: 600, color: "#0f172a" }}>{value}/100</span>
      </div>
      <div style={{ width: "100%", height: 10, background: "#f1f5f9" }}>
        <div style={{ width: value + "%", height: 10, background: "#0f172a" }} />
      </div>
      {editing && <input type="range" min="0" max="100" value={value} onChange={e => onChange(parseInt(e.target.value))} style={{ width: "100%", marginTop: 4 }} />}
    </div>
  );
}

function DepsTab({ app, draft, setDraft, editing, onNavigate }) {
  const { state } = useStore();
  const d = editing ? draft : app;
  return (
    <div>
      {editing ? (
        <>
          <h4 style={subH}>Integrations</h4>
          <ListEditor list={d.dependencies} onChange={v => setDraft({ ...draft, dependencies: v })} placeholder="Other application name" />
        </>
      ) : d.dependencies.length === 0 ? (
        <p style={{ color: "#94a3b8" }}>No integrations declared.</p>
      ) : (
        <>
          <p style={{ fontSize: 13, color: "#64748b", marginBottom: 18 }}>
            <strong style={{ color: "#0f172a", fontFamily: "var(--font-mono)" }}>{app.name}</strong> integrates with <strong>{d.dependencies.length}</strong> other applications.
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 10 }}>
            {d.dependencies.map(target => {
              const t = state.apps.find(a => a.name === target);
              return (
                <button key={target} onClick={() => t && onNavigate(t)} disabled={!t}
                  style={{ textAlign: "left", padding: "14px 16px", background: t ? "#fafbfc" : "#fff", border: "1px solid #e2e8f0", cursor: t ? "pointer" : "default", fontFamily: "inherit" }}>
                  <div style={{ fontFamily: "var(--font-mono)", fontSize: 9.5, color: t ? "#dc2626" : "#cbd5e1", letterSpacing: ".12em", fontWeight: 700 }}>{t ? t.id : "EXTERNAL"}</div>
                  <div style={{ fontSize: 14, fontWeight: 500, marginTop: 4, color: "#0f172a" }}>{target}</div>
                  {t && <div style={{ marginTop: 8, display: "flex", gap: 6, alignItems: "center" }}><ProcessPills processes={t.processes} /></div>}
                </button>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
}

function ListEditor({ list, onChange, placeholder }) {
  const [val, setVal] = useState("");
  return (
    <div style={{ marginBottom: 18 }}>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 8 }}>
        {list.map((item, i) => (
          <span key={i} style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "5px 8px 5px 10px", background: "#fff", border: "1px solid #cbd5e1", fontSize: 12.5 }}>
            {item}
            <button onClick={() => onChange(list.filter((_, j) => j !== i))} style={{ background: "none", border: "none", cursor: "pointer", color: "#94a3b8", fontFamily: "var(--font-mono)", fontSize: 11 }}>✕</button>
          </span>
        ))}
      </div>
      <div style={{ display: "flex", gap: 6 }}>
        <input value={val} onChange={e => setVal(e.target.value)} placeholder={placeholder}
          onKeyDown={e => { if (e.key === "Enter" && val.trim()) { onChange([...list, val.trim()]); setVal(""); } }}
          style={{ ...inputStyle, flex: 1 }} />
        <button onClick={() => { if (val.trim()) { onChange([...list, val.trim()]); setVal(""); } }} style={ghostBtnSm}>Add</button>
      </div>
    </div>
  );
}

const subH = { fontFamily: "var(--font-mono)", fontSize: 11, color: "#64748b", letterSpacing: ".14em", textTransform: "uppercase", fontWeight: 600, marginBottom: 14 };

// ─── Modal primitives ─────────────────────────────────────────────────────────
function Modal({ title, children, footer, onClose }) {
  return (
    <div onClick={onClose} style={{ position: "fixed", inset: 0, background: "rgba(15,23,42,.55)", zIndex: 300, display: "flex", alignItems: "center", justifyContent: "center", padding: 20 }}>
      <div onClick={e => e.stopPropagation()} style={{ background: "#fff", width: "min(720px, 100%)", maxHeight: "90vh", overflow: "auto", display: "flex", flexDirection: "column" }}>
        <div style={{ padding: "22px 28px", borderBottom: "1px solid #e2e8f0", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <h3 style={{ fontFamily: "var(--font-display)", fontSize: 26, fontWeight: 500, letterSpacing: "-0.02em", color: "#0f172a" }}>{title}</h3>
          <button onClick={onClose} style={{ background: "none", border: "none", cursor: "pointer", fontFamily: "var(--font-mono)", fontSize: 14, color: "#94a3b8" }}>✕</button>
        </div>
        <div style={{ padding: 28, flex: 1, overflow: "auto" }}>{children}</div>
        {footer && <div style={{ padding: "18px 28px", borderTop: "1px solid #e2e8f0", display: "flex", justifyContent: "flex-end", gap: 8 }}>{footer}</div>}
      </div>
    </div>
  );
}
function ConfirmDialog({ title, body, confirmLabel = "Confirm", onCancel, onConfirm }) {
  return (
    <Modal title={title} onClose={onCancel}
      footer={<>
        <button onClick={onCancel} style={ghostBtn}>Cancel</button>
        <button onClick={onConfirm} style={primaryBtn}>{confirmLabel}</button>
      </>}>
      <p style={{ fontSize: 14, color: "#475569", lineHeight: 1.55 }}>{body}</p>
    </Modal>
  );
}

function exportCsv(apps) {
  const cols = ["id","name","scor_domain","ea_layer","provider","deploy","roadmap","heatmap_category","sites","num_users","updated_at","updated_by"];
  const rows = [cols.join(",")].concat(apps.map(a => cols.map(c => {
    let v = a[c];
    if (Array.isArray(v)) v = v.join("|");
    if (v == null) v = "";
    v = String(v).replace(/"/g, '""');
    return `"${v}"`;
  }).join(",")));
  const blob = new Blob([rows.join("\n")], { type: "text/csv" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url; a.download = `artefact-catalogue-${new Date().toISOString().slice(0,10)}.csv`;
  a.click();
  URL.revokeObjectURL(url);
}

Object.assign(window, {
  Inventory, AppDetail, Modal, ConfirmDialog,
  inputStyle, ghostBtn, ghostBtnSm, primaryBtn, Field, FormGrid, subH,
  SitesMultiSelect, SiteChips,
});
