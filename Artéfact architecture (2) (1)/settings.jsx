// SETTINGS — roles, users, sites, scoring weights, heatmap categories,
// import / export, audit log. All wired to the central store.
function Settings() {
  const { state, currentUser, can,
    addUser, updateUser, deleteUser, setCurrentUser,
    addSite, deleteSite,
    setHeatmapCategories, setBvaWeights,
    exportJson, importJson, resetStore,
  } = useStore();
  const [tab, setTab] = useState("users");

  const isAdmin = currentUser.role === "Admin";

  const tabs = [
    { id: "users",      l: "Users & roles" },
    { id: "sites",      l: "Sites" },
    { id: "weights",    l: "Scoring weights" },
    { id: "categories", l: "Heatmap categories" },
    { id: "io",         l: "Import / Export" },
    { id: "audit",      l: "Audit log" },
  ];

  return (
    <div style={{ padding: "32px 40px 80px", maxWidth: 1300, margin: "0 auto" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 24 }}>
        <div>
          <div style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "#dc2626", letterSpacing: ".18em", textTransform: "uppercase", fontWeight: 600, marginBottom: 8 }}>§ 08 / Settings</div>
          <h1 style={{ fontFamily: "var(--font-display)", fontSize: 56, fontWeight: 400, lineHeight: 1, letterSpacing: "-0.035em", color: "#0f172a" }}>Governance & configuration.</h1>
          <p style={{ marginTop: 12, fontSize: 14, color: "#475569" }}>
            You are <strong style={{ fontFamily: "var(--font-mono)", color: "#0f172a" }}>{currentUser.name}</strong> — role <span style={{ fontFamily: "var(--font-mono)", color: "#dc2626", fontWeight: 600 }}>{currentUser.role.toUpperCase()}</span>
            {!isAdmin && " · read-only access to most settings"}
          </p>
        </div>
      </div>
      <div style={{ height: 1, background: "#0f172a", marginBottom: 24 }} />

      <div style={{ display: "flex", borderBottom: "1px solid #e2e8f0", marginBottom: 24 }}>
        {tabs.map(t => (
          <button key={t.id} onClick={() => setTab(t.id)} style={{
            padding: "10px 18px 12px", border: "none", background: "none", cursor: "pointer",
            fontFamily: "var(--font-mono)", fontSize: 11, fontWeight: 600, letterSpacing: ".08em", textTransform: "uppercase",
            color: tab === t.id ? "#0f172a" : "#94a3b8",
            borderBottom: tab === t.id ? "2px solid #dc2626" : "2px solid transparent",
            marginBottom: -1,
          }}>{t.l}</button>
        ))}
      </div>

      {tab === "users" && <UsersTab users={state.users} currentUser={currentUser} isAdmin={isAdmin} sites={state.sites} addUser={addUser} updateUser={updateUser} deleteUser={deleteUser} setCurrentUser={setCurrentUser} />}
      {tab === "sites" && <SitesTab sites={state.sites} apps={state.apps} isAdmin={isAdmin} addSite={addSite} deleteSite={deleteSite} />}
      {tab === "weights" && <WeightsTab weights={state.bva_weights} setBvaWeights={setBvaWeights} isAdmin={isAdmin} apps={state.apps} />}
      {tab === "categories" && <CategoriesTab categories={state.heatmap_categories} setHeatmapCategories={setHeatmapCategories} apps={state.apps} isAdmin={isAdmin} />}
      {tab === "io" && <IoTab exportJson={exportJson} importJson={importJson} resetStore={resetStore} isAdmin={isAdmin} state={state} />}
      {tab === "audit" && <AuditTab log={state.audit_log} />}
    </div>
  );
}

// ───── Users ─────
function UsersTab({ users, currentUser, isAdmin, sites, addUser, updateUser, deleteUser, setCurrentUser }) {
  const [adding, setAdding] = useState(false);
  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 12 }}>
        <p style={{ fontSize: 13.5, color: "#475569", maxWidth: 720, lineHeight: 1.6 }}>
          <strong>Admin</strong> — CRUD everywhere, Settings, role changes.{" "}
          <strong>Editor</strong> — edit apps for assigned sites, score, drop in heatmap.{" "}
          <strong>Viewer</strong> — read only.
        </p>
        {isAdmin && <button onClick={() => setAdding(true)} style={primaryBtn}>+ New user</button>}
      </div>
      <div style={{ background: "#fff", border: "1px solid #e2e8f0", overflow: "hidden" }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ background: "#0f172a", color: "#fff" }}>
              {["Name","Email","Role","Sites","Active","Actions"].map(h => (
                <th key={h} style={{ textAlign: "left", padding: "10px 14px", fontFamily: "var(--font-mono)", fontSize: 10, fontWeight: 600, letterSpacing: ".12em", textTransform: "uppercase" }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {users.map(u => (
              <tr key={u.id} style={{ borderBottom: "1px solid #f1f5f9", background: u.id === currentUser.id ? "#fef2f2" : "#fff" }}>
                <td style={{ padding: "10px 14px", fontSize: 14, fontWeight: 500, color: "#0f172a" }}>
                  {u.name}
                  {u.id === currentUser.id && <span style={{ fontFamily: "var(--font-mono)", fontSize: 9, color: "#dc2626", marginLeft: 8, letterSpacing: ".15em", fontWeight: 700 }}>YOU</span>}
                </td>
                <td style={{ padding: "10px 14px", fontFamily: "var(--font-mono)", fontSize: 12, color: "#475569" }}>{u.email}</td>
                <td style={{ padding: "10px 14px" }}>
                  {isAdmin && u.id !== currentUser.id ? (
                    <select value={u.role} onChange={e => updateUser(u.id, { role: e.target.value })} style={{ ...inputStyle, padding: "4px 6px", fontSize: 12 }}>
                      <option>Admin</option><option>Editor</option><option>Viewer</option>
                    </select>
                  ) : (
                    <span style={{ fontFamily: "var(--font-mono)", fontSize: 11, fontWeight: 700, padding: "3px 7px", color: "#fff", background: u.role === "Admin" ? "#dc2626" : u.role === "Editor" ? "#0f172a" : "#94a3b8", letterSpacing: ".08em" }}>{u.role}</span>
                  )}
                </td>
                <td style={{ padding: "10px 14px" }}>
                  {isAdmin && u.id !== currentUser.id ? (
                    <div style={{ display: "flex", gap: 4, flexWrap: "wrap" }}>
                      {sites.map(s => {
                        const on = u.sites.includes(s.id);
                        return (
                          <button key={s.id} onClick={() => updateUser(u.id, { sites: on ? u.sites.filter(x => x !== s.id) : [...u.sites, s.id] })}
                            style={{ padding: "2px 6px", fontFamily: "var(--font-mono)", fontSize: 10, fontWeight: 700, letterSpacing: ".06em", background: on ? s.color : "#fff", color: on ? "#fff" : s.color, border: "1px solid " + s.color, cursor: "pointer" }}>{s.id}</button>
                        );
                      })}
                    </div>
                  ) : (
                    <SiteChips sites={u.sites} />
                  )}
                </td>
                <td style={{ padding: "10px 14px" }}>
                  {isAdmin && u.id !== currentUser.id ? (
                    <input type="checkbox" checked={u.active} onChange={e => updateUser(u.id, { active: e.target.checked })} />
                  ) : (
                    <span style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: u.active ? "#16a34a" : "#dc2626", fontWeight: 600 }}>{u.active ? "ACTIVE" : "DISABLED"}</span>
                  )}
                </td>
                <td style={{ padding: "10px 14px" }}>
                  <div style={{ display: "flex", gap: 6 }}>
                    {u.id !== currentUser.id && (
                      <button onClick={() => setCurrentUser(u.id)} style={ghostBtnSm}>Switch to</button>
                    )}
                    {isAdmin && u.id !== currentUser.id && (
                      <button onClick={() => { if (confirm("Delete user " + u.name + "?")) deleteUser(u.id); }} style={{ ...ghostBtnSm, color: "#dc2626", borderColor: "#dc2626" }}>Delete</button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {adding && <AddUserModal sites={sites} onClose={() => setAdding(false)} onAdd={u => { addUser(u); setAdding(false); }} />}
    </div>
  );
}
function AddUserModal({ sites, onClose, onAdd }) {
  const [form, setForm] = useState({ name: "", email: "", role: "Viewer", sites: ["MUC"] });
  const [err, setErr] = useState("");
  return (
    <Modal title="Add user" onClose={onClose} footer={<>
      <button onClick={onClose} style={ghostBtn}>Cancel</button>
      <button onClick={() => { if (!form.name.trim() || !form.email.trim()) { setErr("Name and email required"); return; } onAdd(form); }} style={primaryBtn}>Create user</button>
    </>}>
      {err && <div style={{ padding: 10, background: "#fef2f2", color: "#7f1d1d", marginBottom: 12, fontFamily: "var(--font-mono)", fontSize: 11 }}>{err}</div>}
      <FormGrid>
        <Field label="Name *"><input value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} style={inputStyle} /></Field>
        <Field label="Email *"><input value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} style={inputStyle} /></Field>
        <Field label="Role"><select value={form.role} onChange={e => setForm({ ...form, role: e.target.value })} style={inputStyle}><option>Admin</option><option>Editor</option><option>Viewer</option></select></Field>
        <Field label="Sites">
          <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
            {sites.map(s => {
              const on = form.sites.includes(s.id);
              return (
                <button key={s.id} onClick={() => setForm({ ...form, sites: on ? form.sites.filter(x => x !== s.id) : [...form.sites, s.id] })}
                  style={{ padding: "5px 10px", fontFamily: "var(--font-mono)", fontSize: 10.5, fontWeight: 700, letterSpacing: ".08em", background: on ? s.color : "#fff", color: on ? "#fff" : s.color, border: "1px solid " + s.color, cursor: "pointer" }}>{s.id}</button>
              );
            })}
          </div>
        </Field>
      </FormGrid>
    </Modal>
  );
}

// ───── Sites ─────
function SitesTab({ sites, apps, isAdmin, addSite, deleteSite }) {
  const [adding, setAdding] = useState(false);
  const usage = id => apps.filter(a => (a.sites || []).includes(id)).length;
  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 12 }}>
        <p style={{ fontSize: 13.5, color: "#475569" }}>Manufacturing & operational sites. Each application can be assigned to one or more sites.</p>
        {isAdmin && <button onClick={() => setAdding(true)} style={primaryBtn}>+ New site</button>}
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: 12 }}>
        {sites.map(s => (
          <div key={s.id} style={{ background: "#fff", border: "1px solid #e2e8f0", borderTop: "4px solid " + s.color, padding: 18 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
              <span style={{ fontFamily: "var(--font-mono)", fontSize: 11, fontWeight: 700, color: s.color, letterSpacing: ".1em" }}>{s.id}</span>
              <span style={{ fontFamily: "var(--font-display)", fontSize: 22, fontWeight: 600, color: "#0f172a" }}>{usage(s.id)}</span>
            </div>
            <div style={{ fontFamily: "var(--font-display)", fontSize: 22, fontWeight: 500, marginTop: 4, letterSpacing: "-0.02em" }}>{s.name}</div>
            <div style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "#94a3b8", marginTop: 2 }}>{s.region}</div>
            {isAdmin && (
              <button onClick={() => { if (usage(s.id) > 0) { alert("Cannot delete: " + usage(s.id) + " apps still reference this site."); return; } if (confirm("Delete site " + s.name + "?")) deleteSite(s.id); }}
                style={{ ...ghostBtnSm, marginTop: 12, width: "100%", color: "#dc2626", borderColor: "#dc2626" }}>Delete</button>
            )}
          </div>
        ))}
      </div>
      {adding && <AddSiteModal sites={sites} onClose={() => setAdding(false)} onAdd={s => { addSite(s); setAdding(false); }} />}
    </div>
  );
}
function AddSiteModal({ sites, onClose, onAdd }) {
  const [form, setForm] = useState({ id: "", name: "", region: "", color: "#dc2626" });
  return (
    <Modal title="Add site" onClose={onClose} footer={<>
      <button onClick={onClose} style={ghostBtn}>Cancel</button>
      <button onClick={() => { if (!form.id.trim() || !form.name.trim()) return alert("ID and name required"); if (sites.find(s => s.id === form.id.toUpperCase())) return alert("ID already exists"); onAdd({ ...form, id: form.id.toUpperCase() }); }} style={primaryBtn}>Create site</button>
    </>}>
      <FormGrid>
        <Field label="ID (3 letters)"><input value={form.id} onChange={e => setForm({ ...form, id: e.target.value.slice(0, 4) })} style={inputStyle} maxLength="4" /></Field>
        <Field label="Name"><input value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} style={inputStyle} /></Field>
        <Field label="Region"><input value={form.region} onChange={e => setForm({ ...form, region: e.target.value })} style={inputStyle} placeholder="DE, GB, SG…" /></Field>
        <Field label="Color"><input type="color" value={form.color} onChange={e => setForm({ ...form, color: e.target.value })} style={{ height: 34, width: 80, border: "1px solid #cbd5e1", padding: 2 }} /></Field>
      </FormGrid>
    </Modal>
  );
}

// ───── Weights ─────
function WeightsTab({ weights, setBvaWeights, isAdmin, apps }) {
  const [draft, setDraft] = useState(weights);
  const total = draft.business + draft.cost + draft.risk + draft.technical;
  return (
    <div>
      <p style={{ fontSize: 13.5, color: "#475569", marginBottom: 18, maxWidth: 760, lineHeight: 1.55 }}>
        BVA (Business Value Assessment) composite weight per dimension. The composite score = Σ (weight × dimension). Must sum to 100%.
      </p>
      <div style={{ background: "#fff", border: "1px solid #e2e8f0", padding: 28, maxWidth: 720 }}>
        {[
          ["business", "Business contribution"],
          ["cost", "Cost efficiency"],
          ["risk", "Risk reduction"],
          ["technical", "Technical fit"],
        ].map(([k, l]) => (
          <div key={k} style={{ marginBottom: 18 }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
              <span style={{ fontSize: 13.5, color: "#0f172a" }}>{l}</span>
              <span style={{ fontFamily: "var(--font-mono)", fontSize: 13, fontWeight: 700, color: "#0f172a" }}>{Math.round(draft[k] * 100)}%</span>
            </div>
            <input type="range" min="0" max="1" step="0.05" value={draft[k]} disabled={!isAdmin}
              onChange={e => setDraft({ ...draft, [k]: parseFloat(e.target.value) })}
              style={{ width: "100%" }} />
          </div>
        ))}
        <div style={{ marginTop: 18, padding: "10px 14px", background: Math.abs(total - 1) < 0.001 ? "#dcfce7" : "#fef2f2", fontFamily: "var(--font-mono)", fontSize: 12, color: Math.abs(total - 1) < 0.001 ? "#14532d" : "#7f1d1d", letterSpacing: ".06em" }}>
          Total: <strong>{Math.round(total * 100)}%</strong> {Math.abs(total - 1) > 0.001 && "— must equal 100% to save"}
        </div>
        {isAdmin && (
          <div style={{ display: "flex", gap: 8, marginTop: 16 }}>
            <button onClick={() => setBvaWeights(draft)} disabled={Math.abs(total - 1) > 0.001} style={Math.abs(total - 1) > 0.001 ? { ...primaryBtn, opacity: 0.4, cursor: "not-allowed" } : primaryBtn}>Save weights</button>
            <button onClick={() => setDraft({ business: 0.35, cost: 0.20, risk: 0.25, technical: 0.20 })} style={ghostBtn}>Reset to default</button>
          </div>
        )}
      </div>
    </div>
  );
}

// ───── Heatmap categories ─────
function CategoriesTab({ categories, setHeatmapCategories, apps, isAdmin }) {
  const [draft, setDraft] = useState(categories);
  return (
    <div>
      <p style={{ fontSize: 13.5, color: "#475569", marginBottom: 18, maxWidth: 760, lineHeight: 1.55 }}>
        The decision buckets used in the Heatmap. When you rename or remove a category, applications already assigned to it are migrated by ID.
      </p>
      <div style={{ display: "flex", flexDirection: "column", gap: 8, maxWidth: 920 }}>
        {draft.map((c, i) => (
          <div key={c.id} style={{ background: "#fff", border: "1px solid #e2e8f0", borderLeft: "4px solid " + c.color, padding: 14, display: "grid", gridTemplateColumns: "auto 1fr 2fr auto auto", gap: 12, alignItems: "center" }}>
            <input type="color" value={c.color} disabled={!isAdmin} onChange={e => { const n = [...draft]; n[i] = { ...c, color: e.target.value }; setDraft(n); }} style={{ width: 40, height: 28, border: "1px solid #cbd5e1", padding: 2 }} />
            <input value={c.label} disabled={!isAdmin} onChange={e => { const n = [...draft]; n[i] = { ...c, label: e.target.value }; setDraft(n); }} style={{ ...inputStyle, fontFamily: "var(--font-display)", fontSize: 16, fontWeight: 500 }} />
            <input value={c.desc} disabled={!isAdmin} onChange={e => { const n = [...draft]; n[i] = { ...c, desc: e.target.value }; setDraft(n); }} style={inputStyle} />
            <span style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "#94a3b8" }}>{apps.filter(a => a.heatmap_category === c.id).length} apps</span>
            {isAdmin && <button onClick={() => setDraft(draft.filter((_, j) => j !== i))} style={{ ...ghostBtnSm, color: "#dc2626", borderColor: "#dc2626" }}>✕</button>}
          </div>
        ))}
        {isAdmin && (
          <button onClick={() => setDraft([...draft, { id: "cat_" + Date.now(), label: "New category", color: "#64748b", desc: "" }])}
            style={{ ...ghostBtn, marginTop: 4 }}>+ Add category</button>
        )}
      </div>
      {isAdmin && (
        <div style={{ marginTop: 18, display: "flex", gap: 8 }}>
          <button onClick={() => setHeatmapCategories(draft)} style={primaryBtn}>Save categories</button>
          <button onClick={() => setDraft(categories)} style={ghostBtn}>Discard changes</button>
        </div>
      )}
    </div>
  );
}

// ───── Import / Export ─────
function IoTab({ exportJson, importJson, resetStore, isAdmin, state }) {
  function downloadJson() {
    const json = exportJson();
    const blob = new Blob([json], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url; a.download = `artefact-store-${new Date().toISOString().slice(0,10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  }
  function handleFile(e) {
    const f = e.target.files[0];
    if (!f) return;
    const r = new FileReader();
    r.onload = ev => {
      if (!confirm("Importing will replace the entire store. Continue?")) return;
      const res = importJson(ev.target.result);
      if (res.ok) alert(`Imported ${res.count} applications`);
      else alert("Import failed: " + res.error);
    };
    r.readAsText(f);
  }
  return (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 18, maxWidth: 980 }}>
      <div style={{ background: "#fff", border: "1px solid #e2e8f0", padding: 24 }}>
        <h3 style={{ fontFamily: "var(--font-display)", fontSize: 22, fontWeight: 500, marginBottom: 8, letterSpacing: "-0.02em" }}>Export</h3>
        <p style={{ fontSize: 13, color: "#475569", marginBottom: 16, lineHeight: 1.55 }}>Download the complete store — applications, sites, users, categories, weights and audit log — as a JSON document.</p>
        <div style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "#94a3b8", marginBottom: 16 }}>
          {state.apps.length} apps · {state.users.length} users · {state.sites.length} sites · {state.audit_log.length} log entries
        </div>
        <button onClick={downloadJson} style={primaryBtn}>↓ Export JSON</button>
      </div>
      <div style={{ background: "#fff", border: "1px solid #e2e8f0", padding: 24 }}>
        <h3 style={{ fontFamily: "var(--font-display)", fontSize: 22, fontWeight: 500, marginBottom: 8, letterSpacing: "-0.02em" }}>Import</h3>
        <p style={{ fontSize: 13, color: "#475569", marginBottom: 16, lineHeight: 1.55 }}>Restore from a previous JSON export. The full store will be replaced; current state is wiped. Only Admin users can import.</p>
        {isAdmin ? (
          <label style={{ ...primaryBtn, display: "inline-block" }}>
            ↑ Choose JSON file
            <input type="file" accept=".json" onChange={handleFile} style={{ display: "none" }} />
          </label>
        ) : <span style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "#94a3b8" }}>Admin only</span>}
      </div>
      {isAdmin && (
        <div style={{ gridColumn: "1 / -1", background: "#fef2f2", border: "1px solid #fecaca", padding: 24 }}>
          <h3 style={{ fontFamily: "var(--font-display)", fontSize: 20, fontWeight: 500, marginBottom: 8, color: "#7f1d1d", letterSpacing: "-0.02em" }}>Danger zone</h3>
          <p style={{ fontSize: 13, color: "#7f1d1d", marginBottom: 12 }}>Reset the entire store to the original seed (137 catalogued apps). All edits, decisions, custom users and audit history will be lost.</p>
          <button onClick={() => { if (confirm("This wipes EVERYTHING. Continue?")) resetStore(); }} style={{ ...primaryBtn, background: "#0f172a", borderColor: "#0f172a" }}>Reset store</button>
        </div>
      )}
    </div>
  );
}

// ───── Audit log ─────
function AuditTab({ log }) {
  return (
    <div style={{ background: "#fff", border: "1px solid #e2e8f0", overflow: "hidden" }}>
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr style={{ background: "#0f172a", color: "#fff" }}>
            {["When","Who","Action","Target","Details"].map(h => (
              <th key={h} style={{ textAlign: "left", padding: "10px 14px", fontFamily: "var(--font-mono)", fontSize: 10, fontWeight: 600, letterSpacing: ".12em", textTransform: "uppercase" }}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {log.slice(0, 200).map((e, i) => (
            <tr key={i} style={{ borderBottom: "1px solid #f1f5f9", background: i % 2 ? "#fafbfc" : "#fff" }}>
              <td style={{ padding: "8px 14px", fontFamily: "var(--font-mono)", fontSize: 11, color: "#475569" }}>{e.ts.slice(0, 16).replace("T", " ")}</td>
              <td style={{ padding: "8px 14px", fontSize: 12, fontWeight: 500 }}>{e.user}</td>
              <td style={{ padding: "8px 14px" }}>
                <span style={{ fontFamily: "var(--font-mono)", fontSize: 10, fontWeight: 700, padding: "2px 6px", background: "#0f172a", color: "#fff", letterSpacing: ".06em" }}>{e.action.toUpperCase()}</span>
              </td>
              <td style={{ padding: "8px 14px", fontFamily: "var(--font-mono)", fontSize: 11, color: "#0f172a" }}>{e.target}</td>
              <td style={{ padding: "8px 14px", fontSize: 12, color: "#64748b" }}>{e.details}</td>
            </tr>
          ))}
          {log.length === 0 && <tr><td colSpan="5" style={{ padding: 40, textAlign: "center", color: "#94a3b8" }}>No log entries yet.</td></tr>}
        </tbody>
      </table>
    </div>
  );
}

window.Settings = Settings;
